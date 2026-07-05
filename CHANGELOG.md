# Changelog

## [0.1.2] - 2026-07-05

### Changed

- Hardened Cursor rules so agents see the canonical `create-snipara` activation command, generated artifact read order, and hosted `SNIPARA_API_KEY` boundary.
- Expanded validation to assert the canonical bootstrap command, hosted MCP endpoint, environment-based auth, and absence of legacy local MCP setup references.

## [0.1.1] - 2026-07-05

### Added

- `start-in-60-seconds` skill for local-first Cursor setup through `create-snipara`.
- Marketplace and README copy explaining the boundary between local activation without an account and hosted memory with `SNIPARA_API_KEY`.

## [0.1.0] - 2026-07-05

### Added

- Initial Cursor plugin for Snipara.
- Hosted Snipara MCP server configuration using `SNIPARA_API_KEY`.
- Rules and skills for First Work Brief, project memory, and end-of-task persistence.
