import path from "node:path";
import { fetchBytes } from "./http.js";
import { loadConfig } from "./config.js";
import { loadFeed, loadManifest } from "./feeds.js";
import { CliError } from "./errors.js";
import { feedForType, parseHandle } from "./handles.js";
import { writeAtomic } from "./cache.js";

export async function getResource(options: {
  handle: string;
  download?: string;
  noCache?: boolean;
}): Promise<unknown> {
  const parsed = parseHandle(options.handle);
  if (options.download && parsed.type !== "audio") {
    throw new CliError("unsupported_download", "Only audio resources can be downloaded.", {
      handle: options.handle,
    });
  }

  const resolvedHandle = parsed.latest ? await latestHandle(parsed.type, options.noCache) : options.handle;
  const record = await findRecord(resolvedHandle, options.noCache);

  if (options.download) {
    const rawAssetUrl = String(record.asset_url ?? record.download_url ?? record.url ?? "");
    if (!rawAssetUrl) {
      throw new CliError("unsupported_download", "Audio record has no asset URL.", {
        handle: resolvedHandle,
      });
    }
    const assetUrl = await resolveAssetUrl(rawAssetUrl, options.noCache);
    const outputPath = path.resolve(options.download);
    writeAtomic(outputPath, await fetchBytes(assetUrl));
    return {
      handle: resolvedHandle,
      type: "audio",
      downloaded_to: outputPath,
      asset_url: assetUrl,
    };
  }

  return {
    handle: resolvedHandle,
    type: parseHandle(resolvedHandle).type,
    record,
  };
}

async function latestHandle(type: string, noCache?: boolean): Promise<string> {
  const manifest = await loadManifest({ noCache });
  const fromManifest = manifest.latest?.[type];
  if (fromManifest) return fromManifest;

  const records = await loadFeed<Record<string, unknown>>(feedForType(type), { noCache });
  const sorted = [...records].sort((a, b) => {
    const left = String(a.signal_date ?? a.date ?? "");
    const right = String(b.signal_date ?? b.date ?? "");
    return right.localeCompare(left);
  });
  const handle = sorted[0]?.handle;
  if (!handle || typeof handle !== "string") {
    throw new CliError("not_found", `No latest ${type} resource found.`, { type });
  }
  return handle;
}

async function findRecord(handle: string, noCache?: boolean): Promise<Record<string, unknown>> {
  const parsed = parseHandle(handle);
  const records = await loadFeed<Record<string, unknown>>(feedForType(parsed.type), { noCache });
  const record = records.find((candidate) => candidate.handle === handle);
  if (!record) {
    throw new CliError("not_found", `Resource not found: ${handle}`, { handle });
  }
  return record;
}

async function resolveAssetUrl(rawUrl: string, noCache?: boolean): Promise<string> {
  try {
    return new URL(rawUrl).toString();
  } catch {
    const config = loadConfig();
    const manifest = await loadManifest({ noCache, config });
    return new URL(rawUrl, String(config["feed.manifest_url"])).toString();
  }
}
