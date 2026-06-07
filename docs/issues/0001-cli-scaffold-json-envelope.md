# CLI scaffold and JSON envelope

## What to build

Create the TypeScript npm CLI scaffold and implement the first observable command: `agi-radar status --json`. The command should execute through the built CLI entrypoint and return the stable JSON envelope defined in `docs/cli-spec.md`.

## Acceptance criteria

- [x] `npm test` runs the TypeScript test suite.
- [x] A subprocess test can execute the CLI entrypoint with `status --json`.
- [x] `status --json` returns `{ ok, command, data, error }`.
- [x] The command field is `status`.
- [x] No REPL or session behavior is introduced.

## Blocked by

None - can start immediately.
