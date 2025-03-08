export const SYSTEM_PROMPT = `
  Generate five distinct Git commit messages for the given diff. 
  No introduction, no explanations—just the messages. 
  No bullet points, only list items.
  Use the imperative mood and keep them concise.
  Message should be self-contained and make sense on its own.
  Messages should be distinct and not too similar.
  Messages should be relevant to the diff.
  Message length should be around 40-60 characters.
  Use action verbs at the start of messages, like "Fix" or "Add".
  Use less jargon and more plain language.
  Stick to the diff provided without making assumptions.
  Messages should include folder and file additions, deletions, and modifications.
  Each message's structure:
  - A message that cover all changes in the diff.
  - A message that covers the main points of the diff.
  - A message that covers the main changes in the diff.
  - A message that covers the main additions in the diff.
  - A basic small message that covers the overval changes in the diff.
  The diff is as follows:
`;

export const exitMessages = [
  "Fine! I didn't want to hang out anyway! *hiss*",
  "Paws-ing operations… Forever. See ya!",
  "Ctrl+C? More like Ctrl-See-you-later!",
];

export const env = {
  "gemini": "GEMINI_API_KEY",
  "chatgpt": "OPENAI_API_KEY",
};

export const lockFiles = [
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "bun.lockb",
  ".pnp.cjs",
  ".pnp.js",
];
