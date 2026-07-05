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

Project memory and source-backed context for Cursor agents through the hosted Snipara MCP server.

## Category

Developer Tools

## Tags

mcp, memory, agents, context

## User Setup

Users need a Snipara API key available as `SNIPARA_API_KEY` before enabling the MCP server.

## Review Notes

The plugin is a single-plugin Cursor repository with:

- `.cursor-plugin/plugin.json`
- `mcp.json` using `https://api.snipara.com/mcp/snipara`
- rules under `rules/`
- skills under `skills/`
- no hardcoded secrets

Validation:

```bash
npm run validate
```
