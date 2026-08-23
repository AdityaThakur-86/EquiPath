'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Sparkles,
  Shield,
  User,
  Bot,
  Radio,
  CheckCircle2,
  RefreshCw,
  Tag,
} from 'lucide-react';
import { Language } from '@/lib/types';
import { DynamicInterviewQuestion } from '@/lib/interviewQuestionBank';
import { DynamicFollowUpQuestion } from '@/lib/interviewEngine';
import { speakTextWebSpeech } from '@/lib/voiceSimulator';

interface LiveInterviewerFeedProps {
  interviewerName: string;
  interviewerTitle: string;
  interviewerAvatar: string;
  currentQuestion: DynamicInterviewQuestion;
  activeFollowUp?: DynamicFollowUpQuestion | null;
  language: Language;
  interviewerStatus: 'speaking' | 'listening' | 'analyzing' | 'idle';
  onInterviewerSpeechEnd?: () => void;
  onNextQuestion?: () => void;
  questionNumber?: number;
  totalQuestions?: number;
  candidateName?: string;
  candidateAvatar?: string;
}

export const LiveInterviewerFeed: React.FC<LiveInterviewerFeedProps> = ({
  interviewerName,
  interviewerTitle,
  interviewerAvatar,
  currentQuestion,
  activeFollowUp,
  language,
  interviewerStatus,
  onInterviewerSpeechEnd,
  onNextQuestion,
  questionNumber = 1,
  totalQuestions = 5,
  candidateName = 'Arjun Kumar',
  candidateAvatar = 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
}) => {
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isCandidateMicActive, setIsCandidateMicActive] = useState(true);
  const [showEnglishTranslation, setShowEnglishTranslation] = useState(language !== 'en');
  const [speechProgress, setSpeechProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // If there is an active dynamic follow-up, display its question
  const isFollowUpActive = !!activeFollowUp;
  const questionText = isFollowUpActive
    ? activeFollowUp.nativeQuestionText
    : currentQuestion.question[language] || currentQuestion.question.en;
  
  const englishText = isFollowUpActive
    ? activeFollowUp.questionText
    : currentQuestion.question.en;

  const stageLabel = isFollowUpActive ? activeFollowUp.stageName : currentQuestion.stageName;
  const subtitleLabel = isFollowUpActive ? activeFollowUp.stageSubtitle : currentQuestion.stageSubtitle;

  // Speak question when question/follow-up changes or speech triggered (using clear English speech synthesis to prevent language mixing errors)
  useEffect(() => {
    if (interviewerStatus === 'speaking' && !isAudioMuted) {
      speakTextWebSpeech(englishText, 'en');

      // Simulate audio waveform animation progress
      setSpeechProgress(0);
      const interval = setInterval(() => {
        setSpeechProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            if (onInterviewerSpeechEnd) onInterviewerSpeechEnd();
            return 100;
          }
          return prev + 4;
        });
      }, 300);

      return () => {
        clearInterval(interval);
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, [currentQuestion.id, activeFollowUp?.id, language, interviewerStatus, isAudioMuted]);

  // Attempt real camera stream for candidate video if active
  useEffect(() => {
    if (isCameraActive && typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          mediaStreamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          // Camera not permitted or available
        });
    } else {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
    }

    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraActive]);

  const handleReplayAudio = () => {
    speakTextWebSpeech(englishText, 'en');
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Video Feeds Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main AI Interviewer Viewport (2 cols) */}
        <div className="md:col-span-2 relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl min-h-[340px] sm:min-h-[400px] flex flex-col justify-between p-5">
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-indigo-950/40 pointer-events-none" />

          {/* Top Info Bar */}
          <div className="relative z-10 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-white text-xs font-bold shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                      interviewerStatus === 'speaking'
                        ? 'bg-indigo-400'
                        : interviewerStatus === 'listening'
                        ? 'bg-emerald-400'
                        : 'bg-amber-400'
                    } opacity-75`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      interviewerStatus === 'speaking'
                        ? 'bg-indigo-500'
                        : interviewerStatus === 'listening'
                        ? 'bg-emerald-500'
                        : 'bg-amber-500'
                    }`}
                  />
                </span>
                <span className="capitalize">
                  {interviewerStatus === 'speaking' && (isFollowUpActive ? 'AI Probing Follow-Up...' : 'AI Asking Live Question...')}
                  {interviewerStatus === 'listening' && 'Listening to Your Answer...'}
                  {interviewerStatus === 'analyzing' && 'Analyzing Technical Reasoning...'}
                  {interviewerStatus === 'idle' && 'Standby'}
                </span>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-[11px] font-black">
                Q{questionNumber} {totalQuestions > 0 && `of ${totalQuestions}`}
              </span>

              {currentQuestion.categoryLabel && !isFollowUpActive && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 text-[10px] font-bold">
                  <Tag className="w-3 h-3 text-cyan-400" />
                  <span>{currentQuestion.categoryLabel}</span>
                </span>
              )}
            </div>

            {/* Audio & Skip Question Controls */}
            <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 p-1 rounded-2xl">
              {onNextQuestion && (
                <button
                  onClick={onNextQuestion}
                  title="Ask Different Question"
                  className="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-indigo-300 hover:text-white text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Next Question</span>
                </button>
              )}

              <button
                onClick={handleReplayAudio}
                title="Repeat Question Audio"
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsAudioMuted(!isAudioMuted)}
                title={isAudioMuted ? 'Unmute AI Audio' : 'Mute AI Audio'}
                className={`p-1.5 rounded-xl transition-colors ${
                  isAudioMuted ? 'bg-rose-500/20 text-rose-300' : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Central AI Interviewer Avatar & Pulse */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center py-4">
            <div className="relative">
              {/* Pulsing Radiating Rings */}
              {interviewerStatus === 'speaking' && (
                <>
                  <div className="absolute -inset-4 rounded-full bg-indigo-500/20 animate-ping duration-1000" />
                  <div className="absolute -inset-8 rounded-full bg-indigo-500/10 animate-pulse duration-1500" />
                </>
              )}

              {interviewerStatus === 'analyzing' && (
                <div className="absolute -inset-4 rounded-full bg-amber-500/20 animate-spin duration-3000 border-2 border-dashed border-amber-400/50" />
              )}

              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-indigo-500/40 shadow-2xl bg-slate-900">
                <img
                  src={interviewerAvatar}
                  alt={interviewerName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />

                {/* AI Badge Overlay */}
                <div className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center border-2 border-slate-900 shadow-md">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Sound Wave Frequency Visualizer Bar */}
            {interviewerStatus === 'speaking' && (
              <div className="flex items-center gap-1 mt-4">
                {[40, 70, 90, 60, 100, 75, 45, 85, 95, 65, 80, 50, 65, 85].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-indigo-500 to-cyan-400 rounded-full animate-pulse"
                    style={{
                      height: `${Math.max(8, ((h * ((speechProgress % 20) + 80)) / 100) * 0.35)}px`,
                      animationDelay: `${i * 70}ms`,
                    }}
                  />
                ))}
              </div>
            )}

            <div className="text-center mt-3">
              <h3 className="text-white font-black text-base sm:text-lg tracking-tight">
                {interviewerName}
              </h3>
              <p className="text-indigo-300 text-xs font-medium max-w-sm">
                {interviewerTitle}
              </p>
            </div>
          </div>

          {/* Bottom Question Overlay Subtitle */}
          <div className="relative z-10 bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                  isFollowUpActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                    : 'bg-indigo-500/20 text-indigo-300'
                }`}>
                  {stageLabel}
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  {subtitleLabel}
                </span>
              </div>

              {language !== 'en' && (
                <button
                  onClick={() => setShowEnglishTranslation(!showEnglishTranslation)}
                  className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 underline"
                >
                  {showEnglishTranslation ? 'Show Original Native' : 'Show English Translation'}
                </button>
              )}
            </div>

            <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              {showEnglishTranslation && language !== 'en' ? englishText : questionText}
            </p>

            {language !== 'en' && !showEnglishTranslation && (
              <div className="mt-2 pt-2 border-t border-slate-800 text-xs text-slate-400 italic">
                Translation: &ldquo;{englishText}&rdquo;
              </div>
            )}
          </div>
        </div>

        {/* Candidate Webcam & Feed Preview (1 col) */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between p-4 min-h-[220px]">
          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-950/70 border border-slate-800 text-slate-200 text-xs font-bold">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>You ({candidateName})</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsCameraActive(!isCameraActive)}
                className={`p-1.5 rounded-xl border transition-colors ${
                  isCameraActive
                    ? 'bg-slate-800/80 border-slate-700 text-white hover:bg-slate-700'
                    : 'bg-rose-950/70 border-rose-800/60 text-rose-300'
                }`}
                title={isCameraActive ? 'Turn Off Camera' : 'Turn On Camera'}
              >
                {isCameraActive ? <Video className="w-3.5 h-3.5" /> : <VideoOff className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setIsCandidateMicActive(!isCandidateMicActive)}
                className={`p-1.5 rounded-xl border transition-colors ${
                  isCandidateMicActive
                    ? 'bg-slate-800/80 border-slate-700 text-white hover:bg-slate-700'
                    : 'bg-rose-950/70 border-rose-800/60 text-rose-300'
                }`}
                title={isCandidateMicActive ? 'Mute Microphone' : 'Unmute Microphone'}
              >
                {isCandidateMicActive ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Video stream or Candidate Avatar */}
          <div className="relative z-0 my-auto flex flex-col items-center justify-center py-6">
            {isCameraActive ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />
                {!mediaStreamRef.current && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 p-3 text-center">
                    <img
                      src={candidateAvatar}
                      alt={candidateName}
                      className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500/50 shadow-lg mb-2"
                    />
                    <span className="text-xs font-bold text-white">Live Candidate Feed</span>
                    <span className="text-[10px] text-slate-400">Microphone Ready</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-400">
                <VideoOff className="w-8 h-8" />
              </div>
            )}
          </div>

          {/* Candidate Status Indicators */}
          <div className="relative z-10 bg-slate-950/60 border border-slate-800/80 p-2.5 rounded-xl text-center flex items-center justify-around text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Mic Ready
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-indigo-300 font-medium">
              Audio: {language === 'pa' ? 'ਪੰਜਾਬੀ (Punjabi)' : language === 'hi' ? 'हिंदी (Hindi)' : 'English'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
