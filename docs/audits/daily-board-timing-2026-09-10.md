# 日榜更新时间与凌晨采集时点核查

核查日期：2026-09-10。下文北京时间与 Asia/Singapore 均为 UTC+8。本轮仅核查与纠正文档，没有修改调度、运行整条流水线、购买 API 或发送消息。

## 结论

每天 00:30 访问两个网站的当前日榜，不能保证得到前一天完整日榜。

- Trendshift 的日榜日期为 UTC。00:30 UTC+8 是前一天 16:30 UTC，那个 UTC 日还剩 7.5 小时。已实测同一源日期的早先首页快照与次日历史查询名单不同。
- GitHub Trending 没有查到当前官方的固定刷新时刻、日界时区或定稿时间承诺；不能将 daily 直接认定为“昨天自然日最终榜”，也不能把常见的“滚动 24 小时”说法当作已核实官方定义。
- 上一轮补入口、候选持久化及当天新增名单，解决的是采集入口和状态丢失，尚未解决“按目标源日期读取已结束日榜”的时间要求。

## 当前任务的真实时间与调用

只读查询生效的 Orca automation，得到 cron `30 0 * * *`，时区 `Asia/Singapore`，enabled 为 true。旧 Codex automation 已暂停，不能用它作为生效配置；本月正常运行日志也显示约 00:30 启动。机器时区与生效调度一致。

wrapper 使用 `run_fetch.py --today`，报告日期取运行当天。`run_fetch.py` 的 `--date` 参数影响本地标签和日志，未传到远端日榜查询。GitHub 请求 `trending?since=daily`；Trendshift 请求首页 `/`，均取请求时的当前视图。旧版本没有抓 Trendshift 日榜，因此不能声称已有本月每晚 00:30 的 Trendshift 日榜原始快照可逐日复核。

## Trendshift：已确认的事实

1. 官方 Signal 页面明确支持当前及过去某天的榜单，官方 OpenAPI 的 `/v1/trending/daily/{date}` 将 date 定义为 UTC 日期。最新端点返回不晚于 UTC 今天的最新可用榜单，因此还必须检查返回日期，不能只检查 HTTP 200。[Signal 说明](https://trendshift.io/signal)、[API 文档](https://api.trendshift.io/docs)、[OpenAPI 定义](https://api.trendshift.io/openapi.yaml)
2. 实际网页首页显示 `Today (UTC)`；通过公开日期选择器选择 2026-09-09 后，页面显示 `2026-09-09 (UTC)` 和 `Gained on Sep 9`，返回 25 个仓库。浏览器 URL 仍是 `/`。历史查询由页面动作触发，不能从 `?date=` 被忽略推导“没有历史榜”。[日榜页面](https://trendshift.io/)
3. 官方前端代码 `getUtcTodayAsLocalDate` 用 UTC 日期选择今天；当天查询设置 `refetchInterval: !!W && 3e5`，即页面每 5 分钟重新请求。这个值是客户端轮询间隔，不是后端每 5 分钟重新计算或结算的承诺。[UTC 日期工具](https://trendshift.io/_next/static/chunks/2sloifx2jwkzh.js)、[日榜组件](https://trendshift.io/_next/static/chunks/3et0uz6r_c741.js)
4. 没有查到后端日榜固定生成时刻、UTC 日结束后的最大延迟或历史榜不可变保证。条款也没有承诺数据的完整性和时效性。[条款](https://trendshift.io/tos)

### 可复查的反例

| 观测 | UTC 时间 | 北京时间 | 源榜日期 |
|---|---|---|---|
| 本会话先前保存的首页 HTML | 2026-09-09 23:22:50 | 2026-09-10 07:22:50 | initialData 的 date 全为 2026-09-09 |
| 本次通过网页选择历史日期 | 2026-09-10 11:33:13 | 2026-09-10 19:33:13 | 2026-09-09 |

两者都包含 25 个仓库，但历史查询中包含 `crestcoursechateau/Acrobat-Pro-Software`、不再包含早先快照中的 `kunchenguid/firstmate`。这一差异证明早先当前视图不能代表后来查询到的同日历史视图；它不确定具体哪一分钟发生变化，也不证明历史列表此后永不修订。

另外，2026-09-10 11:29:59 UTC 与 11:36:17 UTC 的两个当前首页快照，日期均为 9 月 10 日，名单、rank、score、涨星未变化。因此不能从 5 分钟前端轮询推导后端恰好每 5 分钟更新。

## GitHub Trending：已确认与未确认

当前官方页面有 Today / This week / This month 选项，但未列明统计起止、时区、生成时间或最终状态。官方文档仅描述按天发现热门仓库。[Trending](https://github.com/trending?since=daily)、[GitHub 文档](https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github)

官方历史文章曾在 2013 年说每天计算 8 次，并分别生成日、周、月时间桶；更早 2010 年文章说每 20 分钟更新。两条都属于历史描述，没有精确时区、固定时刻及当前服务承诺，不能据此安排 2026 年的“最终榜”抓取。[2013 年文章](https://github.blog/news-insights/company-news/explore-what-is-trending-on-github/)、[2010 年文章](https://github.blog/news-insights/explore-github/)

独立子任务还核对了 GitHub 社区回答及日期参数。官方社区未给出窗口和结算规则；添加 date/day/start_date/end_date 参数仍显示 Today，不构成已支持历史查询的证据。第三方归档者的滚动 24 小时解释只作为假设，不作为本次结论依据。[GitHub 社区讨论](https://github.com/orgs/community/discussions/3083)

以前那次 GitHub 核查的原始结论，在本轮对项目 ai-memory、wiki、自动化记忆和匹配项目历史的有限检索中没有找回可追溯证据。本轮据当前官方资料重新判断，没有沿用未找到的历史结论。

## 00:30 为什么不能代表“完整昨天”

以要取 2026-09-09 的 Trendshift UTC 日榜为例：

| 北京时间 | 对应 UTC | 含义 |
|---|---|---|
| 9 月 9 日 08:00 | 9 月 9 日 00:00 | 该 UTC 日开始 |
| 9 月 10 日 00:30 | 9 月 9 日 16:30 | 当前定时任务；该日尚余 7.5 小时 |
| 9 月 10 日 08:00 | 9 月 10 日 00:00 | 该 UTC 日结束；不等于后端即时完成结算 |
| 9 月 10 日 09:00 | 9 月 10 日 01:00 | 可作为观察性补采时点，但必须指定查询 9 月 9 日，且不能假定已绝对定稿 |

如果“昨天”特指北京时间 9 月 9 日 00:00—24:00，则与 Trendshift 的 UTC 9 月 9 日 00:00—24:00 不是同一时间窗；不能单纯把源 UTC 日榜改一个本地日期标签就宣称二者等价。

## 建议的后续调整（本轮未实施）

- 若目标是“尽量不漏出现过的新项目”，将采集与日报发布解耦，日内周期采集并保存并集，00:30 只作为日报发布或快照时点。增加频率降低漏掉短暂上榜项目的风险，仍不能证明任意短暂变化均被覆盖。
- Trendshift 在 UTC 日结束后按显式历史日期补采，例如先以北京时间 09:00 作为试运行时点，并在更晚时点复核同日期名单与信号；观测至少数日后再调整缓冲时间。需检查源日期和解析状态，不能只把当前首页采集改到早上。
- GitHub 的产物应标注为抓取时刻的 daily 快照；在官方没有固定结算规范前，不承诺自然日最终榜。按日合并自己的多次快照，公开说明是已观测上榜集合。
- 数据区分 fetched_at、source_date/source_timezone、report_date，避免采集日期、源日期、入库日期被混用。
- Trendshift 另有 GitHub 归档服务，但其 `trend_date` 是归档抓取器本地日期，并非 GitHub 官方日界；不能用它反向证明 GitHub 的 UTC 日榜定义。官方付费 API 文档的日期和分页能力已核实，本轮没有购买或调用受鉴权数据接口。

## 本次证据边界

已完成官方文档、前端公开资源、真实网页历史查询、两个时点样本对比及本地生效调度核对。未进行跨多个 UTC 日界的连续观测，也未得到站点维护者对结算延迟的确认。因此“Trendshift 按 UTC 日期、00:30 早于日结束”是确定结论；两个站点后端当前确切重算时刻与最终完成延迟仍未知。不能将建议的 09:00 写成已验证保证。
