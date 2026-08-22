'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { RecruiterSidebar } from '@/components/layout/RecruiterSidebar';
import {
  MessageSquare,
  Send,
  Mic,
  Calendar,
  CheckCircle2,
  Building,
  User,
  Phone,
  Mail,
  Volume2,
  Globe,
  Clock,
} from 'lucide-react';
import { VoiceAudioPlayer } from '@/components/shared/VoiceAudioPlayer';
import { MOCK_CANDIDATES } from '@/lib/mockData';

export default function RecruiterMessagesPage() {
  const { messages, sendChatMessage, candidate } = useApp();
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('cand-arjun-01');
  const [recruiterInput, setRecruiterInput] = useState<string>('');
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const [interviewTime, setInterviewTime] = useState<string>('Tomorrow at 11:00 AM IST');
  const [interviewLocation, setInterviewLocation] = useState<string>('BrightCore Facility, Industrial Area Phase 2, Chandigarh');

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recruiterInput.trim()) return;

    sendChatMessage('recruiter', selectedCandidateId, 'text', {
      text: recruiterInput,
    });
    setRecruiterInput('');
  };

  const handleSendInterviewInvite = () => {
    sendChatMessage('recruiter', selectedCandidateId, 'interview_invite', {
      text: 'Practical Bench Interview Invitation for Electrical Technician',
      interviewDetails: {
        jobTitle: 'Electrical Technician',
        proposedTime: interviewTime,
        location: interviewLocation,
        accepted: false,
      },
    });
    setShowInviteModal(false);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-slate-50 min-h-screen">
      <RecruiterSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-6xl flex flex-col h-[calc(100vh-4rem)]">
        {/* Top Header */}
        <div className="pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80"
              alt="Arjun Kumar"
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-slate-900">Arjun Kumar</h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                  Rank #2 • 91% Match
                </span>
              </div>
              <p className="text-xs text-slate-500">Electrical & Motor Maintenance • Punjabi / Hindi Native Speaker</p>
            </div>
          </div>

          <button
            onClick={() => setShowInviteModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-colors flex-shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>Send Direct Interview Invite</span>
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4">
          {messages.map((msg) => {
            const isRecruiter = msg.senderRole === 'recruiter';

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isRecruiter ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${
                    isRecruiter ? 'bg-indigo-600' : 'bg-slate-900'
                  }`}
                >
                  {isRecruiter ? 'HR' : 'AK'}
                </div>

                <div className={`max-w-lg ${isRecruiter ? 'items-end' : 'items-start'}`}>
                  {/* Interview Details Card */}
                  {msg.type === 'interview_invite' && msg.interviewDetails && (
                    <div className="p-5 rounded-2xl bg-indigo-900 text-white shadow-lg space-y-2.5">
                      <div className="flex items-center justify-between text-indigo-300 text-xs font-bold uppercase">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Practical Interview Invite</span>
                        <span>Sent</span>
                      </div>
                      <div className="text-sm font-black">{msg.interviewDetails.jobTitle}</div>
                      <div className="text-xs text-slate-300 space-y-1">
                        <div>Time: {msg.interviewDetails.proposedTime}</div>
                        <div>Location: {msg.interviewDetails.location}</div>
                      </div>

                      <div className="pt-2 border-t border-indigo-800 text-xs">
                        {msg.interviewDetails.accepted ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Candidate Accepted Invitation
                          </span>
                        ) : (
                          <span className="text-slate-400">Awaiting Candidate Confirmation...</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Voice Note Audio Component */}
                  {msg.type === 'voice' && msg.transcript && (
                    <div className="w-80 sm:w-96">
                      <VoiceAudioPlayer
                        transcript={msg.transcript}
                        translatedTranscript={msg.translatedTranscript}
                        language={msg.language || 'pa'}
                        durationSeconds={msg.audioDuration || 8}
                        candidateName={msg.senderName}
                        title="Spoken Voice Response"
                      />
                    </div>
                  )}

                  {/* Standard Text Bubble */}
                  {msg.type === 'text' && msg.text && (
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed ${
                        isRecruiter
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
        </div>

        {/* Input Bar */}
        <div className="pt-4 border-t border-slate-200 bg-slate-50">
          <form onSubmit={handleSendText} className="flex items-center gap-3">
            <input
              type="text"
              value={recruiterInput}
              onChange={(e) => setRecruiterInput(e.target.value)}
              placeholder="Type message to Arjun Kumar..."
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

        {/* Schedule Interview Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
              <h3 className="text-lg font-black text-slate-900">Schedule Practical Bench Interview</h3>
              <p className="text-xs text-slate-500">
                Invite Arjun Kumar for an on-site practical evaluation test.
              </p>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Proposed Date & Time:</label>
                <input
                  type="text"
                  value={interviewTime}
                  onChange={(e) => setInterviewTime(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Workshop Location:</label>
                <input
                  type="text"
                  value={interviewLocation}
                  onChange={(e) => setInterviewLocation(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSendInterviewInvite}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 shadow-sm"
                >
                  Send Invitation
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
