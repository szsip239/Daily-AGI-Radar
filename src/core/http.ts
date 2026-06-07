import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";
import { CliError } from "./errors.js";

export async function fetchBytes(url: string, init?: RequestInit): Promise<Buffer> {
  if (url.startsWith("file://")) {
    return fs.readFileSync(fileURLToPath(url));
  }

  const response = await fetch(url, init);
  if (!response.ok) {
    throw new CliError("network_error", `Failed to fetch ${url}: ${response.status}`, {
      url,
      status: response.status,
    });
  }
  return Buffer.from(await response.arrayBuffer());
}

export async function fetchText(url: string, init?: RequestInit): Promise<string> {
  return (await fetchBytes(url, init)).toString("utf8");
}

export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  return JSON.parse(await fetchText(url, init)) as T;
}

export async function fetchGzipText(url: string): Promise<string> {
  return gunzipSync(await fetchBytes(url)).toString("utf8");
}
