# Config and cache status

## What to build

Extend `status` and add the `config` command so the CLI reports version, manifest URL, cache directory, cache state, and GitHub token availability without exposing secrets.

## Acceptance criteria

- [x] `agi-radar config list --json` returns supported config keys.
- [x] `agi-radar config get <key> --json` returns configured or default values.
- [x] `agi-radar config set <key> <value> --json` persists non-secret config.
- [x] `agi-radar config reset <key> --json` restores the default value.
- [x] `status --json` reports cache directory and token availability without printing token values.

## Blocked by

- `0001-cli-scaffold-json-envelope`
