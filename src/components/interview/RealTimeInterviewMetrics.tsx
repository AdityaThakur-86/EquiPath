'use client';

import React from 'react';
import { ShieldCheck, Activity, CheckCircle2, Zap, Sparkles, TrendingUp, Clock, FileText } from 'lucide-react';
import { RealTimeMetrics } from '@/lib/interviewEngine';
import { DynamicInterviewQuestion } from '@/lib/interviewQuestionBank';

interface RealTimeInterviewMetricsProps {
  metrics: RealTimeMetrics | null;
  currentQuestion: DynamicInterviewQuestion;
  completedCount: number;
  totalQuestions?: number;
}

export const RealTimeInterviewMetrics: React.FC<RealTimeInterviewMetricsProps> = ({
  metrics,
  currentQuestion,
  completedCount,
  totalQuestions = 5,
}) => {
  const displayMetrics = metrics || {
    technicalAccuracy: 88,
    troubleshootingReasoning: 84,
    safetyCompliance: 92,
    specificityDepth: 80,
    overallTurnScore: 86,
    detectedKeywords: ['Awaiting response...'],
    missedKeywords: [],
    interviewerReaction: 'Answer the question via voice or quick preset to see real-time trade signals evaluated.',
    wordCount: 0,
    speakingDurationSeconds: 0,
    paceWpm: 0,
  };

  return (
    <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-md space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center shadow-2xs">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-slate-900">
              Live AI Telemetry HUD
            </h4>
            <p className="text-[10px] text-slate-500">Real-time trade signal telemetry</p>
          </div>
        </div>

        {/* Live Turn Score Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black shadow-2xs">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Score: {displayMetrics.overallTurnScore}%</span>
        </div>
      </div>

      {/* Real-Time Live Speech Stats */}
      {displayMetrics.wordCount > 0 && (
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs font-bold text-indigo-950">
          <div className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span>{displayMetrics.wordCount} Words Spoken</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span>Pace: {displayMetrics.paceWpm} WPM</span>
          </div>
        </div>
      )}

      {/* 4-Dimension Metric Bars */}
      <div className="space-y-3">
        {/* Technical Accuracy */}
        <div>
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-slate-700 flex items-center gap-1">
              <Zap className="w-3 h-3 text-indigo-600" /> Technical Accuracy
            </span>
            <span className="text-indigo-600 font-black">{displayMetrics.technicalAccuracy}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-700"
              style={{ width: `${displayMetrics.technicalAccuracy}%` }}
            />
          </div>
        </div>

        {/* Troubleshooting Reasoning */}
        <div>
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-slate-700 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-600" /> Troubleshooting Reasoning
            </span>
            <span className="text-cyan-600 font-black">{displayMetrics.troubleshootingReasoning}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-cyan-600 rounded-full transition-all duration-700"
              style={{ width: `${displayMetrics.troubleshootingReasoning}%` }}
            />
          </div>
        </div>

        {/* Safety & LOTO Compliance */}
        <div>
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-slate-700 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Safety & Isolation Protocol
            </span>
            <span className="text-emerald-600 font-black">{displayMetrics.safetyCompliance}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-700"
              style={{ width: `${displayMetrics.safetyCompliance}%` }}
            />
          </div>
        </div>

        {/* Specificity & Jargon */}
        <div>
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-slate-700 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-violet-600" /> Trade Specificity & Jargon
            </span>
            <span className="text-violet-600 font-black">{displayMetrics.specificityDepth}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-violet-600 rounded-full transition-all duration-700"
              style={{ width: `${displayMetrics.specificityDepth}%` }}
            />
          </div>
        </div>
      </div>

      {/* Detected Trade Keywords */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
          Verified Trade Concepts Detected:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {displayMetrics.detectedKeywords.map((kw, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shadow-2xs"
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>{kw}</span>
            </span>
          ))}
        </div>
      </div>

      {/* AI Evaluator Reaction */}
      <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs font-medium text-indigo-950 flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">{displayMetrics.interviewerReaction}</p>
      </div>

      {/* Interview Progress Steps */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-2">
          <span>Session Progress</span>
          <span>{completedCount} of {totalQuestions} Questions</span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {[1, 2, 3, 4, 5].map((step) => {
            const isCompleted = step <= completedCount;
            const isCurrent = step === completedCount + 1;

            return (
              <div
                key={step}
                className={`h-2 rounded-full transition-all ${
                  isCompleted
                    ? 'bg-emerald-500'
                    : isCurrent
                    ? 'bg-indigo-600 animate-pulse'
                    : 'bg-slate-200'
                }`}
                title={`Question ${step}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
