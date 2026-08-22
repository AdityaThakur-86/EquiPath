'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { RecruiterSidebar } from '@/components/layout/RecruiterSidebar';
import {
  Users,
  ShieldCheck,
  Award,
  Sparkles,
  Scale,
  ArrowRight,
  TrendingUp,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  Eye,
  MessageSquare,
} from 'lucide-react';
import { CandidateDetailDrawer } from '@/components/recruiter/CandidateDetailDrawer';
import { CandidateRankAuditItem } from '@/lib/types';
import { MOCK_CANDIDATES } from '@/lib/mockData';

export default function RecruiterDashboard() {
  const { auditResult, startDemoTour } = useApp();
  const router = useRouter();
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateRankAuditItem | null>(null);

  const candidates = auditResult.candidates || MOCK_CANDIDATES;

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-slate-50 min-h-screen">
      <RecruiterSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                Electrical Technician — Hiring Pipeline
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
                BrightCore Services
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Active requisition: 2 openings • 3-phase motor overhaul & industrial panel troubleshooting.
            </p>
          </div>

          {/* Star Audit CTA */}
          <Link
            href="/recruiter/bias-audit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all active:scale-95 flex-shrink-0"
          >
            <Scale className="w-4 h-4" />
            <span>★ Run Ranking Transparency Audit</span>
          </Link>
        </div>

        {/* 4 Core Pipeline Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          {/* Stat 1 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
              <span>Total Applicants</span>
              <Users className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-3xl font-black text-slate-900 mt-2">128</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Raw applicants received</div>
          </div>

          {/* Stat 2 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
              <span>Verified Candidates</span>
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-3xl font-black text-indigo-600 mt-2">47</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">36.7% practical pass rate</div>
          </div>

          {/* Stat 3 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
              <span>Strong Matches (&gt;85%)</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-slate-900 mt-2">12</div>
            <div className="text-[11px] text-indigo-600 font-semibold mt-0.5">Ready for benchmark test</div>
          </div>

          {/* Stat 4 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
              <span>Shortlisted</span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-emerald-600 mt-2">5</div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">1 Interview scheduled</div>
          </div>
        </div>

        {/* Highlight Banner: Ranking Transparency Audit Callout */}
        <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-300 text-xs font-bold">
              <Scale className="w-3.5 h-3.5" />
              <span>DECISION SUPPORT SPOTLIGHT</span>
            </div>
            <h3 className="text-xl font-black">
              Uncover Top Talent: Arjun Kumar moved #7 → #2
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When non-job-relevant signals (employment gaps, college tiers, resume prestige) were removed, Arjun&apos;s verified 93% safety isolation score and motor diagnostic test elevated his ranking to #2 (91% match).
            </p>
          </div>

          <Link
            href="/recruiter/bias-audit"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all active:scale-95 flex-shrink-0"
          >
            <span>Open Fairness Audit Tool</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Candidates Pipeline Table */}
        <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-black text-slate-900 text-base">Top Ranked Candidates</h3>
              <p className="text-xs text-slate-500">Click any candidate to review voice audio evidence, safety metrics, and schedule interviews.</p>
            </div>
            <Link href="/recruiter/candidates" className="text-xs font-bold text-indigo-600 hover:underline">
              Full Ranking List →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-medium">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-5">Rank</th>
                  <th className="py-3.5 px-5">Candidate</th>
                  <th className="py-3.5 px-5">Skill Match</th>
                  <th className="py-3.5 px-5">Assessment</th>
                  <th className="py-3.5 px-5">Experience</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.slice(0, 5).map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedCandidate(c)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-4 px-5">
                      <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-bold text-xs ${
                        c.afterRank === 1 ? 'bg-amber-400 text-amber-950' : c.afterRank === 2 ? 'bg-slate-300 text-slate-900' : 'bg-slate-100 text-slate-700'
                      }`}>
                        #{c.afterRank}
                      </span>
                    </td>

                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.avatarUrl || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80'}
                          alt={c.candidateName}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            <span>{c.candidateName}</span>
                            {c.id === 'cand-arjun-01' && (
                              <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[9px] font-bold">
                                #7 → #2
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500">{c.trade}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <span className="font-bold text-indigo-700 text-sm font-mono">{c.afterScore}%</span>
                    </td>

                    <td className="py-4 px-5">
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    </td>

                    <td className="py-4 px-5 text-slate-700">
                      {c.experienceYears} Years
                    </td>

                    <td className="py-4 px-5">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        c.status === 'Strong Match' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {c.status}
                      </span>
                    </td>

                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCandidate(c);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-white text-slate-700 text-xs font-semibold shadow-2xs transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" /> Evidence
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Candidate Detail Drawer */}
        <CandidateDetailDrawer
          candidateItem={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onOpenMessage={() => router.push('/recruiter/messages')}
          onViewAudit={() => router.push('/recruiter/bias-audit')}
        />
      </main>
    </div>
  );
}
