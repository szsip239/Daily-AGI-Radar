import fs from "node:fs";
import { AppConfig, loadConfig } from "./config.js";
import {
  feedCachePath,
  manifestCachePath,
  metaCachePath,
  readJsonFile,
  writeAtomic,
} from "./cache.js";
import { CliError } from "./errors.js";
import { fetchGzipText, fetchJson, fetchText } from "./http.js";

export type FeedEntry =
  | string
  | {
      url?: string;
      gz_url?: string;
      gzip_url?: string;
      path?: string;
      gz_path?: string;
    };

export type Manifest = {
  feeds?: Record<string, FeedEntry>;
  latest?: Record<string, string>;
  counts?: Record<string, number>;
};

export type SearchRecord = {
  handle: string;
  type: string;
  title: string;
  url?: string;
  summary?: string;
  source?: string;
  signal_date?: string;
  detail_feed?: string;
  detail_key?: string;
  [key: string]: unknown;
};

export function parseJsonl<T>(text: string): T[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line) as T);
}

function manifestUrl(config: AppConfig): string {
  return String(config["feed.manifest_url"]);
}

function resolveUrl(baseUrl: string, maybeRelative: string): string {
  return new URL(maybeRelative, baseUrl).toString();
}

function entryUrl(entry: FeedEntry, baseUrl: string, gzip: boolean): string | null {
  if (typeof entry === "string") {
    return gzip ? null : resolveUrl(baseUrl, entry);
  }
  const value = gzip
    ? entry.gz_url ?? entry.gzip_url ?? entry.gz_path
    : entry.url ?? entry.path;
  return value ? resolveUrl(baseUrl, value) : null;
}

export async function loadManifest(
  options: { noCache?: boolean; config?: AppConfig } = {},
): Promise<Manifest> {
  const config = options.config ?? loadConfig();
  const cachePath = manifestCachePath(config);
  if (!options.noCache && fs.existsSync(cachePath)) {
    return readJsonFile<Manifest>(cachePath);
  }

  const manifest = await fetchJson<Manifest>(manifestUrl(config));
  writeAtomic(cachePath, `${JSON.stringify(manifest, null, 2)}\n`);
  return manifest;
}

async function fetchFeedText(entry: FeedEntry, baseUrl: string): Promise<string> {
  const gzipUrl = entryUrl(entry, baseUrl, true);
  if (gzipUrl) {
    try {
      return await fetchGzipText(gzipUrl);
    } catch {
      // Fall back to plain JSONL below.
    }
  }

  const plainUrl = entryUrl(entry, baseUrl, false);
  if (!plainUrl) {
    throw new CliError("feed_unavailable", "Feed has no URL.", { entry });
  }
  return fetchText(plainUrl);
}

export async function syncFeeds(
  options: { all?: boolean; noCache?: boolean; config?: AppConfig } = {},
): Promise<{ manifest_updated: boolean; feeds: Array<{ name: string; status: string; records: number }> }> {
  const config = options.config ?? loadConfig();
  const manifest = await loadManifest({ noCache: options.noCache, config });
  const feeds = manifest.feeds ?? {};
  const names = options.all ? Object.keys(feeds) : ["search"];
  const results: Array<{ name: string; status: string; records: number }> = [];

  for (const name of names) {
    const entry = feeds[name];
    if (!entry) {
      throw new CliError("feed_unavailable", `Feed not found in manifest: ${name}`, { name });
    }
    const text = await fetchFeedText(entry, manifestUrl(config));
    writeAtomic(feedCachePath(name, config), text.endsWith("\n") ? text : `${text}\n`);
    results.push({
      name,
      status: "updated",
      records: parseJsonl<unknown>(text).length,
    });
  }

  writeAtomic(metaCachePath(config), `${JSON.stringify({ last_sync: new Date().toISOString() }, null, 2)}\n`);
  return { manifest_updated: true, feeds: results };
}

export async function loadFeed<T>(
  name: string,
  options: { noCache?: boolean; config?: AppConfig } = {},
): Promise<T[]> {
  const config = options.config ?? loadConfig();
  const cachePath = feedCachePath(name, config);
  if (!options.noCache && fs.existsSync(cachePath)) {
    return parseJsonl<T>(fs.readFileSync(cachePath, "utf8"));
  }

  const manifest = await loadManifest({ noCache: options.noCache, config });
  const entry = manifest.feeds?.[name];
  if (!entry) {
    throw new CliError("feed_unavailable", `Feed not found in manifest: ${name}`, { name });
  }
  const text = await fetchFeedText(entry, manifestUrl(config));
  writeAtomic(cachePath, text.endsWith("\n") ? text : `${text}\n`);
  return parseJsonl<T>(text);
}

export async function ensureSearchFeed(config: AppConfig = loadConfig()): Promise<SearchRecord[]> {
  try {
    return await loadFeed<SearchRecord>("search", { config });
  } catch {
    await syncFeeds({ config });
    return loadFeed<SearchRecord>("search", { config });
  }
}
