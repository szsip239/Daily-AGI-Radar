# Store daily audio in monthly GitHub Releases

Daily AGI Radar will not commit MP3 files into the Git repository. Daily audio files will be uploaded as assets on monthly GitHub Releases such as `audio-2026-06`, while the raw feed stores only audio metadata and download URLs. This keeps Git history lightweight, avoids GitHub Pages size limits, and lets the CLI download audio through the manifest without requiring readers to understand Releases.
