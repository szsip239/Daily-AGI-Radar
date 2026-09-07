---
{
  "id": "enterprise-llm-gateway-dlp",
  "title": "企业 LLM 统一出口：聚合、员工密钥与运行时 DLP",
  "summary": "原调研没有找到完整单体；网关控制面、策略执行与 DLP 需要分层，OAuth 上游须单独验证。",
  "research_date": "2026-07-29",
  "category": "AI 基础设施",
  "status": "historical",
  "tags": [
    "LLM Gateway",
    "DLP",
    "LiteLLM",
    "agentgateway",
    "Future AGI",
    "OAuth"
  ],
  "sources": [
    "https://github.com/future-agi/future-agi",
    "https://github.com/future-agi/future-agi/commit/88adfc7dc7c8baecf8a9087fbb519852ea2ec8a0",
    "https://github.com/agentgateway/agentgateway",
    "https://github.com/agentgateway/agentgateway/commit/7cd564709f4834962d411e7a6219b30febdbd02f",
    "https://github.com/IBM/mcp-context-forge",
    "https://github.com/IBM/mcp-context-forge/commit/e38a9ce853634ce0ec99f82dc1c17385c8a3b7ec",
    "https://github.com/higress-group/higress",
    "https://github.com/higress-group/higress/commit/c8b82797c51a97faca46e2ae12990453f5026802"
  ]
}
---

# 企业 LLM 统一出口：聚合、员工密钥与运行时 DLP

> 原调研截至 2026-07-29；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

寻找同时支持多上游聚合、订阅 OAuth 上游、智能路由、员工密钥及运行时内容拦截的开源方案。

## 结论

原调研没有找到完整单体；网关控制面、策略执行与 DLP 需要分层，OAuth 上游须单独验证。

- Future AGI 在虚拟密钥、团队、路由和请求前扫描方面接近一体化，但原报告要求验证成熟度、遥测和企业特性。
- agentgateway 适合作为边界策略执行层；Prompt Guard、正则和 Webhook 可承担拒绝或脱敏。
- ContextForge 更偏 MCP/Agent 治理，Higress/Envoy 更偏基础设施数据面，不能仅看能力列表就替代员工预算管理。
- 入站 OAuth 认证不等于能把商业 CLI 订阅账号作为模型上游；普通 PII 正则也不等于识别企业商业秘密。
- 历史建议是边界网关 + 员工及路由控制面 + 本地 DLP + 单独上游适配层，先做 PoC 而非直接采购部署。

## 证据与边界

从原会话恢复的方案评估，未在整理日重验各产品功能和使用条款；模型文件、图像、OCR、流式输出、工具调用、多轮上下文是否全部经过 DLP 仍是验收缺口。

## 调研沿革

2026-07-29 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 构建包含代码、附件、Base64、图像和流式输出的泄漏测试集。
- 验证拒绝时的预算扣减、审计留存、身份与设备绑定、失败默认行为及上游授权范围。

## 来源

- [github.com · future-agi](https://github.com/future-agi/future-agi)
- [github.com · 88adfc7dc7c8baecf8a9087fbb519852ea2ec8a0](https://github.com/future-agi/future-agi/commit/88adfc7dc7c8baecf8a9087fbb519852ea2ec8a0)
- [github.com · agentgateway](https://github.com/agentgateway/agentgateway)
- [github.com · 7cd564709f4834962d411e7a6219b30febdbd02f](https://github.com/agentgateway/agentgateway/commit/7cd564709f4834962d411e7a6219b30febdbd02f)
- [github.com · mcp-context-forge](https://github.com/IBM/mcp-context-forge)
- [github.com · e38a9ce853634ce0ec99f82dc1c17385c8a3b7ec](https://github.com/IBM/mcp-context-forge/commit/e38a9ce853634ce0ec99f82dc1c17385c8a3b7ec)
- [github.com · higress](https://github.com/higress-group/higress)
- [github.com · c8b82797c51a97faca46e2ae12990453f5026802](https://github.com/higress-group/higress/commit/c8b82797c51a97faca46e2ae12990453f5026802)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
