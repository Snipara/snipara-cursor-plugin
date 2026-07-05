# Cursor Marketplace Submission

Submit at:

https://cursor.com/marketplace/publish

## Repository

https://github.com/Snipara/snipara-cursor-plugin

## Plugin Name

snipara

## Display Name

Snipara

## Short Description

Project memory, 60-second local setup, and source-backed context for Cursor agents.

## Category

Developer Tools

## Tags

mcp, memory, agents, context

## User Setup

Users can start locally in about 60 seconds with:

```bash
npx create-snipara@latest init --client cursor --starter
```

Hosted memory and source-backed MCP retrieval require a free Snipara account and a `SNIPARA_API_KEY` environment variable before enabling the bundled MCP server.

## Marketplace Description

Snipara helps Cursor agents start work with repository-specific context instead of a blank prompt. The plugin includes a 60-second starter path through `create-snipara`, Cursor rules for durable project memory, and skills for First Work Briefs, memory recall, and end-of-task persistence.

Users can begin locally without a paid plan: `create-snipara` generates project-local activation artifacts, Cursor guidance, and a First Work Brief path from the current repository. When users add a free Snipara account and `SNIPARA_API_KEY`, the same Cursor workflow upgrades to hosted MCP retrieval and reviewed memory across sessions.

This helps Cursor users onboard agents faster, preserve project decisions, cite source-backed context, and hand off substantial work with reusable memory instead of repeating repository explanations every time.

## Review Notes

The plugin is a single-plugin Cursor repository with:

- `.cursor-plugin/plugin.json`
- `mcp.json` using `https://api.snipara.com/mcp/snipara`
- rules under `rules/`
- skills under `skills/`
- validation that the agent-visible setup path remains `npx create-snipara@latest init --client cursor --starter`
- no hardcoded secrets

Validation:

```bash
npm run validate
```
