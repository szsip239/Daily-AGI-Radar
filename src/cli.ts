#!/usr/bin/env node
import { Command } from "commander";
import { cacheDir, cacheStatus } from "./core/cache.js";
import {
  getConfigValue,
  githubTokenAvailable,
  listConfig,
  loadConfig,
  resetConfigValue,
  setConfigValue,
  supportedConfigKeys,
} from "./core/config.js";
import { failure, printJson, success } from "./core/envelope.js";
import { CliError, toCliError } from "./core/errors.js";
import { syncFeeds } from "./core/feeds.js";
import { getResource } from "./core/get.js";
import { searchRecords } from "./core/search.js";
import { submitResource, SubmissionKind } from "./core/submit.js";

type CommonOptions = {
  json?: boolean;
  noCache?: boolean;
};

const VERSION = "0.1.1";

function feedBaseUrl(manifestUrl: string): string {
  try {
    return new URL(".", manifestUrl).toString().replace(/\/$/g, "");
  } catch {
    return manifestUrl.replace(/\/?manifest\.json$/g, "");
  }
}

function statusData() {
  const config = loadConfig();
  return {
    version: VERSION,
    feed_base_url: feedBaseUrl(String(config["feed.manifest_url"])),
    manifest_url: config["feed.manifest_url"],
    cache_dir: cacheDir(config),
    cache: cacheStatus(config),
    github_token_available: githubTokenAvailable(),
  };
}

async function run(
  command: string,
  options: CommonOptions,
  handler: () => Promise<unknown> | unknown,
  human?: (data: unknown) => void,
): Promise<void> {
  try {
    const data = await handler();
    if (options.json) {
      printJson(success(command, data));
      return;
    }
    if (human) {
      human(data);
      return;
    }
    process.stdout.write(`${JSON.stringify(data, null, 2)}\n`);
  } catch (error) {
    if (options.json) {
      printJson(failure(command, error));
    } else {
      process.stderr.write(`${toCliError(error).message}\n`);
    }
    process.exitCode = 1;
  }
}

const program = new Command();

program
  .name("agi-radar")
  .description("Daily AGI Radar command-line interface")
  .version(VERSION);

program
  .command("status")
  .description("Show CLI, feed, and cache status")
  .option("--json", "print machine-readable JSON")
  .action((options: CommonOptions) =>
    run("status", options, () => statusData(), (data) => {
      const status = data as ReturnType<typeof statusData>;
      process.stdout.write(`agi-radar ${status.version}\n`);
      process.stdout.write(`manifest: ${status.manifest_url}\n`);
      process.stdout.write(`cache: ${status.cache_dir}\n`);
    }),
  );

const config = program.command("config").description("Manage CLI configuration");

config
  .command("list")
  .option("--json", "print machine-readable JSON")
  .action((options: CommonOptions) =>
    run("config", options, () => ({ values: listConfig(), keys: supportedConfigKeys() })),
  );

config
  .command("get")
  .argument("<key>")
  .option("--json", "print machine-readable JSON")
  .action((key: string, options: CommonOptions) =>
    run("config", options, () => ({ key, value: getConfigValue(key) })),
  );

config
  .command("set")
  .argument("<key>")
  .argument("<value>")
  .option("--json", "print machine-readable JSON")
  .action((key: string, value: string, options: CommonOptions) =>
    run("config", options, () => setConfigValue(key, value)),
  );

config
  .command("reset")
  .argument("<key>")
  .option("--json", "print machine-readable JSON")
  .action((key: string, options: CommonOptions) =>
    run("config", options, () => resetConfigValue(key)),
  );

program
  .command("sync")
  .description("Refresh cached Daily AGI Radar feeds")
  .option("--all", "sync all feeds")
  .option("--no-cache", "force remote fetch")
  .option("--json", "print machine-readable JSON")
  .action((options: CommonOptions & { all?: boolean }) =>
    run("sync", options, () => syncFeeds({ all: options.all, noCache: options.noCache })),
  );

program
  .command("search")
  .description("Search Daily AGI Radar signals")
  .argument("<query>")
  .option("--type <type>", "filter by signal type")
  .option("--from <date>", "start signal date")
  .option("--to <date>", "end signal date")
  .option("--limit <n>", "maximum results", (value) => Number(value))
  .option("--brief", "return search projection fields only")
  .option("--no-cache", "force remote fetch")
  .option("--json", "print machine-readable JSON")
  .action((query: string, options: CommonOptions & {
    type?: string;
    from?: string;
    to?: string;
    limit?: number;
    brief?: boolean;
  }) =>
    run("search", options, () =>
      searchRecords({
        query,
        type: options.type,
        from: options.from,
        to: options.to,
        limit: options.limit,
        brief: options.brief,
        noCache: options.noCache,
      }),
    ),
  );

program
  .command("get")
  .description("Fetch a resource by stable handle")
  .argument("<resource-handle>")
  .option("--download <path>", "download an audio resource")
  .option("--no-cache", "force remote fetch")
  .option("--json", "print machine-readable JSON")
  .action((handle: string, options: CommonOptions & { download?: string }) =>
    run("get", options, () =>
      getResource({
        handle,
        download: options.download,
        noCache: options.noCache,
      }),
    ),
  );

const submit = program.command("submit").description("Recommend a candidate for review");

for (const kind of ["github", "skill"] as SubmissionKind[]) {
  submit
    .command(kind)
    .argument("<url>")
    .option("--json", "print machine-readable JSON")
    .action((url: string, options: CommonOptions) =>
      run("submit", options, () => submitResource({ kind, url })),
    );
}

for (const kind of ["article", "news"]) {
  submit
    .command(kind)
    .argument("<url>")
    .option("--json", "print machine-readable JSON")
    .action((_url: string, options: CommonOptions) =>
      run("submit", options, () => {
        throw new CliError("unsupported_submission_type", `${kind} submissions are not accepted.`, {
          kind,
        });
      }),
    );
}

program.parseAsync(process.argv);
