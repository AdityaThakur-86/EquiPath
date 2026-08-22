'use client';

import React from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Check,
  AlertTriangle,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Briefcase,
  FileCheck,
  Globe,
} from 'lucide-react';
import { FinalSkillAssessmentReport } from '@/lib/types';

interface FinalSkillReportViewProps {
  report: FinalSkillAssessmentReport;
  onRestart: () => void;
  onSaveToProfile: () => void;
  onViewJobs: () => void;
}

export const FinalSkillReportView: React.FC<FinalSkillReportViewProps> = ({
  report,
  onRestart,
  onSaveToProfile,
  onViewJobs,
}) => {
  const isPassing = report.overallSkillScore >= 50;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Official Skill Verification
            </span>
            <span className="text-xs text-slate-300">
              {report.completedQuestions}/{report.totalQuestions} Questions Completed
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            EQUIPATH SKILL ASSESSMENT
          </h2>
          <p className="text-xs sm:text-sm text-indigo-200 mt-1">
            Skill Focus: <span className="font-bold text-white">{report.skillName}</span> • Candidate:{' '}
            <span className="font-bold text-white">{report.candidateName}</span>
          </p>
        </div>

        {/* Big Dual Scores */}
        <div className="flex items-center gap-4">
          <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
            <div className="text-3xl sm:text-4xl font-black text-white">{report.overallSkillScore}%</div>
            <div className="text-[10px] font-black uppercase tracking-wider text-indigo-200 mt-0.5">
              Skill Score
            </div>
          </div>

          <div className="px-6 py-4 rounded-2xl bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-center">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400">{report.assessmentConfidence}%</div>
            <div className="text-[10px] font-black uppercase tracking-wider text-emerald-200 mt-0.5">
              Confidence
            </div>
          </div>
        </div>
      </div>

      {/* Performance Tier & 4-Dimension Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
            Verified Competency Breakdown
          </h4>
          <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-black">
            Performance: {report.performanceTier}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Technical Knowledge */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Technical Knowledge</span>
              <span className="font-black text-indigo-600">{report.technicalKnowledgePercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${report.technicalKnowledgePercent}%` }}
              />
            </div>
          </div>

          {/* Troubleshooting Reasoning */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Troubleshooting</span>
              <span className="font-black text-cyan-600">{report.troubleshootingReasoningPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-600 rounded-full"
                style={{ width: `${report.troubleshootingReasoningPercent}%` }}
              />
            </div>
          </div>

          {/* Safety Compliance */}
          <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/40">
            <div className="flex justify-between text-xs font-bold text-emerald-800 mb-1">
              <span>Safety Awareness</span>
              <span className="font-black text-emerald-950">{report.safetyCompliancePercent}%</span>
            </div>
            <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full"
                style={{ width: `${report.safetyCompliancePercent}%` }}
              />
            </div>
          </div>

          {/* Practical Specificity */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Practical Reasoning</span>
              <span className="font-black text-violet-600">{report.specificityPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-600 rounded-full"
                style={{ width: `${report.specificityPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Key Point Summary */}
      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
          Cumulative Key Point Summary
        </h4>

        {/* Demonstrated */}
        {report.allMatchedKeyPoints.length > 0 ? (
          <div>
            <span className="text-xs font-bold text-emerald-800 block mb-2 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Key Points Demonstrated:
            </span>
            <div className="flex flex-wrap gap-2">
              {report.allMatchedKeyPoints.map((kp, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold flex items-center gap-1 shadow-2xs"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-700" /> {kp}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-500 font-bold italic">
            ○ No verified key points were demonstrated across the assessment questions.
          </div>
        )}

        {/* Missing */}
        {report.allMissingKeyPoints.length > 0 && (
          <div className="pt-3 border-t border-slate-200">
            <span className="text-xs font-bold text-amber-800 block mb-2 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Key Points Missing:
            </span>
            <div className="flex flex-wrap gap-2">
              {report.allMissingKeyPoints.slice(0, 6).map((kp, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-medium flex items-center gap-1"
                >
                  <span className="text-amber-500 font-bold">○</span> {kp}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Incorrect */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
          <span className="text-slate-600">Incorrect Concepts:</span>
          {report.allIncorrectPointsFound.length === 0 ? (
            <span className="text-emerald-700">✓ None</span>
          ) : (
            <span className="text-rose-700 font-black">
              ✗ {report.allIncorrectPointsFound.join(', ')}
            </span>
          )}
        </div>

        {/* Safety */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
          <span className="text-slate-600">Safety Status:</span>
          {report.criticalSafetyStatus === 'Passed' ? (
            <span className="text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Safe Approach Demonstrated
            </span>
          ) : (
            <span className="text-rose-700 flex items-center gap-1 font-black">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Critical Safety Failure
            </span>
          )}
        </div>
      </div>

      {/* Specific Feedback Box: Strengths & Growth */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
          <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Key Strengths
          </h4>
          <ul className="space-y-1.5 text-xs text-emerald-950 font-medium">
            {report.strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
          <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" /> Areas for Improvement
          </h4>
          <ul className="space-y-1.5 text-xs text-amber-950 font-medium">
            {report.growthOpportunities.map((gw, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>{gw}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <button
          onClick={onRestart}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retake Assessment</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onSaveToProfile}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md shadow-indigo-200 transition-all active:scale-98"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Save & Verify to Profile</span>
          </button>

          <button
            onClick={onViewJobs}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-sm transition-all active:scale-98"
          >
            <span>Explore Jobs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
