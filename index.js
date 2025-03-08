import { select, Separator } from "@inquirer/prompts";
import { exec } from "child_process";
import "dotenv/config";
import meow from "meow";
import ora from "ora";
import {
  getCommitMessagesWithChatGPT,
  getCommitMessagesWithGemini,
} from "./ai.js";
import { exitMessages, SYSTEM_PROMPT } from "./constants.js";
import { color, getAvailableModel } from "./utils.js";

const cli = meow(
  `
    Usage
      $ gcm [options]

    Options
      -m, --model  Specify the AI model to use (ChatGPT or Gemini).

    Examples
      $ gcm -m chatgpt
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

function executeGitCommand(args) {
  console.log(`> Executing git ${args.join(" ")}...`);
  return new Promise((resolve, reject) => {
    exec(`git ${args.join(" ")}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr && !stderr.includes("LF will be replaced by CRLF")) {
        reject(`Stderr: ${stderr}`);
        return;
      }
      resolve(stdout);
    });
  });
}

async function main() {
  let { model } = cli.flags;
  model = model.toLowerCase();

  const availableModel = getAvailableModel(model);
  if (!availableModel) {
    console.error("Error: No available API keys found.");
    return;
  }

  if (availableModel !== model) {
    console.warn(
      `Warning: ${color(model)} API key is missing. Falling back to ${color(
        availableModel
      )}.`
    );
    model = availableModel;
  }

  console.log(`> Using ${color(model)} model...`);

  const spinner = ora("Fetching commit suggestions...").start();
  spinner.clear(); // Temporary fix for spinner showing multiple times

  try {
    const diffOutput = await executeGitCommand(["diff"]);

    if (!diffOutput.trim()) {
      spinner.stop();
      console.log("No changes detected.");
      return;
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
    await executeGitCommand(["add", "."]);
    await executeGitCommand(["commit", "-m", `"${commitMessage}"`]);
  } catch (error) {
    console.error("Something went wrong:", error);
  } finally {
    spinner.stop();
  }
}

main();
