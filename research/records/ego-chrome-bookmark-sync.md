---
{
  "id": "ego-chrome-bookmark-sync",
  "title": "ego lite 与 Chrome：同步能力及失败调查",
  "summary": "当时官方能力是周期性源浏览器到 ego 同步；启用开关并不等于同步成功。",
  "research_date": "2026-08-28",
  "category": "开发环境支撑",
  "status": "historical",
  "tags": [
    "ego lite",
    "Chrome",
    "书签同步",
    "浏览器",
    "自动同步"
  ],
  "sources": [
    "https://www.egolite.ai/changelog#changelog",
    "https://github.com/citrolabs/ego-lite#quick-start",
    "https://github.com/citrolabs/ego-lite/blob/main/skills/ego-browser/references/install.md",
    "https://github.com/citrolabs/ego-lite/blob/main/AGENTS.md",
    "https://github.com/citrolabs/ego-lite",
    "https://github.com/floccusaddon/floccus",
    "https://github.com/floccusaddon/floccus#readme",
    "https://github.com/floccusaddon/floccus/blob/v5.10.2/src/lib/browser/BrowserController.js"
  ]
}
---

# ego lite 与 Chrome：同步能力及失败调查

> 原调研截至 2026-08-28；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

ego 是否支持实时双向书签同步，官方单向自动同步为何可能不生效？

## 结论

当时官方能力是周期性源浏览器到 ego 同步；启用开关并不等于同步成功。

- 首次导入与持续同步是不同机制；官方 changelog 明示周期同步，未提供实时双向冲突合并证据。
- 同步涉及整批 Profile 数据，书签文件本身可读，也可能受其他数据库锁和浏览器版本差异影响。
- 原机上多次等待和重启未收敛，后续 0.4.7.3 复核仍失败；数据库锁与版本兼容是候选阻塞，未声称已证明唯一根因。
- 人工补齐新增与传播删除需要不同授权和恢复策略，不能为“同步一致”自动恢复用户主动删除的书签。

## 证据与边界

限定原机与 0.4.7.x 历史组合，不能推广为全部用户失败；本记录不包含书签、Profile、账号、主机或备份地址。

## 调研沿革

2026-08-28 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 按新版官方说明做可控测试，观察实际同步时间、结果和目标数据。
- 区分新增、修改和删除，保留校验过的恢复点，避免直接复制运行中的整套 Profile。

## 来源

- [www.egolite.ai · changelog](https://www.egolite.ai/changelog#changelog)
- [github.com · ego-lite](https://github.com/citrolabs/ego-lite#quick-start)
- [github.com · install.md](https://github.com/citrolabs/ego-lite/blob/main/skills/ego-browser/references/install.md)
- [github.com · AGENTS.md](https://github.com/citrolabs/ego-lite/blob/main/AGENTS.md)
- [github.com · ego-lite](https://github.com/citrolabs/ego-lite)
- [github.com · floccus](https://github.com/floccusaddon/floccus)
- [github.com · floccus](https://github.com/floccusaddon/floccus#readme)
- [github.com · BrowserController.js](https://github.com/floccusaddon/floccus/blob/v5.10.2/src/lib/browser/BrowserController.js)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
