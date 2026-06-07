# Search brief mode

## What to build

Implement `search <query> --brief --json` using MiniSearch and fixture search records. This slice returns search-index projection fields only.

## Acceptance criteria

- [x] `search` uses cached or synced search records.
- [x] `--limit` defaults to 10 and caps at 50.
- [x] `--brief` returns projection fields only.
- [x] Results include stable handles and display indexes.
- [x] `get #1` remains invalid.

## Blocked by

- `0003-sync-manifest-and-search-feed`
