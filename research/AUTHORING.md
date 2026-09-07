# AI课题调研维护说明

本模块保存可独立阅读的专题研究。每个课题一个稳定 ID 和一篇 Markdown，多轮研究合并到同一记录并保留沿革；不同技术问题分别建档。

## 文件与数据

- `records/<id>.md` 是维护源。
- Markdown 使用 JSON 格式的 YAML frontmatter（JSON 是 YAML 的子集），不依赖额外 YAML 解析器。
- `README.md` 是自动生成的阅读索引。
- `index.jsonl` / `index.jsonl.gz` 包含元数据、公开来源和完整 `body_markdown`。
- `manifest.json` 是独立模块入口；不向日报管线重写的 `data/` 混入手工记录。

CLI 根据配置的日报 manifest URL 解析相邻 `../research/manifest.json`，因此自托管镜像应保持 `data/` 与 `research/` 并列。URL 不绑定特定 GitHub 主机。模块使用单独的缓存子目录。

## 新增或更新

1. 复制相近课题结构，以小写字母、数字和连字符创建稳定 ID，文件名与 ID 一致。
2. frontmatter 必须有 `id`、`title`、`summary`、`research_date`、`category`、`status`、`tags`、`sources`。
3. 正文至少有“调研问题”“结论”“证据与边界”“后续验证”“来源”；连续研究增加沿革。
4. `research_date` 表示最近一次实质调研的日期，不因排版或历史归档改成今天。`historical` 表示历史整理；`source-verified` 表示在所标日期完成源码核验，仍不等于端到端实测。
5. 来源链接应支持具体结论。区分官方宣称、源码证据、独立实测、社区自报与推测；没有找到不等于不存在。
6. 构建并验证后，将 Markdown 和对应派生数据一起提交。

```bash
npm run research:build
npm run research:check
npm test
```

生成器检查字段、日期、稳定 ID、章节、公开 HTTPS 来源以及常见凭据/私人路径模式。它不能自动证明研究正确或穷尽隐私泄露风险，提交前仍须人工审阅完整正文和链接。

## 读取

```bash
agi-radar search "Kimi" --type research --json
agi-radar search "个人记忆" --type research --from 2026-09-01 --json
agi-radar get research:kimi-apps-webmcp --json
agi-radar get research:latest --json
agi-radar sync --all --no-cache --json
```

普通搜索合并日报信号和调研记录。`--brief` 仅返回投影，默认返回完整调研（含 `body_markdown`）。旧镜像没有模块 manifest 时，普通搜索继续工作；明确查询 research 会报告缺失。存在但损坏或不可用的模块会报错，不伪装为空结果。

`--download` 仍仅支持音频；调研可从独立 Markdown 文件或 JSON 的正文读取。新 CLI 行为来自本仓库构建；发布 npm 新版本前，既有已安装版本不会自动获得该能力。

## 公开边界

只维护经过整理的研究，不公开原始对话导出、用户身份、凭据、客户端日志、私人项目架构、客户文件、内部网络和本机路径。原文及本地会话映射留在来源工作区。历史研究中的价格、排名、漏洞状态及采购建议不得未经重验包装成当前事实。
