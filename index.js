#!/usr/bin/env node

import { execFileSync } from 'child_process';
import { GoogleGenAI } from '@google/genai';

function getStagedDiff() {
  try {
    // execFileSync avoids shell quote parsing issues across Windows, macOS, and Linux
    return execFileSync(
      'git',
      ['diff', '--cached', '--', '.', ':!package-lock.json', ':!pnpm-lock.yaml', ':!yarn.lock'],
      { encoding: 'utf8' }
    ).trim();
  } catch (error) {
    console.error('Error: Not a git repository or git command failed.');
    process.exit(1);
  }
}

async function run() {
  const diff = getStagedDiff();

  if (!diff) {
    console.log('No relevant staged code changes found. Use `git add <files>` first.');
    process.exit(0);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Error: GEMINI_API_KEY environment variable is missing.');
    console.error('Set it in your terminal:');
    console.error('  Linux/macOS: export GEMINI_API_KEY="your_api_key"');
    console.error('  Windows CMD: set GEMINI_API_KEY="your_api_key"');
    console.error('  PowerShell:  $env:GEMINI_API_KEY="your_api_key"');
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
You are a senior software engineer. Analyze the following 'git diff' output and write a concise, single-line Conventional Commit message (e.g., feat: ..., fix: ..., refactor: ..., chore: ...).
Do NOT include backticks, markdown formatting, or explanations. Output ONLY the commit message string.

Git Diff:
${diff.slice(0, 4000)}
  `;

  try {
    console.log('Analyzing staged changes with Gemini AI...');
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    console.log('\nSuggested Commit Message:');
    console.log('----------------------------------------');
    console.log(response.text.trim());
    console.log('----------------------------------------\n');
  } catch (err) {
    console.error('\nGemini API Error:', err.message);
  }
}

run();