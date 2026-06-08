import MiniSearch from "minisearch";
import { loadFeed, SearchRecord } from "./feeds.js";

type IndexedSearchRecord = SearchRecord & {
  search_text: string;
};

type SearchField = {
  name: string;
  text: string;
  weight: number;
  reason: string;
};

type RankedCandidate = {
  record: SearchRecord;
  score: number;
  miniScore: number;
  matchedTerms: Set<string>;
  reasons: Set<string>;
};

const RRF_K = 60;
const FUSION_CANDIDATE_LIMIT = 250;
const SUPPLEMENTAL_SEARCH_FIELDS = [
  "category",
  "categories",
  "tags",
  "keywords",
  "search_keywords",
  "search_aliases",
  "topics",
  "rank_signals",
  "authors",
  "author",
  "publisher",
];

export function tokenize(text: string): string[] {
  const tokens: string[] = [];
  const parts = text.toLowerCase().match(/\p{Script=Han}+|[a-z0-9][a-z0-9_.\/-]*/giu) ?? [];
  for (const part of parts) {
    tokens.push(part);
    if (/^\p{Script=Han}+$/u.test(part)) {
      for (const char of [...part]) tokens.push(char);
      for (let i = 0; i < [...part].length - 1; i += 1) {
        tokens.push([...part].slice(i, i + 2).join(""));
      }
    } else {
      for (const sub of part.split(/[_.\/-]+/).filter(Boolean)) {
        tokens.push(sub);
      }
    }
  }
  return [...new Set(tokens.filter(Boolean))];
}

function queryParts(text: string): string[] {
  return text.toLowerCase().match(/\p{Script=Han}+|[a-z0-9][a-z0-9_.\/-]*/giu) ?? [];
}

function valueToText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.map(valueToText).filter(Boolean).join(" ");
  }
  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>).map(valueToText).filter(Boolean).join(" ");
  }
  return "";
}

function supplementalSearchText(record: SearchRecord): string {
  return SUPPLEMENTAL_SEARCH_FIELDS.map((field) => valueToText(record[field])).filter(Boolean).join(" ");
}

function toIndexedRecord(record: SearchRecord): IndexedSearchRecord {
  return {
    ...record,
    search_text: supplementalSearchText(record),
  };
}

function searchableFields(record: SearchRecord): SearchField[] {
  return [
    { name: "handle", text: valueToText(record.handle), weight: 3.5, reason: "handle_match" },
    { name: "title", text: valueToText(record.title), weight: 4, reason: "title_overlap" },
    { name: "summary", text: valueToText(record.summary), weight: 2, reason: "summary_overlap" },
    { name: "source", text: valueToText(record.source), weight: 1.2, reason: "metadata_overlap" },
    { name: "type", text: valueToText(record.type), weight: 1, reason: "metadata_overlap" },
    { name: "url", text: valueToText(record.url), weight: 1.5, reason: "url_match" },
    { name: "search_keywords", text: valueToText(record.search_keywords), weight: 2.4, reason: "keyword_overlap" },
    { name: "search_aliases", text: valueToText(record.search_aliases), weight: 2.8, reason: "alias_overlap" },
    { name: "search_text", text: supplementalSearchText(record), weight: 1.5, reason: "metadata_overlap" },
  ].filter((field) => field.text.trim().length > 0);
}

function tokenWeight(token: string, idf = 1): number {
  let base = 1;
  if (/^\p{Script=Han}+$/u.test(token)) {
    if ([...token].length >= 3) base = 2.2;
    else if ([...token].length === 2) base = 1.8;
    else base = 0.25;
    return base * idf;
  }
  if (token === "ai") base = 1.2;
  else if (token.length <= 2) base = 0.25;
  else if (token.length >= 8) base = 1.4;
  return base * idf;
}

function scorableTokens(query: string): string[] {
  return tokenize(query).filter((token) => tokenWeight(token) > 0);
}

function normalizedText(text: string): string {
  return text.toLowerCase().replace(/[^\p{Script=Han}a-z0-9]+/giu, "");
}

function buildTokenIdf(records: SearchRecord[], queryTokens: string[]): Map<string, number> {
  const documentFrequency = new Map<string, number>();
  for (const record of records) {
    const recordTokens = new Set(searchableFields(record).flatMap((field) => tokenize(field.text)));
    for (const token of queryTokens) {
      if (recordTokens.has(token)) {
        documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1);
      }
    }
  }

  return new Map(
    queryTokens.map((token) => {
      const frequency = documentFrequency.get(token) ?? 0;
      const idf = Math.log(1 + records.length / (1 + frequency));
      return [token, Math.max(0.75, Math.min(idf, 4))];
    }),
  );
}

function queryTokenGroups(query: string): string[][] {
  return queryParts(query)
    .map((part) => tokenize(part))
    .filter((group) => group.length > 0);
}

function overlapScore(
  record: SearchRecord,
  query: string,
  queryTokens: string[],
  tokenIdf: Map<string, number>,
  tokenGroups: string[][],
): { score: number; matchedTerms: Set<string>; reasons: Set<string> } {
  const fields = searchableFields(record).map((field) => ({
    ...field,
    normalized: normalizedText(field.text),
    tokens: new Set(tokenize(field.text)),
  }));
  const matchedTerms = new Set<string>();
  const reasons = new Set<string>();
  let score = 0;

  for (const token of queryTokens) {
    const weight = tokenWeight(token, tokenIdf.get(token) ?? 1);
    for (const field of fields) {
      const exactTokenMatch = field.tokens.has(token);
      const substringMatch = token.length > 1 && field.normalized.includes(normalizedText(token));
      if (!exactTokenMatch && !substringMatch) continue;
      matchedTerms.add(token);
      reasons.add(field.reason);
      score += field.weight * weight * (exactTokenMatch ? 1 : 0.55);
    }
  }

  const matchedGroups = tokenGroups.filter((group) => group.some((token) => matchedTerms.has(token)));
  if (matchedGroups.length > 1) {
    score += matchedGroups.length * 2;
    reasons.add("query_coverage");
  }

  const titleField = fields.find((field) => field.name === "title");
  if (titleField && tokenGroups.length > 1) {
    const titleGroupMatches = tokenGroups.filter((group) =>
      group.some((token) => titleField.tokens.has(token) || titleField.normalized.includes(normalizedText(token))),
    ).length;
    if (titleGroupMatches > 1) {
      score += titleGroupMatches * 1.5;
      reasons.add("title_coverage");
    }
  }

  const queryPhrase = normalizedText(query);
  if (queryPhrase.length >= 4) {
    for (const field of fields) {
      if (!field.normalized.includes(queryPhrase)) continue;
      score += field.weight * 2;
      reasons.add(field.name === "title" ? "phrase_match" : field.reason);
    }
  }

  return { score, matchedTerms, reasons };
}

function reciprocalRank(rank: number): number {
  return 1 / (RRF_K + rank);
}

function parseSignalTime(value: unknown): number | null {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}/.test(value)) return null;
  const time = Date.parse(`${value.slice(0, 10)}T00:00:00Z`);
  return Number.isFinite(time) ? time : null;
}

function numericRankSignal(record: SearchRecord, key: string): number | null {
  const rankSignals = record.rank_signals;
  if (!rankSignals || typeof rankSignals !== "object" || Array.isArray(rankSignals)) return null;
  const value = (rankSignals as Record<string, unknown>)[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function recordSignalBoost(record: SearchRecord, latestSignalTime: number | null): { score: number; reasons: string[] } {
  const reasons: string[] = [];
  let score = 0;

  const signalTime = parseSignalTime(record.signal_date);
  if (latestSignalTime && signalTime) {
    const daysOld = Math.max(0, (latestSignalTime - signalTime) / 86_400_000);
    const recency = Math.exp(-daysOld / 45) * 0.006;
    score += recency;
    if (recency > 0.003) reasons.push("fresh_signal");
  }

  const recommendation = numericRankSignal(record, "recommendation");
  if (record.type === "article" && recommendation) {
    score += Math.min(Math.max(recommendation, 1), 5) * 0.0012;
    reasons.push("quality_signal");
  }

  return { score, reasons };
}

function groupCoverageRatio(matchedTerms: Set<string>, tokenGroups: string[][]): number {
  if (tokenGroups.length === 0) return 1;
  const matchedGroups = tokenGroups.filter((group) => group.some((token) => matchedTerms.has(token))).length;
  return matchedGroups / tokenGroups.length;
}

function projectionFromHit(hit: SearchRecord): SearchRecord {
  return {
    handle: hit.handle,
    type: hit.type,
    title: hit.title,
    url: hit.url,
    summary: hit.summary,
    source: hit.source,
    signal_date: hit.signal_date,
    detail_feed: hit.detail_feed,
    detail_key: hit.detail_key,
  };
}

function rankedCandidates(records: SearchRecord[], miniHits: Array<SearchRecord & { score: number }>, query: string) {
  const queryTokens = scorableTokens(query);
  const tokenIdf = buildTokenIdf(records, queryTokens);
  const tokenGroups = queryTokenGroups(query);
  const recordsByHandle = new Map(records.map((record) => [record.handle, record]));
  const latestSignalTime = records.reduce<number | null>((latest, record) => {
    const time = parseSignalTime(record.signal_date);
    if (!time) return latest;
    return latest === null ? time : Math.max(latest, time);
  }, null);
  const byHandle = new Map<string, RankedCandidate>();

  function ensure(record: SearchRecord): RankedCandidate {
    const fullRecord = recordsByHandle.get(record.handle) ?? record;
    const existing = byHandle.get(record.handle);
    if (existing) {
      existing.record = fullRecord;
      return existing;
    }
    const candidate = {
      record: fullRecord,
      score: 0,
      miniScore: 0,
      matchedTerms: new Set<string>(),
      reasons: new Set<string>(),
    };
    byHandle.set(record.handle, candidate);
    return candidate;
  }

  miniHits.slice(0, FUSION_CANDIDATE_LIMIT).forEach((hit, index) => {
    const candidate = ensure(projectionFromHit(hit));
    candidate.score += reciprocalRank(index + 1);
    candidate.miniScore = Math.max(candidate.miniScore, hit.score);
    candidate.reasons.add("lexical_match");
  });

  const overlapRanked = records
    .map((record) => {
      const overlap = overlapScore(record, query, queryTokens, tokenIdf, tokenGroups);
      return { record, ...overlap };
    })
    .filter((candidate) => candidate.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      return left.record.handle.localeCompare(right.record.handle);
    })
    .slice(0, FUSION_CANDIDATE_LIMIT);

  overlapRanked.forEach((overlap, index) => {
    const candidate = ensure(overlap.record);
    candidate.score += reciprocalRank(index + 1) * 1.15;
    candidate.score += (overlap.score / (overlap.score + 80)) * 0.02;
    for (const term of overlap.matchedTerms) candidate.matchedTerms.add(term);
    for (const reason of overlap.reasons) candidate.reasons.add(reason);
  });

  for (const candidate of byHandle.values()) {
    const boost = recordSignalBoost(candidate.record, latestSignalTime);
    candidate.score += boost.score;
    for (const reason of boost.reasons) candidate.reasons.add(reason);

    if (tokenGroups.length > 1) {
      const coverage = groupCoverageRatio(candidate.matchedTerms, tokenGroups);
      candidate.score *= 0.65 + coverage * 0.35;
      if (coverage >= 0.67) candidate.reasons.add("query_coverage");
    }
  }

  return [...byHandle.values()].sort((left, right) => {
    if (right.score !== left.score) return right.score - left.score;
    if (right.miniScore !== left.miniScore) return right.miniScore - left.miniScore;
    if ((right.record.signal_date ?? "") !== (left.record.signal_date ?? "")) {
      return (right.record.signal_date ?? "").localeCompare(left.record.signal_date ?? "");
    }
    return left.record.handle.localeCompare(right.record.handle);
  });
}

export async function searchRecords(options: {
  query: string;
  type?: string;
  from?: string;
  to?: string;
  limit?: number;
  brief?: boolean;
  noCache?: boolean;
}): Promise<{ query: string; limit: number; brief: boolean; results: unknown[] }> {
  const limit = Math.min(Math.max(options.limit ?? 10, 1), 50);
  const records = (await loadFeed<SearchRecord>("search", { noCache: options.noCache })).filter((record) => {
    if (options.type && record.type !== options.type) return false;
    if (options.from && record.signal_date && record.signal_date < options.from) return false;
    if (options.to && record.signal_date && record.signal_date > options.to) return false;
    return true;
  });
  const indexedRecords = records.map(toIndexedRecord);

  const miniSearch = new MiniSearch<IndexedSearchRecord>({
    fields: ["handle", "title", "summary", "url", "source", "type", "search_text"],
    storeFields: [
      "handle",
      "type",
      "title",
      "url",
      "summary",
      "source",
      "signal_date",
      "detail_feed",
      "detail_key",
    ],
    idField: "handle",
    tokenize,
    searchOptions: {
      boost: { handle: 6, title: 4, url: 3, summary: 2, search_text: 1.2 },
      prefix: true,
      combineWith: "OR",
    },
  });
  miniSearch.addAll(indexedRecords);

  const hits = miniSearch.search(options.query) as unknown as Array<SearchRecord & { score: number }>;
  const candidates = rankedCandidates(records, hits, options.query).slice(0, limit);
  const results = [];
  for (let i = 0; i < candidates.length; i += 1) {
    const candidate = candidates[i];
    const projection = projectionFromHit(candidate.record);
    let record: unknown = projection;
    if (!options.brief) {
      record = (await findDetailRecord(projection)) ?? projection;
    }
    const baseResult = {
      index: i + 1,
      handle: candidate.record.handle,
      type: candidate.record.type,
      score: Number(candidate.score.toFixed(6)),
      matched_terms: [...candidate.matchedTerms],
      rank_reason: [...candidate.reasons],
    };
    results.push(options.brief ? { ...baseResult, ...projection } : { ...baseResult, record });
  }

  return { query: options.query, limit, brief: Boolean(options.brief), results };
}

async function findDetailRecord(projection: {
  handle?: string;
  detail_feed?: string;
  detail_key?: string;
}): Promise<unknown | null> {
  if (!projection.detail_feed) return null;
  const records = await loadFeed<Record<string, unknown>>(projection.detail_feed);
  return (
    records.find((record) => record.handle === projection.handle) ??
    records.find((record) => record.detail_key === projection.detail_key) ??
    null
  );
}
