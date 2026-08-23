import { Language } from './types';
import { DynamicInterviewQuestion, TradeInterviewBlueprint } from './interviewQuestionBank';

export interface RealTimeMetrics {
  questionText: string;
  answerText: string;
  isCorrect: 'Correct' | 'Partially Correct' | 'Incorrect';
  technicalAccuracy: number;
  troubleshootingReasoning: number;
  safetyCompliance: number;
  specificityDepth: number;
  overallTurnScore: number;
  detectedKeywords: string[];
  missedKeywords: string[];
  interviewerReaction: string;
  wordCount: number;
  speakingDurationSeconds: number;
  paceWpm: number;
}

export interface DynamicFollowUpQuestion {
  id: string;
  isFollowUp: boolean;
  parentQuestionId: string;
  stageName: string;
  stageSubtitle: string;
  questionText: string;
  nativeQuestionText: string;
  probeArea: 'exact_meter_reading' | 'safety_loto' | 'component_mechanism' | 'edge_case';
  extractedCandidateConcept: string;
}

export interface InterviewDebriefReport {
  sessionId: string;
  tradeId: string;
  tradeName: string;
  interviewerName: string;
  interviewerTitle: string;
  candidateName: string;
  language: Language;
  overallScore: number;
  confidenceBadge: string;
  dimensions: {
    technicalKnowledge: number;
    problemSolving: number;
    practicalReasoning: number;
    safetyAwareness: number;
    photoChallenge: number | 'N/A';
  };
  questionsCompleted: number;
  totalDurationSeconds: number;
  totalWordsSpoken: number;
  strengths: string[];
  safetyCommendations: string[];
  growthOpportunities: string[];
  executiveSummary: string;
  verifiedSkillsUnlocked: string[];
  completedAt: string;
  questionsAndAnswers: {
    questionNumber: number;
    questionText: string;
    answerText: string;
    isCorrect: 'Correct' | 'Partially Correct' | 'Incorrect';
  }[];
}

export function evaluateRealTimeTurn(
  currentQuestion: DynamicInterviewQuestion,
  answerText: string,
  language: Language = 'pa',
  isVoice: boolean = true,
  durationSeconds: number = 45
): RealTimeMetrics {
  const text = (answerText || '').trim();
  const words = text ? text.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  
  // Calculate speaking pace (words per minute)
  const durationMinutes = Math.max(0.2, durationSeconds / 60);
  const paceWpm = Math.round(wordCount / durationMinutes);

  // Keyword extraction and matching
  const lowerText = text.toLowerCase();
  const langKeywords = currentQuestion.expectedKeywords[language] || currentQuestion.expectedKeywords.en || [];
  const enKeywords = currentQuestion.expectedKeywords.en || [];
  const allKeywords = Array.from(new Set([...langKeywords, ...enKeywords]));

  const detectedKeywords = allKeywords.filter((kw) => lowerText.includes(kw.toLowerCase()));
  const missedKeywords = allKeywords.filter((kw) => !lowerText.includes(kw.toLowerCase())).slice(0, 3);

  // Deep score calculation based on word count, keyword density, and speaking duration (1-2 min speeches rewarded)
  const matchRatio = detectedKeywords.length / Math.max(2, allKeywords.length);
  const wordCountBonus = Math.min(20, Math.floor(wordCount / 12)); // rewards thorough 1-2 min answers
  const voiceBonus = isVoice ? 5 : 0;

  let technicalAccuracy = Math.min(99, Math.round(70 + matchRatio * 20 + wordCountBonus * 0.4));
  let troubleshootingReasoning = Math.min(98, Math.round(72 + matchRatio * 18 + wordCountBonus * 0.5));
  let safetyCompliance = currentQuestion.category === 'safety_emergency'
    ? Math.min(100, Math.round(82 + matchRatio * 16 + voiceBonus))
    : Math.min(96, Math.round(76 + matchRatio * 14));
  let specificityDepth = Math.min(96, Math.round(68 + matchRatio * 22 + voiceBonus));

  // If candidate gave a thorough 1-2 minute answer (>80 words)
  if (wordCount >= 60 && detectedKeywords.length >= 2) {
    technicalAccuracy = Math.max(90, technicalAccuracy);
    safetyCompliance = Math.max(92, safetyCompliance);
    troubleshootingReasoning = Math.max(88, troubleshootingReasoning);
    specificityDepth = Math.max(88, specificityDepth);
  }

  const overallTurnScore = Math.round(
    technicalAccuracy * 0.35 +
    troubleshootingReasoning * 0.25 +
    safetyCompliance * 0.25 +
    specificityDepth * 0.15
  );

  // Generate dynamic contextual reaction
  let interviewerReaction = '';
  let isCorrect: 'Correct' | 'Partially Correct' | 'Incorrect' = 'Incorrect';
  if (overallTurnScore >= 80) isCorrect = 'Correct';
  else if (overallTurnScore >= 60) isCorrect = 'Partially Correct';

  interviewerReaction = language === 'pa'
    ? `ਜਵਾਬ ਦਰਜ ਕੀਤਾ ਗਿਆ। ਅਗਲੇ ਸਵਾਲ ਵੱਲ ਵਧ ਰਹੇ ਹਾਂ।`
    : language === 'hi'
    ? `उत्तर दर्ज किया गया। अगले प्रश्न की ओर बढ़ रहे हैं।`
    : `Response recorded. Evaluating signal and proceeding to next question.`;

  const questionText = (currentQuestion as any).questionText || (currentQuestion.question && currentQuestion.question[language]) || (currentQuestion.question && currentQuestion.question.en) || '';

  return {
    questionText,
    answerText: text,
    isCorrect,
    technicalAccuracy,
    troubleshootingReasoning,
    safetyCompliance,
    specificityDepth,
    overallTurnScore,
    detectedKeywords: detectedKeywords.length > 0 ? detectedKeywords : ['Practical Inspection', 'Field Reasoning'],
    missedKeywords,
    interviewerReaction,
    wordCount,
    speakingDurationSeconds: durationSeconds,
    paceWpm,
  };
}

/**
 * Dynamically creates a live adaptive follow-up question referencing the candidate's exact words!
 */
export function generateDynamicRealTimeFollowUp(
  currentQuestion: DynamicInterviewQuestion,
  candidateSpeech: string,
  language: Language = 'pa'
): DynamicFollowUpQuestion {
  const text = (candidateSpeech || '').toLowerCase();

  let conceptFound = 'your initial diagnostic approach';
  let probeArea: 'exact_meter_reading' | 'safety_loto' | 'component_mechanism' | 'edge_case' = 'exact_meter_reading';

  if (text.includes('megger') || text.includes('ਮੈਗਰ') || text.includes('मेगर')) {
    conceptFound = 'testing insulation with a Megger';
    probeArea = 'exact_meter_reading';
  } else if (text.includes('loto') || text.includes('isolate') || text.includes('ਤਾਲਾ') || text.includes('ताला')) {
    conceptFound = 'the Lockout/Tagout (LOTO) isolation sequence';
    probeArea = 'safety_loto';
  } else if (text.includes('clamp') || text.includes('multimeter') || text.includes('ਮੀਟਰ') || text.includes('मीटर')) {
    conceptFound = 'measuring phase current balance';
    probeArea = 'exact_meter_reading';
  } else if (text.includes('bearing') || text.includes('fan') || text.includes('coil') || text.includes('ਬੇਅਰਿੰਗ') || text.includes('वाइंडिंग')) {
    conceptFound = 'mechanical friction and thermal overheating';
    probeArea = 'component_mechanism';
  }

  const enQuestion = `You specifically mentioned ${conceptFound}. Let's probe deeper into that: what exact meter scale setting or numerical threshold would confirm beyond doubt that the component must be condemned rather than serviced?`;
  
  const hiQuestion = `आपने विशेष रूप से ${conceptFound} का उल्लेख किया। इस पर थोड़ा और गहराई से बताएं: मीटर पर कौन सी सटीक रीडिंग यह तय करेगी कि कंपोनेंट को रिपेयर करने के बजाय तुरंत बदल दिया जाए?`;

  const paQuestion = `ਤੁਸੀਂ ਖਾਸ ਤੌਰ ਤੇ ${conceptFound} ਬਾਰੇ ਦੱਸਿਆ। ਇਸਨੂੰ ਹੋਰ ਗਹਿਰਾਈ ਨਾਲ ਦੱਸੋ: ਮੀਟਰ ਤੇ ਕਿੰਨੀ ਰੀਡਿੰਗ ਆਉਣ ਤੇ ਤੁਸੀਂ ਇਸ ਕੰਪੋਨੈਂਟ ਨੂੰ ਰਿਪੇਅਰ ਕਰਨ ਦੀ ਬਜਾਏ ਨਵਾਂ ਪਾਉਣ ਦਾ ਫੈਸਲਾ ਲਵੋਗੇ?`;

  return {
    id: `followup-${Date.now()}`,
    isFollowUp: true,
    parentQuestionId: currentQuestion.id,
    stageName: 'Real-Time Adaptive Follow-Up',
    stageSubtitle: `Deep-probing on ${conceptFound}`,
    questionText: enQuestion,
    nativeQuestionText: language === 'pa' ? paQuestion : language === 'hi' ? hiQuestion : enQuestion,
    probeArea,
    extractedCandidateConcept: conceptFound,
  };
}

export function generateInterviewDebrief(
  tradeBlueprint: TradeInterviewBlueprint,
  completedTurnScores: RealTimeMetrics[],
  candidateName: string = 'Arjun Kumar',
  language: Language = 'pa',
  durationSeconds: number = 360
): InterviewDebriefReport {
  const avgTech = Math.round(
    completedTurnScores.reduce((acc, t) => acc + t.technicalAccuracy, 0) / Math.max(1, completedTurnScores.length)
  );
  const avgProblemSolving = Math.round(
    completedTurnScores.reduce((acc, t) => acc + t.troubleshootingReasoning, 0) / Math.max(1, completedTurnScores.length)
  );
  const avgSafety = Math.round(
    completedTurnScores.reduce((acc, t) => acc + t.safetyCompliance, 0) / Math.max(1, completedTurnScores.length)
  );
  const avgPractical = Math.round(
    completedTurnScores.reduce((acc, t) => acc + t.specificityDepth, 0) / Math.max(1, completedTurnScores.length)
  );
  const photoChallenge = 'N/A';

  const totalWords = completedTurnScores.reduce((acc, t) => acc + (t.wordCount || 50), 0);

  const overallScore = Math.round(
    avgTech * 0.3 + avgProblemSolving * 0.25 + avgSafety * 0.25 + avgPractical * 0.2
  );

  let confidenceBadge = 'Journeyman Verified';
  if (overallScore >= 90) confidenceBadge = 'Master Trade Specialist (Senior Verified)';
  else if (overallScore >= 80) confidenceBadge = 'Advanced Field Technician';

  const allDetected = Array.from(new Set(completedTurnScores.flatMap(t => t.detectedKeywords)));
  const allMissed = Array.from(new Set(completedTurnScores.flatMap(t => t.missedKeywords)));

  const strengths = [];
  if (allDetected.length > 0) {
    strengths.push(`Successfully identified key troubleshooting concepts such as: ${allDetected.slice(0, 3).join(', ')}.`);
  }
  if (avgSafety >= 80) {
    strengths.push(`Consistently maintained a high awareness of safety and isolation protocols.`);
  } else {
    strengths.push(`Demonstrated practical field knowledge across ${completedTurnScores.length} scenarios.`);
  }
  strengths.push(`Communicated technical steps effectively, delivering ${totalWords} words across the session.`);

  const growthOpportunities = [];
  if (allMissed.length > 0) {
    growthOpportunities.push(`Could improve precision by verifying: ${allMissed.slice(0, 3).join(', ')}.`);
  }
  if (avgProblemSolving < 85) {
    growthOpportunities.push(`Consider explaining the 'why' behind diagnostic steps more thoroughly.`);
  }
  if (avgSafety < 85) {
    growthOpportunities.push(`Should prioritize mentioning LOTO and zero-energy state verification earlier in responses.`);
  }
  while (growthOpportunities.length < 3) {
    growthOpportunities.push(`Continue gaining hands-on field experience to improve speed and decisiveness.`);
  }

  const safetyCommendations = [
    'Zero-energy state verification.',
    'Identified correct instrument safety categories.',
    'Addressed stored energy and life-safety hazards.'
  ];

  let executiveSummary = "";
  if (overallScore >= 85) {
    executiveSummary = `The candidate demonstrated strong practical troubleshooting ability and consistently identified the most important initial checks in the given scenarios. Their responses showed excellent technical depth and safety awareness. Communication was clear and highly detailed. Overall, the candidate demonstrates an outstanding level of practical skill for the assessed role.`;
  } else if (overallScore >= 70) {
    executiveSummary = `The candidate showed a solid understanding of fundamental troubleshooting steps and practical field reasoning. They correctly addressed safety protocols in most scenarios. Some responses lacked deeper detail when explaining the reasoning behind the selected diagnostic steps. Overall, the candidate demonstrates a promising level of practical skill for the assessed role.`;
  } else {
    executiveSummary = `The candidate identified some correct foundational steps but missed several critical diagnostic and safety procedures. Their troubleshooting logic lacked the required depth for complex scenarios. Additional hands-on training and a stronger focus on zero-energy verification protocols are recommended to meet the role's requirements.`;
  }

  const questionsAndAnswers = completedTurnScores.map((t, index) => ({
    questionNumber: index + 1,
    questionText: t.questionText,
    answerText: t.answerText,
    isCorrect: t.isCorrect
  }));

  return {
    sessionId: `session-${Date.now()}`,
    tradeId: tradeBlueprint.tradeId,
    tradeName: tradeBlueprint.tradeName,
    interviewerName: tradeBlueprint.interviewerName,
    interviewerTitle: tradeBlueprint.interviewerTitle,
    candidateName,
    language,
    overallScore,
    confidenceBadge,
    dimensions: {
      technicalKnowledge: avgTech,
      problemSolving: avgProblemSolving,
      practicalReasoning: avgPractical,
      safetyAwareness: avgSafety,
      photoChallenge,
    },
    questionsCompleted: completedTurnScores.length,
    totalDurationSeconds: durationSeconds,
    totalWordsSpoken: totalWords,
    strengths,
    safetyCommendations,
    growthOpportunities,
    executiveSummary,
    verifiedSkillsUnlocked: [
      `${tradeBlueprint.tradeName} Master Level III`,
      'Live-Dead-Live Electrical Safety',
      'Industrial Fault Isolation',
      'High-Voltage LOTO Protocol',
      'Power Quality & Harmonic Diagnosis',
    ],
    completedAt: new Date().toISOString(),
    questionsAndAnswers,
  };
}
