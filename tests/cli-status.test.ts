import { spawnSync } from "node:child_process";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(__dirname, "..");

describe("agi-radar status", () => {
  it("prints the stable JSON envelope", () => {
    const result = spawnSync(
      process.execPath,
      ["dist/cli.js", "status", "--json"],
      {
        cwd: projectRoot,
        encoding: "utf8",
      },
    );

    expect(result.status).toBe(0);

    const payload = JSON.parse(result.stdout);
    expect(payload).toEqual({
      ok: true,
      command: "status",
      data: expect.any(Object),
      error: null,
    });
  });
});
