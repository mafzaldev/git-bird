## GitBird

The GitBird is a tool designed to help developers generate meaningful and descriptive commit messages using AI models like ChatGPT and Gemini. By analyzing the staged changes in your Git repository, GitBird provides commit message suggestions that can be selected and used directly.

### Features

- **AI-Powered Commit Messages**: Generate commit messages using AI models (ChatGPT or Gemini) based on the staged changes in your repository.
- **Model Selection**: Specify which AI model to use via command-line options.
- **BYOK (Bring Your Own Key)**: Use your own API keys for the AI models.
- **Environment Variable Management**: Automatically checks for required API keys and falls back to available models if the specified model's API key is missing.
- **Interactive Commit Message Selection**: Choose from a list of suggested commit messages interactively.

### How to use

1. Install GitBird using `npm install -g @mafzaldev/git-bird`.
2. Set the required environment variables for the AI models.
3. Move to your Git repository and run `git-bird`.
4. Make your code changes and stage them using `git add`.
5. Run `gitbird -m ${model}` to generate commit messages based on the staged changes.

### Command-Line Options

- `-m, --model <model>`: Specify the AI model to use for generating commit messages. Options: `chatgpt` or `gemini`.

### Example

```bash
gitbird -m chatgpt
```

### Setting Environment Variables

For Windows (Command Prompt):

```bash
setx CHATGPT_API_KEY "your_chatgpt_api_key"
setx GEMINI_API_KEY "your_gemini_api_key"
```

For Linux/Mac:

```bash
export CHATGPT_API_KEY=your_chatgpt_api_key
export GEMINI_API_KEY=your_gemini_api_key
```

### Future Enhancements

- **Custom Model Support**: Allow users to use their own AI models for generating commit messages.
- **Custom Commit Message Templates**: Allow users to define custom commit message templates for generating commit messages.
- **Support for Multiple Languages**: Enable support for generating commit messages in multiple languages.
