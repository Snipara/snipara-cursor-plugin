# Cursor + Snipara

Snipara gives Cursor agents a 60-second local setup path, project memory, and source-backed context.

Snipara turns an editor install into a live project context in under a minute. Cursor uses the `create-snipara` bootstrap; VS Code can run the same activation as a native workspace command.

```text
Cursor
  |
  v
Hosted MCP
  |
  v
Project Brain
  |
  +-- Work Brief
  +-- Impact
  +-- Verification
  +-- Receipts
```

This plugin bundles:

- the hosted Snipara MCP server configuration
- rules for using Snipara as durable project memory
- skills for 60-second setup, First Work Briefs, project-memory recall, and end-of-task persistence
- an agent-visible contract that points Cursor to `create-snipara` instead of duplicating activation logic in the plugin

## Why Cursor Users Install Snipara

- Stop re-explaining the project every session.
- Reuse reviewed decisions instead of rediscovering them.
- Know code impact before editing.
- Start every session with a Work Brief.

## What Changes Inside Cursor?

Before Snipara:

```text
Implement OAuth.

Cursor starts searching the repository from scratch.
```

After Snipara:

```text
Opening Work Brief...

✓ Decisions
✓ Active work
✓ Architecture
✓ Impact
✓ Verification

Ready.
```

Cursor still uses its own model and editor workflow. Snipara supplies the project memory, source-backed context, and activation artifacts the agent should inspect before making changes.

## Cursor Rules and Skills Lifecycle

Snipara fits Cursor's project workflow through generated rules, skills, and hosted MCP context:

- session starts with generated Cursor rules and a First Work Brief
- edits are guided by source-backed project context
- end-of-task skills can persist reusable memory
- verification and handoff notes can become reusable project receipts

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

This is the Cursor entry point for Snipara's shared activation engine. The plugin does not duplicate the activation logic; it points Cursor agents to the same `create-snipara` bootstrap that generates the local package, rules, activation artifacts, and First Work Brief path.

After bootstrap, Cursor agents should inspect the generated local artifacts before continuing:

- `.cursor/rules/snipara.mdc`
- `.snipara/activation/first-work-brief.md`
- `.snipara/activation/manifest.json`
- `.snipara/README.md`

For local workflow helpers after first value:

```bash
npx create-snipara@latest init --client cursor --profile hosted-companion --starter
```

For a no-hosted-API local runtime path:

```bash
npx create-snipara@latest init --client cursor --profile runtime-only --starter
```

## One Activation Engine, Multiple Entry Points

Snipara keeps the activation logic centralized instead of rebuilding it per editor.

| Surface | Entry Point | What Users Get |
|---------|-------------|----------------|
| Cursor plugin | `create-snipara` bootstrap | Project-local Cursor rules, activation artifacts, First Work Brief path, hosted MCP upgrade with `SNIPARA_API_KEY` |
| VS Code extension | Native **Snipara: Activate Workspace** command | Sign-in when needed, `create-snipara --json`, activation manifest rendering, First Work Brief panel, Copilot handoff |
| `create-snipara` CLI | `npx create-snipara@latest init --client <client> --starter` | Shared activation package for Cursor, Claude Code, Codex, VS Code-compatible clients, and generic MCP clients |

The product promise is the same across surfaces: install Snipara, open your project, and give the agent live project context before it starts work.

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

## Validation Contract

The plugin validation checks that:

- `.cursor-plugin/plugin.json` points to the rules, skills, logo, and hosted MCP config.
- `mcp.json` uses `https://api.snipara.com/mcp/snipara` and reads `SNIPARA_API_KEY` from the environment.
- README, rules, and the 60-second setup skill expose the canonical command:

  ```bash
  npx create-snipara@latest init --client cursor --starter
  ```

- No public plugin file references legacy local MCP setup or hardcoded secret placeholders.

## Publish

This repository is structured as a single Cursor plugin. Submit the public repository URL at:

https://cursor.com/marketplace/publish
