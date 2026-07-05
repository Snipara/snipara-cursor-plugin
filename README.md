# Snipara Cursor Plugin

Snipara gives Cursor agents project memory and source-backed context through the hosted Snipara MCP server.

This plugin bundles:

- the hosted Snipara MCP server configuration
- rules for using Snipara as durable project memory
- skills for First Work Briefs, project-memory recall, and end-of-task persistence

## Requirements

- Cursor 2.6 or later
- A Snipara API key exposed as `SNIPARA_API_KEY`

Do not hardcode API keys in plugin files or `mcp.json`.

## Local Install

For local testing, symlink or copy this repository to:

```bash
~/.cursor/plugins/local/snipara
```

Then reload Cursor and open **Settings -> Plugins**.

## MCP Configuration

The plugin configures:

```json
{
  "mcpServers": {
    "snipara": {
      "url": "https://api.snipara.com/mcp/snipara",
      "headers": {
        "Authorization": "Bearer ${env:SNIPARA_API_KEY}"
      }
    }
  }
}
```

Set the key in your shell or launch environment before starting Cursor.

## Skills

- `first-work-brief`: build an agent-ready brief for a repository.
- `project-memory`: recall durable project decisions, preferences, and workflows.
- `end-of-task-memory`: persist reusable outcomes at the end of substantial work.

## Publish

This repository is structured as a single Cursor plugin. Submit the public repository URL at:

https://cursor.com/marketplace/publish
