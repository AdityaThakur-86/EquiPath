'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Scale, MessageSquare, BarChart3, Briefcase, Sparkles, Building } from 'lucide-react';
import { useApp } from '@/lib/AppContext';

export const RecruiterSidebar: React.FC = () => {
  const pathname = usePathname();
  const { messages } = useApp();

  const navItems = [
    { label: 'Pipeline Dashboard', href: '/recruiter/dashboard', icon: LayoutDashboard },
    { label: 'Candidate Ranking', href: '/recruiter/candidates', icon: Users, count: 7 },
    { label: 'Ranking Transparency', href: '/recruiter/bias-audit', icon: Scale, star: true },
    { label: 'Messages & Voice Notes', href: '/recruiter/messages', icon: MessageSquare, count: 3 },
    { label: 'Hiring Analytics', href: '/recruiter/analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block border-r border-slate-200/80 bg-white min-h-[calc(100vh-4rem)] p-4">
      {/* Recruiter Company Widget */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white mb-6 shadow-sm">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-xs">
            <Building className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs truncate">BrightCore Services</h4>
            <p className="text-[10px] text-indigo-300">Industrial Maintenance</p>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
          <span>Active Opening:</span>
          <span className="font-bold text-indigo-300 truncate max-w-[110px]">Electrical Tech</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="space-y-1 text-xs font-semibold">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/recruiter/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.star && (
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-0.5 ${
                  isActive ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-900 border border-amber-200 animate-pulse'
                }`}>
                  <Sparkles className="w-2.5 h-2.5" /> WOW
                </span>
              )}

              {item.count !== undefined && !item.star && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Recruiter Policy Box */}
      <div className="mt-8 p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-950">
        <div className="font-bold flex items-center gap-1 text-indigo-900">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Evidence-Based Hiring
        </div>
        <p className="mt-1 text-[11px] text-indigo-800 leading-relaxed">
          Screen candidates on verified practical scenario execution rather than resume formatting.
        </p>
      </div>
    </aside>
  );
};
