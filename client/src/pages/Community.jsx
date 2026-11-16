import React, { useState, useEffect } from 'react';
import { Compass, Sparkles } from 'lucide-react';
import api from '../utils/api';
import ProjectCard from '../components/ProjectCard';

export default function Community() {
  const [showcases, setShowcases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommunity();
  }, []);

  const fetchCommunity = async () => {
    try {
      setLoading(true);
      const res = await api.get('/community');
      if (res.data.success) {
        setShowcases(res.data.data || []);
      }
    } catch (err) {
      console.warn('Community fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto pb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Community Templates & Inventions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Explore AI-Generated Websites
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Clone, inspect code, or remix any of these pre-built designs directly in the builder.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500 text-xs">
            Loading showcase gallery...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcases.map((proj) => (
              <ProjectCard
                key={proj._id || proj.id}
                project={proj}
                isCommunity={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
