'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { CandidateSidebar } from '@/components/layout/CandidateSidebar';
import { DynamicQuestionCard } from '@/components/assessment/DynamicQuestionCard';
import { ImageScenarioCard } from '@/components/assessment/ImageScenarioCard';
import { VoiceRecorder } from '@/components/assessment/VoiceRecorder';
import { EvaluationView } from '@/components/assessment/EvaluationView';
import { AdaptiveTrajectory } from '@/components/assessment/AdaptiveTrajectory';
import { generateScenarioQuestion, generateFollowUpQuestion } from '@/lib/questionEngine';
import { evaluateAssessment } from '@/lib/evaluationEngine';
import { DifficultyLevel, EvaluationResult, Language, ScenarioQuestion } from '@/lib/types';
import { Sparkles, CheckCircle2, RefreshCw, Send, ArrowRight, Activity, Globe } from 'lucide-react';

export default function VerifySkillsPage() {
  const {
    currentAssessmentSkill,
    selectedLanguage,
    setSelectedLanguage,
    recordCompletedAssessment,
    showToast,
  } = useApp();
  const router = useRouter();

  const [currentDifficulty, setCurrentDifficulty] = useState<DifficultyLevel>('Intermediate');
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<ScenarioQuestion | null>(null);
  const [answerMode, setAnswerMode] = useState<'voice' | 'text' | null>('voice');
  const [textAnswer, setTextAnswer] = useState<string>('');
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [questionCount, setQuestionCount] = useState<number>(1);

  // Generate initial question on mount or skill change
  useEffect(() => {
    const q = generateScenarioQuestion(
      currentAssessmentSkill || 'Electrical Troubleshooting',
      undefined,
      currentDifficulty,
      undefined,
      selectedLanguage,
      usedQuestionIds
    );
    setCurrentQuestion(q);
    setUsedQuestionIds((prev) => [...prev, q.id]);
  }, [currentAssessmentSkill, selectedLanguage]);

  const handleGenerateNewRandomQuestion = () => {
    const q = generateScenarioQuestion(
      currentAssessmentSkill || 'Electrical Troubleshooting',
      undefined,
      currentDifficulty,
      undefined,
      selectedLanguage,
      usedQuestionIds
    );
    setCurrentQuestion(q);
    setUsedQuestionIds((prev) => [...prev, q.id]);
    setEvaluationResult(null);
    setAnswerMode('voice');
    showToast('New Scenario Generated', `Synthesized ${q.difficulty} level ${q.questionType} question.`, 'info');
  };

  const handleVoiceAnswerSubmit = (voiceData: { transcript: string; durationSeconds: number; language: Language }) => {
    if (!currentQuestion) return;

    setIsEvaluating(true);
    setTimeout(() => {
      const evalResult = evaluateAssessment({
        question: currentQuestion,
        answerText: voiceData.transcript,
        language: voiceData.language,
        isVoice: true,
        audioDurationSeconds: voiceData.durationSeconds,
        transcript: voiceData.transcript,
      });

      setEvaluationResult(evalResult);
      setCurrentDifficulty(evalResult.nextDifficulty);
      recordCompletedAssessment(evalResult);
      setIsEvaluating(false);
    }, 900);
  };

  const handleTextAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuestion || !textAnswer.trim()) return;

    setIsEvaluating(true);
    setTimeout(() => {
      const evalResult = evaluateAssessment({
        question: currentQuestion,
        answerText: textAnswer,
        language: selectedLanguage,
        isVoice: false,
        transcript: textAnswer,
      });

      setEvaluationResult(evalResult);
      setCurrentDifficulty(evalResult.nextDifficulty);
      recordCompletedAssessment(evalResult);
      setIsEvaluating(false);
    }, 900);
  };

  const handleNextFollowUpQuestion = () => {
    if (!currentQuestion || !evaluationResult) return;

    const followUp = generateFollowUpQuestion(
      currentAssessmentSkill || 'Electrical Troubleshooting',
      currentQuestion,
      evaluationResult.transcript || evaluationResult.answerText,
      evaluationResult.nextDifficulty,
      selectedLanguage
    );

    setCurrentQuestion(followUp);
    setUsedQuestionIds((prev) => [...prev, followUp.id]);
    setEvaluationResult(null);
    setTextAnswer('');
    setAnswerMode('voice');
    setQuestionCount((prev) => prev + 1);
    showToast('Adaptive Follow-up Generated', 'AI escalated depth based on high performance.', 'info');
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-slate-50 min-h-screen">
      <CandidateSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
              <Activity className="w-3.5 h-3.5 text-indigo-600" />
              <span>DYNAMIC ADAPTIVE ASSESSMENT</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span>Skill Focus:</span>
              <span className="font-bold text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-200">
                {currentAssessmentSkill}
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Prove what you can do.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Answer dynamic practical scenarios using voice or text. Questions adapt to your performance without resume bias.
          </p>
        </div>

        {/* Adaptive Trajectory Visual Progress Bar */}
        <div className="mb-6">
          <AdaptiveTrajectory activeStepNumber={questionCount} />
        </div>

        {/* Main Scenario Workspace */}
        {currentQuestion && (
          <div className="space-y-6">
            {/* Visual Inspection Image Card (if image-based question) */}
            {currentQuestion.imageUrl && (
              <ImageScenarioCard question={currentQuestion} />
            )}

            {/* Dynamic Question Card */}
            {!evaluationResult && (
              <DynamicQuestionCard
                question={currentQuestion}
                selectedLanguage={selectedLanguage}
                onLanguageChange={(lang) => setSelectedLanguage(lang)}
                onGenerateNewQuestion={handleGenerateNewRandomQuestion}
                onSelectAnswerMode={(mode) => setAnswerMode(mode)}
                activeAnswerMode={answerMode}
              />
            )}

            {/* Evaluating Spinner */}
            {isEvaluating && (
              <div className="p-12 rounded-3xl border border-indigo-100 bg-white shadow-xl text-center space-y-4 animate-pulse">
                <div className="w-16 h-16 rounded-full bg-indigo-600/10 border-4 border-indigo-600 border-t-transparent animate-spin mx-auto" />
                <h3 className="text-lg font-black text-slate-900">
                  Analyzing Your Response...
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Evaluating technical knowledge, troubleshooting logic, and safety isolation protocols in native{' '}
                  <span className="font-bold text-indigo-600">
                    {selectedLanguage === 'pa' ? 'Punjabi' : selectedLanguage === 'hi' ? 'Hindi' : 'English'}
                  </span>.
                </p>
              </div>
            )}

            {/* Answer Input: Voice Mode */}
            {!evaluationResult && !isEvaluating && answerMode === 'voice' && (
              <VoiceRecorder
                language={selectedLanguage}
                question={currentQuestion}
                onSubmit={handleVoiceAnswerSubmit}
                onCancel={() => setAnswerMode('text')}
              />
            )}

            {/* Answer Input: Text Mode Fallback */}
            {!evaluationResult && !isEvaluating && answerMode === 'text' && (
              <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-sm font-bold text-slate-900">Text Answer Submission</h4>
                  <button
                    onClick={() => setAnswerMode('voice')}
                    className="text-xs text-indigo-600 font-bold hover:underline"
                  >
                    Switch to Voice Recording 🎙
                  </button>
                </div>

                <form onSubmit={handleTextAnswerSubmit} className="space-y-4">
                  <textarea
                    value={textAnswer}
                    onChange={(e) => setTextAnswer(e.target.value)}
                    rows={4}
                    placeholder="Explain what you would check and why... Include any safety steps."
                    className="w-full p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-900"
                    required
                  />

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md active:scale-95 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Answer</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Evaluation Result View */}
            {evaluationResult && !isEvaluating && (
              <EvaluationView
                result={evaluationResult}
                onNextQuestion={handleNextFollowUpQuestion}
                onViewProfile={() => router.push('/candidate/profile')}
                onViewJobs={() => router.push('/candidate/jobs')}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
