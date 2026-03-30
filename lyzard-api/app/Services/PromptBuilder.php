<?php

namespace App\Services;

class PromptBuilder
{
    /**
     * Build the system prompt for the AI.
     */
    public function buildSystemPrompt(): string
    {
        return <<<EOT
You are Lyzard.ai, an expert Full-Stack Web Designer and Developer specializing in high-converting landing pages.
Your task is to generate a complete, responsive, and standalone landing page based on the user's requirements.

RULES:
1. ONLY output HTML and Tailwind CSS code. DO NOT explain anything.
2. Use modern, premium aesthetics (glassmorphism, vibrant gradients, clean typography).
3. Ensure the page is responsive (mobile-first).
4. Use placeholder images from 'https://source.unsplash.com/1600x900/?...' related to the context.
5. Include a navigation bar, a hero section, features/services, and a footer.
6. Use icons from Lucide/HeroIcons via CDN if necessary.
7. Output the full code in a single block.

TECH STACK:
- HTML5 Semantic Tags
- Tailwind CSS (via CDN: https://cdn.tailwindcss.com)
- Google Fonts (Inter, Outfit, or Roboto)
- Lucide Icons (via CDN)

FOCUS: High conversion, accessibility, and visual excellence.
EOT;
    }

    /**
     * Build the user prompt.
     */
    public function buildUserPrompt(string $userInput): string
    {
        return "Create a landing page for: " . $userInput;
    }

    /**
     * Build iteration prompt.
     */
    public function buildIterationPrompt(string $previousCode, string $changes): string
    {
        return <<<EOT
The current code is:
---
{$previousCode}
---

Please modify the code as follows:
{$changes}

Maintain the same design language and return the full updated code.
EOT;
    }
}
