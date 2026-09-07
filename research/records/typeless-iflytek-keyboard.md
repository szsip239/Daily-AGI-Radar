---
{
  "id": "typeless-iflytek-keyboard",
  "title": "Typeless 与讯飞语音键盘：音频设备及 SDK 边界",
  "summary": "原机蓝牙模式下键盘未暴露标准音频输入，讯飞助手走专用通道；这不等于 Typeless 麦克风权限故障。",
  "research_date": "2026-08-29",
  "category": "语音与输入",
  "status": "historical",
  "tags": [
    "Typeless",
    "讯飞",
    "D1",
    "BLE",
    "CoreAudio",
    "语音输入"
  ],
  "sources": [
    "https://www.typeless.com/help/quickstart/settings",
    "https://www.typeless.com/ask-anything",
    "https://www.typeless.com/help/installation-and-setup",
    "https://github.com/iFLYTEK-OP/websdk-java-demo",
    "https://github.com/iflytek/iFly-Skills",
    "https://www.xfyun.cn/doc/asr/voicedictation/API.html",
    "https://www.xfyun.cn/doc/platform/quickguide.html",
    "https://www.xfyun.cn/doc/asr/lfasr/agreement.html"
  ]
}
---

# Typeless 与讯飞语音键盘：音频设备及 SDK 边界

> 原调研截至 2026-08-29；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

Typeless 为什么不能调用讯飞实体键盘的麦克风，是否有开放 SDK 可以接入？

## 结论

原机蓝牙模式下键盘未暴露标准音频输入，讯飞助手走专用通道；这不等于 Typeless 麦克风权限故障。

- 两套软件本身都是识别到文字的输入工具，不是天然上下游。Typeless 使用系统可见的麦克风，不自动读取另一输入法的识别结果。
- 原机将 D1 识别为 Keyboard/BLE，未出现对应 CoreAudio 输入；讯飞助手能接收自己的设备事件。
- 公开 WebAPI Demo 和语音 SDK 封装面向识别服务，不等于提供 D1 硬件采音协议。
- 标准麦克风接入 Typeless 是直接路线；USB 有线模式能否暴露 USB Audio，需要单独检查，不能由蓝牙结果推断。

## 证据与边界

现场观察仅针对当时蓝牙连接和软件版本；未确认有线模式，未取得厂商 D1 硬件协议，也未开发私有音频转接。

## 调研沿革

2026-08-29 完成该课题的资料核对与采用判断；2026-09-07 按课题归档，保留未决事项。

## 后续验证

- 用 USB 数据连接后检查系统音频设备和 Typeless 麦克风列表。
- 如需开发，向厂商索取硬件采音文档；区分识别 API 和原始音频获取。

## 来源

- [www.typeless.com · settings](https://www.typeless.com/help/quickstart/settings)
- [www.typeless.com · ask-anything](https://www.typeless.com/ask-anything)
- [www.typeless.com · installation-and-setup](https://www.typeless.com/help/installation-and-setup)
- [github.com · websdk-java-demo](https://github.com/iFLYTEK-OP/websdk-java-demo)
- [github.com · iFly-Skills](https://github.com/iflytek/iFly-Skills)
- [www.xfyun.cn · API.html](https://www.xfyun.cn/doc/asr/voicedictation/API.html)
- [www.xfyun.cn · quickguide.html](https://www.xfyun.cn/doc/platform/quickguide.html)
- [www.xfyun.cn · agreement.html](https://www.xfyun.cn/doc/asr/lfasr/agreement.html)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
