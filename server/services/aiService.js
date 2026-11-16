const axios = require('axios');
const { generateTemplateFromPrompt } = require('./templateService');

const SYSTEM_PROMPT = `
You are an expert AI Full Stack Web Developer and UI/UX Designer.
Your job is to generate a complete, stunning, production-ready React application based on the user's prompt.
You must output a JSON object containing the files needed for an interactive React application running in CodeSandbox Sandpack.

Guidelines for the code:
1. The main entry must be "/App.js" which default exports a functional React component.
2. Use Tailwind CSS classes for styling (Tailwind CDN is pre-loaded).
3. The UI must be modern, responsive, visually appealing, with great typography, contrast, buttons, badges, and layout.
4. Support interactive state (e.g., active tabs, mobile menu toggles, modal dialogs, calculators, form submissions, filter pills).
5. Output ONLY valid JSON in the following format, with NO Markdown backticks around it:
{
  "title": "Short descriptive title of the website",
  "description": "One sentence summary of the website",
  "files": {
    "/App.js": "// complete React component code",
    "/styles.css": "/* optional custom css */",
    "/public/index.html": "<!DOCTYPE html><html><head><meta charset='UTF-8'/><meta name='viewport' content='width=device-width, initial-scale=1.0'/><script src='https://cdn.tailwindcss.com'></script></head><body><div id='root'></div></body></html>"
  }
}
`;

/**
 * Call Google Gemini Free Tier API
 */
async function callGemini(apiKey, prompt, systemInstruction = SYSTEM_PROMPT) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `${systemInstruction}\n\nUSER PROMPT: ${prompt}\n\nReturn strictly valid JSON only.`
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json'
    }
  };

  const response = await axios.post(url, payload, {
    headers: { 'Content-Type': 'application/json' },
    timeout: 60000
  });

  const candidate = response.data?.candidates?.[0];
  const text = candidate?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Gemini API returned an empty response');
  }

  return cleanAndParseJSON(text);
}

/**
 * Call OpenRouter Free Models
 */
async function callOpenRouter(apiKey, prompt, systemInstruction = SYSTEM_PROMPT) {
  const url = 'https://openrouter.ai/api/v1/chat/completions';

  // Use popular free models on OpenRouter
  const model = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.2-3b-instruct:free';

  const payload = {
    model: model,
    messages: [
      { role: 'system', content: systemInstruction },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7
  };

  const response = await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:5000',
      'X-Title': 'AI Website Builder'
    },
    timeout: 60000
  });

  const content = response.data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('OpenRouter API returned an empty response');
  }

  return cleanAndParseJSON(content);
}

/**
 * Safe JSON cleanup and parser
 */
function cleanAndParseJSON(rawText) {
  let cleaned = rawText.trim();
  // Strip Markdown code blocks if model added them
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```\s*$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/```\s*$/, '');
  }
  cleaned = cleaned.trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    // Attempt to locate first { and last }
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const extracted = cleaned.substring(firstBrace, lastBrace + 1);
      return JSON.parse(extracted);
    }
    throw new Error(`Failed to parse AI output as JSON: ${err.message}`);
  }
}

/**
 * Generate a website from user prompt
 */
async function generateWebsite(prompt) {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openrouterKey = process.env.OPENROUTER_API_KEY;
  const provider = process.env.AI_PROVIDER || (geminiKey ? 'gemini' : openrouterKey ? 'openrouter' : 'template');

  try {
    if (provider === 'gemini' && geminiKey && geminiKey.trim() !== '') {
      console.log('🤖 Generating website using Google Gemini Free API...');
      return await callGemini(geminiKey, prompt);
    }

    if (provider === 'openrouter' && openrouterKey && openrouterKey.trim() !== '') {
      console.log('🤖 Generating website using OpenRouter Free Model...');
      return await callOpenRouter(openrouterKey, prompt);
    }

    // Default or Fallback to built-in smart template engine
    console.log('🤖 Using built-in smart template engine (Zero-API Key / Offline)...');
    return generateTemplateFromPrompt(prompt);
  } catch (error) {
    console.warn(`⚠️ Primary AI generation encountered an error: ${error.message}`);
    console.log('ℹ️ Smoothly falling back to built-in smart template engine...');
    return generateTemplateFromPrompt(prompt);
  }
}

/**
 * Refine/Edit an existing website using follow-up prompt
 */
async function refineWebsite({ prompt, currentFiles }) {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openrouterKey = process.env.OPENROUTER_API_KEY;

  const currentCode = typeof currentFiles === 'object' ? JSON.stringify(currentFiles, null, 2) : String(currentFiles);

  const refinementPrompt = `
CURRENT PROJECT FILES:
${currentCode}

USER MODIFICATION REQUEST:
${prompt}

Apply the requested changes to the code while preserving existing features and structure.
Return the complete updated project files in the exact same JSON format with keys: title, description, files.
`;

  try {
    if (geminiKey && geminiKey.trim() !== '') {
      console.log('🤖 Refining website with Gemini Free API...');
      return await callGemini(geminiKey, refinementPrompt);
    }

    if (openrouterKey && openrouterKey.trim() !== '') {
      console.log('🤖 Refining website with OpenRouter Free Model...');
      return await callOpenRouter(openrouterKey, refinementPrompt);
    }

    // Fallback: If no API key, smartly tweak title and return files
    return {
      title: 'Updated Website',
      description: `Modified based on: ${prompt}`,
      files: currentFiles
    };
  } catch (error) {
    console.warn(`⚠️ Refinement error: ${error.message}`);
    return {
      title: 'Website',
      description: 'Preserved current version',
      files: currentFiles
    };
  }
}

module.exports = {
  generateWebsite,
  refineWebsite
};
