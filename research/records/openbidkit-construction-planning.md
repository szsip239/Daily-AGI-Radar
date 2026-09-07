---
{
  "id": "openbidkit-construction-planning",
  "title": "OpenBidKit 与易标书：图示生成和施工计划能力",
  "summary": "生成一张计划图不等于具备任务依赖、日历、关键路径和时差计算能力。",
  "research_date": "2026-08-12",
  "category": "行业 AI 应用",
  "status": "historical",
  "tags": [
    "OpenBidKit",
    "易标书",
    "标书",
    "CPM",
    "甘特图",
    "网络计划"
  ],
  "sources": [
    "https://github.com/FB208/OpenBidKit_Yibiao/blob/28220b7d89b667aed64e8b0f9ad709ad5d1801a1/%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E/%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97/v2%E7%89%88%E6%9C%AC%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97.md#L115-L128",
    "https://github.com/FB208/OpenBidKit_Yibiao/blob/28220b7d89b667aed64e8b0f9ad709ad5d1801a1/README.md#L80-L82",
    "https://github.com/FB208/OpenBidKit_Yibiao/blob/28220b7d89b667aed64e8b0f9ad709ad5d1801a1/client/electron/utils/mermaidPolicy.cjs#L1-L35",
    "https://github.com/FB208/OpenBidKit_Yibiao",
    "https://github.com/FB208/OpenBidKit_Yibiao/commit/28220b7d89b667aed64e8b0f9ad709ad5d1801a1",
    "https://github.com/FB208/OpenBidKit_Yibiao/blob/28220b7d89b667aed64e8b0f9ad709ad5d1801a1/README.md#L53-L102",
    "https://github.com/FB208/OpenBidKit_Yibiao/blob/28220b7d89b667aed64e8b0f9ad709ad5d1801a1/%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E/%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97/v2%E7%89%88%E6%9C%AC%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97.md#L3-L20",
    "https://github.com/FB208/OpenBidKit_Yibiao/blob/28220b7d89b667aed64e8b0f9ad709ad5d1801a1/client/src/features/technical-plan/pages/ContentEditPage.tsx#L106-L120"
  ]
}
---

# OpenBidKit 与易标书：图示生成和施工计划能力

> 原调研截至 2026-08-12；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

通用标书生成器能否提供专业横道图、时标网络图和施工进度计算？

## 结论

生成一张计划图不等于具备任务依赖、日历、关键路径和时差计算能力。

- 当时 OpenBidKit 有 HTML 图表规划、AI 生成、浏览器截图及 Word 插入链路，足以证明通用图示输出。
- Mermaid 策略主要覆盖简单 flowchart，不能据此宣称有 CPM 或专业网络计划引擎。
- 易标书公开前端有任务关系、计划日期、日历、关键/非关键工作和导出流程；这证明产品表面及接口设计，不证明后端算法正确。
- 核心差距在结构化排期语义及可编辑计算模型，而非是否能画出类似甘特图的图像。

## 证据与边界

OpenBidKit 固定 commit 28220b7d89b667aed64e8b0f9ad709ad5d1801a1；商业产品仅检查公开前端，未登录提交真实任务。

## 调研沿革

2026-08-12 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 用已知关键路径的小型任务集测试前后推、日历和总/自由时差。
- 验证修改依赖后的重算、导出与 Word 内嵌一致性。

## 来源

- [github.com · v2%E7%89%88%E6%9C%AC%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97.md](https://github.com/FB208/OpenBidKit_Yibiao/blob/28220b7d89b667aed64e8b0f9ad709ad5d1801a1/%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E/%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97/v2%E7%89%88%E6%9C%AC%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97.md#L115-L128)
- [github.com · README.md](https://github.com/FB208/OpenBidKit_Yibiao/blob/28220b7d89b667aed64e8b0f9ad709ad5d1801a1/README.md#L80-L82)
- [github.com · mermaidPolicy.cjs](https://github.com/FB208/OpenBidKit_Yibiao/blob/28220b7d89b667aed64e8b0f9ad709ad5d1801a1/client/electron/utils/mermaidPolicy.cjs#L1-L35)
- [github.com · OpenBidKit_Yibiao](https://github.com/FB208/OpenBidKit_Yibiao)
- [github.com · 28220b7d89b667aed64e8b0f9ad709ad5d1801a1](https://github.com/FB208/OpenBidKit_Yibiao/commit/28220b7d89b667aed64e8b0f9ad709ad5d1801a1)
- [github.com · README.md](https://github.com/FB208/OpenBidKit_Yibiao/blob/28220b7d89b667aed64e8b0f9ad709ad5d1801a1/README.md#L53-L102)
- [github.com · v2%E7%89%88%E6%9C%AC%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97.md](https://github.com/FB208/OpenBidKit_Yibiao/blob/28220b7d89b667aed64e8b0f9ad709ad5d1801a1/%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E/%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97/v2%E7%89%88%E6%9C%AC%E6%9B%B4%E6%96%B0%E6%97%A5%E5%BF%97.md#L3-L20)
- [github.com · ContentEditPage.tsx](https://github.com/FB208/OpenBidKit_Yibiao/blob/28220b7d89b667aed64e8b0f9ad709ad5d1801a1/client/src/features/technical-plan/pages/ContentEditPage.tsx#L106-L120)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
