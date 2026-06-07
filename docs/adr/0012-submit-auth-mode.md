# Support token and no-token submit modes

`agi-radar submit` will work in two modes:

- without a GitHub token, it returns a prefilled GitHub issue URL for the submitter to open and submit manually;
- with a configured GitHub token, it creates the GitHub issue directly through the GitHub API.

The auth mode does not affect submission validation or approval. Both modes create the same structured submission issue, and neither mode writes directly to accepted-submission files or public feeds.

This keeps public submission accessible while still supporting automation-friendly issue creation for users and agents that can provide a GitHub token.
