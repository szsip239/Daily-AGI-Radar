---
{
  "id": "open-source-bid-generators",
  "title": "开源标书生成器：正文生成与专业图表组合路线",
  "summary": "正文生成器与施工计划引擎属于不同层；原调研建议组合验证，不宣称存在完整开箱即用单体。",
  "research_date": "2026-08-12",
  "category": "行业 AI 应用",
  "status": "historical",
  "tags": [
    "标书生成",
    "BidMaster",
    "Countersign",
    "OpenConstructionERP",
    "CPM"
  ],
  "sources": [
    "https://github.com/guangshu100/BidMaster-Pro",
    "https://github.com/dboudreau00/Countersign-RFP-RFI-RFQ-Studio-for-AI-assisted-Workflows",
    "https://github.com/datadrivenconstruction/OpenConstructionERP",
    "https://github.com/ibuilder/massing",
    "https://github.com/run-llama/auto_rfp",
    "https://github.com/microsoft/agent-for-rfp-response-solution-accelerator",
    "https://github.com/shandianT/bid-dog",
    "https://github.com/railwise-cn/tender-master"
  ]
}
---

# 开源标书生成器：正文生成与专业图表组合路线

> 原调研截至 2026-08-12；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

寻找达到当时热度和维护门槛、能生成应标正文且具备专业施工图表的开源方案。

## 结论

正文生成器与施工计划引擎属于不同层；原调研建议组合验证，不宣称存在完整开箱即用单体。

- BidMaster-Pro 和 Countersign 通过原查询的正文及维护门槛，但未找到完整 CPM/PERT 计划引擎。
- OpenConstructionERP 与 massing 有结构化任务、CPM/Gantt 等证据，定位是施工/AEC 平台而非标书正文生成器。
- 正文系统 + 排期引擎 + 网络图渲染 + Office 出件，是可继续验证的组合路线。
- 星数、最近提交和 README 宣称只能筛选候选，不能代替对图表计算与完整出件的验收。

## 证据与边界

原门槛为超过 100 stars、近 90 天实质更新等，仅适用于当时搜索。未部署所有候选；本次不复制易过时的星数排名。

## 调研沿革

2026-08-12 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 固定候选版本，跑一份脱敏招标文件及可手算的计划网络。
- 审查许可证和维护状态，验证图表可编辑、可导出及正文一致性。

## 来源

- [github.com · BidMaster-Pro](https://github.com/guangshu100/BidMaster-Pro)
- [github.com · Countersign-RFP-RFI-RFQ-Studio-for-AI-assisted-Workflows](https://github.com/dboudreau00/Countersign-RFP-RFI-RFQ-Studio-for-AI-assisted-Workflows)
- [github.com · OpenConstructionERP](https://github.com/datadrivenconstruction/OpenConstructionERP)
- [github.com · massing](https://github.com/ibuilder/massing)
- [github.com · auto_rfp](https://github.com/run-llama/auto_rfp)
- [github.com · agent-for-rfp-response-solution-accelerator](https://github.com/microsoft/agent-for-rfp-response-solution-accelerator)
- [github.com · bid-dog](https://github.com/shandianT/bid-dog)
- [github.com · tender-master](https://github.com/railwise-cn/tender-master)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
