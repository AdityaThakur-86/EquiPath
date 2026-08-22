'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { CandidateSidebar } from '@/components/layout/CandidateSidebar';
import {
  Zap,
  Wrench,
  Droplets,
  Flame,
  Calculator,
  Wind,
  Tv,
  Hammer,
  Plus,
  ArrowRight,
  ShieldCheck,
  Globe,
  Sparkles,
  CheckCircle2,
  FileX2,
} from 'lucide-react';
import { Language, SUPPORTED_LANGUAGES } from '@/lib/types';

interface TradeSkillOption {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  description: string;
  popularTopics: string[];
}

const TRADE_OPTIONS: TradeSkillOption[] = [
  {
    id: 'elec-01',
    name: 'Electrical Troubleshooting',
    category: 'Electrical',
    icon: Zap,
    description: '3-phase motors, circuit breakers, earthing, voltage testing & wiring.',
    popularTopics: ['Motor Faults', 'Capacitors', 'Circuit Breakers', 'Earthing'],
  },
  {
    id: 'elec-02',
    name: 'Electrical Wiring & Panels',
    category: 'Electrical',
    icon: Zap,
    description: 'Industrial distribution boards, conduit bending, contactors & relays.',
    popularTopics: ['Panel Wiring', 'Neutral Faults', 'Load Balancing'],
  },
  {
    id: 'mech-01',
    name: 'Mechanical & Machinery Repair',
    category: 'Mechanical',
    icon: Wrench,
    description: 'Hydraulic pumps, bearing replacement, gearboxes & belt alignments.',
    popularTopics: ['Hydraulic Press', 'Bearing Puller', 'Shaft Alignment'],
  },
  {
    id: 'plumb-01',
    name: 'Commercial Plumbing',
    category: 'Plumbing',
    icon: Droplets,
    description: 'Booster pumps, pressure relief valves, pipe fitting & drainage sumps.',
    popularTopics: ['Backflow Preventer', 'Pump Seals', 'Pressure Drops'],
  },
  {
    id: 'weld-01',
    name: 'Industrial Welding & Fabrication',
    category: 'Welding',
    icon: Flame,
    description: 'TIG/MIG pipe welding, arc welding, blueprint reading & pressure joints.',
    popularTopics: ['TIG Inverter', 'Joint Prep', 'Pressure Leak Checks'],
  },
  {
    id: 'hvac-01',
    name: 'HVAC & Refrigeration Maintenance',
    category: 'HVAC',
    icon: Wind,
    description: 'Chillers, VRF systems, compressor contactors & refrigerant recovery.',
    popularTopics: ['Compressor Cycling', 'Refrigerant Leaks', 'Duct Blowers'],
  },
  {
    id: 'app-01',
    name: 'Appliance Repair & Electronics',
    category: 'Appliance',
    icon: Tv,
    description: 'Domestic inverters, microwave relays, PCB fuses & washing motors.',
    popularTopics: ['Inverter PCB', 'Thermal Fuse', 'Motor Capacitors'],
  },
  {
    id: 'const-01',
    name: 'Construction & Civil Trades',
    category: 'Construction',
    icon: Hammer,
    description: 'Masonry alignment, shuttering, concrete reinforcement & safety rigging.',
    popularTopics: ['Formwork Safety', 'Scaffolding LOTO', 'Leveling'],
  },
  {
    id: 'book-01',
    name: 'Practical Bookkeeping & Inventory',
    category: 'Finance',
    icon: Calculator,
    description: 'Daybook reconciliation, GST invoicing, cash ledger & stock counting.',
    popularTopics: ['GST Invoices', 'Bank Reconciliations', 'Stock Audits'],
  },
];

export default function SkillClaimPage() {
  const {
    setCurrentAssessmentSkill,
    setSelectedLanguage,
    selectedLanguage,
    claimNewSkill,
    currentAssessmentSkill,
  } = useApp();
  const router = useRouter();

  const [selectedSkill, setSelectedSkill] = useState<string>(currentAssessmentSkill || 'Electrical Troubleshooting');
  const [experienceYears, setExperienceYears] = useState<number>(3);
  const [customSkillName, setCustomSkillName] = useState<string>('');
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);

  const handleStartVerification = () => {
    setCurrentAssessmentSkill(selectedSkill);
    claimNewSkill(selectedSkill, experienceYears);
    router.push('/candidate/verify');
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSkillName.trim()) {
      setSelectedSkill(customSkillName.trim());
      claimNewSkill(customSkillName.trim(), experienceYears);
      setCustomSkillName('');
      setShowCustomModal(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-slate-50 min-h-screen">
      <CandidateSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-5xl">
        {/* Top Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>NO RESUME REQUIRED</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            What can you do?
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
            Select the technical and practical skills you have worked with. You will prove your ability by answering real-world scenario questions in voice or text.
          </p>
        </div>

        {/* Step 1: Select Trade Skill */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              1. Choose Trade / Technical Skill
            </h2>
            <button
              onClick={() => setShowCustomModal(true)}
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Skill</span>
            </button>
          </div>

          {/* Trade Skill Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRADE_OPTIONS.map((trade) => {
              const Icon = trade.icon;
              const isSelected = selectedSkill === trade.name;

              return (
                <div
                  key={trade.id}
                  onClick={() => setSelectedSkill(trade.name)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-200'
                      : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-xs'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mb-1">{trade.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{trade.description}</p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1">
                    {trade.popularTopics.slice(0, 3).map((topic, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-600 font-medium">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step 2: Experience & Language Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Practical Experience */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                2. Hands-on Experience
              </h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-slate-900">{experienceYears} Years</span>
                <span className="text-xs text-slate-500 font-medium">Field / Workshop Work</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={experienceYears}
                onChange={(e) => setExperienceYears(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2">
                <span>Beginner (0-1 yr)</span>
                <span>3 Years</span>
                <span>5+ Years Master</span>
              </div>
            </div>

            {/* Assessment Language */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  3. Assessment Language
                </h3>
                <Globe className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Choose the language you are most fluent in for voice or text scenarios:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      selectedLanguage === lang.code
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>{lang.nativeLabel}</div>
                    <div className="text-[10px] opacity-75">{lang.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Summary Card & Start Verification CTA */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Ready to Verify:</div>
              <div className="text-xl font-black">{selectedSkill}</div>
              <div className="text-xs text-slate-300">
                {experienceYears} years experience • Assessment in{' '}
                <span className="text-indigo-300 font-bold">
                  {selectedLanguage === 'pa' ? 'ਪੰਜਾਬੀ (Punjabi)' : selectedLanguage === 'hi' ? 'हिंदी (Hindi)' : 'English'}
                </span>
              </div>
            </div>

            <button
              onClick={handleStartVerification}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 active:scale-95 flex-shrink-0"
            >
              <span>Start Verification</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Custom Skill Modal */}
        {showCustomModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200">
              <h3 className="text-lg font-black text-slate-900 mb-1">Add Custom Trade Skill</h3>
              <p className="text-xs text-slate-500 mb-4">
                Enter any practical trade or equipment skill you specialize in.
              </p>

              <form onSubmit={handleAddCustomSkill} className="space-y-4">
                <input
                  type="text"
                  value={customSkillName}
                  onChange={(e) => setCustomSkillName(e.target.value)}
                  placeholder="e.g. CNC Machine Operation, Solar Inverter Setup..."
                  className="w-full p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-900"
                  autoFocus
                />

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCustomModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-sm"
                  >
                    Add & Select
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
