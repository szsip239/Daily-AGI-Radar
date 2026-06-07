# Audio manifest and download

## What to build

Implement `get audio:latest --download <path>` and dated audio handles using the audio feed and GitHub Release asset URLs.

## Acceptance criteria

- [x] `get audio:latest --json` resolves to the latest audio record.
- [x] `get audio:YYYY-MM-DD --json` resolves a dated audio record.
- [x] `--download <path>` downloads the asset to the requested path.
- [x] Non-audio resources with `--download` fail with `unsupported_download`.
- [x] MP3 files are not committed to Git.

## Blocked by

- `0005-search-full-records-and-get`
