# Gemini Commit CLI

`gemini-commit-cli` is a lightweight Command-Line Interface (CLI) utility built with Node.js and the Google Gemini API (`@google/genai`). It inspects locally staged Git changes (`git diff --cached`) and automatically generates standardized [Conventional Commit](https://www.conventionalcommits.org/) messages.

## Features

- **Automated Summaries:** Real-time analysis of modified, added, or deleted lines of code.
- **Conventional Commits:** Output strictly adheres to conventional formats (`feat:`, `fix:`, `refactor:`, `chore:`, etc.).
- **Cross-Platform:** Native support for Windows (Command Prompt & PowerShell), macOS, and Linux.
- **Privacy-Focused Scope:** Inspects only staged diffs (`git diff --cached`), ignoring unstaged code and lockfiles (`package-lock.json`, etc.).
- **Global Tooling:** Executable globally across any local repository via `npm link`.

## Prerequisites

- **Node.js**: `v18.0.0` or higher
- **Gemini API Key**: A free key from [Google AI Studio](https://aistudio.google.com/).

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Soul-Warrior/Gemini_Commit_CLI.git](https://github.com/Soul-Warrior/Gemini_Commit_CLI.git)
   cd Gemini_Commit_CLI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Link executable globally:**
   ```bash
   npm link
   ```

4. **Set your Gemini API Key:**

   - **macOS / Linux:**
     ```bash
     export GEMINI_API_KEY="your_api_key_here"
     ```
   - **Windows (CMD):**
     ```cmd
     set GEMINI_API_KEY="your_api_key_here"
     ```
   - **Windows (PowerShell):**
     ```powershell
     $env:GEMINI_API_KEY="your_api_key_here"
     ```

## Usage

1. Stage changes in any Git repository:
   ```bash
   git add .
   ```

2. Run the CLI command:
   ```bash
   gemini-commit
   ```

3. Copy the suggested commit message and commit your changes:
   ```bash
   git commit -m "chore: initialize package.json for gemini-commit-cli"
   ```

## Safeguards & Configuration

- **Lockfile Exclusions:** Automatically ignores heavy dependency files like `package-lock.json`, `pnpm-lock.yaml`, and `yarn.lock` during diff generation.
- **Diff Truncation:** Caps input diffs at 4,000 characters to manage API context limits effectively.
- **Model:** Powered by `gemini-3.6-flash` for rapid terminal response times.