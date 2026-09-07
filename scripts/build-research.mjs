import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const moduleRoot = path.join(root, "research");
const recordsRoot = path.join(moduleRoot, "records");
const check = process.argv.includes("--check");
const base = "https://github.com/szsip239/Daily-AGI-Radar/blob/main/research/records/";
const records = [];
const seen = new Set();
const privatePatterns = [
  /\/(?:Users|home)\/[\w.-]+\//,
  /\b(?:cn_|ai_|sk-|ghp_|github_pat_|aim_)[A-Za-z0-9_-]{16,}/,
  /\b(?:Bearer\s+[A-Za-z0-9._-]{20,}|-----BEGIN .*PRIVATE KEY-----)/,
  /https?:\/\/(?:localhost|127\.0\.0\.1|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|[^/\s]+\.ts\.net)(?=[:/\s]|$)/,
];

for (const file of fs.readdirSync(recordsRoot).filter((name) => name.endsWith(".md")).sort()) {
  const markdown = fs.readFileSync(path.join(recordsRoot, file), "utf8");
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) throw new Error(`${file}: missing JSON frontmatter`);
  const meta = JSON.parse(match[1]);
  for (const key of ["id", "title", "summary", "research_date", "category", "status"]) {
    if (typeof meta[key] !== "string" || !meta[key].trim()) throw new Error(`${file}: missing ${key}`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta.id) || file !== `${meta.id}.md`) {
    throw new Error(`${file}: invalid or mismatched id`);
  }
  if (seen.has(meta.id)) throw new Error(`${file}: duplicate id`);
  seen.add(meta.id);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.research_date)
    || new Date(meta.research_date).toISOString().slice(0, 10) !== meta.research_date) {
    throw new Error(`${file}: invalid research date`);
  }
  if (!Array.isArray(meta.tags) || !meta.tags.length || meta.tags.some((tag) => typeof tag !== "string")) {
    throw new Error(`${file}: invalid tags`);
  }
  if (!Array.isArray(meta.sources) || !meta.sources.length || meta.sources.some((url) => {
    try { const u = new URL(url); return u.protocol !== "https:" || !!u.username || !!u.password; }
    catch { return true; }
  })) throw new Error(`${file}: public HTTPS sources required`);
  if (privatePatterns.some((pattern) => pattern.test(markdown))) throw new Error(`${file}: private material detected`);
  for (const section of ["调研问题", "结论", "证据与边界", "后续验证", "来源"]) {
    if (!markdown.includes(`## ${section}`)) throw new Error(`${file}: missing section ${section}`);
  }
  records.push({
    handle: `research:${meta.id}`, type: "research", title: meta.title,
    url: `${base}${file}`, summary: meta.summary, source: "AI课题调研",
    signal_date: meta.research_date, category: meta.category,
    status: meta.status, search_keywords: meta.tags, detail_feed: "research", detail_key: meta.id,
    sources: meta.sources, markdown_path: `research/records/${file}`,
    body_markdown: markdown.slice(match[0].length).trim(),
  });
}
if (!records.length) throw new Error("No research records found");
records.sort((a, b) => b.signal_date.localeCompare(a.signal_date) || a.handle.localeCompare(b.handle));
const jsonl = `${records.map((record) => JSON.stringify(record)).join("\n")}\n`;
const manifest = {
  schema_version: 1, module: "AI课题调研",
  feeds: { research: { url: "index.jsonl", gz_url: "index.jsonl.gz" } },
  counts: { research: records.length }, latest: { research: records[0].handle },
  policy: "Historical research snapshots, curated from prior research; dates are not publication or re-verification dates.",
};
const index = [
  "# AI课题调研", "",
  "按课题沉淀应用原理、开源对比、采用判断和验证边界。每篇独立 Markdown 都保留原调研日期；历史记录不代表今天重新核验的产品能力或采购建议。", "",
  `当前收录 **${records.length} 个课题**。同课题多轮调研合并，技术路线不同的课题独立保留。`, "",
  "| 原调研日期 | 课题 | 分类 | 核心结论 |", "| --- | --- | --- | --- |",
  ...records.map((r) => `| ${r.signal_date} | [${r.title}](records/${r.detail_key}.md) | ${r.category} | ${r.summary.replace(/\|/g, "／")} |`),
  "", "## 阅读与维护", "",
  "- CLI：`agi-radar search \"Kimi\" --type research --json`；`agi-radar get research:kimi-apps-webmcp --json`；`agi-radar get research:latest --json`。",
  "- 普通搜索也会检索本模块；`sync --all` 同步独立调研数据。完整读取结果包含 `body_markdown`。",
  "- [维护说明](AUTHORING.md)介绍元数据、证据分级、更新与构建方法；[收录范围](COVERAGE.md)说明本轮整理边界。",
  "- 本模块独立于每日榜单管线，不会因 `data/` 更新而重写；原始私人会话不进入公开仓库。", "",
].join("\n");
const outputs = new Map([
  ["index.jsonl", Buffer.from(jsonl)], ["index.jsonl.gz", gzipSync(jsonl)],
  ["manifest.json", Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`)], ["README.md", Buffer.from(index)],
]);
for (const [file, data] of outputs) {
  const dest = path.join(moduleRoot, file);
  if (check) {
    if (!fs.existsSync(dest) || !fs.readFileSync(dest).equals(data)) throw new Error(`${file}: stale; run npm run research:build`);
  } else fs.writeFileSync(dest, data);
}
console.log(`${check ? "Verified" : "Built"} ${records.length} research records`);
