import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, Zap, Shield, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Pricing() {
  const { user, setAuthModalOpen } = useAuth();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Free Starter',
      price: '$0',
      period: 'forever',
      description: 'Ideal for trying out AI website building with free models and templates.',
      features: [
        '50 AI Website Generations',
        'Google Gemini & OpenRouter Free Models',
        'In-browser Sandpack Live Preview',
        'Full React & Tailwind Code Editor',
        '1-Click ZIP Source Code Export',
        'Responsive Device Testing (Mobile/Tablet)'
      ],
      popular: false,
      buttonText: user ? 'Current Plan' : 'Get Started Free',
      action: () => (!user ? setAuthModalOpen(true) : null)
    },
    {
      name: 'Pro Creator',
      price: billingCycle === 'monthly' ? '$19' : '$15',
      period: 'per month',
      description: 'For developers, freelancers, and designers who build websites daily.',
      features: [
        '500 High-Speed AI Generations / mo',
        'Instant Iterative AI Refinement Chat',
        'Priority Claude & GPT-4o Model Access',
        'Unlimited Saved Web Projects',
        'VIP ZIP Bundles with Pre-configured Scripts',
        'Direct 1-Click Deployment to Vercel/Netlify'
      ],
      popular: true,
      buttonText: 'Upgrade to Pro',
      action: () => alert('Demo SaaS: Stripe payment webhook integrated in backend routes.')
    },
    {
      name: 'Agency & Enterprise',
      price: billingCycle === 'monthly' ? '$49' : '$39',
      period: 'per month',
      description: 'For agencies and teams building high-volume client websites.',
      features: [
        'Unlimited AI Website Generations',
        'Custom Fine-Tuned Brand Models',
        'Team Collaboration & Multi-Seat Access',
        'Custom Domain Publishing',
        'Full White-Labeling Options',
        'Dedicated 24/7 Priority Support & SLA'
      ],
      popular: false,
      buttonText: 'Contact Sales',
      action: () => alert('Please contact enterprise@webcraft.ai for dedicated team pricing.')
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simple, Transparent Pricing</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Flexible plans for creators & teams
        </h1>
        <p className="mt-4 text-base text-slate-400 max-w-xl mx-auto">
          Start for 100% free with generous credits, then upgrade as you scale your web development workflow.
        </p>

        {/* Billing cycle toggle */}
        <div className="mt-8 inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-lg transition-all ${
              billingCycle === 'monthly' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-2 rounded-lg transition-all ${
              billingCycle === 'annual' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Annual Billing (Save 20%)
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`p-8 rounded-3xl bg-slate-900/90 border flex flex-col justify-between relative transition-all ${
                plan.popular
                  ? 'border-brand-500 shadow-2xl shadow-brand-500/20 scale-105 bg-slate-900'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 text-[10px] font-bold tracking-wider text-white uppercase shadow-md">
                  Most Popular Choice
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1.5 pb-6 border-b border-slate-800">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-xs text-slate-400">/{plan.period}</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-slate-300">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={plan.action}
                className={`mt-8 w-full py-3 rounded-xl text-xs font-bold transition-all shadow-md ${
                  plan.popular
                    ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-600/30 hover:scale-102'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="mt-24 max-w-3xl mx-auto text-left">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <h4 className="text-sm font-semibold text-white">Can I use this completely for free?</h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Yes! The Free Starter plan includes 50 free generations, and our Universal Synthesis engine works 100% offline with zero keys. You can also plug in your own free Google Gemini or OpenRouter key.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <h4 className="text-sm font-semibold text-white">Do I own the exported website code?</h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Yes, 100%. When you download the ZIP archive, you get complete ownership of all React components, styling, and configuration. You can host it on Vercel, Netlify, or deploy it to your own clients.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <h4 className="text-sm font-semibold text-white">How does live Sandpack preview work?</h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                It uses CodeSandbox Sandpack in-browser React execution to bundle and render your components instantly in a sandboxed iframe without needing a cloud build server.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
