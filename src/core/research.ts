import path from "node:path";
import { loadConfig } from "./config.js";
import { CliError } from "./errors.js";
import { loadFeed, loadManifest, SearchRecord } from "./feeds.js";

// This hand-curated module lives beside data/, which the daily publisher replaces.
function researchConfig() {
  const config = loadConfig();
  return {
    ...config,
    "feed.manifest_url": new URL("../research/manifest.json", String(config["feed.manifest_url"])).href,
    "cache.dir": path.join(String(config["cache.dir"]), "research"),
  };
}

export async function loadResearchRecords(options: {
  noCache?: boolean;
  optional?: boolean;
} = {}): Promise<SearchRecord[]> {
  const config = researchConfig();
  // Only an absent module is optional. Broken JSON, network failures and missing
  // feeds in an existing module must remain visible to the reader.
  try {
    await loadManifest({ config, noCache: options.noCache });
  } catch (error) {
    const absent = error instanceof CliError && error.details?.status === 404
      || (error as NodeJS.ErrnoException).code === "ENOENT";
    if (options.optional && absent) return [];
    throw error;
  }
  return loadFeed<SearchRecord>("research", { config, noCache: options.noCache });
}

export async function syncResearch() {
  const records = await loadResearchRecords({ noCache: true, optional: true });
  if (!records.length) return [];
  return [{ name: "research", status: "updated", records: records.length }];
}
