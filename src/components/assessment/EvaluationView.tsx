'use client';

import React from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Globe,
  Activity,
  Award,
  XCircle,
  TrendingUp,
  RotateCcw,
  Check,
  AlertOctagon,
  FileText,
} from 'lucide-react';
import { EvaluationResult } from '@/lib/types';
import { VoiceAudioPlayer } from '@/components/shared/VoiceAudioPlayer';

interface EvaluationViewProps {
  result: EvaluationResult;
  onNextQuestion: () => void;
  onViewProfile?: () => void;
  onViewJobs?: () => void;
  questionNumber?: number;
  totalQuestions?: number;
}

export const EvaluationView: React.FC<EvaluationViewProps> = ({
  result,
  onNextQuestion,
  onViewProfile,
  onViewJobs,
  questionNumber = 1,
  totalQuestions = 6,
}) => {
  const isZeroOrEmpty = result.scores.overallScore === 0 || result.isMeaninglessOrEmpty;
  const isHighPerformance = result.scores.overallScore >= 80;
  const isModeratePerformance = result.scores.overallScore >= 50 && result.scores.overallScore < 80;
  const isWeakOrWrong = result.scores.overallScore < 50;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg space-y-8 animate-in fade-in duration-300">
      {/* Top Banner: Score vs Assessment Confidence */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                isZeroOrEmpty
                  ? 'bg-rose-50 border border-rose-200 text-rose-800'
                  : isWeakOrWrong
                  ? 'bg-amber-50 border border-amber-200 text-amber-800'
                  : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              }`}
            >
              {isZeroOrEmpty ? (
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
              ) : isWeakOrWrong ? (
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              )}
              <span>
                {isZeroOrEmpty
                  ? 'Empty / Unanswered'
                  : isWeakOrWrong
                  ? 'Needs Significant Improvement'
                  : 'Evaluated on Practical Evidence'}
              </span>
            </span>

            <span className="text-xs font-bold text-slate-500">
              Question {questionNumber} of {totalQuestions}
            </span>
          </div>

          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Question Evaluation & Evidence Summary
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Scores reflect verified technical key points and physical safety protocols.
          </p>
        </div>

        {/* Dual Badges: Skill Score & Assessment Confidence */}
        <div className="flex items-center gap-3">
          {/* 1. Earned Question Score */}
          <div
            className={`flex flex-col items-center justify-center px-5 py-3 rounded-2xl border text-center min-w-[120px] ${
              isZeroOrEmpty
                ? 'bg-rose-50 border-rose-200 text-rose-950'
                : isWeakOrWrong
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : 'bg-indigo-50 border-indigo-200 text-indigo-950'
            }`}
          >
            <div className="text-3xl font-black">{result.scores.overallScore}%</div>
            <div className="text-[10px] font-black uppercase tracking-wider opacity-70">
              Earned Score
            </div>
          </div>

          {/* 2. Assessment Confidence (Reliability) */}
          <div className="flex flex-col items-center justify-center px-5 py-3 rounded-2xl bg-slate-900 text-white shadow-md text-center min-w-[120px]">
            <div className="text-3xl font-black text-emerald-400">{result.assessmentConfidence}%</div>
            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
              Confidence
            </div>
          </div>
        </div>
      </div>

      {/* 5 Component Scoring Breakdown Cards */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-indigo-600" />
          Strict 100-Point Scoring Rubric Breakdown
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {/* Technical Correctness (40 pts) */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Technical</span>
              <span className="text-indigo-600 font-black">{result.scores.technicalScore} / 40</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all"
                style={{ width: `${(result.scores.technicalScore / 40) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-[10px] text-slate-500 font-medium">Physical root cause</p>
          </div>

          {/* Key Points (25 pts) */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Key Points</span>
              <span className="text-cyan-600 font-black">{result.scores.keyPointScore} / 25</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-600 rounded-full transition-all"
                style={{ width: `${(result.scores.keyPointScore / 25) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-[10px] text-slate-500 font-medium">Required diagnostic targets</p>
          </div>

          {/* Reasoning (15 pts) */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Reasoning</span>
              <span className="text-blue-600 font-black">{result.scores.reasoningScore} / 15</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${(result.scores.reasoningScore / 15) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-[10px] text-slate-500 font-medium">Explains WHY</p>
          </div>

          {/* Safety (10 pts) */}
          <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/40">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-800 mb-1">
              <span>Safety</span>
              <span className="text-emerald-950 font-black">{result.scores.safetyScore} / 10</span>
            </div>
            <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all"
                style={{ width: `${(result.scores.safetyScore / 10) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-[10px] text-emerald-700 font-medium">Power isolation / PPE</p>
          </div>

          {/* Specificity (10 pts) */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Specificity</span>
              <span className="text-violet-600 font-black">{result.scores.specificityScore} / 10</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-600 rounded-full transition-all"
                style={{ width: `${(result.scores.specificityScore / 10) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-[10px] text-slate-500 font-medium">Exact meter ratings</p>
          </div>
        </div>
      </div>

      {/* KEY POINT SUMMARY TABLE: Demonstrated vs Missing vs Incorrect */}
      <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
          Key Point Evidence Breakdown
        </h4>

        {/* Demonstrated Key Points */}
        {result.matchedKeyPoints.length > 0 ? (
          <div>
            <span className="text-xs font-bold text-emerald-800 block mb-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Key Points Demonstrated:
            </span>
            <div className="flex flex-wrap gap-2">
              {result.matchedKeyPoints.map((kp, idx) => (
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
          <div className="text-xs font-bold text-slate-500 italic">
            ○ No key points were successfully identified in the response.
          </div>
        )}

        {/* Missing Key Points */}
        {result.missingKeyPoints.length > 0 && (
          <div className="pt-2 border-t border-slate-200">
            <span className="text-xs font-bold text-amber-800 block mb-1.5 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Key Points Missing:
            </span>
            <div className="flex flex-wrap gap-2">
              {result.missingKeyPoints.map((kp, idx) => (
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

        {/* Incorrect Concepts Found */}
        {result.incorrectPointsFound.length > 0 && (
          <div className="pt-2 border-t border-slate-200">
            <span className="text-xs font-bold text-rose-800 block mb-1.5 flex items-center gap-1">
              <AlertOctagon className="w-3.5 h-3.5 text-rose-600" /> Incorrect / Hazardous Concepts Found:
            </span>
            <div className="flex flex-wrap gap-2">
              {result.incorrectPointsFound.map((inc, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-rose-100 text-rose-900 border border-rose-300 text-xs font-black flex items-center gap-1"
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-600" /> {inc}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Safety Status */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
          <span className="text-slate-600">Electrical Safety Protocol:</span>
          {result.isCriticalSafetyPassed ? (
            <span className="text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Safe Procedure Followed
            </span>
          ) : (
            <span className="text-rose-700 flex items-center gap-1 font-black">
              <AlertOctagon className="w-3.5 h-3.5 text-rose-600" /> Critical Safety Violation
            </span>
          )}
        </div>
      </div>

      {/* Specific Feedback Box */}
      <div
        className={`p-5 rounded-2xl border text-xs sm:text-sm font-medium leading-relaxed ${
          isZeroOrEmpty
            ? 'bg-rose-50 border-rose-200 text-rose-950'
            : isWeakOrWrong
            ? 'bg-amber-50 border-amber-200 text-amber-950'
            : 'bg-indigo-50 border-indigo-200 text-indigo-950'
        }`}
      >
        <div className="flex items-center gap-2 mb-2 font-black text-xs uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5" />
          <span>Diagnostic Feedback</span>
        </div>
        <p>{result.feedback}</p>
      </div>

      {/* Multilingual Fair Evaluation Callout */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5 text-xs text-slate-700">
        <Globe className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-900">
            Semantic Multilingual Evaluation ({result.language === 'pa' ? 'ਪੰਜਾਬੀ' : result.language === 'hi' ? 'हिंदी' : 'English'})
          </span>
          <p className="mt-0.5 text-[11px] text-slate-500">
            The system evaluated the actual meaning of the answer. English, Hindi, Punjabi, and Hinglish responses receive the exact same score for equivalent technical concepts.
          </p>
        </div>
      </div>

      {/* Next Adaptive Question / Navigation Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
          <span>Next Adaptive Question Difficulty:</span>
          <span className="px-2.5 py-1 rounded-full bg-slate-900 text-white text-[11px] font-black">
            {result.nextDifficulty}
          </span>
        </div>

        <button
          onClick={onNextQuestion}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md shadow-indigo-200 hover:shadow-lg transition-all active:scale-95"
        >
          <span>Next Question</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
