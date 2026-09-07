---
{
  "id": "kimi-widget-runtime-decoupling",
  "title": "Kimi 组件模板与独立运行：Skill、宿主及复刻边界",
  "summary": "纯 HTML 组件已做独立 runner PoC；完整动态组件仍依赖宿主工具、数据、权限和状态协议。",
  "research_date": "2026-07-29",
  "category": "生成式应用",
  "status": "historical",
  "tags": [
    "Kimi",
    "Widget",
    "Canvas",
    "DaimonWidget",
    "组件模板",
    "独立运行"
  ],
  "sources": [
    "https://www.kimi.com/zh-cn/resources/kimi-work-dashboard",
    "https://github.com/MoonshotAI/kimi-code"
  ]
}
---

# Kimi 组件模板与独立运行：Skill、宿主及复刻边界

> 原调研截至 2026-07-29；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

Kimi Work 组件能否由其他 coding agent 开发，是否能脱离 Kimi 运行并复刻完整产品？

## 结论

纯 HTML 组件已做独立 runner PoC；完整动态组件仍依赖宿主工具、数据、权限和状态协议。

- Widget.create、Widget.validate、Widget.show、Canvas.placeWidget 属于宿主能力；读取对应 Skill 不能自动获得工具。
- 不调用 DaimonWidget 的普通 HTML 可脱离 Kimi 运行；带宿主 API 的组件必须逐项替换或实现兼容层。
- widgetdesign 是可读的设计规则和素材集合，但原调研未发现随附开源许可，不能将可读等同于可再分发。
- 通用 agent 可以独立生成同类 HTML；批注、看板注册、跨会话状态、桌面固定和后台调度需要产品层实现。

## 证据与边界

原会话完成的是有限纯 HTML PoC，不是整个 Kimi Widget runtime 的兼容性认证。不能把纯静态样例成功推广为全部动态组件可直接搬走。

## 调研沿革

2026-07-28 完成 runner PoC 与模板能力讨论；2026-07-29 明确转向独立产品开发。本记录只归档技术判断，不包含后续项目私有实现。

## 后续验证

- 建立宿主 API 调用清单，按纯静态、外部数据、宿主专属组件分层测试。
- 独立实现状态、权限、定时与窗口管理；保持设计素材许可边界。

## 来源

- [www.kimi.com · kimi-work-dashboard](https://www.kimi.com/zh-cn/resources/kimi-work-dashboard)
- [github.com · kimi-code](https://github.com/MoonshotAI/kimi-code)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
