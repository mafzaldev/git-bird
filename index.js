const { exec } = require("child_process");
const fs = require("fs");

function executeGitCommand(args) {
  return new Promise((resolve, reject) => {
    exec(`git ${args.join(" ")}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`Stderr: ${stderr}`);
        return;
      }
      resolve(stdout);
    });
  });
}

async function main() {
  try {
    const diffOutput = await executeGitCommand(["diff"]);
    fs.writeFileSync("git_diff_output.txt", diffOutput);
    console.log("Git diff has been written to git_diff_output.txt");
  } catch (error) {
    console.error(error);
  }
}

main();
