export const SYSTEM_PROMPT = `
  Generate five distinct Git commit messages for the given diff.
  No introduction, no explanations—just the messages. 
  No bullet points, only list items.

  ### **Commit Message Rules:**  
  - Use the **imperative mood** (e.g., "Fix", "Add", "Update").  
  - Keep messages **concise** (40-60 characters).  
  - Start message with an **action verb** (e.g., "Fix", "Add", "Update").
  - Start with a **lowercase letter** and do **not** end with a period.  
  - Use **plain language**—avoid jargon or exaggerated vocabulary.  
  - Messages should be **self-contained** and make sense on their own.  
  - Follow a **conventional format** (e.g., "fix error handling in index.js").
  - Don't mix message formats—choose one and stick to it.

  ### **Message Variations:**  
  1. **Covers the main points** of the diff.  
  2. **Covers the main changes** in the diff.  
  3. **Covers the main additions** in the diff.  
  4. **Covers the main deletions** in the diff.
  5. **A small, basic message** summarizing the overall changes.  

  ### **Example:** (Fixing a bug in a function)
  **Diff:**
  \`\`\`diff
  - return userData?.name || 'Guest';
  + return userData && userData.name ? userData.name : 'Guest';
  \`\`\`

  **Generated Messages:**  
  - fix user name fallback logic in main function  
  - resolve issue with default username display  
  - update userData check to prevent undefined errors  
  - improve user name handling for missing data  
  - fix name display bug for users without profiles  

  ### **Diff:**  
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
