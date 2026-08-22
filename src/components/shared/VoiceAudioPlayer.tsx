'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Globe, Sparkles } from 'lucide-react';
import { Language } from '@/lib/types';
import { playAudioSimulation, speakTextWebSpeech } from '@/lib/voiceSimulator';

interface VoiceAudioPlayerProps {
  transcript: string;
  translatedTranscript?: string;
  language?: Language;
  durationSeconds?: number;
  candidateName?: string;
  title?: string;
}

export const VoiceAudioPlayer: React.FC<VoiceAudioPlayerProps> = ({
  transcript,
  translatedTranscript,
  language = 'pa',
  durationSeconds = 8,
  candidateName,
  title = 'Voice Response',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    if (isPlaying) {
      cleanup = playAudioSimulation(durationSeconds, (pct) => {
        setProgress(pct);
        if (pct >= 100) {
          setIsPlaying(false);
          setProgress(0);
        }
      });
    }
    return () => {
      if (cleanup) cleanup();
    };
  }, [isPlaying, durationSeconds]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setProgress(0);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      setIsPlaying(true);
      // Attempt web speech synthesis for real voice feedback if available
      const textToSpeak = showTranslation && translatedTranscript ? translatedTranscript : transcript;
      speakTextWebSpeech(textToSpeak, language);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const getLanguagePill = (lang: Language) => {
    switch (lang) {
      case 'pa':
        return { label: 'ਪੰਜਾਬੀ (Punjabi)', badgeBg: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'hi':
        return { label: 'हिंदी (Hindi)', badgeBg: 'bg-orange-50 text-orange-800 border-orange-200' };
      default:
        return { label: 'English', badgeBg: 'bg-blue-50 text-blue-800 border-blue-200' };
    }
  };

  const langMeta = getLanguagePill(language);

  // Pseudo-random bar heights for visual waveform
  const barHeights = [40, 65, 85, 30, 75, 95, 60, 45, 90, 100, 70, 50, 80, 60, 35, 75, 88, 55, 40, 65];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Volume2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</div>
            {candidateName && <div className="text-sm font-bold text-slate-900">{candidateName}</div>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${langMeta.badgeBg}`}>
            {langMeta.label}
          </span>
          <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
            00:{durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds}
          </span>
        </div>
      </div>

      {/* Waveform Visualizer & Play Controls */}
      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 mb-4">
        <button
          onClick={handleTogglePlay}
          className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 active:scale-95 transition-all shadow-sm flex-shrink-0"
          title={isPlaying ? 'Pause Audio' : 'Play Audio Response'}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
        </button>

        <div className="flex-1 flex items-center gap-1 h-9 px-2 overflow-hidden">
          {barHeights.map((height, i) => {
            const barProgress = (i / barHeights.length) * 100;
            const isBarActive = progress >= barProgress;
            return (
              <div
                key={i}
                className="flex-1 rounded-full transition-all duration-150"
                style={{
                  height: `${isPlaying ? Math.max(15, (height * (0.6 + Math.sin((progress / 10) + i) * 0.4))) : height * 0.5}%`,
                  backgroundColor: isBarActive ? '#4F46E5' : '#CBD5E1',
                }}
              />
            );
          })}
        </div>

        <button
          onClick={handleReset}
          className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          title="Reset audio"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Transcript Text Box */}
      <div className="rounded-xl bg-slate-50/70 border border-slate-100 p-3.5 text-sm">
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-xs font-semibold text-slate-500">
            {showTranslation ? 'English Translation (for Recruiter Review)' : 'Original Spoken Transcript'}
          </div>
          {translatedTranscript && (
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              {showTranslation ? 'Show Native Script' : 'View English Translation'}
            </button>
          )}
        </div>

        <p className="text-slate-800 leading-relaxed font-medium">
          {showTranslation && translatedTranscript ? `"${translatedTranscript}"` : `"${transcript}"`}
        </p>

        <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <Sparkles className="w-3 h-3" /> Evaluated directly in native language (0% translation loss)
          </span>
          <span className="font-mono">STT Confidence: 94%</span>
        </div>
      </div>
    </div>
  );
};
