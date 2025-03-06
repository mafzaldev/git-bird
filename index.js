const { exec } = require("child_process");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const SYSTEM_PROMPT = `Generate a list of five distinct Git commit messages for the given diff. No introduction, no breakdown, just the messages. To the point, and in the imperative mood. The diff is as follows:`;

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
  const genAI = new GoogleGenerativeAI("");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}

async function main() {
  try {
    const diffOutput = await executeGitCommand(["diff"]);
    const prompt = SYSTEM_PROMPT + "\n" + diffOutput;
    fs.writeFileSync("git_diff_output.txt", prompt);
    const commitMessages = await getCommitMessages(prompt);
    // const commitMessage = commitMessages[0].content;
    // const commitMessageFile = "commit-messages.txt";
    // fs.writeFileSync(commitMessageFile, commitMessage);
  } catch (error) {
    console.error(error);
  }
}

main();
