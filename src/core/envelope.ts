import { CliError, toCliError } from "./errors.js";

export type JsonEnvelope =
  | {
      ok: true;
      command: string;
      data: unknown;
      error: null;
    }
  | {
      ok: false;
      command: string;
      data: null;
      error: {
        code: string;
        message: string;
        details: Record<string, unknown>;
      };
    };

export function success(command: string, data: unknown): JsonEnvelope {
  return { ok: true, command, data, error: null };
}

export function failure(command: string, error: unknown): JsonEnvelope {
  const cliError: CliError = toCliError(error);
  return {
    ok: false,
    command,
    data: null,
    error: {
      code: cliError.code,
      message: cliError.message,
      details: cliError.details,
    },
  };
}

export function printJson(envelope: JsonEnvelope): void {
  process.stdout.write(`${JSON.stringify(envelope)}\n`);
}
