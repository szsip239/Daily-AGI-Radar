# Daily AGI Radar

Daily AGI Radar is a public AI signal library for agents and humans. It exists to publish curated daily AI/AGI projects, articles, news, skills, briefings, and audio produced by the internal collection workflow. Published feeds are read-only; external recommendations enter through a separate submission workflow.

## Language

**Daily AGI Radar**:
The public product that exposes curated daily AI/AGI signals for read-only discovery.
_Avoid_: whatsnew, AI news bot

**Signal**:
A single curated item worth discovering, such as a project, article, news item, skill, briefing, or audio episode.
_Avoid_: record, row, entry

**Signal ID**:
A stable public identifier for a signal, formed from its type and business key.
_Avoid_: Feishu record ID, table row ID

**Publisher**:
The internal operator or workflow that curates and releases signals.
_Avoid_: user, contributor

**Reader**:
An external person or agent that searches, fetches, or downloads published signals without writing back.
_Avoid_: contributor, member, customer

**Submitter**:
An external person or agent that recommends a candidate GitHub project or SkillHub skill for review.
_Avoid_: publisher, editor

**Submission**:
A candidate recommendation created by `agi-radar submit` before human approval and feed publication.
_Avoid_: signal, accepted item

**Submission URL**:
The only user-supplied content required for a public submission.
_Avoid_: reason, manual tags, user score

**Submission Issue**:
A GitHub issue created from the public submission form and used as the review record for one submission.
_Avoid_: feed row, direct database write

**Submission Payload**:
The machine-readable JSON block embedded in a submission issue body.
_Avoid_: prose reason, free-form issue body

**Submission Auth Mode**:
The `agi-radar submit` behavior selected by whether the reader has configured a GitHub token.
_Avoid_: approval mode, reviewer identity

**Raw Feed**:
The GitHub raw file endpoint used as the primary machine-readable source for published signals.
_Avoid_: API, backend

**Pages Site**:
The GitHub Pages site used as the human-readable browsing surface and fallback mirror.
_Avoid_: primary API, source of truth

**Search Index**:
The unified public feed that projects every signal type into common searchable fields.
_Avoid_: full table dump, database

**Detail Feed**:
A type-specific public feed that exposes fuller metadata for signals of one type.
_Avoid_: search index, raw table dump

**AGI Radar CLI**:
The command-line interface named `agi-radar` that readers and agents use to query published signals.
_Avoid_: whatsnew CLI, daily-agi-radar command

**Local Submission Check**:
The lightweight validation performed by `agi-radar submit` before creating a submission issue.
_Avoid_: ranking, enrichment, final review

**Submission Duplicate**:
A candidate URL that already matches a published signal in the cached public feeds.
_Avoid_: stale item, re-review request

**Resource Handle**:
A signal ID or reserved alias such as `briefing:latest` that identifies a retrievable public resource.
_Avoid_: route, endpoint, temporary result number

**Summary**:
A public short description or curated digest of a third-party signal.
_Avoid_: full text, copied article

**Briefing**:
A daily public summary of selected signals.
_Avoid_: report, newsletter

**Signal Date**:
The public natural-day date assigned to a signal in Asia/Shanghai time.
_Avoid_: timestamp, scrape time

## Relationships

- A **Publisher** publishes many **Signals**.
- A **Signal** has exactly one **Signal ID**.
- A **Reader** reads many **Signals** and does not create or modify them.
- A **Submitter** creates many **Submissions**.
- A **Submitter** provides only a **Submission URL** through `agi-radar submit`.
- A **Submission** is represented by one **Submission Issue** for public review.
- A **Submission Issue** has a normalized title and exactly one **Submission Payload**.
- A **Submission Payload** contains the submission kind and URL.
- A **Submission Auth Mode** determines whether the CLI creates the issue through GitHub API or returns a prefilled issue URL.
- A **Submission** does not become a **Signal** until a **Publisher** approves it and the publishing workflow emits it.
- A **Submission** may recommend a GitHub project or a SkillHub skill.
- A skill **Submission** must use a `skillhub.cn` source URL.
- Article and news submissions are not accepted in the first public submission version.
- A **Local Submission Check** validates URL type and checks duplicates in cached public feeds.
- A **Submission Duplicate** is rejected before creating a submission issue.
- A **Local Submission Check** does not fetch deep metadata, score quality, or approve a submission.
- A **Briefing** summarises multiple **Signals** for one day.
- A third-party **Signal** may expose a **Summary** without exposing the source's full text.
- A **Reader** primarily fetches signals from the **Raw Feed**.
- A **Pages Site** presents the same published signals for human browsing.
- A **Search Index** contains many **Signals** using common searchable fields.
- A **Detail Feed** contains fuller metadata for one signal type.
- The **AGI Radar CLI** reads from the **Search Index** and type-specific feeds.
- The **AGI Radar CLI** retrieves resources through **Resource Handle** values.
- Human search output may show temporary display indexes, but commands do not accept them as **Resource Handle** values.
- A **Signal** has one **Signal Date** for public filtering and daily grouping.

## Example dialogue

> **Dev:** "Can a Submitter recommend a GitHub project into Daily AGI Radar?"
> **Domain expert:** "Yes, through `agi-radar submit github ...`. It creates a Submission for review, not a published Signal."

## Flagged ambiguities

- Published feeds are read-only; `submit` creates review candidates and does not write directly to public feeds.
- Public submissions are carried by GitHub Issue Forms before any accepted-submission or feed write.
- Public submission forms should require only the submitted URL from the submitter; kind is determined by the CLI subcommand.
- Public submission issues use normalized titles such as `[github] owner/repo` and `[skill] <skillhub slug or title>`.
- Public submission issues include a machine-readable JSON payload such as `{ "kind": "github", "url": "..." }`.
- `submit` works without a GitHub token by returning a prefilled issue URL.
- `submit` may create the GitHub issue directly when a GitHub token is configured.
- Public submissions accept only GitHub projects and SkillHub skills in the first version.
- Skill submissions must come from `skillhub.cn`.
- Article and news submissions are intentionally not accepted in the first version.
- `submit` local validation is intentionally shallow: URL type checks and cached-feed duplicate detection only.
- Duplicate public submissions are rejected; `submit` does not provide a force option.
- Manual reasons, tags, and metadata are not required from submitters; downstream agent and review workflows can enrich and label submissions.
- Third-party article and news signals publish summaries and source links in the first version, not newly fetched full text.
- Public identifiers use **Signal ID** values, not internal Feishu identifiers.
- Temporary search result indexes such as `[1]` are display-only and are not part of the CLI command contract.
- The **Raw Feed** is the primary machine source; the **Pages Site** is a browsing surface and fallback mirror.
- The **Search Index** is the default entry point for cross-type search.
- The **Search Index** is a projection for candidate retrieval, while **Detail Feed** files provide the full fields returned by default search results and detail lookup.
- Public date filtering uses **Signal Date** values in Asia/Shanghai natural days.
