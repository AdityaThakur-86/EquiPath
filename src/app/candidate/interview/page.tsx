'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { CandidateSidebar } from '@/components/layout/CandidateSidebar';
import {
  Bot,
  Zap,
  Snowflake,
  Flame,
  Droplets,
  Code,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Volume2,
  Award,
  Globe,
  Filter,
  RefreshCw,
  Clock,
  Layers,
} from 'lucide-react';
import {
  TRADE_INTERVIEW_BLUEPRINTS,
  TradeInterviewBlueprint,
  DynamicInterviewQuestion,
  QuestionCategory,
  QUESTION_CATEGORIES,
  getRandomQuestion,
  getQuestionsForTradeAndCategory,
} from '@/lib/interviewQuestionBank';
import {
  evaluateRealTimeTurn,
  generateInterviewDebrief,
  generateDynamicRealTimeFollowUp,
  RealTimeMetrics,
  InterviewDebriefReport,
  DynamicFollowUpQuestion,
} from '@/lib/interviewEngine';
import { LiveInterviewerFeed } from '@/components/interview/LiveInterviewerFeed';
import { LiveSpeechInput } from '@/components/interview/LiveSpeechInput';
import { RealTimeInterviewMetrics } from '@/components/interview/RealTimeInterviewMetrics';
import { InterviewDebriefModal } from '@/components/interview/InterviewDebriefModal';
import { SUPPORTED_LANGUAGES, Language } from '@/lib/types';

export default function RealTimeAIInterviewPage() {
  const router = useRouter();
  const { candidate, selectedLanguage, setSelectedLanguage, showToast, recordCompletedAssessment } = useApp();

  // Selected trade
  const [selectedTradeId, setSelectedTradeId] = useState<string>('industrial_electrical');
  const currentBlueprint: TradeInterviewBlueprint = useMemo(() => {
    return (
      TRADE_INTERVIEW_BLUEPRINTS.find((t) => t.tradeId === selectedTradeId) ||
      TRADE_INTERVIEW_BLUEPRINTS[0]
    );
  }, [selectedTradeId]);

  // Question category filter
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | 'all'>('all');

  // Session length (3, 5, 8, or 0 for infinite)
  const [totalSessionQuestions, setTotalSessionQuestions] = useState<number>(5);

  const [interviewPhase, setInterviewPhase] = useState<'intro' | 'active' | 'conclusion'>('intro');
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  // Dynamic question management (tracking used questions to avoid repetition)
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<DynamicInterviewQuestion>(
    currentBlueprint.questions[0]
  );
  const [activeFollowUp, setActiveFollowUp] = useState<DynamicFollowUpQuestion | null>(null);

  // Real-time metrics and state
  const [turnScores, setTurnScores] = useState<RealTimeMetrics[]>([]);
  const [latestMetrics, setLatestMetrics] = useState<RealTimeMetrics | null>(null);
  const [interviewerStatus, setInterviewerStatus] = useState<'speaking' | 'listening' | 'analyzing' | 'idle'>('idle');

  // Debrief modal
  const [isDebriefOpen, setIsDebriefOpen] = useState<boolean>(false);
  const [debriefReport, setDebriefReport] = useState<InterviewDebriefReport | null>(null);

  const initNewSession = (tradeId: string, category: QuestionCategory | 'all') => {
    const nextQ = getRandomQuestion(tradeId, [], category);
    const introQ = {
      ...nextQ,
      question: {
        ...nextQ.question,
        en: `Hello, and welcome to your EquiPath skills assessment. I’ll be conducting your interview today. I’ll ask you a series of questions related to the role and your practical experience. Please answer in your own words. Let’s begin. ${nextQ.question.en}`,
        hi: `नमस्ते, और आपके EquiPath कौशल मूल्यांकन में आपका स्वागत है। मैं आज आपका साक्षात्कार करूँगा। मैं आपसे भूमिका और आपके व्यावहारिक अनुभव से संबंधित कई प्रश्न पूछूँगा। कृपया अपने शब्दों में उत्तर दें। चलिए शुरू करते हैं। ${nextQ.question.hi}`,
        pa: `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਅਤੇ ਤੁਹਾਡੇ EquiPath ਹੁਨਰ ਮੁਲਾਂਕਣ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ। ਮੈਂ ਅੱਜ ਤੁਹਾਡੀ ਇੰਟਰਵਿਊ ਲਵਾਂਗਾ। ਮੈਂ ਤੁਹਾਨੂੰ ਭੂਮਿਕਾ ਅਤੇ ਤੁਹਾਡੇ ਵਿਹਾਰਕ ਅਨੁਭਵ ਨਾਲ ਸਬੰਧਤ ਸਵਾਲ ਪੁੱਛਾਂਗਾ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਸ਼ਬਦਾਂ ਵਿੱਚ ਜਵਾਬ ਦਿਓ। ਆਓ ਸ਼ੁਰੂ ਕਰੀਏ। ${nextQ.question.pa}`
      }
    };
    setCurrentQuestion(introQ);
    setUsedQuestionIds([nextQ.id]);
    setActiveFollowUp(null);
    setTurnScores([]);
    setLatestMetrics(null);
    setInterviewerStatus('speaking');
    setInterviewPhase('intro');
  };

  // On mount or trade change, initialize question
  useEffect(() => {
    setIsClientLoaded(true);
    const savedStr = sessionStorage.getItem('equiPathInterviewState');
    if (savedStr) {
      try {
        const saved = JSON.parse(savedStr);
        if (saved.selectedTradeId === selectedTradeId) {
          setSelectedCategory(saved.selectedCategory || 'all');
          setUsedQuestionIds(saved.usedQuestionIds || []);
          setCurrentQuestion(saved.currentQuestion);
          setActiveFollowUp(saved.activeFollowUp);
          setTurnScores(saved.turnScores || []);
          setLatestMetrics(saved.latestMetrics);
          setInterviewPhase(saved.interviewPhase || 'active');
          setInterviewerStatus('idle'); // Wait for candidate action
          return;
        }
      } catch (e) {}
    }
    initNewSession(selectedTradeId, selectedCategory);
  }, [selectedTradeId]);

  // Persist state on change
  useEffect(() => {
    if (isClientLoaded && usedQuestionIds.length > 0) {
      sessionStorage.setItem('equiPathInterviewState', JSON.stringify({
        selectedTradeId,
        selectedCategory,
        usedQuestionIds,
        currentQuestion,
        activeFollowUp,
        turnScores,
        latestMetrics,
        interviewPhase
      }));
    }
  }, [selectedTradeId, selectedCategory, usedQuestionIds, currentQuestion, activeFollowUp, turnScores, latestMetrics, interviewPhase, isClientLoaded]);

  // Switch to a completely different non-repeating question
  const handleNextQuestion = () => {
    const nextQ = getRandomQuestion(selectedTradeId, usedQuestionIds, selectedCategory);
    setCurrentQuestion(nextQ);
    setUsedQuestionIds((prev) => [...prev, nextQ.id]);
    setActiveFollowUp(null);
    setInterviewerStatus('speaking');
    showToast('New Scenario Loaded', `Loaded: ${nextQ.stageName} (${nextQ.categoryLabel})`, 'info');
  };

  // Switch Trade
  const handleSelectTrade = (tradeId: string) => {
    setSelectedTradeId(tradeId);
    setSelectedCategory('all');
    initNewSession(tradeId, 'all');
    setIsDebriefOpen(false);
    showToast('Trade Changed', `Loaded ${TRADE_INTERVIEW_BLUEPRINTS.find((t) => t.tradeId === tradeId)?.tradeName}`, 'info');
  };

  // Handle Dynamic Contextual Follow-up trigger
  const handleRequestFollowUp = (currentAnswerText: string) => {
    setInterviewerStatus('analyzing');
    showToast('AI Analyzing Speech', 'Generating adaptive follow-up tailored to your words...', 'info');

    setTimeout(() => {
      const followUp = generateDynamicRealTimeFollowUp(currentQuestion, currentAnswerText, selectedLanguage);
      setActiveFollowUp(followUp);
      setInterviewerStatus('speaking');
    }, 1200);
  };

  const finalizeInterview = (scoresToUse: RealTimeMetrics[], durationSeconds: number) => {
    const report = generateInterviewDebrief(
      currentBlueprint,
      scoresToUse,
      candidate.name,
      selectedLanguage,
      durationSeconds * scoresToUse.length + 180
    );
    setDebriefReport(report);
    setInterviewPhase('conclusion');
    
    // Set a mock conclusion question for the AI to speak
    setCurrentQuestion({
      ...currentQuestion,
      question: {
        en: 'Thank you for completing the EquiPath skills assessment. Your evaluation is now complete.',
        hi: 'EquiPath कौशल मूल्यांकन पूरा करने के लिए धन्यवाद। आपका मूल्यांकन अब पूरा हो गया है।',
        pa: 'EquiPath ਹੁਨਰ ਮੁਲਾਂਕਣ ਪੂਰਾ ਕਰਨ ਲਈ ਤੁਹਾਡਾ ਧੰਨਵਾਦ। ਤੁਹਾਡਾ ਮੁਲਾਂਕਣ ਹੁਣ ਪੂਰਾ ਹੋ ਗਿਆ ਹੈ।'
      }
    });
    setInterviewerStatus('speaking');
    
    showToast(
      'Interview Certified!',
      `Achieved ${report.overallScore}/100 in ${currentBlueprint.tradeName}`,
      'success'
    );
  };

  // Submit answer
  const handleSubmitAnswer = (answerText: string, isVoice: boolean, durationSeconds: number) => {
    if (interviewPhase === 'intro') {
       setInterviewPhase('active');
    }
    setInterviewerStatus('analyzing');

    setTimeout(() => {
      const evaluation = evaluateRealTimeTurn(
        currentQuestion,
        answerText,
        selectedLanguage,
        isVoice,
        durationSeconds
      );
      setLatestMetrics(evaluation);
      const updatedScores = [...turnScores, evaluation];
      setTurnScores(updatedScores);

      // Check if session goal reached
      const isFinished = totalSessionQuestions > 0 && updatedScores.length >= totalSessionQuestions;

      if (isFinished) {
        finalizeInterview(updatedScores, durationSeconds);
      } else {
        // Load next dynamic question
        const nextQ = getRandomQuestion(selectedTradeId, usedQuestionIds, selectedCategory);
        setCurrentQuestion(nextQ);
        setUsedQuestionIds((prev) => [...prev, nextQ.id]);
        setActiveFollowUp(null);
        setInterviewerStatus('speaking');
        showToast(
          `Question ${updatedScores.length} Evaluated`,
          `Score: ${evaluation.overallTurnScore}% (${evaluation.wordCount} words). Next question ready!`,
          'success'
        );
      }
    }, 1200);
  };

  // Reset interview
  const handleRestartInterview = () => {
    initNewSession(selectedTradeId, selectedCategory);
    setIsDebriefOpen(false);
    showToast('Interview Reset', 'Fresh randomized session started.', 'info');
  };

  const handleEndInterviewEarly = () => {
    if (window.confirm("Are you sure you want to end the interview early? Your current progress will be evaluated as is.")) {
      if (turnScores.length > 0) {
        finalizeInterview(turnScores, 60);
      } else {
        handleRestartInterview(); // Nothing to evaluate, just reset
      }
    }
  };

  // Save to Profile
  const handleSaveToProfile = () => {
    if (!debriefReport) return;

    recordCompletedAssessment({
      id: debriefReport.sessionId,
      questionId: `interview-${currentBlueprint.tradeId}`,
      questionText: `Multi-Category Live Trade Interview: ${currentBlueprint.tradeName}`,
      answerText: `Completed ${debriefReport.questionsCompleted} dynamic questions with ${debriefReport.dimensions.safetyAwareness}% safety awareness. Total words spoken: ${debriefReport.totalWordsSpoken}.`,
      isVoice: true,
      audioDurationSeconds: debriefReport.totalDurationSeconds,
      transcript: debriefReport.executiveSummary,
      language: selectedLanguage,
      scores: {
        technicalScore: debriefReport.dimensions.technicalKnowledge,
        keyPointScore: Math.round(debriefReport.dimensions.technicalKnowledge * 0.6),
        reasoningScore: debriefReport.dimensions.problemSolving,
        safetyScore: debriefReport.dimensions.safetyAwareness,
        specificityScore: debriefReport.dimensions.practicalReasoning,
        overallScore: debriefReport.overallScore,
      },
      assessmentConfidence: debriefReport.overallScore,
      strengths: debriefReport.strengths,
      weaknesses: debriefReport.growthOpportunities,
      feedback: debriefReport.executiveSummary,
      nextDifficulty: 'Advanced',
      safetyPointsAddressed: debriefReport.safetyCommendations,
      expectedConceptsMet: debriefReport.verifiedSkillsUnlocked,
      evaluatedAt: debriefReport.completedAt,
    });

    showToast('Verified Profile Updated', `Added ${currentBlueprint.tradeName} Level III to your official verified skills profile!`, 'success');
    setIsDebriefOpen(false);
  };

  const getTradeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-4 h-4" />;
      case 'Snowflake':
        return <Snowflake className="w-4 h-4" />;
      case 'Flame':
        return <Flame className="w-4 h-4" />;
      case 'Droplets':
        return <Droplets className="w-4 h-4" />;
      case 'Code':
        return <Code className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-slate-50 min-h-screen">
      <CandidateSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Page Header with Real-Time Badge & Language Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-black mb-2 shadow-2xs">
              <Bot className="w-3.5 h-3.5" /> Real-Time Live AI Trade Interview
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Real-Time Interactive AI Trade Interview
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Speak 1–2 minutes with continuous voice recognition, dynamic real-time follow-ups, and non-repeating trade questions.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Session Length Selector */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-2xl shadow-xs text-xs font-bold text-slate-700">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Questions:</span>
              <select
                value={totalSessionQuestions}
                onChange={(e) => setTotalSessionQuestions(Number(e.target.value))}
                className="bg-transparent font-black text-indigo-700 outline-none cursor-pointer"
              >
                <option value={3}>3 (Quick)</option>
                <option value={5}>5 (Standard)</option>
                <option value={8}>8 (Comprehensive)</option>
                <option value={0}>♾ Infinite Practice</option>
              </select>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-2xl shadow-xs">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-2" />
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedLanguage === lang.code
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {lang.nativeLabel}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleEndInterviewEarly}
                className="px-3.5 py-2 rounded-xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold shadow-2xs transition-colors"
              >
                End Early
              </button>

              <button
                onClick={handleRestartInterview}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Trade Domain Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {TRADE_INTERVIEW_BLUEPRINTS.map((trade) => {
            const isSelected = trade.tradeId === selectedTradeId;
            return (
              <button
                key={trade.tradeId}
                onClick={() => handleSelectTrade(trade.tradeId)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shadow-2xs ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-indigo-200'
                    : 'bg-white text-slate-700 hover:bg-slate-100/80 border border-slate-200/80'
                }`}
              >
                <span className={isSelected ? 'text-white' : 'text-indigo-600'}>
                  {getTradeIcon(trade.tradeIcon)}
                </span>
                <span>{trade.tradeName}</span>
              </button>
            );
          })}
        </div>

        {/* Question Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Filter Types:
          </span>
          {QUESTION_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Interview Room Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Live Interviewer & Candidate Feeds + Speech Input (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Video & Audio Feed HUD */}
            <LiveInterviewerFeed
              interviewerName={currentBlueprint.interviewerName}
              interviewerTitle={currentBlueprint.interviewerTitle}
              interviewerAvatar={currentBlueprint.interviewerAvatar}
              currentQuestion={currentQuestion}
              activeFollowUp={activeFollowUp}
              language={selectedLanguage}
              interviewerStatus={interviewerStatus}
              onInterviewerSpeechEnd={() => {
                if (interviewPhase === 'conclusion') {
                  setInterviewerStatus('idle');
                  setIsDebriefOpen(true);
                  sessionStorage.removeItem('equiPathInterviewState');
                } else {
                  setInterviewerStatus('listening');
                }
              }}
              onNextQuestion={handleNextQuestion}
              questionNumber={turnScores.length + 1}
              totalQuestions={totalSessionQuestions}
              candidateName={candidate.name}
              candidateAvatar={candidate.avatarUrl}
            />

            {/* Live Speech Recognition & Pressure Timer Input Bar */}
            <LiveSpeechInput
              currentQuestion={currentQuestion}
              language={selectedLanguage}
              onSubmitAnswer={handleSubmitAnswer}
              onRequestFollowUp={handleRequestFollowUp}
              disabled={interviewerStatus === 'analyzing'}
              defaultTimeLimitSeconds={120} // 2 Full Minutes
            />
          </div>

          {/* Right Column: Real-Time Assessment HUD & Telemetry (1 col) */}
          <div className="space-y-6">
            {/* Real-time Telemetry & Keyword Detection */}
            <RealTimeInterviewMetrics
              metrics={latestMetrics}
              currentQuestion={currentQuestion}
              completedCount={turnScores.length}
              totalQuestions={totalSessionQuestions > 0 ? totalSessionQuestions : turnScores.length + 1}
            />

            {/* Dynamic Question Pool Overview Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
                    <Layers className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-xs font-black text-white">
                      Dynamic Non-Repeating Engine
                    </h4>
                    <p className="text-[10px] text-indigo-300">
                      Real-time adaptive branching
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-1"
                  title="Load another randomized scenario"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Cycle</span>
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                The AI Technical Lead dynamically branches questions based on your specific speech responses. You can speak for 1–2 full minutes per question with live continuous transcription.
              </p>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Interviewer:</span>
                <span className="font-bold text-indigo-200">{currentBlueprint.interviewerName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comprehensive Post-Interview Debrief Modal */}
        <InterviewDebriefModal
          report={debriefReport}
          isOpen={isDebriefOpen}
          onClose={() => setIsDebriefOpen(false)}
          onSaveToProfile={handleSaveToProfile}
          onRestartInterview={handleRestartInterview}
          onViewJobs={() => {
            setIsDebriefOpen(false);
            router.push('/candidate/jobs');
          }}
        />
      </main>
    </div>
  );
}
