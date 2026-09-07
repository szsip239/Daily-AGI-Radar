---
{
  "id": "evolver-codex-plugin",
  "title": "Evolver Codex 插件：社区采用与工程成熟度",
  "summary": "原插件社区样本很小；底层 Evolver 的热度不能替代插件自身的稳定性证据。",
  "research_date": "2026-08-15",
  "category": "Agent 开发工具",
  "status": "historical",
  "tags": [
    "Evolver",
    "Codex插件",
    "GEP",
    "社区评价",
    "成熟度"
  ],
  "sources": [
    "https://github.com/EvoMap/evolver-codex-plugin",
    "https://github.com/EvoMap/evolver",
    "https://github.com/EvoMap/evolver-codex-plugin/commits/main/",
    "https://github.com/EvoMap/evolver-codex-plugin/pulls?q=is%3Apr+is%3Aclosed",
    "https://github.com/EvoMap/evolver-codex-plugin/issues",
    "https://github.com/EvoMap/evolver-codex-plugin/releases",
    "https://github.com/EvoMap/evolver-codex-plugin/tree/main/plugins/evolver",
    "https://github.com/EvoMap/evolver-codex-plugin/blob/main/plugins/evolver/mcp/evolver-proxy.mjs"
  ]
}
---

# Evolver Codex 插件：社区采用与工程成熟度

> 原调研截至 2026-08-15；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

官方 Evolver Codex 插件是否有足够的用户采用、维护和独立实测证据？

## 结论

原插件社区样本很小；底层 Evolver 的热度不能替代插件自身的稳定性证据。

- 当时插件是范围较窄的 JavaScript 集成，提供经验相关工具及可选 hooks。
- 独立仓库的提交、贡献者、release 和测试基础较薄弱，未找到可验证的大量独立使用反馈。
- 没有 issue 不等于没有缺陷，主仓库的 stars 也不能算作插件安装量。
- 适合可卸载的小规模测试，不宜仅凭“自进化”标签并入所有会话。

## 证据与边界

原查询日期为 2026-08-15；不在本记录中把历史个位数 stars 宣称为今天状态。实际安全性需结合当前 release、依赖与经验内容执行策略。

## 调研沿革

2026-08-15 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 对照已有记忆 hooks，记录重复蒸馏、启动延迟及总模型调用。
- 验证卸载、经验审批、回滚和网络行为。

## 来源

- [github.com · evolver-codex-plugin](https://github.com/EvoMap/evolver-codex-plugin)
- [github.com · evolver](https://github.com/EvoMap/evolver)
- [github.com · main](https://github.com/EvoMap/evolver-codex-plugin/commits/main/)
- [github.com · pulls](https://github.com/EvoMap/evolver-codex-plugin/pulls?q=is%3Apr+is%3Aclosed)
- [github.com · issues](https://github.com/EvoMap/evolver-codex-plugin/issues)
- [github.com · releases](https://github.com/EvoMap/evolver-codex-plugin/releases)
- [github.com · evolver](https://github.com/EvoMap/evolver-codex-plugin/tree/main/plugins/evolver)
- [github.com · evolver-proxy.mjs](https://github.com/EvoMap/evolver-codex-plugin/blob/main/plugins/evolver/mcp/evolver-proxy.mjs)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
