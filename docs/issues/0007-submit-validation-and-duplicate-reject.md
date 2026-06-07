# Submit validation and duplicate reject

## What to build

Implement URL-only `submit github <url>` and `submit skill <url>` local validation. The CLI should reject invalid URLs, unsupported types, non-`skillhub.cn` skill URLs, and duplicates already present in public feeds.

## Acceptance criteria

- [x] GitHub URLs normalize to `github.com/<owner>/<repo>`.
- [x] Skill submissions accept only `skillhub.cn`.
- [x] Article and news URLs are rejected.
- [x] Duplicate submissions return `duplicate_submission` with the existing handle when available.
- [x] There is no `--force` option.

## Blocked by

- `0003-sync-manifest-and-search-feed`
