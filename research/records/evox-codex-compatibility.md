---
{
  "id": "evox-codex-compatibility",
  "title": "EvoX 与 Codex：账号接入不等于 Harness 委派",
  "summary": "当时证据支持账号和模型接入；实际执行仍由 EvoX harness 管理，完整 Codex 委派尚未验证。",
  "research_date": "2026-08-14",
  "category": "Agent 运行时",
  "status": "historical",
  "tags": [
    "EvoX",
    "Codex CLI",
    "Harness",
    "MCP",
    "模型接入"
  ],
  "sources": [
    "https://github.com/EvoMap/evolver-codex-plugin",
    "https://evomap.ai/research/evox-benchmark-claude-code-codex",
    "https://github.com/EvoMap/evolver",
    "https://github.com/EvoMap/evolver-codex-plugin/tree/main/plugins/evolver",
    "https://github.com/openai/codex/blob/main/codex-rs/docs/codex_mcp_interface.md",
    "https://github.com/openai/codex/blob/main/codex-rs/app-server/README.md",
    "https://github.com/openai/codex"
  ]
}
---

# EvoX 与 Codex：账号接入不等于 Harness 委派

> 原调研截至 2026-08-14；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

EvoX 兼容 Codex CLI 是复用账号和模型，还是把整个任务交给 Codex？

## 结论

当时证据支持账号和模型接入；实际执行仍由 EvoX harness 管理，完整 Codex 委派尚未验证。

- EvoX 自己组织工具调用、上下文、审批、会话与模型路由；模型名称出现 Codex 不能证明使用 Codex 的 agent loop。
- 原构建可借助 Codex app-server 获取模型，亦有外部会话转换；转换不等于实时共用会话。
- 通过 MCP 嵌套 Codex 在协议发现层面可行，但原报告仅完成握手，未执行有副作用的端到端任务。
- 只想为原有 Codex 增加经验功能，可独立评估 Evolver 插件，没必要默认叠加完整 EvoX。

## 证据与边界

限定 EvoX 1.1.0-beta.11 与当时 Codex 版本；前端、二进制符号和握手证据分级，未证明全流程审批、恢复和会话可观测性。

## 调研沿革

2026-08-14 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 分别验收模型调用、会话导入、工具委派和恢复。
- 检查嵌套 agent 的取消、超时、权限和写入审计，防止双层循环失控。

## 来源

- [github.com · evolver-codex-plugin](https://github.com/EvoMap/evolver-codex-plugin)
- [evomap.ai · evox-benchmark-claude-code-codex](https://evomap.ai/research/evox-benchmark-claude-code-codex)
- [github.com · evolver](https://github.com/EvoMap/evolver)
- [github.com · evolver](https://github.com/EvoMap/evolver-codex-plugin/tree/main/plugins/evolver)
- [github.com · codex_mcp_interface.md](https://github.com/openai/codex/blob/main/codex-rs/docs/codex_mcp_interface.md)
- [github.com · README.md](https://github.com/openai/codex/blob/main/codex-rs/app-server/README.md)
- [github.com · codex](https://github.com/openai/codex)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
