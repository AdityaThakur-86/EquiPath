'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { CandidateSidebar } from '@/components/layout/CandidateSidebar';
import {
  Award,
  CheckCircle2,
  ShieldCheck,
  Eye,
  Sparkles,
  ArrowRight,
  X,
  FileText,
  Activity,
  Plus,
} from 'lucide-react';
import { VerifiedSkill } from '@/lib/types';
import { VoiceAudioPlayer } from '@/components/shared/VoiceAudioPlayer';

export default function MySkillsPage() {
  const { candidate } = useApp();
  const [selectedSkillForEvidence, setSelectedSkillForEvidence] = useState<VerifiedSkill | null>(null);

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-slate-50 min-h-screen">
      <CandidateSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                My Skills & Evidence
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
                {candidate.skills.length} Skills
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Every verified skill is backed by scenario test performance, audio responses, and supervisor references.
            </p>
          </div>

          <Link
            href="/candidate/verify"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all active:scale-95 flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Verify New Skill</span>
          </Link>
        </div>

        {/* Average Confidence Score Banner */}
        <div className="my-6 p-6 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{candidate.overallConfidence}% Assessment Confidence</div>
              <p className="text-xs text-slate-300">
                Overall score calculated across {candidate.skills.length} verified trade competencies and {candidate.completedAssessments.length + 15} total scenario questions.
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              ✓ Scenario Verified
            </span>
          </div>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {candidate.skills.map((skill, idx) => {
            let color = 'bg-indigo-600';
            if (skill.confidenceScore >= 90) color = 'bg-emerald-600';
            else if (skill.confidenceScore < 75) color = 'bg-amber-600';

            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{skill.name}</h3>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                        {skill.category}
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs font-mono">
                      {skill.confidenceScore}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                    <div className={`h-full ${color} rounded-full`} style={{ width: `${skill.confidenceScore}%` }} />
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {skill.evidenceSummary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{skill.assessmentsCount} tests passed</span>
                  </div>

                  <button
                    onClick={() => setSelectedSkillForEvidence(skill)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-bold transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Evidence</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Evidence Modal */}
        {selectedSkillForEvidence && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{selectedSkillForEvidence.name}</h3>
                    <p className="text-xs text-slate-500">Assessment Evidence Audit Trail</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSkillForEvidence(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Confidence Breakdown Bars */}
              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Multidimensional Confidence Dimensions
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Technical Logic</span>
                      <span className="text-indigo-600">{selectedSkillForEvidence.breakdown.technical}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${selectedSkillForEvidence.breakdown.technical}%` }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Troubleshooting</span>
                      <span className="text-blue-600">{selectedSkillForEvidence.breakdown.troubleshooting}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${selectedSkillForEvidence.breakdown.troubleshooting}%` }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200">
                    <div className="flex justify-between text-xs font-bold text-emerald-900 mb-1">
                      <span>Safety Awareness</span>
                      <span className="text-emerald-700">{selectedSkillForEvidence.breakdown.safety}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-emerald-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${selectedSkillForEvidence.breakdown.safety}%` }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Practical Reasoning</span>
                      <span className="text-cyan-600">{selectedSkillForEvidence.breakdown.practicalReasoning}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${selectedSkillForEvidence.breakdown.practicalReasoning}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Voice Excerpt */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Verified Audio Excerpt
                </h4>
                <VoiceAudioPlayer
                  transcript="ਮੈਂ ਪਹਿਲਾਂ motor ਦੀ winding ਅਤੇ bearing check ਕਰਾਂਗਾ, ਅਤੇ power isolate ਕਰਕੇ earth leakage ਚੈੱਕ ਕਰਾਂਗਾ।"
                  translatedTranscript="I would first check the motor winding resistance and bearing condition, and isolate power to check for earth leakage with a multimeter."
                  language="pa"
                  durationSeconds={8}
                  candidateName="Arjun Kumar"
                />
              </div>

              {/* Safety Compliance Statement */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Verified Safety Protocols Demonstrated:</div>
                  <div className="mt-0.5 text-emerald-800">
                    Lockout/Tagout (LOTO) isolation, prove-test-prove zero-voltage meter check, and capacitor discharge safely performed.
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedSkillForEvidence(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
                >
                  Close Evidence Drawer
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
