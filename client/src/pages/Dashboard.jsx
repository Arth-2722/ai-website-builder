import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Sparkles, FolderX } from 'lucide-react';
import api from '../utils/api';
import ProjectCard from '../components/ProjectCard';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get('/projects');
      if (res.data.success) {
        setProjects(res.data.data || []);
      }
    } catch (err) {
      toast.error('Failed to load saved projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this website?')) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => (p._id || p.id) !== id));
      toast.success('Project deleted');
    } catch (err) {
      toast.error('Failed to delete project');
    }
  };

  const filtered = projects.filter((p) =>
    (p.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.prompt || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">My Websites</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Manage, preview, and download your AI-generated web applications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search websites..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 w-48 sm:w-64"
              />
            </div>

            <Link
              to="/builder"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-brand-600/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Website</span>
            </Link>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-24 text-center text-slate-500 text-sm">
            Loading your web creations...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500 mb-4">
              <FolderX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">No websites found</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              You haven't saved any websites yet. Type your first prompt to generate one right now!
            </p>
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg shadow-brand-600/30 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Your First Website</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filtered.map((proj) => (
              <ProjectCard
                key={proj._id || proj.id}
                project={proj}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
