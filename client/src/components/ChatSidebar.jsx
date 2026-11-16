import React, { useState } from 'react';
import { Send, Sparkles, Loader2, Wand2, Lightbulb } from 'lucide-react';

export default function ChatSidebar({
  messages,
  onSendMessage,
  loading,
  statusText
}) {
  const [input, setInput] = useState('');

  const suggestions = [
    'Change color scheme to Dark Emerald',
    'Add an interactive Pricing Table',
    'Add a Testimonials Carousel section',
    'Add a Contact Us form with validation',
    'Make the navigation bar sticky and glassmorphic'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSendMessage(input.trim());
    setInput('');
  };

  const handleSuggestionClick = (text) => {
    if (loading) return;
    onSendMessage(text);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950/90 border-r border-slate-800 text-xs">
      {/* Sidebar Header */}
      <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-brand-600/30 border border-brand-500/40 flex items-center justify-center text-brand-300">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-slate-200">AI Assistant</span>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium">
          ● Ready
        </span>
      </div>

      {/* Chat Messages / Generation History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={index}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] p-3 rounded-2xl text-xs leading-relaxed ${
                  isUser
                    ? 'bg-brand-600 text-white rounded-br-none shadow-md shadow-brand-600/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center space-x-1.5 mb-1.5 text-brand-400 font-semibold text-[11px]">
                    <Wand2 className="w-3 h-3" />
                    <span>AI Generator</span>
                  </div>
                )}
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <span className="block mt-1 text-[10px] opacity-60 text-right">
                  {msg.timestamp || 'Just now'}
                </span>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center space-x-2 p-3 bg-brand-950/30 border border-brand-500/30 rounded-xl text-brand-300 text-xs">
            <Loader2 className="w-4 h-4 animate-spin text-brand-400" />
            <span>{statusText || 'AI is crafting your website code...'}</span>
          </div>
        )}

        {/* Quick Suggestion Chips */}
        {!loading && (
          <div className="pt-2">
            <div className="flex items-center space-x-1 text-slate-400 text-[11px] mb-2 font-medium">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Suggested updates</span>
            </div>
            <div className="space-y-1.5">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(s)}
                  className="w-full text-left p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800/80 hover:border-brand-500/40 text-slate-300 hover:text-white text-[11px] transition-all"
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-slate-800 bg-slate-950">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Ask AI to edit, add sections, or redesign..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white transition-all shadow-md shadow-brand-600/30"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}
