---
{
  "id": "prime-agent-orca-integration",
  "title": "Prime Agent × Orca：一等集成与上下文能力边界",
  "summary": "集成方式是让 Prime 成为一种可启动和恢复的 worker；不是替换其他 agent 的内部上下文引擎。",
  "research_date": "2026-08-13",
  "category": "Agent 开发工具",
  "status": "historical",
  "tags": [
    "Prime Agent",
    "Orca",
    "集成",
    "上下文",
    "RC"
  ],
  "sources": [
    "https://github.com/stablyai/orca/pull/12935",
    "https://github.com/stablyai/orca/pull/13384",
    "https://github.com/stablyai/orca/pull/13430",
    "https://github.com/stablyai/orca/releases/tag/v1.4.180",
    "https://github.com/stablyai/orca/releases/tag/v1.4.182-rc.1",
    "https://github.com/stablyai/orca/blob/4882eeb8acf2992bbaa84de4eabebfd386c39f54/src/shared/tui-agent-config.ts#L147-L157",
    "https://github.com/stablyai/orca/blob/4882eeb8acf2992bbaa84de4eabebfd386c39f54/src/shared/ai-vault-types.ts#L5-L22",
    "https://github.com/stablyai/orca/blob/4882eeb8acf2992bbaa84de4eabebfd386c39f54/src/shared/agent-session-resume.ts#L242-L266"
  ]
}
---

# Prime Agent × Orca：一等集成与上下文能力边界

> 原调研截至 2026-08-13；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

能否把 Prime 的上下文引擎装进 Orca，让现有 Codex/Claude 自动获得相关能力？

## 结论

集成方式是让 Prime 成为一种可启动和恢复的 worker；不是替换其他 agent 的内部上下文引擎。

- Orca 管 worktree、终端、任务和状态；Prime 负责自身 worker 的 kernel、RLM 与 harness refinement。
- 当时官方已合并 Prime 启动识别、会话历史/恢复、状态 hooks 和 WSL 相关 PR。
- 原核验中 stable v1.4.180 尚未包含一等适配，RC/main 已存在；不能把合并日期等同于稳定版发布。
- 因此当时不建议自行重复开发适配器，也不必为这一个能力切到预发布版。

## 证据与边界

发布状态仅截止 2026-08-13；本次未重新查询当前 Orca。安装 Prime 不会改造既有 Codex CLI 或 Claude Code 会话。

## 调研沿革

2026-08-13 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 按实际安装的稳定版核验识别、恢复和 hooks。
- 确认任务究竟由哪个 harness 执行，再解释日志、审批和上下文归属。

## 来源

- [github.com · 12935](https://github.com/stablyai/orca/pull/12935)
- [github.com · 13384](https://github.com/stablyai/orca/pull/13384)
- [github.com · 13430](https://github.com/stablyai/orca/pull/13430)
- [github.com · v1.4.180](https://github.com/stablyai/orca/releases/tag/v1.4.180)
- [github.com · v1.4.182-rc.1](https://github.com/stablyai/orca/releases/tag/v1.4.182-rc.1)
- [github.com · tui-agent-config.ts](https://github.com/stablyai/orca/blob/4882eeb8acf2992bbaa84de4eabebfd386c39f54/src/shared/tui-agent-config.ts#L147-L157)
- [github.com · ai-vault-types.ts](https://github.com/stablyai/orca/blob/4882eeb8acf2992bbaa84de4eabebfd386c39f54/src/shared/ai-vault-types.ts#L5-L22)
- [github.com · agent-session-resume.ts](https://github.com/stablyai/orca/blob/4882eeb8acf2992bbaa84de4eabebfd386c39f54/src/shared/agent-session-resume.ts#L242-L266)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
