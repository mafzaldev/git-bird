import { select, Separator } from "@inquirer/prompts";
import { exec } from "child_process";
import "dotenv/config";
import ora from "ora";
import { getCommitMessages } from "./ai.js";
import { exitMessages, SYSTEM_PROMPT } from "./constants.js";

function executeGitCommand(args) {
  console.log(`> Executing git ${args.join(" ")}...`);
  return new Promise((resolve, reject) => {
    exec(`git ${args.join(" ")}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);

        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr && !stderr.includes("LF will be replaced by CRLF")) {
        console.error(`Stderr: ${stderr}`);
        reject(`Stderr: ${stderr}`);
        return;
      }
      resolve(stdout);
    });
  });
}
async function main() {
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
    const commitMessages = await getCommitMessages(prompt);
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
