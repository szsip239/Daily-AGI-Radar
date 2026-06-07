import { CliError } from "./errors.js";

export type ParsedHandle = {
  type: string;
  key: string;
  latest: boolean;
};

const SUPPORTED = new Set([
  "github",
  "article",
  "news",
  "skill",
  "briefing",
  "audio",
]);

export function parseHandle(handle: string): ParsedHandle {
  if (handle.startsWith("#")) {
    throw new CliError("unsupported_handle", "Temporary result indexes are not resource handles.", {
      handle,
    });
  }
  const separator = handle.indexOf(":");
  if (separator <= 0) {
    throw new CliError("unsupported_handle", `Invalid resource handle: ${handle}`, { handle });
  }
  const type = handle.slice(0, separator);
  const key = handle.slice(separator + 1);
  if (!SUPPORTED.has(type) || !key) {
    throw new CliError("unsupported_handle", `Unsupported resource handle: ${handle}`, { handle });
  }
  return { type, key, latest: key === "latest" };
}

export function feedForType(type: string): string {
  switch (type) {
    case "github":
      return "details.github";
    case "article":
      return "details.articles";
    case "news":
      return "details.news";
    case "skill":
      return "details.skills";
    case "briefing":
      return "briefings";
    case "audio":
      return "audio";
    default:
      throw new CliError("unsupported_handle", `Unsupported resource type: ${type}`, { type });
  }
}
