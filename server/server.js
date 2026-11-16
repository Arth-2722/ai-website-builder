const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { connectDB } = require('./config/db');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5001;

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
  const startServer = (portToTry) => {
    const serverInstance = app.listen(portToTry, () => {
      console.log(`🚀 AI Website Builder Server listening on port ${portToTry}`);
      console.log(`🌐 API Endpoint: http://localhost:${portToTry}/api`);
    });

    serverInstance.on('error', (err) => {
      if (err.code === 'EADDRINUSE' || err.code === 'EACCES') {
        const nextPort = Number(portToTry) + 1;
        console.warn(`⚠️ Port ${portToTry} is unavailable (${err.code}). Trying port ${nextPort}...`);
        startServer(nextPort);
      } else {
        console.error('Server startup error:', err);
      }
    });
  };

  startServer(PORT);
}

module.exports = app;
