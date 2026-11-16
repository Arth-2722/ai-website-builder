const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

let isConnectedToMongo = false;
const localDataDir = path.join(__dirname, '../data');
const localStorePath = path.join(localDataDir, 'localStore.json');

// Initialize local fallback store
function initLocalStore() {
  if (!fs.existsSync(localDataDir)) {
    fs.mkdirSync(localDataDir, { recursive: true });
  }
  if (!fs.existsSync(localStorePath)) {
    const defaultData = {
      users: [],
      projects: []
    };
    fs.writeFileSync(localStorePath, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
}

function getLocalStore() {
  initLocalStore();
  try {
    const raw = fs.readFileSync(localStorePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return { users: [], projects: [] };
  }
}

function saveLocalStore(data) {
  initLocalStore();
  fs.writeFileSync(localStorePath, JSON.stringify(data, null, 2), 'utf-8');
}

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.trim() === '') {
    console.log('ℹ️ No MONGODB_URI provided in .env. Running seamlessly with local resilient JSON storage fallback.');
    initLocalStore();
    isConnectedToMongo = false;
    return;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(` MongoDB Connected: ${conn.connection.host}`);
    isConnectedToMongo = true;
  } catch (error) {
    console.warn(`⚠️ MongoDB connection error: ${error.message}`);
    console.log('ℹ️ Falling back seamlessly to local JSON storage for development.');
    initLocalStore();
    isConnectedToMongo = false;
  }
};

module.exports = {
  connectDB,
  isMongoConnected: () => isConnectedToMongo,
  getLocalStore,
  saveLocalStore
};
