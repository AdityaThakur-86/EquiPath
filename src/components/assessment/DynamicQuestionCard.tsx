'use client';

import React, { useState } from 'react';
import { Sparkles, RefreshCw, Globe, ShieldAlert, Cpu, HelpCircle, Layers } from 'lucide-react';
import { Language, ScenarioQuestion, SUPPORTED_LANGUAGES } from '@/lib/types';

interface DynamicQuestionCardProps {
  question: ScenarioQuestion;
  selectedLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onGenerateNewQuestion: () => void;
  onSelectAnswerMode: (mode: 'voice' | 'text') => void;
  activeAnswerMode: 'voice' | 'text' | null;
}

export const DynamicQuestionCard: React.FC<DynamicQuestionCardProps> = ({
  question,
  selectedLanguage,
  onLanguageChange,
  onGenerateNewQuestion,
  onSelectAnswerMode,
  activeAnswerMode,
}) => {
  const [showEnTranslation, setShowEnTranslation] = useState(false);

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Intermediate':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Advanced':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const currentQuestionText =
    showEnTranslation && question.questionText.en
      ? question.questionText.en
      : question.questionText[selectedLanguage] || question.questionText.en;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all">
      {/* Top Banner: Dynamic Scenario Meta */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>{question.skill}</span>
          </div>

          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold ${getDifficultyBadge(question.difficulty)}`}>
            <Layers className="w-3 h-3" />
            <span>{question.difficulty}</span>
          </div>

          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium">
            <span>{question.questionType}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onGenerateNewQuestion}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 hover:border-slate-600 transition-all active:scale-95"
            title="Randomize scenario topic, difficulty, and type"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generate New Question</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-6 sm:p-7">
        {/* Language Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assessment Language:</span>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setShowEnTranslation(false);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedLanguage === lang.code
                      ? 'bg-white text-indigo-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang.nativeLabel}
                </button>
              ))}
            </div>
          </div>

          {selectedLanguage !== 'en' && (
            <button
              onClick={() => setShowEnTranslation(!showEnTranslation)}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold underline underline-offset-4"
            >
              {showEnTranslation ? 'Show Original Language' : 'Toggle English Translation'}
            </button>
          )}
        </div>

        {/* Topic & Context */}
        {question.contextScenario && (
          <div className="mb-4 inline-block px-3 py-1 rounded-lg bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 font-medium">
            <span className="font-bold">Context:</span> {question.contextScenario}
          </div>
        )}

        {/* Dynamic Scenario Question Text */}
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Practical Scenario Question
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            &ldquo;{currentQuestionText}&rdquo;
          </h3>
        </div>

        {/* Safety Note Card */}
        <div className="mb-7 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Evaluation Safety Policy:</span> Your answer will be evaluated on physical safety procedures (isolation, lockouts, zero-voltage checks) as well as troubleshooting logic.
          </div>
        </div>

        {/* Action Buttons: Voice vs Text */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onSelectAnswerMode('voice')}
            className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 ${
              activeAnswerMode === 'voice'
                ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
            }`}
          >
            <span className="text-base">🎙</span>
            <span>Answer by Voice (Recommended)</span>
          </button>

          <button
            onClick={() => onSelectAnswerMode('text')}
            className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 ${
              activeAnswerMode === 'text'
                ? 'bg-slate-900 text-white ring-4 ring-slate-200'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span className="text-base">✍</span>
            <span>Answer by Text</span>
          </button>
        </div>
      </div>
    </div>
  );
};
