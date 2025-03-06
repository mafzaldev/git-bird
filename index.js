import { GoogleGenerativeAI } from "@google/generative-ai";
import { select, Separator } from "@inquirer/prompts";
import { exec } from "child_process";
import "dotenv/config";
import ora from "ora";
import { exitMessages, SYSTEM_PROMPT } from "./constants.js";

function executeGitCommand(args) {
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

async function getCommitMessages(prompt) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstructions: `You don't need to hallucinate the commit messages. Just generate five distinct commit messages for the given diff.`,
  });

  const result = await model.generateContent(prompt);
  return result.response
    .text()
    .split("\n")
    .map((msg) => msg.replace(/^\*\s*/, "").trim())
    .filter((msg) => msg.length > 0)
    .map((msg) => ({ name: msg, value: msg }));
}

async function main() {
  const spinner = ora("Generating commit messages...").start();

  try {
    const diffOutput = await executeGitCommand(["diff"]);
    const prompt = SYSTEM_PROMPT + "\n" + diffOutput;
    const commitMessages = await getCommitMessages(prompt);
    spinner.stop();

    const choice = await select({
      message: "Select a commit message:",
      theme: {
        helpMode: "never",
      },
      choices: [
        ...commitMessages,
        new Separator(),
        { name: "Exit", value: "exit" },
      ],
    });

    if (choice === "exit") {
      console.log(
        exitMessages[Math.floor(Math.random() * exitMessages.length)]
      );
      return;
    }

    const commitMessage = choice;
    await executeGitCommand(["add", "."]).then((_) => {
      console.log("> Executed add command...");
    });

    await executeGitCommand(["commit", "-m", `"${commitMessage}"`]).then(
      (_) => {
        console.log("> Executed commit command...");
      }
    );
  } catch (error) {
    console.error(error);
  }
}

main();
