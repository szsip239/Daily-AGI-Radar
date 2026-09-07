---
{
  "id": "evox-ecosystem-openness",
  "title": "EvoX、Evolver、EvoMap：开源层次与接入判断",
  "summary": "必须分开核对桌面 harness、经验引擎、协议组件和经验网络，不能把相邻项目开源归给 EvoX。",
  "research_date": "2026-09-04",
  "category": "Agent 运行时",
  "status": "historical",
  "tags": [
    "EvoX",
    "Evolver",
    "EvoMap",
    "GEP",
    "AutoResearch",
    "开源"
  ],
  "sources": [
    "https://evomap.ai/zh/evox/beta",
    "https://github.com/EvoMap/evolver",
    "https://github.com/EvoMap/evolver-codex-plugin",
    "https://github.com/EvoMap/AutoResearch"
  ]
}
---

# EvoX、Evolver、EvoMap：开源层次与接入判断

> 原调研截至 2026-09-04；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

这几个同品牌产品哪些开源，能否接入现有开发环境，“开源新闻”是否指 EvoX 本体？

## 结论

必须分开核对桌面 harness、经验引擎、协议组件和经验网络，不能把相邻项目开源归给 EvoX。

- 8月核验的 EvoX 是有桌面宿主、sidecar、gateway 和状态存储的独立 Beta 产品，不是单纯网页壳。
- 当时未发现 EvoX 核心的官方公开源码和主体许可；签名与公证证明分发来源，不证明业务安全或可复现构建。
- Evolver 与 GEP 相关 SDK/MCP 是可独立考察的相邻仓库；源码范围、许可和网络连接应逐一审查。
- 9月后续会话区分了 AutoResearch 的开源发布与 EvoX 本体，未找到足以推翻“EvoX 本体未确认开源”的证据。
- 已有记忆系统时，重复安装捕获和蒸馏 hooks 可能增加成本与语义冲突；经验网络检索可作为独立小范围评估。

## 证据与边界

合并 8月官方与安装产物核验、9月会话补充；后续会话中的社区传闻、作者动机和未经核实指控不收录。不同仓库的许可不统一套用；没有把漏洞历史或星数转换为当前安全评级。

## 调研沿革

2026-08-14 核验 EvoX Beta；2026-09-03 至 09-04 的 Claude 会话补充三件套、既有记忆层对比及 AutoResearch/EvoX 身份澄清。

## 后续验证

- 重新检查目标仓库的 LICENSE、release 与安全公告，固定版本后做隔离试用。
- 明确是否需要外部经验网络，检查下载内容进入执行环节的审批边界。

## 来源

- [evomap.ai · beta](https://evomap.ai/zh/evox/beta)
- [github.com · evolver](https://github.com/EvoMap/evolver)
- [github.com · evolver-codex-plugin](https://github.com/EvoMap/evolver-codex-plugin)
- [github.com · AutoResearch](https://github.com/EvoMap/AutoResearch)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
