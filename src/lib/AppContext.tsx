'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Candidate, Job, Application, Message, Language, EvaluationResult, DemoStep } from './types';
import { INITIAL_CANDIDATE, MOCK_JOBS, INITIAL_MESSAGES, DEMO_STEPS } from './mockData';
import { runBiasAudit, AuditRunResult } from './biasAuditEngine';
import { calculateMatchScore } from './matchEngine';

interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  role: 'candidate' | 'recruiter' | 'demo';
  setRole: (role: 'candidate' | 'recruiter' | 'demo') => void;
  candidate: Candidate;
  jobs: Job[];
  applications: Application[];
  messages: Message[];
  auditResult: AuditRunResult;
  selectedLanguage: Language;
  setSelectedLanguage: (lang: Language) => void;
  
  // Assessment state
  currentAssessmentSkill: string;
  setCurrentAssessmentSkill: (skill: string) => void;
  latestEvaluation: EvaluationResult | null;
  setLatestEvaluation: (evalResult: EvaluationResult | null) => void;
  
  // Actions
  claimNewSkill: (skillName: string, experienceYears: number) => void;
  recordCompletedAssessment: (result: EvaluationResult) => void;
  applyToJob: (jobId: string) => void;
  sendChatMessage: (
    senderRole: 'candidate' | 'recruiter',
    receiverId: string,
    type: 'text' | 'voice' | 'interview_invite',
    content: {
      text?: string;
      transcript?: string;
      translatedTranscript?: string;
      language?: Language;
      audioDuration?: number;
      interviewDetails?: { jobTitle: string; proposedTime: string; location: string; accepted?: boolean };
    }
  ) => void;
  acceptInterview: (messageId: string) => void;
  runFairnessAuditToggle: (toggles?: { removeEmploymentGap?: boolean; removeCollegeTier?: boolean; removeResumePrestige?: boolean; removeLanguagePenalty?: boolean }) => void;
  shortlistCandidate: (candidateId: string) => void;
  requestCandidateInterview: (candidateId: string, jobTitle: string) => void;
  
  // Demo State (20 Steps)
  demoActive: boolean;
  demoStep: number;
  demoSteps: DemoStep[];
  demoAutoPlay: boolean;
  startDemoTour: (fromStep?: number) => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  setDemoStepNumber: (step: number) => void;
  toggleDemoAutoPlay: () => void;
  exitDemoTour: () => void;
  
  // Toast
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<'candidate' | 'recruiter' | 'demo'>('candidate');
  const [candidate, setCandidate] = useState<Candidate>(INITIAL_CANDIDATE);
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('pa');
  const [currentAssessmentSkill, setCurrentAssessmentSkill] = useState<string>('Electrical Troubleshooting');
  const [latestEvaluation, setLatestEvaluation] = useState<EvaluationResult | null>(INITIAL_CANDIDATE.completedAssessments[0] || null);
  
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 'app-01',
      jobId: 'job-001',
      jobTitle: 'Electrical Technician',
      company: 'BrightCore Services',
      location: 'Chandigarh, Punjab',
      salary: '₹25,000–₹32,000/month',
      appliedDate: '2026-08-21',
      status: 'Interview Requested',
      matchScore: 92,
      interviewDate: 'Tomorrow at 11:00 AM IST',
      interviewNotes: 'Practical 3-phase troubleshooting assessment on test rig.',
    },
    {
      id: 'app-02',
      jobId: 'job-003',
      jobTitle: 'Field Electrician',
      company: 'Metro Power Systems',
      location: 'Ludhiana, Punjab',
      salary: '₹26,000–₹34,000/month',
      appliedDate: '2026-08-20',
      status: 'Reviewing',
      matchScore: 89,
    },
    {
      id: 'app-03',
      jobId: 'job-004',
      jobTitle: 'Motor Repair Specialist',
      company: 'Punjab Rewinding Works',
      location: 'Jalandhar, Punjab',
      salary: '₹28,000–₹35,000/month',
      appliedDate: '2026-08-19',
      status: 'Shortlisted',
      matchScore: 87,
    },
    {
      id: 'app-04',
      jobId: 'job-002',
      jobTitle: 'Maintenance Technician',
      company: 'Apex Industrial Corp',
      location: 'Mohali, Punjab',
      salary: '₹24,000–₹30,000/month',
      appliedDate: '2026-08-18',
      status: 'Applied',
      matchScore: 88,
    },
  ]);

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [auditResult, setAuditResult] = useState<AuditRunResult>(runBiasAudit());
  
  // Demo State
  const [demoActive, setDemoActive] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(1);
  const [demoAutoPlay, setDemoAutoPlay] = useState<boolean>(false);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const claimNewSkill = (skillName: string, experienceYears: number) => {
    const exists = candidate.skills.some((s) => s.name.toLowerCase() === skillName.toLowerCase());
    if (!exists) {
      const newSkill = {
        name: skillName,
        category: 'Technical',
        confidenceScore: 70,
        assessmentsCount: 0,
        lastAssessed: new Date().toISOString().split('T')[0],
        status: 'claimed' as const,
        breakdown: { technical: 70, troubleshooting: 70, safety: 75, practicalReasoning: 70 },
        evidenceSummary: `Self-claimed with ${experienceYears} years practical trade background. Ready for scenario assessment.`,
      };
      setCandidate((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      showToast('Skill Claimed', `"${skillName}" has been added to your profile. Ready for verification!`, 'success');
    }
  };

  const recordCompletedAssessment = (result: EvaluationResult) => {
    setLatestEvaluation(result);
    setCandidate((prev) => {
      const updatedAssessments = [result, ...prev.completedAssessments];
      
      // Update skill confidence
      let skillFound = false;
      let updatedSkills = prev.skills.map((s) => {
        if (s.name.toLowerCase().includes(currentAssessmentSkill.toLowerCase()) || currentAssessmentSkill.toLowerCase().includes(s.name.toLowerCase())) {
          skillFound = true;
          const newCount = s.assessmentsCount + 1;
          const newConfidence = Math.min(98, Math.round((s.confidenceScore * s.assessmentsCount + result.assessmentConfidence) / newCount));
          return {
            ...s,
            confidenceScore: newConfidence,
            assessmentsCount: newCount,
            status: 'verified' as const,
            breakdown: {
              technical: Math.round((s.breakdown.technical + result.scores.technicalScore) / 2),
              troubleshooting: Math.round((s.breakdown.troubleshooting + result.scores.reasoningScore) / 2),
              safety: Math.round((s.breakdown.safety + result.scores.safetyScore) / 2),
              practicalReasoning: Math.round((s.breakdown.practicalReasoning + result.scores.specificityScore) / 2),
            },
            evidenceSummary: `Verified through live scenario/interview assessment. Safety score: ${result.scores.safetyScore}%.`,
          };
        }
        return s;
      });

      if (!skillFound) {
        updatedSkills = [
          ...updatedSkills,
          {
            name: currentAssessmentSkill || 'Technical Trade Assessment',
            category: 'Technical',
            confidenceScore: result.assessmentConfidence,
            assessmentsCount: 1,
            lastAssessed: new Date().toISOString().split('T')[0],
            status: 'verified' as const,
            breakdown: {
              technical: result.scores.technicalScore,
              troubleshooting: result.scores.reasoningScore,
              safety: result.scores.safetyScore,
              practicalReasoning: result.scores.specificityScore,
            },
            evidenceSummary: `Verified through 4-stage live AI technical interview. Score: ${result.scores.overallScore}%.`,
          },
        ];
      }

      const avgConfidence = Math.round(
        updatedSkills.reduce((acc, curr) => acc + curr.confidenceScore, 0) / updatedSkills.length
      );

      return {
        ...prev,
        completedAssessments: updatedAssessments,
        skills: updatedSkills,
        overallConfidence: avgConfidence,
      };
    });

    showToast('Assessment Completed', `Score: ${result.scores.overallScore}% • Assessment Confidence: ${result.assessmentConfidence}/100`, 'success');
  };

  const applyToJob = (jobId: string) => {
    const targetJob = jobs.find((j) => j.id === jobId);
    if (!targetJob) return;

    const exists = applications.some((a) => a.jobId === jobId);
    if (exists) {
      showToast('Already Applied', `You have already applied for ${targetJob.title}.`, 'info');
      return;
    }

    const breakdown = calculateMatchScore(candidate, targetJob);
    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: targetJob.id,
      jobTitle: targetJob.title,
      company: targetJob.company,
      location: targetJob.location,
      salary: targetJob.salaryRange,
      appliedDate: 'Today',
      status: 'Applied',
      matchScore: breakdown.totalMatch,
    };

    setApplications((prev) => [newApp, ...prev]);
    showToast('Application Submitted', `Applied to ${targetJob.title} at ${targetJob.company}! Match: ${breakdown.totalMatch}%`, 'success');
  };

  const sendChatMessage = (
    senderRole: 'candidate' | 'recruiter',
    receiverId: string,
    type: 'text' | 'voice' | 'interview_invite',
    content: {
      text?: string;
      transcript?: string;
      translatedTranscript?: string;
      language?: Language;
      audioDuration?: number;
      interviewDetails?: { jobTitle: string; proposedTime: string; location: string; accepted?: boolean };
    }
  ) => {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId: 'conv-brightcore-arjun',
      senderId: senderRole === 'candidate' ? candidate.id : 'recruiter-brightcore',
      senderName: senderRole === 'candidate' ? candidate.name : 'Rohit Sharma (Hiring Lead, BrightCore Services)',
      senderRole,
      receiverId,
      type,
      text: content.text,
      transcript: content.transcript,
      translatedTranscript: content.translatedTranscript,
      language: content.language || selectedLanguage,
      audioDuration: content.audioDuration,
      interviewDetails: content.interviewDetails,
      timestamp: new Date().toISOString(),
      isRead: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    showToast('Message Sent', type === 'voice' ? 'Voice response transmitted' : 'Text message sent', 'success');
  };

  const acceptInterview = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId && msg.interviewDetails) {
          return {
            ...msg,
            interviewDetails: {
              ...msg.interviewDetails,
              accepted: true,
            },
          };
        }
        return msg;
      })
    );

    setApplications((prev) =>
      prev.map((app) => (app.jobId === 'job-001' ? { ...app, status: 'Interview Requested' } : app))
    );

    showToast('Interview Confirmed', 'You have accepted the interview invitation for tomorrow at 11:00 AM IST.', 'success');
  };

  const runFairnessAuditToggle = (toggles?: {
    removeEmploymentGap?: boolean;
    removeCollegeTier?: boolean;
    removeResumePrestige?: boolean;
    removeLanguagePenalty?: boolean;
  }) => {
    const result = runBiasAudit(undefined, toggles);
    setAuditResult(result);
    showToast('Ranking Transparency Audit Run', 'Non-job-relevant signals removed. Arjun Kumar recalculated to Rank #2 (91%).', 'success');
  };

  const shortlistCandidate = (candidateId: string) => {
    showToast('Candidate Shortlisted', 'Candidate has been moved to the interview shortlist pipeline.', 'success');
  };

  const requestCandidateInterview = (candidateId: string, jobTitle: string) => {
    sendChatMessage('recruiter', candidateId, 'interview_invite', {
      text: `Interview invitation for ${jobTitle}`,
      interviewDetails: {
        jobTitle,
        proposedTime: 'Tomorrow at 11:00 AM IST',
        location: 'BrightCore Facility, Industrial Area Phase 2, Chandigarh',
        accepted: false,
      },
    });
    showToast('Interview Requested', `Sent direct interview invite to candidate for ${jobTitle}.`, 'success');
  };

  // Demo controls
  const startDemoTour = (fromStep: number = 1) => {
    setDemoActive(true);
    setDemoStep(fromStep);
    setDemoAutoPlay(false);
    showToast('Hackathon Demo Started', `Step ${fromStep} of 20 active. Follow the highlighted cues or use the controller.`, 'info');
  };

  const nextDemoStep = () => {
    if (demoStep < 20) {
      setDemoStep((prev) => prev + 1);
    } else {
      setDemoActive(false);
      showToast('Demo Complete', 'You have completed the full 20-step EquiPath tour!', 'success');
    }
  };

  const prevDemoStep = () => {
    if (demoStep > 1) {
      setDemoStep((prev) => prev - 1);
    }
  };

  const setDemoStepNumber = (step: number) => {
    setDemoStep(step);
  };

  const toggleDemoAutoPlay = () => {
    setDemoAutoPlay((prev) => !prev);
  };

  const exitDemoTour = () => {
    setDemoActive(false);
    setDemoAutoPlay(false);
  };

  // Demo auto-play interval
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (demoActive && demoAutoPlay) {
      timer = setInterval(() => {
        setDemoStep((prev) => {
          if (prev >= 20) {
            setDemoAutoPlay(false);
            return 20;
          }
          return prev + 1;
        });
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [demoActive, demoAutoPlay]);

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        candidate,
        jobs,
        applications,
        messages,
        auditResult,
        selectedLanguage,
        setSelectedLanguage,
        currentAssessmentSkill,
        setCurrentAssessmentSkill,
        latestEvaluation,
        setLatestEvaluation,
        claimNewSkill,
        recordCompletedAssessment,
        applyToJob,
        sendChatMessage,
        acceptInterview,
        runFairnessAuditToggle,
        shortlistCandidate,
        requestCandidateInterview,
        demoActive,
        demoStep,
        demoSteps: DEMO_STEPS,
        demoAutoPlay,
        startDemoTour,
        nextDemoStep,
        prevDemoStep,
        setDemoStepNumber,
        toggleDemoAutoPlay,
        exitDemoTour,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
