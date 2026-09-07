---
{
  "id": "aitoearn-auth-publishing",
  "title": "AiToEarn：账号授权、凭据流转与发布链路",
  "summary": "三种入口最终由后端执行发布；AiToEarn API Key、登录会话与社交平台凭据必须分开理解。",
  "research_date": "2026-08-03",
  "category": "内容与媒体工具",
  "status": "historical",
  "tags": [
    "AiToEarn",
    "OAuth",
    "MCP",
    "Relay",
    "社媒发布",
    "账号授权"
  ],
  "sources": [
    "https://github.com/yikart/AiToEarn/commit/e8b0bfcce9186b0449b5b20137538394e3bddada",
    "https://github.com/yikart/aitoearn-openclaw-plugin/commit/c5c5e722b150167249aafa448ebaee80cb4d3840",
    "https://github.com/yikart/aitoearn-docs/commit/fdd03eb3ff5f5319b0be3991c904af7ae3748fc3",
    "https://github.com/yikart/AiToEarn/blob/e8b0bfcce9186b0449b5b20137538394e3bddada/README.md",
    "https://github.com/yikart/AiToEarn/blob/e8b0bfcce9186b0449b5b20137538394e3bddada/DOCKER_DEPLOYMENT_CN.md",
    "https://github.com/yikart/AiToEarn/blob/e8b0bfcce9186b0449b5b20137538394e3bddada/project/aitoearn-backend/apps/aitoearn-server/src/core/channels/mcp/channels.mcp.controller.ts",
    "https://github.com/yikart/AiToEarn/blob/e8b0bfcce9186b0449b5b20137538394e3bddada/project/aitoearn-backend/apps/aitoearn-server/src/core/channels/auth/auth.controller.ts",
    "https://github.com/yikart/AiToEarn/blob/e8b0bfcce9186b0449b5b20137538394e3bddada/project/aitoearn-backend/apps/aitoearn-server/src/core/channels/auth/auth.service.ts"
  ]
}
---

# AiToEarn：账号授权、凭据流转与发布链路

> 原调研截至 2026-08-03；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

托管网页、Agent API 和自部署各如何连接社交账号？本机是否必须安装 OpenClaw 或运行环境？

## 结论

三种入口最终由后端执行发布；AiToEarn API Key、登录会话与社交平台凭据必须分开理解。

- 托管网页只需浏览器；MCP 或 REST 可以直接供其他 agent 使用，OpenClaw 插件不是唯一入口。
- OAuth/扫码与插件采集是不同授权类型；后者可能把浏览器中的平台登录状态同步给所连接的后端。
- 自部署可以有类似网页的管理界面，但 OAuth 应用、回调域名、容器服务、对象存储及可能的 Relay 依赖仍需配置。
- 国内站与国际站的 API 地址、密钥和平台支持不能混用；测试账号连接成功也不等于所有平台发布成功。

## 证据与边界

依据官方文档与当时固定 commit 的链路分析。本记录不含测试账号、密钥、cookie、私人内容或发布记录，也不把过往测试状态当作当前授权状态。

## 调研沿革

2026-08-03 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 在单个平台用非敏感草稿验证完整发布链路及人工确认点。
- 确认凭据保存位置、撤销与续期机制、自有 OAuth 和 Relay 的边界。

## 来源

- [github.com · e8b0bfcce9186b0449b5b20137538394e3bddada](https://github.com/yikart/AiToEarn/commit/e8b0bfcce9186b0449b5b20137538394e3bddada)
- [github.com · c5c5e722b150167249aafa448ebaee80cb4d3840](https://github.com/yikart/aitoearn-openclaw-plugin/commit/c5c5e722b150167249aafa448ebaee80cb4d3840)
- [github.com · fdd03eb3ff5f5319b0be3991c904af7ae3748fc3](https://github.com/yikart/aitoearn-docs/commit/fdd03eb3ff5f5319b0be3991c904af7ae3748fc3)
- [github.com · README.md](https://github.com/yikart/AiToEarn/blob/e8b0bfcce9186b0449b5b20137538394e3bddada/README.md)
- [github.com · DOCKER_DEPLOYMENT_CN.md](https://github.com/yikart/AiToEarn/blob/e8b0bfcce9186b0449b5b20137538394e3bddada/DOCKER_DEPLOYMENT_CN.md)
- [github.com · channels.mcp.controller.ts](https://github.com/yikart/AiToEarn/blob/e8b0bfcce9186b0449b5b20137538394e3bddada/project/aitoearn-backend/apps/aitoearn-server/src/core/channels/mcp/channels.mcp.controller.ts)
- [github.com · auth.controller.ts](https://github.com/yikart/AiToEarn/blob/e8b0bfcce9186b0449b5b20137538394e3bddada/project/aitoearn-backend/apps/aitoearn-server/src/core/channels/auth/auth.controller.ts)
- [github.com · auth.service.ts](https://github.com/yikart/AiToEarn/blob/e8b0bfcce9186b0449b5b20137538394e3bddada/project/aitoearn-backend/apps/aitoearn-server/src/core/channels/auth/auth.service.ts)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
