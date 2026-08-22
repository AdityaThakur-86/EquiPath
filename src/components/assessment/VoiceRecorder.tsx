'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  Square,
  RotateCcw,
  Edit3,
  Send,
  CheckCircle2,
  Volume2,
  Sparkles,
  AlertTriangle,
  XCircle,
  HelpCircle,
} from 'lucide-react';
import { Language, ScenarioQuestion } from '@/lib/types';
import { speechToText } from '@/lib/voiceSimulator';

interface VoiceRecorderProps {
  language: Language;
  question: ScenarioQuestion;
  onSubmit: (result: { transcript: string; durationSeconds: number; language: Language }) => void;
  onCancel?: () => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  language,
  question,
  onSubmit,
  onCancel,
}) => {
  const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'recorded' | 'editing'>('idle');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [editableTranscript, setEditableTranscript] = useState('');
  const [waveformBars, setWaveformBars] = useState<number[]>([15, 25, 45, 30, 60, 80, 50, 40, 75, 90, 60, 40, 25, 30]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  const startRecording = () => {
    setRecordingState('recording');
    setTimerSeconds(0);
    setTranscript('');
    setEditableTranscript('');

    // Web Speech API real mic attempt if available
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          if (language === 'pa') recognition.lang = 'pa-IN';
          else if (language === 'hi') recognition.lang = 'hi-IN';
          else recognition.lang = 'en-US';

          recognition.onresult = (event: any) => {
            let current = '';
            for (let i = 0; i < event.results.length; i++) {
              current += event.results[i][0].transcript + ' ';
            }
            if (current.trim()) {
              setTranscript(current.trim());
              setEditableTranscript(current.trim());
            }
          };

          recognition.start();
          recognitionRef.current = recognition;
        } catch {}
      }
    }

    // Live wave animation
    animRef.current = setInterval(() => {
      setWaveformBars(
        Array.from({ length: 18 }, () => Math.floor(Math.random() * 75) + 20)
      );
    }, 120);

    // Live timer
    timerRef.current = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev >= 60) {
          stopRecording();
          return 60;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (animRef.current) clearInterval(animRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }

    setRecordingState('recorded');

    // If no mic transcript captured, fall back to sample strong answer
    if (!transcript.trim()) {
      const sttResult = await speechToText(language, question);
      setTranscript(sttResult.transcript);
      setEditableTranscript(sttResult.transcript);
    }
  };

  const resetRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (animRef.current) clearInterval(animRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }
    setRecordingState('idle');
    setTimerSeconds(0);
    setTranscript('');
    setEditableTranscript('');
  };

  // Quick Presets for Demo / Testing the Strict Scoring Engine
  const handleSelectPreset = (type: 'strong' | 'partial' | 'wrong' | 'idk') => {
    let presetText = '';
    let sec = 12;

    if (type === 'strong') {
      presetText =
        question.sampleVoiceTranscript?.[language] ||
        question.sampleVoiceTranscript?.en ||
        'I would first safely isolate power at the main breaker and apply LOTO. Then I would measure supply voltage (230V), check the capacitor rating with a meter, inspect the bearings for mechanical binding, and test stator winding resistance balance.';
      sec = 18;
    } else if (type === 'partial') {
      presetText =
        question.sampleWeakVoiceTranscript?.[language] ||
        question.sampleWeakVoiceTranscript?.en ||
        (language === 'pa'
          ? 'ਮੈਂ ਪੱਖੇ ਦੀਆਂ ਤਾਰਾਂ ਅਤੇ ਵੋਲਟੇਜ ਚੈੱਕ ਕਰਾਂਗਾ।'
          : language === 'hi'
          ? 'मैं वोल्टेज और पंखे की तारें देखूंगा।'
          : 'I would check the wires and measure the voltage.');
      sec = 8;
    } else if (type === 'wrong') {
      presetText =
        question.sampleWrongVoiceTranscript?.[language] ||
        question.sampleWrongVoiceTranscript?.en ||
        (language === 'pa'
          ? 'ਮੈਂ ਵੋਲਟੇਜ ਵਧਾ ਦੇਵਾਂਗਾ ਅਤੇ ਵੱਡਾ 63A ਬਰੇਕਰ ਲਗਾ ਦੇਵਾਂਗਾ।'
          : language === 'hi'
          ? 'मैं वोल्टेज बढ़ा दूंगा और बड़ा 63A ब्रेकर लगा दूंगा।'
          : 'I would increase the input voltage and put a bigger 63A breaker.');
      sec = 6;
    } else {
      presetText =
        language === 'pa'
          ? 'ਮੈਨੂੰ ਨਹੀਂ ਪਤਾ।'
          : language === 'hi'
          ? 'मुझे नहीं पता।'
          : "I don't know.";
      sec = 2;
    }

    setTranscript(presetText);
    setEditableTranscript(presetText);
    setTimerSeconds(sec);
    setRecordingState('recorded');
  };

  const handleSubmit = () => {
    onSubmit({
      transcript: editableTranscript || transcript,
      durationSeconds: timerSeconds || 8,
      language,
    });
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animRef.current) clearInterval(animRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, []);

  return (
    <div className="rounded-3xl border-2 border-indigo-100 bg-gradient-to-b from-indigo-50/50 via-white to-white p-6 shadow-md space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-sm sm:text-base">Voice Answer Assessment</h4>
            <p className="text-xs text-slate-500">
              Language:{' '}
              <span className="font-bold text-indigo-700">
                {language === 'pa' ? 'ਪੰਜਾਬੀ (Punjabi)' : language === 'hi' ? 'हिंदी (Hindi)' : 'English'}
              </span>
            </p>
          </div>
        </div>

        {recordingState === 'recording' && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
            Listening... 00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
          </div>
        )}
      </div>

      {/* Quick Test Preset Buttons to Verify Evaluator Strictness */}
      {recordingState === 'idle' && (
        <div className="p-3.5 rounded-2xl bg-slate-100/80 border border-slate-200/80 space-y-2">
          <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">
            ⚡ Quick Test Presets (Evaluate Strictness):
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <button
              onClick={() => handleSelectPreset('strong')}
              className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold transition-all text-center flex items-center justify-center gap-1"
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>🌟 Strong Answer (90–97%)</span>
            </button>

            <button
              onClick={() => handleSelectPreset('partial')}
              className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold transition-all text-center flex items-center justify-center gap-1"
            >
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              <span>⚠️ Partially Correct (55–70%)</span>
            </button>

            <button
              onClick={() => handleSelectPreset('wrong')}
              className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 font-bold transition-all text-center flex items-center justify-center gap-1"
            >
              <XCircle className="w-3 h-3 text-rose-600" />
              <span>❌ Wrong/Hazard (10–20%)</span>
            </button>

            <button
              onClick={() => handleSelectPreset('idk')}
              className="px-2.5 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 border border-slate-300 font-bold transition-all text-center flex items-center justify-center gap-1"
            >
              <HelpCircle className="w-3 h-3 text-slate-600" />
              <span>🚫 Empty / "IDK" (0%)</span>
            </button>
          </div>
        </div>
      )}

      {/* State 1: Idle - Ready to record */}
      {recordingState === 'idle' && (
        <div className="text-center py-6">
          <button
            onClick={startRecording}
            className="group relative inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all"
          >
            <span className="absolute -inset-2 rounded-full bg-indigo-400 opacity-30 group-hover:opacity-60 blur-md transition-opacity animate-pulse" />
            <Mic className="w-9 h-9 relative z-10" />
          </button>
          <div className="mt-4 font-black text-slate-900 text-base">Click microphone to speak your answer</div>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
            Speak naturally in {language === 'pa' ? 'Punjabi' : language === 'hi' ? 'Hindi' : 'English'}. The evaluator scores the actual technical meaning, not the language choice.
          </p>
        </div>
      )}

      {/* State 2: Active Recording with Waveform */}
      {recordingState === 'recording' && (
        <div className="py-4 text-center">
          <div className="flex items-center justify-center gap-1.5 h-20 px-4 bg-slate-900 rounded-2xl mb-5 shadow-inner overflow-hidden">
            {waveformBars.map((height, i) => (
              <div
                key={i}
                className="w-2 rounded-full bg-gradient-to-t from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-100"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={stopRecording}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg shadow-rose-200 active:scale-95 transition-all"
            >
              <Square className="w-4 h-4 fill-white" /> Stop Recording
            </button>
            <button
              onClick={resetRecording}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* State 3: Recorded Review & Transcript Edit */}
      {(recordingState === 'recorded' || recordingState === 'editing') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3.5 bg-indigo-50/80 rounded-2xl border border-indigo-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-950 block">Voice Response Captured</span>
                <span className="text-xs font-mono text-indigo-700">00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds} Duration</span>
              </div>
            </div>
            <button
              onClick={resetRecording}
              className="text-xs text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1 hover:bg-white px-3 py-1.5 rounded-xl border border-transparent hover:border-slate-200 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Re-record
            </button>
          </div>

          {/* Transcript Box */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Spoken Transcript ({language === 'pa' ? 'ਪੰਜਾਬੀ' : language === 'hi' ? 'हिंदी' : 'English'}):
              </label>
              {recordingState === 'recorded' ? (
                <button
                  onClick={() => setRecordingState('editing')}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Text
                </button>
              ) : (
                <button
                  onClick={() => setRecordingState('recorded')}
                  className="text-xs text-emerald-600 hover:text-emerald-800 font-bold flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Save Changes
                </button>
              )}
            </div>

            {recordingState === 'editing' ? (
              <textarea
                value={editableTranscript}
                onChange={(e) => setEditableTranscript(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl border border-indigo-300 focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-900"
                placeholder="Edit your transcribed response..."
              />
            ) : (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-900 font-medium text-sm leading-relaxed">
                &ldquo;{editableTranscript || transcript}&rdquo;
              </div>
            )}
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {onCancel && (
              <button
                onClick={onCancel}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Switch to Text
              </button>
            )}
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm shadow-md transition-all active:scale-95"
            >
              <Send className="w-4 h-4" /> Submit for Evaluation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
