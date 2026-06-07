# Read public data over HTTP without cloning the repository

`agi-radar` will not require `git` or clone the Daily AGI Radar repository. The CLI will fetch only the needed raw feed files over HTTPS, starting with `manifest.json` and the search index, then cache them locally and download detail feeds, briefings, or audio only when requested.
