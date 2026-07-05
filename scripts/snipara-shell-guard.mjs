#!/usr/bin/env node
import {
  commandText,
  hasActivationArtifacts,
  jsonResponse,
  readHookInput,
  workspaceRoot,
} from "./snipara-hook-utils.mjs";

const input = await readHookInput();
const root = workspaceRoot(input);
const command = commandText(input);
const riskyReleaseCommand = /\b(git\s+(commit|push)|npm\s+publish|vsce\s+publish|ovsx\s+publish|pnpm\s+run\s+publish|npm\s+run\s+publish)\b/.test(
  command
);

if (!riskyReleaseCommand) {
  jsonResponse({ permission: "allow" });
} else if (hasActivationArtifacts(root)) {
  jsonResponse({
    permission: "allow",
    user_message: "Snipara release guard: activation artifacts are present.",
    agent_message:
      "Snipara release guard passed. Use the Work Brief, project decisions, verification notes, and end-of-task memory before finalizing.",
  });
} else {
  jsonResponse({
    permission: "ask",
    user_message:
      "Snipara release guard: no activation artifacts found. Continue only if this workspace was intentionally not activated.",
    agent_message:
      "Before commit, push, or publish, consider running: npx create-snipara@latest init --client cursor --starter",
  });
}
