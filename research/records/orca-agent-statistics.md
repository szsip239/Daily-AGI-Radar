---
{
  "id": "orca-agent-statistics",
  "title": "Orca Agent 统计：历史会话导入的计量边界",
  "summary": "可统计历史唯一会话，但无法从 transcript 精确还原进程启动次数和存活时长。",
  "research_date": "2026-08-09",
  "category": "Agent 开发工具",
  "status": "historical",
  "tags": [
    "Orca",
    "Agent Time",
    "会话统计",
    "历史导入"
  ],
  "sources": [
    "https://github.com/stablyai/orca",
    "https://www.onorca.dev/docs/terminal"
  ]
}
---

# Orca Agent 统计：历史会话导入的计量边界

> 原调研截至 2026-08-09；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

Orca 安装前的 Claude/Codex 会话能否纳入 Agents Spawned 和 Agent Time？

## 结论

可统计历史唯一会话，但无法从 transcript 精确还原进程启动次数和存活时长。

- 原版本 Agents Spawned 累加 agent_start 事件；一个会话多次恢复可能对应多次启动。
- Agent Time 根据同一 PTY 的 start/stop 计算，消息首尾跨度会混入等待、离线和恢复间隔。
- 如需回填，应使用明确标注的 synthetic 历史数据，并保留原始统计口径；不能把估算当作原生事件。
- “历史唯一会话”“启动次数”“活跃时间”“进程存活时间”适合分开呈现。

## 证据与边界

原核验基于 Orca 1.4.177 实现和会话元数据；这里移除了个人统计总量与安装时间。没有在本次导入或改写 Orca 用户数据。

## 调研沿革

2026-08-09 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 为回填定义 cutoff、去重键、估计方法和恢复点。
- 将无法证明的时间保留为空或作为独立估算，不覆盖原指标。

## 来源

- [github.com · orca](https://github.com/stablyai/orca)
- [www.onorca.dev · terminal](https://www.onorca.dev/docs/terminal)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
