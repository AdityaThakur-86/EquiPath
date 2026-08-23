'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Globe, Sparkles, Activity } from 'lucide-react';
import { Language, SUPPORTED_LANGUAGES } from '@/lib/types';
import { speakTextWithVoiceover, stopVoiceover } from '@/lib/voiceSimulator';

interface VoiceoverPlayerProps {
  title?: string;
  subtitle?: string;
  textToSpeak: string;
  defaultLanguage?: Language;
  onLanguageChange?: (lang: Language) => void;
  autoPlay?: boolean;
  compact?: boolean;
  className?: string;
}

export const VoiceoverPlayer: React.FC<VoiceoverPlayerProps> = ({
  title = 'AI Voiceover',
  subtitle,
  textToSpeak,
  defaultLanguage = 'pa',
  onLanguageChange,
  autoPlay = false,
  compact = false,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<Language>(defaultLanguage);
  const [speechRate, setSpeechRate] = useState<number>(0.95);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setActiveLanguage(defaultLanguage);
  }, [defaultLanguage]);

  useEffect(() => {
    if (autoPlay && textToSpeak) {
      handlePlay();
    }
    return () => {
      stopVoiceover();
    };
  }, [textToSpeak]);

  const handlePlay = () => {
    if (isPlaying) {
      handleStop();
      return;
    }

    setIsPlaying(true);
    const cancelFn = speakTextWithVoiceover({
      text: textToSpeak,
      language: activeLanguage,
      rate: speechRate,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
    stopRef.current = cancelFn;
  };

  const handleStop = () => {
    stopVoiceover();
    if (stopRef.current) {
      stopRef.current();
      stopRef.current = null;
    }
    setIsPlaying(false);
  };

  const handleLangSelect = (lang: Language) => {
    handleStop();
    setActiveLanguage(lang);
    if (onLanguageChange) onLanguageChange(lang);
  };

  const toggleSpeed = () => {
    const nextRate = speechRate === 0.95 ? 1.2 : 0.95;
    setSpeechRate(nextRate);
    if (isPlaying) {
      handleStop();
      setTimeout(() => {
        speakTextWithVoiceover({
          text: textToSpeak,
          language: activeLanguage,
          rate: nextRate,
          onStart: () => setIsPlaying(true),
          onEnd: () => setIsPlaying(false),
        });
      }, 150);
    }
  };

  const getLangBadge = (lang: Language) => {
    switch (lang) {
      case 'pa':
        return { label: 'ਪੰਜਾਬੀ Voice', bg: 'bg-amber-500/10 text-amber-700 border-amber-300' };
      case 'hi':
        return { label: 'हिंदी Voice', bg: 'bg-orange-500/10 text-orange-700 border-orange-300' };
      default:
        return { label: 'English Voice', bg: 'bg-blue-500/10 text-blue-700 border-blue-300' };
    }
  };

  const langBadge = getLangBadge(activeLanguage);
  const barHeights = [40, 70, 95, 30, 85, 100, 60, 45, 90, 75, 50, 80, 60, 40, 88, 65];

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <button
          onClick={isPlaying ? handleStop : handlePlay}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-sm active:scale-95 ${
            isPlaying
              ? 'bg-amber-500 text-white ring-2 ring-amber-200'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
          title="Listen in Hindi/Punjabi Voiceover"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          <span>{isPlaying ? 'Pause Voice' : `Listen (${activeLanguage.toUpperCase()})`}</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-white to-amber-50/40 p-4 sm:p-5 shadow-sm transition-all ${className}`}>
      {/* Header / Info Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${isPlaying ? 'bg-indigo-600 text-white animate-pulse' : 'bg-indigo-100 text-indigo-700'}`}>
            <Volume2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider">{title}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${langBadge.bg}`}>
                {langBadge.label}
              </span>
            </div>
            {subtitle && <p className="text-xs text-slate-500 font-medium mt-0.5">{subtitle}</p>}
          </div>
        </div>

        {/* Language Tabs for Voiceover */}
        <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
          <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLangSelect(lang.code)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                activeLanguage === lang.code
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              title={`Switch voiceover to ${lang.nativeLabel}`}
            >
              {lang.nativeLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Waveform Visualizer & Play Controls */}
      <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-indigo-100 shadow-xs">
        <button
          onClick={isPlaying ? handleStop : handlePlay}
          className={`w-11 h-11 rounded-full flex items-center justify-center text-white transition-all shadow-md active:scale-95 ${
            isPlaying ? 'bg-amber-500 hover:bg-amber-600 ring-4 ring-amber-100' : 'bg-indigo-600 hover:bg-indigo-700 ring-4 ring-indigo-100'
          }`}
          title={isPlaying ? 'Pause Voiceover' : 'Play Voiceover in Hindi/Punjabi'}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
        </button>

        {/* Dynamic Animated Waveform Equalizer */}
        <div className="flex-1 flex items-center gap-1 h-8 px-2 overflow-hidden">
          {barHeights.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-full bg-indigo-600/80 transition-all duration-150"
              style={{
                height: isPlaying ? `${Math.max(15, h * (0.4 + Math.sin(Date.now() / 100 + i) * 0.6))}%` : '25%',
                opacity: isPlaying ? 0.9 : 0.3,
                backgroundColor: isPlaying ? '#4F46E5' : '#94A3B8',
              }}
            />
          ))}
        </div>

        {/* Speed Toggle */}
        <button
          onClick={toggleSpeed}
          className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          title="Toggle speech speed"
        >
          {speechRate}x
        </button>

        {/* Reset / Stop */}
        <button
          onClick={handleStop}
          className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          title="Stop voiceover"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Speaking Indicator Status */}
      <div className="mt-2.5 flex items-center justify-between text-[11px] font-semibold text-slate-500 px-1">
        <span className="flex items-center gap-1.5 text-indigo-700">
          <Sparkles className="w-3 h-3 text-indigo-500" />
          {isPlaying
            ? `Speaking in ${activeLanguage === 'pa' ? 'Punjabi (ਪੰਜਾਬੀ)' : activeLanguage === 'hi' ? 'Hindi (हिंदी)' : 'English'} voiceover...`
            : `Click play to hear ${title.toLowerCase()} in Punjabi or Hindi`}
        </span>
        {isPlaying && (
          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
            <Activity className="w-3 h-3 animate-spin" /> Live Audio
          </span>
        )}
      </div>
    </div>
  );
};
