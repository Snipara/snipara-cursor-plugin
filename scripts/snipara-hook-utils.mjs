import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

export async function readHookInput() {
  let raw = "";
  for await (const chunk of process.stdin) {
    raw += chunk;
  }
  if (!raw.trim()) {
    return {};
  }
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function workspaceRoot(input) {
  const candidates = [
    input.cwd,
    input.workspace_root,
    input.workspaceRoot,
    input.project_dir,
    input.projectDir,
    input.metadata?.cwd,
    input.metadata?.workspace_root,
    process.cwd(),
  ];
  const first = candidates.find((value) => typeof value === "string" && value.length > 0);
  return resolve(first ?? process.cwd());
}

export function hasActivationArtifacts(root) {
  return [
    ".snipara/activation/activation-manifest.json",
    ".snipara/activation/manifest.json",
    ".snipara/activation/first-work-brief.md",
    ".snipara/README.md",
  ].some((relativePath) => existsSync(join(root, relativePath)));
}

export function jsonResponse(payload) {
  process.stdout.write(`${JSON.stringify(payload)}\n`);
}

export function commandText(input) {
  return String(
    input.command ??
      input.shell_command ??
      input.shellCommand ??
      input.metadata?.command ??
      input.metadata?.shell_command ??
      ""
  );
}
