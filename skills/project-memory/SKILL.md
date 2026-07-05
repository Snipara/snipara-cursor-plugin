---
name: project-memory
description: Recall and use durable Snipara project memory. Use for questions about prior decisions, workflows, architecture rationale, user preferences, troubleshooting outcomes, or continuity across agents.
---

# Project Memory

Use Snipara as the durable memory layer for Cursor agents.

## Workflow

1. For memory questions, call `snipara_recall` with a focused query and project scope when available.
2. If the exact tool or scope is unclear, call `snipara_help` first and follow its tool guidance.
3. Treat returned memories as context, not as unquestionable truth. Prefer active, approved, high-confidence memories.
4. If memory and repository truth conflict, say so and verify with source files or fresh commands.
5. Do not persist anything unless the user made or validated a durable decision, workflow, preference, or troubleshooting outcome.

## Output

Answer with the relevant memory-derived facts first, then identify any uncertainty or stale context.
