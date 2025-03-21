export const SYSTEM_PROMPT = `
  Generate five distinct Git commit messages for the given diff. 
  No introduction, no explanations—just the messages. 
  No bullet points, only list items.
  Use the imperative mood and keep them concise.
  Message should be self-contained and make sense on its own.
  Messages should be distinct and not too similar.
  Messages should be relevant to the diff.
  Messages should start with small letters and end without a period.
  Message length should be around 40-60 characters.
  Use action verbs at the start of messages, like "Fix" or "Add".
  Use less jargon and more plain language.
  Avoid exaggerated vocabulary.
  Stick to the diff provided without making assumptions.
  Messages should include folder and file additions, deletions, and modifications.
  Messages should be in a conventional format. it should not be like: "fix [file] : add [file] : update [file]"
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
  "chatgpt": "CHATGPT_API_KEY",
};

export const lockFiles = [
  // JavaScript/TypeScript
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "bun.lockb",

  // Python
  "poetry.lock",
  "Pipfile.lock",
  "requirements.txt",

  // Ruby
  "Gemfile.lock",

  // Rust
  "Cargo.lock",

  // Go
  "go.sum",

  // Java/Kotlin
  "gradle.lockfile",
  "pom.xml",

  // PHP
  "composer.lock",

  // Dart/Flutter
  "pubspec.lock",

  // Swift
  "Package.resolved",

  // C#/.NET
  "packages.lock.json",

  // Elixir
  "mix.lock",

  // Haskell
  "cabal.project.freeze",
  "stack.yaml.lock",

  // Perl
  "cpanfile.snapshot",

  // Nix
  "flake.lock",
];
