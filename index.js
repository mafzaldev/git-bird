#!/usr/bin/env node

import { select, Separator } from "@inquirer/prompts";
import "dotenv/config";
import meow from "meow";
import ora from "ora";
import {
  getCommitMessagesWithChatGPT,
  getCommitMessagesWithGemini,
} from "./src/ai.js";
import { exitMessages, lockFiles, SYSTEM_PROMPT } from "./src/constants.js";
import { color, executeGitCommand, getAvailableModel } from "./src/utils.js";

const cli = meow(
  `
    Usage
      $ gitw [options]

    Options
      -m, --model  Specify the AI model to use (ChatGPT or Gemini).

    Examples
      $ gitw -m chatgpt
  `,
  {
    importMeta: import.meta,
    flags: {
      model: {
        type: "string",
        shortFlag: "m",
        default: "chatgpt",
      },
    },
  }
);

async function main() {
  let { model } = cli.flags;
  model = model.toLowerCase();

  try {
    executeGitCommand(["rev-parse", "--is-inside-work-tree"], false);
  } catch (error) {
    console.error("> Error: The current directory is not a Git repository.");
    return;
  }

  const availableModel = getAvailableModel(model);
  if (!availableModel) {
    console.error("> Error: No available API keys found.");
    return;
  }

  if (availableModel !== model) {
    console.warn(
      `> Warning: ${color(model)} API key is missing. Falling back to ${color(
        availableModel
      )}.`
    );
    model = availableModel;
  }

  console.log(`> Using ${color(model)} model...`);

  const spinner = ora("Fetching commit suggestions...").start();
  spinner.clear(); // Temporary fix for spinner showing multiple times

  try {
    let diffOutput = executeGitCommand(["diff", "--staged"], false);
    if (!diffOutput.trim()) {
      spinner.stop();
      console.log("> Info: No changes to commit. Please stage some changes.");
      return;
    }

    const lockFileChanges = executeGitCommand(
      ["diff", "--name-only", "--staged", "--", ...lockFiles],
      false
    );
    if (lockFileChanges.trim()) {
      const otherChanges = executeGitCommand(
        ["diff", "--name-only", "--staged"],
        false
      )
        .split("\n")
        .filter((file) => !lockFiles.includes(file));

      if (otherChanges.length === 0) {
        console.log(
          "> Info: Changes detected only in lock files (package-lock.json or yarn.lock)."
        );
        spinner.stop();
        return;
      }
    }

    // Remove lock files diff from diffOutput
    lockFiles.forEach((lockFile) => {
      const lockFileDiff = executeGitCommand(
        ["diff", "--staged", "--", lockFile],
        false
      );
      diffOutput = diffOutput.replace(lockFileDiff, "");
    });

    const prompt = SYSTEM_PROMPT + "\n" + diffOutput;
    let commitMessages;
    if (model === "chatgpt") {
      commitMessages = await getCommitMessagesWithChatGPT(prompt);
    } else {
      commitMessages = await getCommitMessagesWithGemini(prompt);
    }
    spinner.stop();

    const choice = await select({
      message: "Select a commit message:",
      choices: [
        ...commitMessages,
        new Separator(),
        { name: "Exit", value: "exit" },
      ],
    });

    if (choice === "exit") {
      console.log(
        `> ${exitMessages[Math.floor(Math.random() * exitMessages.length)]}`
      );
      return;
    }

    const commitMessage = choice;
    executeGitCommand(["commit", "-m", `"${commitMessage}"`]);
  } catch (error) {
    console.error("> Error: Something went wrong:", error);
  } finally {
    spinner.stop();
  }
}

main();
