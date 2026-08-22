'use client';

import React from 'react';
import { RecruiterSidebar } from '@/components/layout/RecruiterSidebar';
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Users,
  Scale,
  Sparkles,
  CheckCircle2,
  Clock,
  Award,
} from 'lucide-react';

export default function RecruiterAnalyticsPage() {
  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-slate-50 min-h-screen">
      <RecruiterSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-6xl space-y-8">
        {/* Header */}
        <div className="pb-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold mb-2">
              <BarChart3 className="w-3.5 h-3.5" /> Hiring Efficiency & Bias Metrics
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Pipeline Analytics & Bias Reduction
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Data-driven overview of verification pass rates, skill distributions, and fair hiring velocity.
            </p>
          </div>

          <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs">
            Requisition: Electrical Technician
          </span>
        </div>

        {/* 4 Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
              <span>Verification Pass Rate</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-slate-900 mt-2">36.7%</div>
            <div className="text-[11px] text-slate-400 mt-0.5">47 of 128 applicants passed</div>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
              <span>Avg Skill Confidence</span>
              <Award className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-3xl font-black text-indigo-600 mt-2">84.2%</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">+4.8% vs last month</div>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
              <span>Time-to-Hire Velocity</span>
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-3xl font-black text-slate-900 mt-2">9 Days</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Down from 28 days</div>
          </div>

          {/* Card 4 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold text-slate-500 flex items-center justify-between">
              <span>Fairness Pool Expansion</span>
              <Scale className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-amber-600 mt-2">+68%</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Underrepresented talent unlocked</div>
          </div>
        </div>

        {/* Analytics Charts & Breakdowns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skill Performance Distribution */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">
              Competency Breakdown across Verified Electricians
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Safety Isolation (LOTO & Zero-Volt)</span>
                  <span className="text-emerald-600">93.4%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '93.4%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Electrical Wiring & Schematics</span>
                  <span className="text-indigo-600">88.1%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '88.1%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Troubleshooting Logic</span>
                  <span className="text-blue-600">84.6%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '84.6%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>3-Phase Induction Motor Repair</span>
                  <span className="text-cyan-600">79.2%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: '79.2%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Bias Audit Impact Visualization */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="font-bold text-sm text-white">Ranking Transparency Audit Impact</h3>
                <span className="text-xs font-bold text-emerald-400">ISO-Aligned</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mt-3">
                By eliminating penalties for non-standard employment gaps, college brand biases, and regional language speech, hiring teams discover high-performing trade specialists 3x faster with 0% resume inflation.
              </p>

              <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Average Candidate Rank Shift:</span>
                  <span className="font-bold text-white">+4.2 spots</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Practical Assessment Correlation to Field Quality:</span>
                  <span className="font-bold text-emerald-400">96.8%</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>False Negative Rejections Prevented:</span>
                  <span className="font-bold text-indigo-300">22 Candidates</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-slate-400 text-center">
              EquiPath Decision Support Engine • BrightCore Services Pipeline
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
