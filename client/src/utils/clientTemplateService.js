/**
 * Instant Client-Side Fallback Template Engine
 * Guarantees the AI website builder NEVER shows blank or fails
 * even if the backend is starting up or temporarily offline.
 */

export function getClientTemplate(prompt = '') {
  const p = (prompt || '').toLowerCase();

  if (p.includes('portfolio') || p.includes('resume') || p.includes('developer') || p.includes('designer')) {
    return createPortfolioTemplate();
  } else if (p.includes('food') || p.includes('restaurant') || p.includes('cafe') || p.includes('bakery') || p.includes('menu')) {
    return createRestaurantTemplate();
  } else if (p.includes('shop') || p.includes('store') || p.includes('ecommerce') || p.includes('sneaker')) {
    return createEcommerceTemplate();
  }

  // Default SaaS
  return createSaaSTemplate();
}

function createSaaSTemplate() {
  return {
    title: 'NovaFlow AI - Workflow Automation SaaS',
    description: 'Modern high-converting SaaS landing page with dark theme, interactive pricing, and metrics.',
    files: {
      '/App.js': `import React, { useState } from 'react';

export default function App() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/25">
              ⚡
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              NovaFlow
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#solutions" className="hover:text-indigo-400 transition-colors">Solutions</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-indigo-400 transition-colors">Testimonials</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95">
              Start Free Trial
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-400 hover:text-white"
          >
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-6 space-y-3 bg-slate-900 border-b border-slate-800 text-sm">
            <a href="#features" className="block text-slate-300">Features</a>
            <a href="#pricing" className="block text-slate-300">Pricing</a>
            <button className="w-full mt-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium">
              Start Free Trial
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden text-center px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-6">
          <span>✨ Introducing NovaFlow 2.0</span>
          <span>→</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
          Automate workflows with{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            intelligent AI agents
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal">
          Build, deploy, and scale autonomous AI workflows that integrate effortlessly with your current stack. Zero code required.
        </p>

        {/* Form */}
        <div className="mt-8 max-w-md mx-auto">
          {subscribed ? (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs rounded-xl">
              🎉 Thanks for joining our early access list!
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }} className="flex gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-xl">
              <input 
                type="email"
                required
                placeholder="Enter work email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md">
                Get Started
              </button>
            </form>
          )}
        </div>

        {/* Dashboard Mockup */}
        <div className="mt-12 max-w-4xl mx-auto rounded-2xl p-4 bg-slate-900/90 border border-slate-800 shadow-2xl text-left">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-500 font-mono">
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
            </div>
            <span>dashboard.novaflow.ai</span>
            <span className="text-emerald-400">● Live 99.98%</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              <div className="text-xs text-slate-400">Total Workflows</div>
              <div className="text-2xl font-bold mt-1 text-white">128,490</div>
              <div className="text-xs text-emerald-400 mt-1">↑ 24.8% this week</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              <div className="text-xs text-slate-400">Tasks Automated</div>
              <div className="text-2xl font-bold mt-1 text-white">4.2M</div>
              <div className="text-xs text-indigo-400 mt-1">Saving 8,400+ hrs</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
              <div className="text-xs text-slate-400">Cost Savings</div>
              <div className="text-2xl font-bold mt-1 text-white">$142,500</div>
              <div className="text-xs text-emerald-400 mt-1">↑ 32.1% ROI</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Simple, transparent pricing</h2>
          <div className="mt-6 inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={\`px-3 py-1 rounded-lg \${billingCycle === 'monthly' ? 'bg-indigo-600 text-white' : 'text-slate-400'}\`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('annual')}
              className={\`px-3 py-1 rounded-lg \${billingCycle === 'annual' ? 'bg-indigo-600 text-white' : 'text-slate-400'}\`}
            >
              Annual (Save 20%)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-left">
            {[
              { name: 'Starter', price: billingCycle === 'monthly' ? '$29' : '$24', desc: 'For solo creators & experiments.' },
              { name: 'Pro', popular: true, price: billingCycle === 'monthly' ? '$79' : '$64', desc: 'For scaling teams & automated pipelines.' },
              { name: 'Enterprise', price: 'Custom', desc: 'Dedicated cluster with custom SLAs.' }
            ].map((plan, i) => (
              <div key={i} className={\`p-6 rounded-2xl bg-slate-900 border \${plan.popular ? 'border-indigo-500 shadow-xl' : 'border-slate-800'}\`}>
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{plan.desc}</p>
                <div className="text-3xl font-extrabold text-white mt-4">{plan.price}</div>
                <button className={\`mt-6 w-full py-2 rounded-lg text-xs font-semibold \${plan.popular ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-slate-800 text-white'}\`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
`,
      '/styles.css': `@tailwind base;
@tailwind components;
@tailwind utilities;
`,
      '/public/index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NovaFlow</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-slate-950">
    <div id="root"></div>
  </body>
</html>
`
    }
  };
}

function createPortfolioTemplate() {
  return {
    title: 'Alex Rivers - Portfolio',
    description: 'Clean developer & designer portfolio.',
    files: {
      '/App.js': `import React, { useState } from 'react';

export default function App() {
  const [filter, setFilter] = useState('all');

  const works = [
    { title: 'Pulse AI', tag: 'Next.js / AI', desc: 'Fintech forecasting engine.' },
    { title: 'Aura UI', tag: 'Design System', desc: 'Accessible React UI components.' },
    { title: 'Zenith Habit', tag: 'Mobile', desc: 'Focus and meditation app.' }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-8 font-sans">
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-12">
        <h1 className="text-xl font-bold">Alex Rivers</h1>
        <div className="flex gap-4 text-xs text-neutral-400">
          <a href="#work" className="hover:text-amber-400">Work</a>
          <a href="#contact" className="hover:text-amber-400">Contact</a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold leading-tight text-white mb-6">
          Crafting thoughtful digital interfaces for web & mobile.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {works.map((w, i) => (
            <div key={i} className="p-5 rounded-xl bg-neutral-900 border border-neutral-800">
              <span className="text-[10px] text-amber-400 font-mono">{w.tag}</span>
              <h3 className="text-lg font-bold text-white mt-1">{w.title}</h3>
              <p className="text-xs text-neutral-400 mt-2">{w.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
`,
      '/styles.css': `@tailwind base;
@tailwind components;
@tailwind utilities;
`,
      '/public/index.html': `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-neutral-950">
    <div id="root"></div>
  </body>
</html>
`
    }
  };
}

function createRestaurantTemplate() {
  return createSaaSTemplate();
}

function createEcommerceTemplate() {
  return createSaaSTemplate();
}
