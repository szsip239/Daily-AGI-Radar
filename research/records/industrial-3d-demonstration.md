---
{
  "id": "industrial-3d-demonstration",
  "title": "工业立库 3D 演示：开源底座、建模证据与流程动画",
  "summary": "需要把场景渲染、设备资产和真实业务流程分开建模；通用仓库 demo 不能证明方案准确。",
  "research_date": "2026-08-22",
  "category": "行业 AI 应用",
  "status": "historical",
  "tags": [
    "Three.js",
    "WebGL",
    "工业3D",
    "立库",
    "数字孪生",
    "Blender"
  ],
  "sources": [
    "https://github.com/szsip239/3Dfactory/issues/4",
    "https://github.com/game4automation/realvirtual-WEB",
    "https://github.com/open-rmf/rmf-web",
    "https://github.com/ThatOpen/engine_components",
    "https://github.com/ThatOpen/engine_web-ifc",
    "https://github.com/xeokit/xeokit-sdk",
    "https://github.com/specklesystems/speckle-server",
    "https://github.com/mrdoob/three.js"
  ]
}
---

# 工业立库 3D 演示：开源底座、建模证据与流程动画

> 原调研截至 2026-08-22；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

能否以开源项目为底座，将工业方案材料转成可交互、可讲解的 3D 场景？

## 结论

需要把场景渲染、设备资产和真实业务流程分开建模；通用仓库 demo 不能证明方案准确。

- 原调研检查 Three.js/WebGL 与工业可视化候选；浏览器渲染路线适合交互展示，但脚手架的外观和工作流常需重新建设。
- 场景事实应来自可核对的图纸、方案和设备资料；设计材料冲突时应显式保留待确认项，而非用通用立库经验补齐。
- 料箱穿梭车库、托盘堆垛机库、输送线和跨层接口有不同空间与运动约束，不能让物料脱离承载设备直接飞行。
- 展示页应按入库、出库、补货等业务场景组织；设备点击展示参数，动画用于解释动作顺序和物料路径。
- 高辨识设备资产可用 Blender/建模工具制作，再以适当 LOD、光照和拾取交互集成；需要实际浏览器性能验收。

## 证据与边界

本记录仅归档可公开的技术路线与方法，排除客户身份、图纸、报价、设备数量、布局尺寸、私人视频和项目交付地址。原演示项目的验收不等于通用物理仿真已完成。

## 调研沿革

2026-08-22 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 建立证据到设备/路径的映射及业务状态机，再制作流程动画。
- 检查承载关系、运动速度、遮挡、近景细节和连续演示稳定性。

## 来源

- [github.com · 4](https://github.com/szsip239/3Dfactory/issues/4)
- [github.com · realvirtual-WEB](https://github.com/game4automation/realvirtual-WEB)
- [github.com · rmf-web](https://github.com/open-rmf/rmf-web)
- [github.com · engine_components](https://github.com/ThatOpen/engine_components)
- [github.com · engine_web-ifc](https://github.com/ThatOpen/engine_web-ifc)
- [github.com · xeokit-sdk](https://github.com/xeokit/xeokit-sdk)
- [github.com · speckle-server](https://github.com/specklesystems/speckle-server)
- [github.com · three.js](https://github.com/mrdoob/three.js)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
