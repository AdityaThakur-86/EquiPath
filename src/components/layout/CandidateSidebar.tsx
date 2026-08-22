'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Award, CheckCircle2, Bot, Briefcase, FileCheck, MessageSquare, User, ShieldCheck } from 'lucide-react';
import { useApp } from '@/lib/AppContext';

export const CandidateSidebar: React.FC = () => {
  const pathname = usePathname();
  const { candidate, messages } = useApp();

  const unreadCount = messages.filter((m) => !m.isRead && m.senderRole !== 'candidate').length;

  const navItems = [
    { label: 'Overview', href: '/candidate/dashboard', icon: LayoutDashboard },
    { label: 'My Skills', href: '/candidate/skills', icon: Award, count: candidate.skills.length },
    { label: 'Verify Skills', href: '/candidate/verify', icon: CheckCircle2, badge: 'Voice/Text' },
    { label: 'AI Interview', href: '/candidate/interview', icon: Bot, badge: 'Adaptive' },
    { label: 'Job Matches', href: '/candidate/jobs', icon: Briefcase, count: 14 },
    { label: 'Applications', href: '/candidate/applications', icon: FileCheck, count: 4 },
    { label: 'Messages', href: '/candidate/messages', icon: MessageSquare, count: unreadCount || undefined },
    { label: 'Profile', href: '/candidate/profile', icon: User },
  ];

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block border-r border-slate-200/80 bg-white min-h-[calc(100vh-4rem)] p-4">
      {/* Candidate Profile Widget */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-slate-50 border border-indigo-100 mb-6">
        <div className="flex items-center gap-3">
          <img
            src={candidate.avatarUrl || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80'}
            alt={candidate.name}
            className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
          />
          <div className="overflow-hidden">
            <h4 className="font-bold text-slate-900 text-sm truncate">{candidate.name}</h4>
            <p className="text-[11px] text-slate-500 truncate">{candidate.trade}</p>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-indigo-100/60 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Confidence:</span>
          <span className="font-bold text-indigo-700">{candidate.overallConfidence}%</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="space-y-1 text-xs font-semibold">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/candidate/dashboard' && pathname.startsWith(item.href));
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

              {item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-indigo-500 text-white' : 'bg-indigo-50 text-indigo-700'
                }`}>
                  {item.badge}
                </span>
              )}

              {item.count !== undefined && !item.badge && (
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

      {/* Verified Skills Footer Pill */}
      <div className="mt-8 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-2.5 text-xs text-emerald-900">
        <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <div>
          <div className="font-bold">No Resume Required</div>
          <div className="text-[10px] text-emerald-700">Demonstrate practical skills</div>
        </div>
      </div>
    </aside>
  );
};
