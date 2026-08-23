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
    questionText: '',
    answerText: '',
    isCorrect: 'Incorrect' as const,
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
      </div>

      {/* Detailed metrics hidden during active assessment */}
      <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col items-center text-center space-y-2">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs text-indigo-500 mb-1">
          <Activity className="w-5 h-5" />
        </div>
        <h5 className="text-xs font-black text-slate-800">Recording Telemetry</h5>
        <p className="text-[11px] text-slate-500 leading-relaxed max-w-xs">
          Your responses are being analyzed in real-time. The detailed skills assessment will be available once all questions are completed.
        </p>
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
