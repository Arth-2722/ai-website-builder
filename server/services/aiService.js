const axios = require('axios');
const { generateTemplateFromPrompt } = require('./templateService');

const SYSTEM_PROMPT = `
You are an expert AI Full Stack Web Developer and UI/UX Designer.
Your job is to generate a complete, stunning, production-ready React application based on the user's prompt.
You must output a JSON object containing the files needed for an interactive React application running in CodeSandbox Sandpack.

Guidelines for the code:
1. The main entry must be "/App.js" which default exports a functional React component.
2. Use Tailwind CSS classes for styling (Tailwind CDN is pre-loaded).
3. The UI must be modern, responsive, visually appealing, with great typography, contrast, buttons, badges, and layout. If the user specifies an aesthetic theme (such as retro, vintage, 70s/80s, cyberpunk, neon, minimalist, or brutalist), strictly implement that complete visual aesthetic throughout typography (font-serif/mono), color scheme, pixel offset drop shadows (e.g. shadow-[4px_4px_0px_0px_#92400e]), chunky borders, badges, and thematic copywriting.
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
async function generateWebsite(prompt, options = {}) {
  const geminiKey = options.geminiKey || process.env.GEMINI_API_KEY;
  const openrouterKey = options.openrouterKey || process.env.OPENROUTER_API_KEY;
  const provider = options.provider || process.env.AI_PROVIDER || (geminiKey ? 'gemini' : openrouterKey ? 'openrouter' : 'universal');

  try {
    if (provider === 'gemini' && geminiKey && geminiKey.trim() !== '') {
      console.log('🤖 Generating website using Google Gemini Free API...');
      return await callGemini(geminiKey, prompt);
    }

    if (provider === 'openrouter' && openrouterKey && openrouterKey.trim() !== '') {
      console.log('🤖 Generating website using OpenRouter Free Model...');
      return await callOpenRouter(openrouterKey, prompt);
    }

    // Default or Fallback to built-in universal smart template engine
    console.log('🤖 Using built-in universal synthesis engine (Zero-API Key / Offline)...');
    return generateTemplateFromPrompt(prompt);
  } catch (error) {
    console.warn(`⚠️ Primary AI generation encountered an error: ${error.message}`);
    console.log('ℹ️ Smoothly falling back to built-in universal synthesis engine...');
    return generateTemplateFromPrompt(prompt);
  }
}

/**
 * Refine/Edit an existing website using follow-up prompt
 */
async function refineWebsite({ prompt, currentFiles, geminiKey: optGemini, openrouterKey: optOpenRouter, provider: optProvider }) {
  const geminiKey = optGemini || process.env.GEMINI_API_KEY;
  const openrouterKey = optOpenRouter || process.env.OPENROUTER_API_KEY;

  const currentCode = typeof currentFiles === 'object' ? JSON.stringify(currentFiles, null, 2) : String(currentFiles);

  const refinementPrompt = `
CURRENT PROJECT FILES:
${currentCode}

USER MODIFICATION REQUEST:
${prompt}

Instructions:
1. Apply the user's requested modifications while preserving existing features and structure.
2. If the user specifies an aesthetic theme (such as retro, vintage, 70s/80s, cyberpunk, neon, minimalist, or brutalist), completely restyle the UI components, typography, color palette, borders, pixel offset drop shadows, badges, and copywriting to match that aesthetic.
3. Return the complete updated project files in the exact same JSON format with keys: title, description, files.
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

    // Fallback: Check if user is asking for a new category, redesign, or theme switch
    const lower = (prompt || '').toLowerCase();
    const isThemeSwitch =
      lower.includes('retro') ||
      lower.includes('vintage') ||
      lower.includes('70s') ||
      lower.includes('80s') ||
      lower.includes('90s') ||
      lower.includes('cyberpunk') ||
      lower.includes('neon') ||
      lower.includes('minimal') ||
      lower.includes('brutalist') ||
      lower.includes('theme') ||
      lower.includes('aesthetic') ||
      lower.includes('style');

    const isRedesignPrompt =
      isThemeSwitch ||
      lower.includes('hospital') ||
      lower.includes('clinic') ||
      lower.includes('medical') ||
      lower.includes('doctor') ||
      lower.includes('portfolio') ||
      lower.includes('restaurant') ||
      lower.includes('food') ||
      lower.includes('shop') ||
      lower.includes('store') ||
      lower.includes('ecommerce') ||
      lower.includes('gym') ||
      lower.includes('fitness') ||
      lower.includes('saas') ||
      lower.includes('make a website') ||
      lower.includes('create a website') ||
      lower.includes('build a website') ||
      lower.includes('redesign');

    if (isRedesignPrompt) {
      console.log('🤖 Redesign or theme switch prompt detected in chat! Generating full matching template...');
      let effectivePrompt = prompt;
      if (isThemeSwitch && !lower.includes('hospital') && !lower.includes('restaurant') && !lower.includes('gym') && !lower.includes('car') && !lower.includes('law') && !lower.includes('shop')) {
        const currentCodeStr = typeof currentFiles === 'object' ? JSON.stringify(currentFiles) : String(currentFiles);
        const codeLower = currentCodeStr.toLowerCase();
        let detectedIndustry = 'hospital';
        if (codeLower.includes('cardiology') || codeLower.includes('patient') || codeLower.includes('hospital') || codeLower.includes('medical')) {
          detectedIndustry = 'hospital';
        } else if (codeLower.includes('pasta') || codeLower.includes('chef') || codeLower.includes('dining') || codeLower.includes('restaurant')) {
          detectedIndustry = 'restaurant';
        } else if (codeLower.includes('vehicle') || codeLower.includes('dealership') || codeLower.includes('auto') || codeLower.includes('motor')) {
          detectedIndustry = 'car dealership';
        } else if (codeLower.includes('gym') || codeLower.includes('workout') || codeLower.includes('fitness')) {
          detectedIndustry = 'fitness gym';
        } else if (codeLower.includes('attorney') || codeLower.includes('law') || codeLower.includes('litigation')) {
          detectedIndustry = 'law firm';
        } else if (codeLower.includes('property') || codeLower.includes('estate') || codeLower.includes('realtor')) {
          detectedIndustry = 'real estate';
        } else if (codeLower.includes('shop') || codeLower.includes('product') || codeLower.includes('store')) {
          detectedIndustry = 'ecommerce store';
        }
        effectivePrompt = `${detectedIndustry} website ${prompt}`;
      }
      return generateTemplateFromPrompt(effectivePrompt);
    }

    // If existing App.js can be modified for colors or headings
    const updatedFiles = { ...currentFiles };
    let appCode = updatedFiles['/App.js'] || updatedFiles['App.js'];

    if (appCode) {
      if (lower.includes('emerald') || lower.includes('green')) {
        appCode = appCode.replace(/cyan-/g, 'emerald-').replace(/indigo-/g, 'emerald-').replace(/blue-/g, 'teal-');
      } else if (lower.includes('purple') || lower.includes('violet')) {
        appCode = appCode.replace(/cyan-/g, 'purple-').replace(/emerald-/g, 'purple-').replace(/blue-/g, 'violet-');
      } else if (lower.includes('amber') || lower.includes('gold') || lower.includes('orange')) {
        appCode = appCode.replace(/cyan-/g, 'amber-').replace(/indigo-/g, 'amber-').replace(/blue-/g, 'orange-');
      }
      updatedFiles['/App.js'] = appCode;
    }

    return {
      title: 'Updated Website',
      description: `Modified based on: ${prompt}`,
      files: updatedFiles
    };
  } catch (error) {
    console.warn(`⚠️ Refinement error: ${error.message}`);
    return generateTemplateFromPrompt(prompt);
  }
}

module.exports = {
  generateWebsite,
  refineWebsite
};
