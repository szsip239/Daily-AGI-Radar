---
{
  "id": "freecad-dwg-workflow",
  "title": "FreeCAD 与 DWG：工业建模前的转换可行性",
  "summary": "先验证 DWG 转换质量，再决定工具链；安装成功不能作为图纸已完整解析的证据。",
  "research_date": "2026-08-14",
  "category": "开发环境支撑",
  "status": "historical",
  "tags": [
    "FreeCAD",
    "DWG",
    "DXF",
    "CAD",
    "3D建模"
  ],
  "sources": [
    "https://www.freecad.org/",
    "https://wiki.freecad.org/FreeCAD_and_DWG_Import"
  ]
}
---

# FreeCAD 与 DWG：工业建模前的转换可行性

> 原调研截至 2026-08-14；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

FreeCAD 能否直接打开工程 DWG，安装后是否就能正确恢复几何与尺寸？

## 结论

先验证 DWG 转换质量，再决定工具链；安装成功不能作为图纸已完整解析的证据。

- DWG 读取常依赖外部转换器或导入路径；应对具体版本、平台和文件格式单独核验。
- 文字、标注、块、单位、图层和外部引用可能在转换中丢失或变化。
- 用于 3D 重建前，需要比对原图与转换结果的边界框、关键尺寸、坐标和设备块。

## 证据与边界

原课题围绕 macOS 工程图读取与转换，未将私人 CAD 文件公开。工具可启动与复杂图纸保真转换是独立验收项。

## 调研沿革

2026-08-14 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 用小型公开样例验证转换后结构，再检查脱敏工程样例。
- 保留原 DWG，记录转换器及版本，避免将猜测几何写回设计事实。

## 来源

- [www.freecad.org · 官方入口](https://www.freecad.org/)
- [wiki.freecad.org · FreeCAD_and_DWG_Import](https://wiki.freecad.org/FreeCAD_and_DWG_Import)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
