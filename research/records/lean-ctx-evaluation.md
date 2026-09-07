---
{
  "id": "lean-ctx-evaluation",
  "title": "lean-ctx：上下文压缩收益与信息损失风险",
  "summary": "历史判断为隔离试点；不能把压缩比例等同于任务质量或总成本改善。",
  "research_date": "2026-07-26",
  "category": "Agent 开发工具",
  "status": "historical",
  "tags": [
    "lean-ctx",
    "上下文压缩",
    "MCP",
    "信息损失"
  ],
  "sources": [
    "https://github.com/yvgude/lean-ctx",
    "https://github.com/yvgude/lean-ctx/commit/fe36c06efb76df79f445035f28295771a11cd903",
    "https://github.com/yvgude/lean-ctx/releases/tag/v3.9.12",
    "https://github.com/yvgude/lean-ctx/commit/54e0a66bcbb9a6695e45848d3ea97a491a0b5275",
    "https://github.com/yvgude/lean-ctx/issues/1192",
    "https://github.com/yvgude/lean-ctx/blob/fe36c06efb76df79f445035f28295771a11cd903/README.md#L213-L246",
    "https://github.com/yvgude/lean-ctx/blob/fe36c06efb76df79f445035f28295771a11cd903/README.md#L229-L246",
    "https://github.com/yvgude/lean-ctx/blob/fe36c06efb76df79f445035f28295771a11cd903/README.md#L124-L133"
  ]
}
---

# lean-ctx：上下文压缩收益与信息损失风险

> 原调研截至 2026-07-26；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

除了项目宣传的 token 节省，是否存在负面评价、语义损失和集成风险，是否值得全局采用？

## 结论

历史判断为隔离试点；不能把压缩比例等同于任务质量或总成本改善。

- 它会通过 MCP、shell hook 与可选代理改写文件、命令输出和历史工具结果；不是单纯无损缓存。归档可恢复也不代表当前轮模型已经看到完整内容。
- Replace 路径会替换或阻止原生读取与 shell 工具，集成侵入性高于普通检索插件。
- 原调研整理到结构化 JSON 截断、比较符误改、跨会话 unchanged 占位等 issue；必须区分报告版本、main 修复和正式 release。
- 维护者曾要求补充成功率、轮数、重读率和总费用 A/B。局部 fixture 和压缩 benchmark 不足以支持全局替换。

## 证据与边界

固定核验基线为 v3.9.12 与当时 main；部分修复尚未进入正式版本。负面 issue 是报告证据，不全部属于独立复现。本次没有更新这些 issue 的当前状态。

## 调研沿革

2026-07-26 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 选择可丢弃工作区，先用 hybrid/MCP 路径，保留原生工具。
- 同任务对照记录成功率、总 token、耗时、恢复调用次数及结构化输出完整性。

## 来源

- [github.com · lean-ctx](https://github.com/yvgude/lean-ctx)
- [github.com · fe36c06efb76df79f445035f28295771a11cd903](https://github.com/yvgude/lean-ctx/commit/fe36c06efb76df79f445035f28295771a11cd903)
- [github.com · v3.9.12](https://github.com/yvgude/lean-ctx/releases/tag/v3.9.12)
- [github.com · 54e0a66bcbb9a6695e45848d3ea97a491a0b5275](https://github.com/yvgude/lean-ctx/commit/54e0a66bcbb9a6695e45848d3ea97a491a0b5275)
- [github.com · 1192](https://github.com/yvgude/lean-ctx/issues/1192)
- [github.com · README.md](https://github.com/yvgude/lean-ctx/blob/fe36c06efb76df79f445035f28295771a11cd903/README.md#L213-L246)
- [github.com · README.md](https://github.com/yvgude/lean-ctx/blob/fe36c06efb76df79f445035f28295771a11cd903/README.md#L229-L246)
- [github.com · README.md](https://github.com/yvgude/lean-ctx/blob/fe36c06efb76df79f445035f28295771a11cd903/README.md#L124-L133)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
