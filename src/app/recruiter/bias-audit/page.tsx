'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RecruiterSidebar } from '@/components/layout/RecruiterSidebar';
import { BiasAuditVisualizer } from '@/components/recruiter/BiasAuditVisualizer';
import { CandidateDetailDrawer } from '@/components/recruiter/CandidateDetailDrawer';
import { CandidateRankAuditItem } from '@/lib/types';
import { Scale, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function BiasAuditPage() {
  const router = useRouter();
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateRankAuditItem | null>(null);

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-slate-50 min-h-screen">
      <RecruiterSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-black mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>STAR / WOW FEATURE: RANKING TRANSPARENCY AUDIT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Audit Pipeline Bias & Signal Weights
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Simulate and inspect how candidate ranking changes when non-job-relevant pedigree and gap penalties are removed.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Ethical AI Decision Support</span>
          </div>
        </div>

        {/* The Core Bias Audit Visualizer Engine */}
        <BiasAuditVisualizer onSelectCandidate={(cand) => setSelectedCandidate(cand)} />

        {/* Candidate Detail Drawer */}
        <CandidateDetailDrawer
          candidateItem={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onOpenMessage={() => router.push('/recruiter/messages')}
          onViewAudit={() => setSelectedCandidate(null)}
        />
      </main>
    </div>
  );
}
