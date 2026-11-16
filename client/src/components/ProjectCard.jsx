import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Download, Trash2, Heart, Sparkles } from 'lucide-react';
import { exportProjectToZip } from '../utils/zipExport';

export default function ProjectCard({ project, onDelete, isCommunity }) {
  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    exportProjectToZip(project.title, project.files || {});
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) onDelete(project._id || project.id);
  };

  const id = project._id || project.id;

  return (
    <div className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-brand-500/10">
      {/* Card Header Preview Area */}
      <div className="relative h-44 bg-gradient-to-tr from-slate-950 via-slate-900 to-brand-950/40 p-4 border-b border-slate-800/80 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between z-10">
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
            {project.templateType || 'React'}
          </span>
          {isCommunity && (
            <div className="flex items-center gap-1 text-[11px] text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full">
              <Heart className="w-3 h-3 fill-pink-500" />
              <span>{project.likesCount || 12}</span>
            </div>
          )}
        </div>

        {/* Decorative mini preview sketch */}
        <div className="absolute inset-x-6 -bottom-6 h-32 rounded-t-xl bg-slate-900/90 border border-slate-800 p-3 shadow-2xl transform group-hover:-translate-y-1 transition-transform">
          <div className="w-1/3 h-2 rounded bg-brand-500/50 mb-2"></div>
          <div className="w-2/3 h-1.5 rounded bg-slate-700/50 mb-1.5"></div>
          <div className="w-1/2 h-1.5 rounded bg-slate-700/30"></div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-white text-base group-hover:text-brand-300 transition-colors truncate">
            {project.title || 'Untitled Website'}
          </h4>
          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {project.prompt}
          </p>
        </div>

        {/* Actions bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <Link
            to={`/builder/${id}`}
            className="inline-flex items-center gap-1 text-brand-400 hover:text-brand-300 font-semibold"
          >
            <span>Open in Builder</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center space-x-1">
            <button
              onClick={handleDownload}
              title="Download ZIP"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
            {!isCommunity && onDelete && (
              <button
                onClick={handleDelete}
                title="Delete Project"
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
