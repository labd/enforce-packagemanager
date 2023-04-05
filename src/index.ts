#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getUsedPackageManager } from "./lib";

const usedPackageManager = getUsedPackageManager();
if (!usedPackageManager) {
  console.error("Could not find currently running package manager");
  process.exit(1);
}

const cwd = process.cwd();

// Import package.json
const packageJsonPath = resolve(process.cwd(), "./package.json");
const packageJsonContent = readFileSync(packageJsonPath, "utf-8");
const wantedPackageManager = JSON.parse(
  packageJsonContent ?? "{}"
).packageManager;

if (!wantedPackageManager) {
  console.error("No packageManager field found in project");
  process.exit(1);
}

console.log("getting here");

const [packageManager, version] = wantedPackageManager.split("@");

if (
  packageManager !== usedPackageManager.name ||
  version !== usedPackageManager.version
) {
  console.error(
    `You are using ${usedPackageManager.name}@${usedPackageManager.version} but you should use ${packageManager}@${version}`
  );
  process.exit(1);
}
