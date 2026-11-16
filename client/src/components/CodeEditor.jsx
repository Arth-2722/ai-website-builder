import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CodeEditor({ activeFile, code, onChange }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code || '');
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = (code || '').split('\n');

  return (
    <div className="flex flex-col h-full bg-slate-950 font-mono text-xs overflow-hidden">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-slate-300">
          <Terminal className="w-3.5 h-3.5 text-brand-400" />
          <span className="font-semibold text-slate-200">
            {activeFile || 'No file selected'}
          </span>
          <span className="text-[10px] text-slate-500">
            ({lines.length} lines)
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Editor Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line numbers gutter */}
        <div className="select-none py-3 px-2 bg-slate-950/90 text-slate-600 text-right font-mono text-[11px] border-r border-slate-800/80 leading-5">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Textarea code editor */}
        <textarea
          value={code || ''}
          onChange={(e) => onChange(e.target.value)}
          spellCheck="false"
          className="flex-1 w-full h-full p-3 bg-transparent text-slate-200 font-mono text-xs leading-5 resize-none focus:outline-none focus:ring-0 overflow-auto selection:bg-brand-600 selection:text-white"
        />
      </div>
    </div>
  );
}
