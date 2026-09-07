---
{
  "id": "herdr-vs-orca",
  "title": "Herdr 与 Orca：终端原生工作流和自动化差异",
  "summary": "高置信差异在终端原生控制、可解释的状态检测与自动化接口；多 Agent 本身不是独有优势。",
  "research_date": "2026-08-11",
  "category": "Agent 开发工具",
  "status": "historical",
  "tags": [
    "Herdr",
    "Orca",
    "TUI",
    "TTY",
    "Agent管理"
  ],
  "sources": [
    "https://github.com/herdrdev/herdr",
    "https://github.com/herdrdev/herdr/blob/v0.8.0/Cargo.toml#L1-L10",
    "https://github.com/herdrdev/herdr/releases/tag/v0.8.0",
    "https://github.com/stablyai/orca",
    "https://github.com/stablyai/orca/blob/v1.4.180/README.md#L18-L26",
    "https://github.com/stablyai/orca/releases/tag/v1.4.180",
    "https://github.com/stablyai/orca/blob/v1.4.180/package.json#L1-L10",
    "https://github.com/herdrdev/herdr/blob/v0.8.0/docs/next/website/src/content/docs/session-state.mdx#L8-L38"
  ]
}
---

# Herdr 与 Orca：终端原生工作流和自动化差异

> 原调研截至 2026-08-11；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

Herdr 有哪些 Orca 尚未提供的功能，是否构成替代或可借鉴方向？

## 结论

高置信差异在终端原生控制、可解释的状态检测与自动化接口；多 Agent 本身不是独有优势。

- Herdr 的完整 TUI、direct TTY attach 与 controller/observer 流适合终端原生使用。
- 用户可编辑的 screen-detection manifests 与 agent explain 为状态识别提供可调试 fallback。
- 公开自动化接口覆盖语义等待、正则输出等待、pane 布局操作和生命周期事件。
- Orca 已覆盖 worktree、持久终端、远程运行、恢复和插件等共同能力，不应重复列成 Herdr 的独有项。

## 证据与边界

比较基线为 Herdr v0.8.0 与 Orca v1.4.180。未在整理日对照新版功能；“公开未发现”不代表内部绝不可能实现。

## 调研沿革

2026-08-11 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 选择终端直连、状态误判诊断、远程恢复三类任务对照。
- 优先评估真正缺口，避免为重复能力迁移工作台。

## 来源

- [github.com · herdr](https://github.com/herdrdev/herdr)
- [github.com · Cargo.toml](https://github.com/herdrdev/herdr/blob/v0.8.0/Cargo.toml#L1-L10)
- [github.com · v0.8.0](https://github.com/herdrdev/herdr/releases/tag/v0.8.0)
- [github.com · orca](https://github.com/stablyai/orca)
- [github.com · README.md](https://github.com/stablyai/orca/blob/v1.4.180/README.md#L18-L26)
- [github.com · v1.4.180](https://github.com/stablyai/orca/releases/tag/v1.4.180)
- [github.com · package.json](https://github.com/stablyai/orca/blob/v1.4.180/package.json#L1-L10)
- [github.com · session-state.mdx](https://github.com/herdrdev/herdr/blob/v0.8.0/docs/next/website/src/content/docs/session-state.mdx#L8-L38)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
