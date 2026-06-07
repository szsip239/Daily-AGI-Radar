<p align="center">
  <img src="https://raw.githubusercontent.com/szsip239/Daily-AGI-Radar/main/assets/daily-agi-radar-hero.png" alt="Daily AGI Radar 社区一起发现 AI 项目和技能" width="100%">
</p>

<p align="center">
  <a href="https://github.com/szsip239/Daily-AGI-Radar/blob/main/README.md">English README</a>
</p>

# Daily AGI Radar

Daily AGI Radar 是一个公开的 AI 信号库，面向希望持续了解 AI 项目、agent skills、文章、新闻、每日简报和音频日报的人与 agent 工具。

它的目标是把每日 AI 信息流沉淀成可搜索、可拉取、可复用的公开资料，让大家更方便地了解当前流程中的 GitHub 项目和 skills，学习新的 AI 使用方法，并通过社区投稿一起共创。

`agi-radar` CLI 会通过 HTTPS 读取公开 feed，支持状态检查、本地同步、搜索、详情查询、音频下载和 URL 投稿。

## 项目意义

AI 工具、agent 框架和实践方法更新很快，单靠人工零散收藏很难长期跟踪。Daily AGI Radar 把每日筛选出来的内容整理成机器可读的公开数据，方便：

- 开发者发现值得关注的 GitHub 项目
- agent 构建者比较 skills、工作流和工具生态
- 学习者观察 AI 工具如何被实际使用
- harness agent 或其他 CLI 工具拉取最新 AI 信号
- 社区成员推荐好项目和好文章

## 你可以用它做什么

- 搜索 AI/AGI 项目、文章、新闻和 skills。
- 通过稳定 handle 获取完整记录，例如 `github:owner/repo` 或 `audio:latest`。
- 从 GitHub Releases 下载每日 MP3 音频简报。
- 不 clone 仓库也能直接通过 CLI 远程搜索公开数据。
- 提交 Issue 推荐 GitHub 项目或文章，参与共创。

## 安装

直接用 `npx`：

```bash
npx agi-radar@latest status --json
npx agi-radar@latest search "agent memory" --json
```

或全局安装：

```bash
npm install -g agi-radar
agi-radar status --json
```

本地开发：

```bash
npm install
npm test
node dist/cli.js status --json
```

## 常用命令

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

更多例子：

```bash
agi-radar search "Claude Code skills" --limit 10 --json
agi-radar search "agent workflow automation" --no-cache --json
agi-radar get github:owner/repo --json
agi-radar get briefing:latest --json
agi-radar get audio:latest --download ./daily-agi-radar.mp3
```

## 公开数据

CLI 默认从这里读取 manifest：

```text
https://raw.githubusercontent.com/szsip239/Daily-AGI-Radar/main/data/manifest.json
```

默认公开数据包括：

- 搜索 feed：`data/search.jsonl.gz`
- 详情 feed：`data/details/*.jsonl.gz`
- 每日简报：`reports/daily/YYYY-MM-DD.md`
- 音频元数据：`data/audio.jsonl.gz`
- MP3 文件：按月份发布到 GitHub Releases，例如 `audio-2026-06`

MP3 不直接提交到 Git 仓库，避免仓库体积持续膨胀。

## 共同创作

Daily AGI Radar 希望成为一个共享学习资料库。公开投稿会作为候选内容进入审核流程，不会直接写入公开 feed。

欢迎通过 Issue 推荐：

- 值得跟踪的 GitHub 项目
- 值得阅读和总结的文章

CLI 目前也支持为部分 URL 类型创建审核 Issue：

```bash
agi-radar submit github https://github.com/owner/repo
agi-radar submit skill https://skillhub.cn/skills/example
```

提交时请附上 URL，并简单说明它为什么对 AI 构建者或学习者有价值。

## 开发

```bash
npm install
npm test
npm run build
```

CLI 实现约定见 [docs/cli-spec.md](docs/cli-spec.md)。
