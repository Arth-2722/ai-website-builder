# WebCraft AI - Full Stack MERN AI Website Builder SaaS

A full-stack AI Website Builder SaaS application built with **React (Vite)**, **Tailwind CSS**, **Node.js/Express**, and **Sandpack (CodeSandbox)** live in-browser preview, using **100% Free AI APIs** (Google Gemini Free Tier & OpenRouter Free Models) with an intelligent zero-config offline fallback engine.

---

## 🌟 Key Features

- **Text Prompt to Full Website:** Type any natural language prompt (e.g., *"Modern SaaS landing page with dark theme, pricing table, and feature highlights"*) and generate complete React applications instantly.
- **CodeSandbox Sandpack Live Preview:** Instant in-browser React execution and live rendering with responsive device controls (Desktop, Tablet, Mobile).
- **Interactive Code Editor:** Edit generated React and CSS code with real-time updates to the preview.
- **AI Iterative Refinement & Chat:** Request design tweaks, new sections, or theme changes through a conversational AI assistant.
- **1-Click ZIP Export:** Uses `jszip` to package all files into a ready-to-run React/Vite project complete with `package.json` and dependencies.
- **Zero Paid Dependencies / 100% Free AI APIs:**
  - **Google Gemini API Free Tier:** 15 Requests Per Minute free at Google AI Studio (zero credit card needed).
  - **OpenRouter Free Models:** Free access to open models (`meta-llama/llama-3.2-3b-instruct:free`, `deepseek/deepseek-r1:free`).
  - **Built-in Smart Template Engine:** Built-in offline fallback templates (SaaS, Portfolio, Restaurant, E-commerce) so the builder functions immediately even without an API key!
- **Free Built-in Authentication:** JWT authentication with bcrypt password hashing + 1-Click Guest Demo Login.
- **Database Flexibility:** Supports MongoDB Atlas (free M0 cluster) with automatic resilient local JSON storage fallback so the app never crashes.
- **Production-Ready & Deployable:** Easily deployed as a single unified service or split across Vercel, Render, Railway, or Netlify.

---

## 📁 Project Architecture & File Hierarchy

```
Ai Website Builder/
├── package.json                 # Root script runner for concurrent dev & full-stack build/start
├── .env.example                 # Environment variables blueprint
├── .gitignore                   # Ignore node_modules, dist, .env
├── vercel.json                  # Vercel deployment configuration
├── render.yaml                  # Render free tier blueprint
├── README.md                    # Documentation & setup guide
│
├── server/                      # Express Backend
│   ├── package.json             # Backend dependencies: express, cors, dotenv, mongoose, jsonwebtoken, bcryptjs, axios
│   ├── server.js                # Express app, API middleware, routes, static client build serving
│   ├── config/
│   │   └── db.js                # MongoDB connection with automatic resilient local storage fallback
│   ├── models/
│   │   ├── User.js              # User schema (name, email, password, credits)
│   │   └── Project.js           # Project schema (title, prompt, files map, templateType, versions)
│   ├── middleware/
│   │   └── auth.js              # JWT verification & optional auth middleware
│   ├── routes/
│   │   ├── auth.js              # Register, login, me, and 1-click demo guest login
│   │   ├── ai.js                # /api/ai/generate, /api/ai/refine, /api/ai/status
│   │   ├── projects.js          # CRUD operations for user projects
│   │   └── community.js         # Public showcase projects & cloning
│   └── services/
│       ├── aiService.js         # AI prompt orchestrator (Google Gemini Free + OpenRouter Free)
│       └── templateService.js   # Built-in smart offline template engine
│
└── client/                      # React Frontend (Vite + Tailwind CSS)
    ├── package.json             # Frontend dependencies
    ├── index.html               # Main HTML entry
    ├── vite.config.js           # Vite configuration with API proxy
    ├── tailwind.config.js       # Tailwind CSS theme extension
    ├── postcss.config.js        # PostCSS configuration
    └── src/
        ├── App.jsx              # Main routing & notification toast provider
        ├── main.jsx             # React DOM root with BrowserRouter & AuthProvider
        ├── index.css            # Tailwind directives, fonts, and glowing effects
        ├── context/
        │   └── AuthContext.jsx  # Authentication state & helper functions
        ├── utils/
        │   ├── api.js           # Configured Axios instance with auto JWT attachment
        │   └── zipExport.js     # JSZip bundler to export runnable project archives
        ├── components/
        │   ├── Navbar.jsx       # Header with logo, navigation, new project button, user menu
        │   ├── Footer.jsx       # Footer with branding & links
        │   ├── AuthModal.jsx    # Sign in / Register modal with quick demo login
        │   ├── CodeEditor.jsx   # Interactive code editor with line numbers & copy button
        │   ├── LivePreview.jsx  # Live Sandpack sandbox with multi-device switcher
        │   ├── ChatSidebar.jsx  # AI assistant sidebar with chat history & suggestion chips
        │   ├── FileExplorer.jsx # Tree view of generated project files
        │   ├── ExportModal.jsx  # Download as ZIP, share link, and deployment guidance
        │   └── ProjectCard.jsx  # Project card for dashboard & community showcase
        └── pages/
            ├── Home.jsx         # Landing page with hero prompt generator & sample chips
            ├── Builder.jsx      # Core AI Website Builder workspace
            ├── Dashboard.jsx    # User's saved projects management
            └── Community.jsx    # Showcase of community created websites
```

---

## 📦 Required Dependencies Overview

### Backend (`server/package.json`):
- `express`: Core REST API web server.
- `cors`: Cross-Origin Resource Sharing.
- `dotenv`: Loads configuration from `.env`.
- `mongoose`: MongoDB ODM.
- `jsonwebtoken`: Free, self-hosted JWT authentication.
- `bcryptjs`: Password hashing.
- `axios`: HTTP requests for calling free AI APIs.
- `nodemon` (dev): Auto-reload on backend changes.

### Frontend (`client/package.json`):
- `react` & `react-dom`: UI component library.
- `react-router-dom`: Client-side routing.
- `axios`: Backend API client.
- `lucide-react`: Modern SVG icon set.
- `@codesandbox/sandpack-react`: In-browser live React sandbox and code editor.
- `react-hot-toast`: Sleek toast notifications.
- `jszip`: Bundles generated files into downloadable `.zip` archives.
- `lodash.debounce`: Debounces code saving and typing events.
- `tailwindcss`, `postcss`, `autoprefixer` (dev): Styling framework.
- `vite` & `@vitejs/plugin-react` (dev): Next-generation frontend tooling.

### Root (`package.json`):
- `concurrently` (dev): Runs both server and client in a single command.

---

## 🔑 How to Configure Free AI Keys

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. **Option A: Google Gemini Free API (Recommended)**:
   - Visit [Google AI Studio](https://aistudio.google.com/).
   - Click **Get API key** and create a key (100% free, 15 requests per minute, no credit card required).
   - Add to `.env`:
     ```env
     GEMINI_API_KEY=your_gemini_api_key_here
     ```

3. **Option B: OpenRouter Free Models**:
   - Visit [OpenRouter](https://openrouter.ai/).
   - Sign up and generate a free API key.
   - Add to `.env`:
     ```env
     OPENROUTER_API_KEY=your_openrouter_api_key_here
     ```

4. **Option C: Zero-API Offline Mode**:
   - Leave both keys blank! The built-in smart template engine will automatically generate rich, responsive multi-section React websites offline for testing.

---

## 🚀 Running Locally

1. Install dependencies for all parts:
   ```bash
   npm run install:all
   ```
2. Start both server and client together:
   ```bash
   npm run dev
   ```
   - Frontend will open at: `http://localhost:5173`
   - Backend will run at: `http://localhost:5000`

---

## ☁️ Deployment

- **Unified Deployment (Render / Railway / Heroku / AWS)**:
  - Run `npm run build`
  - Start with `npm start` (the Express server serves both the API and the React client build from `client/dist`).
- **Vercel**:
  - Pre-configured with `vercel.json` for seamless zero-configuration serverless deployment.
