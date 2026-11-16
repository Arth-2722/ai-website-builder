const express = require('express');
const router = express.Router();
const ProjectModel = require('../models/Project');
const { isMongoConnected, getLocalStore } = require('../config/db');
const { generateTemplateFromPrompt } = require('../services/templateService');

// Seed community examples if empty
const COMMUNITY_TEMPLATES = [
  {
    _id: 'comm_1',
    id: 'comm_1',
    title: 'NovaFlow - AI SaaS Landing Page',
    prompt: 'Create a modern AI SaaS automation platform landing page with dark theme and pricing',
    description: 'Sleek dark-mode SaaS page with animated components and live metrics mockup.',
    likesCount: 142,
    isPublic: true,
    ...generateTemplateFromPrompt('saas automation workflow')
  },
  {
    _id: 'comm_2',
    id: 'comm_2',
    title: 'Alex Rivers - Portfolio',
    prompt: 'Minimalist creative developer and UI designer portfolio with project filter',
    description: 'Ultra-clean portfolio with interactive filter tabs and responsive layout.',
    likesCount: 98,
    isPublic: true,
    ...generateTemplateFromPrompt('developer designer portfolio')
  },
  {
    _id: 'comm_3',
    id: 'comm_3',
    title: 'L’Osteria Bella - Italian Dining',
    prompt: 'Warm artisanal Italian restaurant website with menu and table booking',
    description: 'Elegant restaurant layout featuring categorized menu and reservation form.',
    likesCount: 84,
    isPublic: true,
    ...generateTemplateFromPrompt('italian restaurant menu booking')
  },
  {
    _id: 'comm_4',
    id: 'comm_4',
    title: 'KicksVault - Sneaker Store',
    prompt: 'High-energy e-commerce storefront for sneakers with shopping bag counter',
    description: 'Fast modern e-commerce storefront with active cart counter.',
    likesCount: 112,
    isPublic: true,
    ...generateTemplateFromPrompt('sneaker store ecommerce')
  }
];

// @route   GET /api/community
// @desc    Get all public showcase templates
router.get('/', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const publicProjects = await ProjectModel.find({ isPublic: true }).sort({ likesCount: -1 });
      const combined = [...COMMUNITY_TEMPLATES, ...publicProjects];
      return res.json({ success: true, count: combined.length, data: combined });
    } else {
      const store = getLocalStore();
      const localPublic = (store.projects || []).filter(p => p.isPublic);
      const combined = [...COMMUNITY_TEMPLATES, ...localPublic];
      return res.json({ success: true, count: combined.length, data: combined });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve community projects' });
  }
});

module.exports = router;
