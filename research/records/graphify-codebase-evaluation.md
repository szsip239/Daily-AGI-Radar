---
{
  "id": "graphify-codebase-evaluation",
  "title": "Graphify：代码图谱价值、开销与多项目组织",
  "summary": "先在代表性项目试点；项目子图承担源码定位，全局层只做导航，关键结论回到源码核验。",
  "research_date": "2026-07-26",
  "category": "代码与知识图谱",
  "status": "historical",
  "tags": [
    "Graphify",
    "graphifyy",
    "代码图谱",
    "AST",
    "知识图谱"
  ],
  "sources": [
    "https://github.com/Graphify-Labs/graphify",
    "https://github.com/Graphify-Labs/graphify/releases/tag/v0.9.26",
    "https://github.com/Graphify-Labs/graphify/releases/tag/v0.9.25",
    "https://github.com/Graphify-Labs/graphify/blob/v0.9.26/docs/how-it-works.md",
    "https://github.com/Graphify-Labs/graphify/blob/v0.9.26/README.md#what-you-get",
    "https://github.com/Graphify-Labs/graphify/blob/v0.9.26/BENCHMARKS.md",
    "https://github.com/Graphify-Labs/graphify/blob/v0.9.26/docs/how-it-works.md#token-benchmark",
    "https://github.com/Graphify-Labs/graphify/blob/v0.9.26/docs/how-it-works.md#parallel-extraction"
  ]
}
---

# Graphify：代码图谱价值、开销与多项目组织

> 原调研截至 2026-07-26；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

大型项目是否值得启用 Graphify，如何处理全局图与项目子图、语义抽取和持续更新？

## 结论

先在代表性项目试点；项目子图承担源码定位，全局层只做导航，关键结论回到源码核验。

- 本次辨认的工具是 PyPI graphifyy，对应 Graphify-Labs/graphify，须避免同名项目混淆。
- 纯代码路径以 Tree-sitter AST 提取导入、调用、继承等关系；文档和媒体语义提取是另一条有模型成本的路径。
- 图谱对跨文件定位和探索有价值，但存在误报、漏边、旧快照、宽查询截断、聚类噪声及产物膨胀风险。
- 原讨论从混合全局大图转向按项目建子图、主图汇总导航；语义材料另行界定范围，避免跨项目污染。
- 采用时应记录工具版本、目标 commit、抽取方式和更新状态；不能把某个旧版本表现直接推广到新版。

## 证据与边界

原报告比较了本机 0.8.26 与当时公开 0.9.26；历史版本、许可变更和基准都只在该日有效。代码结构图不等于业务运行时架构，也不替代代码审查。

## 调研沿革

2026-07-26 完成外部评价及项目子图组织讨论；2026-09-01 的 Archify 对照进一步揭示图谱作为定位线索的边界，另见 Graphify 与 Archify 质量复盘课题。

## 后续验证

- 以一组真实定位问题比较 rg 与图谱的耗时、正确率和上下文量。
- 限定源码与公开资料范围，排除依赖、构建产物和私有内容；每次查询检查快照版本。

## 来源

- [github.com · graphify](https://github.com/Graphify-Labs/graphify)
- [github.com · v0.9.26](https://github.com/Graphify-Labs/graphify/releases/tag/v0.9.26)
- [github.com · v0.9.25](https://github.com/Graphify-Labs/graphify/releases/tag/v0.9.25)
- [github.com · how-it-works.md](https://github.com/Graphify-Labs/graphify/blob/v0.9.26/docs/how-it-works.md)
- [github.com · README.md](https://github.com/Graphify-Labs/graphify/blob/v0.9.26/README.md#what-you-get)
- [github.com · BENCHMARKS.md](https://github.com/Graphify-Labs/graphify/blob/v0.9.26/BENCHMARKS.md)
- [github.com · how-it-works.md](https://github.com/Graphify-Labs/graphify/blob/v0.9.26/docs/how-it-works.md#token-benchmark)
- [github.com · how-it-works.md](https://github.com/Graphify-Labs/graphify/blob/v0.9.26/docs/how-it-works.md#parallel-extraction)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
