'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { RecruiterSidebar } from '@/components/layout/RecruiterSidebar';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Eye,
  MessageSquare,
  Calendar,
  Scale,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { CandidateDetailDrawer } from '@/components/recruiter/CandidateDetailDrawer';
import { CandidateRankAuditItem } from '@/lib/types';
import { MOCK_CANDIDATES } from '@/lib/mockData';

export default function CandidatesListPage() {
  const { auditResult, shortlistCandidate, requestCandidateInterview } = useApp();
  const router = useRouter();

  const [selectedCandidate, setSelectedCandidate] = useState<CandidateRankAuditItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const candidates = auditResult.candidates || MOCK_CANDIDATES;

  const filteredCandidates = candidates.filter((cand) => {
    const matchesSearch =
      cand.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.trade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.keyEvidence.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && cand.status === filterStatus;
  });

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-slate-50 min-h-screen">
      <RecruiterSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                Candidate Pipeline & Verified Evidence
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
                {candidates.length} Applicants Ranked
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Every candidate ranking is explainable and backed by practical scenario audio recordings and verified safety protocols.
            </p>
          </div>

          <button
            onClick={() => router.push('/recruiter/bias-audit')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all active:scale-95 flex-shrink-0"
          >
            <Scale className="w-4 h-4" />
            <span>★ Run Ranking Transparency Audit</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="my-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate, skill, or evidence..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-900 shadow-2xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span className="text-xs font-semibold text-slate-500">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-2xs focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Statuses ({candidates.length})</option>
              <option value="Strong Match">Strong Match</option>
              <option value="Review">Review</option>
              <option value="Qualified">Qualified</option>
            </select>
          </div>
        </div>

        {/* Candidate Ranking Table */}
        <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-medium">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-5">Rank</th>
                  <th className="py-3.5 px-5">Candidate</th>
                  <th className="py-3.5 px-5">Skill Match</th>
                  <th className="py-3.5 px-5">Assessment</th>
                  <th className="py-3.5 px-5">Experience</th>
                  <th className="py-3.5 px-5">Key Evidence</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCandidates.map((c) => {
                  const isFocus = c.id === 'cand-arjun-01';

                  return (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedCandidate(c)}
                      className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                        isFocus ? 'bg-indigo-50/40' : ''
                      }`}
                    >
                      <td className="py-4 px-5">
                        <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-bold text-xs ${
                          c.afterRank === 1 ? 'bg-amber-400 text-amber-950 shadow-xs' : c.afterRank === 2 ? 'bg-slate-300 text-slate-900 shadow-xs' : 'bg-slate-100 text-slate-700'
                        }`}>
                          #{c.afterRank}
                        </span>
                      </td>

                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={c.avatarUrl || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80'}
                            alt={c.candidateName}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                              <span>{c.candidateName}</span>
                              {isFocus && (
                                <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[9px] font-bold">
                                  Jump: #7 → #2
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
                          <CheckCircle2 className="w-3.5 h-3.5" /> 88% Avg
                        </span>
                      </td>

                      <td className="py-4 px-5 text-slate-700 font-medium">
                        {c.experienceYears} Years
                      </td>

                      <td className="py-4 px-5 text-slate-600 max-w-xs truncate">
                        {c.keyEvidence}
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
                          <Eye className="w-3.5 h-3.5" /> View Evidence
                        </button>
                      </td>
                    </tr>
                  );
                })}
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
