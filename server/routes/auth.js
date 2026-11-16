const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User');
const { protect, JWT_SECRET } = require('../middleware/auth');
const { isMongoConnected, getLocalStore, saveLocalStore } = require('../config/db');

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (isMongoConnected()) {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists with this email' });
      }

      const user = await UserModel.create({ name, email, password });
      return res.status(201).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          credits: user.credits
        },
        token: generateToken(user._id)
      });
    } else {
      // Local store fallback
      const store = getLocalStore();
      const existing = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return res.status(400).json({ success: false, message: 'User already exists with this email' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = {
        id: 'usr_' + Date.now(),
        name,
        email,
        password: hashedPassword,
        credits: 50,
        createdAt: new Date().toISOString()
      };

      store.users.push(newUser);
      saveLocalStore(store);

      return res.status(201).json({
        success: true,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          credits: newUser.credits
        },
        token: generateToken(newUser.id)
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    if (isMongoConnected()) {
      const user = await UserModel.findOne({ email });
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      return res.json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          credits: user.credits
        },
        token: generateToken(user._id)
      });
    } else {
      const store = getLocalStore();
      const user = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      return res.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          credits: user.credits
        },
        token: generateToken(user.id)
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// @route   POST /api/auth/demo
// @desc    Quick 1-click demo guest login
router.post('/demo', async (req, res) => {
  try {
    const demoEmail = 'guest@builder.ai';
    const demoName = 'Demo Creator';

    if (isMongoConnected()) {
      let user = await UserModel.findOne({ email: demoEmail });
      if (!user) {
        user = await UserModel.create({
          name: demoName,
          email: demoEmail,
          password: 'demopassword123',
          credits: 100
        });
      }
      return res.json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          credits: user.credits
        },
        token: generateToken(user._id)
      });
    } else {
      const store = getLocalStore();
      let user = store.users.find(u => u.email === demoEmail);
      if (!user) {
        user = {
          id: 'usr_demo_123',
          name: demoName,
          email: demoEmail,
          password: 'hashed_demo_pw',
          credits: 100,
          createdAt: new Date().toISOString()
        };
        store.users.push(user);
        saveLocalStore(store);
      }
      return res.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          credits: user.credits
        },
        token: generateToken(user.id)
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create demo session' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
router.get('/me', protect, async (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

module.exports = router;
