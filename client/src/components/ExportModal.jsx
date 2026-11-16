import React, { useState } from 'react';
import { X, Download, Copy, Check, Rocket, Globe } from 'lucide-react';
import { exportProjectToZip } from '../utils/zipExport';
import toast from 'react-hot-toast';

export default function ExportModal({ isOpen, onClose, projectTitle, files }) {
  const [activeTab, setActiveTab] = useState('zip'); // 'zip' | 'deploy' | 'code'
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    try {
      setDownloading(true);
      await exportProjectToZip(projectTitle, files);
      toast.success('ZIP downloaded successfully!');
      onClose();
    } catch (err) {
      toast.error('Failed to export ZIP file');
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyCode = () => {
    const mainCode = files['/App.js'] || files['App.js'] || JSON.stringify(files, null, 2);
    navigator.clipboard.writeText(mainCode);
    setCopied(true);
    toast.success('Main component copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-white mb-1">Export & Deploy Website</h3>
        <p className="text-xs text-slate-400 mb-5">
          Download source code or deploy directly to your preferred hosting provider.
        </p>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-800 mb-6">
          <button
            onClick={() => setActiveTab('zip')}
            className={`pb-2.5 px-4 text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'zip'
                ? 'text-brand-400 border-b-2 border-brand-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" /> Download ZIP
          </button>
          <button
            onClick={() => setActiveTab('deploy')}
            className={`pb-2.5 px-4 text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'deploy'
                ? 'text-brand-400 border-b-2 border-brand-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" /> Deploy Options
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`pb-2.5 px-4 text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'code'
                ? 'text-brand-400 border-b-2 border-brand-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Copy className="w-3.5 h-3.5" /> Copy Code
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'zip' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <p className="font-semibold text-white mb-1">📦 Production-Ready React + Vite Package</p>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Includes all generated React components, CSS files, Tailwind styling, package.json, and setup instructions.
              </p>
            </div>
            <button
              onClick={handleDownloadZip}
              disabled={downloading}
              className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition-all shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Bundling ZIP...' : 'Download ZIP Bundle'}</span>
            </button>
          </div>
        )}

        {activeTab === 'deploy' && (
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between font-semibold text-white">
                <span>Deploy to Vercel</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Free</span>
              </div>
              <p className="text-slate-400 text-[11px] mt-1">
                Upload your downloaded ZIP to GitHub, then import to Vercel for instant live HTTPS deployment.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between font-semibold text-white">
                <span>Deploy to Netlify</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Free</span>
              </div>
              <p className="text-slate-400 text-[11px] mt-1">
                Drag-and-drop the generated `dist` folder into Netlify Drop for 10-second instant deployment.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400">
              Quickly copy the main React component (`/App.js`) to paste into your existing project:
            </p>
            <button
              onClick={handleCopyCode}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy App.js Component'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
