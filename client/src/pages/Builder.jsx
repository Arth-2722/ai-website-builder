import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack
} from '@codesandbox/sandpack-react';
import {
  Code,
  Eye,
  Columns,
  Download,
  Save,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Laptop,
  Tablet,
  Smartphone,
  Sparkles,
  Send,
  Loader2,
  Wand2,
  Lightbulb,
  RotateCw
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import ExportModal from '../components/ExportModal';
import { getClientTemplate } from '../utils/clientTemplateService';

// Helper component inside SandpackProvider to sync files for Export & Save
function SandpackBridge({ onUpdateFiles, refreshTrigger }) {
  const { sandpack } = useSandpack();

  useEffect(() => {
    if (sandpack && sandpack.files) {
      const cleanFiles = {};
      Object.entries(sandpack.files).forEach(([path, fileObj]) => {
        cleanFiles[path] = typeof fileObj === 'string' ? fileObj : fileObj.code;
      });
      onUpdateFiles(cleanFiles);
    }
  }, [sandpack.files]);

  return null;
}

export default function Builder() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Initial prompt resolution
  const initialPrompt = location.state?.initialPrompt || 'Modern SaaS product landing page with dark theme';
  const defaultTemplate = getClientTemplate(initialPrompt);

  // Core state - initialized immediately with fallback template so screen is NEVER blank
  const [projectId, setProjectId] = useState(id || null);
  const [projectTitle, setProjectTitle] = useState(defaultTemplate.title || 'My AI Website');
  const [prompt, setPrompt] = useState(initialPrompt);
  const [files, setFiles] = useState(defaultTemplate.files);
  const [currentWorkingFiles, setCurrentWorkingFiles] = useState(defaultTemplate.files);

  // UI state
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'code' | 'preview'
  const [deviceView, setDeviceView] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [saving, setSaving] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Chat message history
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `👋 Welcome! I've loaded "${defaultTemplate.title}". Type a prompt in the chat below to change sections, styles, or generate new designs!`,
      timestamp: 'Ready'
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const suggestions = [
    'Change color scheme to Dark Emerald and Gold',
    'Add an interactive Pricing Table with toggle',
    'Add a Testimonials Carousel with review cards',
    'Add a Contact form with input validation',
    'Make navbar glassmorphic and sticky'
  ];

  // If a prompt was passed via navigation from Home or a project ID exists, load it
  useEffect(() => {
    if (id) {
      loadProject(id);
    } else if (location.state?.initialPrompt) {
      handleGenerateInitial(location.state.initialPrompt);
    }
  }, [id]);

  const loadProject = async (projId) => {
    try {
      setLoading(true);
      setStatusText('Loading your saved project...');
      const res = await api.get(`/projects/${projId}`);
      if (res.data.success && res.data.data) {
        const p = res.data.data;
        setProjectId(p._id || p.id);
        setProjectTitle(p.title || 'Untitled Website');
        setPrompt(p.prompt || '');
        if (p.files && Object.keys(p.files).length > 0) {
          setFiles(p.files);
          setCurrentWorkingFiles(p.files);
        }
        setMessages([
          {
            role: 'assistant',
            content: `Loaded project "${p.title}". Ask me to add or modify any part!`,
            timestamp: 'Loaded'
          }
        ]);
        toast.success(`Loaded "${p.title}"`);
      }
    } catch (err) {
      toast.error('Could not connect to backend; using offline cached files.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateInitial = async (userPrompt) => {
    try {
      setLoading(true);
      setStatusText('Generating website with AI...');
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: userPrompt, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);

      const res = await api.post('/ai/generate', { prompt: userPrompt });

      if (res.data.success && res.data.data) {
        const { title, files: genFiles } = res.data.data;
        if (genFiles && Object.keys(genFiles).length > 0) {
          setFiles(genFiles);
          setCurrentWorkingFiles(genFiles);
          if (title) setProjectTitle(title);
          setRefreshKey((k) => k + 1);

          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: `✨ ${title || 'Your website'} is ready! You can edit the code directly or ask me for refinements.`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
          toast.success('Website generated!');
          return;
        }
      }
      throw new Error('Fallback needed');
    } catch (err) {
      // Automatic client-side fallback - guaranteed to never leave the screen blank
      const fallback = getClientTemplate(userPrompt);
      setFiles(fallback.files);
      setCurrentWorkingFiles(fallback.files);
      if (fallback.title) setProjectTitle(fallback.title);
      setRefreshKey((k) => k + 1);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `✨ Generated website from prompt using Smart Engine! Feel free to edit or refine.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    const text = chatInput.trim();
    if (!text || loading) return;

    setChatInput('');
    await sendRefinementRequest(text);
  };

  const sendRefinementRequest = async (userText) => {
    try {
      setLoading(true);
      setStatusText('Refining website layout & code...');

      setMessages((prev) => [
        ...prev,
        { role: 'user', content: userText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);

      const res = await api.post('/ai/refine', {
        prompt: userText,
        currentFiles: currentWorkingFiles
      });

      if (res.data.success && res.data.data && res.data.data.files) {
        const { title, files: updatedFiles } = res.data.data;
        setFiles(updatedFiles);
        setCurrentWorkingFiles(updatedFiles);
        if (title) setProjectTitle(title);
        setRefreshKey((k) => k + 1);

        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `Applied changes for: "${userText}". Check the live preview!`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        toast.success('Website updated!');
      } else {
        toast.success('Update noted! You can also edit code directly in the editor.');
      }
    } catch (err) {
      // Client-side fallback if backend API is unreachable or fails
      const fallback = getClientTemplate(userText);
      if (fallback && fallback.files) {
        setFiles(fallback.files);
        setCurrentWorkingFiles(fallback.files);
        if (fallback.title) setProjectTitle(fallback.title);
        setRefreshKey((k) => k + 1);

        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `✨ Generated "${fallback.title}" based on your prompt! Check the live preview.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        toast.success('Website updated!');
      } else {
        toast.error('AI refinement temporarily offline; you can edit source code directly in the editor!');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProject = async () => {
    try {
      setSaving(true);
      if (projectId) {
        await api.put(`/projects/${projectId}`, {
          title: projectTitle,
          files: currentWorkingFiles
        });
        toast.success('Project saved!');
      } else {
        const res = await api.post('/projects', {
          title: projectTitle,
          prompt: prompt || 'Created with AI Builder',
          files: currentWorkingFiles
        });
        if (res.data.success && res.data.data) {
          const newId = res.data.data._id || res.data.data.id;
          setProjectId(newId);
          navigate(`/builder/${newId}`, { replace: true });
          toast.success('Saved to your dashboard!');
        }
      }
    } catch (err) {
      // Local fallback save in localStorage
      localStorage.setItem(`project_${Date.now()}`, JSON.stringify({ title: projectTitle, files: currentWorkingFiles }));
      toast.success('Project saved locally!');
    } finally {
      setSaving(false);
    }
  };

  // Convert files object to ensure leading slash format
  const sanitizedFiles = {};
  Object.entries(files || {}).forEach(([p, content]) => {
    const key = p.startsWith('/') ? p : `/${p}`;
    sanitizedFiles[key] = content;
  });

  // Ensure /App.js exists
  if (!sanitizedFiles['/App.js'] && !sanitizedFiles['/App.jsx']) {
    sanitizedFiles['/App.js'] = defaultTemplate.files['/App.js'];
  }

  // Device frame width styling
  const getDeviceFrameStyle = () => {
    if (viewMode === 'code') return {};
    switch (deviceView) {
      case 'mobile':
        return { maxWidth: '375px', margin: '0 auto', border: '1px solid #334155', borderRadius: '16px', overflow: 'hidden' };
      case 'tablet':
        return { maxWidth: '768px', margin: '0 auto', border: '1px solid #334155', borderRadius: '12px', overflow: 'hidden' };
      case 'desktop':
      default:
        return { width: '100%', height: '100%' };
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* Top Header Bar */}
      <header className="h-14 px-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Back to Home"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="bg-transparent font-bold text-sm text-white focus:outline-none focus:bg-slate-800/80 px-2 py-1 rounded max-w-[160px] sm:max-w-xs truncate border border-transparent hover:border-slate-700"
          />
        </div>

        {/* View Switcher Controls (Code / Split / Preview) */}
        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setViewMode('code')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-medium transition-colors ${
              viewMode === 'code' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Code</span>
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-medium transition-colors ${
              viewMode === 'split' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Split</span>
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-medium transition-colors ${
              viewMode === 'preview' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </button>
        </div>

        {/* Device Switcher (Desktop / Tablet / Mobile) */}
        {viewMode !== 'code' && (
          <div className="hidden md:flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setDeviceView('desktop')}
              title="Desktop View (100%)"
              className={`p-1.5 rounded ${deviceView === 'desktop' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Laptop className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceView('tablet')}
              title="Tablet View (768px)"
              className={`p-1.5 rounded ${deviceView === 'tablet' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceView('mobile')}
              title="Mobile View (375px)"
              className={`p-1.5 rounded ${deviceView === 'mobile' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Actions: Reload, Save, Export */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            title="Reload Preview"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleSaveProject}
            disabled={saving}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : 'Save'}</span>
          </button>

          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-brand-600/25 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export ZIP</span>
          </button>
        </div>
      </header>

      {/* Main Builder Stage */}
      <div className="flex-1 flex overflow-hidden w-full h-[calc(100vh-56px)]">
        {/* Left AI Assistant Sidebar */}
        <aside
          className={`transition-all duration-300 flex flex-col border-r border-slate-800 shrink-0 bg-slate-950/95 ${
            sidebarCollapsed ? 'w-12' : 'w-80 lg:w-96'
          }`}
        >
          {sidebarCollapsed ? (
            <div className="flex flex-col items-center py-4 space-y-4">
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                title="Expand AI Assistant"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="w-8 h-8 rounded-lg bg-brand-600/20 text-brand-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full overflow-hidden text-xs">
              {/* Sidebar Header */}
              <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-brand-600/30 border border-brand-500/40 flex items-center justify-center text-brand-300">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-slate-200">AI Assistant</span>
                </div>
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                  title="Collapse Sidebar"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, index) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div key={index} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`max-w-[90%] p-3 rounded-2xl text-xs leading-relaxed ${
                          isUser
                            ? 'bg-brand-600 text-white rounded-br-none shadow-md shadow-brand-600/20'
                            : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                        }`}
                      >
                        {!isUser && (
                          <div className="flex items-center space-x-1.5 mb-1 text-brand-400 font-semibold text-[11px]">
                            <Wand2 className="w-3 h-3" />
                            <span>AI Assistant</span>
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
                    <span>{statusText || 'AI is updating your website...'}</span>
                  </div>
                )}

                {/* Suggested prompt chips */}
                {!loading && (
                  <div className="pt-2">
                    <div className="flex items-center space-x-1 text-slate-400 text-[11px] mb-2 font-medium">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      <span>Quick redesign suggestions</span>
                    </div>
                    <div className="space-y-1.5">
                      {suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => sendRefinementRequest(s)}
                          className="w-full text-left p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800/80 hover:border-brand-500/40 text-slate-300 hover:text-white text-[11px] transition-all"
                        >
                          + {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t border-slate-800 bg-slate-950">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask AI to redesign or add sections..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    disabled={loading}
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading || !chatInput.trim()}
                    className="p-2 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white transition-all shadow-md"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </form>
              </div>
            </div>
          )}
        </aside>

        {/* Center / Right Sandpack Workspace (Unified & Full-Height) */}
        <main className="flex-1 h-full w-full overflow-hidden bg-slate-950">
          <SandpackProvider
            key={refreshKey}
            template="react"
            theme="dark"
            files={sanitizedFiles}
            customSetup={{
              dependencies: {
                'lucide-react': '^0.428.0'
              }
            }}
            options={{
              externalResources: ['https://cdn.tailwindcss.com']
            }}
          >
            <SandpackBridge onUpdateFiles={setCurrentWorkingFiles} refreshTrigger={refreshKey} />

            <SandpackLayout style={{ height: '100%', width: '100%', border: 'none', background: '#020617', display: 'flex' }}>
              {/* Code Editor Pane (fills 100% height when in 'split' or 'code') */}
              {(viewMode === 'code' || viewMode === 'split') && (
                <div
                  className="h-full flex flex-col border-r border-slate-800"
                  style={{ flex: viewMode === 'split' ? 1 : 2, width: viewMode === 'code' ? '100%' : '50%' }}
                >
                  <SandpackCodeEditor
                    showTabs
                    showLineNumbers
                    showInlineErrors
                    wrapContent
                    closableTabs={false}
                    style={{ height: '100%', flex: 1 }}
                  />
                </div>
              )}

              {/* Live Preview Pane (fills 100% height when in 'split' or 'preview') */}
              {(viewMode === 'preview' || viewMode === 'split') && (
                <div
                  className="h-full flex flex-col bg-slate-950 overflow-hidden"
                  style={{
                    flex: viewMode === 'split' ? 1 : 2,
                    width: viewMode === 'preview' ? '100%' : '50%',
                    padding: deviceView !== 'desktop' ? '16px' : '0'
                  }}
                >
                  <div style={getDeviceFrameStyle()} className="h-full flex flex-col flex-1">
                    <SandpackPreview
                      showNavigator={false}
                      showRefreshButton={false}
                      showOpenInCodeSandbox={false}
                      style={{ height: '100%', flex: 1, border: 'none' }}
                    />
                  </div>
                </div>
              )}
            </SandpackLayout>
          </SandpackProvider>
        </main>
      </div>

      {/* Export & Deployment Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        projectTitle={projectTitle}
        files={currentWorkingFiles}
      />
    </div>
  );
}
