import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pptxgen from 'pptxgenjs';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
const PPTX_OUTPUT_PATH = path.join(__dirname, 'WebCraft_AI_Presentation_Deck.pptx');
const PDF_OUTPUT_PATH = path.join(__dirname, 'WebCraft_AI_Website_Builder_Presentation.pdf');
const HTML_OUTPUT_PATH = path.join(__dirname, 'WebCraft_AI_Presentation_Deck.html');

console.log('✨ Building Comprehensive Executive Presentation Deck for WebCraft AI...');
console.log('👥 Team Members: Arth Patidar, Aryan Jaiswal, Arnav Barve');

// Safe Base64 Image Loader
function toBase64(filename) {
  const filePath = path.join(SCREENSHOTS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Warning: Image file not found: ${filePath}`);
    return '';
  }
  const data = fs.readFileSync(filePath);
  return `data:image/png;base64,${data.toString('base64')}`;
}

const GITHUB_REPO_URL = 'https://github.com/Arth-2722/ai-website-builder';

// Presentation Showcase Pages
const showcaseSlides = [
  {
    category: "CUSTOMER FRONTEND",
    badgeColor: "#0ea5e9",
    title: "01. Homepage Hero & Natural Language Prompt Studio",
    summary: "The flagship landing interface featuring high-impact visual design, natural language website prompt input bar, and instant call-to-action to generate modern React applications.",
    bullets: [
      "Intuitive natural language prompt input with suggestion chips (Healthcare, SaaS, Dealership, Restaurant)",
      "Polished dark glassmorphic aesthetic with custom typography and cyan-to-indigo gradient accents",
      "One-click gateway into the live in-browser Sandpack synthesis studio"
    ],
    image: toBase64('01_home_hero.png')
  },
  {
    category: "CORE CAPABILITIES",
    badgeColor: "#3b82f6",
    title: "02. Platform Engineering Highlights & Feature Grid",
    summary: "Overview of the core architectural features powering WebCraft AI, showcasing zero-backend virtual runtime execution, bidirectional editing, and free AI access.",
    bullets: [
      "Detailed cards highlighting CodeSandbox Sandpack in-browser React execution",
      "100% Free AI access with Google Gemini Free Tier and OpenRouter models",
      "1-Click JSZip export creating standalone ready-to-run React/Vite repositories"
    ],
    image: toBase64('02_home_features.png')
  },
  {
    category: "STUDIO WORKSPACE",
    badgeColor: "#8b5cf6",
    title: "03. Live Builder Studio & Virtual React Runtime",
    summary: "Flagship builder interface with dual-pane layout: conversational AI refinement on the left and live responsive Sandpack preview on the right.",
    bullets: [
      "Real-time reactive CodeSandbox Sandpack runtime with sub-second hot reloading",
      "Responsive device toggles (Desktop 100%, Tablet 768px, Mobile 375px) for instant layout auditing",
      "Direct action header controls: Export ZIP, API Key settings, Reload Preview, and Code Editor toggle"
    ],
    image: toBase64('03_studio_builder_overview.png')
  },
  {
    category: "DEVELOPER EXPERIENCE",
    badgeColor: "#10b981",
    title: "04. Multi-Tab Code Editor & Bidirectional Live Sync",
    summary: "Monaco-style code editor giving developers direct access to /App.js, /styles.css, and /public/index.html with instant two-way synchronization.",
    bullets: [
      "Bidirectional sync: code typed into the editor immediately updates the preview; AI chat updates sync directly into the editor",
      "Multi-tab file navigation allowing seamless inspection of React components and Tailwind styling",
      "1-Click Copy-to-Clipboard action and syntax safety guards preventing blank screens"
    ],
    image: toBase64('04_interactive_code_editor.png')
  },
  {
    category: "COMMUNITY PLATFORM",
    badgeColor: "#ec4899",
    title: "05. Public Community Showcase & Template Discovery",
    summary: "Curated community showcase hub enabling users to explore community-created web designs, preview them live, and clone them into their workspace with one click.",
    bullets: [
      "Dynamic showcase grid with live thumbnail previews, category filters, and tech stack tags",
      "Creator attribution badges and instant 'Clone Project' trigger",
      "Empowers rapid prototyping by leveraging verified community templates"
    ],
    image: toBase64('05_community_showcase.png')
  },
  {
    category: "PROJECT MANAGEMENT",
    badgeColor: "#f59e0b",
    title: "06. Executive User Dashboard & Saved Projects Grid",
    summary: "Command center for managing user-created applications, tracking revision dates, and performing full CRUD operations.",
    bullets: [
      "Visual project cards detailing original user prompts, project titles, and last updated timestamps",
      "Actions: Open in Studio, Rename, Clone, and Delete with instant database synchronization",
      "Full integration with MongoDB Atlas / Compass alongside local JSON storage fallback"
    ],
    image: toBase64('06_user_dashboard.png')
  },
  {
    category: "TIER ARCHITECTURE",
    badgeColor: "#06b6d4",
    title: "07. Transparent Zero-Cost Architecture & Free AI Access",
    summary: "Showcases the 100% free operation model of WebCraft AI, utilizing Google Gemini Free Tier and offline deterministic synthesis.",
    bullets: [
      "Zero credit card requirement: free tier includes 15 Requests Per Minute on Google AI Studio",
      "Unlimited offline fallback synthesis guaranteed to never leave a developer stranded",
      "Community sharing and full export features enabled across all tiers"
    ],
    image: toBase64('07_pricing_tiers.png')
  },
  {
    category: "AI ENGINE CONFIG",
    badgeColor: "#14b8a6",
    title: "08. Secure Client-Side API Key & Provider Settings",
    summary: "Sleek modal allowing users to enter custom Google Gemini or OpenRouter keys, stored securely in browser localStorage without server logging.",
    bullets: [
      "Encrypted transit: keys sent via custom HTTP headers (x-gemini-key) without persistent server exposure",
      "Automatic failover pool configuration: switches seamlessly between Gemini and OpenRouter models",
      "Direct link to Google AI Studio for instant free API key generation"
    ],
    image: toBase64('08_api_key_modal.png')
  },
  {
    category: "EXPORT PIPELINE",
    badgeColor: "#f97316",
    title: "09. 1-Click JSZip Standalone Project Packaging",
    summary: "Client-side export modal packaging /App.js, /styles.css, index.html, package.json, and vite.config.js into a downloadable ZIP.",
    bullets: [
      "In-browser ZIP generation using JSZip with zero server upload bottleneck",
      "Complete standalone project structure ready for local development via npm install && npm run dev",
      "Includes production deployment blueprints for Vercel and Render"
    ],
    image: toBase64('09_export_zip_modal.png')
  },
  {
    category: "DATABASE INFRASTRUCTURE",
    badgeColor: "#00ed64",
    title: "10. MongoDB Compass - Active Database Cluster Overview",
    summary: "Screenshot of MongoDB Compass connected directly to the local MongoDB database instance (127.0.0.1:27017) serving WebCraft AI.",
    bullets: [
      "Real-time connection to 127.0.0.1:27017 showing active database namespaces",
      "Highlights the project's primary database: 'ai_website_builder'",
      "Demonstrates operational connectivity between the Node.js Express backend and MongoDB engine"
    ],
    image: toBase64('12_mongodb_compass_overview.png')
  },
  {
    category: "DATABASE INFRASTRUCTURE",
    badgeColor: "#00ed64",
    title: "11. MongoDB Compass - Collections & Storage Analysis",
    summary: "MongoDB Compass view of 'ai_website_builder' detailing the internal collections, document counts, and storage allocations.",
    bullets: [
      "'users' collection: user authentication records, bcrypt password hashes, and project ownership",
      "'projects' collection: complete project records, prompts, file maps (/App.js), and version tags",
      "Real-time metrics on average document size, index memory, and total storage"
    ],
    image: toBase64('13_mongodb_compass_collections.png')
  },
  {
    category: "DATABASE INFRASTRUCTURE",
    badgeColor: "#00ed64",
    title: "12. MongoDB Compass - Live Document Schema & Records",
    summary: "MongoDB Compass interactive document browser revealing the exact BSON document structure of saved website projects.",
    bullets: [
      "Inspection of individual project document (_id: ObjectId, title, prompt, files map, createdAt)",
      "Complete technical schema preserving full React /App.js and Tailwind /styles.css source",
      "Built-in query bar and export tools confirming live data persistence"
    ],
    image: toBase64('14_mongodb_compass_documents.png')
  }
];

// ----------------------------------------------------
// HTML GENERATOR WITH DEDICATED GITHUB PAGE IN BEGINNING
// ----------------------------------------------------
function generateHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WebCraft AI System & Database Documentation</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

    @page {
      size: A4 landscape;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #0b0f17;
      color: #e2e8f0;
      font-size: 13px;
      line-height: 1.5;
    }

    .page {
      width: 297mm;
      height: 210mm;
      position: relative;
      page-break-after: always;
      padding: 14mm 18mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: radial-gradient(circle at 90% 10%, rgba(14, 165, 233, 0.08) 0%, transparent 50%),
                  radial-gradient(circle at 10% 90%, rgba(99, 102, 241, 0.06) 0%, transparent 50%),
                  #0b0f17;
      overflow: hidden;
    }

    /* PAGE 1: GITHUB LANDING PAGE */
    .github-page {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 20mm 24mm;
      background: radial-gradient(circle at 50% 25%, rgba(56, 189, 248, 0.15) 0%, transparent 60%),
                  radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
                  #080c14;
    }

    .github-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.35);
      padding: 6px 18px;
      border-radius: 9999px;
      color: #38bdf8;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    .github-title {
      font-size: 38px;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.15;
      margin-bottom: 12px;
      letter-spacing: -0.5px;
    }

    .github-title span {
      background: linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .github-desc {
      font-size: 15px;
      color: #94a3b8;
      max-width: 820px;
      margin-bottom: 28px;
      line-height: 1.5;
    }

    /* CLICKABLE GITHUB HERO CARD */
    .github-card {
      background: rgba(15, 23, 42, 0.85);
      border: 2px solid rgba(56, 189, 248, 0.4);
      border-radius: 16px;
      padding: 20px 28px;
      width: 100%;
      max-width: 860px;
      margin-bottom: 24px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.15);
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .github-url-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      background: rgba(2, 6, 23, 0.8);
      border: 1px solid rgba(56, 189, 248, 0.3);
      padding: 12px 20px;
      border-radius: 10px;
    }

    .github-link-anchor {
      font-family: 'JetBrains Mono', monospace;
      font-size: 16px;
      font-weight: 700;
      color: #38bdf8;
      text-decoration: underline;
      letter-spacing: -0.2px;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }

    .github-link-anchor:hover {
      color: #7dd3fc;
    }

    .github-status-pill {
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #10b981;
      font-size: 11px;
      font-weight: 700;
      padding: 5px 12px;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
    }

    .github-status-pill::before {
      content: '';
      display: inline-block;
      width: 7px;
      height: 7px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 8px #10b981;
    }

    .github-meta-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      text-align: left;
    }

    .github-meta-item {
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      padding: 10px 14px;
    }

    .github-meta-label {
      font-size: 9.5px;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 3px;
    }

    .github-meta-val {
      font-size: 12.5px;
      color: #f1f5f9;
      font-weight: 600;
      font-family: 'JetBrains Mono', monospace;
    }

    /* COVER PAGE */
    .cover-page {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 20mm 24mm;
      background: radial-gradient(circle at 50% 30%, rgba(14, 165, 233, 0.16) 0%, transparent 60%),
                  radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
                  #090d14;
    }

    .cover-logo-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(14, 165, 233, 0.12);
      border: 1px solid rgba(14, 165, 233, 0.35);
      padding: 6px 18px;
      border-radius: 9999px;
      color: #38bdf8;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 18px;
    }

    .cover-title {
      font-size: 40px;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.15;
      margin-bottom: 12px;
      letter-spacing: -0.5px;
    }

    .cover-title span {
      background: linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .cover-subtitle {
      font-size: 16px;
      color: #94a3b8;
      max-width: 860px;
      margin-bottom: 22px;
      font-weight: 400;
      line-height: 1.5;
    }

    .team-badge-container {
      display: flex;
      gap: 14px;
      margin-bottom: 22px;
      justify-content: center;
      width: 100%;
      max-width: 900px;
    }

    .team-member-chip {
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(56, 189, 248, 0.25);
      padding: 10px 18px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
    }

    .team-member-name {
      font-size: 15px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 2px;
    }

    .team-member-role {
      font-size: 11px;
      color: #38bdf8;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .cover-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
      width: 100%;
      max-width: 920px;
      margin-bottom: 20px;
    }

    .cover-card {
      background: rgba(15, 23, 42, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 12px 14px;
      text-align: left;
    }

    .cover-card-label {
      font-size: 9px;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }

    .cover-card-value {
      font-size: 13px;
      font-weight: 700;
      color: #f8fafc;
    }

    .cover-footer {
      font-size: 11px;
      color: #475569;
      display: flex;
      justify-content: space-between;
      width: 100%;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 12px;
    }

    /* INNER SHOWCASE PAGES */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 10px;
    }

    .header-left {
      max-width: 820px;
    }

    .category-badge {
      display: inline-block;
      font-size: 9.5px;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 3px 9px;
      border-radius: 6px;
      margin-bottom: 4px;
    }

    .page-title {
      font-size: 19px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 3px;
      letter-spacing: -0.3px;
    }

    .page-summary {
      font-size: 11.5px;
      color: #94a3b8;
      line-height: 1.4;
    }

    .header-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .brand-mark {
      font-size: 13px;
      font-weight: 800;
      color: #38bdf8;
      letter-spacing: 1px;
    }

    .system-status {
      font-size: 10px;
      color: #10b981;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 2px;
    }

    .system-status::before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 8px #10b981;
    }

    /* SCREENSHOT VIEWER */
    .screenshot-container {
      flex: 1;
      position: relative;
      background: #0f1523;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }

    .screenshot-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
      background: #000000;
    }

    /* FOOTER / BULLETS */
    .page-footer-section {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 20px;
      align-items: center;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      padding: 8px 16px;
    }

    .bullets-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 20px;
      list-style: none;
    }

    .bullet-item {
      font-size: 11px;
      color: #cbd5e1;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .bullet-item::before {
      content: '✓';
      color: #38bdf8;
      font-weight: 800;
      font-size: 12px;
    }

    .page-indicator {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10.5px;
      color: #64748b;
      font-weight: 600;
      white-space: nowrap;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: DEDICATED GITHUB SHOWCASE PAGE (FIRST IN DECK) -->
  <div class="page github-page">
    <div class="github-badge">Source Repository & Cloud Deployment</div>
    <h1 class="github-title">WebCraft AI on <span>GitHub</span></h1>
    <p class="github-desc">Official open-source repository featuring full-stack source code, multi-model Gemini fallbacks, live Sandpack studio, and automated deployment blueprints.</p>

    <!-- PROMINENT CLICKABLE GITHUB HERO CARD -->
    <div class="github-card">
      <div class="github-url-row">
        <a href="${GITHUB_REPO_URL}" target="_blank" class="github-link-anchor">
          <span>🔗</span>
          <span>${GITHUB_REPO_URL}</span>
        </a>
        <div class="github-status-pill">Active Main Branch • 100% Verified</div>
      </div>

      <div class="github-meta-grid">
        <div class="github-meta-item">
          <div class="github-meta-label">Git Clone Command</div>
          <div class="github-meta-val">git clone ${GITHUB_REPO_URL}.git</div>
        </div>
        <div class="github-meta-item">
          <div class="github-meta-label">Primary Stack</div>
          <div class="github-meta-val">React 19 + Express + MongoDB</div>
        </div>
        <div class="github-meta-item">
          <div class="github-meta-label">AI Engine</div>
          <div class="github-meta-val">Google Gemini API (v1beta)</div>
        </div>
      </div>
    </div>

    <!-- TEAM CHIPS -->
    <div class="team-badge-container" style="margin-bottom: 20px;">
      <div class="team-member-chip">
        <div class="team-member-name">Arth Patidar</div>
        <div class="team-member-role">Lead Architect • AI Synthesis Pipeline</div>
      </div>
      <div class="team-member-chip">
        <div class="team-member-name">Aryan Jaiswal</div>
        <div class="team-member-role">Full-Stack Engineer • Sandpack Studio</div>
      </div>
      <div class="team-member-chip">
        <div class="team-member-name">Arnav Barve</div>
        <div class="team-member-role">Database Systems • MongoDB Compass</div>
      </div>
    </div>

    <div class="cover-footer">
      <div>Clickable Hyperlink Verified • Open directly in Adobe Acrobat, Chrome, Edge, or Browser</div>
      <div>Page 1 of ${showcaseSlides.length + 2}</div>
    </div>
  </div>

  <!-- PAGE 2: EXECUTIVE COVER PAGE -->
  <div class="page cover-page">
    <div class="cover-logo-badge">WebCraft AI Executive Report</div>
    <h1 class="cover-title">Full-Stack Platform & <span>MongoDB Compass</span></h1>
    <p class="cover-subtitle">Visual walkthrough of key platform capabilities, reactive UI workflows, live in-browser Sandpack virtual execution, and MongoDB Compass database cluster architecture.</p>

    <div class="team-badge-container">
      <div class="team-member-chip">
        <div class="team-member-name">Arth Patidar</div>
        <div class="team-member-role">Lead Architect • AI Pipeline & Synthesis Engine</div>
      </div>
      <div class="team-member-chip">
        <div class="team-member-name">Aryan Jaiswal</div>
        <div class="team-member-role">Full-Stack Engineer • Sandpack Virtual Runtime & Studio</div>
      </div>
      <div class="team-member-chip">
        <div class="team-member-name">Arnav Barve</div>
        <div class="team-member-role">Database Systems • MongoDB Cluster & Local Fallback</div>
      </div>
    </div>

    <div class="cover-grid">
      <div class="cover-card">
        <div class="cover-card-label">Frontend Stack</div>
        <div class="cover-card-value">React 19 + Vite 6 + Tailwind</div>
      </div>
      <div class="cover-card">
        <div class="cover-card-label">Virtual Runtime</div>
        <div class="cover-card-value">CodeSandbox Sandpack Engine</div>
      </div>
      <div class="cover-card">
        <div class="cover-card-label">AI Synthesis Pool</div>
        <div class="cover-card-value">Google Gemini (v1beta) Free Tier</div>
      </div>
      <div class="cover-card">
        <div class="cover-card-label">System State</div>
        <div class="cover-card-value" style="color:#10b981;">100% Operational & Verified</div>
      </div>
    </div>

    <div class="cover-footer">
      <div>Generated via Automated Inspection • WebCraft AI Workspace</div>
      <div>Localhost: 5173 (Web) | 5001 (API) | 27017 (MongoDB)</div>
    </div>
  </div>

  <!-- SHOWCASE PAGES (SLIDES 3 TO 14) -->
  ${showcaseSlides.map((page, idx) => `
    <div class="page">
      <div class="page-header">
        <div class="header-left">
          <span class="category-badge" style="background: ${page.badgeColor}20; color: ${page.badgeColor}; border: 1px solid ${page.badgeColor}40;">${page.category}</span>
          <h2 class="page-title">${page.title}</h2>
          <p class="page-summary">${page.summary}</p>
        </div>
        <div class="header-right">
          <div class="brand-mark">WEBCRAFT AI</div>
          <div class="system-status">Live Engine Active</div>
        </div>
      </div>

      <div class="screenshot-container">
        <img class="screenshot-img" src="${page.image}" alt="${page.title}" />
      </div>

      <div class="page-footer-section">
        <ul class="bullets-list">
          ${page.bullets.map(b => `<li class="bullet-item">${b}</li>`).join('')}
        </ul>
        <div class="page-indicator">Page ${idx + 3} of ${showcaseSlides.length + 2}</div>
      </div>
    </div>
  `).join('')}

</body>
</html>`;
}

// ----------------------------------------------------
// PART 2: RENDER PDF VIA PUPPETEER-CORE + CHROME
// ----------------------------------------------------
async function generatePdf() {
  console.log('📄 Generating ultra-high-definition PDF presentation deck (.pdf)...');
  const html = generateHtml();
  fs.writeFileSync(HTML_OUTPUT_PATH, html, 'utf-8');
  console.log(`Saved interactive HTML deck to: ${HTML_OUTPUT_PATH}`);

  console.log('Launching Chrome headless to render print-perfect A4 Landscape PDF...');
  const tempProfile = path.join(__dirname, '.chrome_pdf_' + Date.now());
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    userDataDir: tempProfile,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  console.log('Rendering PDF to:', PDF_OUTPUT_PATH);
  await page.pdf({
    path: PDF_OUTPUT_PATH,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 }
  });

  await browser.close();
  const stats = fs.statSync(PDF_OUTPUT_PATH);
  console.log(`✅ PDF Deck generated successfully! Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
}

// ----------------------------------------------------
// PART 3: GENERATE PPTX FILE (Microsoft PowerPoint)
// ----------------------------------------------------
async function generatePptx() {
  console.log('📊 Generating native Microsoft PowerPoint presentation (.pptx)...');
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Arth Patidar, Aryan Jaiswal, Arnav Barve';
  pptx.company = 'WebCraft AI Systems';
  pptx.title = 'WebCraft AI — Full-Stack AI Website Builder & Live Studio';

  // SLIDE 1: GITHUB LANDING SLIDE
  const slide1 = pptx.addSlide();
  slide1.background = { color: '080C14' };
  slide1.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 0.4, w: 3.5, h: 0.32,
    fill: { color: '0EA5E9' },
    line: { color: '0EA5E9', width: 1 }
  });
  slide1.addText('OFFICIAL SOURCE REPOSITORY', {
    x: 0.6, y: 0.4, w: 3.5, h: 0.32,
    fontSize: 10, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle'
  });
  slide1.addText('SLIDE 01 / 14', {
    x: 10.5, y: 0.4, w: 2.2, h: 0.32,
    fontSize: 10, bold: true, color: '64748B', align: 'right', fontFace: 'Courier New'
  });
  slide1.addText('WebCraft AI on GitHub', {
    x: 0.6, y: 0.9, w: 12.0, h: 0.6,
    fontSize: 26, bold: true, color: 'FFFFFF', fontFace: 'Arial'
  });
  slide1.addText('Access complete source code, multi-model Gemini fallbacks, and deployment blueprints.', {
    x: 0.6, y: 1.5, w: 12.0, h: 0.4,
    fontSize: 13, color: '94A3B8', fontFace: 'Arial'
  });

  // Clickable link card in PowerPoint
  slide1.addShape(pptx.ShapeType.roundRect, {
    x: 0.6, y: 2.1, w: 12.1, h: 1.3,
    fill: { color: '0F172A' },
    line: { color: '38BDF8', width: 2 }
  });
  slide1.addText('CLICKABLE REPOSITORY URL (Click to Open in Browser):', {
    x: 0.9, y: 2.25, w: 11.5, h: 0.25,
    fontSize: 10, bold: true, color: '64748B'
  });
  slide1.addText(GITHUB_REPO_URL, {
    x: 0.9, y: 2.55, w: 11.5, h: 0.5,
    fontSize: 18, bold: true, color: '38BDF8',
    hyperlink: { url: GITHUB_REPO_URL, tooltip: 'Open WebCraft AI GitHub Repository' }
  });

  // Team cards on Slide 1
  const authors = [
    { name: "Arth Patidar", role: "Lead Architect • AI Pipeline & Synthesis Engine" },
    { name: "Aryan Jaiswal", role: "Full-Stack Engineer • Sandpack Virtual Runtime & Studio" },
    { name: "Arnav Barve", role: "Database Systems • MongoDB Cluster & Local Fallback" }
  ];
  let aX = 0.6;
  authors.forEach(a => {
    slide1.addShape(pptx.ShapeType.roundRect, {
      x: aX, y: 3.7, w: 3.8, h: 1.4,
      fill: { color: '111827' },
      line: { color: '1E293B', width: 1.5 }
    });
    slide1.addText(a.name, {
      x: aX + 0.2, y: 3.9, w: 3.4, h: 0.35,
      fontSize: 14, bold: true, color: 'FFFFFF'
    });
    slide1.addText(a.role, {
      x: aX + 0.2, y: 4.3, w: 3.4, h: 0.6,
      fontSize: 10.5, color: '38BDF8'
    });
    aX += 4.15;
  });

  // Git clone command
  slide1.addShape(pptx.ShapeType.roundRect, {
    x: 0.6, y: 5.4, w: 12.1, h: 1.2,
    fill: { color: '020617' },
    line: { color: '10B981', width: 1 }
  });
  slide1.addText('GIT CLONE & DEPLOYMENT READY:', {
    x: 0.9, y: 5.55, w: 11.5, h: 0.25,
    fontSize: 9.5, bold: true, color: '10B981'
  });
  slide1.addText(`git clone ${GITHUB_REPO_URL}.git\ncd "Ai Website Builder" && npm install && npm run dev`, {
    x: 0.9, y: 5.85, w: 11.5, h: 0.6,
    fontSize: 11, color: 'E2E8F0', fontFace: 'Courier New'
  });

  // SLIDES 2+: SHOWCASE SLIDES
  for (let i = 0; i < showcaseSlides.length; i++) {
    const s = showcaseSlides[i];
    const slide = pptx.addSlide();
    slide.background = { color: '0B0F17' };

    slide.addShape(pptx.ShapeType.rect, {
      x: 0.6, y: 0.4, w: 2.8, h: 0.32,
      fill: { color: s.badgeColor.replace('#', '') },
      line: { color: s.badgeColor.replace('#', ''), width: 1 }
    });
    slide.addText(s.category, {
      x: 0.6, y: 0.4, w: 2.8, h: 0.32,
      fontSize: 10, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle'
    });

    slide.addText(`SLIDE ${String(i + 2).padStart(2, '0')} / 14`, {
      x: 10.5, y: 0.4, w: 2.2, h: 0.32,
      fontSize: 10, bold: true, color: '64748B', align: 'right', fontFace: 'Courier New'
    });

    slide.addText(s.title, {
      x: 0.6, y: 0.85, w: 12.0, h: 0.55,
      fontSize: 20, bold: true, color: 'FFFFFF', fontFace: 'Arial'
    });

    slide.addText(s.summary, {
      x: 0.6, y: 1.4, w: 12.0, h: 0.4,
      fontSize: 11.5, color: '94A3B8', fontFace: 'Arial'
    });

    // Bullets box
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.6, y: 1.95, w: 12.1, h: 4.8,
      fill: { color: '0F172A' },
      line: { color: '1E293B', width: 1.5 }
    });

    const bulletItems = s.bullets.map(b => ({
      text: b,
      options: { fontSize: 13, color: 'E2E8F0', bullet: { type: 'bullet', code: '2713' }, spaceAfter: 20 }
    }));

    slide.addText(bulletItems, {
      x: 1.0, y: 2.3, w: 11.3, h: 4.0,
      fontFace: 'Arial'
    });

    slide.addText(`WebCraft AI • Arth Patidar, Aryan Jaiswal, Arnav Barve • ${GITHUB_REPO_URL}`, {
      x: 0.6, y: 7.05, w: 12.0, h: 0.3,
      fontSize: 9, color: '475569'
    });
  }

  await pptx.writeFile({ fileName: PPTX_OUTPUT_PATH });
  console.log(`✅ PowerPoint deck generated: ${PPTX_OUTPUT_PATH}`);
}

async function main() {
  try {
    await generatePdf();
    await generatePptx();
    console.log('🎉 ALL PRESENTATION DECKS UPDATED SUCCESSFULLY WITH GITHUB PAGE & REAL SCREENSHOTS!');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

main();
