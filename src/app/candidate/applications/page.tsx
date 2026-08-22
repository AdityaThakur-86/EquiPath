'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { CandidateSidebar } from '@/components/layout/CandidateSidebar';
import {
  FileCheck,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building,
  MapPin,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';

export default function ApplicationsPage() {
  const { applications } = useApp();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Interview Requested':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200 font-black animate-pulse';
      case 'Shortlisted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200 font-bold';
      case 'Reviewing':
        return 'bg-blue-50 text-blue-800 border-blue-200 font-semibold';
      case 'Applied':
        return 'bg-slate-100 text-slate-700 border-slate-200 font-medium';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-slate-50 min-h-screen">
      <CandidateSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8 pb-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold mb-2">
              <FileCheck className="w-3.5 h-3.5" /> Direct Candidate Pipeline
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              My Job Applications
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Track the progress of your skills-verified applications and upcoming practical interviews.
            </p>
          </div>

          <Link
            href="/candidate/jobs"
            className="text-xs font-bold text-indigo-600 hover:underline hidden sm:block"
          >
            Explore More Jobs →
          </Link>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs border mb-2 ${getStatusBadge(app.status)}`}>
                    {app.status}
                  </span>
                  <h3 className="text-lg font-black text-slate-900">{app.jobTitle}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium mt-1">
                    <span className="flex items-center gap-1 text-indigo-900 font-bold">
                      <Building className="w-3.5 h-3.5 text-indigo-600" />
                      {app.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {app.location}
                    </span>
                    <span className="font-bold text-slate-800">{app.salary}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs text-slate-400 font-medium">Verified Match</div>
                  <div className="text-xl font-black text-indigo-700">{app.matchScore}%</div>
                </div>
              </div>

              {/* Special Box for Interview Requested */}
              {app.status === 'Interview Requested' && (
                <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <div className="font-bold text-indigo-950">
                        Interview Scheduled: {app.interviewDate || 'Tomorrow at 11:00 AM IST'}
                      </div>
                      <div className="text-indigo-800 mt-0.5">
                        {app.interviewNotes || 'Practical 3-phase motor troubleshooting bench test.'}
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/candidate/messages"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-colors flex-shrink-0"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open Recruiter Chat</span>
                  </Link>
                </div>
              )}

              {/* Progress Steps Timeline */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">1. Applied ✓</div>
                <div className={`p-2 rounded-xl ${app.status !== 'Applied' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-50 text-slate-400'}`}>
                  2. Reviewing
                </div>
                <div className={`p-2 rounded-xl ${app.status === 'Interview Requested' || app.status === 'Shortlisted' || app.status === 'Hired' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-50 text-slate-400'}`}>
                  3. Interview
                </div>
                <div className={`p-2 rounded-xl ${app.status === 'Hired' ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                  4. Offer
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
