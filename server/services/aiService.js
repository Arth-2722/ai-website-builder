const axios = require('axios');
const path = require('path');
const { generateTemplateFromPrompt } = require('./templateService');

const SYSTEM_PROMPT = `
You are a Principal Frontend Architect and World-Class UI/UX Designer (Awwwards, Linear, Stripe, Apple caliber).
Your job is to generate a breathtaking, bespoke, highly interactive React web application tailored specifically to the user's prompt.

NEVER generate generic, boring, or cookie-cutter websites (avoid plain centered text with 3 identical box cards).
Instead, craft rich, award-winning digital experiences:

DESIGN & ARCHITECTURAL STANDARDS:
1. Entry Point: "/App.js" must default export a complete, production-ready React functional component.
2. Styling: Use rich Tailwind CSS (Tailwind CDN is preloaded).
3. Visual Depth & Atmosphere:
   - Subtle background gradients, atmospheric radial mesh glows (e.g. bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]).
   - Glassmorphic navigation (backdrop-blur-xl bg-slate-950/80 border-b border-white/10) with logo pill, menu links, and primary action button.
   - High-contrast typography with gradient headline accents and clean tracking.
4. Rich Section Architecture:
   - Hero Section: Striking headline, compelling subcopy, dual CTA buttons, social proof avatar face-pile with star reviews ("★ 4.9/5 from 3,200+ clients"), plus a live interactive preview widget or floating dashboard card.
   - Bento Grid Showcase: Dynamic asymmetric layout (e.g. 1 wide featured capability card with interactive metrics + 2 tall accent cards + interactive state toggles).
   - Interactive Tabs or Dynamic Filter: Real React state allowing the visitor to switch categories, view modes, services, or pricing tiers.
   - High-Quality Imagery: Embed real Unsplash photography placeholders tailored to the topic (e.g., https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop for medical/healthcare, etc.) with rounded-2xl or rounded-3xl borders.
   - Testimonials / Social Proof: Real review cards with reviewer names, roles, avatars, and star ratings.
   - Interactive Conversion Section: Interactive booking form, appointment scheduler, pricing calculator, or inquiry console with real input state, validation, and success modal/banner.
   - Polished Footer: Brand identity, quick links, status ticker ("● All Systems Operational"), newsletter subscription bar, and copyright.
5. Stylistic Themes:
   - If the user asks for RETRO/VINTAGE: Deep sepia/amber/stone-950 palette, font-serif editorial headings, font-mono typewriter telemetry, hard offset 3D box shadows (shadow-[5px_5px_0px_0px_#92400e]), chunky borders, archival badges (EST. 1978), stamped dossier receipts.
   - If the user asks for CYBERPUNK/NEON: Deep black background, electric cyan and neon fuchsia glows, monospace headers, scanline accents, matrix data telemetry.
   - If the user asks for MINIMALIST/BRUTALIST: Stark monochrome high-contrast black & white, bold geometric borders, monospace typography, zero gradients.
6. Code Quality:
   - Complete, self-contained, working React code. No placeholders, no '// implement here' comments, no broken imports.
   - Lucide-react icons can be used or clean SVG/Unicode icons.
   - Use standard React hooks (useState, useEffect) for all interactive states.
7. CONCISENESS & TOKEN BUDGET (CRITICAL):
   - You MUST write compact, modular React code under 140-160 lines.
   - Use concise mock data arrays (2-3 items max per section).
   - Ensure the component closes completely. NEVER exceed token limits so the JSON is always 100% valid and complete.

OUTPUT FORMAT:
Output strictly valid JSON with keys: "title", "description", "files" (containing "/App.js", "/styles.css", "/public/index.html").
Do NOT wrap in markdown backticks.
`;

const GEMINI_MODELS = [
  'gemini-flash-latest',
  'gemini-flash-lite-latest',
  'gemini-3.8-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash'
];

/**
 * Call Google Gemini Free Tier API with resilient multi-model fallback
 */
async function callGemini(apiKey, prompt, systemInstruction = SYSTEM_PROMPT) {
  let lastError = null;

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

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
      const finishReason = candidate?.finishReason;
      if (finishReason === 'MAX_TOKENS') {
        throw new Error(`Gemini (${model}) hit MAX_TOKENS limit (response was truncated)`);
      }
      const text = candidate?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error(`Gemini (${model}) returned an empty response`);
      }

      console.log(`✓ Gemini model "${model}" generated content successfully!`);
      return cleanAndParseJSON(text);
    } catch (err) {
      lastError = err;
      const status = err.response?.status;
      const msg = err.response?.data?.error?.message || err.message;
      console.warn(`⚠️ Gemini model "${model}" notice (${status}): ${msg}. Trying next fallback model...`);

      // If invalid API key (400), don't retry other models
      if (status === 400 && msg.includes('API key not valid')) {
        throw err;
      }
    }
  }

  throw lastError || new Error('All Gemini model endpoints failed');
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
      'HTTP-Referer': 'http://localhost:5001',
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

function normalizeProjectJSON(parsed) {
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('AI output is not a valid object');
  }

  const normalized = {
    title: parsed.title || 'AI Generated Website',
    description: parsed.description || 'Generated with AI Website Builder',
    files: {}
  };

  const rawFiles = parsed.files || {};
  Object.entries(rawFiles).forEach(([key, val]) => {
    const normalizedKey = key.startsWith('/') ? key : `/${key}`;
    normalized.files[normalizedKey] = typeof val === 'string' ? val : (val?.code || String(val || ''));
  });

  // Ensure /App.js exists
  if (!normalized.files['/App.js'] && normalized.files['/App.jsx']) {
    normalized.files['/App.js'] = normalized.files['/App.jsx'];
  }

  // Ensure /styles.css exists
  if (!normalized.files['/styles.css']) {
    normalized.files['/styles.css'] = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`;
  }

  // Ensure /public/index.html exists
  if (!normalized.files['/public/index.html']) {
    normalized.files['/public/index.html'] = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${normalized.title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-slate-950">
    <div id="root"></div>
  </body>
</html>`;
  }

  return normalized;
}

/**
 * Extract project and App.js via regex fallback when JSON has syntax/control character issues
 */
function extractProjectViaRegex(text) {
  const codeBlockMatch = text.match(/```(?:jsx|javascript|react)?\s*([\s\S]*?)```/i);
  if (codeBlockMatch && codeBlockMatch[1] && codeBlockMatch[1].includes('export default')) {
    return {
      title: 'AI Generated Website',
      description: 'Generated with AI',
      files: {
        '/App.js': codeBlockMatch[1].trim()
      }
    };
  }

  const titleMatch = text.match(/"title"\s*:\s*"([^"]+)"/i);
  const descMatch = text.match(/"description"\s*:\s*"([^"]+)"/i);

  let appCode = null;
  const appIndex = text.indexOf('/App.js');
  if (appIndex !== -1) {
    const colonIndex = text.indexOf(':', appIndex);
    if (colonIndex !== -1) {
      const firstQuote = text.indexOf('"', colonIndex);
      if (firstQuote !== -1) {
        let codeSection = text.substring(firstQuote + 1);
        const endQuote = codeSection.lastIndexOf('"');
        if (endQuote > 0) {
          codeSection = codeSection.substring(0, endQuote);
        }
        try {
          appCode = JSON.parse('"' + codeSection + '"');
        } catch (e) {
          appCode = codeSection
            .replace(/\\n/g, '\n')
            .replace(/\\"/g, '"')
            .replace(/\\t/g, '\t')
            .replace(/\\\\/g, '\\');
        }
      }
    }
  }

  if (!appCode) {
    const appFuncIndex = text.indexOf('export default');
    if (appFuncIndex !== -1) {
      appCode = text.substring(appFuncIndex);
    } else {
      throw new Error('Failed to parse AI output as JSON or extract App.js');
    }
  }

  return {
    title: titleMatch ? titleMatch[1] : 'AI Generated Website',
    description: descMatch ? descMatch[1] : 'Generated with AI',
    files: {
      '/App.js': appCode
    }
  };
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

  let parsed = null;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    // Attempt 1: Locate first { and last }
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const extracted = cleaned.substring(firstBrace, lastBrace + 1);
      try {
        parsed = JSON.parse(extracted);
      } catch (e2) {
        parsed = extractProjectViaRegex(cleaned);
      }
    } else {
      parsed = extractProjectViaRegex(cleaned);
    }
  }

  return normalizeProjectJSON(parsed);
}

/**
 * Robust React JSX syntax validator using Babel parser
 */
function validateReactCode(code) {
  if (!code || typeof code !== 'string') return false;
  try {
    const babel = require(path.resolve(__dirname, '../../client/node_modules/@babel/parser'));
    babel.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    return true;
  } catch (e) {
    console.warn(`⚠️ React code JSX syntax validation warning: ${e.message}`);
    return false;
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
      const result = await callGemini(geminiKey, prompt);
      if (result && result.files && validateReactCode(result.files['/App.js'])) {
        return result;
      }
      console.warn('⚠️ Gemini generated code failed JSX validation, using high-aesthetic template engine...');
      return generateTemplateFromPrompt(prompt);
    }

    if (provider === 'openrouter' && openrouterKey && openrouterKey.trim() !== '') {
      console.log('🤖 Generating website using OpenRouter Free Model...');
      const result = await callOpenRouter(openrouterKey, prompt);
      if (result && result.files && validateReactCode(result.files['/App.js'])) {
        return result;
      }
      return generateTemplateFromPrompt(prompt);
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

  let appCode = '';
  if (currentFiles && typeof currentFiles === 'object') {
    appCode = currentFiles['/App.js'] || currentFiles['App.js'] || JSON.stringify(currentFiles);
  } else {
    appCode = String(currentFiles || '');
  }

  const condensedCurrentCode = appCode.length > 8000 ? appCode.substring(0, 8000) + '\n// ... rest of component' : appCode;

  const refinementPrompt = `
CURRENT REACT CODE (/App.js):
${condensedCurrentCode}

USER MODIFICATION REQUEST:
${prompt}

Instructions:
1. Apply the user's requested modifications while preserving existing features and working functionality.
2. If the user specifies an aesthetic theme (such as retro, vintage, 70s/80s, cyberpunk, neon, minimalist, or brutalist), completely restyle the UI components, typography, color palette, borders, pixel offset drop shadows, badges, and copywriting to match that aesthetic.
3. CONCISENESS (CRITICAL): Keep the code compact, modular, and under 150 lines. Keep mock data short (2-3 items). Ensure all JSX tags close cleanly before reaching token limits.
4. Return strictly valid JSON with keys: "title", "description", "files" (containing "/App.js", "/styles.css", "/public/index.html").
`;

  try {
    if (geminiKey && geminiKey.trim() !== '') {
      console.log('🤖 Refining website with Gemini Free API...');
      const result = await callGemini(geminiKey, refinementPrompt);
      if (result && result.files && validateReactCode(result.files['/App.js'])) {
        return result;
      }
      console.warn('⚠️ Gemini refined code failed JSX validation, using matching redesign engine...');
      return generateTemplateFromPrompt(prompt);
    }

    if (openrouterKey && openrouterKey.trim() !== '') {
      console.log('🤖 Refining website with OpenRouter Free Model...');
      const result = await callOpenRouter(openrouterKey, refinementPrompt);
      if (result && result.files && validateReactCode(result.files['/App.js'])) {
        return result;
      }
      return generateTemplateFromPrompt(prompt);
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
