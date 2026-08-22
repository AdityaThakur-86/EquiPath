'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Mic,
  FileX2,
  Globe,
  Award,
  Scale,
  Users,
  Briefcase,
  Play,
  Volume2,
  Layers,
  TrendingUp,
} from 'lucide-react';
import { VoiceAudioPlayer } from '@/components/shared/VoiceAudioPlayer';
import { ConfidenceBadge } from '@/components/shared/ConfidenceBadge';
import { SUPPORTED_LANGUAGES, Language } from '@/lib/types';

export default function LandingPage() {
  const { startDemoTour, setRole } = useApp();
  const router = useRouter();
  const [demoLang, setDemoLang] = useState<Language>('pa');

  const handleStartCandidateVerification = () => {
    setRole('candidate');
    router.push('/candidate/claim');
  };

  const handleStartRecruiterDemo = () => {
    setRole('recruiter');
    router.push('/recruiter/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-indigo-50/30 to-slate-50 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>AI-POWERED SKILLS-FIRST HIRING PLATFORM</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
                Skills First. <br />
                <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Opportunities for Everyone.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
                Prove what you can do. Get matched to real opportunities based on demonstrated skills — not just your resume.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={handleStartCandidateVerification}
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all transform hover:-translate-y-0.5 active:scale-95"
                >
                  <span>Start Skill Verification</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleStartRecruiterDemo}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl border-2 border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-base shadow-xs transition-all active:scale-95"
                >
                  <Briefcase className="w-4 h-4 text-slate-600" />
                  <span>Explore Recruiter Demo</span>
                </button>

                <button
                  onClick={() => startDemoTour(1)}
                  className="inline-flex items-center gap-2 px-5 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white text-white" />
                  <span>▶ 2-Min Hackathon Tour</span>
                </button>
              </div>

              {/* Under Hero Pillars */}
              <div className="pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 text-xs font-black uppercase tracking-wider text-slate-500">
                <div className="flex items-center gap-2 text-indigo-900">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  REAL SKILLS
                </div>
                <div className="flex items-center gap-2 text-indigo-900">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  FAIR MATCHING
                </div>
                <div className="flex items-center gap-2 text-indigo-900">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  TRANSPARENT DECISIONS
                </div>
              </div>
            </div>

            {/* Right Column: Arjun Kumar Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                {/* Floating "No resume required" badge */}
                <div className="absolute -top-4 -right-4 z-20 px-4 py-2 rounded-2xl bg-slate-900 text-white text-xs font-black shadow-xl flex items-center gap-1.5 rotate-2">
                  <FileX2 className="w-4 h-4 text-emerald-400" />
                  <span>No resume required.</span>
                </div>

                {/* Candidate Card */}
                <div className="rounded-3xl border-2 border-indigo-100 bg-white p-6 sm:p-7 shadow-2xl shadow-indigo-100/70 relative">
                  {/* Candidate Header */}
                  <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80"
                      alt="Arjun Kumar"
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-100 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-slate-900">Arjun Kumar</h3>
                      </div>
                      <p className="text-xs text-indigo-700 font-bold">Electrical Technician</p>
                      <div className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>✓ Scenario Verified</span>
                      </div>
                    </div>
                  </div>

                  {/* Verified Skills Bars */}
                  <div className="py-5 space-y-3.5">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Verified Practical Skills:
                    </div>

                    {/* Skill 1 */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                        <span>Electrical Wiring</span>
                        <span className="text-indigo-600">74%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: '74%' }} />
                      </div>
                    </div>

                    {/* Skill 2 */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                        <span>Troubleshooting</span>
                        <span className="text-indigo-600">82%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: '82%' }} />
                      </div>
                    </div>

                    {/* Skill 3 */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                        <span>Safety Procedures</span>
                        <span className="text-emerald-600">91%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: '91%' }} />
                      </div>
                    </div>

                    {/* Skill 4 */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                        <span>Motor Repair</span>
                        <span className="text-indigo-600">78%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: '78%' }} />
                      </div>
                    </div>
                  </div>

                  {/* Footer Card Match Info */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400 font-semibold">Matched Job</div>
                      <div className="text-xs font-bold text-slate-900">BrightCore Services</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-emerald-600">92% Match Score</div>
                      <div className="text-[10px] text-slate-400">+45 Skills • +25 Exp</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW EQUIPATH WORKS (VISUAL FOUR-STEP) */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
              Four-Step Skills Engine
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How EquiPath Works
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Replacing generic resumes with demonstrated, verifiable technical proof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 relative hover:shadow-md transition-shadow">
              <div className="text-4xl font-black text-indigo-600/30 mb-4">01</div>
              <h3 className="text-lg font-black text-slate-900 mb-2">CLAIM YOUR SKILLS</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                &ldquo;Tell us what you can do. No formal resume required.&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-indigo-700 font-bold">
                Select from Electrical, HVAC, Plumbing, Welding, Mechanics...
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 relative hover:shadow-md transition-shadow">
              <div className="text-4xl font-black text-indigo-600/30 mb-4">02</div>
              <h3 className="text-lg font-black text-slate-900 mb-2">PROVE YOUR SKILLS</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                &ldquo;Answer realistic scenarios using voice or text.&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-indigo-700 font-bold">
                Dynamic scenarios in English, Hindi, or Punjabi.
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 relative hover:shadow-md transition-shadow">
              <div className="text-4xl font-black text-indigo-600/30 mb-4">03</div>
              <h3 className="text-lg font-black text-slate-900 mb-2">BUILD YOUR SKILL PROFILE</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                &ldquo;Get transparent assessment confidence based on evidence.&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-indigo-700 font-bold">
                Clear scoring across Knowledge, Reasoning & Safety.
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 relative hover:shadow-md transition-shadow">
              <div className="text-4xl font-black text-indigo-600/30 mb-4">04</div>
              <h3 className="text-lg font-black text-slate-900 mb-2">GET MATCHED FAIRLY</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                &ldquo;Find jobs based on demonstrated skills and relevant experience.&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-indigo-700 font-bold">
                Explainable matching without pedigree bias.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MULTILINGUAL FEATURE SHOWCASE */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold mb-3">
              <Globe className="w-3.5 h-3.5" />
              <span>MULTILINGUAL AI EVALUATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              &ldquo;Your language shouldn&apos;t limit your opportunity.&rdquo;
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base">
              Answer skill assessments in the language you are most comfortable using.
            </p>

            {/* Language Selector */}
            <div className="mt-6 inline-flex items-center bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setDemoLang(lang.code)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                    demoLang === lang.code
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang.nativeLabel} ({lang.label})
                </button>
              ))}
            </div>
          </div>

          {/* Multilingual Voice Evaluation Demo Card */}
          <div className="max-w-4xl mx-auto rounded-3xl border border-slate-800 bg-slate-950/80 p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left: Question & Spoken Punjabi Transcript */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1">
                    Scenario Question:
                  </div>
                  <p className="text-sm font-bold text-white">
                    {demoLang === 'pa'
                      ? '“ਇੱਕ ਮੋਟਰ ਜ਼ਿਆਦਾ ਗਰਮ ਹੋ ਰਹੀ ਹੈ ਭਾਵੇਂ ਵੋਲਟੇਜ ਆਮ ਹੈ। ਤੁਸੀਂ ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਕੀ ਚੈੱਕ ਕਰੋਗੇ?”'
                      : demoLang === 'hi'
                      ? '“एक मोटर अधिक गर्म हो रही है भले ही वोल्टेज सामान्य है। आप सबसे पहले क्या जांचेंगे?”'
                      : '“A motor is overheating even though the voltage is normal. What would you check next?”'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/60">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                      Candidate Voice Answer — 00:08
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-900/80 text-indigo-200 text-[10px] font-mono">
                      {demoLang === 'pa' ? 'ਪੰਜਾਬੀ' : demoLang === 'hi' ? 'हिंदी' : 'English'}
                    </span>
                  </div>

                  <p className="text-xs text-white leading-relaxed font-mono">
                    {demoLang === 'pa'
                      ? '“ਮੈਂ ਪਹਿਲਾਂ motor ਦੀ winding ਅਤੇ bearing check ਕਰਾਂਗਾ, ਅਤੇ power isolate ਕਰਕੇ earth leakage ਚੈੱਕ ਕਰਾਂਗਾ...”'
                      : demoLang === 'hi'
                      ? '“मैं पहले मोटर की वाइंडिंग और बेयरिंग की जांच करूंगा, और बिजली बंद करके अर्थ लीकेज चेक करूंगा...”'
                      : '“I would first check the motor winding resistance and bearing condition, and ensure power is safely isolated...”'}
                  </p>

                  <div className="mt-3 pt-3 border-t border-indigo-900/60 text-[11px] text-slate-300">
                    <span className="text-indigo-300 font-bold">Optional Translation: </span>
                    “I would first check the motor winding and bearing.”
                  </div>
                </div>
              </div>

              {/* Right: Direct AI Evaluation Result */}
              <div className="space-y-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    AI Evaluation (Evaluated on Native Input)
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                    87/100 Confidence
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <div className="flex justify-between font-semibold text-slate-300 mb-1">
                      <span>Technical Knowledge</span>
                      <span className="font-bold text-white">88%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-slate-300 mb-1">
                      <span>Troubleshooting Reasoning</span>
                      <span className="font-bold text-white">82%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '82%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-emerald-400 mb-1">
                      <span>Safety Awareness</span>
                      <span className="font-bold text-white">91%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '91%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold text-slate-300 mb-1">
                      <span>Specificity</span>
                      <span className="font-bold text-white">79%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: '79%' }} />
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>“Language choice did not reduce the assessment result.”</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAIR HIRING & RANKING TRANSPARENCY AUDIT SPOTLIGHT */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                <Scale className="w-3.5 h-3.5 text-amber-600" />
                <span>RANKING TRANSPARENCY & FAIR HIRING</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                See what happens when pedigree bias is removed.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Traditional hiring tools filter out top performers with resume penalties like career gaps or lack of tier-1 college degrees. Our <strong>Ranking Transparency Audit</strong> recalculates pipelines based on verified performance evidence.
              </p>
              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Explainable breakdown (+45 Skills, +25 Exp, +18 Evidence)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Instant #7 → #2 shift for qualified skilled technicians</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Decision support for recruiters — human makes final call</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/recruiter/bias-audit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
                >
                  <span>Experience the Ranking Transparency Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="font-bold text-slate-900 text-sm">Pipeline Fairness Shift</div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Audited Pipeline
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-900">Arjun Kumar</div>
                    <div className="text-xs text-slate-500">Electrical Technician</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-indigo-700">#7 → #2</div>
                    <div className="text-[10px] text-emerald-600 font-bold">Score: 78% → 91%</div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Non-job-relevant signals (employment gap history, college pedigree, resume prestige) stripped. Pure technical troubleshooting and safety evidence prioritized.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER & CTA */}
      <footer className="py-12 bg-white border-t border-slate-200 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-600 text-white font-black flex items-center justify-center text-xs">
              E
            </div>
            <span className="font-bold text-slate-900">EquiPath</span>
            <span>— Skills First. Opportunities for Everyone.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/candidate/dashboard" className="hover:text-slate-900 font-medium">Candidate Demo</Link>
            <Link href="/recruiter/dashboard" className="hover:text-slate-900 font-medium">Recruiter Pipeline</Link>
            <Link href="/recruiter/bias-audit" className="hover:text-indigo-600 font-bold">Bias Audit</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
