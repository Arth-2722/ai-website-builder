import JSZip from 'jszip';

export async function exportProjectToZip(projectTitle, files) {
  const zip = new JSZip();
  const folderName = (projectTitle || 'ai-website')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-');

  const root = zip.folder(folderName);

  // Add files
  if (files && typeof files === 'object') {
    Object.entries(files).forEach(([filePath, content]) => {
      const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
      root.file(cleanPath, content);
    });
  }

  // Include ready-to-run package.json if not present
  if (!files['/package.json'] && !files['package.json']) {
    const pkg = {
      name: folderName,
      private: true,
      version: '0.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview'
      },
      dependencies: {
        react: '^18.3.1',
        'react-dom': '^18.3.1',
        'lucide-react': '^0.428.0'
      },
      devDependencies: {
        '@vitejs/plugin-react': '^4.3.1',
        vite: '^5.4.1',
        tailwindcss: '^3.4.10',
        autoprefixer: '^10.4.20',
        postcss: '^8.4.41'
      }
    };
    root.file('package.json', JSON.stringify(pkg, null, 2));
  }

  // Add a helpful README.md
  root.file(
    'README.md',
    `# ${projectTitle || 'AI Generated Website'}

Generated with **WebCraft AI Website Builder**.

## Quick Start
1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
2. Start local development server:
   \`\`\`bash
   npm run dev
   \`\`\`
3. Build for production:
   \`\`\`bash
   npm run build
   \`\`\`
`
  );

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${folderName}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
