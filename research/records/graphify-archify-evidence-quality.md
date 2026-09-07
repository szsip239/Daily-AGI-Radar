---
{
  "id": "graphify-archify-evidence-quality",
  "title": "Graphify 与 Archify：源码导航和架构事实的边界",
  "summary": "对照复盘发现版本错位、查询截断与抽象层级不匹配；图谱应辅助定位，主路径必须核回源码。",
  "research_date": "2026-09-01",
  "category": "代码与知识图谱",
  "status": "historical",
  "tags": [
    "Graphify",
    "Archify",
    "架构质量",
    "版本对齐",
    "证据"
  ],
  "sources": [
    "https://github.com/Graphify-Labs/graphify",
    "https://github.com/tt-a1i/archify"
  ]
}
---

# Graphify 与 Archify：源码导航和架构事实的边界

> 原调研截至 2026-09-01；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

使用 Graphify 是否反而降低 Archify 的质量，根因在图谱还是使用策略？

## 结论

对照复盘发现版本错位、查询截断与抽象层级不匹配；图谱应辅助定位，主路径必须核回源码。

- AST 的 contains/imports/calls 关系不能直接翻译为业务运行时数据流或网络拓扑。
- 原对照出现目标 revision 与图谱快照不一致，宽查询返回过多节点而被截断，安全和产物发布等概念召回不足。
- 无向 import 路径只能提示文件联系，不能证明有向的工作流或数据交付关系。
- 融合版本保留直接源码分析得出的运行阶段，再补回有依据的独立产物阶段与边界说明。
- 后续策略是在入口明确时直接读源码，大型或未知结构时用精确符号做 scouting；每条核心关系逐项核验。

## 证据与边界

这是一次具体项目的对照复盘，不是 Graphify 普遍降低质量的统计结论。公开记录排除项目私有架构与安全实现细节。

## 调研沿革

2026-09-01 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 先锁定目标 commit，再验证图谱 freshness。
- 使用 1–3 个精确符号及有向 path，记录检索未覆盖的重要概念。
- 把“定位来源”和“事实来源”分开，视觉验收之外增加架构语义检查。

## 来源

- [github.com · graphify](https://github.com/Graphify-Labs/graphify)
- [github.com · archify](https://github.com/tt-a1i/archify)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
