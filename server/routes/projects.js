const express = require('express');
const router = express.Router();
const ProjectModel = require('../models/Project');
const { protect, optionalAuth } = require('../middleware/auth');
const { isMongoConnected, getLocalStore, saveLocalStore } = require('../config/db');

// @route   GET /api/projects
// @desc    Get all projects for the authenticated user (or recent guest projects)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const userId = req.user ? (req.user._id || req.user.id) : null;

    if (isMongoConnected()) {
      const query = userId ? { user: userId } : { isPublic: true };
      const projects = await ProjectModel.find(query).sort({ updatedAt: -1 });
      return res.json({ success: true, count: projects.length, data: projects });
    } else {
      const store = getLocalStore();
      let projects = store.projects || [];
      if (userId) {
        projects = projects.filter(p => p.userId === userId || p.user === userId);
      }
      return res.json({ success: true, count: projects.length, data: projects });
    }
  } catch (error) {
    console.error('Fetch projects error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve projects' });
  }
});

// @route   POST /api/projects
// @desc    Create a new project
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { title, prompt, description, files, isPublic } = req.body;
    const userId = req.user ? (req.user._id || req.user.id) : null;

    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Project prompt is required' });
    }

    if (isMongoConnected()) {
      const project = await ProjectModel.create({
        title: title || 'Untitled AI Website',
        prompt,
        description: description || '',
        files: files || {},
        isPublic: isPublic || false,
        user: userId
      });

      return res.status(201).json({ success: true, data: project });
    } else {
      const store = getLocalStore();
      const newProject = {
        _id: 'proj_' + Date.now(),
        id: 'proj_' + Date.now(),
        title: title || 'Untitled AI Website',
        prompt,
        description: description || '',
        files: files || {},
        isPublic: isPublic || false,
        userId: userId,
        likesCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      store.projects = store.projects || [];
      store.projects.unshift(newProject);
      saveLocalStore(store);

      return res.status(201).json({ success: true, data: newProject });
    }
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ success: false, message: 'Failed to create project' });
  }
});

// @route   GET /api/projects/:id
// @desc    Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      const project = await ProjectModel.findById(id);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.json({ success: true, data: project });
    } else {
      const store = getLocalStore();
      const project = (store.projects || []).find(p => p._id === id || p.id === id);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.json({ success: true, data: project });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving project' });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project (files, title, etc.)
router.put('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, files, description, isPublic } = req.body;

    if (isMongoConnected()) {
      const project = await ProjectModel.findById(id);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }

      if (title) project.title = title;
      if (files) project.files = files;
      if (description !== undefined) project.description = description;
      if (isPublic !== undefined) project.isPublic = isPublic;

      await project.save();
      return res.json({ success: true, data: project });
    } else {
      const store = getLocalStore();
      store.projects = store.projects || [];
      const index = store.projects.findIndex(p => p._id === id || p.id === id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }

      if (title) store.projects[index].title = title;
      if (files) store.projects[index].files = files;
      if (description !== undefined) store.projects[index].description = description;
      if (isPublic !== undefined) store.projects[index].isPublic = isPublic;
      store.projects[index].updatedAt = new Date().toISOString();

      saveLocalStore(store);
      return res.json({ success: true, data: store.projects[index] });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update project' });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
router.delete('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      await ProjectModel.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Project removed successfully' });
    } else {
      const store = getLocalStore();
      store.projects = (store.projects || []).filter(p => p._id !== id && p.id !== id);
      saveLocalStore(store);
      return res.json({ success: true, message: 'Project removed successfully' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete project' });
  }
});

module.exports = router;
