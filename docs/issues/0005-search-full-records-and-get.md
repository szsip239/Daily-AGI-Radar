# Search full records and get resources

## What to build

Implement default full search results and `get <resource-handle> --json` by lazy-loading the relevant detail feed.

## Acceptance criteria

- [x] `search <query> --json` returns full records by default.
- [x] Detail feeds load lazily only when needed.
- [x] `get github:owner/repo --json` returns the matching detail record.
- [x] Unsupported or missing handles return stable error envelopes.
- [x] Temporary display indexes are not accepted as handles.

## Blocked by

- `0004-search-brief-mode`
