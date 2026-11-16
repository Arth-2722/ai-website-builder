const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const { isMongoConnected, getLocalStore } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_change_in_production_12345';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (isMongoConnected()) {
      req.user = await UserModel.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not found in database' });
      }
    } else {
      const store = getLocalStore();
      const found = store.users.find(u => u.id === decoded.id || u._id === decoded.id);
      if (!found) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }
      const { password, ...userWithoutPassword } = found;
      req.user = userWithoutPassword;
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token verification failed or expired' });
  }
};

// Optional auth: attaches user if token is present, continues otherwise
const optionalAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (isMongoConnected()) {
      req.user = await UserModel.findById(decoded.id).select('-password');
    } else {
      const store = getLocalStore();
      const found = store.users.find(u => u.id === decoded.id || u._id === decoded.id);
      if (found) {
        const { password, ...userWithoutPassword } = found;
        req.user = userWithoutPassword;
      }
    }
  } catch (err) {
    // Ignore invalid optional tokens
  }
  next();
};

module.exports = { protect, optionalAuth, JWT_SECRET };
