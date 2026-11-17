const express = require('express');
const router = express.Router();
const { generateWebsite, refineWebsite } = require('../services/aiService');
const { optionalAuth } = require('../middleware/auth');

// @route   POST /api/ai/generate
// @desc    Generate website files from text prompt
router.post('/generate', optionalAuth, async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === '') {
      return res.status(400).json({ success: false, message: 'Please provide a prompt describing the website.' });
    }

    const headerGemini = req.headers['x-gemini-key'];
    const validHeaderGemini = headerGemini && headerGemini.trim().length > 25 ? headerGemini.trim() : null;
    const geminiKey = validHeaderGemini || process.env.GEMINI_API_KEY;
    const openrouterKey = req.headers['x-openrouter-key'] || process.env.OPENROUTER_API_KEY;
    // Prefer gemini if a key is available
    const requestedProvider = req.headers['x-ai-provider'];
    const provider = (requestedProvider && requestedProvider !== 'universal')
      ? requestedProvider
      : (geminiKey ? 'gemini' : openrouterKey ? 'openrouter' : 'universal');

    const customOptions = {
      geminiKey,
      openrouterKey,
      provider
    };

    console.log(`✨ Generating website for prompt: "${prompt.substring(0, 80)}..."`);
    const generatedData = await generateWebsite(prompt, customOptions);

    res.json({
      success: true,
      data: generatedData
    });
  } catch (error) {
    console.error('AI Generation Route Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate website code'
    });
  }
});

// @route   POST /api/ai/refine
// @desc    Iteratively refine website code with follow-up prompt
router.post('/refine', optionalAuth, async (req, res) => {
  try {
    const { prompt, currentFiles } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Please provide an update instruction.' });
    }

    const headerGemini = req.headers['x-gemini-key'];
    const validHeaderGemini = headerGemini && headerGemini.trim().length > 25 ? headerGemini.trim() : null;
    const geminiKey = validHeaderGemini || process.env.GEMINI_API_KEY;
    const openrouterKey = req.headers['x-openrouter-key'] || process.env.OPENROUTER_API_KEY;
    // Prefer gemini if a key is available
    const requestedProvider = req.headers['x-ai-provider'];
    const provider = (requestedProvider && requestedProvider !== 'universal')
      ? requestedProvider
      : (geminiKey ? 'gemini' : openrouterKey ? 'openrouter' : 'universal');

    const customOptions = {
      geminiKey,
      openrouterKey,
      provider
    };

    console.log(`🔄 Refining website: "${prompt.substring(0, 80)}..."`);
    const refinedData = await refineWebsite({ prompt, currentFiles, ...customOptions });

    res.json({
      success: true,
      data: refinedData
    });
  } catch (error) {
    console.error('AI Refinement Route Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to refine website code'
    });
  }
});

// @route   GET /api/ai/status
// @desc    Get current AI configuration & status
router.get('/status', (req, res) => {
  const gemini = !!(req.headers['x-gemini-key'] || process.env.GEMINI_API_KEY);
  const openrouter = !!(req.headers['x-openrouter-key'] || process.env.OPENROUTER_API_KEY);

  res.json({
    success: true,
    provider: req.headers['x-ai-provider'] || process.env.AI_PROVIDER || (gemini ? 'gemini' : openrouter ? 'openrouter' : 'universal-synthesis'),
    hasGeminiKey: gemini,
    hasOpenRouterKey: openrouter,
    isOfflineReady: true
  });
});

module.exports = router;
