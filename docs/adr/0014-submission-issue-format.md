# Use normalized submission issue titles and JSON payloads

`agi-radar submit` will create or prefill submission issues using a stable title and a machine-readable JSON payload.

Issue titles:

- GitHub submissions use `[github] owner/repo`.
- Skill submissions use `[skill] <skillhub slug or title>`.

Issue body:

```json
{
  "kind": "github",
  "url": "https://github.com/owner/repo"
}
```

For skill submissions, `kind` is `skill` and `url` is the `skillhub.cn` URL.

The body may include surrounding Markdown for humans, but the JSON payload is the parsing contract for future agent workflows and GitHub Actions.
