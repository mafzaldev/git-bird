# GitWhisperer

## Description

The GitWhisperer is a tool designed to help developers generate meaningful and descriptive commit messages using AI models like ChatGPT and Gemini. By analyzing the staged changes in your Git repository, GitWhisperer provides commit message suggestions that can be selected and used directly.

## Features

- **AI-Powered Commit Messages**: Generate commit messages using AI models (ChatGPT or Gemini) based on the staged changes in your repository.
- **Model Selection**: Specify which AI model to use via command-line options.
- **BYOK (Bring Your Own Key)**: Use your own API keys for the AI models.
- **Environment Variable Management**: Automatically checks for required API keys and falls back to available models if the specified model's API key is missing.
- **Interactive Commit Message Selection**: Choose from a list of suggested commit messages interactively.

## Usage

```sh
$ gitw [options]

Options:
  -m, --model  Specify the AI model to use (ChatGPT or Gemini).

Examples:
  $ gitw -m chatgpt
```

## Environment Variables

Ensure you have the necessary API keys set in your environment variables. The required keys are:

- `CHATGPT_API_KEY`
- `GEMINI_API_KEY`

## Future Enhancements

- **Custom Model Support**: Allow users to use their own AI models for generating commit messages.
- **Custom Commit Message Templates**: Allow users to define custom commit message templates for generating commit messages.
- **Support for Multiple Languages**: Enable support for generating commit messages in multiple languages.
