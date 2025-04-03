export const SYSTEM_PROMPT = `
  Generate five distinct Git commit messages for the given diff.
  No introduction, no explanations—just the messages.
  No bullet points, only list items.

  ### **Commit Message Rules:**
  - Use the **imperative mood** (e.g., "Fix", "Add", "Update").
  - Keep messages strictly within 30 to 50 characters.
  - Start message with an **action verb** (e.g., "Fix", "Add", "Update").
  - Start with a **lowercase letter** and do **not** end with a period.  
  - Use **plain language**—avoid jargon or exaggerated vocabulary.
  - Messages should be **self-contained** and make sense on their own.
  - Follow a **conventional format** (e.g., "fix error handling in index.js").
  - Each commit message must be a single line of text.
  - Do not include any text other than the commit message itself.
  - All messages must follow the **same format** within each set.
  - **Choose ONE of the following formats and strictly use it for ALL messages:**
      * **Format 1:** action: brief description
      * **Format 2:** action description in index.js
  - Give only one set of messages at a time.

  ### **Message Variations:**  
  A good commit message should:  
  1. Summarize up to **three major changes** (if applicable) in a concise, comma-separated format.  
  2. Highlight the **key improvements or fixes** introduced in the diff.  
  3. Emphasize the **most significant additions** in the diff.  
  4. Clearly state the **most impactful deletions or removals** in the diff.  
  5. Provide a **brief but complete overview** of the diff in plain language.  

  ### **Example 1:**
  **Diff:**
  \`\`\`diff
  - function fetchData(url) {
  -   return fetch(url).then(res => res.json());
  - }
  + async function fetchData(url, options = {}) {
  +   const response = await fetch(url, options);
  +   if (!response.ok) throw new Error(\`Request failed with status \${response.status}\`);
  +   return await response.json();
  + }
  \`\`\`

  **Generated Messages:**
  - refactor fetchData to async, add options, improve error handling
  - update fetchData with async/await, request validation, options
  - improve fetchData by adding async support, options, error check
  - enhance fetchData with async handling, status validation, options
  - fix fetchData by refactoring to async, adding options, handling errors

  ### **Example 2:**
  **Diff:**
  \`\`\`diff
  - const message = "Hello World";
  + const message = "Hello, Universe!";
  \`\`\`

  **Incorrect Commit Messages (DO NOT COMBINE):**
  - refactor: fix typo in message, update greeting string
  - update index.js, fix typo in greeting string

  **Correct Commit Messages (FOLLOW ONE FORMAT):**
  - refactor: fix typo in message greeting
  - fix: update greeting message to "Hello, Universe!"

  **Correct Commit Messages (FOLLOW ONE FORMAT):**
  - update greeting message in index.js
  - fix typo in message string in index.js.

  Here's the diff:
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
