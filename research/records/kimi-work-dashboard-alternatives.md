---
{
  "id": "kimi-work-dashboard-alternatives",
  "title": "Kimi Work 看板：开源替代与组件编排",
  "summary": "没有核验到完整替代品；Glance、Scarf 和 Tambo 分别接近编排、桌面成品与生成式 UI runtime。",
  "research_date": "2026-07-28",
  "category": "生成式应用",
  "status": "historical",
  "tags": [
    "Kimi Work",
    "看板",
    "Glance",
    "Scarf",
    "Tambo",
    "生成式UI"
  ],
  "sources": [
    "https://github.com/acfranzen/glance",
    "https://github.com/awizemann/scarf",
    "https://github.com/tambo-ai/tambo",
    "https://www.kimi.com/zh-cn/resources/kimi-work-dashboard",
    "https://www.kimi.com/zh-sg/help/kimi-work/overview",
    "https://github.com/acfranzen/glance#api-reference-for-openclaw",
    "https://github.com/acfranzen/glance#why-local-first",
    "https://github.com/acfranzen/glance/blob/main/LICENSE"
  ]
}
---

# Kimi Work 看板：开源替代与组件编排

> 原调研截至 2026-07-28；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

寻找通过 agent 生成、编排小组件，跨会话保存并放到桌面的开源项目。

## 结论

没有核验到完整替代品；Glance、Scarf 和 Tambo 分别接近编排、桌面成品与生成式 UI runtime。

- 目标闭环包含组件生成、局部批注、跨会话看板、单组件桌面窗口，以及后台数据和任务维护。只有局部 UI 相似不算完整替代。
- Glance 的 agent + JSX widget + 持久看板概念最贴近，但当时提交和发布历史很短，属于原型。
- Scarf 有桌面产品、dashboard 配置及刷新能力，但受固定 schema、Hermes 与平台支持范围约束。
- Tambo 能将模型意图映射到 React 组件并持续更新 props，适合作为底座；布局、看板集合页、桌面壳仍需建设。

## 证据与边界

原调研采用官网、README、源码与 release；未安装候选或实测全部闭环。项目成熟度与 stars 是历史快照。

## 调研沿革

2026-07-28 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 用同一任务验证创建、修改、重启恢复、定时刷新和独立桌面显示。
- 先明确要可用成品还是可开发底座，再决定试用路线。

## 来源

- [github.com · glance](https://github.com/acfranzen/glance)
- [github.com · scarf](https://github.com/awizemann/scarf)
- [github.com · tambo](https://github.com/tambo-ai/tambo)
- [www.kimi.com · kimi-work-dashboard](https://www.kimi.com/zh-cn/resources/kimi-work-dashboard)
- [www.kimi.com · overview](https://www.kimi.com/zh-sg/help/kimi-work/overview)
- [github.com · glance](https://github.com/acfranzen/glance#api-reference-for-openclaw)
- [github.com · glance](https://github.com/acfranzen/glance#why-local-first)
- [github.com · LICENSE](https://github.com/acfranzen/glance/blob/main/LICENSE)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
