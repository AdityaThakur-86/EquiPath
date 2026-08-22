'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { CandidateSidebar } from '@/components/layout/CandidateSidebar';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  Star,
  Globe,
  Share2,
  Download,
  MapPin,
  Briefcase,
  Phone,
  Mail,
  Sparkles,
  Volume2,
  Eye,
} from 'lucide-react';
import { VoiceAudioPlayer } from '@/components/shared/VoiceAudioPlayer';
import { ConfidenceBadge } from '@/components/shared/ConfidenceBadge';

export default function CandidateProfilePage() {
  const { candidate, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    setCopied(true);
    showToast('Profile Link Copied', 'Public verified evidence link copied to clipboard.', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-slate-50 min-h-screen">
      <CandidateSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-5xl space-y-8">
        {/* Header Hero Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-5">
              <img
                src={candidate.avatarUrl || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80'}
                alt={candidate.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-indigo-50 shadow-md"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{candidate.name}</h1>
                  <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Scenario Verified</span>
                  </span>
                </div>
                <p className="text-sm font-bold text-indigo-700">{candidate.headline}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {candidate.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    {candidate.experienceYears} Years Practical Experience
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    Punjabi, Hindi, English
                  </span>
                </div>
              </div>
            </div>

            {/* Overall Confidence Badge */}
            <div className="flex-shrink-0 text-left sm:text-right">
              <ConfidenceBadge score={candidate.overallConfidence} size="lg" />
            </div>
          </div>

          {/* Badges & Share Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {candidate.badges.map((b, i) => (
                <span key={i} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
                  {b}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share Portfolio'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Verified Skills Grid */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-black text-slate-900">Demonstrated Verified Skills</h3>
              <p className="text-xs text-slate-500">Skills evaluated via dynamic scenario questions with zero resume bias.</p>
            </div>
            <Link href="/candidate/verify" className="text-xs font-bold text-indigo-600 hover:underline">
              Take Another Assessment →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {candidate.skills.map((skill, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-2">
                  <span>{skill.name}</span>
                  <span className="font-mono text-indigo-600">{skill.confidenceScore}% Confidence</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${skill.confidenceScore}%` }} />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{skill.evidenceSummary}</p>
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                  <span>{skill.assessmentsCount} scenarios verified</span>
                  <span className="text-emerald-600 font-bold">Safety: {skill.breakdown.safety}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audio Evidence Spotlight */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-black text-slate-900">Audio Response Evidence</h3>
              <p className="text-xs text-slate-500">Recruiters can listen directly to Arjun&apos;s native technical explanations.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
              Punjabi Spoken (ਪੰਜਾਬੀ)
            </span>
          </div>

          <VoiceAudioPlayer
            transcript="ਮੈਂ ਪਹਿਲਾਂ motor ਦੀ winding resistance ਅਤੇ bearing check ਕਰਾਂਗਾ, ਅਤੇ ਇਹ ਦੇਖਾਂਗਾ ਕਿ cooling fan ਜਾਮ ਤਾਂ ਨਹੀਂ ਹੋਇਆ। ਨਾਲ ਹੀ power isolate ਕਰਕੇ multi-meter ਨਾਲ earth leakage ਚੈੱਕ ਕਰਾਂਗਾ।"
            translatedTranscript="I would first check the motor winding resistance and bearing condition, and ensure the cooling fan is not jammed. Also isolate power and check for earth leakage with a multimeter."
            language="pa"
            durationSeconds={8}
            candidateName="Arjun Kumar"
            title="Practical Scenario: Motor Overheating Diagnosis"
          />
        </div>

        {/* Peer References Section */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-black text-slate-900">Verified Peer References</h3>
              <p className="text-xs text-slate-500">Endorsements from senior workshop leads and site supervisors.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              ✓ 2 References Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {candidate.references.map((ref) => (
              <div key={ref.id} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{ref.name}</h4>
                      <p className="text-xs text-slate-500">{ref.role} • {ref.company}</p>
                    </div>
                    <div className="flex items-center text-amber-500 text-xs">
                      ★★★★★
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 italic leading-relaxed mt-3">
                    &ldquo;{ref.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{ref.relationship}</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Reference
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
