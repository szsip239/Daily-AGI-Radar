# Require only a URL for public submissions

`agi-radar submit` will require only the candidate URL from the submitter.

Supported commands:

- `agi-radar submit github <github-repo-url>`
- `agi-radar submit skill <skillhub-cn-url>`

The command subpath determines the submission kind. The submitter is not required to provide a reason, tags, score, category, or metadata. Downstream agent workflows and human review can fetch metadata, evaluate quality, and apply labels.

This keeps contribution friction low while preserving the curated review process.
