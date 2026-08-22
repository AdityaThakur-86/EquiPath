'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { CandidateSidebar } from '@/components/layout/CandidateSidebar';
import {
  Award,
  Sparkles,
  Briefcase,
  FileCheck,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Mic,
  Calendar,
  AlertCircle,
  Play,
} from 'lucide-react';
import { ConfidenceBadge } from '@/components/shared/ConfidenceBadge';

export default function CandidateDashboard() {
  const { candidate, applications, jobs, startDemoTour } = useApp();
  const router = useRouter();

  const handleContinueVerification = () => {
    router.push('/candidate/verify');
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-slate-50 min-h-screen">
      <CandidateSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-6xl">
        {/* Top Header & Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                Good morning, {candidate.name.split(' ')[0]} 👋
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                ✓ Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Your verified skills profile is actively attracting recruiter views in Chandigarh and Punjab.
            </p>
          </div>

          <button
            onClick={handleContinueVerification}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all transform hover:-translate-y-0.5 active:scale-95 flex-shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Continue Skill Verification</span>
          </button>
        </div>

        {/* 5 Core Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 my-8">
          {/* Metric 1 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
              <span>Verified Skills</span>
              <Award className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">{candidate.skills.length}</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">+2 this week</div>
          </div>

          {/* Metric 2 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
              <span>Avg Confidence</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-600 mt-2">{candidate.overallConfidence}%</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Scenario backed</div>
          </div>

          {/* Metric 3 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
              <span>Job Matches</span>
              <Briefcase className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">14</div>
            <div className="text-[11px] text-indigo-600 font-semibold mt-0.5">Top: 92% Match</div>
          </div>

          {/* Metric 4 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
              <span>Applications</span>
              <FileCheck className="w-4 h-4 text-slate-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">{applications.length}</div>
            <div className="text-[11px] text-amber-600 font-semibold mt-0.5">1 Interview Invited</div>
          </div>

          {/* Metric 5 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
            <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
              <span>Profile Strength</span>
              <TrendingUp className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-indigo-600 mt-2">92%</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Peer ref verified</div>
          </div>
        </div>

        {/* Highlighted Interview Invite Alert */}
        {applications.some((a) => a.status === 'Interview Requested') && (
          <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/30 border border-indigo-400 flex items-center justify-center text-indigo-300 flex-shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                  Action Required
                </div>
                <h4 className="font-bold text-sm text-white">
                  Interview Requested: Electrical Technician (BrightCore Services)
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Recruiter reviewed your 3-phase motor troubleshooting voice assessment and invited you for a direct practical test.
                </p>
              </div>
            </div>

            <Link
              href="/candidate/messages"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors flex-shrink-0"
            >
              <span>View Invitation in Chat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Main Grid: Skills Overview & Recommended Jobs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Verified Skills Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-base">Your Verified Skills</h3>
              <Link href="/candidate/skills" className="text-xs text-indigo-600 font-bold hover:underline">
                View All ({candidate.skills.length}) →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {candidate.skills.slice(0, 4).map((skill, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-indigo-200 transition-colors">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-2">
                    <span>{skill.name}</span>
                    <span className="text-indigo-600 font-mono">{skill.confidenceScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${skill.confidenceScore}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{skill.assessmentsCount} tests completed</span>
                    <span className="text-emerald-600 font-semibold">✓ Verified</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Claim Skill Card */}
            <div className="p-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-400 bg-white/50 text-center transition-colors">
              <p className="text-xs text-slate-600 font-medium">Have experience in another trade or equipment?</p>
              <Link
                href="/candidate/claim"
                className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                + Claim and verify another skill →
              </Link>
            </div>
          </div>

          {/* Right Column: Top Matched Jobs */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-base">Top Job Matches</h3>
              <Link href="/candidate/jobs" className="text-xs text-indigo-600 font-bold hover:underline">
                See All (14) →
              </Link>
            </div>

            <div className="space-y-3">
              {jobs.slice(0, 3).map((job) => (
                <div key={job.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{job.title}</h4>
                      <p className="text-[11px] text-slate-500">{job.company} • {job.location}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs">
                      {job.matchScoreForArjun?.totalMatch || 88}% Match
                    </span>
                  </div>

                  <div className="mt-2.5 text-[11px] text-slate-600 font-medium">
                    Salary: <span className="font-bold text-slate-900">{job.salaryRange}</span>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400">{job.postedDate}</span>
                    <Link
                      href="/candidate/jobs"
                      className="font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      View & Apply →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
