---
{
  "id": "show-me-archify-comparison",
  "title": "Show Me 与 Archify：临时解释和正式图表的分工",
  "summary": "Show Me 适合当前讨论的最小视图，Archify 适合需保存、分享和评审的系统图。",
  "research_date": "2026-09-05",
  "category": "设计与可视化",
  "status": "historical",
  "tags": [
    "Show Me",
    "Archify",
    "Skill",
    "可视解释",
    "代码差异"
  ],
  "sources": [
    "https://github.com/humanlayer/skills/blob/main/plugins/show-me/skills/show-me/SKILL.md",
    "https://github.com/tt-a1i/archify/blob/v2.16.0/archify/SKILL.md"
  ]
}
---

# Show Me 与 Archify：临时解释和正式图表的分工

> 原调研截至 2026-09-05；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

两种技能是否重叠，日常讲解和长期系统图应如何路由？

## 结论

Show Me 适合当前讨论的最小视图，Archify 适合需保存、分享和评审的系统图。

- Show Me 可用调用树、组件树、文件结构、diff、伪代码、Mermaid 或临时 HTML 解释局部问题。
- Archify 有正式类型、渲染和交付检查，成本更高但适合维护多视角系统表达。
- 临时草图可以帮助确定讲解目标，但升级为正式图时仍需重查源码与权威文档。
- 路由以产物用途和生命周期为依据，不必为同一问题默认生成两套结果。

## 证据与边界

原核验基于当时官方 Skill/插件及 Archify 2.16；不把安装状态写成永久事实，也不声称 Show Me 有独立语义或布局校验器。

## 调研沿革

2026-09-05 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 用一段控制流解释与一次跨模块评审分别试用。
- 正式交付重新核验节点和关系，保留代码快照。

## 来源

- [github.com · SKILL.md](https://github.com/humanlayer/skills/blob/main/plugins/show-me/skills/show-me/SKILL.md)
- [github.com · SKILL.md](https://github.com/tt-a1i/archify/blob/v2.16.0/archify/SKILL.md)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
