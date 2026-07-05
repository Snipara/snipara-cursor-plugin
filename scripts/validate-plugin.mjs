#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const errors = [];
const CANONICAL_BOOTSTRAP =
  "npx create-snipara@latest init --client cursor --starter";
const HOSTED_MCP_URL = "https://api.snipara.com/mcp/snipara";

function fail(message) {
  errors.push(message);
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    fail(`${path}: ${error instanceof Error ? error.message : "invalid JSON"}`);
    return null;
  }
}

const pluginPath = resolve(root, ".cursor-plugin/plugin.json");
const manifest = readJson(pluginPath);
const packageJson = readJson(resolve(root, "package.json"));

if (!manifest) {
  process.exit(1);
}

if (!/^[a-z0-9]([a-z0-9.-]*[a-z0-9])?$/.test(manifest.name ?? "")) {
  fail("plugin name must be lowercase kebab-case");
}

for (const field of ["displayName", "version", "description", "license"]) {
  if (!manifest[field]) {
    fail(`missing manifest field: ${field}`);
  }
}

if (!manifest.author?.name) {
  fail("missing author.name");
}

if (packageJson?.version && manifest.version !== packageJson.version) {
  fail("manifest version must match package.json version");
}

for (const pathField of ["skills", "rules", "mcpServers", "logo"]) {
  const value = manifest[pathField];
  if (typeof value === "string" && !existsSync(resolve(root, value))) {
    fail(`${pathField} path does not exist: ${value}`);
  }
}

const mcp = readJson(resolve(root, "mcp.json"));
if (!mcp?.mcpServers?.snipara?.url) {
  fail("mcp.json must define mcpServers.snipara.url");
}

if (mcp?.mcpServers?.snipara?.url !== HOSTED_MCP_URL) {
  fail(`mcp.json must use hosted MCP endpoint: ${HOSTED_MCP_URL}`);
}

const authHeader = mcp?.mcpServers?.snipara?.headers?.Authorization;
if (authHeader !== "Bearer ${env:SNIPARA_API_KEY}") {
  fail("mcp.json must reference SNIPARA_API_KEY without hardcoding secrets");
}

const skillPaths = [
  "skills/start-in-60-seconds/SKILL.md",
  "skills/first-work-brief/SKILL.md",
  "skills/project-memory/SKILL.md",
  "skills/end-of-task-memory/SKILL.md",
];

for (const skillPath of skillPaths) {
  const fullPath = resolve(root, skillPath);
  if (!existsSync(fullPath)) {
    fail(`missing skill: ${skillPath}`);
    continue;
  }
  const text = readFileSync(fullPath, "utf8");
  if (!text.startsWith("---") || !text.includes("name:") || !text.includes("description:")) {
    fail(`${skillPath} must include name and description frontmatter`);
  }
}

const rulePath = resolve(root, "rules/snipara-memory.mdc");
if (!existsSync(rulePath)) {
  fail("missing snipara rule");
} else {
  const text = readFileSync(rulePath, "utf8");
  if (!text.startsWith("---") || !text.includes("alwaysApply: true")) {
    fail("snipara rule must include Cursor frontmatter");
  }
}

const contractFiles = [
  "README.md",
  "rules/snipara-memory.mdc",
  "skills/start-in-60-seconds/SKILL.md",
  "docs/CURSOR_MARKETPLACE_SUBMISSION.md",
];

for (const contractFile of contractFiles) {
  const fullPath = resolve(root, contractFile);
  if (!existsSync(fullPath)) {
    fail(`missing contract file: ${contractFile}`);
    continue;
  }
  const text = readFileSync(fullPath, "utf8");
  if (!text.includes(CANONICAL_BOOTSTRAP)) {
    fail(`${contractFile} must include canonical Cursor bootstrap command`);
  }
}

const artifactHints = [
  ".cursor/rules/snipara.mdc",
  ".snipara/activation/first-work-brief.md",
  ".snipara/activation/manifest.json",
  ".snipara/README.md",
];
const startupSkill = readFileSync(resolve(root, "skills/start-in-60-seconds/SKILL.md"), "utf8");
for (const artifactHint of artifactHints) {
  if (!startupSkill.includes(artifactHint)) {
    fail(`start-in-60-seconds skill must mention generated artifact: ${artifactHint}`);
  }
}

const publicFiles = [
  "README.md",
  "mcp.json",
  "rules/snipara-memory.mdc",
  ...skillPaths,
  "docs/CURSOR_MARKETPLACE_SUBMISSION.md",
];
const forbiddenSnippets = ["uvx snipara-mcp", ".mcp.env", ".mcp.json", "RLM_API_KEY"];
for (const publicFile of publicFiles) {
  const text = readFileSync(resolve(root, publicFile), "utf8");
  for (const forbidden of forbiddenSnippets) {
    if (text.includes(forbidden)) {
      fail(`${publicFile} must not reference legacy setup: ${forbidden}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Cursor plugin validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Cursor plugin validation passed.");
