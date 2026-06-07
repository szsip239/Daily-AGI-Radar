# Use stable resource handles only

`agi-radar get` will accept stable resource handles such as `github:owner/repo`, `article:2026-06-07-a1b2c3d4`, `briefing:latest`, and `audio:latest`.

Search results may show display indexes such as `[1]` for readability, and JSON results may include a transient `index` field. These indexes are not accepted by `get` in the MVP.

This follows CLI-Anything's useful agent-facing practices: use machine-readable JSON, make commands self-describing, and prefer stable object references over text or session-dependent lookup. Daily AGI Radar is a read-only data library, so REPL/session state and `get #1`-style temporary references would add state without improving agent reliability.
