import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/60 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-white text-sm">WebCraft AI Builder</span>
          <span className="text-slate-600">|</span>
          <span>100% Free APIs & Open-Source</span>
        </div>

        <div className="flex items-center space-x-6 text-slate-400">
          <span className="flex items-center gap-1">
            Built with React, Tailwind & Google Gemini / OpenRouter Free Tier
          </span>
        </div>

        <div className="text-slate-500">
          © {new Date().getFullYear()} WebCraft AI. Deployable everywhere.
        </div>
      </div>
    </footer>
  );
}
