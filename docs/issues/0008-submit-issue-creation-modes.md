# Submit issue creation modes

## What to build

Complete `submit` by producing structured GitHub submission issues. Without a token, return a prefilled issue URL. With a token, create the issue through the GitHub API.

## Acceptance criteria

- [x] Without token, `submit` returns `mode: "prefilled_issue_url"`.
- [x] With token, `submit` returns `mode: "created_issue"` using a mocked GitHub API in tests.
- [x] GitHub issue titles use `[github] owner/repo`.
- [x] Skill issue titles use `[skill] <skillhub slug or title>`.
- [x] Issue body includes the JSON payload `{ "kind": "...", "url": "..." }`.
- [x] Tokens are never written to issue payloads, public docs, or feeds.

## Blocked by

- `0007-submit-validation-and-duplicate-reject`
