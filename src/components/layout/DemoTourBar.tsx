'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { Play, Pause, ChevronLeft, ChevronRight, X, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { DEMO_STEPS } from '@/lib/mockData';

export const DemoTourBar: React.FC = () => {
  const {
    demoActive,
    demoStep,
    nextDemoStep,
    prevDemoStep,
    setDemoStepNumber,
    demoAutoPlay,
    toggleDemoAutoPlay,
    exitDemoTour,
  } = useApp();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  if (!demoActive) return null;

  const currentStepData = DEMO_STEPS.find((s) => s.stepNumber === demoStep) || DEMO_STEPS[0];

  const handleExecuteTargetView = (targetView: string) => {
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

  const handleStepJump = (stepNum: number) => {
    setDemoStepNumber(stepNum);
    const target = DEMO_STEPS.find((s) => s.stepNumber === stepNum);
    if (target) {
      handleExecuteTargetView(target.targetView);
    }
    setDropdownOpen(false);
  };

  const handleNextWithRoute = () => {
    const nextNum = Math.min(20, demoStep + 1);
    handleStepJump(nextNum);
  };

  const handlePrevWithRoute = () => {
    const prevNum = Math.max(1, demoStep - 1);
    handleStepJump(prevNum);
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-4xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="rounded-2xl bg-slate-950/95 border border-indigo-500/40 text-white shadow-2xl backdrop-blur-md p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Step Badge & Title */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-sm text-white flex-shrink-0 shadow-md shadow-indigo-600/30">
            {demoStep}/20
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                Hackathon Demo Tour
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h4 className="font-bold text-sm text-white truncate">{currentStepData.title}</h4>
            <p className="text-xs text-slate-300 truncate max-w-md">{currentStepData.description}</p>
          </div>
        </div>

        {/* Step Quick Jump Selector & Controls */}
        <div className="flex items-center gap-2 flex-wrap justify-end w-full md:w-auto">
          {/* Quick Step Selector Button */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              <span>Jump Step</span>
            </button>

            {dropdownOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-72 max-h-80 overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl z-50 divide-y divide-slate-800/60">
                {DEMO_STEPS.map((s) => (
                  <button
                    key={s.stepNumber}
                    onClick={() => handleStepJump(s.stepNumber)}
                    className={`w-full text-left p-2 rounded-xl text-xs flex items-center gap-2 transition-colors ${
                      s.stepNumber === demoStep
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-70 w-5">{s.stepNumber}.</span>
                    <span className="truncate">{s.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auto-Play Toggle */}
          <button
            onClick={toggleDemoAutoPlay}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
              demoAutoPlay
                ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="Auto-play walkthrough every 7 seconds"
          >
            {demoAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{demoAutoPlay ? 'Auto (On)' : 'Auto'}</span>
          </button>

          {/* Prev Button */}
          <button
            onClick={handlePrevWithRoute}
            disabled={demoStep === 1}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 border border-slate-700 transition-colors"
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNextWithRoute}
            className="inline-flex items-center gap-1 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all active:scale-95"
          >
            <span>{demoStep === 20 ? 'Finish Tour' : 'Next Step'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Close Demo Button */}
          <button
            onClick={exitDemoTour}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Exit Demo Tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
