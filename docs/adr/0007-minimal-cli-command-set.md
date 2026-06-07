# Keep the CLI command set minimal

`agi-radar` will start with six commands: `search`, `get`, `submit`, `sync`, `status`, and `config`. Resource-specific actions such as detail lookup, daily briefing retrieval, and audio download will use `get` with a resource handle instead of separate command groups. Public recommendations will use `submit`, but `submit` creates review candidates rather than writing directly to published feeds.
