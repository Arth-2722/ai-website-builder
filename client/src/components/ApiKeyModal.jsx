import React, { useState, useEffect } from 'react';
import { Key, Sparkles, ExternalLink, X, Check, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';

export default function ApiKeyModal({ isOpen, onClose }) {
  const [geminiKey, setGeminiKey] = useState(localStorage.getItem('user_gemini_key') || '');
  const [openRouterKey, setOpenRouterKey] = useState(localStorage.getItem('user_openrouter_key') || '');
  const [activeProvider, setActiveProvider] = useState(localStorage.getItem('user_ai_provider') || 'universal');
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    setGeminiKey(localStorage.getItem('user_gemini_key') || '');
    setOpenRouterKey(localStorage.getItem('user_openrouter_key') || '');
    setActiveProvider(localStorage.getItem('user_ai_provider') || 'universal');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (geminiKey.trim()) {
      localStorage.setItem('user_gemini_key', geminiKey.trim());
    } else {
      localStorage.removeItem('user_gemini_key');
    }

    if (openRouterKey.trim()) {
      localStorage.setItem('user_openrouter_key', openRouterKey.trim());
    } else {
      localStorage.removeItem('user_openrouter_key');
    }

    localStorage.setItem('user_ai_provider', activeProvider);
    toast.success('AI Settings updated successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-brand-600/20 text-brand-400 border border-brand-500/30 flex items-center justify-center">
            <Key className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-white">AI Provider & Free API Keys</h3>
        </div>
        <p className="text-xs text-slate-400 mb-5">
          Generate bespoke websites for any prompt using 100% Free AI models or the offline Universal Engine.
        </p>

        {/* Provider Cards */}
        <div className="space-y-4 text-xs">
          {/* Option 1: Google Gemini Free */}
          <div className={`p-4 rounded-xl border transition-all ${activeProvider === 'gemini' ? 'bg-brand-950/30 border-brand-500' : 'bg-slate-950 border-slate-800'}`}>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center space-x-2 cursor-pointer font-bold text-white">
                <input
                  type="radio"
                  name="provider"
                  checked={activeProvider === 'gemini'}
                  onChange={() => setActiveProvider('gemini')}
                  className="accent-brand-500"
                />
                <span>Google Gemini Free API (Recommended)</span>
              </label>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">100% Free</span>
            </div>

            <p className="text-slate-400 text-[11px] mb-2">
              Fast, high quality React code generation with 15 requests per minute free quota. Zero credit card needed.
            </p>

            <div className="flex gap-2">
              <input
                type="password"
                placeholder="AIzaSy... (Paste Gemini API key)"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-brand-500 font-mono"
              />
              <a
                href="https://aistudio.google.com/"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0"
              >
                <span>Get Free Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Option 2: OpenRouter Free Models */}
          <div className={`p-4 rounded-xl border transition-all ${activeProvider === 'openrouter' ? 'bg-brand-950/30 border-brand-500' : 'bg-slate-950 border-slate-800'}`}>
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center space-x-2 cursor-pointer font-bold text-white">
                <input
                  type="radio"
                  name="provider"
                  checked={activeProvider === 'openrouter'}
                  onChange={() => setActiveProvider('openrouter')}
                  className="accent-brand-500"
                />
                <span>OpenRouter Free Models (As in GreatStack)</span>
              </label>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">Free Tier</span>
            </div>

            <p className="text-slate-400 text-[11px] mb-2">
              Free access to Llama 3.2, DeepSeek R1, and Qwen Coder models through OpenRouter API.
            </p>

            <div className="flex gap-2">
              <input
                type="password"
                placeholder="sk-or-v1-... (Paste OpenRouter key)"
                value={openRouterKey}
                onChange={(e) => setOpenRouterKey(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-brand-500 font-mono"
              />
              <a
                href="https://openrouter.ai/"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0"
              >
                <span>Get Free Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Option 3: Universal Offline Synthesis */}
          <div className={`p-4 rounded-xl border transition-all ${activeProvider === 'universal' ? 'bg-brand-950/30 border-brand-500' : 'bg-slate-950 border-slate-800'}`}>
            <label className="flex items-center space-x-2 cursor-pointer font-bold text-white mb-1">
              <input
                type="radio"
                name="provider"
                checked={activeProvider === 'universal'}
                onChange={() => setActiveProvider('universal')}
                className="accent-brand-500"
              />
              <span>Universal Offline AI Synthesis (Zero Key Required)</span>
            </label>
            <p className="text-slate-400 text-[11px]">
              Works immediately out of the box with 0 setup for any prompt (Hospitals, Dealerships, Bakeries, Tech SaaS, Law Firms, etc.).
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-600/30 transition-all"
          >
            Save AI Settings
          </button>
        </div>
      </div>
    </div>
  );
}
