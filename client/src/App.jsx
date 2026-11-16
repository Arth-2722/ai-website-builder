import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Dashboard from './pages/Dashboard';
import Community from './pages/Community';
import Pricing from './pages/Pricing';

export default function App() {
  const location = useLocation();
  const isBuilder = location.pathname.startsWith('/builder');

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      {/* Hide global navbar on builder for maximum workspace view, or keep minimal */}
      {!isBuilder && <Navbar />}

      <div className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/builder/:id" element={<Builder />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </div>

      {!isBuilder && <Footer />}

      {/* Global Authentication Modal */}
      <AuthModal />

      {/* Toast Notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0f172a',
            color: '#f8fafc',
            border: '1px solid #1e293b',
            fontSize: '12px',
            borderRadius: '12px',
            padding: '12px 16px'
          },
          success: {
            iconTheme: {
              primary: '#8b5cf6',
              secondary: '#ffffff'
            }
          }
        }}
      />
    </div>
  );
}
