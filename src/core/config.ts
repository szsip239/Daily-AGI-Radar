import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { CliError } from "./errors.js";

export type ConfigKey =
  | "feed.manifest_url"
  | "cache.dir"
  | "cache.ttl_hours"
  | "github.submission_repo";

export type ConfigValue = string | number;

export type AppConfig = Record<ConfigKey, ConfigValue>;

const CONFIG_KEYS: ConfigKey[] = [
  "feed.manifest_url",
  "cache.dir",
  "cache.ttl_hours",
  "github.submission_repo",
];

export function supportedConfigKeys(): ConfigKey[] {
  return [...CONFIG_KEYS];
}

export function configPath(env: NodeJS.ProcessEnv = process.env): string {
  return (
    env.AGI_RADAR_CONFIG_PATH ??
    path.join(os.homedir(), ".config", "agi-radar", "config.json")
  );
}

export function defaultConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return {
    "feed.manifest_url":
      env.AGI_RADAR_MANIFEST_URL ??
      "https://raw.githubusercontent.com/szsip239/Daily-AGI-Radar/main/data/manifest.json",
    "cache.dir":
      env.AGI_RADAR_CACHE_DIR ?? path.join(os.homedir(), ".cache", "agi-radar"),
    "cache.ttl_hours": env.AGI_RADAR_CACHE_TTL_HOURS
      ? Number(env.AGI_RADAR_CACHE_TTL_HOURS)
      : 24,
    "github.submission_repo":
      env.AGI_RADAR_SUBMISSION_REPO ?? "szsip239/Daily-AGI-Radar",
  };
}

function readUserConfig(env: NodeJS.ProcessEnv = process.env): Partial<AppConfig> {
  const file = configPath(env);
  if (!fs.existsSync(file)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(file, "utf8")) as Partial<AppConfig>;
}

function writeUserConfig(config: Partial<AppConfig>, env: NodeJS.ProcessEnv = process.env): void {
  const file = configPath(env);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(config, null, 2)}\n`, "utf8");
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return {
    ...defaultConfig(env),
    ...readUserConfig(env),
  };
}

export function getConfigValue(key: string, env: NodeJS.ProcessEnv = process.env): ConfigValue {
  if (!CONFIG_KEYS.includes(key as ConfigKey)) {
    throw new CliError("invalid_args", `Unsupported config key: ${key}`, { key });
  }
  return loadConfig(env)[key as ConfigKey];
}

export function setConfigValue(
  key: string,
  rawValue: string,
  env: NodeJS.ProcessEnv = process.env,
): { key: ConfigKey; value: ConfigValue } {
  if (!CONFIG_KEYS.includes(key as ConfigKey)) {
    throw new CliError("invalid_args", `Unsupported config key: ${key}`, { key });
  }
  if (key.toLowerCase().includes("token")) {
    throw new CliError("invalid_args", "Tokens must come from environment variables.", { key });
  }

  const configKey = key as ConfigKey;
  const userConfig = readUserConfig(env);
  const value = configKey === "cache.ttl_hours" ? Number(rawValue) : rawValue;
  if (configKey === "cache.ttl_hours" && !Number.isFinite(value)) {
    throw new CliError("invalid_args", "cache.ttl_hours must be a number.", { value: rawValue });
  }
  userConfig[configKey] = value;
  writeUserConfig(userConfig, env);
  return { key: configKey, value };
}

export function resetConfigValue(
  key: string,
  env: NodeJS.ProcessEnv = process.env,
): { key: ConfigKey; value: ConfigValue } {
  if (!CONFIG_KEYS.includes(key as ConfigKey)) {
    throw new CliError("invalid_args", `Unsupported config key: ${key}`, { key });
  }
  const configKey = key as ConfigKey;
  const userConfig = readUserConfig(env);
  delete userConfig[configKey];
  writeUserConfig(userConfig, env);
  return { key: configKey, value: defaultConfig(env)[configKey] };
}

export function listConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return loadConfig(env);
}

export function githubToken(env: NodeJS.ProcessEnv = process.env): string | null {
  return env.AGI_RADAR_GITHUB_TOKEN ?? env.GITHUB_TOKEN ?? null;
}

export function githubTokenAvailable(env: NodeJS.ProcessEnv = process.env): boolean {
  return Boolean(githubToken(env));
}
