---
{
  "id": "local-llm-long-context-mac",
  "title": "Mac 本地模型长上下文：GGUF、MLX、MTPLX 与性能口径",
  "summary": "先固定模型结构、格式与真实上下文，再讨论容量和速度；短提示词峰值不能用于承诺长文首字时间。",
  "research_date": "2026-09-05",
  "category": "AI 基础设施",
  "status": "historical",
  "tags": [
    "Mac",
    "MLX",
    "MTPLX",
    "GGUF",
    "128K",
    "TTFT",
    "Qwen",
    "本地模型"
  ],
  "sources": [
    "https://github.com/ml-explore/mlx-lm",
    "https://github.com/youssofal/MTPLX",
    "https://github.com/jundot/omlx",
    "https://github.com/ggml-org/llama.cpp"
  ]
}
---

# Mac 本地模型长上下文：GGUF、MLX、MTPLX 与性能口径

> 原调研截至 2026-09-05；整理日期 2026-09-07。本文为历史调研整理，未在整理日重新联网核验；版本、许可、维护状态与测试数据均以原调研时点为限。

## 调研问题

在长文写作和约 128K 实际输入下，如何比较不同 Mac 配置、模型量化和推理框架？

## 结论

先固定模型结构、格式与真实上下文，再讨论容量和速度；短提示词峰值不能用于承诺长文首字时间。

- 原会话从 30B 级 MoE/8-bit 切换到指定 27B 稠密模型，再比较 GGUF、MLX 和 MTPLX，前后表格条件不同，不能合并为硬件排名。
- 内存预算包含权重、KV cache、运行时、输入处理和系统预留；同容量不同芯片主要改变计算和带宽，不自动改变模型容量需求。
- 实际输入 128K、只设置上限 128K、tg128 输出测试以及累计生成量是不同指标。
- TTFT、prefill、生成速度、思考 token 和完整请求耗时要分开记录；medium 思考强度不对应固定 token 数。
- 前缀缓存、有损预填充筛选、MTP 和其他投机解码会改变比较条件；需记录是否启用、模型版本和缓存是否命中。
- 原购买倾向基于单会话与给定模型做有条件建议；缺少全部硬件在同量化、同输入和同引擎下的完整直接实测。

## 证据与边界

本条仅归档测量方法和原研究边界，不重新发布未经本轮复核的硬件价格、发售消息或性能数值，也不将历史推算当成购买承诺。社区自报测试及 X 镜像不是本机复测，转换量化不能视为原权重等价。

## 调研沿革

2026-09-05 连续六轮讨论，依次调整上下文目标、模型、量化、推理框架和证据渠道。整理时保留比较方法，不把不同轮次的估算混成统一实测。

## 后续验证

- 固定模型文件和推理构建，用真实长文测冷读、缓存命中第二轮、输出速度、整进程峰值与 swap。
- 记录原始 benchmark 输入/输出长度和所有加速开关，再做配置采购判断。

## 来源

- [github.com · mlx-lm](https://github.com/ml-explore/mlx-lm)
- [github.com · MTPLX](https://github.com/youssofal/MTPLX)
- [github.com · omlx](https://github.com/jundot/omlx)
- [github.com · llama.cpp](https://github.com/ggml-org/llama.cpp)

本记录依据既有调研文档与会话结论整理；没有复制私人会话全文、账户凭据或客户项目素材。
