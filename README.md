# Daily AGI Radar

Daily AGI Radar is a public, read-only AI signal library for agents and humans.

It publishes curated AI/AGI projects, articles, news, skills, briefings, and audio metadata as machine-readable feeds. The `agi-radar` CLI reads those public feeds over HTTPS and supports search, detail lookup, audio download, and URL-only submissions for GitHub projects and SkillHub skills.

## Install

During local development:

```bash
npm install
npm test
node dist/cli.js status --json
```

Future npm usage:

```bash
npx agi-radar@latest status --json
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

## Public Data

The CLI starts from:

```text
https://raw.githubusercontent.com/szsip239/Daily-AGI-Radar/main/data/manifest.json
```

MP3 files are not committed to Git. Audio assets should be published through GitHub Releases, with metadata recorded in the public audio feed.

## Submissions

Public submissions are review candidates, not direct feed writes.

Accepted submission types:

- GitHub projects: `agi-radar submit github <github-repo-url>`
- SkillHub skills: `agi-radar submit skill <skillhub-cn-url>`

Article and news submissions are not accepted in the MVP.

## Development

```bash
npm install
npm test
npm run build
```

The CLI implementation contract is in [docs/cli-spec.md](docs/cli-spec.md).

