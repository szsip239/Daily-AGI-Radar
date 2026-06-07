# Keep submit validation shallow in the CLI

`agi-radar submit` will perform only lightweight local validation before creating a submission issue.

The CLI will:

- accept GitHub submissions only when the URL normalizes to `github.com/<owner>/<repo>`;
- accept skill submissions only when the URL is from `skillhub.cn`;
- check the locally cached public feeds for obvious duplicates.

If the URL already matches a published signal, `submit` rejects the submission and returns the existing resource handle when available. There is no `--force` option.

The CLI will not fetch deep metadata, compute quality scores, validate stars, enrich descriptions, or make acceptance decisions. Those checks belong to future GitHub Actions automation and human review.

This keeps the public CLI fast, deterministic, and usable without privileged credentials.
