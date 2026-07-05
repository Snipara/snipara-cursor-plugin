# Snipara Cursor Plugin

Snipara gives Cursor agents a 60-second local setup path, project memory, and source-backed context.

This plugin bundles:

- the hosted Snipara MCP server configuration
- rules for using Snipara as durable project memory
- skills for 60-second setup, First Work Briefs, project-memory recall, and end-of-task persistence

## Requirements

- Cursor 2.6 or later
- Optional for hosted memory: a Snipara API key exposed as `SNIPARA_API_KEY`

Do not hardcode API keys in plugin files or `mcp.json`.

## Start in 60 Seconds

Without an API key, use the local-first starter path:

```bash
npx create-snipara@latest init --client cursor --starter
```

This generates project-local Cursor rules, Snipara activation artifacts, and a First Work Brief path from the current repository. It does not require a paid plan or hosted memory.

With a free Snipara account, set `SNIPARA_API_KEY` before starting Cursor. The hosted MCP server then adds source-backed retrieval and durable reviewed memory.

For local workflow helpers after first value:

```bash
npx create-snipara@latest init --client cursor --profile hosted-companion --starter
```

For a no-hosted-API local runtime path:

```bash
npx create-snipara@latest init --client cursor --profile runtime-only --starter
```

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
- `start-in-60-seconds`: bootstrap Snipara locally, then upgrade to hosted memory when a key is available.
- `project-memory`: recall durable project decisions, preferences, and workflows.
- `end-of-task-memory`: persist reusable outcomes at the end of substantial work.

## Publish

This repository is structured as a single Cursor plugin. Submit the public repository URL at:

https://cursor.com/marketplace/publish
