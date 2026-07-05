#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const errors = [];

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

const authHeader = mcp?.mcpServers?.snipara?.headers?.Authorization;
if (authHeader !== "Bearer ${env:SNIPARA_API_KEY}") {
  fail("mcp.json must reference SNIPARA_API_KEY without hardcoding secrets");
}

const skillPaths = [
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

if (errors.length > 0) {
  console.error("Cursor plugin validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Cursor plugin validation passed.");
