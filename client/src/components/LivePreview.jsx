import React, { useState, useEffect, useRef } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview
} from '@codesandbox/sandpack-react';
import { Laptop, Tablet, Smartphone, RotateCw, ExternalLink } from 'lucide-react';

export default function LivePreview({ files, deviceView, onDeviceChange }) {
  const [key, setKey] = useState(0);
  const [renderMode, setRenderMode] = useState('sandpack'); // 'sandpack' | 'iframe'
  const iframeRef = useRef(null);

  const refreshPreview = () => {
    setKey((prev) => prev + 1);
  };

  // Convert files object to format accepted by Sandpack
  const formattedSandpackFiles = {};
  if (files && typeof files === 'object') {
    Object.entries(files).forEach(([path, content]) => {
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      formattedSandpackFiles[cleanPath] = { code: content };
    });
  }

  // Ensure entry files exist for Sandpack
  if (!formattedSandpackFiles['/App.js'] && !formattedSandpackFiles['/App.jsx']) {
    formattedSandpackFiles['/App.js'] = {
      code: `import React from 'react';
export default function App() {
  return (
    <div className="p-8 text-center text-slate-100 bg-slate-900 min-h-screen">
      <h1 className="text-2xl font-bold">Preview Ready</h1>
      <p className="text-slate-400 mt-2">Generate a website from prompt to preview here.</p>
    </div>
  );
}`
    };
  }

  // Generate fallback HTML string for iframe mode
  const getIframeHTML = () => {
    const appCode = files['/App.js'] || files['App.js'] || '';
    const stylesCode = files['/styles.css'] || files['styles.css'] || '';

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      ${stylesCode}
    </style>
  </head>
  <body class="bg-slate-950 text-slate-100 antialiased">
    <div id="root"></div>
    <script type="text/babel">
      ${appCode.replace(/import React[^;]*;/g, '').replace(/export default/g, 'const MainApp =')}
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<MainApp />);
    </script>
  </body>
</html>`;
  };

  const getContainerWidth = () => {
    switch (deviceView) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-hidden">
      {/* Top Preview Controls Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs">
        {/* Device Switcher */}
        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => onDeviceChange('desktop')}
            title="Desktop View (100%)"
            className={`p-1.5 rounded ${
              deviceView === 'desktop' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDeviceChange('tablet')}
            title="Tablet View (768px)"
            className={`p-1.5 rounded ${
              deviceView === 'tablet' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDeviceChange('mobile')}
            title="Mobile View (375px)"
            className={`p-1.5 rounded ${
              deviceView === 'mobile' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <span className="hidden sm:inline text-[11px] text-slate-500 font-mono">
            {deviceView === 'desktop' ? '100% Full' : deviceView === 'tablet' ? '768px' : '375px'}
          </span>

          <button
            onClick={refreshPreview}
            title="Reload Preview"
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
          >
            <RotateCw className="w-3 h-3" />
            <span>Reload</span>
          </button>
        </div>
      </div>

      {/* Main Preview Container with dynamic width frame */}
      <div className="flex-1 bg-slate-950/60 p-4 flex items-center justify-center overflow-auto">
        <div
          className={`h-full ${getContainerWidth()} mx-auto transition-all duration-300 bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-800 flex flex-col`}
        >
          {renderMode === 'sandpack' ? (
            <SandpackProvider
              key={key}
              template="react"
              theme="dark"
              files={formattedSandpackFiles}
              customSetup={{
                dependencies: {
                  'lucide-react': '^0.428.0'
                }
              }}
              options={{
                externalResources: ['https://cdn.tailwindcss.com']
              }}
            >
              <SandpackLayout className="h-full !border-none !rounded-none">
                <SandpackPreview
                  showOpenInCodeSandbox={false}
                  showRefreshButton={false}
                  className="h-full !border-none"
                />
              </SandpackLayout>
            </SandpackProvider>
          ) : (
            <iframe
              ref={iframeRef}
              srcDoc={getIframeHTML()}
              title="Live Website Preview"
              className="w-full h-full border-none bg-slate-950"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          )}
        </div>
      </div>
    </div>
  );
}
