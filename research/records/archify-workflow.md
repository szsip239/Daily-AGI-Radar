---
{
  "id": "archify-workflow",
  "title": "Archify：五类系统图、验证与工作流定位",
  "summary": "它承担正式系统图表达与交付校验；按架构变化和评审需求触发，不替代任务事实源。",
  "research_date": "2026-09-03",
  "category": "设计与可视化",
  "status": "historical",
  "tags": [
    "Archify",
    "架构图",
    "工作流",
    "时序图",
    "数据流",
    "生命周期"
  ],
  "sources": [
    "https://github.com/tt-a1i/archify/blob/main/README.md#L13-L20",
    "https://github.com/tt-a1i/archify/blob/main/archify/bin/archify.mjs#L1-L35",
    "https://github.com/tt-a1i/archify/blob/main/README.md#L270-L277",
    "https://github.com/tt-a1i/archify/blob/main/archify/SKILL.md#L19-L59",
    "https://github.com/tt-a1i/archify/blob/main/ROADMAP.md#L93-L103",
    "https://github.com/tt-a1i/archify/blob/main/integrations/deepseek-harness/README.md#L1-L28",
    "https://github.com/tt-a1i/archify/blob/main/archify/references/delivery-contract.md#L1-L32",
    "https://github.com/tt-a1i/archify/blob/main/archify/renderers/shared/repository-evidence.mjs#L81-L157"
  ]
}
---

# Archify：五类系统图、验证与工作流定位

> 原调研截至 2026-09-03；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

Archify 对项目开发管理有何作用，通过 Skill 还是 hook 使用，是否每次 commit 都要更新？

## 结论

它承担正式系统图表达与交付校验；按架构变化和评审需求触发，不替代任务事实源。

- 原调研中 Agent 编写 typed JSON，确定性工具渲染 HTML/SVG，并执行 validate、deliver 和视觉检查。
- Architecture 表达系统构成，Workflow 表达工作阶段，Sequence 表达交互次序，Data Flow 表达数据去向，Lifecycle 表达状态迁移。
- 它通过 Skill 提供工作方法；按需调用的成本与每次 commit 都让模型重读项目的成本不同。
- Validator 证明结构和布局满足约束，不证明业务事实正确；Architecture Delta 比较已编写快照，不自动推断风险和可合并性。
- 多视角需要一个整合入口，避免读者在五份 HTML 间来回找；项目事实仍由源码、文档和当前任务记录确认。

## 证据与边界

原调研及使用过程跨 2026-08-28 至 09-03，包含版本演进。历史 CLI、格式和性能数字不作为当前所有版本的承诺；本记录不复制私有架构图。

## 调研沿革

2026-09-03 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 先界定读者和要回答的问题，再选最少的图型。
- 版本或边界变化时更新源材料，执行渲染与实际截图检查，确认整合页导航。

## 来源

- [github.com · README.md](https://github.com/tt-a1i/archify/blob/main/README.md#L13-L20)
- [github.com · archify.mjs](https://github.com/tt-a1i/archify/blob/main/archify/bin/archify.mjs#L1-L35)
- [github.com · README.md](https://github.com/tt-a1i/archify/blob/main/README.md#L270-L277)
- [github.com · SKILL.md](https://github.com/tt-a1i/archify/blob/main/archify/SKILL.md#L19-L59)
- [github.com · ROADMAP.md](https://github.com/tt-a1i/archify/blob/main/ROADMAP.md#L93-L103)
- [github.com · README.md](https://github.com/tt-a1i/archify/blob/main/integrations/deepseek-harness/README.md#L1-L28)
- [github.com · delivery-contract.md](https://github.com/tt-a1i/archify/blob/main/archify/references/delivery-contract.md#L1-L32)
- [github.com · repository-evidence.mjs](https://github.com/tt-a1i/archify/blob/main/archify/renderers/shared/repository-evidence.mjs#L81-L157)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
