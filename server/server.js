const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { connectDB } = require('./config/db');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB or local storage fallback
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/community', require('./routes/community'));

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Production: Serve React Client build
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../client/dist');
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(clientBuildPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('AI Website Builder Backend is running. Run client with `npm run dev:client`');
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 AI Website Builder Server listening on port ${PORT}`);
    console.log(`🌐 API Endpoint: http://localhost:${PORT}/api`);
  });
}

module.exports = app;
