# 2026-09-13 GitHub 项目风险核查

核查对象是当天被增强模型标记为高风险或可疑的 11 个新增项目。仅检查 GitHub 仓库元数据、README、文件树、提交记录和此前采集档案；未访问远程安装载荷，也未执行仓库代码。

## 结论

7 个项目有证据支持“安装行为高风险”，但没有证明远程载荷已实施恶意行为。4 个项目当前返回 404，只能认定信息不足，原先关于无代码、刷星、盗号或恶意软件的推断已撤回。所有项目原始记录保留；这些项目暂不进入常规公开清单和推荐。

| 仓库 | 结论 | 证据与边界 |
|---|---|---|
| [ghoulformpray/Monero-Miner](https://github.com/ghoulformpray/Monero-Miner/blob/093d279e08b9383269c4caa74020c5226a534eee/README.md) | 安装行为高风险 | 当前文件树只有 README；安装说明要求执行远程 PowerShell 内容、绕过执行策略、关闭 Defender 实时保护。 |
| [Embertuready/Total-Commander](https://github.com/Embertuready/Total-Commander/blob/625568c54c043436251357b8bdf501036c70a7c7/README.md) | 安装行为高风险 | 当前文件树只有 README；安装说明要求执行远程 PowerShell 内容、绕过执行策略、关闭 Defender 实时保护。 |
| [watermitecreate/Optimizer-For-Windows](https://github.com/watermitecreate/Optimizer-For-Windows) | 信息不足 | 仓库、README、提交接口均为 404；无法区分删除、私有化或访问限制，不能证明恶意。 |
| [VelocityNodeCompute/Universal-Trading-Bot](https://github.com/VelocityNodeCompute/Universal-Trading-Bot) | 信息不足 | 仓库、README、提交接口均为 404；无法区分删除、私有化或访问限制，不能证明恶意。 |
| [postlayerrespect26/FPS-Booster-for-Wiindows](https://github.com/postlayerrespect26/FPS-Booster-for-Wiindows/blob/bb352896a2ea13de031e0495465895ebba8d24fb/README.md) | 安装行为高风险 | 当前文件树只有 README；安装说明要求执行远程 PowerShell 内容、绕过执行策略、关闭 Defender 实时保护。 |
| [bluecockatooshrink/AutoCad-setup](https://github.com/bluecockatooshrink/AutoCad-setup) | 安装行为高风险 | 当前已返回 404；采集时保存的 README 含同类危险安装指引，当前状态不可复核。 |
| [pitelephantdawn/KMS-Pico-for-Win](https://github.com/pitelephantdawn/KMS-Pico-for-Win) | 信息不足 | 仓库、README、提交接口均为 404；无法区分删除、私有化或访问限制，不能证明恶意。 |
| [Tankmacspout/Discord-Quest-Completer](https://github.com/Tankmacspout/Discord-Quest-Completer/blob/3674a75ed93db83fd761b2b80f28801a81edd0af/README.md) | 安装行为高风险 | 当前文件树只有 README；安装说明要求执行远程 PowerShell 内容、绕过执行策略、关闭 Defender 实时保护。 |
| [ScalarLinkAxe/Optimizer-Toolkit](https://github.com/ScalarLinkAxe/Optimizer-Toolkit/blob/1658744427b2f6555acbe200e9597ad5b3f286f0/README.md) | 安装行为高风险 | 当前文件树只有 README；安装说明要求执行远程 PowerShell 内容、绕过执行策略、关闭 Defender 实时保护。 |
| [TealElderPlait/Cinema-4D](https://github.com/TealElderPlait/Cinema-4D) | 信息不足 | 仓库、README、提交接口均为 404；无法区分删除、私有化或访问限制，不能证明恶意。 |
| [covetradesmanrivet/Acrobat-Reader-Pro](https://github.com/covetradesmanrivet/Acrobat-Reader-Pro/blob/5762b5fa9523e519a20dd4a4166d1bb0de3d726d/README.md) | 安装行为高风险 | 当前文件树只有 README；安装说明要求执行远程 PowerShell 内容、绕过执行策略、关闭 Defender 实时保护。 |

这些危险安装指引指向同一个外部加载地址，且模板高度相似。这是安装风险的佐证，不证明共同操作者、刷星行为、盗号或具体载荷能力。单独出现远程安装命令、仓库名称或 README 缺失，都不作为确认恶意的依据。

## 附加旧记录

`crestcoursechateau/Acrobat-Pro-Software` 是此前已入库的旧记录，本次仓库与 README 接口也返回 404，因此另行列为信息不足。它不属于上述 11 个新增项目。合计隔离 12 条，其中高风险安装行为 7 条、信息不足 5 条。

## 同步修复

- Skills 新增身份改为 slug 匹配，并保存每日新增快照；当天 16 个新增已补回日报。
- 文章正文 HTTP 400 已复现为飞书业务码 99991400（限流）；增加跨线程节流及按业务码重试，原先失败的 10 篇和全部 20 个目标摘要均已读取成功。
- 播客解析器已适配当前 GitHub 章节标题，补齐 GitHub 内容、源日期、隔离说明和 Skills 新增。
- 日报、既有飞书卡片、播客及公开数据已更正；没有另发通知，也没有删除 Base 原始记录。

隔离是展示与准入措施，不等于对载荷作恶意软件鉴定；后续取得新证据后可以重新审核。
