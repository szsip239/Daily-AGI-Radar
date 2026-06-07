<p align="center">
  <img src="https://raw.githubusercontent.com/szsip239/Daily-AGI-Radar/main/assets/daily-agi-radar-hero.png" alt="Daily AGI Radar community discovering AI projects and skills" width="100%">
</p>

<p align="center">
  <a href="https://github.com/szsip239/Daily-AGI-Radar/blob/main/README.zh-CN.md">中文 README</a>
</p>

# Daily AGI Radar

Daily AGI Radar is a public AI signal library for people and agents who want to keep up with useful AI projects, agent skills, articles, news, daily briefings, and audio summaries.

The goal is simple: make it easier for everyone to discover current GitHub projects and practical skills, learn how AI tools are evolving, and improve their own AI workflows through a shared, searchable knowledge feed.

The `agi-radar` CLI reads public feeds over HTTPS. It supports status checks, local sync, search, detail lookup, audio download, and URL-only submissions.

## Why It Exists

AI moves too quickly for one person to track manually. Daily AGI Radar turns a daily curation pipeline into public, machine-readable material that can be used by:

- developers looking for useful GitHub projects
- agent builders comparing skills and workflows
- learners studying how current AI tools are being used
- CLI tools and harness agents that need fresh public AI signals
- community members who want to recommend good projects and articles

## What You Can Do

- Search AI/AGI projects, articles, news, and skills.
- Fetch complete records by stable handles such as `github:owner/repo` or `audio:latest`.
- Download daily MP3 briefings from GitHub Releases.
- Use the feeds without cloning the repository.
- Open an issue to recommend GitHub projects or articles for review.

## Install

Use directly with `npx`:

```bash
npx agi-radar@latest status --json
npx agi-radar@latest search "agent memory" --json
```

Or install globally:

```bash
npm install -g agi-radar
agi-radar status --json
```

During local development:

```bash
npm install
npm test
node dist/cli.js status --json
```

## Commands

```bash
agi-radar status --json
agi-radar config list --json
agi-radar sync --json
agi-radar search "agent memory" --json
agi-radar get github:owner/repo --json
agi-radar get audio:latest --download ./daily.mp3
agi-radar submit github https://github.com/owner/repo
agi-radar submit skill https://skillhub.cn/skills/example
```

Useful examples:

```bash
agi-radar search "Claude Code skills" --limit 10 --json
agi-radar search "agent workflow automation" --no-cache --json
agi-radar get github:owner/repo --json
agi-radar get briefing:latest --json
agi-radar get audio:latest --download ./daily-agi-radar.mp3
```

## Public Data

The CLI starts from:

```text
https://raw.githubusercontent.com/szsip239/Daily-AGI-Radar/main/data/manifest.json
```

MP3 files are not committed to Git. Audio assets should be published through GitHub Releases, with metadata recorded in the public audio feed.

The default manifest includes:

- Search feed: `data/search.jsonl.gz`
- Detail feeds: `data/details/*.jsonl.gz`
- Daily briefings: `reports/daily/YYYY-MM-DD.md`
- Audio metadata: `data/audio.jsonl.gz`
- MP3 assets: monthly GitHub Releases such as `audio-2026-06`

## Co-Create

Daily AGI Radar is meant to become a shared learning resource. Public submissions are review candidates, not direct feed writes.

You can help by opening an issue to recommend:

- GitHub projects worth tracking
- articles worth reading and summarizing

The CLI can also create review issues for supported URL types:

```bash
agi-radar submit github https://github.com/owner/repo
agi-radar submit skill https://skillhub.cn/skills/example
```

Submissions are reviewed before they enter public feeds. Please include the URL and a short reason why it is useful for AI builders or learners.

## Development

```bash
npm install
npm test
npm run build
```

The CLI implementation contract is in [docs/cli-spec.md](docs/cli-spec.md).
