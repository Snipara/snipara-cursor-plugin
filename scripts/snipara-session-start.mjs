#!/usr/bin/env node
import { hasActivationArtifacts, jsonResponse, readHookInput, workspaceRoot } from "./snipara-hook-utils.mjs";

const input = await readHookInput();
const root = workspaceRoot(input);

if (hasActivationArtifacts(root)) {
  jsonResponse({
    followup_message:
      "Snipara context is available. Before editing, read the First Work Brief and generated Cursor rules if relevant.",
  });
} else {
  jsonResponse({
    followup_message:
      "Snipara is installed but this workspace has no activation artifacts yet. For first value, run: npx create-snipara@latest init --client cursor --starter",
  });
}
