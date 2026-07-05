#!/usr/bin/env node
import { hasActivationArtifacts, jsonResponse, readHookInput, workspaceRoot } from "./snipara-hook-utils.mjs";

const input = await readHookInput();
const root = workspaceRoot(input);

if (hasActivationArtifacts(root)) {
  jsonResponse({
    followup_message:
      "Snipara session close: if this work produced reusable decisions, verification outcomes, or troubleshooting knowledge, persist them with the Snipara end-of-task memory skill.",
  });
} else {
  jsonResponse({});
}
