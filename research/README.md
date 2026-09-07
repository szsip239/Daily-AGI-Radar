# AI课题调研

按课题沉淀应用原理、开源对比、采用判断和验证边界。每篇独立 Markdown 都保留原调研日期；历史记录不代表今天重新核验的产品能力或采购建议。

当前收录 **31 个课题**。同课题多轮调研合并，技术路线不同的课题独立保留。

| 原调研日期 | 课题 | 分类 | 核心结论 |
| --- | --- | --- | --- |
| 2026-09-07 | [Kimi 数据画板与可视题解：原理及复刻路径](records/kimi-apps-webmcp.md) | 生成式应用 | 两者均以网页工具连接智能体；数据画板采用受约束图表参数，可视题解运行模型生成的 HTML/JavaScript。 |
| 2026-09-07 | [Orca Floating Workspace：跨项目协调与偏好记忆](records/orca-floating-coordinator.md) | Agent 开发工具 | 浮动工作区可承载协调 Agent；调度判断由 Agent 完成，进度和偏好须分别核验来源。 |
| 2026-09-05 | [Mac 本地模型长上下文：GGUF、MLX、MTPLX 与性能口径](records/local-llm-long-context-mac.md) | AI 基础设施 | 先固定模型结构、格式与真实上下文，再讨论容量和速度；短提示词峰值不能用于承诺长文首字时间。 |
| 2026-09-05 | [Show Me 与 Archify：临时解释和正式图表的分工](records/show-me-archify-comparison.md) | 设计与可视化 | Show Me 适合当前讨论的最小视图，Archify 适合需保存、分享和评审的系统图。 |
| 2026-09-04 | [EvoX、Evolver、EvoMap：开源层次与接入判断](records/evox-ecosystem-openness.md) | Agent 运行时 | 必须分开核对桌面 harness、经验引擎、协议组件和经验网络，不能把相邻项目开源归给 EvoX。 |
| 2026-09-03 | [Archify：五类系统图、验证与工作流定位](records/archify-workflow.md) | 设计与可视化 | 它承担正式系统图表达与交付校验；按架构变化和评审需求触发，不替代任务事实源。 |
| 2026-09-02 | [个人 AI 记忆层：跨 Harness 捕获、知识与偏好蒸馏](records/personal-agent-memory.md) | 记忆与知识管理 | 按会话捕获、可编辑知识与偏好提炼分层；原三轮评审均优先核验 ai-memory 的跨端能力。 |
| 2026-09-01 | [Graphify 与 Archify：源码导航和架构事实的边界](records/graphify-archify-evidence-quality.md) | 代码与知识图谱 | 对照复盘发现版本错位、查询截断与抽象层级不匹配；图谱应辅助定位，主路径必须核回源码。 |
| 2026-08-29 | [Typeless 与讯飞语音键盘：音频设备及 SDK 边界](records/typeless-iflytek-keyboard.md) | 语音与输入 | 原机蓝牙模式下键盘未暴露标准音频输入，讯飞助手走专用通道；这不等于 Typeless 麦克风权限故障。 |
| 2026-08-28 | [ego lite 与 Chrome：同步能力及失败调查](records/ego-chrome-bookmark-sync.md) | 开发环境支撑 | 当时官方能力是周期性源浏览器到 ego 同步；启用开关并不等于同步成功。 |
| 2026-08-27 | [Codex 会话归档：索引、发现、恢复与冷备份](records/codex-session-archive.md) | Agent 开发工具 | 官方归档是保留 transcript 并改变活动状态；远端冷备份应建立在可验证的官方归档与恢复流程上。 |
| 2026-08-22 | [工业立库 3D 演示：开源底座、建模证据与流程动画](records/industrial-3d-demonstration.md) | 行业 AI 应用 | 需要把场景渲染、设备资产和真实业务流程分开建模；通用仓库 demo 不能证明方案准确。 |
| 2026-08-15 | [Evolver Codex 插件：社区采用与工程成熟度](records/evolver-codex-plugin.md) | Agent 开发工具 | 原插件社区样本很小；底层 Evolver 的热度不能替代插件自身的稳定性证据。 |
| 2026-08-14 | [EvoX 与 Codex：账号接入不等于 Harness 委派](records/evox-codex-compatibility.md) | Agent 运行时 | 当时证据支持账号和模型接入；实际执行仍由 EvoX harness 管理，完整 Codex 委派尚未验证。 |
| 2026-08-14 | [FreeCAD 与 DWG：工业建模前的转换可行性](records/freecad-dwg-workflow.md) | 开发环境支撑 | 先验证 DWG 转换质量，再决定工具链；安装成功不能作为图纸已完整解析的证据。 |
| 2026-08-14 | [Orca Skills 管理：发现、更新与界面迁移](records/orca-skills-management.md) | Agent 开发工具 | 历史证据指向后台发现与场景化更新入口，不能等同于通用技能商店或完整 CRUD。 |
| 2026-08-13 | [Prime Agent × Orca：一等集成与上下文能力边界](records/prime-agent-orca-integration.md) | Agent 开发工具 | 集成方式是让 Prime 成为一种可启动和恢复的 worker；不是替换其他 agent 的内部上下文引擎。 |
| 2026-08-13 | [Prime Agent：RLM、持久状态与自我改进](records/prime-agent-runtime.md) | Agent 运行时 | Prime 是具体执行 harness，Orca 是外层开发工作台；是否采用取决于持久计算与 RLM 是否改善真实任务。 |
| 2026-08-12 | [开源标书生成器：正文生成与专业图表组合路线](records/open-source-bid-generators.md) | 行业 AI 应用 | 正文生成器与施工计划引擎属于不同层；原调研建议组合验证，不宣称存在完整开箱即用单体。 |
| 2026-08-12 | [OpenBidKit 与易标书：图示生成和施工计划能力](records/openbidkit-construction-planning.md) | 行业 AI 应用 | 生成一张计划图不等于具备任务依赖、日历、关键路径和时差计算能力。 |
| 2026-08-11 | [Herdr 与 Orca：终端原生工作流和自动化差异](records/herdr-vs-orca.md) | Agent 开发工具 | 高置信差异在终端原生控制、可解释的状态检测与自动化接口；多 Agent 本身不是独有优势。 |
| 2026-08-09 | [前端设计 Skill 与 Prompt：收藏、效果预览和 Agent 驱动](records/frontend-design-skill-discovery.md) | 设计与可视化 | Design Skills Hub、TypeUI 与 21st.dev 接近不同环节，尚不能把目录或截图集合视为完整闭环。 |
| 2026-08-09 | [Orca Agent 统计：历史会话导入的计量边界](records/orca-agent-statistics.md) | Agent 开发工具 | 可统计历史唯一会话，但无法从 transcript 精确还原进程启动次数和存活时长。 |
| 2026-08-03 | [AiToEarn：账号授权、凭据流转与发布链路](records/aitoearn-auth-publishing.md) | 内容与媒体工具 | 三种入口最终由后端执行发布；AiToEarn API Key、登录会话与社交平台凭据必须分开理解。 |
| 2026-08-02 | [多平台内容运营与发布工具：国内外能力对比](records/multiplatform-content-publishing.md) | 内容与媒体工具 | 中国平台无人值守发布与跨平台运营是不同目标；AiToEarn 值得验证，海外平台方案不能直接替代国内链路。 |
| 2026-07-29 | [企业 LLM 统一出口：聚合、员工密钥与运行时 DLP](records/enterprise-llm-gateway-dlp.md) | AI 基础设施 | 原调研没有找到完整单体；网关控制面、策略执行与 DLP 需要分层，OAuth 上游须单独验证。 |
| 2026-07-29 | [Kimi 组件模板与独立运行：Skill、宿主及复刻边界](records/kimi-widget-runtime-decoupling.md) | 生成式应用 | 纯 HTML 组件已做独立 runner PoC；完整动态组件仍依赖宿主工具、数据、权限和状态协议。 |
| 2026-07-29 | [Mac Time Machine 与 NAS NVMe：备份能力核验](records/time-machine-nas-backup.md) | 开发环境支撑 | 可采用支持 Time Machine 的 SMB 共享；先确认 NVMe 是独立存储池，再配置配额、加密和恢复演练。 |
| 2026-07-28 | [Kimi Work 看板：开源替代与组件编排](records/kimi-work-dashboard-alternatives.md) | 生成式应用 | 没有核验到完整替代品；Glance、Scarf 和 Tambo 分别接近编排、桌面成品与生成式 UI runtime。 |
| 2026-07-26 | [Graphify：代码图谱价值、开销与多项目组织](records/graphify-codebase-evaluation.md) | 代码与知识图谱 | 先在代表性项目试点；项目子图承担源码定位，全局层只做导航，关键结论回到源码核验。 |
| 2026-07-26 | [lean-ctx：上下文压缩收益与信息损失风险](records/lean-ctx-evaluation.md) | Agent 开发工具 | 历史判断为隔离试点；不能把压缩比例等同于任务质量或总成本改善。 |

## 阅读与维护

- CLI：`agi-radar search "Kimi" --type research --json`；`agi-radar get research:kimi-apps-webmcp --json`；`agi-radar get research:latest --json`。
- 普通搜索也会检索本模块；`sync --all` 同步独立调研数据。完整读取结果包含 `body_markdown`。
- [维护说明](AUTHORING.md)介绍元数据、证据分级、更新与构建方法；[收录范围](COVERAGE.md)说明本轮整理边界。
- 本模块独立于每日榜单管线，不会因 `data/` 更新而重写；原始私人会话不进入公开仓库。
