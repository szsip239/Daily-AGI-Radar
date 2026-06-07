# AGI Radar CLI Specification

This document is the MVP implementation contract for `agi-radar`, the Daily AGI Radar command-line interface.

It records command behavior, JSON output, caching, submission handling, and test expectations. Product decisions live in `CONTEXT.md` and `docs/adr/*.md`; this file turns those decisions into implementable CLI contracts.

## Scope

`agi-radar` is a TypeScript npm CLI distributed as the `agi-radar` package and `agi-radar` binary. It reads public Daily AGI Radar feeds over HTTPS and does not require `git`, repository cloning, Python, Feishu access, or a runtime LLM.

MVP commands:

- `search`
- `get`
- `submit`
- `sync`
- `status`
- `config`

Non-goals:

- no REPL;
- no session state;
- no `get #1` temporary result references;
- no user-provided reasons, tags, scores, or categories for submissions;
- no article or news submissions;
- no runtime LLM ranking, summarization, or enrichment;
- no MP3 files committed to Git.

## Global Contract

### Output Modes

Human-readable output is the default.

Every command supports `--json`. JSON output must use this envelope:

```json
{
  "ok": true,
  "command": "search",
  "data": {},
  "error": null
}
```

Failure output:

```json
{
  "ok": false,
  "command": "submit",
  "data": null,
  "error": {
    "code": "duplicate_submission",
    "message": "This URL is already published.",
    "details": {}
  }
}
```

### Error Codes

Stable error codes:

- `invalid_args`
- `invalid_url`
- `unsupported_submission_type`
- `duplicate_submission`
- `feed_unavailable`
- `cache_unavailable`
- `not_found`
- `unsupported_handle`
- `unsupported_download`
- `github_auth_failed`
- `github_api_error`
- `network_error`
- `write_failed`

### Cache Behavior

The CLI is cache-first.

- Missing cache triggers lightweight sync of `manifest.json` and the search index.
- Stale cache may trigger lightweight sync before command execution.
- `--no-cache` forces remote fetch for the command.
- Detail feeds are loaded lazily when full records are needed.
- The CLI prefers `.jsonl.gz` and falls back to plain `.jsonl`.

`submit` must load the search index before creating or pre-filling an issue. If no usable cached or remote search index is available, `submit` fails with `feed_unavailable` instead of risking duplicate submissions.

### Public Feeds

The CLI starts from `manifest.json`. Logical feed names:

- `search`
- `details.github`
- `details.articles`
- `details.news`
- `details.skills`
- `briefings`
- `audio`

The exact URLs are read from `manifest.json`; command code should not hard-code raw GitHub paths except for the default manifest URL.

### Search Record

The search index is a projection for candidate retrieval. Each row should contain enough data to search, filter, display a brief result, and locate the detail feed.

Required fields:

```json
{
  "handle": "github:owner/repo",
  "type": "github",
  "title": "Repository title",
  "url": "https://github.com/owner/repo",
  "summary": "Short public summary",
  "source": "github",
  "signal_date": "2026-06-07",
  "detail_feed": "details.github",
  "detail_key": "owner/repo"
}
```

Allowed `type` values:

- `github`
- `article`
- `news`
- `skill`
- `briefing`
- `audio`

## Resource Handles

Commands must use stable resource handles, not temporary display indexes.

Supported handle forms:

- `github:owner/repo`
- `article:YYYY-MM-DD-shorthash`
- `news:YYYY-MM-DD-shorthash`
- `skill:<skillhub-slug-or-stable-key>`
- `briefing:YYYY-MM-DD`
- `briefing:latest`
- `audio:YYYY-MM-DD`
- `audio:latest`

Search output may display `[1]`, `[2]`, and JSON results may include `index`, but `get #1` is invalid.

## `search`

Usage:

```bash
agi-radar search <query> [--type <type>] [--from <date>] [--to <date>] [--limit <n>] [--brief] [--no-cache] [--json]
```

Defaults:

- `--limit` defaults to `10`.
- `--limit` maximum is `50`.
- Search returns full records by default.
- `--brief` returns only search-index projection fields.

Behavior:

- Uses MiniSearch as the lexical search core.
- Uses a custom tokenizer suitable for mixed English, code terms, URLs, and CJK text.
- Complex queries should use broad candidate recall rather than requiring the entire user query as one exact phrase.
- Phrase matches and exact key matches may boost deterministic rank.
- Ranking is deterministic and does not call an LLM.
- Returned results include `rank_reason` and `matched_terms` when available.

JSON success:

```json
{
  "ok": true,
  "command": "search",
  "data": {
    "query": "agent memory",
    "limit": 10,
    "brief": false,
    "results": [
      {
        "index": 1,
        "handle": "github:owner/repo",
        "type": "github",
        "score": 12.34,
        "matched_terms": ["agent", "memory"],
        "rank_reason": ["title_match", "summary_match"],
        "record": {}
      }
    ]
  },
  "error": null
}
```

## `get`

Usage:

```bash
agi-radar get <resource-handle> [--download <path>] [--no-cache] [--json]
```

Behavior:

- Resolves stable resource handles only.
- Loads the relevant detail feed lazily.
- `briefing:latest` resolves to the latest briefing entry in the manifest or briefing feed.
- `audio:latest` resolves to the latest audio entry in the manifest or audio feed.
- `--download` is valid for audio resources and downloads the GitHub Release asset.
- `--download` on non-downloadable resources fails with `unsupported_download`.

JSON success for a normal resource:

```json
{
  "ok": true,
  "command": "get",
  "data": {
    "handle": "github:owner/repo",
    "type": "github",
    "record": {}
  },
  "error": null
}
```

JSON success for audio download:

```json
{
  "ok": true,
  "command": "get",
  "data": {
    "handle": "audio:2026-06-07",
    "type": "audio",
    "downloaded_to": "/absolute/path/audio.mp3",
    "asset_url": "https://github.com/owner/repo/releases/download/audio-2026-06/2026-06-07.mp3"
  },
  "error": null
}
```

## `submit`

Usage:

```bash
agi-radar submit github <github-repo-url> [--json]
agi-radar submit skill <skillhub-cn-url> [--json]
```

Accepted submissions:

- GitHub project URLs that normalize to `github.com/<owner>/<repo>`.
- Skill URLs from `skillhub.cn`.

Rejected submissions:

- article URLs;
- news URLs;
- non-`skillhub.cn` skill URLs;
- duplicate URLs already present in cached public feeds;
- invalid GitHub repository URLs.

There is no `--force`.

The submitter supplies only a URL. The CLI must not require reason, tags, score, category, contact, or manual metadata.

Local validation:

- normalize URL;
- validate supported type;
- load search index;
- reject duplicates and return existing resource handle when available.

Submission issue title:

- GitHub: `[github] owner/repo`
- Skill: `[skill] <skillhub slug or title>`

Submission issue JSON payload:

```json
{
  "kind": "github",
  "url": "https://github.com/owner/repo"
}
```

Auth modes:

- Without a GitHub token, return a prefilled GitHub issue URL.
- With a GitHub token, create the issue directly through GitHub API.

Token discovery:

- Prefer `AGI_RADAR_GITHUB_TOKEN`.
- Fall back to `GITHUB_TOKEN`.
- Do not store tokens in public docs, feeds, or issue payloads.

JSON success without token:

```json
{
  "ok": true,
  "command": "submit",
  "data": {
    "mode": "prefilled_issue_url",
    "issue_url": "https://github.com/owner/repo/issues/new?...",
    "title": "[github] owner/repo",
    "payload": {
      "kind": "github",
      "url": "https://github.com/owner/repo"
    }
  },
  "error": null
}
```

JSON success with token:

```json
{
  "ok": true,
  "command": "submit",
  "data": {
    "mode": "created_issue",
    "issue_url": "https://github.com/owner/repo/issues/123",
    "issue_number": 123,
    "title": "[github] owner/repo",
    "payload": {
      "kind": "github",
      "url": "https://github.com/owner/repo"
    }
  },
  "error": null
}
```

JSON duplicate failure:

```json
{
  "ok": false,
  "command": "submit",
  "data": null,
  "error": {
    "code": "duplicate_submission",
    "message": "This URL is already published.",
    "details": {
      "existing_handle": "github:owner/repo"
    }
  }
}
```

## `sync`

Usage:

```bash
agi-radar sync [--all] [--no-cache] [--json]
```

Behavior:

- Without `--all`, refresh `manifest.json` and the search index.
- With `--all`, refresh manifest, search index, detail feeds, briefings, and audio manifest.
- Prefer `.gz` feeds and fall back to plain feeds.
- Write cache atomically to avoid partial cache state.

JSON success:

```json
{
  "ok": true,
  "command": "sync",
  "data": {
    "manifest_updated": true,
    "feeds": [
      {
        "name": "search",
        "status": "updated",
        "records": 4584
      }
    ]
  },
  "error": null
}
```

## `status`

Usage:

```bash
agi-radar status [--json]
```

Behavior:

- Reports CLI version.
- Reports configured feed base and manifest URL.
- Reports cache directory and cache freshness.
- Reports known feed counts from the manifest or cached feeds.
- Reports whether a GitHub token is available for `submit`.

JSON success:

```json
{
  "ok": true,
  "command": "status",
  "data": {
    "version": "0.1.0",
    "feed_base_url": "https://raw.githubusercontent.com/szsip239/Daily-AGI-Radar/main/data",
    "cache_dir": "/absolute/cache/path",
    "cache": {
      "has_manifest": true,
      "has_search": true,
      "last_sync": "2026-06-07T00:00:00.000Z"
    },
    "github_token_available": false
  },
  "error": null
}
```

## `config`

Usage:

```bash
agi-radar config list [--json]
agi-radar config get <key> [--json]
agi-radar config set <key> <value> [--json]
agi-radar config reset <key> [--json]
```

Supported config keys:

- `feed.manifest_url`
- `cache.dir`
- `cache.ttl_hours`
- `github.submission_repo`

Secrets such as GitHub tokens should come from environment variables, not `config set`.

JSON success:

```json
{
  "ok": true,
  "command": "config",
  "data": {
    "key": "cache.ttl_hours",
    "value": 24
  },
  "error": null
}
```

## Test Matrix

Core unit tests:

- parse resource handles and reject `#1`;
- normalize GitHub URLs to `owner/repo`;
- validate `skillhub.cn` skill URLs;
- reject article and news URLs in `submit`;
- reject duplicate submissions from cached search records;
- produce stable JSON envelopes for success and failure;
- cap `search --limit` at `50`;
- prefer `.jsonl.gz` when both gzip and plain feeds are available;
- fall back to plain `.jsonl` when gzip fetch fails.

Workflow tests:

- `sync` against a fixture manifest and fixture feeds;
- `search` returns brief records with `--brief`;
- `search` returns full records by lazy-loading detail feeds by default;
- `get github:owner/repo` returns the matching detail record;
- `get audio:latest --download <path>` downloads a fixture asset;
- `submit github <url>` without token returns a prefilled issue URL;
- `submit github <url>` with token uses a mocked GitHub API call;
- `submit skill <url>` creates a skill submission payload;
- duplicate `submit` returns `duplicate_submission`.

Installed-command tests should invoke the built binary through subprocess, not only internal module imports.
