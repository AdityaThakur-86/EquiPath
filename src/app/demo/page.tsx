'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import {
  Play,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Scale,
  Mic,
  Award,
  Briefcase,
  Users,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { DEMO_STEPS } from '@/lib/mockData';

export default function DemoHubPage() {
  const { demoActive, demoStep, startDemoTour, setDemoStepNumber } = useApp();
  const router = useRouter();

  const handleLaunchStep = (stepNum: number, targetView: string) => {
    startDemoTour(stepNum);
    switch (targetView) {
      case 'landing':
        router.push('/');
        break;
      case 'candidate-claim':
        router.push('/candidate/claim');
        break;
      case 'candidate-verify':
        router.push('/candidate/verify');
        break;
      case 'candidate-interview':
        router.push('/candidate/interview');
        break;
      case 'candidate-profile':
        router.push('/candidate/profile');
        break;
      case 'candidate-jobs':
        router.push('/candidate/jobs');
        break;
      case 'recruiter-dashboard':
        router.push('/recruiter/dashboard');
        break;
      case 'recruiter-candidates':
        router.push('/recruiter/candidates');
        break;
      case 'recruiter-bias-audit':
        router.push('/recruiter/bias-audit');
        break;
      case 'recruiter-messages':
        router.push('/recruiter/messages');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 sm:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>2-3 MINUTE HACKATHON DEMO MASTER TOUR</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              EquiPath End-to-End Walkthrough
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl">
              Guide judges through the complete skills-first loop: Multilingual Voice Assessment → Dynamic AI Scoring → Explainable Match → Recruiter Ranking Transparency Audit (#7 → #2).
            </p>
          </div>

          <button
            onClick={() => handleLaunchStep(1, 'candidate-claim')}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm shadow-xl shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 active:scale-95 flex-shrink-0"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>▶ Start Full Guided Demo</span>
          </button>
        </div>

        {/* 20 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEMO_STEPS.map((step) => {
            const isCurrent = demoActive && demoStep === step.stepNumber;

            return (
              <div
                key={step.stepNumber}
                onClick={() => handleLaunchStep(step.stepNumber, step.targetView)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'border-indigo-500 bg-indigo-950/60 ring-2 ring-indigo-400/40 shadow-lg'
                    : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                      {step.stepNumber}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {step.targetView.split('-')[0]}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-xs leading-snug mb-1">{step.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{step.description}</p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-bold text-indigo-400">
                  <span>Launch Step →</span>
                  {isCurrent && <span className="text-emerald-400">Active</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
