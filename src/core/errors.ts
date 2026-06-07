export class CliError extends Error {
  code: string;
  details: Record<string, unknown>;

  constructor(code: string, message: string, details: Record<string, unknown> = {}) {
    super(message);
    this.name = "CliError";
    this.code = code;
    this.details = details;
  }
}

export function toCliError(error: unknown): CliError {
  if (error instanceof CliError) {
    return error;
  }
  if (error instanceof Error) {
    return new CliError("network_error", error.message);
  }
  return new CliError("network_error", String(error));
}
