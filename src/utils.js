import chalk from "chalk";
import { spawnSync } from "child_process";
import { env, lockFiles } from "./constants.js";

export function executeGitCommand(args, log = true) {
  if (log) {
    console.log(`> Executing git ${args.join(" ")}`);
  }

  const result = spawnSync("git", args, {
    encoding: "utf-8",
    stdio: ["inherit", "pipe", "pipe"],
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const stderr = result.stderr || "";
    if (!stderr.includes("LF will be replaced by CRLF")) {
      throw new Error(`Error: ${stderr.trim()}`);
    }
  }

  return result.stdout.trim();
}

export function getAvailableModel(preferredModel) {
  if (process.env[env[preferredModel]]) return preferredModel;
  return Object.keys(env).find((key) => process.env[env[key]]) || null;
}

export function color(model) {
  const colors = {
    chatgpt: chalk.white,
    gemini: chalk.hex("#8B5CF6"),
    claude: chalk.hex("#FFA500"),
  };

  return colors[model] ? colors[model](model) : model;
}

export function detectLockFiles() {
  const stagedFiles = executeGitCommand(
    ["diff", "--name-only", "--staged"],
    false
  )
    .trim()
    .split("\n")
    .filter(Boolean);

  const hasLockFileChanges = stagedFiles.some((file) =>
    lockFiles.includes(file)
  );

  const hasSourceCodeChanges = stagedFiles.some(
    (file) => !lockFiles.includes(file)
  );

  if (hasLockFileChanges && !hasSourceCodeChanges) {
    // Lock file changes only
    return -1;
  } else if (hasLockFileChanges && hasSourceCodeChanges) {
    // Lock file changes along with source code changes
    return 0;
  } else {
    // No lock file changes, only source code changes
    return 1;
  }
}

export function filterLockFiles(diffOutput) {
  const diffLines = diffOutput.split("\n");
  const lockFilePattern = new RegExp(`^(${lockFiles.join("|")})$`);
  let isLockFileChange = false;

  const filteredDiffLines = diffLines.filter((line) => {
    if (line.startsWith("diff --git")) {
      const filePath = line.split(" ")[2].substring(2);
      isLockFileChange = lockFilePattern.test(filePath);
    }
    return !isLockFileChange;
  });

  return filteredDiffLines.join("\n");
}
