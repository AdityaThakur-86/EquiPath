import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, MapPin, Briefcase } from 'lucide-react';
import { JobMatchBreakdown } from '@/lib/types';

interface ExplainableScoreCardProps {
  breakdown: JobMatchBreakdown;
  jobTitle?: string;
  candidateName?: string;
}

export const ExplainableScoreCard: React.FC<ExplainableScoreCardProps> = ({
  breakdown,
  jobTitle = 'Electrical Technician',
  candidateName = 'Arjun Kumar',
}) => {
  return (
    <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 via-white to-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-indigo-50">
        <div>
          <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Explainable Match Score
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            Transparent breakdown for {candidateName}
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-black text-indigo-700">{breakdown.totalMatch}%</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase">Total Fit</div>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        {/* Verified Skills */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold text-slate-800">Verified Trade Skills</span>
          </div>
          <span className="font-mono font-bold text-indigo-700 text-sm">+{breakdown.skillsScore} pts</span>
        </div>

        {/* Relevant Experience */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-slate-600" />
            <span className="font-semibold text-slate-800">Relevant Hands-on Experience</span>
          </div>
          <span className="font-mono font-bold text-slate-700 text-sm">+{breakdown.experienceScore} pts</span>
        </div>

        {/* Assessment Evidence */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-emerald-950">Scenario & Safety Evidence</span>
          </div>
          <span className="font-mono font-bold text-emerald-700 text-sm">+{breakdown.evidenceScore} pts</span>
        </div>

        {/* Proximity / Location */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-600" />
            <span className="font-semibold text-slate-800">Regional Proximity</span>
          </div>
          <span className="font-mono font-bold text-slate-700 text-sm">+{breakdown.locationScore} pts</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900">
        <span>Calculated Total Match:</span>
        <span className="text-base text-indigo-600 font-mono">
          {breakdown.skillsScore} + {breakdown.experienceScore} + {breakdown.evidenceScore} + {breakdown.locationScore} = {breakdown.totalMatch}%
        </span>
      </div>
    </div>
  );
};
