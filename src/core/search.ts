import MiniSearch from "minisearch";
import { loadFeed, SearchRecord } from "./feeds.js";

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

  const miniSearch = new MiniSearch<SearchRecord>({
    fields: ["handle", "title", "summary", "url", "source", "type"],
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
      boost: { handle: 6, title: 4, url: 3, summary: 2 },
      prefix: true,
      combineWith: "OR",
    },
  });
  miniSearch.addAll(records);

  const matchedTerms = tokenize(options.query);
  const hits = miniSearch.search(options.query).slice(0, limit);
  const results = [];
  for (let i = 0; i < hits.length; i += 1) {
    const hit = hits[i] as unknown as SearchRecord & { score: number };
    const projection = {
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
    let record: unknown = projection;
    if (!options.brief) {
      record = (await findDetailRecord(projection)) ?? projection;
    }
    const baseResult = {
      index: i + 1,
      handle: hit.handle,
      type: hit.type,
      score: hit.score,
      matched_terms: matchedTerms,
      rank_reason: ["lexical_match"],
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
