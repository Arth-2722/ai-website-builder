import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pptxgen from 'pptxgenjs';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PPTX_OUTPUT_PATH = path.join(__dirname, 'WebCraft_AI_Presentation_Deck.pptx');
const PDF_OUTPUT_PATH = path.join(__dirname, 'WebCraft_AI_Website_Builder_Presentation.pdf');
const HTML_OUTPUT_PATH = path.join(__dirname, 'WebCraft_AI_Presentation_Deck.html');

console.log('✨ Starting presentation generation for WebCraft AI...');
console.log('👥 Team Members: Arth Patidar, Aryan Jaiswal, Arnav Barve');

// 15 Comprehensive Slides Data
const slidesData = [
  {
    slideNum: "01",
    category: "EXECUTIVE OVERVIEW",
    badgeColor: "#0ea5e9",
    title: "WebCraft AI — Full-Stack AI Website Builder & Live Studio",
    subtitle: "Production-Grade Generative UI Platform with Real-Time Sandpack Execution, Multi-Model Gemini AI Fallbacks & Resilient MongoDB Architecture",
    tagline: "From Natural Language Prompt to Production-Ready React Application in Seconds",
    bullets: [
      "Zero-Config React 19 + Vite 6 + Tailwind CSS instant in-browser synthesis",
      "Real-time reactive CodeSandbox Sandpack virtual runtime with zero backend build queues",
      "Resilient multi-model Gemini API fallback pool with pre-render Babel JSX AST syntax validation",
      "Enterprise full-stack persistence with MongoDB Atlas / Compass & automatic local JSON fallback"
    ],
    mockupType: "cover",
    metrics: [
      { label: "Frontend Stack", val: "React 19 • Vite 6 • Tailwind" },
      { label: "Backend API", val: "Node.js • Express REST API" },
      { label: "AI Synthesis Pool", val: "Google Gemini Free Tier (v1beta)" },
      { label: "Database Cluster", val: "MongoDB Atlas / Compass + JSON Fallback" }
    ]
  },
  {
    slideNum: "02",
    category: "PROJECT VISION & PROBLEM STATEMENT",
    badgeColor: "#f43f5e",
    title: "Addressing Core Friction in Modern Web Engineering",
    subtitle: "Bridging the gap between conceptual prompt design and production-grade reactive software development.",
    summary: "Traditional website creation requires manual boilerplate scaffolding, dependency management, and styling hours. Existing AI builders output rigid, generic templates with high failure rates.",
    bullets: [
      "Eliminates hours of boilerplate setup by auto-scaffolding complete multi-file React architectures",
      "Overcomes AI hallucinations through AST validation and strict token budgeting guidelines",
      "Provides bidirectional code synchronization so developers maintain 100% control over the generated source",
      "Operates 100% free with zero required credit cards using Google Gemini Free Tier and OpenRouter models"
    ],
    mockupType: "comparison"
  },
  {
    slideNum: "03",
    category: "CORE SYSTEM ARCHITECTURE",
    badgeColor: "#6366f1",
    title: "End-to-End System Architecture & Data Flow",
    subtitle: "Decoupled full-stack architecture ensuring sub-second preview compilation and zero single point of failure.",
    summary: "A robust client-server design where the Express gateway orchestrates AI generation and database operations, while the client executes virtual Sandpack environments client-side.",
    bullets: [
      "RESTful API Gateway running Express on port 5001 with dynamic port collision resolution",
      "Decoupled execution: code synthesis occurs via server-side AI, while compilation runs client-side in Sandpack",
      "Stateless JWT authentication paired with optional auth guards and 1-Click Guest Demo access",
      "Synchronized dual-engine fallback: server templateService and client clientTemplateService remain in exact parity"
    ],
    mockupType: "architecture"
  },
  {
    slideNum: "04",
    category: "GENERATIVE UI ENGINE",
    badgeColor: "#8b5cf6",
    title: "Prompt-to-Website Generative UI Engine",
    subtitle: "Natural language comprehension turning complex user prompts into bespoke multi-section web apps.",
    summary: "The synthesis engine analyzes domain intent, archetype requirements, and aesthetic constraints to author complete React applications with zero placeholders or missing imports.",
    bullets: [
      "Dynamic industry recognition: Healthcare, Automotive, SaaS, E-Commerce, Fine Dining, Real Estate, and Portfolios",
      "Synthesizes complete tripartite file bundle: /App.js (React Component), /styles.css (Tailwind CDN), and /public/index.html",
      "Injects high-resolution Unsplash photography placeholders tailored specifically to the recognized industry archetype",
      "Auto-generates functional React state hooks (useState, useEffect) for interactive filters, modals, and calculators"
    ],
    mockupType: "generator"
  },
  {
    slideNum: "05",
    category: "IN-BROWSER EXECUTION ENGINE",
    badgeColor: "#ec4899",
    title: "Client-Side CodeSandbox Sandpack Virtual Runtime",
    subtitle: "Isolated browser-based React compilation running with zero backend queue latency.",
    summary: "Powered by CodeSandbox Sandpack, WebCraft AI executes modern React code directly within an isolated virtual iframe sandbox, completely eliminating server build overhead.",
    bullets: [
      "Instantaneous hot-reloading: code updates reflect in milliseconds without restarting or rebuilding",
      "Multi-device responsive viewport switcher: 1-click toggling between Desktop (100%), Tablet (768px), and Mobile (375px)",
      "Zero server execution vulnerability: all third-party code evaluates safely inside isolated browser workers",
      "Native Tailwind CSS integration via preloaded CDN with complete utility class support"
    ],
    mockupType: "sandpack"
  },
  {
    slideNum: "06",
    category: "DEVELOPER EXPERIENCE",
    badgeColor: "#3b82f6",
    title: "Bidirectional Code Synchronization & Editor",
    subtitle: "Real-time two-way sync connecting visual live preview and source code manipulation.",
    summary: "Developers are never locked into AI output. The integrated Monaco-style code editor provides direct access to all project files with instant bidirectional updates.",
    bullets: [
      "Multi-tab file navigation allowing seamless inspection of /App.js, /styles.css, and /public/index.html",
      "Bidirectional sync: code typed into the editor updates Sandpack live; AI chat refinements update the editor in real-time",
      "1-Click Copy-to-Clipboard and live canvas refresh controls for effortless testing",
      "Robust state safety: prevents malformed intermediate keystrokes from crashing the parent application"
    ],
    mockupType: "editor"
  },
  {
    slideNum: "07",
    category: "CONVERSATIONAL REFINEMENT PIPELINE",
    badgeColor: "#14b8a6",
    title: "Conversational AI Refinement & Redesign Engine",
    subtitle: "Iterative natural language chat assistant for continuous styling, feature additions, and theme pivots.",
    summary: "Users refine generated websites through a dedicated conversational sidebar. The backend analyzes existing code state and applies targeted enhancements without losing existing functionality.",
    bullets: [
      "Context-aware refinement: injects existing /App.js into the prompt while pruning boilerplate to prevent token overflow",
      "Smart intent classification: detects whether the user wants targeted feature tweaks or complete aesthetic transformations",
      "Bespoke theme switching triggers: Retro 70s/80s, Cyberpunk Neon, Minimalist Brutalist, and Corporate Bento",
      "Smooth fallback guarantee: if API quotas or network drops occur, the local redesign engine applies requested changes offline"
    ],
    mockupType: "chat"
  },
  {
    slideNum: "08",
    category: "VISUAL DESIGN SYSTEM",
    badgeColor: "#f59e0b",
    title: "Awwwards-Caliber Bento Grid & Styling System",
    subtitle: "Eliminating cookie-cutter layouts in favor of asymmetric Bento grids, atmospheric glows, and rich interactions.",
    summary: "WebCraft AI enforces modern design standards inspired by Linear, Stripe, and Apple, replacing generic centered boxes with award-winning digital experiences.",
    bullets: [
      "Split hero architecture with atmospheric radial mesh gradients, verified social proof stacks, and floating telemetry cards",
      "Asymmetric Bento grid showcases with dynamic capability cards, live triage consoles, and real React state filters",
      "Specialized retro engine: sepia/amber palettes, editorial serif headings, monospace telemetry, and hard 3D box shadows",
      "Conversion-focused components: interactive consultation booking, quote estimators, and form validation modals"
    ],
    mockupType: "bentogrid"
  },
  {
    slideNum: "09",
    category: "AI INFRASTRUCTURE & RESILIENCE",
    badgeColor: "#10b981",
    title: "Multi-Model Gemini Fallback Pool & Token Budgeting",
    subtitle: "Bulletproof Google AI Studio integration with automatic failover and Babel AST syntax validation.",
    summary: "To ensure 99.9% uptime on Google's free tier, WebCraft AI employs a multi-model fallback cascade with token budgeting that completely prevents truncated JSON parse errors.",
    bullets: [
      "Sequential model fallback pool: gemini-flash-latest → gemini-flash-lite-latest → gemini-3.8-flash → gemini-3.5-flash-lite",
      "Demand spike mitigation: automatically intercepts HTTP 503 errors and fails over to the next active Google endpoint",
      "Token budget enforcement: constrains JSX output to high-density modular blocks to prevent MAX_TOKENS string cutoffs",
      "Pre-render Babel AST syntax parsing: validates JSX AST integrity before returning code to the Sandpack preview"
    ],
    mockupType: "geminipool"
  },
  {
    slideNum: "10",
    category: "OFFLINE RESILIENCE",
    badgeColor: "#06b6d4",
    title: "Zero-API Offline Synthesis Engine",
    subtitle: "Deterministic local template synthesis guaranteeing 100% operation with zero API keys and zero internet.",
    summary: "WebCraft AI features a comprehensive built-in synthesis engine with specialized archetypes and dynamic keyword extraction, ensuring the studio functions even in completely offline environments.",
    bullets: [
      "Comprehensive knowledge base covering Healthcare, Dealerships, SaaS, Restaurants, Gyms, Law Firms, and Portfolios",
      "Dynamic prompt keyword parser adapting titles, services, team rosters, and badges to match user prompts",
      "Zero API key requirement: students and evaluators can explore the entire studio without signing up for API keys",
      "Identical dual-sided implementation: clientTemplateService guarantees the browser never displays a blank error screen"
    ],
    mockupType: "offline"
  },
  {
    slideNum: "11",
    category: "WORKSPACE & COLLABORATION",
    badgeColor: "#a855f7",
    title: "Project Management, Dashboard & Community Showcase",
    subtitle: "Complete lifecycle management for generated applications with public community sharing.",
    summary: "Users organize, revisit, and export their creations through a responsive dashboard, or explore curated community templates for rapid scaffolding.",
    bullets: [
      "Full project CRUD operations: create, rename, duplicate, update, and delete web projects with instant DB sync",
      "Community Showcase hub: discover community-created designs, view live previews, and clone projects with 1 click",
      "Project version snapshots: preserve code iterations during generative sessions for risk-free experimentation",
      "Clean UI built with Tailwind CSS and responsive grid cards showcasing live thumbnail previews and tech badges"
    ],
    mockupType: "community"
  },
  {
    slideNum: "12",
    category: "DATABASE INFRASTRUCTURE",
    badgeColor: "#00ed64",
    title: "MongoDB Compass Cluster & Resilient Storage",
    subtitle: "Enterprise data persistence with live MongoDB Compass monitoring and automatic local JSON storage failover.",
    summary: "WebCraft AI connects to MongoDB Atlas or local MongoDB instances via Mongoose, providing visual inspection in MongoDB Compass alongside an automatic failover to local JSON storage.",
    bullets: [
      "Mongoose document models: Users (auth, bcrypt hashes, credits) and Projects (title, prompt, files map, version history)",
      "MongoDB Compass integration: visual exploration of collections, indexes, storage allocation, and BSON documents",
      "Resilient local JSON engine: if MongoDB is unreachable, the system automatically writes to localStore.json without throwing errors",
      "Zero-downtime database reconnects: handles transient network drops gracefully without crashing the server process"
    ],
    mockupType: "mongodb"
  },
  {
    slideNum: "13",
    category: "COMMERCE & EXPORT PIPELINE",
    badgeColor: "#f97316",
    title: "1-Click ZIP Export & Production Cloud Deployment",
    subtitle: "Client-side ZIP packaging and production blueprints for Vercel, Render, and GitHub.",
    summary: "WebCraft AI empowers users to take their code anywhere. Projects export as fully packaged, standalone React applications ready for production deployment.",
    bullets: [
      "Client-side ZIP compilation using JSZip: packages /App.js, /styles.css, index.html, package.json, and vite.config.js",
      "Self-contained output: exported projects can be unzipped and run locally via npm install && npm run dev",
      "Turnkey Vercel blueprint (vercel.json) pre-configured for static frontend routing and serverless API execution",
      "Turnkey Render blueprint (render.yaml) pre-configured for 1-click full-stack deployment on free cloud instances"
    ],
    mockupType: "export"
  },
  {
    slideNum: "14",
    category: "SECURITY & AUTHENTICATION",
    badgeColor: "#eab308",
    title: "Security Architecture & Key Management",
    subtitle: "Stateless JWT authentication, encrypted header transit, and zero server key leakage.",
    summary: "Built following modern security best practices, protecting both user identities and sensitive third-party API credentials across all network boundaries.",
    bullets: [
      "Stateless JWT tokens with bcrypt password hashing (10 salt rounds) and secure HTTP headers",
      "1-Click Guest Demo Login: enables instant full-featured evaluation without requiring real email registration",
      "Client-side API key modal: custom user keys stored in localStorage and passed via x-gemini-key headers without server logging",
      "Strict .gitignore hygiene: private keys in .env are quarantined from git history, while .env.example serves as a public template"
    ],
    mockupType: "security"
  },
  {
    slideNum: "15",
    category: "TEAM CREDITS & PROJECT SUMMARY",
    badgeColor: "#0ea5e9",
    title: "Engineering Team, Key Accomplishments & Conclusion",
    subtitle: "WebCraft AI successfully demonstrates a production-grade, zero-cost AI SaaS architecture.",
    summary: "Built and engineered as an end-to-end full-stack SaaS platform by Arth Patidar, Aryan Jaiswal, and Arnav Barve.",
    bullets: [
      "Arth Patidar — Lead Architect: AI Synthesis Pipeline, Multi-Model Gemini Fallback Pool, Token Budgeting & Bento Grid Engine",
      "Aryan Jaiswal — Full-Stack Engineer: In-Browser Sandpack Virtual Runtime, Bidirectional Code Editor & JSZip Export Suite",
      "Arnav Barve — Database & UI Systems Engineer: MongoDB Architecture, Express REST Gateway & Resilient Storage Failover",
      "100% Verified & GitHub-Ready: Clean git history, zero Babel syntax errors, and turnkey cloud deployment blueprints"
    ],
    mockupType: "team"
  }
];

// ----------------------------------------------------
// PART 1: GENERATE PPTX FILE (Microsoft PowerPoint)
// ----------------------------------------------------
async function generatePptx() {
  console.log('📊 Generating native Microsoft PowerPoint presentation (.pptx)...');
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Arth Patidar, Aryan Jaiswal, Arnav Barve';
  pptx.company = 'WebCraft AI Systems';
  pptx.title = 'WebCraft AI — Full-Stack AI Website Builder & Live Studio';

  for (const slideData of slidesData) {
    const slide = pptx.addSlide();
    slide.background = { color: '0B0F17' };

    // Slide Header Bar
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.6, y: 0.4, w: 2.2, h: 0.32,
      fill: { color: slideData.badgeColor.replace('#', '') },
      line: { color: slideData.badgeColor.replace('#', ''), width: 1 }
    });
    slide.addText(slideData.category, {
      x: 0.6, y: 0.4, w: 2.2, h: 0.32,
      fontSize: 10, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle'
    });

    slide.addText(`SLIDE ${slideData.slideNum} / 15`, {
      x: 10.5, y: 0.4, w: 2.2, h: 0.32,
      fontSize: 10, bold: true, color: '64748B', align: 'right', fontFace: 'Courier New'
    });

    // Main Slide Title
    slide.addText(slideData.title, {
      x: 0.6, y: 0.85, w: 12.0, h: 0.65,
      fontSize: 22, bold: true, color: 'FFFFFF', fontFace: 'Arial'
    });

    // Subtitle
    slide.addText(slideData.subtitle, {
      x: 0.6, y: 1.45, w: 12.0, h: 0.4,
      fontSize: 12, color: '94A3B8', fontFace: 'Arial'
    });

    // Left Column: Key Features / Bullets Card
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.6, y: 2.0, w: 6.2, h: 4.8,
      fill: { color: '111827' },
      line: { color: '1E293B', width: 1.5 }
    });

    slide.addText('KEY ARCHITECTURAL HIGHLIGHTS', {
      x: 0.85, y: 2.2, w: 5.7, h: 0.3,
      fontSize: 11, bold: true, color: slideData.badgeColor.replace('#', ''), fontFace: 'Arial'
    });

    const bulletItems = slideData.bullets.map(b => ({
      text: b,
      options: { fontSize: 11, color: 'E2E8F0', bullet: { type: 'bullet', code: '2713' }, spaceAfter: 12 }
    }));

    slide.addText(bulletItems, {
      x: 0.85, y: 2.6, w: 5.7, h: 4.0,
      fontFace: 'Arial'
    });

    // Right Column: Architecture / Component Showcase Card
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 7.1, y: 2.0, w: 5.6, h: 4.8,
      fill: { color: '0F172A' },
      line: { color: '334155', width: 1.5 }
    });

    if (slideData.slideNum === "01") {
      // Cover slide right side: Metrics & Authors
      slide.addText('PROJECT AUTHORS & CORE ROLES', {
        x: 7.35, y: 2.2, w: 5.1, h: 0.3,
        fontSize: 11, bold: true, color: '38BDF8', fontFace: 'Arial'
      });

      const teamInfo = [
        { name: "Arth Patidar", role: "Lead Architect • AI Pipeline & Synthesis Engine" },
        { name: "Aryan Jaiswal", role: "Full-Stack Engineer • Sandpack Virtual Runtime & Studio" },
        { name: "Arnav Barve", role: "Database Systems • MongoDB Cluster & Local Fallback" }
      ];

      let startY = 2.65;
      teamInfo.forEach(t => {
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 7.35, y: startY, w: 5.1, h: 0.7,
          fill: { color: '1E293B' },
          line: { color: '0EA5E9', width: 1 }
        });
        slide.addText(t.name, {
          x: 7.55, y: startY + 0.08, w: 4.7, h: 0.28,
          fontSize: 13, bold: true, color: 'FFFFFF'
        });
        slide.addText(t.role, {
          x: 7.55, y: startY + 0.36, w: 4.7, h: 0.25,
          fontSize: 9.5, color: '94A3B8'
        });
        startY += 0.82;
      });

      // System specs card
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 7.35, y: 5.2, w: 5.1, h: 1.35,
        fill: { color: '090D14' },
        line: { color: '10B981', width: 1 }
      });
      slide.addText('SYSTEM STATUS: 100% VERIFIED & PRODUCTION READY', {
        x: 7.5, y: 5.3, w: 4.8, h: 0.25,
        fontSize: 10, bold: true, color: '10B981'
      });
      slide.addText('• Google Gemini Free Tier v1beta connected & tested\n• Sandpack in-browser React execution verified (0 errors)\n• MongoDB Compass connected + local JSON resilient fallback', {
        x: 7.5, y: 5.58, w: 4.8, h: 0.85,
        fontSize: 9.5, color: 'CBD5E1'
      });
    } else if (slideData.slideNum === "15") {
      // Final slide right side: Detailed Team Contributions
      slide.addText('TEAM CONTRIBUTIONS BREAKDOWN', {
        x: 7.35, y: 2.2, w: 5.1, h: 0.3,
        fontSize: 11, bold: true, color: '38BDF8', fontFace: 'Arial'
      });

      const credits = [
        { name: "Arth Patidar", title: "AI Pipeline & Design Architecture", desc: "Designed the multi-model Gemini pool, token budgeting protocols, regex AST recovery, and the Awwwards Bento grid styling engine." },
        { name: "Aryan Jaiswal", title: "Virtual Runtime & Studio Frontend", desc: "Integrated CodeSandbox Sandpack for zero-backend client execution, multi-device viewport controls, and 1-click JSZip project export." },
        { name: "Arnav Barve", title: "Backend Infrastructure & Database", desc: "Engineered Express REST API routes, MongoDB Compass collection schemas, JWT auth guards, and the offline fallback engine." }
      ];

      let curY = 2.6;
      credits.forEach(c => {
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 7.35, y: curY, w: 5.1, h: 1.25,
          fill: { color: '1E293B' },
          line: { color: '38BDF8', width: 1 }
        });
        slide.addText(c.name, {
          x: 7.5, y: curY + 0.08, w: 4.8, h: 0.28,
          fontSize: 12, bold: true, color: 'FFFFFF'
        });
        slide.addText(c.title, {
          x: 7.5, y: curY + 0.34, w: 4.8, h: 0.22,
          fontSize: 9.5, bold: true, color: '38BDF8'
        });
        slide.addText(c.desc, {
          x: 7.5, y: curY + 0.58, w: 4.8, h: 0.6,
          fontSize: 9, color: 'CBD5E1'
        });
        curY += 1.38;
      });
    } else {
      // General slides right side: Visual Specs & Architecture Summary
      slide.addText('TECHNICAL SPECIFICATIONS & VERIFICATION', {
        x: 7.35, y: 2.2, w: 5.1, h: 0.3,
        fontSize: 11, bold: true, color: '38BDF8', fontFace: 'Arial'
      });

      slide.addShape(pptx.ShapeType.roundRect, {
        x: 7.35, y: 2.6, w: 5.1, h: 2.3,
        fill: { color: '090D14' },
        line: { color: '1E293B', width: 1 }
      });

      slide.addText(`MODULE SUMMARY:\n\n${slideData.summary}\n\nOPERATIONAL STATUS: Active & Verified on Main Branch`, {
        x: 7.55, y: 2.75, w: 4.7, h: 2.0,
        fontSize: 10.5, color: 'CBD5E1', fontFace: 'Arial'
      });

      // Bottom cards
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 7.35, y: 5.1, w: 2.45, h: 1.5,
        fill: { color: '1E293B' },
        line: { color: '0EA5E9', width: 1 }
      });
      slide.addText('PERFORMANCE', { x: 7.45, y: 5.2, w: 2.2, h: 0.2, fontSize: 9, bold: true, color: '0EA5E9' });
      slide.addText('⚡ Instant Live Sync\n⚡ Zero Server Queue\n⚡ 17.2s Client Build', { x: 7.45, y: 5.45, w: 2.2, h: 1.0, fontSize: 9, color: 'F1F5F9' });

      slide.addShape(pptx.ShapeType.roundRect, {
        x: 10.0, y: 5.1, w: 2.45, h: 1.5,
        fill: { color: '1E293B' },
        line: { color: '10B981', width: 1 }
      });
      slide.addText('RESILIENCE', { x: 10.1, y: 5.2, w: 2.2, h: 0.2, fontSize: 9, bold: true, color: '10B981' });
      slide.addText('🛡️ Multi-Model Fallback\n🛡️ AST Syntax Check\n🛡️ Zero-Crash Guarantee', { x: 10.1, y: 5.45, w: 2.2, h: 1.0, fontSize: 9, color: 'F1F5F9' });
    }

    // Footer Bar
    slide.addText('WebCraft AI • Developed by Arth Patidar, Aryan Jaiswal, Arnav Barve', {
      x: 0.6, y: 7.05, w: 8.0, h: 0.3,
      fontSize: 9, color: '475569'
    });
    slide.addText('Vite 6 + React 19 • Google Gemini Free Tier • MongoDB Compass', {
      x: 8.0, y: 7.05, w: 4.7, h: 0.3,
      fontSize: 9, color: '475569', align: 'right'
    });
  }

  await pptx.writeFile({ fileName: PPTX_OUTPUT_PATH });
  console.log(`✅ PowerPoint deck generated: ${PPTX_OUTPUT_PATH}`);
}

// ----------------------------------------------------
// PART 2: GENERATE HTML PRESENTATION (Interactive & Print-Ready)
// ----------------------------------------------------
function generateHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WebCraft AI — Presentation Deck (Arth Patidar, Aryan Jaiswal, Arnav Barve)</title>
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
      background-color: #07090e;
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
      background: radial-gradient(circle at 90% 10%, rgba(14, 165, 233, 0.09) 0%, transparent 50%),
                  radial-gradient(circle at 10% 90%, rgba(99, 102, 241, 0.06) 0%, transparent 50%),
                  #07090e;
      overflow: hidden;
    }

    /* COVER PAGE */
    .cover-page {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 20mm 22mm;
      background: radial-gradient(circle at 50% 30%, rgba(14, 165, 233, 0.16) 0%, transparent 60%),
                  radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
                  #07090e;
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
      margin-bottom: 24px;
      font-weight: 400;
      line-height: 1.5;
    }

    /* Team Members Header Card */
    .team-badge-container {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
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
      margin-bottom: 22px;
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

    /* INNER PAGES */
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

    /* MAIN CONTENT SPLIT */
    .slide-body {
      flex: 1;
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 14px;
      align-items: stretch;
      margin-bottom: 8px;
    }

    .details-box {
      background: rgba(15, 23, 42, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .details-heading {
      font-size: 11px;
      font-weight: 700;
      color: #38bdf8;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .bullets-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
      list-style: none;
    }

    .bullet-row {
      font-size: 11.5px;
      color: #cbd5e1;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      line-height: 1.45;
    }

    .bullet-icon {
      color: #38bdf8;
      font-weight: 800;
      font-size: 12px;
      flex-shrink: 0;
      margin-top: 1px;
    }

    /* MOCKUP / VISUAL ARCHITECTURE CONTAINER */
    .visual-box {
      background: #0d121d;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    .mockup-header {
      background: #111726;
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
      padding: 7px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .mockup-dots {
      display: flex;
      gap: 5px;
    }

    .mockup-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .mockup-title {
      font-size: 10px;
      font-family: 'JetBrains Mono', monospace;
      color: #94a3b8;
    }

    .mockup-canvas {
      flex: 1;
      padding: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      background: radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.8) 0%, #090d15 100%);
      font-family: 'JetBrains Mono', monospace;
      font-size: 10.5px;
    }

    .diagram-step {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(56, 189, 248, 0.2);
      border-radius: 6px;
      padding: 6px 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .diagram-step span {
      color: #38bdf8;
      font-weight: 600;
    }

    .diagram-arrow {
      text-align: center;
      color: #64748b;
      font-size: 11px;
      font-weight: 800;
    }

    /* FOOTER BAR */
    .page-footer-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      padding: 6px 14px;
    }

    .footer-credits {
      font-size: 10px;
      color: #94a3b8;
    }

    .footer-credits strong {
      color: #e2e8f0;
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

  <!-- COVER PAGE -->
  <div class="page cover-page">
    <div class="cover-logo-badge">WebCraft AI • Technical System Presentation</div>
    <h1 class="cover-title">Full-Stack AI Website Builder & <span>Sandpack Studio</span></h1>
    <p class="cover-subtitle">Production-grade natural language synthesis engine with reactive in-browser execution, resilient multi-model Gemini API fallback cascades & MongoDB infrastructure.</p>

    <!-- TEAM MEMBERS CHIP ROW -->
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

    <!-- METRICS GRID -->
    <div class="cover-grid">
      <div class="cover-card">
        <div class="cover-card-label">Frontend Studio</div>
        <div class="cover-card-value">React 19 • Vite 6 • Tailwind</div>
      </div>
      <div class="cover-card">
        <div class="cover-card-label">Virtual Runtime</div>
        <div class="cover-card-value">CodeSandbox Sandpack Engine</div>
      </div>
      <div class="cover-card">
        <div class="cover-card-label">AI Generation Pool</div>
        <div class="cover-card-value">Google Gemini (v1beta) Free Tier</div>
      </div>
      <div class="cover-card">
        <div class="cover-card-label">Data Persistence</div>
        <div class="cover-card-value">MongoDB Atlas / Compass + JSON</div>
      </div>
    </div>

    <div class="cover-footer">
      <div>Project Presentation • Developed by Arth Patidar, Aryan Jaiswal, Arnav Barve</div>
      <div>Localhost: 5173 (Vite Client) | 5001 (Express API) | 27017 (MongoDB)</div>
    </div>
  </div>

  <!-- SLIDES LOOP -->
  ${slidesData.slice(1).map((s, idx) => `
    <div class="page">
      <div class="page-header">
        <div class="header-left">
          <span class="category-badge" style="background: ${s.badgeColor}22; color: ${s.badgeColor}; border: 1px solid ${s.badgeColor}55;">${s.category}</span>
          <h2 class="page-title">${s.slideNum}. ${s.title}</h2>
          <p class="page-summary">${s.subtitle}</p>
        </div>
        <div class="header-right">
          <div class="brand-mark">WEBCRAFT AI</div>
          <div class="system-status">Live Engine Active</div>
        </div>
      </div>

      <div class="slide-body">
        <!-- LEFT: DETAILED HIGHLIGHTS -->
        <div class="details-box">
          <div>
            <div class="details-heading">
              <span>⚡</span> Core Technical Specifications
            </div>
            <ul class="bullets-container">
              ${s.bullets.map(b => `
                <li class="bullet-row">
                  <span class="bullet-icon">✓</span>
                  <span>${b}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 11px; color: #94a3b8;">
            <strong style="color: #38bdf8;">Module Impact:</strong> ${s.summary}
          </div>
        </div>

        <!-- RIGHT: MOCKUP / ARCHITECTURE SCHEMATIC -->
        <div class="visual-box">
          <div class="mockup-header">
            <div class="mockup-dots">
              <div class="mockup-dot" style="background:#ef4444;"></div>
              <div class="mockup-dot" style="background:#f59e0b;"></div>
              <div class="mockup-dot" style="background:#10b981;"></div>
            </div>
            <div class="mockup-title">webcraft://${s.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}.module</div>
            <div style="font-size: 9px; color: #64748b;">OK 200</div>
          </div>
          <div class="mockup-canvas">
            <div class="diagram-step">
              <span>Input Stage</span>
              <div style="color:#e2e8f0;">User Natural Language Prompt</div>
            </div>
            <div class="diagram-arrow">▼ Express API Gateway (/api/ai/...)</div>
            <div class="diagram-step">
              <span>Processing Stage</span>
              <div style="color:#10b981;">Gemini Multi-Model Fallback Pool</div>
            </div>
            <div class="diagram-arrow">▼ AST Syntax Parsing & Validation</div>
            <div class="diagram-step">
              <span>Execution Stage</span>
              <div style="color:#c084fc;">Sandpack In-Browser Virtual Iframe</div>
            </div>
            <div class="diagram-arrow">▼ Dual Persistence Engine</div>
            <div class="diagram-step">
              <span>Persistence</span>
              <div style="color:#38bdf8;">MongoDB Compass & JSON Store</div>
            </div>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <div class="page-footer-section">
        <div class="footer-credits">
          Engineering Team: <strong>Arth Patidar</strong>, <strong>Aryan Jaiswal</strong>, <strong>Arnav Barve</strong> • WebCraft AI Project Suite
        </div>
        <div class="page-indicator">Slide ${idx + 2} of 15</div>
      </div>
    </div>
  `).join('')}

</body>
</html>`;
}

// ----------------------------------------------------
// PART 3: RENDER PDF VIA PUPPETEER-CORE + CHROME
// ----------------------------------------------------
async function generatePdf() {
  console.log('📄 Generating ultra-high-definition PDF presentation deck (.pdf)...');
  const html = generateHtml();
  fs.writeFileSync(HTML_OUTPUT_PATH, html, 'utf-8');
  console.log(`Saved interactive HTML deck to: ${HTML_OUTPUT_PATH}`);

  console.log('Launching Chrome headless to render print-perfect A4 Landscape PDF...');
  const tempProfileDir = path.join(__dirname, '.chrome_temp_' + Date.now());
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    userDataDir: tempProfileDir,
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

// Execute All
async function main() {
  try {
    await generatePptx();
    await generatePdf();
    console.log('🎉 ALL PRESENTATION DECKS GENERATED SUCCESSFULLY!');
    console.log(`1. PowerPoint File (.pptx): ${PPTX_OUTPUT_PATH}`);
    console.log(`2. Presentation PDF (.pdf):   ${PDF_OUTPUT_PATH}`);
    console.log(`3. Interactive HTML (.html):  ${HTML_OUTPUT_PATH}`);
  } catch (err) {
    console.error('❌ Error generating presentations:', err);
    process.exit(1);
  }
}

main();
