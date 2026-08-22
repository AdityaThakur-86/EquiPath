'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { Sparkles, Play, ShieldCheck, UserCheck, Briefcase, ChevronDown, Menu, X, Globe, Bell } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '@/lib/types';

export const Navbar: React.FC = () => {
  const { role, setRole, startDemoTour, selectedLanguage, setSelectedLanguage, messages, applications } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isCandidateRoute = pathname.startsWith('/candidate');
  const isRecruiterRoute = pathname.startsWith('/recruiter');

  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  const handleRoleSelect = (newRole: 'candidate' | 'recruiter') => {
    setRole(newRole);
    setRoleMenuOpen(false);
    if (newRole === 'candidate') {
      router.push('/candidate/dashboard');
    } else {
      router.push('/recruiter/dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
            E
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl text-slate-900 tracking-tight">EquiPath</span>
              <span className="px-1.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-bold">
                AI Skills-First
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Skills First. Opportunities for Everyone.
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <Link href="/" className={`hover:text-indigo-600 transition-colors ${pathname === '/' ? 'text-indigo-600' : ''}`}>
            How It Works
          </Link>
          <Link
            href="/candidate/dashboard"
            className={`hover:text-indigo-600 transition-colors ${isCandidateRoute ? 'text-indigo-600' : ''}`}
          >
            For Candidates
          </Link>
          <Link
            href="/recruiter/dashboard"
            className={`hover:text-indigo-600 transition-colors ${isRecruiterRoute ? 'text-indigo-600' : ''}`}
          >
            For Recruiters
          </Link>
          <Link
            href="/recruiter/bias-audit"
            className={`hover:text-indigo-600 transition-colors flex items-center gap-1 ${pathname.includes('bias-audit') ? 'text-indigo-600' : ''}`}
          >
            <ShieldCheck className="w-4 h-4 text-indigo-500" />
            <span>Fair Hiring</span>
          </Link>
        </nav>

        {/* Right Action Bar: Quick Demo + Switcher */}
        <div className="flex items-center gap-3">
          {/* Quick Demo CTA */}
          <button
            onClick={() => {
              startDemoTour(1);
              router.push('/candidate/claim');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-200 hover:shadow-lg transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>▶ Try Demo</span>
          </button>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold transition-colors"
            >
              {isRecruiterRoute ? (
                <>
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  <span className="hidden sm:inline">Recruiter View</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline">Candidate View</span>
                </>
              )}
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
                  Switch Experience
                </div>
                <button
                  onClick={() => handleRoleSelect('candidate')}
                  className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    isCandidateRoute ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <div>
                    <div>Candidate Portal</div>
                    <div className="text-[10px] text-slate-400 font-normal">Arjun Kumar (Electrician)</div>
                  </div>
                </button>
                <button
                  onClick={() => handleRoleSelect('recruiter')}
                  className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors mt-1 ${
                    isRecruiterRoute ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  <div>
                    <div>Recruiter Portal</div>
                    <div className="text-[10px] text-slate-400 font-normal">BrightCore Hiring Pipeline</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700"
          >
            How It Works
          </Link>
          <Link
            href="/candidate/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700"
          >
            Candidate Dashboard
          </Link>
          <Link
            href="/candidate/verify"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700"
          >
            Verify Skills (Voice/Text)
          </Link>
          <Link
            href="/recruiter/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700"
          >
            Recruiter Pipeline
          </Link>
          <Link
            href="/recruiter/bias-audit"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-indigo-600 font-bold"
          >
            ★ Ranking Transparency Audit
          </Link>
        </div>
      )}
    </header>
  );
};
