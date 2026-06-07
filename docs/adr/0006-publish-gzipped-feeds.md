# Publish gzipped feed files

Daily AGI Radar will publish both plain JSONL feeds and `.jsonl.gz` variants. The CLI will prefer gzipped feeds to reduce network transfer and fall back to plain JSONL for debugging, compatibility, or failed gzip fetches.
