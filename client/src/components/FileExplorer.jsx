import React from 'react';
import { FileCode, FileText, Plus, File } from 'lucide-react';

export default function FileExplorer({ files, activeFile, onSelectFile, onAddFile }) {
  const fileEntries = Object.keys(files || {});

  const getFileIcon = (filename) => {
    if (filename.endsWith('.js') || filename.endsWith('.jsx')) {
      return <FileCode className="w-4 h-4 text-amber-400" />;
    }
    if (filename.endsWith('.css')) {
      return <FileText className="w-4 h-4 text-sky-400" />;
    }
    if (filename.endsWith('.html')) {
      return <File className="w-4 h-4 text-orange-400" />;
    }
    return <File className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div className="flex flex-col h-full bg-slate-950/80 border-r border-slate-800 text-xs">
      <div className="p-3 border-b border-slate-800 flex items-center justify-between">
        <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px]">
          Files ({fileEntries.length})
        </span>
        <button
          onClick={onAddFile}
          title="Add File"
          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2 space-y-0.5">
        {fileEntries.map((file) => {
          const isSelected = activeFile === file;
          return (
            <button
              key={file}
              onClick={() => onSelectFile(file)}
              className={`w-full flex items-center space-x-2 px-3 py-1.5 text-left transition-colors ${
                isSelected
                  ? 'bg-brand-600/20 text-brand-300 font-semibold border-l-2 border-brand-500'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              {getFileIcon(file)}
              <span className="truncate">{file.startsWith('/') ? file.slice(1) : file}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
