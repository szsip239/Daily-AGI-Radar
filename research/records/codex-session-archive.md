---
{
  "id": "codex-session-archive",
  "title": "Codex 会话归档：索引、发现、恢复与冷备份",
  "summary": "官方归档是保留 transcript 并改变活动状态；远端冷备份应建立在可验证的官方归档与恢复流程上。",
  "research_date": "2026-08-27",
  "category": "Agent 开发工具",
  "status": "historical",
  "tags": [
    "Codex",
    "会话归档",
    "resume",
    "SQLite",
    "冷备份"
  ],
  "sources": [
    "https://github.com/openai/codex/commit/ff29a44391deccde0aba0f8390337d7f3c319ea4",
    "https://github.com/openai/codex/commit/5af6979986a23fcd6bbeb1ef7b206cbc96e9a0a2",
    "https://github.com/openai/codex/blob/ff29a44391deccde0aba0f8390337d7f3c319ea4/codex-rs/app-server/README.md",
    "https://github.com/openai/codex/blob/ff29a44391deccde0aba0f8390337d7f3c319ea4/codex-rs/thread-store/src/local/archive_thread.rs#L63-L145",
    "https://github.com/openai/codex/blob/ff29a44391deccde0aba0f8390337d7f3c319ea4/codex-rs/thread-store/src/local/unarchive_thread.rs#L18-L143",
    "https://github.com/openai/codex/blob/ff29a44391deccde0aba0f8390337d7f3c319ea4/codex-rs/state/src/runtime/threads.rs#L1060-L1105",
    "https://github.com/openai/codex/blob/ff29a44391deccde0aba0f8390337d7f3c319ea4/codex-rs/app-server-protocol/src/protocol/v2/thread.rs#L1359-L1428",
    "https://github.com/openai/codex/blob/ff29a44391deccde0aba0f8390337d7f3c319ea4/codex-rs/app-server/README.md#L161-L203"
  ]
}
---

# Codex 会话归档：索引、发现、恢复与冷备份

> 原调研截至 2026-08-27；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

官方 archive 如何处理会话文件和索引，归档后能否发现、恢复，是否能直接把目录迁到 NAS？

## 结论

官方归档是保留 transcript 并改变活动状态；远端冷备份应建立在可验证的官方归档与恢复流程上。

- 原源码基线显示本地 rollout 从活动目录移入归档目录，同时更新 SQLite 的 archived、归档时间及路径。
- 反归档恢复活动存储及索引；直接移动或删除文件不是完整的官方归档事务。
- 活动 resume 列表不展示某条会话，不等于数据已删除；需要使用支持归档状态的查询和恢复路径。
- 把整个归档根目录指向网络盘会引入离线、延迟和文件/索引一致性问题；更稳妥的是逐项备份、校验、恢复演练后处理本地副本。

## 证据与边界

依据 Codex 0.149.1 对齐源码；本文不提供当前版本的新命令保证，也没有执行归档或删除。公开记录不包含私人会话 ID、路径和归档清单。

## 调研沿革

2026-08-27 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 按实际 CLI 版本验证归档列表、单条恢复和索引状态。
- 为每份冷备份保留校验、索引映射及回迁流程，先演练再清理。

## 来源

- [github.com · ff29a44391deccde0aba0f8390337d7f3c319ea4](https://github.com/openai/codex/commit/ff29a44391deccde0aba0f8390337d7f3c319ea4)
- [github.com · 5af6979986a23fcd6bbeb1ef7b206cbc96e9a0a2](https://github.com/openai/codex/commit/5af6979986a23fcd6bbeb1ef7b206cbc96e9a0a2)
- [github.com · README.md](https://github.com/openai/codex/blob/ff29a44391deccde0aba0f8390337d7f3c319ea4/codex-rs/app-server/README.md)
- [github.com · archive_thread.rs](https://github.com/openai/codex/blob/ff29a44391deccde0aba0f8390337d7f3c319ea4/codex-rs/thread-store/src/local/archive_thread.rs#L63-L145)
- [github.com · unarchive_thread.rs](https://github.com/openai/codex/blob/ff29a44391deccde0aba0f8390337d7f3c319ea4/codex-rs/thread-store/src/local/unarchive_thread.rs#L18-L143)
- [github.com · threads.rs](https://github.com/openai/codex/blob/ff29a44391deccde0aba0f8390337d7f3c319ea4/codex-rs/state/src/runtime/threads.rs#L1060-L1105)
- [github.com · thread.rs](https://github.com/openai/codex/blob/ff29a44391deccde0aba0f8390337d7f3c319ea4/codex-rs/app-server-protocol/src/protocol/v2/thread.rs#L1359-L1428)
- [github.com · README.md](https://github.com/openai/codex/blob/ff29a44391deccde0aba0f8390337d7f3c319ea4/codex-rs/app-server/README.md#L161-L203)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
