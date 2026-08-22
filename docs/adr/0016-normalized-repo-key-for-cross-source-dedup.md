# Normalized repository key for cross-source deduplication

GitHub project signals now arrive from more than one discovery source, and the same repository is written differently by each one (`owner/repo`, a full URL, a `.git` suffix, a `/tree/main` path, or different letter case).

Two source records are treated as the same project when their `owner/repo` matches case-insensitively after normalization. The canonical `owner/repo` — with the casing GitHub itself uses — is what gets published, while the lowercased form is only ever a comparison key.

The alternative was to keep relying on exact string matching in the curation store. That works only while a single source produces the identifier, and would silently create a second record for the same project the first time two sources disagreed on case. Normalizing before the write is the only point where the duplicate can still be prevented.
