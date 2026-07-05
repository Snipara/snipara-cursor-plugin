---
name: first-work-brief
description: Build a source-backed first work brief for the current repository using Snipara. Use when starting work in a repo, onboarding a Cursor agent, or when the user asks what files, commands, decisions, or guardrails matter first.
---

# First Work Brief

Use Snipara to turn existing project knowledge into an agent-ready starting brief.

## Workflow

1. Call `snipara_help` with a query like `build first work brief for this repository` to discover the best available Snipara tools for the connected account.
2. Query Snipara for the project's purpose, important entry files, setup commands, guardrails, and previous decisions.
3. If Snipara reports weak or empty indexed context, tell the user that the workspace needs indexing through the Snipara VS Code/Cursor extension or hosted project setup before the brief can be source-backed.
4. Return a compact brief with:
   - project purpose
   - files to inspect first
   - likely validation commands
   - relevant decisions or guardrails
   - 3 good follow-up questions
5. Cite Snipara-returned files or memories when available. Do not invent source coverage.

## Output

Keep the answer short and operational. The goal is to let the Cursor agent begin useful work immediately.
