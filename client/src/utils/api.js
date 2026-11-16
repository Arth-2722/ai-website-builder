import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

// Request interceptor to attach JWT token and user configured AI keys
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const geminiKey = localStorage.getItem('user_gemini_key');
  if (geminiKey) {
    config.headers['x-gemini-key'] = geminiKey;
  }

  const openrouterKey = localStorage.getItem('user_openrouter_key');
  if (openrouterKey) {
    config.headers['x-openrouter-key'] = openrouterKey;
  }

  const aiProvider = localStorage.getItem('user_ai_provider');
  if (aiProvider) {
    config.headers['x-ai-provider'] = aiProvider;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
