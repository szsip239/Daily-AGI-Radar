<p align="center">
  <img src="https://raw.githubusercontent.com/szsip239/Daily-AGI-Radar/main/assets/daily-agi-radar-workflow.png" alt="Daily AGI Radar 每日 AI 雷达流程架构图" width="100%">
</p>

# Daily AGI Radar 每日 AI 雷达

你是否有这样的困扰：每天想了解最新的 AI 动态和项目动态，互联网上却有太多噪音；想学习 AI 相关文章，不知道哪些值得读；想开发一个项目时，又要去 GitHub 上搜半天。现在，我把自己已经每天固定爬取的 GitHub 热门项目、WayToAGI 的精选博客文章、SkillHub 上的热门 skill，以及每天基于这些信息生成的日报和 MP3 播客，都开源到本项目中。

使用方式有两种：

1. 通过 `agi-radar` CLI，让你的 agent、脚本或 harness 工具自动拉取、搜索这些资料。
2. 打开飞书知识库直接浏览：[共享知识空间](https://ask.feishu.cn/shared-space/7647524040143342540) 或 [知识库页面](https://dcn3dkdkiman.feishu.cn/wiki/I7o0wZ2AYiWo3MkOCZTcuAwSnZf)。

两种方式读取的是同一批每日沉淀内容：GitHub 项目、精选文章、SkillHub skills、AI 新闻、Markdown 日报和 MP3 播客。

## 这个项目解决什么

Daily AGI Radar 是一个公开的 AI 信号库。它不是新闻站，也不是又一个收藏夹，而是把每天已经筛选、整理、生成日报的 AI 信息流变成可搜索、可拉取、可共创的公开资料。

它适合三类使用者：

- 想持续了解 AI 项目、skills、文章和行业动态的人。
- 想让自己的 agent 自动查询资料、补充上下文、生成学习摘要的人。
- 想把自己发现的好项目和好文章推荐进公共资料库的人。

## 数据从哪里来

目前每日管线会固定处理这些来源：

| 数据源 | 内容 |
| --- | --- |
| GitHub Trending / GitHub 搜索 | AI/AGI 相关热门项目、增长项目、工具项目 |
| WayToAGI | 精选博客文章、教程、观点和实践内容 |
| SkillHub | 热门 agent skills，包含能力、安装量、增长等信号 |
| AI 新闻源 | 每日 AI 新闻、产品动态、行业事件 |
| 社区 Issue 推荐 | 用户推荐的 GitHub 项目、SkillHub skill 和文章候选 |

## 当前收藏/入库条件

下面是当前每日 cron 管线里的实际规则。采集到不等于一定入库，新记录还需要完成 AI 增强和基础质量校验。

| 类型 | 采集范围 | 入库条件 | 说明 |
| --- | --- | --- | --- |
| GitHub 项目 | 抓取 GitHub Trending 的 daily、weekly、monthly 三个榜单，按 `owner/repo` 去重合并；同一项目会合并趋势类型，并保留最大的 `stars增加`；同时抓取 README 前 3000 字作为 AI 增强上下文。 | 如果是飞书 Base 里的新项目，必须完成 AI 增强，且 `分类`、`项目readme总结` 非空；否则跳过。当前没有额外写死的 star 下限。 | 已存在项目不会重复入库，但会用于记录当日 star 增长和日报展示。 |
| WayToAGI 文章 | 优先抓取 WayToAGI 飞书 Wiki 的近 7 日更新；如果 Wiki 抓取失败，则回退到 `waytoagi.com` 近 7 日博客；再合并手动补充列表；按 URL 或标题去重。 | 如果是新文章，必须完成 AI 增强，且 `分类`、`文章总结` 非空；否则跳过。`推荐程度` 会生成 1-5 分，存在时写入，但当前不是硬过滤阈值。 | Wiki 文档会尽量抓取正文摘要供 AI 总结使用，单次最多抓取 20 篇正文摘要。 |
| SkillHub Skills | 优先抓取 SkillHub API 综合排序前 200 条，按 `slug` 去重；SkillHub 无数据时才用 ClawHub 搜索和详情接口兜底；公开链接统一归一化为 `https://skillhub.cn/skills/{slug}`。 | 如果是新 skill，安装量必须 `> 1500`，并且完成 AI 增强，且 `分类`、`技能能力总结` 非空；否则跳过。 | 已存在 skill 不重复入库，只在发现旧链接不规范时修正技能地址。 |

## 当前已经有多少数据

截至 2026-06-07 的公开 manifest：

| Feed | 数量 | 内容 |
| --- | ---: | --- |
| 搜索记录 | 4,776 | 用于 CLI 快速搜索的紧凑记录，覆盖所有公开信号 |
| GitHub 项目 | 395 | AI/AGI 趋势仓库，含 stars、增长、分类、总结、推荐理由 |
| Skills | 2,520 | SkillHub skills，含安装量、分类、能力总结、推荐理由 |
| 文章 | 421 | 精选文章，含原文链接、作者、日期、分类、摘要、推荐分 |
| 新闻 | 1,299 | AI 新闻，含来源链接、日期、分类、内容整理 |
| 每日简报 | 76 | `reports/daily/` 下的 Markdown 日报 |
| 音频日报 | 65 | MP3 元数据，音频文件保存在按月划分的 GitHub Releases |

实时数量可以通过完整同步查看：

```bash
npx agi-radar@latest sync --all --json
```

## 每天怎么更新

本项目的数据由本地日报管线每天同步到 GitHub：

1. 抓取 GitHub 项目、WayToAGI 文章、SkillHub skills 和 AI 新闻。
2. 用 AI 补充分类、摘要、推荐理由和质量信号。
3. 写入飞书 Base，用于审核、去重和历史记录。
4. 基于当天内容生成 Markdown 日报和 MP3 播客。
5. 导出公开 JSONL feed 和 `.gz` 压缩文件。
6. 提交 `data/`、`reports/` 到 GitHub，把 MP3 上传到 GitHub Releases。
7. 发布后校验本地与 GitHub 远端数据、日报和音频资产是否一致。

## 数据字段长什么样

搜索 feed 只保留适合快速检索的字段：

```text
handle, type, title, url, summary, source, signal_date,
category, rank_signals, detail_feed, detail_key
```

详情 feed 保留完整公开记录：

| 类型 | 稳定 handle | 关键字段 |
| --- | --- | --- |
| GitHub 项目 | `github:owner/repo` | 项目链接、作者、分类、stars、stars 增长、趋势类型、README 总结、推荐理由 |
| Skill | `skill:slug` | skill 链接、分类、能力总结、安装量、安装增长、stars、推荐理由 |
| 文章 | `article:date-id` | 原文链接、作者、文章日期、分类、摘要、推荐程度 |
| 新闻 | `news:date-id` | 来源链接、日期、分类、内容整理、来源 |
| 简报 | `briefing:YYYY-MM-DD` | 日报 Markdown URL、本地路径、摘要 |
| 音频 | `audio:YYYY-MM-DD` | MP3 Release URL、文件名、release tag、文件大小 |

每条详情记录还包含 `fields` 对象，保留筛选管线里的原始公开字段名，方便用户或自己的 LLM 做二次整理。

## 用户怎么获取

不需要 clone 仓库，也不需要永久安装，直接用 `npx`：

```bash
npx agi-radar@latest search "agent memory" --json
npx agi-radar@latest get github:owner/repo --json
npx agi-radar@latest get briefing:latest --json
npx agi-radar@latest get audio:latest --download ./daily.mp3
```

也可以全局安装：

```bash
npm install -g agi-radar
agi-radar sync --json
agi-radar search "Claude Code skills" --limit 10 --json
agi-radar get audio:latest --download ./daily-agi-radar.mp3
```

给 agent、脚本或自动化流程用时，建议加 `--json`。人直接在终端看，可以不加。

## 命令速查

```bash
agi-radar status --json
agi-radar sync --all --json
agi-radar search "agent workflow automation" --limit 10 --json
agi-radar get github:owner/repo --json
agi-radar get briefing:latest --json
agi-radar get audio:latest --download ./daily-agi-radar.mp3
```

提交候选内容：

```bash
agi-radar submit github https://github.com/owner/repo
agi-radar submit skill https://skillhub.cn/skills/example
```

## 怎么共创反馈

Daily AGI Radar 希望成为一个共享学习资料库。公开投稿会作为候选内容进入审核流程，不会直接写入公开 feed。

欢迎通过 Issue 推荐：

- 值得跟踪的 GitHub 项目
- 值得阅读和总结的文章
- 来自 `skillhub.cn` 的 agent skill

提交时请附上 URL，并简单说明它为什么对 AI 构建者或学习者有价值。后续流水线会负责拉取、评估、自动打标、人工审核和入库。

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

## 本地开发

```bash
npm install
npm test
npm run build
node dist/cli.js status --json
```

CLI 实现约定见 [docs/cli-spec.md](docs/cli-spec.md)。
