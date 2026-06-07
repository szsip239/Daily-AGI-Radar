# Sync manifest and search feed

## What to build

Implement `sync --json` for the lightweight sync path. The command should fetch a fixture manifest and search feed, prefer `.jsonl.gz`, fall back to plain `.jsonl`, and write cache files atomically.

## Acceptance criteria

- [x] `sync --json` refreshes `manifest.json` and the search index.
- [x] The CLI prefers gzip feeds when available.
- [x] The CLI falls back to plain JSONL when gzip fetch fails.
- [x] The JSON result reports updated feeds and record counts.
- [x] Partial failed writes do not leave corrupt cache files.

## Blocked by

- `0002-config-and-cache-status`
