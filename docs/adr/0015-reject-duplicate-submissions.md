# Reject duplicate public submissions

`agi-radar submit` will reject a candidate URL when the locally cached public feeds already contain the same GitHub repository or SkillHub skill.

The CLI should return the existing resource handle when it can identify one. It will not offer a `--force` option.

This keeps the public submission queue focused on new candidates and avoids using the submission path for re-review requests.
