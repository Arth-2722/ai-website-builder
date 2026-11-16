/**
 * Instant Client-Side Fallback Template Engine
 * Guarantees the AI website builder NEVER shows blank or fails
 * even if the backend is starting up or temporarily offline.
 */

export function getClientTemplate(prompt = '') {
  const p = (prompt || '').toLowerCase();

  if (p.includes('hospital') || p.includes('clinic') || p.includes('doctor') || p.includes('medical') || p.includes('healthcare') || p.includes('patient') || p.includes('dental') || p.includes('nurse')) {
    return createHospitalTemplate();
  } else if (p.includes('portfolio') || p.includes('resume') || p.includes('developer') || p.includes('designer')) {
    return createPortfolioTemplate();
  } else if (p.includes('food') || p.includes('restaurant') || p.includes('cafe') || p.includes('bakery') || p.includes('menu')) {
    return createRestaurantTemplate();
  } else if (p.includes('shop') || p.includes('store') || p.includes('ecommerce') || p.includes('sneaker')) {
    return createEcommerceTemplate();
  }

  // Default SaaS
  return createSaaSTemplate();
}

function createHospitalTemplate() {
  return {
    title: 'HopeCare Memorial Hospital & Health System',
    description: 'Modern hospital and healthcare portal with interactive appointment booking, doctor directory, and emergency services.',
    files: {
      '/App.js': `import React, { useState } from 'react';

export default function App() {
  const [selectedDept, setSelectedDept] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appointment, setAppointment] = useState({
    patientName: '',
    phone: '',
    department: 'Cardiology',
    doctor: 'Dr. Sarah Jenkins',
    date: '',
    notes: ''
  });
  const [booked, setBooked] = useState(false);

  const departments = [
    { id: 'cardiology', name: 'Cardiology', icon: '❤️', desc: 'Comprehensive cardiac care, diagnostics, and advanced catheterization procedures.' },
    { id: 'neurology', name: 'Neurology', icon: '🧠', desc: 'World-class stroke care, neurosurgery, and comprehensive spinal treatments.' },
    { id: 'pediatrics', name: 'Pediatrics', icon: '👶', desc: 'Compassionate 24/7 neonatal ICU and child wellness healthcare programs.' },
    { id: 'orthopedics', name: 'Orthopedics', icon: '🦴', desc: 'Minimally invasive joint replacement, sports medicine, and trauma reconstruction.' },
    { id: 'oncology', name: 'Oncology', icon: '🔬', desc: 'Precision cancer therapies, radiation oncology, and holistic immunotherapy.' },
    { id: 'emergency', name: 'Emergency Care', icon: '🚑', desc: 'Level 1 Trauma Center with 24/7 rapid ambulance dispatch and dedicated ICU.' }
  ];

  const doctors = [
    {
      name: 'Dr. Sarah Jenkins, MD',
      role: 'Chief of Cardiology',
      dept: 'Cardiology',
      experience: '18 Years Experience',
      rating: '4.9 ★★★★★ (240 reviews)'
    },
    {
      name: 'Dr. Michael Chen, MD, PhD',
      role: 'Head of Neurovascular Surgery',
      dept: 'Neurology',
      experience: '15 Years Experience',
      rating: '4.9 ★★★★★ (185 reviews)'
    },
    {
      name: 'Dr. Elena Rostova, MD',
      role: 'Pediatric Specialist',
      dept: 'Pediatrics',
      experience: '12 Years Experience',
      rating: '5.0 ★★★★★ (310 reviews)'
    },
    {
      name: 'Dr. Marcus Vance, MD',
      role: 'Orthopedic Trauma Surgeon',
      dept: 'Orthopedics',
      experience: '16 Years Experience',
      rating: '4.8 ★★★★★ (190 reviews)'
    }
  ];

  const handleBooking = (e) => {
    e.preventDefault();
    if (appointment.patientName && appointment.phone) {
      setBooked(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      {/* 24/7 Emergency Alert Banner */}
      <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-red-700 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between shadow-md">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="animate-pulse">🚨</span>
            <span>24/7 Emergency Center & Ambulance Dispatch:</span>
            <span className="underline font-bold text-amber-200">+1 (800) 911-HOPE</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4 text-[11px] opacity-90">
            <span>● Level 1 Trauma Center</span>
            <span>● Walk-in Urgent Care Open</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/90 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-cyan-500/20 font-bold">
              ✚
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white block">
                HopeCare <span className="text-cyan-400 font-normal text-sm">Hospital</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase block font-mono">
                Medical & Research Center
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#departments" className="hover:text-cyan-400 transition-colors">Departments</a>
            <a href="#doctors" className="hover:text-cyan-400 transition-colors">Specialists</a>
            <a href="#services" className="hover:text-cyan-400 transition-colors">Patient Services</a>
            <a href="#appointment" className="hover:text-cyan-400 transition-colors">Appointments</a>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <a
              href="#appointment"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all hover:scale-102"
            >
              Book Appointment
            </a>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white"
          >
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden px-4 py-4 bg-slate-950 border-b border-slate-800 space-y-3 text-sm">
            <a href="#departments" className="block text-slate-300">Departments</a>
            <a href="#doctors" className="block text-slate-300">Doctors</a>
            <a href="#appointment" className="block text-cyan-400 font-semibold">Book Appointment</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-semibold mb-6">
                <span>🛡️ Ranked #1 Regional Hospital for Clinical Excellence</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Compassionate Care.{' '}
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                  World-Class Medicine.
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Dedicated to providing patient-centered, advanced healthcare with over 150+ board-certified medical specialists, state-of-the-art robotic surgery, and comprehensive 24/7 trauma emergency care.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#appointment"
                  className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all hover:scale-102"
                >
                  Schedule Consultation
                </a>
                <a
                  href="#doctors"
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all"
                >
                  Meet Our Doctors
                </a>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-slate-800">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">99.4%</div>
                  <div className="text-xs text-slate-400 mt-1">Patient Satisfaction</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">150+</div>
                  <div className="text-xs text-slate-400 mt-1">Specialist Doctors</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-teal-400">24/7</div>
                  <div className="text-xs text-slate-400 mt-1">Emergency & ICU</div>
                </div>
              </div>
            </div>

            {/* Quick Consultation Form */}
            <div className="lg:col-span-5">
              <div className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800 shadow-2xl backdrop-blur-md relative overflow-hidden">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-lg">
                    📅
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Book an Appointment</h3>
                    <p className="text-xs text-slate-400">Instant confirmation & same-day slots</p>
                  </div>
                </div>

                {booked ? (
                  <div className="p-6 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-sm text-center">
                    <div className="text-3xl mb-2">✅</div>
                    <h4 className="font-bold text-base text-white">Appointment Confirmed!</h4>
                    <p className="mt-2 text-xs text-emerald-200">
                      Thank you, {appointment.patientName}. We have reserved your visit with {appointment.doctor} ({appointment.department}). Confirmation sent to {appointment.phone}.
                    </p>
                    <button
                      onClick={() => setBooked(false)}
                      className="mt-5 px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700"
                    >
                      Book Another Visit
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-4 text-left">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Patient Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Johnathan Davis"
                        value={appointment.patientName}
                        onChange={(e) => setAppointment({ ...appointment, patientName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="+1 (555) 000-0000"
                          value={appointment.phone}
                          onChange={(e) => setAppointment({ ...appointment, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Department</label>
                        <select
                          value={appointment.department}
                          onChange={(e) => setAppointment({ ...appointment, department: e.target.value })}
                          className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                        >
                          <option>Cardiology</option>
                          <option>Neurology</option>
                          <option>Pediatrics</option>
                          <option>Orthopedics</option>
                          <option>General Medicine</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Date</label>
                      <input
                        type="date"
                        required
                        value={appointment.date}
                        onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all"
                    >
                      Confirm Appointment Booking
                    </button>
                    <p className="text-[11px] text-slate-500 text-center">
                      🔒 HIPAA Compliant & 100% Confidential
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Departments Section */}
      <section id="departments" className="py-20 bg-slate-950/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Centers of Clinical Excellence</h2>
            <p className="mt-3 text-3xl font-extrabold sm:text-4xl text-white">Specialized Medical Departments</p>
            <p className="mt-3 text-slate-400 text-sm">Equipped with cutting-edge medical technologies and multidisciplinary care teams.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((d) => (
              <div
                key={d.id}
                className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  {d.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {d.name}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                  {d.desc}
                </p>
                <a href="#appointment" className="text-cyan-400 text-xs font-bold inline-flex items-center gap-1 hover:underline">
                  <span>Schedule Consultation</span> →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialist Doctors Directory */}
      <section id="doctors" className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Medical Faculty</h2>
            <p className="mt-3 text-3xl font-extrabold sm:text-4xl text-white">Distinguished Specialists</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doc, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center hover:border-cyan-500/40 transition-all"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
                  {doc.name.charAt(4)}
                </div>
                <h4 className="font-bold text-white text-base">{doc.name}</h4>
                <p className="text-cyan-400 text-xs font-medium mt-1">{doc.role}</p>
                <p className="text-slate-400 text-xs mt-2">{doc.experience}</p>
                <div className="text-amber-400 text-xs mt-2 font-mono">{doc.rating}</div>
                <a
                  href="#appointment"
                  className="mt-5 block w-full py-2 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-white rounded-lg text-xs font-bold transition-all"
                >
                  Book with Doctor
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 text-white font-bold text-base mb-2">
            <span className="text-cyan-400 text-xl">✚</span>
            <span>HopeCare Memorial Hospital</span>
          </div>
          <p className="text-slate-500">742 Evergreen Medical Parkway • Emergency: +1 (800) 911-HOPE • 24/7 Clinical Care</p>
        </div>
      </footer>
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
    <title>HopeCare Hospital</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-slate-900">
    <div id="root"></div>
  </body>
</html>
`
    }
  };
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
