## GitBird

GitBird is a tool designed to help developers generate meaningful and descriptive commit messages using AI models like ChatGPT and Gemini. By analyzing the staged changes in your Git repository, GitBird provides commit message suggestions that can be selected and used directly.

### Features

- **AI-Powered Commit Messages**: Generate commit messages using AI models (ChatGPT or Gemini) based on the staged changes in your repository.
- **Model Selection**: Specify which AI model to use via command-line options.
- **BYOK (Bring Your Own Key)**: Use your own API keys for the AI models.
- **Environment Variable Management**: Automatically checks for required API keys and falls back to available models if the specified model's API key is missing.
- **Interactive Commit Message Selection**: Choose from a list of suggested commit messages interactively.

### Video Demo

[Watch on YouTube](https://youtu.be/GDzxq9sa4vQ)

### How to use

1. Install GitBird using `npm install -g @mafzaldev/git-bird`.
2. Set the required environment variables for the AI models.
3. Navigate to your Git repository.
4. Make your code changes and stage them using `git add`.
5. Run `git-bird -m ${model}` to generate commit messages based on the staged changes.

### Command-Line Options

- `-m, --model <model>`: Specify the AI model to use for generating commit messages. Options: `chatgpt` or `gemini`. Default: `chatgpt`.

### Example

In the below example, it will use the `chatgpt` model by default to generate commit messages based on the staged changes in your repository.
If you have not set the environment variable for the `chatgpt` model, it will check if any other model's API key is available and use that model instead. If no API keys are available, it will display an error message.

```bash
git-bird
```

In the below example, if you have not set the environment variable for the `gemini` model, it will automatically fall back to the `chatgpt` model, and vice versa. If you have set the environment variable for both models, it will use the model specified in the command-line options.
If you have not set the environment variable for either model, it will display an error message.

```bash
git-bird -m gemini
```

### Setting Environment Variables

For Windows (Command Prompt):

```bash
setx CHATGPT_API_KEY "your_chatgpt_api_key"
OR
setx GEMINI_API_KEY "your_gemini_api_key"
```

For Linux/Mac:

```bash
export CHATGPT_API_KEY=your_chatgpt_api_key
OR
export GEMINI_API_KEY=your_gemini_api_key
```
