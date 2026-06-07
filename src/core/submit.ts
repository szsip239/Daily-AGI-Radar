import { AppConfig, githubToken, loadConfig } from "./config.js";
import { CliError } from "./errors.js";
import { ensureSearchFeed, SearchRecord } from "./feeds.js";

export type SubmissionKind = "github" | "skill";

type SubmissionPayload = {
  kind: SubmissionKind;
  url: string;
};

export async function submitResource(options: {
  kind: SubmissionKind;
  url: string;
  config?: AppConfig;
  env?: NodeJS.ProcessEnv;
}): Promise<unknown> {
  const config = options.config ?? loadConfig(options.env);
  const env = options.env ?? process.env;
  const normalized = normalizeSubmissionUrl(options.kind, options.url);
  const duplicate = await findDuplicate(options.kind, normalized, config);
  if (duplicate) {
    throw new CliError("duplicate_submission", "This URL is already published.", {
      existing_handle: duplicate.handle,
    });
  }

  const payload: SubmissionPayload = { kind: options.kind, url: normalized };
  const title = submissionTitle(options.kind, normalized);
  const body = submissionBody(payload);
  const token = githubToken(env);
  if (!token) {
    return {
      mode: "prefilled_issue_url",
      issue_url: prefilledIssueUrl(String(config["github.submission_repo"]), title, body),
      title,
      payload,
    };
  }

  const issue = await createIssue(String(config["github.submission_repo"]), token, title, body, env);
  return {
    mode: "created_issue",
    issue_url: issue.html_url,
    issue_number: issue.number,
    title,
    payload,
  };
}

export function normalizeSubmissionUrl(kind: SubmissionKind, rawUrl: string): string {
  if (kind === "github") {
    return normalizeGithubUrl(rawUrl);
  }
  return normalizeSkillUrl(rawUrl);
}

export function normalizeGithubUrl(rawUrl: string): string {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new CliError("invalid_url", "Invalid GitHub repository URL.", { url: rawUrl });
  }
  if (url.hostname.toLowerCase() !== "github.com") {
    throw new CliError("invalid_url", "GitHub submissions must use github.com.", { url: rawUrl });
  }
  const [owner, repoRaw] = url.pathname.split("/").filter(Boolean);
  const repo = repoRaw?.replace(/\.git$/i, "");
  if (!owner || !repo) {
    throw new CliError("invalid_url", "GitHub submissions must be repository URLs.", { url: rawUrl });
  }
  return `https://github.com/${owner}/${repo}`;
}

export function normalizeSkillUrl(rawUrl: string): string {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new CliError("invalid_url", "Invalid SkillHub URL.", { url: rawUrl });
  }
  const host = url.hostname.toLowerCase();
  if (host !== "skillhub.cn" && host !== "www.skillhub.cn") {
    throw new CliError("invalid_url", "Skill submissions must use skillhub.cn.", { url: rawUrl });
  }
  const pathname = url.pathname.replace(/\/+$/g, "");
  if (!pathname || pathname === "/") {
    throw new CliError("invalid_url", "SkillHub submissions must include a skill path.", {
      url: rawUrl,
    });
  }
  return `https://skillhub.cn${pathname}`;
}

function submissionTitle(kind: SubmissionKind, url: string): string {
  if (kind === "github") {
    const parsed = new URL(url);
    const [owner, repo] = parsed.pathname.split("/").filter(Boolean);
    return `[github] ${owner}/${repo}`;
  }
  const slug = new URL(url).pathname.split("/").filter(Boolean).at(-1) ?? "skill";
  return `[skill] ${slug}`;
}

function submissionBody(payload: SubmissionPayload): string {
  return ["## Submission", "", "```json", JSON.stringify(payload, null, 2), "```", ""].join("\n");
}

function prefilledIssueUrl(repo: string, title: string, body: string): string {
  const url = new URL(`https://github.com/${repo}/issues/new`);
  url.searchParams.set("title", title);
  url.searchParams.set("body", body);
  return url.toString();
}

async function findDuplicate(
  kind: SubmissionKind,
  normalizedUrl: string,
  config: AppConfig,
): Promise<SearchRecord | null> {
  const records = await ensureSearchFeed(config);
  return (
    records.find((record) => {
      if (record.type !== kind) return false;
      if (kind === "github") {
        const handle = `github:${new URL(normalizedUrl).pathname.split("/").filter(Boolean).join("/")}`;
        return record.handle === handle || normalizeMaybeUrl(record.url) === normalizedUrl;
      }
      return normalizeMaybeUrl(record.url) === normalizedUrl;
    }) ?? null
  );
}

function normalizeMaybeUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    url.hash = "";
    url.search = "";
    return url.toString().replace(/\/$/g, "");
  } catch {
    return null;
  }
}

async function createIssue(
  repo: string,
  token: string,
  title: string,
  body: string,
  env: NodeJS.ProcessEnv,
): Promise<{ html_url: string; number: number }> {
  const apiBase = env.AGI_RADAR_GITHUB_API_BASE ?? "https://api.github.com";
  const response = await fetch(`${apiBase.replace(/\/$/g, "")}/repos/${repo}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({ title, body }),
  });
  if (!response.ok) {
    throw new CliError("github_api_error", `GitHub issue creation failed: ${response.status}`, {
      status: response.status,
    });
  }
  return (await response.json()) as { html_url: string; number: number };
}
