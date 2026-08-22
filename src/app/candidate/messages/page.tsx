'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { CandidateSidebar } from '@/components/layout/CandidateSidebar';
import {
  MessageSquare,
  Send,
  Mic,
  Calendar,
  CheckCircle2,
  Volume2,
  Building,
  Globe,
  Square,
  RotateCcw,
} from 'lucide-react';
import { VoiceAudioPlayer } from '@/components/shared/VoiceAudioPlayer';
import { Language } from '@/lib/types';

export default function CandidateMessagesPage() {
  const { messages, sendChatMessage, acceptInterview, selectedLanguage, showToast } = useApp();
  const [textInput, setTextInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    sendChatMessage('candidate', 'recruiter-brightcore', 'text', {
      text: textInput,
      language: selectedLanguage,
    });
    setTextInput('');
  };

  const handleStartSimulatedVoice = () => {
    setIsRecording(true);
    setRecordTimer(0);

    const interval = setInterval(() => {
      setRecordTimer((prev) => {
        if (prev >= 6) {
          clearInterval(interval);
          setIsRecording(false);
          // Send simulated Punjabi voice response
          sendChatMessage('candidate', 'recruiter-brightcore', 'voice', {
            audioDuration: 7,
            language: selectedLanguage,
            transcript: selectedLanguage === 'pa'
              ? 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ ਰੋਹਿਤ ਜੀ, ਸੁਨੇਹੇ ਲਈ ਧੰਨਵਾਦ। ਮੈਂ ਕੱਲ੍ਹ 11 ਵਜੇ ਇੰਟਰਵਿਊ ਲਈ ਆਉਣ ਲਈ ਤਿਆਰ ਹਾਂ।'
              : 'नमस्ते रोहित जी, संदेश के लिए धन्यवाद। मैं कल 11 बजे इंटरव्यू के लिए आने को तैयार हूं।',
            translatedTranscript: 'Sat Sri Akal Rohit ji, thank you for the message. I am ready to come for the interview tomorrow at 11:00 AM.',
          });
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-slate-50 min-h-screen">
      <CandidateSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-4xl flex flex-col h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="pb-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900">
                Rohit Sharma (BrightCore Services)
              </h1>
              <p className="text-xs text-slate-500">Hiring Lead • Electrical Technician Opening</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Online
          </span>
        </div>

        {/* Message Thread Box */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4">
          {messages.map((msg) => {
            const isMe = msg.senderRole === 'candidate';

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${
                    isMe ? 'bg-indigo-600' : 'bg-slate-900'
                  }`}
                >
                  {isMe ? 'AK' : 'BC'}
                </div>

                <div className={`max-w-md ${isMe ? 'items-end' : 'items-start'}`}>
                  {/* Interview Invite Card */}
                  {msg.type === 'interview_invite' && msg.interviewDetails && (
                    <div className="p-5 rounded-2xl bg-indigo-900 text-white shadow-lg space-y-3">
                      <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                        <Calendar className="w-4 h-4" />
                        <span>Direct Interview Invitation</span>
                      </div>
                      <div className="text-base font-black">{msg.interviewDetails.jobTitle}</div>
                      <div className="text-xs text-slate-300 space-y-1">
                        <div><strong>Time:</strong> {msg.interviewDetails.proposedTime}</div>
                        <div><strong>Location:</strong> {msg.interviewDetails.location}</div>
                      </div>

                      <div className="pt-2 border-t border-indigo-800">
                        {msg.interviewDetails.accepted ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/30 text-emerald-300 text-xs font-bold">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Interview Confirmed</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => acceptInterview(msg.id)}
                            className="w-full py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs shadow-md transition-colors"
                          >
                            Accept Interview Invitation
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Voice Note Player */}
                  {msg.type === 'voice' && msg.transcript && (
                    <div className="w-80">
                      <VoiceAudioPlayer
                        transcript={msg.transcript}
                        translatedTranscript={msg.translatedTranscript}
                        language={msg.language || 'pa'}
                        durationSeconds={msg.audioDuration || 8}
                        candidateName={msg.senderName}
                        title={isMe ? 'My Voice Reply' : 'Recruiter Voice Note'}
                      />
                    </div>
                  )}

                  {/* Standard Text Bubble */}
                  {msg.type === 'text' && msg.text && (
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed ${
                        isMe
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-900 shadow-2xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 mt-1 px-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            );
          })}

          {isRecording && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center justify-between animate-pulse">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                Recording Voice Note in Punjabi... 00:0{recordTimer}
              </span>
              <span className="text-[11px] opacity-80">Speaking: &ldquo;ਮੈਂ ਕੱਲ੍ਹ 11 ਵਜੇ ਆਉਣ ਲਈ ਤਿਆਰ ਹਾਂ...&rdquo;</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="pt-4 border-t border-slate-200 bg-slate-50">
          <form onSubmit={handleSendText} className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleStartSimulatedVoice}
              disabled={isRecording}
              className="p-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors flex items-center gap-2 text-xs font-bold flex-shrink-0"
              title="Record voice message in Punjabi/Hindi"
            >
              <Mic className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">🎙 Voice Note</span>
            </button>

            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type message to BrightCore Services hiring team..."
              className="flex-1 p-3.5 rounded-2xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm font-medium text-slate-900 shadow-2xs"
            />

            <button
              type="submit"
              className="p-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 transition-colors flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
