# Use a stable JSON envelope for CLI output

`agi-radar` will support human-readable output by default and a stable `--json` envelope for agent and harness consumers. This follows the CLI-Anything pattern of returning `{ ok, command, data, error }` for both success and failure so agents do not parse prose and tests can assert command-level contracts.
