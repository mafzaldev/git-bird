import chalk from "chalk";
import { execSync } from "child_process";
import { env } from "./constants.js";

export function executeGitCommand(args, log = true) {
  if (log) {
    console.log(`> Executing git ${args.join(" ")} ...`);
  }
  try {
    const output = execSync(`git ${args.join(" ")}`, { stdio: "pipe" })
      .toString()
      .trim();
    return output;
  } catch (error) {
    if (
      error.stderr &&
      !error.stderr.toString().includes("LF will be replaced by CRLF")
    ) {
      throw new Error(`Error: ${error.stderr.toString().trim()}`);
    }
    throw new Error(`Error: ${error.message}`);
  }
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
