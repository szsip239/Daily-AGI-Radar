# Build the CLI as a TypeScript npm package

`agi-radar` will be implemented as a TypeScript CLI distributed through npm, not as a Python package. This supports `npx agi-radar@latest` for no-install usage, `npm install -g agi-radar` for frequent users, and aligns the public interface with agent-friendly npm CLI registry patterns used by CLI-Anything public entries.
