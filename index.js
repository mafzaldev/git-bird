#!/usr/bin/env node

import { select, Separator } from "@inquirer/prompts";
import "dotenv/config";
import meow from "meow";
import ora from "ora";
import { fetch, Headers, Request, Response } from "undici";
import {
  getCommitMessagesWithChatGPT,
  getCommitMessagesWithGemini,
} from "./src/ai.js";
import { exitMessages, SYSTEM_PROMPT } from "./src/constants.js";
import {
  color,
  detectLockFiles,
  executeGitCommand,
  filterLockFiles,
  getAvailableModel,
} from "./src/utils.js";

function setupPolyfills() {
  // Polyfill for fetch, Headers, Request, and Response if not available
  if (typeof global.fetch === "undefined") {
    global.fetch = fetch;
  }

  if (typeof global.Headers === "undefined") {
    global.Headers = Headers;
  }

  if (typeof global.Request === "undefined") {
    global.Request = Request;
  }

  if (typeof global.Response === "undefined") {
    global.Response = Response;
  }

  // Polyfill for Array.prototype.findLastIndex if not available
  if (!Array.prototype.findLastIndex) {
    Array.prototype.findLastIndex = function (predicate, thisArg) {
      for (let i = this.length - 1; i >= 0; i--) {
        if (predicate.call(thisArg, this[i], i, this)) {
          return i;
        }
      }
      return -1;
    };
  }
}

const cli = meow(
  `
    Usage
      $ git-bird [options]

    Options
      -m, --model  Specify the AI model to use (ChatGPT or Gemini).

    Examples
      $ git-bird -m chatgpt
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

(async () => {
  setupPolyfills();

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
    console.error("> Info: No API key found. Please set the API keys.");
    return;
  }

  model = availableModel;

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

    const hasOnlySourceCode = detectLockFiles();

    if (hasOnlySourceCode === -1) {
      spinner.stop();
      console.log(
        "> Info: Only Lock file changes detected. No source code changes to commit."
      );
      return;
    } else if (hasOnlySourceCode === 0) {
      diffOutput = filterLockFiles(diffOutput);
    }

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
    executeGitCommand(["commit", "-m", commitMessage]);
  } catch (error) {
    console.error("> Error: Something went wrong:", error);
  } finally {
    spinner.stop();
  }
})();
