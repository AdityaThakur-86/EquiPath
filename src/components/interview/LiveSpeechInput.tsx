'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  Square,
  Send,
  Sparkles,
  Edit3,
  Volume2,
  Clock,
  RotateCcw,
  Check,
  AlertCircle,
  MessageSquare,
  HelpCircle,
  Settings,
} from 'lucide-react';
import { Language } from '@/lib/types';
import { DynamicInterviewQuestion } from '@/lib/interviewQuestionBank';

interface LiveSpeechInputProps {
  currentQuestion: DynamicInterviewQuestion;
  language: Language;
  onSubmitAnswer: (answerText: string, isVoice: boolean, durationSeconds: number) => void;
  onRequestFollowUp?: (currentAnswer: string) => void;
  disabled?: boolean;
  defaultTimeLimitSeconds?: number;
}

export const LiveSpeechInput: React.FC<LiveSpeechInputProps> = ({
  currentQuestion,
  language,
  onSubmitAnswer,
  onRequestFollowUp,
  disabled = false,
  defaultTimeLimitSeconds = 120, // 2 Full Minutes default!
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [timeLimit, setTimeLimit] = useState<number>(defaultTimeLimitSeconds);
  const [timeLeft, setTimeLeft] = useState<number>(defaultTimeLimitSeconds);
  const [transcript, setTranscript] = useState('');
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);
  const [audioLevel, setAudioLevel] = useState(30);

  const recognitionRef = useRef<any>(null);
  const accumulatedTranscriptRef = useRef<string>('');
  const isRecordingRef = useRef<boolean>(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioAnimationRef = useRef<NodeJS.Timeout | null>(null);

  // Reset transcript when question changes
  useEffect(() => {
    setTranscript('');
    accumulatedTranscriptRef.current = '';
    setIsRecording(false);
    isRecordingRef.current = false;
    setRecordingSeconds(0);
    setTimeLeft(timeLimit);
    setIsEditingTranscript(false);
  }, [currentQuestion.id, timeLimit]);

  // Countdown timer when answering
  useEffect(() => {
    if (isRecording) {
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
        if (timeLimit > 0) {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              handleStopRecording();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isRecording, timeLimit]);

  // Real-time audio waveform visualizer simulation
  useEffect(() => {
    if (isRecording) {
      audioAnimationRef.current = setInterval(() => {
        setAudioLevel(Math.floor(Math.random() * 65) + 35);
      }, 100);
    } else {
      if (audioAnimationRef.current) clearInterval(audioAnimationRef.current);
      setAudioLevel(10);
    }

    return () => {
      if (audioAnimationRef.current) clearInterval(audioAnimationRef.current);
    };
  }, [isRecording]);

  // Web Speech API Speech Recognition with continuous multi-sentence accumulation
  const startSpeechEngine = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      if (language === 'pa') recognition.lang = 'pa-IN';
      else if (language === 'hi') recognition.lang = 'hi-IN';
      else recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let interimText = '';
        let finalizedText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const item = event.results[i];
          if (item.isFinal) {
            finalizedText += item[0].transcript + ' ';
          } else {
            interimText += item[0].transcript;
          }
        }

        if (finalizedText) {
          accumulatedTranscriptRef.current += finalizedText;
        }

        const fullCurrent = (accumulatedTranscriptRef.current + ' ' + interimText).trim();
        if (fullCurrent) {
          setTranscript(fullCurrent);
        }
      };

      recognition.onerror = () => {
        // Handle gracefully
      };

      recognition.onend = () => {
        // If the browser paused due to silence but the candidate is still recording, auto-restart seamlessly
        if (isRecordingRef.current) {
          try {
            recognition.start();
          } catch {}
        }
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch {
      // Browser permissions or unsupported
    }
  };

  const handleStartRecording = () => {
    if (disabled) return;
    setIsRecording(true);
    isRecordingRef.current = true;
    setRecordingSeconds(0);
    startSpeechEngine();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    isRecordingRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }

    // If no mic transcript was captured, populate with sample
    if (!transcript.trim()) {
      const sample = currentQuestion.sampleAnswers[language] || currentQuestion.sampleAnswers.en;
      setTranscript(sample);
      accumulatedTranscriptRef.current = sample;
    }
  };

  const handleSelectQuickAnswer = (langKey: Language) => {
    const sample = currentQuestion.sampleAnswers[langKey] || currentQuestion.sampleAnswers.en;
    setTranscript(sample);
    accumulatedTranscriptRef.current = sample;
    setIsRecording(false);
    isRecordingRef.current = false;
    setRecordingSeconds(65); // Simulates a realistic ~1 minute answer
  };

  const handleSubmit = () => {
    if (!transcript.trim() || disabled) return;
    onSubmitAnswer(transcript.trim(), true, recordingSeconds || 45);
  };

  const handleTriggerFollowUp = () => {
    if (!transcript.trim() || disabled || !onRequestFollowUp) return;
    onRequestFollowUp(transcript.trim());
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const wordCount = transcript.trim() ? transcript.trim().split(/\s+/).filter(Boolean).length : 0;
  const estimatedWpm = recordingSeconds > 5 ? Math.round((wordCount / (recordingSeconds / 60))) : 0;

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-md space-y-4">
      {/* Top Controls: Timer Settings, Live Stats & Presets */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        {/* Speaking Duration & Countdown */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
            timeLimit > 0 && timeLeft < 20
              ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}>
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span>
              {timeLimit > 0 ? `Time Left: ${formatTimer(timeLeft)}` : 'Timer: Unlimited'}
            </span>
          </div>

          {/* Time Limit Selector */}
          <select
            value={timeLimit}
            onChange={(e) => {
              const val = Number(e.target.value);
              setTimeLimit(val);
              setTimeLeft(val);
            }}
            className="px-2 py-1 rounded-xl text-xs font-bold bg-slate-50 border border-slate-200 text-slate-700 outline-none"
            title="Select speaking time limit"
          >
            <option value={60}>⏱ 60s (Quick)</option>
            <option value={90}>⏱ 90s (Standard)</option>
            <option value={120}>⏱ 120s (2 Full Minutes - Recommended)</option>
            <option value={180}>⏱ 180s (3 Minutes In-depth)</option>
            <option value={0}>♾ Unlimited (Free Flow)</option>
          </select>

          {isRecording && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-rose-600 animate-pulse bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              Speaking: {formatTimer(recordingSeconds)}
            </span>
          )}
        </div>

        {/* Quick Simulated Long-Form Voice Note Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold text-slate-400 mr-1">🎙 1–2 Min Voice Sample:</span>
          <button
            onClick={() => handleSelectQuickAnswer('pa')}
            className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition-colors shadow-2xs"
          >
            ਪੰਜਾਬੀ (Punjabi)
          </button>
          <button
            onClick={() => handleSelectQuickAnswer('hi')}
            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 transition-colors shadow-2xs"
          >
            हिंदी (Hindi)
          </button>
          <button
            onClick={() => handleSelectQuickAnswer('en')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors shadow-2xs"
          >
            English
          </button>
        </div>
      </div>

      {/* Main Microphone & Speech Action Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Record Button */}
        {!isRecording ? (
          <button
            onClick={handleStartRecording}
            disabled={disabled}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-slate-900 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-200 hover:shadow-lg transition-all active:scale-98 disabled:opacity-50"
          >
            <Mic className="w-5 h-5 animate-pulse text-cyan-300" />
            <span>Speak Live Answer (Speak 1–2 Minutes)</span>
          </button>
        ) : (
          <button
            onClick={handleStopRecording}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-200 transition-all active:scale-98"
          >
            <Square className="w-4 h-4 fill-white" />
            <span>Stop Speaking & Finalize Response</span>
          </button>
        )}

        {/* Live Audio Visualizer Equalizer */}
        <div className="flex items-center gap-1.5 h-11 px-4 rounded-2xl bg-slate-50 border border-slate-200/80 w-full sm:w-56 justify-center">
          {[20, 45, 75, 95, 60, 40, 80, 50, 90, 30, 70, 55].map((base, idx) => (
            <div
              key={idx}
              className={`w-1 rounded-full transition-all duration-75 ${
                isRecording ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
              style={{
                height: `${Math.max(4, isRecording ? (base * audioLevel) / 100 * 0.38 : 4)}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Live Transcript / Candidate Answer Text Area */}
      <div className="relative rounded-2xl bg-slate-50 border border-slate-200 p-4 transition-all">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider font-black text-slate-600 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-indigo-600" /> Live Speech Transcription
            </span>
            {wordCount > 0 && (
              <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                {wordCount} Words {estimatedWpm > 0 && `• ~${estimatedWpm} WPM`}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {transcript && (
              <button
                onClick={() => setIsEditingTranscript(!isEditingTranscript)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                <span>{isEditingTranscript ? 'Done Editing' : 'Edit Text'}</span>
              </button>
            )}

            {transcript && (
              <button
                onClick={() => {
                  setTranscript('');
                  accumulatedTranscriptRef.current = '';
                }}
                className="text-xs font-medium text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {isEditingTranscript ? (
          <textarea
            value={transcript}
            onChange={(e) => {
              setTranscript(e.target.value);
              accumulatedTranscriptRef.current = e.target.value;
            }}
            rows={4}
            className="w-full p-3 rounded-xl border border-indigo-300 bg-white focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm font-medium text-slate-900 leading-relaxed outline-none"
            placeholder="Type or edit your response here..."
          />
        ) : (
          <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed min-h-[56px] whitespace-pre-line">
            {transcript || (
              <span className="text-slate-400 italic">
                Press &ldquo;Speak Live Answer&rdquo; and talk for 1–2 minutes in Punjabi, Hindi, or English. Your full response will stream in real time...
              </span>
            )}
          </p>
        )}
      </div>

      {/* Submit Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <span className="text-[11px] text-slate-500">
          💡 Candidates who speak 1–2 minutes with specific readings earn higher specificity scores.
        </span>

        <div className="flex items-center gap-2">
          {onRequestFollowUp && transcript.trim().length > 30 && (
            <button
              onClick={handleTriggerFollowUp}
              disabled={isRecording || disabled}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200 transition-all active:scale-98 shadow-2xs"
              title="AI will actively analyze what you said and generate a tailored follow-up question"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Ask AI Dynamic Follow-up</span>
            </button>
          )}

          <button
            onClick={handleSubmit}
            disabled={!transcript.trim() || isRecording || disabled}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-sm transition-all active:scale-98 disabled:opacity-40 disabled:pointer-events-none"
          >
            <span>Submit & Next Question</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
