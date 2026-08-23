'use client';

import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Star, Sparkles, Download, ArrowRight, RotateCcw, X, ExternalLink, ThumbsUp } from 'lucide-react';
import { InterviewDebriefReport } from '@/lib/interviewEngine';

interface InterviewDebriefModalProps {
  report: InterviewDebriefReport | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveToProfile: () => void;
  onRestartInterview: () => void;
  onViewJobs: () => void;
}

export const InterviewDebriefModal: React.FC<InterviewDebriefModalProps> = ({
  report,
  isOpen,
  onClose,
  onSaveToProfile,
  onRestartInterview,
  onViewJobs,
}) => {
  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Technical Interview Verified
            </span>
            <span className="text-xs text-slate-300">
              {report.tradeName}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Skills Assessment Complete
          </h2>
          <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-xl">
            Evaluated directly by {report.interviewerName} ({report.interviewerTitle})
          </p>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Top Score Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50/80 via-white to-emerald-50/80 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex flex-col items-center justify-center shadow-lg shadow-indigo-200 flex-shrink-0">
                <span className="text-3xl font-black">{report.overallScore}</span>
                <span className="text-[10px] uppercase font-bold opacity-80">/ 100</span>
              </div>
              <div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black mb-1">
                  <Award className="w-3 h-3" /> {report.confidenceBadge}
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Overall Skill Confidence {report.overallScore}%
                </h3>
                <p className="text-xs text-slate-600">
                  {report.questionsCompleted} Stages Completed • Candidate: {report.candidateName} • Language: {report.language === 'pa' ? 'ਪੰਜਾਬੀ (Punjabi)' : report.language === 'hi' ? 'हिंदी (Hindi)' : 'English'}
                </p>
              </div>
            </div>

            <button
              onClick={onSaveToProfile}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md shadow-indigo-200 hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save & Verify to Profile</span>
            </button>
          </div>

          {/* 5-Dimension Radar Breakdown */}
          <div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">
              Performance Dimensions Breakdown
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="text-[11px] font-bold text-slate-500 block mb-1">Technical Knowledge</span>
                <span className="text-lg font-black text-indigo-600">{report.dimensions.technicalKnowledge}/100</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="text-[11px] font-bold text-slate-500 block mb-1">Problem Solving</span>
                <span className="text-lg font-black text-cyan-600">{report.dimensions.problemSolving}/100</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="text-[11px] font-bold text-slate-500 block mb-1">Practical Reasoning</span>
                <span className="text-lg font-black text-emerald-600">{report.dimensions.practicalReasoning}/100</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                <span className="text-[11px] font-bold text-slate-500 block mb-1">Safety Awareness</span>
                <span className="text-lg font-black text-violet-600">{report.dimensions.safetyAwareness}/100</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center col-span-2 sm:col-span-1">
                <span className="text-[11px] font-bold text-slate-500 block mb-1">Photo Challenge</span>
                <span className="text-lg font-black text-amber-600">{report.dimensions.photoChallenge}</span>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Interview Remarks
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {report.executiveSummary}
            </p>
          </div>

          {/* Strengths & Areas to Improve */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <h4 className="text-xs font-black text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-700" /> STRENGTHS
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-950 font-medium">
                {report.strengths.slice(0, 3).map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-100">
              <h4 className="text-xs font-black text-orange-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-orange-700" /> AREAS TO IMPROVE
              </h4>
              <ul className="space-y-1.5 text-xs text-orange-950 font-medium">
                {report.growthOpportunities.slice(0, 3).map((opp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>{opp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Evidence Summary */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
              Evidence Summary
            </h4>
            <ul className="space-y-2 text-xs text-slate-700 font-medium">
              {report.questionsAndAnswers?.map((qa, idx) => (
                <li key={idx} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">Question {qa.questionNumber}:</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      qa.isCorrect === 'Correct' ? 'bg-emerald-100 text-emerald-800' :
                      qa.isCorrect === 'Partially Correct' ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {qa.isCorrect}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Skills Unlocked */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white">
            <h4 className="text-xs font-black text-indigo-300 uppercase tracking-wider mb-2">
              Verified Skills Added to Profile:
            </h4>
            <div className="flex flex-wrap gap-2">
              {report.verifiedSkillsUnlocked.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-slate-800 text-emerald-300 border border-slate-700 text-xs font-bold flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download/Save Assessment</span>
            </button>
            <button
              onClick={onRestartInterview}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={onViewJobs}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shadow-md shadow-indigo-200 transition-all flex items-center gap-1.5"
            >
              <span>Explore Matching Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
