# Use GitHub Issue Forms for public submissions

`agi-radar submit` will create a GitHub issue from a structured submission form. The issue is the public review record for a candidate recommendation. The submitter-facing form should require only the submitted URL; the submission kind is determined by the CLI subcommand.

For the MVP, submission acceptance is a separate review step. The CLI does not write to `data/*.jsonl`, accepted-submission files, or public feeds. GitHub Actions automation for validation, acceptance, and feed integration can be configured later without changing the CLI command contract.

This keeps submission easy for readers and agents, preserves human approval, and prevents unreviewed recommendations from entering the published raw feeds.
