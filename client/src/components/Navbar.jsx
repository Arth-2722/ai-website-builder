import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Code2, Globe, FolderGit2, Plus, LogOut, User as UserIcon, Key } from 'lucide-react';
import ApiKeyModal from './ApiKeyModal';

export default function Navbar() {
  const { user, logout, setAuthModalOpen } = useAuth();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              WebCraft <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 font-semibold border border-brand-500/30">AI</span>
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              isActive('/') ? 'text-white bg-slate-800/80' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Home
          </Link>
          <Link
            to="/builder"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              isActive('/builder') ? 'text-white bg-slate-800/80' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Builder
          </Link>
          <Link
            to="/dashboard"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              isActive('/dashboard') ? 'text-white bg-slate-800/80' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            My Projects
          </Link>
          <Link
            to="/community"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              isActive('/community') ? 'text-white bg-slate-800/80' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Explore
          </Link>
        </nav>

        {/* Action Buttons & Auth */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setApiKeyModalOpen(true)}
            title="Configure Free AI Keys"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Keys</span>
          </button>

          <Link
            to="/builder"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-brand-600/25 transition-all hover:scale-102 active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Create Website</span>
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-900 border border-slate-800 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-brand-600/30 border border-brand-500/40 text-brand-300 font-bold text-xs flex items-center justify-center">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block text-xs font-medium text-slate-300 max-w-[100px] truncate">
                  {user.name}
                </span>
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-1 text-xs z-50 animate-fadeIn"
                  onClick={() => setDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-800 text-slate-400">
                    <p className="font-semibold text-white">{user.name}</p>
                    <p className="truncate text-[11px] text-slate-500">{user.email}</p>
                    <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-md">
                      ⚡ {user.credits || 50} Free Generations
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-slate-800 text-slate-300 hover:text-white"
                  >
                    My Websites
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-rose-950/30 text-rose-400 hover:text-rose-300 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      <ApiKeyModal
        isOpen={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
      />
    </header>
  );
}
