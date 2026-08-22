'use client';

import React from 'react';
import { Activity, TrendingUp, ChevronRight, Check } from 'lucide-react';

interface AdaptiveStep {
  number: number;
  label: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  score: number;
  status: 'completed' | 'active' | 'upcoming';
}

export const AdaptiveTrajectory: React.FC<{ activeStepNumber?: number }> = ({ activeStepNumber = 2 }) => {
  const steps: AdaptiveStep[] = [
    { number: 1, label: 'Panel Safety & Isolation', difficulty: 'Beginner', score: 91, status: 'completed' },
    { number: 2, label: 'Motor Thermal Diagnostics', difficulty: 'Intermediate', score: 86, status: activeStepNumber === 2 ? 'active' : 'completed' },
    { number: 3, label: 'Floating Neutral Analysis', difficulty: 'Advanced', score: 74, status: activeStepNumber === 3 ? 'active' : 'upcoming' },
    { number: 4, label: 'Capacitor Microfarad Verification', difficulty: 'Intermediate', score: 81, status: 'upcoming' },
  ];

  const getDiffColor = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Intermediate':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Advanced':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      default:
        return 'text-blue-700 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-600" />
          <h4 className="font-bold text-slate-900 text-sm">Adaptive Assessment Trajectory</h4>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          Real-time dynamic difficulty
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`p-3.5 rounded-xl border transition-all ${
              step.status === 'active'
                ? 'border-indigo-400 bg-indigo-50/40 ring-2 ring-indigo-200 shadow-sm'
                : step.status === 'completed'
                ? 'border-slate-200 bg-white'
                : 'border-slate-100 bg-slate-50/50 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-slate-500">Question {step.number}</span>
              <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${getDiffColor(step.difficulty)}`}>
                {step.difficulty}
              </span>
            </div>

            <div className="font-bold text-slate-900 text-xs truncate mb-2">{step.label}</div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-500">Score Result:</span>
              {step.status === 'completed' || step.status === 'active' ? (
                <span className="font-bold text-emerald-600">{step.score}%</span>
              ) : (
                <span className="text-slate-400 font-mono">--</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
        <span>⚡ <strong>Adaptive Rule:</strong> Score ≥ 80% increases difficulty; &lt; 60% decreases difficulty.</span>
        <span className="font-semibold text-indigo-600">Current Level: Intermediate</span>
      </div>
    </div>
  );
};
