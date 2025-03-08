import chalk from "chalk";
import { env } from "./constants.js";

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
