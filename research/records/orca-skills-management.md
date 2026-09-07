---
{
  "id": "orca-skills-management",
  "title": "Orca Skills 管理：发现、更新与界面迁移",
  "summary": "历史证据指向后台发现与场景化更新入口，不能等同于通用技能商店或完整 CRUD。",
  "research_date": "2026-08-14",
  "category": "Agent 开发工具",
  "status": "historical",
  "tags": [
    "Orca",
    "Skills",
    "技能管理",
    "更新",
    "稳定版"
  ],
  "sources": [
    "https://github.com/stablyai/orca/releases/tag/v1.4.163",
    "https://github.com/stablyai/orca/blob/v1.4.163/src/renderer/src/components/skills/SkillsPage.tsx#L75",
    "https://github.com/stablyai/orca/blob/v1.4.163/src/renderer/src/App.tsx#L330",
    "https://github.com/stablyai/orca/blob/v1.4.163/src/renderer/src/components/sidebar/SidebarNav.tsx",
    "https://github.com/stablyai/orca/blob/v1.4.163/src/renderer/src/components/sidebar/SidebarToolbar.tsx",
    "https://github.com/stablyai/orca/blob/v1.4.163/src/renderer/src/components/settings/CliSection.tsx#L350",
    "https://github.com/stablyai/orca/blob/v1.4.163/src/renderer/src/components/settings/AgentSkillSetupPanel.tsx#L21",
    "https://github.com/stablyai/orca/blob/v1.4.163/src/renderer/src/components/skills/SkillFreshnessUpdateDialog.tsx#L276"
  ]
}
---

# Orca Skills 管理：发现、更新与界面迁移

> 原调研截至 2026-08-14；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

Orca 是否有完整技能管理界面，更新入口迁移是否发布，跨 agent 支持覆盖到哪里？

## 结论

历史证据指向后台发现与场景化更新入口，不能等同于通用技能商店或完整 CRUD。

- 7月底至8月初的核验跟踪了 SkillsPage 入口删除，以及 Toast、Update Skills 弹窗和 Settings 的替代入口。
- 官方 skills 的新鲜度检查与安全更新是一条专门路径；第三方技能、项目技能和插件自有副本不一定由同一路径管理。
- 8月中旬复核区分 stable、RC 和 main，Prime 相关 roots/识别不应在尚未进入稳定版时称为稳定支持。
- 目录存在、扫描到技能、模型能够使用、自动更新可用，是四个需要分别核验的层次。

## 证据与边界

合并了同一课题的多份阶段报告，以 2026-08-14 为最后资料截点；不是对当前 Orca 的实时功能清单。没有公开私人 skill 清单和安装拓扑。

## 调研沿革

2026-08-01 核验 UI 迁移与稳定构建；2026-08-14 追加 stable/RC/main 分层和 Prime 支持范围，合并为一条连续课题。

## 后续验证

- 按实际使用版本核验发现、安装、更新和错误恢复，而非只读最新 main。
- 检查跨 agent 的共享目录、软链接与插件自有技能是否出现重复。

## 来源

- [github.com · v1.4.163](https://github.com/stablyai/orca/releases/tag/v1.4.163)
- [github.com · SkillsPage.tsx](https://github.com/stablyai/orca/blob/v1.4.163/src/renderer/src/components/skills/SkillsPage.tsx#L75)
- [github.com · App.tsx](https://github.com/stablyai/orca/blob/v1.4.163/src/renderer/src/App.tsx#L330)
- [github.com · SidebarNav.tsx](https://github.com/stablyai/orca/blob/v1.4.163/src/renderer/src/components/sidebar/SidebarNav.tsx)
- [github.com · SidebarToolbar.tsx](https://github.com/stablyai/orca/blob/v1.4.163/src/renderer/src/components/sidebar/SidebarToolbar.tsx)
- [github.com · CliSection.tsx](https://github.com/stablyai/orca/blob/v1.4.163/src/renderer/src/components/settings/CliSection.tsx#L350)
- [github.com · AgentSkillSetupPanel.tsx](https://github.com/stablyai/orca/blob/v1.4.163/src/renderer/src/components/settings/AgentSkillSetupPanel.tsx#L21)
- [github.com · SkillFreshnessUpdateDialog.tsx](https://github.com/stablyai/orca/blob/v1.4.163/src/renderer/src/components/skills/SkillFreshnessUpdateDialog.tsx#L276)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
