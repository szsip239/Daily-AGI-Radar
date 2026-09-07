---
{
  "id": "personal-agent-memory",
  "title": "个人 AI 记忆层：跨 Harness 捕获、知识与偏好蒸馏",
  "summary": "按会话捕获、可编辑知识与偏好提炼分层；原三轮评审均优先核验 ai-memory 的跨端能力。",
  "research_date": "2026-09-02",
  "category": "记忆与知识管理",
  "status": "historical",
  "tags": [
    "ai-memory",
    "basic-memory",
    "OpenViking",
    "Graphiti",
    "偏好蒸馏",
    "OKF"
  ],
  "sources": [
    "https://github.com/akitaonrails/ai-memory",
    "https://github.com/basicmachines-co/basic-memory",
    "https://github.com/volcengine/OpenViking",
    "https://github.com/getzep/graphiti",
    "https://github.com/langchain-ai/openwiki"
  ]
}
---

# 个人 AI 记忆层：跨 Harness 捕获、知识与偏好蒸馏

> 原调研截至 2026-09-02；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

如何在多个 coding agent 和多个项目间保留会话、决策、进度和个人品味，哪些开源底座值得采用？

## 结论

按会话捕获、可编辑知识与偏好提炼分层；原三轮评审均优先核验 ai-memory 的跨端能力。

- ai-memory 被评估为跨 Claude Code、Codex 与 Kimi 的捕获候选，Markdown/wiki、hooks、检索与恢复是重点核验项。
- basic-memory、Graphiti 等更适合知识组织或图记忆，不应默认具备同样的跨 CLI 会话捕获。
- OpenViking 的会话提炼偏好与经验路径值得继续看；框架支持某模型不等于对 Kimi Code hooks 有一等支持。
- 多轮报告将 OKF 互操作与格式迁移列为关注点，同时提醒快速版本变化需要锁版、备份和迁移验证。
- 偏好记录应保存证据、适用范围、确认状态和反例；单次任务取舍不能自动提升为永久人格规则。

## 证据与边界

整合三轮不同 agent 报告，保留共识，未重复传播动态星数、未经对照的 benchmark 和绝对化“唯一/最强”判断。候选排名、许可证和支持矩阵需按实际采用版本重验。

## 调研沿革

2026-09-02 第一轮框架筛选；第二轮补充会话到偏好及可视界面；第三轮回到一手支持矩阵核对并关注互操作和格式升级。多份 worker 报告作为一项课题归档。

## 后续验证

- 用真实的跨项目问答检查召回、污染、冲突和删除传播。
- 将明确要求、候选偏好与项目例外分开，蒸馏前保留人可审阅的证据。
- 验证一次捕获、搜索、恢复与跨 harness 接续的完整闭环。

## 来源

- [github.com · ai-memory](https://github.com/akitaonrails/ai-memory)
- [github.com · basic-memory](https://github.com/basicmachines-co/basic-memory)
- [github.com · OpenViking](https://github.com/volcengine/OpenViking)
- [github.com · graphiti](https://github.com/getzep/graphiti)
- [github.com · openwiki](https://github.com/langchain-ai/openwiki)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
