---
{
  "id": "orca-floating-coordinator",
  "title": "Orca Floating Workspace：跨项目协调与偏好记忆",
  "summary": "浮动工作区可承载协调 Agent；调度判断由 Agent 完成，进度和偏好须分别核验来源。",
  "research_date": "2026-09-07",
  "category": "Agent 开发工具",
  "status": "historical",
  "tags": [
    "Orca",
    "Floating Workspace",
    "协调器",
    "ai-memory",
    "偏好",
    "多项目"
  ],
  "sources": [
    "https://www.onorca.dev/docs/terminal",
    "https://www.onorca.dev/docs/cli/skills",
    "https://github.com/akitaonrails/ai-memory",
    "https://github.com/Graphify-Labs/graphify",
    "https://github.com/tt-a1i/archify"
  ]
}
---

# Orca Floating Workspace：跨项目协调与偏好记忆

> 原调研截至 2026-09-07；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

能否用浮动工作区作为多项目总协调入口，如何同时了解进展、历史判断和用户偏好？

## 结论

浮动工作区可承载协调 Agent；调度判断由 Agent 完成，进度和偏好须分别核验来源。

- 原研究将浮动工作区视为跨仓库终端与协调入口；具体实现、分支和提交仍落在各项目 worktree。
- 任务分派前先检查已有负责人和运行状态，再带上目标、范围、文档和验收条件，避免重复施工。
- Git、issue/PR 与 Orca 提供当前交付状态；ai-memory 保存经历与理由，Graphify 辅助结构定位，Archify 表达已核验系统关系。
- 会话捕获量不等于已形成可检索的长期记忆；还需整理、索引、蒸馏与实际查询验证。
- 偏好按已确认、候选和项目例外区分；定期复核可以在会话内触发，不自动等于已启用后台定时任务。

## 证据与边界

原会话在 2026-09-06 至 09-07 建立协调器最小规则。这里公开方法，不公开项目清单、私人画像、任务进度或协调环境配置。没有把“终端完成”“卡片完成”“PR 合并”和“上线”混为一谈。

## 调研沿革

2026-09-07 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 先进行只读跨项目盘点，核验进展、依赖、已有负责人及真实阻塞。
- 对偏好保留具体反馈证据和反例，批准后才跨项目应用。

## 来源

- [www.onorca.dev · terminal](https://www.onorca.dev/docs/terminal)
- [www.onorca.dev · skills](https://www.onorca.dev/docs/cli/skills)
- [github.com · ai-memory](https://github.com/akitaonrails/ai-memory)
- [github.com · graphify](https://github.com/Graphify-Labs/graphify)
- [github.com · archify](https://github.com/tt-a1i/archify)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
