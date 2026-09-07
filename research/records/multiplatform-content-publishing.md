---
{
  "id": "multiplatform-content-publishing",
  "title": "多平台内容运营与发布工具：国内外能力对比",
  "summary": "中国平台无人值守发布与跨平台运营是不同目标；AiToEarn 值得验证，海外平台方案不能直接替代国内链路。",
  "research_date": "2026-08-02",
  "category": "内容与媒体工具",
  "status": "historical",
  "tags": [
    "多平台发布",
    "AiToEarn",
    "Postiz",
    "social-auto-upload",
    "内容运营"
  ],
  "sources": [
    "https://github.com/dreammis/social-auto-upload",
    "https://github.com/yikart/AiToEarn",
    "https://github.com/dreammis/social-auto-upload/blob/main/README.md",
    "https://github.com/dreammis/social-auto-upload/blob/main/requirements.txt",
    "https://github.com/gitroomhq/postiz-app/tree/main/libraries/nestjs-libraries/src/integrations/social",
    "https://github.com/gitroomhq/postiz-app",
    "https://github.com/gitroomhq/postiz-agent",
    "https://github.com/inovector/mixpost"
  ]
}
---

# 多平台内容运营与发布工具：国内外能力对比

> 原调研截至 2026-08-02；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

是否存在超越 social-auto-upload 的多平台运营、排期和发布工具，尤其覆盖中国平台？

## 结论

中国平台无人值守发布与跨平台运营是不同目标；AiToEarn 值得验证，海外平台方案不能直接替代国内链路。

- 原两份独立评审分别检查平台覆盖、授权方式、排期、评论、统计、自托管与维护状态。
- AiToEarn 的运营功能较完整，但部分平台有人工确认、浏览器插件或 Relay 依赖，不能把“支持发布”解释为全自动。
- Postiz、Mixpost 等海外路线适合相应平台；监听能力、素材管理和真正发帖能力必须分开核对。
- 基线仓库的 README 许可声明与 LICENSE 文件可见性曾存在不一致，历史评审要求进一步核实，不能仅凭徽章做商用判断。

## 证据与边界

覆盖数、许可与活跃度仅是 2026-08-02 快照；未在本次整理中重新判断。原报告中的绝对化市场排名已改为有场景边界的采用判断。

## 调研沿革

2026-08-02 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 逐平台验收登录、刷新凭据、草稿、发布、重试及账号风控。
- 根据国内/海外和有人值守/无人值守划分流程，再计算自部署成本。

## 来源

- [github.com · social-auto-upload](https://github.com/dreammis/social-auto-upload)
- [github.com · AiToEarn](https://github.com/yikart/AiToEarn)
- [github.com · README.md](https://github.com/dreammis/social-auto-upload/blob/main/README.md)
- [github.com · requirements.txt](https://github.com/dreammis/social-auto-upload/blob/main/requirements.txt)
- [github.com · social](https://github.com/gitroomhq/postiz-app/tree/main/libraries/nestjs-libraries/src/integrations/social)
- [github.com · postiz-app](https://github.com/gitroomhq/postiz-app)
- [github.com · postiz-agent](https://github.com/gitroomhq/postiz-agent)
- [github.com · mixpost](https://github.com/inovector/mixpost)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
