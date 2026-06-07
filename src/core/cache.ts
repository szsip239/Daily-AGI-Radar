import fs from "node:fs";
import path from "node:path";
import { AppConfig, loadConfig } from "./config.js";

export function cacheDir(config: AppConfig = loadConfig()): string {
  return String(config["cache.dir"]);
}

export function manifestCachePath(config: AppConfig = loadConfig()): string {
  return path.join(cacheDir(config), "manifest.json");
}

export function feedCachePath(name: string, config: AppConfig = loadConfig()): string {
  const safeName = name.replace(/[^a-zA-Z0-9_.-]/g, "_");
  return path.join(cacheDir(config), "feeds", `${safeName}.jsonl`);
}

export function metaCachePath(config: AppConfig = loadConfig()): string {
  return path.join(cacheDir(config), "meta.json");
}

export function writeAtomic(filePath: string, content: string | Buffer): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const tempPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tempPath, content);
  fs.renameSync(tempPath, filePath);
}

export function readJsonFile<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

export function cacheStatus(config: AppConfig = loadConfig()): {
  has_manifest: boolean;
  has_search: boolean;
  last_sync: string | null;
} {
  let lastSync: string | null = null;
  const metaPath = metaCachePath(config);
  if (fs.existsSync(metaPath)) {
    const meta = readJsonFile<{ last_sync?: string }>(metaPath);
    lastSync = meta.last_sync ?? null;
  }

  return {
    has_manifest: fs.existsSync(manifestCachePath(config)),
    has_search: fs.existsSync(feedCachePath("search", config)),
    last_sync: lastSync,
  };
}
