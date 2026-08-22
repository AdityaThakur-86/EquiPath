'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, RotateCcw, AlertTriangle, Scale, Eye, TrendingUp } from 'lucide-react';
import { CandidateRankAuditItem, BiasAuditSummary } from '@/lib/types';
import { useApp } from '@/lib/AppContext';
import confetti from 'canvas-confetti';

interface BiasAuditVisualizerProps {
  onSelectCandidate?: (cand: CandidateRankAuditItem) => void;
}

export const BiasAuditVisualizer: React.FC<BiasAuditVisualizerProps> = ({ onSelectCandidate }) => {
  const { auditResult, runFairnessAuditToggle, showToast } = useApp();
  const [isAudited, setIsAudited] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Toggles for non-job-relevant signals
  const [removeEmploymentGap, setRemoveEmploymentGap] = useState(true);
  const [removeCollegeTier, setRemoveCollegeTier] = useState(true);
  const [removeResumePrestige, setRemoveResumePrestige] = useState(true);
  const [removeLanguagePenalty, setRemoveLanguagePenalty] = useState(true);

  const handleRunAudit = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAudited(true);
      setIsAnimating(false);
      runFairnessAuditToggle({
        removeEmploymentGap,
        removeCollegeTier,
        removeResumePrestige,
        removeLanguagePenalty,
      });

      // Confetti burst for demo impact
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // confetti fallback
      }
    }, 600);
  };

  const handleResetAudit = () => {
    setIsAudited(false);
    showToast('Baseline Restored', 'Displaying traditional resume-screening baseline ranking.', 'info');
  };

  const candidatesList = auditResult.candidates;
  const arjun = candidatesList.find((c) => c.id === 'cand-arjun-01') || candidatesList[1];

  const sortedCandidates = isAudited
    ? [...candidatesList].sort((a, b) => a.afterRank - b.afterRank)
    : [...candidatesList].sort((a, b) => a.beforeRank - b.beforeRank);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner: Star Feature Explanation */}
      <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs font-bold mb-3">
              <Scale className="w-3.5 h-3.5 text-indigo-300" />
              <span>STAR FEATURE: RANKING TRANSPARENCY AUDIT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Why did this candidate rank here?
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Traditional resume screeners penalize skilled trade workers for employment gaps, lack of elite college degrees, resume formatting, or speaking in regional languages. The <strong>Ranking Transparency Audit</strong> isolates pure demonstrated skill.
            </p>
          </div>

          {/* Action Trigger Card */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {isAudited ? (
              <button
                onClick={handleResetAudit}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-sm font-bold shadow-md transition-all active:scale-95"
              >
                <RotateCcw className="w-4 h-4" /> View Baseline Screen
              </button>
            ) : null}

            <button
              onClick={handleRunAudit}
              disabled={isAnimating}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAudited ? 'Recalculate Fairness Audit' : '▶ Run Fairness Audit'}</span>
            </button>
          </div>
        </div>

        {/* Highlight Card: Arjun Kumar #7 -> #2 Jump */}
        <div className="mt-8 pt-6 border-t border-indigo-800/60 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-xs text-slate-400 font-semibold uppercase">Candidate in Spotlight</div>
            <div className="text-lg font-bold text-white mt-0.5">{arjun.candidateName}</div>
            <div className="text-xs text-indigo-300">{arjun.trade}</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-xs text-slate-400 font-semibold uppercase">Audit Shift Impact</div>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xl font-bold text-rose-400 line-through">Rank #{arjun.beforeRank} (78%)</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
              <span className="text-2xl font-black text-emerald-400">Rank #{arjun.afterRank} (91%)</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm flex items-center gap-3">
            <div className="text-3xl font-black text-emerald-400">#7 → #2</div>
            <div className="text-xs text-emerald-200">
              Score increased from <strong>78% → 91%</strong> when non-job-relevant resume penalties were stripped.
            </div>
          </div>
        </div>
      </div>

      {/* Signal Controls & Exclusion Matrix */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
          Audit Configuration: Non-Job-Relevant Signals
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Signal 1 */}
          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={removeEmploymentGap}
              onChange={(e) => setRemoveEmploymentGap(e.target.checked)}
              className="mt-1 w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <div>
              <div className="text-xs font-bold text-slate-900">Remove Employment Gap Penalty</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Stops penalizing informal/gig work history</div>
            </div>
          </label>

          {/* Signal 2 */}
          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={removeCollegeTier}
              onChange={(e) => setRemoveCollegeTier(e.target.checked)}
              className="mt-1 w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <div>
              <div className="text-xs font-bold text-slate-900">Remove College Tier Bonus</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Removes artificial pedigree advantages</div>
            </div>
          </label>

          {/* Signal 3 */}
          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={removeResumePrestige}
              onChange={(e) => setRemoveResumePrestige(e.target.checked)}
              className="mt-1 w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <div>
              <div className="text-xs font-bold text-slate-900">Remove Resume Prestige Bias</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Evaluates skills instead of resume writing</div>
            </div>
          </label>

          {/* Signal 4 */}
          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={removeLanguagePenalty}
              onChange={(e) => setRemoveLanguagePenalty(e.target.checked)}
              className="mt-1 w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <div>
              <div className="text-xs font-bold text-slate-900">Remove Language Choice Penalty</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Equal weight for Punjabi/Hindi assessments</div>
            </div>
          </label>
        </div>
      </div>

      {/* Candidate Ranking Table: Before vs After */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              {isAudited ? 'Skills-First Ranked Pipeline (After Audit)' : 'Traditional Resume-Screened Pipeline (Before Audit)'}
            </h3>
            <p className="text-xs text-slate-500">
              {isAudited
                ? 'Ranked exclusively by verified scenario performance, practical experience, and safety evidence.'
                : 'Ranked with traditional resume keyword matchers and background filters.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${isAudited ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-700'}`}>
              {isAudited ? '✓ Audit Mode Active' : 'Traditional Baseline'}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Match Score</th>
                <th className="py-3 px-4">Experience</th>
                <th className="py-3 px-4">Key Assessment Evidence</th>
                <th className="py-3 px-4">Shift</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {sortedCandidates.map((cand) => {
                const currentRank = isAudited ? cand.afterRank : cand.beforeRank;
                const currentScore = isAudited ? cand.afterScore : cand.beforeScore;
                const rankShift = cand.beforeRank - cand.afterRank;
                const isTarget = cand.id === 'cand-arjun-01';

                return (
                  <tr
                    key={cand.id}
                    className={`transition-colors ${
                      isTarget
                        ? 'bg-indigo-50/50 hover:bg-indigo-50 font-semibold'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          currentRank === 1
                            ? 'bg-amber-400 text-amber-950 shadow-sm'
                            : currentRank === 2
                            ? 'bg-slate-300 text-slate-900 shadow-sm'
                            : currentRank === 3
                            ? 'bg-amber-700 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {currentRank}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cand.avatarUrl || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80'}
                          alt={cand.candidateName}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{cand.candidateName}</span>
                            {isTarget && (
                              <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-bold">
                                Focus Candidate
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500">{cand.trade}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-indigo-700">{currentScore}%</span>
                        <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${currentScore}%` }} />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700">
                      {cand.experienceYears} years
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                      {cand.keyEvidence}
                    </td>

                    <td className="py-3.5 px-4">
                      {isAudited ? (
                        rankShift > 0 ? (
                          <span className="inline-flex items-center gap-0.5 text-emerald-600 font-bold">
                            <TrendingUp className="w-3.5 h-3.5" /> +{rankShift} spots
                          </span>
                        ) : rankShift < 0 ? (
                          <span className="text-slate-400 font-medium">
                            {rankShift} spots
                          </span>
                        ) : (
                          <span className="text-slate-400 font-medium">No change</span>
                        )
                      ) : (
                        <span className="text-slate-400">Baseline</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onSelectCandidate && onSelectCandidate(cand)}
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

      {/* Explanatory Waterfall & Ethical Disclaimer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Why Did The Ranking Change? */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-200 bg-slate-50/70">
          <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            Why did the ranking change for Arjun Kumar?
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            The ranking changed because the audit removed signals that are not directly relevant to job performance (such as employment gap gaps and lack of pedigree certificates) while giving full weight to verified scenario assessments.
          </p>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
              <span className="font-semibold text-slate-800">Verified Hands-on Skills</span>
              <span className="font-mono font-bold text-indigo-600">+45 pts</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
              <span className="font-semibold text-slate-800">Relevant Field Experience</span>
              <span className="font-mono font-bold text-indigo-600">+25 pts</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
              <span className="font-semibold text-slate-800">Scenario Assessment Evidence</span>
              <span className="font-mono font-bold text-indigo-600">+18 pts</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
              <span className="font-semibold text-slate-800">Job Specific Match</span>
              <span className="font-mono font-bold text-indigo-600">+3 pts</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950">
              <span className="font-semibold">Non-Job-Relevant Resume Penalties Stripped</span>
              <span className="font-mono font-bold text-emerald-700">0 penalty (Fairness Restored)</span>
            </div>
          </div>
        </div>

        {/* Ethical Decision Support Notice */}
        <div className="p-6 rounded-2xl border border-amber-200 bg-amber-50/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Ranking Transparency Notice</span>
            </div>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              EquiPath provides transparent decision support. We do not claim guaranteed legal compliance or eliminate human judgment. The recruiter retains complete autonomy and makes the final hiring decision.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200/80 text-[11px] text-amber-800 font-medium">
            ✓ Audited under ISO-aligned Skills-First Assessment Principles.
          </div>
        </div>
      </div>
    </div>
  );
};
