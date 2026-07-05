---
name: end-of-task-memory
description: Persist durable task outcomes into Snipara at the end of substantial Cursor work. Use after implementing, debugging, releasing, or validating a workflow where future agents should remember what changed or what was learned.
---

# End-of-Task Memory

Close substantial work by saving only reusable knowledge.

## Persist

- durable project decisions
- validated workflows and release paths
- architectural rationale
- stable user preferences
- troubleshooting outcomes that are likely to recur

## Do Not Persist

- secrets or credentials
- raw logs
- temporary command output
- speculative guesses
- one-off operational noise

## Workflow

1. Summarize the outcome in 2-5 concrete sentences.
2. Include changed files or artifacts when they clarify the durable lesson.
3. Use `snipara_end_of_task_commit` when available. If not available, use the Snipara memory tool recommended by `snipara_help`.
4. If there is nothing durable, say that no memory write is needed.
