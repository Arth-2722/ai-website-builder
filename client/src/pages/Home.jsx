import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Code, Eye, Download, Layers, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    navigate('/builder', { state: { initialPrompt: prompt.trim() } });
  };

  const samplePrompts = [
    'SaaS automation workflow platform with dark mode, interactive pricing, and metrics',
    'Modern Italian artisanal restaurant with seasonal menu and table reservation form',
    'Minimalist creative developer & UI designer portfolio with project filter tags',
    'Exclusive sneaker drops storefront with active shopping bag counter and filters'
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-brand-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient radial glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-gradient-to-b from-brand-600/20 via-indigo-900/10 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs font-semibold mb-8 animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen MERN AI Website Builder</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400 font-mono">100% Free AI APIs</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Build full-stack websites{' '}
            <br className="hidden sm:inline" />
            at the{' '}
            <span className="bg-gradient-to-r from-brand-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              speed of thought
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Turn your ideas into live, production-ready React web applications in seconds.
            Edit code manually, inspect in live Sandpack sandbox, and export with zero cost.
          </p>

          {/* Big Prompt Generator Box */}
          <div className="mt-10 max-w-3xl mx-auto">
            <form
              onSubmit={handleGenerate}
              className="relative p-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl focus-within:border-brand-500/80 transition-all"
            >
              <textarea
                rows="3"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your website (e.g. 'Modern fintech dashboard with dark theme, balance chart, and transaction history')..."
                className="w-full bg-transparent px-4 py-3 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none resize-none"
              />

              <div className="flex items-center justify-between pt-2 px-3 border-t border-slate-800/80">
                <span className="text-xs text-slate-500">
                  Powered by Google Gemini & OpenRouter Free Tier
                </span>
                <button
                  type="submit"
                  disabled={!prompt.trim()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-brand-600/30 flex items-center gap-2 transition-all hover:scale-102 active:scale-98"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Website</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Prompt Suggestion Chips */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Try these:</span>
              {samplePrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(p)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800/80 text-slate-400 hover:text-white transition-all"
                >
                  {p.slice(0, 36)}...
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-20 border-t border-slate-800/80 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-brand-400 uppercase tracking-widest">
              Engineered for Developers & Creators
            </h2>
            <p className="mt-3 text-3xl font-extrabold sm:text-4xl text-white">
              Everything you need in a modern web builder
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-brand-500/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Instant AI Generation</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Generates responsive React components with Tailwind CSS styling directly from natural language prompts using free AI models.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-brand-500/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-5">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Sandpack Live Sandbox</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                CodeSandbox Sandpack powers instant in-browser code execution. Toggle between code view, preview, and responsive devices.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-brand-500/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">One-Click ZIP Export</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Export cleanly packaged, ready-to-run Vite projects with package.json and full source code. Deploy anywhere with ease.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
