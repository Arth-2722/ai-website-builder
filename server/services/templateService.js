/**
 * Built-in Smart Template Engine
 * 100% Free, Offline, Zero-Config Fallback Generator
 * Produces clean, modern, multi-section React + Tailwind code based on keywords in the user's prompt.
 */

function generateTemplateFromPrompt(prompt) {
  const p = prompt.toLowerCase();

  let category = 'saas';
  if (p.includes('hospital') || p.includes('clinic') || p.includes('doctor') || p.includes('medical') || p.includes('healthcare') || p.includes('patient') || p.includes('dental') || p.includes('pharmacy') || p.includes('nurse')) {
    category = 'hospital';
  } else if (p.includes('portfolio') || p.includes('resume') || p.includes('developer') || p.includes('designer')) {
    category = 'portfolio';
  } else if (p.includes('food') || p.includes('restaurant') || p.includes('cafe') || p.includes('bakery') || p.includes('menu') || p.includes('coffee') || p.includes('pizza') || p.includes('burger')) {
    category = 'restaurant';
  } else if (p.includes('shop') || p.includes('store') || p.includes('ecommerce') || p.includes('product') || p.includes('sneaker') || p.includes('fashion') || p.includes('clothing')) {
    category = 'ecommerce';
  } else if (p.includes('agency') || p.includes('marketing') || p.includes('studio') || p.includes('consulting')) {
    category = 'agency';
  } else if (p.includes('fitness') || p.includes('gym') || p.includes('workout') || p.includes('yoga') || p.includes('trainer')) {
    category = 'fitness';
  }

  switch (category) {
    case 'hospital':
      return createHospitalTemplate(prompt);
    case 'portfolio':
      return createPortfolioTemplate(prompt);
    case 'restaurant':
      return createRestaurantTemplate(prompt);
    case 'ecommerce':
      return createEcommerceTemplate(prompt);
    case 'agency':
      return createAgencyTemplate(prompt);
    case 'fitness':
      return createFitnessTemplate(prompt);
    case 'saas':
    default:
      return createSaaSTemplate(prompt);
  }
}

function createHospitalTemplate(prompt) {
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
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <a
              href="#appointment"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all hover:scale-102"
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile hamburger */}
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-950 -z-10" />

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

              {/* Hospital Trust Badges */}
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

            {/* Quick Emergency / Consultation Card */}
            <div className="lg:col-span-5">
              <div className="p-8 rounded-3xl bg-slate-950/80 border border-slate-800 shadow-2xl backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -z-10" />

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
                      🔒 HIPPA Compliant & 100% Confidential
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
            <p className="mt-3 text-slate-400 text-sm">Meet our department heads and leading healthcare practitioners.</p>
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

      {/* Patient Care & Insurance */}
      <section id="services" className="py-16 bg-slate-950/40 border-t border-slate-800 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Accepted Insurance Providers</h3>
          <p className="text-xs text-slate-500 mt-1">We accept over 40+ major health insurance networks and Medicare plans</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-slate-400 font-bold text-sm">
            <span className="p-3 bg-slate-900 rounded-xl border border-slate-800">BlueCross BlueShield</span>
            <span className="p-3 bg-slate-900 rounded-xl border border-slate-800">UnitedHealthcare</span>
            <span className="p-3 bg-slate-900 rounded-xl border border-slate-800">Medicare & Medicaid</span>
            <span className="p-3 bg-slate-900 rounded-xl border border-slate-800">Aetna Health</span>
            <span className="p-3 bg-slate-900 rounded-xl border border-slate-800">Cigna Global</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
          <div>
            <div className="flex items-center space-x-2 text-white font-bold text-base mb-3">
              <span className="text-cyan-400 text-xl">✚</span>
              <span>HopeCare Hospital</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Providing modern, compassionate healthcare and 24/7 emergency response to our communities.
            </p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Emergency Contacts</h5>
            <p className="text-rose-400 font-bold">🚑 Ambulance: 911</p>
            <p className="mt-1">Trauma Hotline: (800) 911-4673</p>
            <p className="mt-1">Poison Control: (800) 222-1222</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Hospital Campus</h5>
            <p>742 Evergreen Medical Parkway</p>
            <p className="mt-1">New York, NY 10021</p>
            <p className="mt-1">Visiting Hours: 8:00 AM - 9:00 PM</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Accreditations</h5>
            <p>✓ Joint Commission Gold Seal</p>
            <p className="mt-1">✓ Magnet Nursing Recognition</p>
            <p className="mt-1">✓ AHA Stroke Gold Plus</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-900 text-center text-slate-500">
          © {new Date().getFullYear()} HopeCare Health System. All rights reserved. HIPAA Protected.
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
    <title>HopeCare Hospital & Medical Center</title>
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

function createSaaSTemplate(prompt) {
  return {
    title: 'Nova AI - Intelligent Workflow SaaS',
    description: 'Modern, high-converting SaaS landing page with dark mode, interactive pricing, and feature highlights.',
    files: {
      '/App.js': `import React, { useState } from 'react';

export default function App() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

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

          {/* Mobile hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-400 hover:text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-6 space-y-3 bg-slate-900 border-b border-slate-800">
            <a href="#features" className="block text-slate-300 hover:text-white">Features</a>
            <a href="#solutions" className="block text-slate-300 hover:text-white">Solutions</a>
            <a href="#pricing" className="block text-slate-300 hover:text-white">Pricing</a>
            <button className="w-full mt-2 px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white">
              Start Free Trial
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-900/25 via-slate-950 to-slate-950 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-8 animate-pulse">
            <span>✨ Introducing NovaFlow 2.0</span>
            <span>→</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Automate workflows with{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              intelligent AI agents
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal">
            Build, deploy, and scale autonomous AI workflows that integrate effortlessly with your current stack. Zero code required.
          </p>

          {/* Email CTA */}
          <div className="mt-10 max-w-md mx-auto">
            {submitted ? (
              <div className="p-4 bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 rounded-xl text-sm font-medium animate-fadeIn">
                🎉 Thanks for subscribing! You're on the early access list.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl focus-within:border-indigo-500">
                <input 
                  type="email"
                  required
                  placeholder="Enter your work email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
                />
                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-md shadow-indigo-600/30"
                >
                  Get Started
                </button>
              </form>
            )}
            <p className="mt-3 text-xs text-slate-500">Free 14-day trial • No credit card required</p>
          </div>

          {/* Interactive UI Mockup */}
          <div className="mt-16 relative max-w-5xl mx-auto rounded-2xl p-2 bg-gradient-to-b from-indigo-500/30 via-slate-800/50 to-transparent border border-indigo-500/20 shadow-2xl">
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 text-left">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-xs text-slate-500 font-mono">dashboard.novaflow.ai</div>
                <div className="text-xs text-emerald-400 font-mono">● Live 99.98%</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/80">
                  <div className="text-xs text-slate-400">Total Workflows</div>
                  <div className="text-2xl font-bold mt-1 text-white">128,490</div>
                  <div className="text-xs text-emerald-400 mt-2">↑ 24.8% this week</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/80">
                  <div className="text-xs text-slate-400">Tasks Automated</div>
                  <div className="text-2xl font-bold mt-1 text-white">4.2M</div>
                  <div className="text-xs text-indigo-400 mt-2">Saving 8,400+ hrs</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/80">
                  <div className="text-xs text-slate-400">Cost Savings</div>
                  <div className="text-2xl font-bold mt-1 text-white">$142,500</div>
                  <div className="text-xs text-emerald-400 mt-2">↑ 32.1% ROI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-slate-900/50 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Built for modern scale</h2>
            <p className="mt-3 text-3xl font-bold sm:text-4xl text-white">Everything your team needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Real-Time Execution',
                desc: 'Sub-millisecond triggers with distributed cloud instances across 18 edge regions globally.'
              },
              {
                icon: '🛡️',
                title: 'Enterprise Security',
                desc: 'End-to-end encrypted pipelines, SOC2 Type II compliance, and granular RBAC access controls.'
              },
              {
                icon: '🔄',
                title: '200+ Integrations',
                desc: 'Connect seamlessly with Slack, GitHub, Notion, Jira, Salesforce, Stripe, and PostgreSQL.'
              }
            ].map((feat, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all hover:-translate-y-1">
                <div className="text-4xl mb-4">{feat.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Simple, transparent pricing</h2>
          <p className="mt-4 text-slate-400">Scale as you grow. Cancel anytime with zero penalty.</p>

          <div className="mt-8 inline-flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={\`px-4 py-1.5 text-xs font-medium rounded-lg transition-all \${billingCycle === 'monthly' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}\`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('annual')}
              className={\`px-4 py-1.5 text-xs font-medium rounded-lg transition-all \${billingCycle === 'annual' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}\`}
            >
              Annual (Save 20%)
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
            {[
              {
                name: 'Starter',
                price: billingCycle === 'monthly' ? '$29' : '$24',
                desc: 'Great for solo founders and experimental side-projects.',
                features: ['5 Active Workflows', '10,000 tasks/month', 'Community support', 'Standard webhook speed']
              },
              {
                name: 'Pro',
                popular: true,
                price: billingCycle === 'monthly' ? '$79' : '$64',
                desc: 'For high-growth teams requiring scalable automation.',
                features: ['Unlimited Workflows', '100,000 tasks/month', 'Priority 24/7 support', 'Custom AI agent fine-tuning', 'Team collaboration']
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                desc: 'Dedicated infrastructure with customized SLA and security.',
                features: ['Dedicated servers', 'Unlimited executions', 'Custom SSO & SAML', 'Dedicated Solutions Architect']
              }
            ].map((plan, i) => (
              <div 
                key={i} 
                className={\`p-8 rounded-2xl bg-slate-900 border relative transition-all \${plan.popular ? 'border-indigo-500 shadow-2xl shadow-indigo-500/20 scale-105' : 'border-slate-800 hover:border-slate-700'}\`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-500 text-[10px] font-bold tracking-wider text-white uppercase shadow-md">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-xs text-slate-400">{plan.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-xs text-slate-400">/mo</span>}
                </div>
                <ul className="mt-6 space-y-3 text-sm text-slate-300">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button className={\`mt-8 w-full py-2.5 rounded-xl font-medium text-sm transition-all \${plan.popular ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-800 hover:bg-slate-700 text-white'}\`}>
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white text-sm">NovaFlow Inc.</span>
            <span>© 2026. All rights reserved.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Documentation</a>
            <a href="#" className="hover:text-white">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
`,
      '/styles.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}
`,
      '/public/index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NovaFlow - AI SaaS</title>
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

function createPortfolioTemplate(prompt) {
  return {
    title: 'Alex Rivers - Creative Developer Portfolio',
    description: 'Minimalist, sleek developer and designer portfolio with interactive project filter and contact drawer.',
    files: {
      '/App.js': `import React, { useState } from 'react';

export default function App() {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    { id: 1, title: 'Pulse AI', category: 'web', tag: 'Next.js / AI', desc: 'Predictive analytics suite for fintech companies.' },
    { id: 2, title: 'Aura Design System', category: 'design', tag: 'Figma / UI', desc: 'Comprehensive token-based component library.' },
    { id: 3, title: 'Zenith Mobile', category: 'mobile', tag: 'React Native', desc: 'Mindfulness and focus habit tracker app.' },
    { id: 4, title: 'HyperGraph 3D', category: 'web', tag: 'Three.js / WebGL', desc: 'Interactive node graph visualization engine.' }
  ];

  const filtered = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-400 selection:text-black">
      {/* Header */}
      <header className="max-w-5xl mx-auto px-6 py-12 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Alex Rivers</h1>
          <p className="text-xs text-neutral-400 mt-0.5">Frontend Architect & UI Designer</p>
        </div>
        <div className="flex gap-4 text-xs font-medium text-neutral-300">
          <a href="#work" className="hover:text-amber-400 transition-colors">Work</a>
          <a href="#about" className="hover:text-amber-400 transition-colors">About</a>
          <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="inline-block px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-amber-400 mb-6 font-mono">
          Available for Q2/Q3 Contracts
        </div>
        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl text-white">
          Crafting exceptional digital experiences at the intersection of design & engineering.
        </h2>
      </section>

      {/* Projects */}
      <section id="work" className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8 border-b border-neutral-800 pb-4">
          <h3 className="text-lg font-semibold text-white">Selected Works</h3>
          <div className="flex gap-2">
            {['all', 'web', 'design', 'mobile'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={\`px-3 py-1 rounded-lg text-xs capitalize transition-all \${activeFilter === filter ? 'bg-amber-400 text-black font-semibold' : 'text-neutral-400 hover:text-white bg-neutral-900'}\`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <div key={item.id} className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-amber-400/50 transition-all group">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">{item.tag}</span>
              <h4 className="text-xl font-bold text-white mt-2 group-hover:text-amber-300 transition-colors">{item.title}</h4>
              <p className="text-neutral-400 text-sm mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="max-w-5xl mx-auto px-6 py-16 border-t border-neutral-800 mt-20 text-center">
        <h3 className="text-2xl font-bold text-white">Let's build something unforgettable.</h3>
        <p className="text-sm text-neutral-400 mt-2">Get in touch at alex@riversdesign.dev</p>
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
    <title>Portfolio - Alex Rivers</title>
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

function createRestaurantTemplate(prompt) {
  return {
    title: 'L’Osteria Bella - Artisanal Italian Dining',
    description: 'Warm, elegant culinary landing page with reservation modal, full seasonal menu, and guest reviews.',
    files: {
      '/App.js': `import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('starters');
  const [reservation, setReservation] = useState({ name: '', guests: '2', date: '' });
  const [booked, setBooked] = useState(false);

  const menu = {
    starters: [
      { name: 'Bruschetta al Tartufo', price: '$18', desc: 'Toasted sourdough, wild mushrooms, black truffle oil, micro basil' },
      { name: 'Carpaccio di Manzo', price: '$22', desc: 'Thinly sliced prime beef, capers, aged parmesan, lemon dressing' }
    ],
    mains: [
      { name: 'Tagliolini ai Frutti di Mare', price: '$34', desc: 'Handmade ribbon pasta, calamari, tiger prawns, white wine broth' },
      { name: 'Ossobuco alla Milanese', price: '$42', desc: 'Slow-braised veal shank with saffron risotto and gremolata' }
    ],
    desserts: [
      { name: 'Tiramisù Tradizionale', price: '$14', desc: 'Espresso-soaked savoiardi, mascarpone cream, dark cocoa' },
      { name: 'Panna Cotta ai Frutti di Bosco', price: '$13', desc: 'Vanilla bean custard with wild berry reduction' }
    ]
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-serif">
      <header className="border-b border-stone-800 py-6 text-center">
        <h1 className="text-3xl font-bold tracking-widest text-amber-100 uppercase">L’Osteria Bella</h1>
        <p className="text-xs text-stone-400 font-sans tracking-widest uppercase mt-1">Authentic Culinary Heritage</p>
      </header>

      <section className="py-20 text-center px-4">
        <h2 className="text-4xl sm:text-5xl font-light text-stone-100 italic">Where passion meets the plate</h2>
        <p className="font-sans text-stone-400 max-w-xl mx-auto mt-4 text-sm leading-relaxed">
          Experience time-honored recipes passed down through three generations in the heart of Rome.
        </p>
      </section>

      {/* Menu Tabs */}
      <section className="max-w-3xl mx-auto px-6 py-8 font-sans">
        <div className="flex justify-center space-x-6 border-b border-stone-800 pb-4">
          {['starters', 'mains', 'desserts'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={\`text-sm uppercase tracking-wider transition-colors \${activeTab === tab ? 'text-amber-300 font-semibold border-b-2 border-amber-300 pb-1' : 'text-stone-400 hover:text-stone-200'}\`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-6">
          {menu[activeTab].map((dish, i) => (
            <div key={i} className="flex justify-between items-baseline border-b border-stone-900 pb-4">
              <div>
                <h4 className="text-lg font-serif text-stone-100">{dish.name}</h4>
                <p className="text-xs text-stone-400 mt-1">{dish.desc}</p>
              </div>
              <span className="text-amber-200 font-semibold ml-4">{dish.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Reservation Form */}
      <section className="max-w-xl mx-auto px-6 py-16 font-sans">
        <div className="p-8 rounded-2xl bg-stone-900/60 border border-stone-800 text-center">
          <h3 className="font-serif text-2xl text-stone-100">Reserve a Table</h3>
          {booked ? (
            <div className="mt-4 p-4 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs rounded-xl">
              ✓ Reservation confirmed for {reservation.name}. We look forward to welcoming you!
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setBooked(true); }} className="mt-6 space-y-4 text-left">
              <input 
                type="text" 
                placeholder="Full Name" 
                required 
                onChange={(e) => setReservation({ ...reservation, name: e.target.value })}
                className="w-full px-4 py-2 bg-stone-950 border border-stone-800 rounded-lg text-sm text-white" 
              />
              <div className="flex gap-4">
                <input 
                  type="date" 
                  required 
                  onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
                  className="flex-1 px-4 py-2 bg-stone-950 border border-stone-800 rounded-lg text-sm text-white" 
                />
                <select 
                  onChange={(e) => setReservation({ ...reservation, guests: e.target.value })}
                  className="flex-1 px-4 py-2 bg-stone-950 border border-stone-800 rounded-lg text-sm text-white"
                >
                  <option>2 Guests</option>
                  <option>4 Guests</option>
                  <option>6+ Guests</option>
                </select>
              </div>
              <button type="submit" className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-medium text-sm rounded-lg transition-colors">
                Book Table
              </button>
            </form>
          )}
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
    <title>L'Osteria Bella - Fine Dining</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-stone-950">
    <div id="root"></div>
  </body>
</html>
`
    }
  };
}

function createEcommerceTemplate(prompt) {
  return {
    title: 'KicksVault - Exclusive Sneaker Collective',
    description: 'High-energy e-commerce storefront with live shopping bag counter, filtering, and instant checkout flow.',
    files: {
      '/App.js': `import React, { useState } from 'react';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const products = [
    { id: 1, name: 'Air Eclipse Retro', price: 189, tag: 'Bestseller' },
    { id: 2, name: 'Vortex Neon High', price: 210, tag: 'Limited Edition' },
    { id: 3, name: 'Cyber Runner 2099', price: 165, tag: 'New Arrival' },
    { id: 4, name: 'Phantom Ghost Low', price: 195, tag: 'Popular' }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <nav className="border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
        <span className="font-black text-2xl tracking-tighter text-white">KICKS<span className="text-rose-500">VAULT</span></span>
        <button className="relative px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-semibold">
          🛒 Bag ({cartCount})
        </button>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-extrabold tracking-tight">Drop 04 // Spring Essentials</h2>
        <p className="text-zinc-400 text-sm mt-1">Curated silhouettes engineered for comfort and style.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {products.map(p => (
            <div key={p.id} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">{p.tag}</span>
                <h4 className="font-bold text-white mt-1">{p.name}</h4>
                <div className="text-lg font-bold text-zinc-200 mt-2">\${p.price}</div>
              </div>
              <button 
                onClick={() => setCartCount(c => c + 1)}
                className="mt-6 w-full py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Add to Bag
              </button>
            </div>
          ))}
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
    <title>KicksVault - Sneaker Store</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-zinc-950">
    <div id="root"></div>
  </body>
</html>
`
    }
  };
}

function createAgencyTemplate(prompt) {
  return createSaaSTemplate(prompt);
}

function createFitnessTemplate(prompt) {
  return createSaaSTemplate(prompt);
}

module.exports = {
  generateTemplateFromPrompt
};
