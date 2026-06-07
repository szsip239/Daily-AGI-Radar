import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { gzipSync } from "node:zlib";
import { afterEach, describe, expect, it } from "vitest";

const projectRoot = path.resolve(__dirname, "..");

type RouteResult =
  | string
  | Buffer
  | {
      status?: number;
      body?: string | Buffer;
      headers?: Record<string, string>;
    };

type RouteHandler = (request: http.IncomingMessage, body: string) => RouteResult | Promise<RouteResult>;

const servers: http.Server[] = [];

afterEach(async () => {
  await Promise.all(
    servers.splice(0).map(
      (server) =>
        new Promise<void>((resolve) => {
          server.close(() => resolve());
        }),
    ),
  );
});

function jsonl(records: unknown[]): string {
  return `${records.map((record) => JSON.stringify(record)).join("\n")}\n`;
}

async function startServer(routes: Record<string, RouteResult | RouteHandler>) {
  const requests: Array<{ method: string; path: string; body: string; headers: http.IncomingHttpHeaders }> = [];
  const server = http.createServer((request, response) => {
    const chunks: Buffer[] = [];
    request.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    request.on("end", async () => {
      const body = Buffer.concat(chunks).toString("utf8");
      const requestPath = new URL(request.url ?? "/", "http://127.0.0.1").pathname;
      requests.push({
        method: request.method ?? "GET",
        path: requestPath,
        body,
        headers: request.headers,
      });

      const route = routes[requestPath];
      if (route === undefined) {
        response.writeHead(404);
        response.end("not found");
        return;
      }

      const result = typeof route === "function" ? await route(request, body) : route;
      const normalized =
        typeof result === "string" || Buffer.isBuffer(result)
          ? { status: 200, body: result }
          : result;
      response.writeHead(normalized.status ?? 200, normalized.headers ?? {});
      response.end(normalized.body ?? "");
    });
  });

  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  servers.push(server);
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Could not start fixture server.");
  }
  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    requests,
  };
}

function fixtureData(_baseUrl: string) {
  const searchRecords = [
    {
      handle: "github:owner/repo",
      type: "github",
      title: "Agent Memory Repo",
      url: "https://github.com/owner/repo",
      summary: "Agent memory framework",
      source: "github",
      signal_date: "2026-06-07",
      detail_feed: "details.github",
      detail_key: "owner/repo",
    },
    {
      handle: "skill:demo-skill",
      type: "skill",
      title: "Demo Skill",
      url: "https://skillhub.cn/skills/demo-skill",
      summary: "CLI skill for agents",
      source: "skillhub",
      signal_date: "2026-06-06",
      detail_feed: "details.skills",
      detail_key: "demo-skill",
    },
  ];
  const search = jsonl(searchRecords);
  const manifest = {
    feeds: {
      search: { url: "/search.jsonl", gz_url: "/search.jsonl.gz" },
      "details.github": { url: "/github.jsonl" },
      "details.articles": { url: "/articles.jsonl" },
      "details.news": { url: "/news.jsonl" },
      "details.skills": { url: "/skills.jsonl" },
      briefings: { url: "/briefings.jsonl" },
      audio: { url: "/audio.jsonl" },
    },
    latest: {
      audio: "audio:2026-06-07",
      briefing: "briefing:2026-06-07",
    },
  };

  return {
    manifest,
    routes: {
      "/manifest.json": JSON.stringify(manifest),
      "/search.jsonl": search,
      "/search.jsonl.gz": gzipSync(search),
      "/github.jsonl": jsonl([
        {
          handle: "github:owner/repo",
          detail_key: "owner/repo",
          title: "Agent Memory Repo",
          url: "https://github.com/owner/repo",
          full_summary: "Full GitHub detail record",
        },
      ]),
      "/skills.jsonl": jsonl([
        {
          handle: "skill:demo-skill",
          detail_key: "demo-skill",
          title: "Demo Skill",
          url: "https://skillhub.cn/skills/demo-skill",
        },
      ]),
      "/articles.jsonl": "",
      "/news.jsonl": "",
      "/briefings.jsonl": jsonl([{ handle: "briefing:2026-06-07", signal_date: "2026-06-07" }]),
      "/audio.jsonl": jsonl([
        {
          handle: "audio:2026-06-07",
          signal_date: "2026-06-07",
          asset_url: "/audio.mp3",
        },
      ]),
      "/audio.mp3": Buffer.from("fake mp3"),
    },
  };
}

function tempEnv(baseUrl: string) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "agi-radar-test-"));
  return {
    dir,
    env: {
      ...process.env,
      AGI_RADAR_CONFIG_PATH: path.join(dir, "config.json"),
      AGI_RADAR_CACHE_DIR: path.join(dir, "cache"),
      AGI_RADAR_MANIFEST_URL: `${baseUrl}/manifest.json`,
      AGI_RADAR_SUBMISSION_REPO: "test/submissions",
      AGI_RADAR_GITHUB_TOKEN: "",
      GITHUB_TOKEN: "",
    },
  };
}

function runCli(args: string[], env: NodeJS.ProcessEnv): Promise<{
  status: number | null;
  stdout: string;
  stderr: string;
  json: any;
}> {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["dist/cli.js", ...args], {
    cwd: projectRoot,
    env,
    stdio: ["ignore", "pipe", "pipe"],
  });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error(`CLI timed out: ${args.join(" ")}`));
    }, 5000);
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", (status) => {
      clearTimeout(timer);
      resolve({
        status,
        stdout,
        stderr,
        json: stdout ? JSON.parse(stdout) : null,
      });
    });
  });
}

describe("agi-radar MVP CLI", () => {
  it("manages config and reports status without exposing tokens", async () => {
    const { baseUrl } = await startServer({});
    const { env } = tempEnv(baseUrl);

    const set = await runCli(["config", "set", "cache.ttl_hours", "12", "--json"], env);
    expect(set.status).toBe(0);
    expect(set.json.data).toEqual({ key: "cache.ttl_hours", value: 12 });

    const get = await runCli(["config", "get", "cache.ttl_hours", "--json"], env);
    expect(get.json.data).toEqual({ key: "cache.ttl_hours", value: 12 });

    const fixtureCredential = "fixture-credential";
    const list = await runCli(["config", "list", "--json"], {
      ...env,
      AGI_RADAR_GITHUB_TOKEN: fixtureCredential,
    });
    expect(list.json.data.keys).toContain("github.submission_repo");
    expect(JSON.stringify(list.json)).not.toContain(fixtureCredential);

    const status = await runCli(["status", "--json"], {
      ...env,
      AGI_RADAR_GITHUB_TOKEN: fixtureCredential,
    });
    expect(status.json.data.github_token_available).toBe(true);
    expect(JSON.stringify(status.json)).not.toContain(fixtureCredential);

    const reset = await runCli(["config", "reset", "cache.ttl_hours", "--json"], env);
    expect(reset.json.data.value).toBe(24);
  });

  it("syncs manifest and search feed with gzip preference", async () => {
    const data = fixtureData("http://127.0.0.1");
    const { baseUrl, requests } = await startServer(data.routes);
    const { env } = tempEnv(baseUrl);

    const sync = await runCli(["sync", "--json"], env);
    expect(sync.status).toBe(0);
    expect(sync.json.data.feeds).toEqual([{ name: "search", status: "updated", records: 2 }]);
    expect(requests.some((request) => request.path === "/search.jsonl.gz")).toBe(true);

    const syncAll = await runCli(["sync", "--all", "--json"], env);
    expect(syncAll.status).toBe(0);
    expect(syncAll.json.data.feeds.map((feed: { name: string }) => feed.name)).toContain("audio");
    expect(syncAll.json.data.feeds.map((feed: { name: string }) => feed.name)).toContain("details.github");
  });

  it("falls back to plain JSONL when gzip fetch fails", async () => {
    const data = fixtureData("http://127.0.0.1");
    const { baseUrl } = await startServer({
      ...data.routes,
      "/search.jsonl.gz": { status: 500, body: "broken" },
    });
    const { env } = tempEnv(baseUrl);

    const sync = await runCli(["sync", "--json"], env);
    expect(sync.status).toBe(0);
    expect(sync.json.data.feeds[0].records).toBe(2);
  });

  it("searches brief projections and full detail records", async () => {
    const data = fixtureData("http://127.0.0.1");
    const { baseUrl } = await startServer(data.routes);
    const { env } = tempEnv(baseUrl);

    const brief = await runCli(["search", "agent memory", "--brief", "--json"], env);
    expect(brief.status).toBe(0);
    expect(brief.json.data.results[0]).toMatchObject({
      index: 1,
      handle: "github:owner/repo",
      type: "github",
      title: "Agent Memory Repo",
    });
    expect(brief.json.data.results[0].record).toBeUndefined();

    const full = await runCli(["search", "agent memory", "--json"], env);
    expect(full.status).toBe(0);
    expect(full.json.data.results[0].record.full_summary).toBe("Full GitHub detail record");

    const limited = await runCli(["search", "agent", "--limit", "500", "--json"], env);
    expect(limited.json.data.limit).toBe(50);
  });

  it("gets resources by stable handle and rejects temporary indexes", async () => {
    const data = fixtureData("http://127.0.0.1");
    const { baseUrl } = await startServer(data.routes);
    const { env } = tempEnv(baseUrl);

    const get = await runCli(["get", "github:owner/repo", "--json"], env);
    expect(get.status).toBe(0);
    expect(get.json.data.record.full_summary).toBe("Full GitHub detail record");

    const invalid = await runCli(["get", "#1", "--json"], env);
    expect(invalid.status).toBe(1);
    expect(invalid.json.error.code).toBe("unsupported_handle");
  });

  it("downloads audio resources and rejects downloads for non-audio handles", async () => {
    const data = fixtureData("http://127.0.0.1");
    const { baseUrl } = await startServer(data.routes);
    const { env, dir } = tempEnv(baseUrl);

    const output = path.join(dir, "audio.mp3");
    const dated = await runCli(["get", "audio:2026-06-07", "--json"], env);
    expect(dated.status).toBe(0);
    expect(dated.json.data).toMatchObject({
      handle: "audio:2026-06-07",
      type: "audio",
    });

    const audio = await runCli(["get", "audio:latest", "--download", output, "--json"], env);
    expect(audio.status).toBe(0);
    expect(fs.readFileSync(output, "utf8")).toBe("fake mp3");

    const invalid = await runCli(["get", "github:owner/repo", "--download", output, "--json"], env);
    expect(invalid.status).toBe(1);
    expect(invalid.json.error.code).toBe("unsupported_download");
  });

  it("validates submissions and rejects duplicates", async () => {
    const data = fixtureData("http://127.0.0.1");
    const { baseUrl } = await startServer(data.routes);
    const { env } = tempEnv(baseUrl);

    const duplicate = await runCli(["submit", "github", "https://github.com/owner/repo", "--json"], env);
    expect(duplicate.status).toBe(1);
    expect(duplicate.json.error).toMatchObject({
      code: "duplicate_submission",
      details: { existing_handle: "github:owner/repo" },
    });

    const badSkill = await runCli(["submit", "skill", "https://example.com/skills/demo", "--json"], env);
    expect(badSkill.status).toBe(1);
    expect(badSkill.json.error.code).toBe("invalid_url");

    const article = await runCli(["submit", "article", "https://example.com/post", "--json"], env);
    expect(article.status).toBe(1);
    expect(article.json.error.code).toBe("unsupported_submission_type");
  });

  it("returns prefilled issue URLs without token and creates issues with token", async () => {
    const requests: Array<{ body: string; headers: http.IncomingHttpHeaders }> = [];
    const data = fixtureData("http://127.0.0.1");
    const { baseUrl } = await startServer({
      ...data.routes,
      "/repos/test/submissions/issues": (request, body) => {
        requests.push({ body, headers: request.headers });
        return {
          body: JSON.stringify({
            html_url: "https://github.com/test/submissions/issues/123",
            number: 123,
          }),
          headers: { "Content-Type": "application/json" },
        };
      },
    });
    const { env } = tempEnv(baseUrl);

    const noToken = await runCli(["submit", "github", "https://github.com/new/repo", "--json"], env);
    expect(noToken.status).toBe(0);
    expect(noToken.json.data).toMatchObject({
      mode: "prefilled_issue_url",
      title: "[github] new/repo",
      payload: { kind: "github", url: "https://github.com/new/repo" },
    });
    expect(noToken.json.data.issue_url).toContain("/issues/new");

    const fixtureCredential = "fixture-credential";
    const withToken = await runCli(["submit", "skill", "https://skillhub.cn/skills/new-skill", "--json"], {
      ...env,
      AGI_RADAR_GITHUB_TOKEN: fixtureCredential,
      AGI_RADAR_GITHUB_API_BASE: baseUrl,
    });
    expect(withToken.status).toBe(0);
    expect(withToken.json.data).toMatchObject({
      mode: "created_issue",
      issue_url: "https://github.com/test/submissions/issues/123",
      issue_number: 123,
      title: "[skill] new-skill",
      payload: { kind: "skill", url: "https://skillhub.cn/skills/new-skill" },
    });
    expect(requests).toHaveLength(1);
    expect(requests[0].headers.authorization).toBe(`Bearer ${fixtureCredential}`);
    expect(JSON.parse(requests[0].body).body).not.toContain(fixtureCredential);
  });
});
