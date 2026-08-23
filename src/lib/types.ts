export type Language = 'en' | 'hi' | 'pa';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी' },
  { code: 'pa', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ' },
];

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type QuestionType =
  | 'Basic concept'
  | 'Real-world troubleshooting'
  | 'Safety scenario'
  | 'Fault identification'
  | 'Scenario reasoning'
  | 'Image-based'
  | 'Follow-up'
  | 'Practical decision-making'
  | 'Conceptual';

// Hidden key point concept for semantic matching across languages
export interface KeyPointConcept {
  id: string;
  label: string; // e.g. "Check supply voltage and line balance"
  semanticTriggers: {
    en: string[];
    hi: string[];
    pa: string[];
    hinglish?: string[];
  };
  explanation: string;
}

// Hidden critical safety point (failure to mention or violating gives heavy penalty)
export interface CriticalSafetyPoint {
  id: string;
  label: string; // e.g. "Isolate power and LOTO before touching terminals"
  semanticTriggers: {
    en: string[];
    hi: string[];
    pa: string[];
    hinglish?: string[];
  };
  explanation: string;
}

// Hidden misconceptions / hazardous actions that actively penalize score
export interface IncorrectMisconception {
  id: string;
  label: string; // e.g. "Increase supply voltage or bypass breaker"
  semanticTriggers: {
    en: string[];
    hi: string[];
    pa: string[];
    hinglish?: string[];
  };
  penaltyScore: number;
  explanation: string;
}

export interface ScenarioQuestion {
  id: string;
  skill: string;
  topic: string;
  difficulty: DifficultyLevel;
  questionType: QuestionType;
  language: Language;
  questionText: {
    en: string;
    hi: string;
    pa: string;
  };
  contextScenario?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageHotspots?: { x: number; y: number; label: string; issueDescription: string }[];
  
  // HIDDEN EVALUATION CRITERIA (never shown to candidate before answering)
  keyPoints: KeyPointConcept[];
  criticalPoints: CriticalSafetyPoint[];
  incorrectPoints: IncorrectMisconception[];
  
  // Sample voice transcripts for demo simulation
  sampleVoiceTranscript?: {
    pa: string;
    hi: string;
    en: string;
  };
  sampleWeakVoiceTranscript?: {
    pa: string;
    hi: string;
    en: string;
  };
  sampleWrongVoiceTranscript?: {
    pa: string;
    hi: string;
    en: string;
  };
}

// Strict point breakdown: Tech 40, KeyPoints 25, Reasoning 15, Safety 10, Specificity 10 = Total 100
export interface AssessmentScores {
  technicalScore: number;     // 0 - 40 pts
  keyPointScore: number;      // 0 - 25 pts
  reasoningScore: number;     // 0 - 15 pts
  safetyScore: number;        // 0 - 10 pts
  specificityScore: number;   // 0 - 10 pts
  overallScore: number;       // 0 - 100%
}

export interface EvaluationResult {
  id: string;
  questionId: string;
  questionText: string;
  answerText: string;
  isVoice: boolean;
  audioDurationSeconds?: number;
  transcript: string;
  language: Language;
  translatedText?: string;
  scores: AssessmentScores;
  assessmentConfidence: number; // 0 - 100% (confidence in measurement reliability)
  
  // Key point breakdown
  matchedKeyPoints?: string[];
  missingKeyPoints?: string[];
  incorrectPointsFound?: string[];
  isCriticalSafetyPassed?: boolean;
  isMeaninglessOrEmpty?: boolean;

  strengths: string[];
  weaknesses: string[];
  feedback: string;
  nextDifficulty: DifficultyLevel;
  safetyPointsAddressed?: string[];
  expectedConceptsMet?: string[];
  evaluatedAt: string;
}

export interface FinalSkillAssessmentReport {
  sessionId: string;
  skillName: string;
  candidateName: string;
  language: Language;
  totalQuestions: number;
  completedQuestions: number;
  overallSkillScore: number;        // Actual earned skill score (0-100%)
  assessmentConfidence: number;    // Reliability confidence (0-100%)
  performanceTier: 'Needs Foundation' | 'Developing' | 'Competent' | 'Good' | 'Master Trade Specialist';
  
  // Dimension averages
  technicalKnowledgePercent: number;
  troubleshootingReasoningPercent: number;
  safetyCompliancePercent: number;
  specificityPercent: number;

  allMatchedKeyPoints: string[];
  allMissingKeyPoints: string[];
  allIncorrectPointsFound: string[];
  criticalSafetyStatus: 'Passed' | 'Critical Safety Failure';

  strengths: string[];
  growthOpportunities: string[];
  executiveSummary: string;
  completedAt: string;
}

export interface VerifiedSkill {
  name: string;
  category: string;
  confidenceScore: number;
  assessmentsCount: number;
  lastAssessed: string;
  status: 'verified' | 'in_progress' | 'claimed';
  breakdown: {
    technical: number;
    troubleshooting: number;
    safety: number;
    practicalReasoning: number;
  };
  evidenceSummary: string;
}

export interface PeerReference {
  id: string;
  name: string;
  role: string;
  company: string;
  relationship: string;
  quote: string;
  rating: number;
  verifiedAt: string;
  status: 'verified' | 'pending';
}

export interface Candidate {
  id: string;
  name: string;
  headline: string;
  trade: string;
  avatarUrl?: string;
  location: string;
  overallConfidence: number;
  experienceYears: number;
  languages: Language[];
  skills: VerifiedSkill[];
  completedAssessments: EvaluationResult[];
  references: PeerReference[];
  bio: string;
  badges: string[];
  phone: string;
  email: string;
}

export interface JobMatchBreakdown {
  skillsScore: number;
  experienceScore: number;
  evidenceScore: number;
  locationScore: number;
  totalMatch: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  logo?: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Part-time' | 'Apprenticeship';
  salaryRange: string;
  requiredSkills: string[];
  preferredExperienceYears: number;
  description: string;
  responsibilities: string[];
  safetyCertificationsPreferred?: string[];
  matchScoreForArjun?: JobMatchBreakdown;
  postedDate: string;
  urgency: 'Immediate' | 'Regular';
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: 'Applied' | 'Reviewing' | 'Interview Requested' | 'Shortlisted' | 'Hired' | 'Rejected';
  matchScore: number;
  interviewDate?: string;
  interviewNotes?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: 'candidate' | 'recruiter' | 'ai';
  senderAvatar?: string;
  receiverId: string;
  type: 'text' | 'voice' | 'interview_invite';
  text?: string;
  audioDuration?: number;
  transcript?: string;
  translatedTranscript?: string;
  language?: Language;
  timestamp: string;
  isRead: boolean;
  interviewDetails?: {
    jobTitle: string;
    proposedTime: string;
    location: string;
    accepted?: boolean;
  };
}

export interface CandidateRankAuditItem {
  id: string;
  candidateName: string;
  trade: string;
  experienceYears: number;
  avatarUrl?: string;
  beforeRank: number;
  beforeScore: number;
  beforeSignals: {
    employmentGapPenalty: number;
    collegeTierBonus: number;
    resumePrestigeBonus: number;
    languagePenalty: number;
    verifiedSkillsContribution: number;
    experienceContribution: number;
  };
  afterRank: number;
  afterScore: number;
  afterSignals: {
    verifiedSkillsContribution: number;
    experienceContribution: number;
    assessmentEvidenceContribution: number;
    jobRequirementsContribution: number;
    nonJobRelevantSignalsRemoved: number;
  };
  status: 'Strong Match' | 'Review' | 'Qualified' | 'Top Contender';
  keyEvidence: string;
  languages: Language[];
}

export interface BiasAuditSummary {
  jobId: string;
  jobTitle: string;
  totalApplicants: number;
  signalsRemoved: string[];
  signalsPreserved: string[];
  averageRankShift: number;
  underrepresentedBoostPercentage: number;
  disclaimer: string;
}

export interface DemoStep {
  stepNumber: number;
  title: string;
  description: string;
  targetView: 'landing' | 'candidate-claim' | 'candidate-verify' | 'candidate-interview' | 'candidate-profile' | 'candidate-jobs' | 'recruiter-dashboard' | 'recruiter-candidates' | 'recruiter-bias-audit' | 'recruiter-messages';
  actionPrompt: string;
  highlightSelector?: string;
  autoActionPayload?: Record<string, unknown>;
}
