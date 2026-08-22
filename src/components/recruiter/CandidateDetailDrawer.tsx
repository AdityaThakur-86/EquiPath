'use client';

import React from 'react';
import { X, CheckCircle2, ShieldCheck, Phone, Mail, MapPin, Calendar, Award, MessageSquare, Briefcase, Globe } from 'lucide-react';
import { CandidateRankAuditItem } from '@/lib/types';
import { useApp } from '@/lib/AppContext';
import { VoiceAudioPlayer } from '@/components/shared/VoiceAudioPlayer';
import { INITIAL_CANDIDATE } from '@/lib/mockData';

interface CandidateDetailDrawerProps {
  candidateItem: CandidateRankAuditItem | null;
  onClose: () => void;
  onOpenMessage: () => void;
  onViewAudit: () => void;
}

export const CandidateDetailDrawer: React.FC<CandidateDetailDrawerProps> = ({
  candidateItem,
  onClose,
  onOpenMessage,
  onViewAudit,
}) => {
  const { shortlistCandidate, requestCandidateInterview, candidate: fullCandidate } = useApp();

  if (!candidateItem) return null;

  // Use full candidate data if Arjun, otherwise fallback to item
  const isArjun = candidateItem.id === 'cand-arjun-01';
  const cData = isArjun ? fullCandidate : {
    ...fullCandidate,
    name: candidateItem.candidateName,
    trade: candidateItem.trade,
    experienceYears: candidateItem.experienceYears,
    overallConfidence: candidateItem.afterScore,
  };

  const handleShortlist = () => {
    shortlistCandidate(candidateItem.id);
  };

  const handleInterview = () => {
    requestCandidateInterview(candidateItem.id, 'Electrical Technician');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-10">
            <div className="flex items-center gap-3">
              <img
                src={candidateItem.avatarUrl || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80'}
                alt={candidateItem.candidateName}
                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100 shadow-xs"
              />
              <div>
                <h3 className="text-lg font-black text-slate-900">{candidateItem.candidateName}</h3>
                <p className="text-xs text-slate-500">{candidateItem.trade} • {candidateItem.experienceYears} Years Exp</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 space-y-6">
            {/* Top Match & Audit Shift Card */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-indigo-800 uppercase tracking-wider">Overall Match Score</div>
                <div className="text-2xl font-black text-indigo-900 mt-0.5">{candidateItem.afterScore}% Match</div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Scenario Verified
                </span>
                <div className="text-[11px] text-slate-500 mt-1">Audit Rank #{candidateItem.afterRank}</div>
              </div>
            </div>

            {/* Verified Skills Grid */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Demonstrated Practical Skills
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {cData.skills.map((skill, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                      <span>{skill.name}</span>
                      <span className="text-indigo-600 font-mono">{skill.confidenceScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-1">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${skill.confidenceScore}%` }} />
                    </div>
                    <div className="text-[10px] text-slate-500">{skill.assessmentsCount} scenarios verified</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment Evidence & Voice Audio Excerpt */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Assessment Audio Evidence & Transcript
              </h4>
              <VoiceAudioPlayer
                transcript="ਮੈਂ ਪਹਿਲਾਂ motor ਦੀ winding resistance ਅਤੇ bearing check ਕਰਾਂਗਾ, ਅਤੇ power isolate ਕਰਕੇ earth leakage ਚੈੱਕ ਕਰਾਂਗਾ।"
                translatedTranscript="I would first check the motor winding resistance and bearing condition, and isolate power to check for earth leakage with a multimeter."
                language="pa"
                durationSeconds={8}
                candidateName={candidateItem.candidateName}
                title="Scenario: Motor Overheating Diagnosis"
              />
            </div>

            {/* Peer References */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Peer References
              </h4>
              <div className="space-y-3">
                {INITIAL_CANDIDATE.references.map((ref) => (
                  <div key={ref.id} className="p-3.5 rounded-xl border border-slate-200 bg-white text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-slate-900">{ref.name} ({ref.role})</span>
                      <span className="text-amber-500 font-bold">★★★★★</span>
                    </div>
                    <p className="text-slate-600 italic leading-relaxed">&ldquo;{ref.quote}&rdquo;</p>
                    <div className="mt-2 text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified Supervisor Reference ({ref.company})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 sticky bottom-0">
          <button
            onClick={onViewAudit}
            className="px-4 py-2.5 rounded-xl border border-indigo-200 text-indigo-700 bg-indigo-50/50 hover:bg-indigo-100 font-bold text-xs transition-colors"
          >
            View Fairness Audit Diff
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShortlist}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-white text-slate-700 font-semibold text-xs transition-colors"
            >
              Shortlist
            </button>
            <button
              onClick={onOpenMessage}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Message
            </button>
            <button
              onClick={handleInterview}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-200 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" /> Request Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
