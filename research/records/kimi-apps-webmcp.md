---
{
  "id": "kimi-apps-webmcp",
  "title": "Kimi 数据画板与可视题解：原理及复刻路径",
  "summary": "两者均以网页工具连接智能体；数据画板采用受约束图表参数，可视题解运行模型生成的 HTML/JavaScript。",
  "research_date": "2026-09-07",
  "category": "生成式应用",
  "status": "source-verified",
  "tags": [
    "Kimi",
    "WebMCP",
    "数据画板",
    "可视题解",
    "可视化",
    "复刻"
  ],
  "sources": [
    "https://data-draw.app.kimi.com/src/mcp.js",
    "https://data-draw.app.kimi.com/src/atlas/charts/index.js",
    "https://data-draw.app.kimi.com/src/atlas/catalog.js",
    "https://visual-solution.app.kimi.com/src/tools.js",
    "https://visual-solution.app.kimi.com/src/board.js",
    "https://visual-solution.app.kimi.com/src/bank.js",
    "https://webmachinelearning.github.io/webmcp/",
    "https://github.com/webmachinelearning/webmcp/issues/196",
    "https://github.com/webmachinelearning/webmcp/issues/212",
    "https://github.com/WebMCP-org/npm-packages/issues/256",
    "https://github.com/microsoft/data-formulator",
    "https://github.com/antvis/mcp-server-chart",
    "https://github.com/WebMCP-org/npm-packages"
  ]
}
---

# Kimi 数据画板与可视题解：原理及复刻路径

> 原调研截至 2026-09-07；整理日期 2026-09-07。本轮依据公开前端源码核验，尚未完成端到端生成测试。

## 调研问题

分析 data-draw 与 visual-solution 的实现机制，检索网络和 GitHub 讨论，判断能否独立复刻。

## 结论

两者均以网页工具连接智能体；数据画板采用受约束图表参数，可视题解运行模型生成的 HTML/JavaScript。

- 数据画板通过 document.modelContext.registerTool 暴露 list_datasets、profile_dataset、get_dataset_rows、get_chart_catalog、add_chart、update_chart 等工具；模型选图与组织论点，页面负责校验和绘制。
- 公开目录包含 41 个图型模块。图型有 schema、适用条件、强调与注释规则；条形图实现检查数量、非负值和重复标签等，拒绝不符合规则的参数。
- 可视题解提供 brief、read_problem、draw、check_board、show_board、explain、wait_for_user、say 八个工具。题目截图作为图像返回给模型，draw 接受 HTML。
- 画布用 iframe sandbox="allow-scripts" 和 srcdoc 运行生成内容，可加载 CDN 库并使用 SVG、Canvas、WebGL。页面注入错误、资源加载、溢出与空画布监测，再通过 postMessage 回传。
- check_board 验证显示和运行问题，不验证数学答案或审美；身份及云端题库与核心讲题界面可以分开。
- 复刻可先做共用工具调用和事件层，再做结构化图表与自由网页两种渲染器。第一版可直接接模型 API，后续增加 WebMCP 适配，不必绑定 Kimi 登录。

## 证据与边界

证据来自公开 HTML 及其直接引用的未压缩 JS；登录访问进入额外个人资料授权页，未新增授权。未完成模型生成实测，未确认底层模型、后端调度或完整服务端源码。精确域名及名称搜索未找到本体官方开源仓库或直接技术拆解，不代表公开讨论不存在。WebMCP 在核验时仍是社区草案；公开可读代码不等于已获得再分发许可。

## 调研沿革

2026-09-07 对两个应用的公开源码及相关 WebMCP 讨论进行核验。相关实现参考包括 Microsoft Data Formulator、AntV MCP Server Chart 和 WebMCP-org/npm-packages，未发现它们与 Kimi 本体的依赖关系。

## 相关讨论与参考实现

本轮没有找到两个应用本体的官方开源仓库或直接拆解；以下属于相关技术讨论，不能据此推断 Kimi 使用了这些项目。

| 来源 | 本课题的参考价值 |
| --- | --- |
| [WebMCP #196](https://github.com/webmachinelearning/webmcp/issues/196) | 长任务进度、状态和心跳反馈 |
| [WebMCP #212](https://github.com/webmachinelearning/webmcp/issues/212) | 页面跳转后的工具生命周期与 Worker |
| [npm-packages #256](https://github.com/WebMCP-org/npm-packages/issues/256) | 特定 Chrome 无头版本的 API 暴露差异 |
| [Microsoft Data Formulator](https://github.com/microsoft/data-formulator) | AI 数据分析、可视化探索与报告流程 |
| [AntV MCP Server Chart](https://github.com/antvis/mcp-server-chart) | 将图表生成封装为模型可调用工具 |
| [WebMCP-org/npm-packages](https://github.com/WebMCP-org/npm-packages) | 类型、传输与浏览器集成 |

复刻先从数据画板入手更容易建立确定性验收：数值正确、图型规则、追问修改和导出可逐项比较。可视题解的上限更高，但还需独立验证题目推理、动画语义与生成代码的稳定性。

## 后续验证

- 以小数据集核验选图、数值及导出一致性；给图表结论增加数据来源追溯。
- 为生成网页增加独立来源隔离、受控网络、消息来源校验和有限次数修复，并用截图补充遥测。
- 核验 WebMCP 宿主兼容性和中断恢复；独立实现产品代码与视觉资产。

## 来源

- [data-draw.app.kimi.com · mcp.js](https://data-draw.app.kimi.com/src/mcp.js)
- [data-draw.app.kimi.com · index.js](https://data-draw.app.kimi.com/src/atlas/charts/index.js)
- [data-draw.app.kimi.com · catalog.js](https://data-draw.app.kimi.com/src/atlas/catalog.js)
- [visual-solution.app.kimi.com · tools.js](https://visual-solution.app.kimi.com/src/tools.js)
- [visual-solution.app.kimi.com · board.js](https://visual-solution.app.kimi.com/src/board.js)
- [visual-solution.app.kimi.com · bank.js](https://visual-solution.app.kimi.com/src/bank.js)
- [webmachinelearning.github.io · webmcp](https://webmachinelearning.github.io/webmcp/)
- [github.com · 196](https://github.com/webmachinelearning/webmcp/issues/196)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
