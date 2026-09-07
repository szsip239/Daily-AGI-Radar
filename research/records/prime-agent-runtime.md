---
{
  "id": "prime-agent-runtime",
  "title": "Prime Agent：RLM、持久状态与自我改进",
  "summary": "Prime 是具体执行 harness，Orca 是外层开发工作台；是否采用取决于持久计算与 RLM 是否改善真实任务。",
  "research_date": "2026-08-13",
  "category": "Agent 运行时",
  "status": "historical",
  "tags": [
    "Prime Agent",
    "RLM",
    "IPython",
    "Harness",
    "自我改进"
  ],
  "sources": [
    "https://github.com/stablyai/orca/pull/12935",
    "https://github.com/stablyai/orca/pull/13384",
    "https://github.com/stablyai/orca/pull/13430",
    "https://github.com/PrimeIntellect-ai/prime-agent/blob/965941c750ff816cc4d68d18a5fcea5e0b4c120b/README.md",
    "https://github.com/PrimeIntellect-ai/prime-agent/blob/965941c750ff816cc4d68d18a5fcea5e0b4c120b/packages/coding-agent/docs/rlm.md",
    "https://github.com/PrimeIntellect-ai/prime-agent/blob/965941c750ff816cc4d68d18a5fcea5e0b4c120b/packages/coding-agent/docs/rlm-runtime.md",
    "https://github.com/PrimeIntellect-ai/prime-agent/blob/965941c750ff816cc4d68d18a5fcea5e0b4c120b/README.md#L31-L44",
    "https://github.com/PrimeIntellect-ai/prime-agent/blob/965941c750ff816cc4d68d18a5fcea5e0b4c120b/packages/coding-agent/docs/rlm-runtime.md#L174-L179"
  ]
}
---

# Prime Agent：RLM、持久状态与自我改进

> 原调研截至 2026-08-13；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

Prime Agent 与 Orca 有何不同，持久上下文和自我改进有哪些实际价值？

## 结论

Prime 是具体执行 harness，Orca 是外层开发工作台；是否采用取决于持久计算与 RLM 是否改善真实任务。

- 模型在持久 IPython 环境中工作，可以把上下文作为变量检索、切分和变换。
- rlm(...) 递归子会话和持续 kernel 适合长研究、数据处理等探索，但不意味着所有 coding 任务都会更快。
- Continual Harness 保存补充提示、记忆、技能和 refinement 状态；/refine 调整工作方法，不是自动训练底层模型权重。
- 已有 Orca 和 coding agent 时，不必为重复的任务管理功能安装另一层；应以具体能力缺口做对照试验。

## 证据与边界

原基线为 Prime v0.7.2。证据来自官方文档与源码，未独立实测长期任务收益或自我改进效果。

## 调研沿革

2026-08-13 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 对固定长任务比较准确率、重读量、成本、状态恢复与失败重试。
- 评估 refinement 的可审查、可回滚及跨任务污染控制。

## 来源

- [github.com · 12935](https://github.com/stablyai/orca/pull/12935)
- [github.com · 13384](https://github.com/stablyai/orca/pull/13384)
- [github.com · 13430](https://github.com/stablyai/orca/pull/13430)
- [github.com · README.md](https://github.com/PrimeIntellect-ai/prime-agent/blob/965941c750ff816cc4d68d18a5fcea5e0b4c120b/README.md)
- [github.com · rlm.md](https://github.com/PrimeIntellect-ai/prime-agent/blob/965941c750ff816cc4d68d18a5fcea5e0b4c120b/packages/coding-agent/docs/rlm.md)
- [github.com · rlm-runtime.md](https://github.com/PrimeIntellect-ai/prime-agent/blob/965941c750ff816cc4d68d18a5fcea5e0b4c120b/packages/coding-agent/docs/rlm-runtime.md)
- [github.com · README.md](https://github.com/PrimeIntellect-ai/prime-agent/blob/965941c750ff816cc4d68d18a5fcea5e0b4c120b/README.md#L31-L44)
- [github.com · rlm-runtime.md](https://github.com/PrimeIntellect-ai/prime-agent/blob/965941c750ff816cc4d68d18a5fcea5e0b4c120b/packages/coding-agent/docs/rlm-runtime.md#L174-L179)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
