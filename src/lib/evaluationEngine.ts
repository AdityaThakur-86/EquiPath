import {
  DifficultyLevel,
  EvaluationResult,
  FinalSkillAssessmentReport,
  Language,
  ScenarioQuestion,
  KeyPointConcept,
  CriticalSafetyPoint,
  IncorrectMisconception,
} from './types';

export interface EvaluateAnswerInput {
  question: ScenarioQuestion;
  answer?: string;
  answerText?: string;
  language?: Language;
  isVoice?: boolean;
  audioDurationSeconds?: number;
  transcript?: string;
  translatedText?: string;
}

// Common empty or "I don't know" phrases across English, Hindi, Punjabi, and Hinglish
const EMPTY_AND_IDK_PATTERNS = [
  // English
  "i don't know",
  "i dont know",
  "dont know",
  "don't know",
  "no idea",
  "not sure",
  "no clue",
  "idk",
  "dunno",
  "skip",
  "pass",
  "nothing",
  "can't answer",
  "cannot answer",
  // Hindi & Hinglish
  "pata nahi",
  "pata nhi",
  "mujhe nahi pata",
  "maloom nahi",
  "kuch nahi pata",
  "nahi maloom",
  "nahi pata",
  "no idea sir",
  "nhi pta",
  // Punjabi & Panjabi Romanized
  "ਨਹੀਂ ਪਤਾ",
  "ਮੈਨੂੰ ਨਹੀਂ ਪਤਾ",
  "ਕੋਈ ਅੰਦਾਜ਼ਾ ਨਹੀਂ",
  "ਕੁਝ ਨਹੀਂ ਪਤਾ",
  "mainu nahi pata",
  "mainu nhi pta",
  "kujh nahi pata",
  "koi andaza nahi",
];

// Meaningless keyboard gibberish or extremely short fillers
function isGibberishOrMeaningless(text: string): boolean {
  const clean = text.trim().toLowerCase();
  if (clean.length < 4) return true;

  // Single word repeated or keys mashed like "asdfgh", "abc", "xyz"
  const mashingRegex = /^(.)\1{3,}$|^[asdfghjklqwertyuiopzxcvbnm]{1,5}$/i;
  if (mashingRegex.test(clean)) return true;

  return EMPTY_AND_IDK_PATTERNS.some((pattern) => clean === pattern || clean.startsWith(pattern + '.') || clean.startsWith(pattern + ','));
}

/**
 * Strict, Evidence-Based Answer Evaluator
 * Evaluates semantic equivalence across English, Hindi, Punjabi, and Hinglish.
 */
export function evaluateAnswer(input: EvaluateAnswerInput): EvaluationResult {
  const { question, answer, answerText, language = 'pa', isVoice = false, audioDurationSeconds, transcript, translatedText } = input;
  const rawText = (transcript || answerText || answer || '').trim();
  const lowerText = rawText.toLowerCase();

  // 1. EMPTY OR MEANINGLESS / "I DON'T KNOW" CHECK
  if (!rawText || isGibberishOrMeaningless(rawText)) {
    const missingKeys = question.keyPoints?.map((kp) => kp.label) || [];
    return {
      id: `eval-${Date.now()}`,
      questionId: question.id,
      questionText: question.questionText[language] || question.questionText.en,
      answerText: rawText || '(No answer provided)',
      isVoice,
      audioDurationSeconds: audioDurationSeconds || (isVoice ? 3 : undefined),
      transcript: rawText || '(No answer provided)',
      language,
      translatedText: '(No answer provided)',
      scores: {
        technicalScore: 0,
        keyPointScore: 0,
        reasoningScore: 0,
        safetyScore: 0,
        specificityScore: 0,
        overallScore: 0,
      },
      assessmentConfidence: 94, // High confidence that candidate could not answer
      matchedKeyPoints: [],
      missingKeyPoints: missingKeys,
      incorrectPointsFound: [],
      isCriticalSafetyPassed: false,
      isMeaninglessOrEmpty: true,
      strengths: [],
      weaknesses: [
        'No valid technical steps, diagnostic logic, or safety precautions were provided.',
        'The candidate skipped or stated lack of knowledge on this question.',
      ],
      feedback: 'No valid answer provided. The question was skipped or unanswered (Score: 0%).',
      nextDifficulty: 'Beginner',
      evaluatedAt: new Date().toISOString(),
    };
  }

  // 2. SEMANTIC KEY POINT MATCHING (English, Hindi, Punjabi, Hinglish)
  const matchedKeyPoints: string[] = [];
  const missingKeyPoints: string[] = [];
  let keyPointsEarnedWeight = 0;
  const totalKeyPoints = question.keyPoints?.length || 1;

  if (question.keyPoints && question.keyPoints.length > 0) {
    for (const kp of question.keyPoints) {
      const enTriggers = kp.semanticTriggers.en || [];
      const hiTriggers = kp.semanticTriggers.hi || [];
      const paTriggers = kp.semanticTriggers.pa || [];
      const hinglishTriggers = kp.semanticTriggers.hinglish || [];
      const allTriggers = [...enTriggers, ...hiTriggers, ...paTriggers, ...hinglishTriggers];

      const isMatched = allTriggers.some((trigger) => lowerText.includes(trigger.toLowerCase()));
      if (isMatched) {
        matchedKeyPoints.push(kp.label);
        keyPointsEarnedWeight += 1;
      } else {
        missingKeyPoints.push(kp.label);
      }
    }
  }

  const keyPointRatio = matchedKeyPoints.length / totalKeyPoints;

  // 3. INCORRECT INFORMATION & MISCONCEPTIONS PENALTY
  const incorrectPointsFound: string[] = [];
  let totalIncorrectPenalty = 0;

  if (question.incorrectPoints && question.incorrectPoints.length > 0) {
    for (const inc of question.incorrectPoints) {
      const enTriggers = inc.semanticTriggers.en || [];
      const hiTriggers = inc.semanticTriggers.hi || [];
      const paTriggers = inc.semanticTriggers.pa || [];
      const hinglishTriggers = inc.semanticTriggers.hinglish || [];
      const allTriggers = [...enTriggers, ...hiTriggers, ...paTriggers, ...hinglishTriggers];

      const isFound = allTriggers.some((trigger) => lowerText.includes(trigger.toLowerCase()));
      if (isFound) {
        incorrectPointsFound.push(inc.label);
        totalIncorrectPenalty += inc.penaltyScore || 25;
      }
    }
  }

  // 4. CRITICAL SAFETY VERIFICATION
  let isCriticalSafetyPassed = true;
  let criticalSafetyMentioned = false;

  const safetyKeywords = [
    'isolate', 'power off', 'turn off', 'loto', 'lock out', 'tag out', 'lockout', 'padlock',
    'zero energy', 'de-energize', 'disconnect', 'breaker off', 'live dead live', 'ppe', 'gloves',
    'ਬੰਦ', 'ਸਪਲਾਈ ਬੰਦ', 'ਤਾਲਾ', 'ਆਈਸੋਲੇਟ', 'ਸੁਰੱਖਿਆ', 'ਦਸਤਾਨੇ', 'ਪਾਵਰ ਕੱਟ',
    'सप्लाई बंद', 'पावर कट', 'आइसोलेट', 'ताला', 'सुरक्षा', 'दस्ताने', 'एलओटीओ'
  ];

  if (safetyKeywords.some((kw) => lowerText.includes(kw))) {
    criticalSafetyMentioned = true;
  }

  if (question.criticalPoints && question.criticalPoints.length > 0) {
    for (const cp of question.criticalPoints) {
      const enTriggers = cp.semanticTriggers.en || [];
      const hiTriggers = cp.semanticTriggers.hi || [];
      const paTriggers = cp.semanticTriggers.pa || [];
      const hinglishTriggers = cp.semanticTriggers.hinglish || [];
      const allTriggers = [...enTriggers, ...hiTriggers, ...paTriggers, ...hinglishTriggers];

      const isSafetyMet = allTriggers.some((trigger) => lowerText.includes(trigger.toLowerCase()));
      if (isSafetyMet) {
        criticalSafetyMentioned = true;
      }
    }
  }

  // If candidate mentioned touching live wires without isolation or dangerous breaker bypass
  const hazardousTriggers = ['touch live', 'increase voltage', 'bypass breaker', 'force hold breaker', 'fuse तार मोटी ਲਗਾਓ', 'नंगे हाथ'];
  if (hazardousTriggers.some((hz) => lowerText.includes(hz))) {
    isCriticalSafetyPassed = false;
  }

  // 5. CAUSAL REASONING & WHY EXPLANATIONS (15 Points Max)
  const reasoningIndicators = [
    'because', 'due to', 'since', 'so that', 'to prevent', 'to check if', 'which causes', 'as a result',
    'ਕਿਉਂਕਿ', 'ਤਾਂ ਜੋ', 'ਇਸ ਕਰਕੇ', 'ਜਿਸ ਨਾਲ', 'ਤਾਂ ਕਿ',
    'क्योंकि', 'ताकि', 'जिससे', 'के कारण', 'इसलिए',
    'kyunki', 'taki', 'isse', 'ke karan', 'jis se'
  ];
  const hasCausalReasoning = reasoningIndicators.some((ri) => lowerText.includes(ri));

  // 6. SPECIFICITY & JARGON (10 Points Max)
  const specificTermsRegex = /\b(\d+v|\d+a|\d+kw|\d+hp|\d+hz|\d+°c|\d+°f|cat-[i|v]+|megger|multimeter|flc|txv|loto|mcb|mccb|415v|230v|1000v)\b/i;
  const hasSpecificNumbersOrTools = specificTermsRegex.test(lowerText) || lowerText.includes('multimeter') || lowerText.includes('megger') || lowerText.includes('clamp meter') || lowerText.includes('ਮਲਟੀਮੀਟਰ') || lowerText.includes('ਮੈਗਰ') || lowerText.includes('मल्टीमीटर') || lowerText.includes('मेगर');

  // 7. COMPONENT POINT CALCULATIONS (Total = 100 Max)
  // Technical Correctness: 0 - 40
  let technicalScore = 0;
  if (keyPointRatio > 0) {
    technicalScore = Math.round(keyPointRatio * 35 + (hasCausalReasoning ? 5 : 0));
  } else if (lowerText.length > 30 && !incorrectPointsFound.length) {
    technicalScore = 10; // general conversational attempt
  }

  // Key Points: 0 - 25
  const keyPointScore = Math.round(keyPointRatio * 25);

  // Reasoning: 0 - 15
  let reasoningScore = 0;
  if (keyPointRatio > 0) {
    reasoningScore = hasCausalReasoning ? 15 : Math.round(keyPointRatio * 10);
  }

  // Safety: 0 - 10
  let safetyScore = 0;
  if (!isCriticalSafetyPassed) {
    safetyScore = 0;
  } else if (criticalSafetyMentioned) {
    safetyScore = 10;
  } else if (keyPointRatio > 0.5) {
    safetyScore = 6; // implied safe approach
  } else {
    safetyScore = 3;
  }

  // Specificity: 0 - 10
  let specificityScore = 0;
  if (keyPointRatio > 0) {
    specificityScore = hasSpecificNumbersOrTools ? 10 : Math.round(keyPointRatio * 6 + (isVoice ? 2 : 0));
  }

  // Apply Incorrect Penalty
  technicalScore = Math.max(0, technicalScore - totalIncorrectPenalty);
  safetyScore = Math.max(0, safetyScore - (incorrectPointsFound.length > 0 ? 5 : 0));

  let rawOverallScore = technicalScore + keyPointScore + reasoningScore + safetyScore + specificityScore;

  // 8. STRICT SCORE BANDS & CAPS
  // - Completely wrong / hazardous: 0–20%
  // - Irrelevant: 0–15%
  // - Very weak (0 key points): 20–40%
  // - Partially correct (1-2 key points): 40–65%
  // - Good (majority key points): 65–85%
  // - Strong (all key points + safety): 85–100%
  if (incorrectPointsFound.length > 0 && keyPointRatio === 0) {
    rawOverallScore = Math.min(20, Math.max(5, rawOverallScore));
  } else if (!isCriticalSafetyPassed) {
    rawOverallScore = Math.min(30, rawOverallScore);
  } else if (matchedKeyPoints.length === 0) {
    rawOverallScore = Math.min(25, rawOverallScore);
  } else if (keyPointRatio < 0.5) {
    rawOverallScore = Math.min(60, Math.max(35, rawOverallScore));
  } else if (keyPointRatio < 0.8) {
    rawOverallScore = Math.min(84, Math.max(62, rawOverallScore));
  } else {
    rawOverallScore = Math.min(98, Math.max(85, rawOverallScore));
  }

  const finalScore = Math.max(0, Math.min(100, Math.round(rawOverallScore)));

  // 9. NEXT ADAPTIVE DIFFICULTY
  let nextDifficulty: DifficultyLevel = question.difficulty;
  if (finalScore >= 85) {
    nextDifficulty = 'Advanced';
  } else if (finalScore >= 65) {
    nextDifficulty = 'Intermediate';
  } else if (finalScore >= 40) {
    nextDifficulty = 'Intermediate';
  } else {
    nextDifficulty = 'Beginner';
  }

  // 10. STRENGTHS & WEAKNESSES GENERATION
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (matchedKeyPoints.length > 0) {
    strengths.push(`Identified core diagnostic checks: ${matchedKeyPoints.join(', ')}.`);
  }
  if (hasCausalReasoning) {
    strengths.push('Provided clear cause-and-effect reasoning explaining why the checks are necessary.');
  }
  if (criticalSafetyMentioned && isCriticalSafetyPassed) {
    strengths.push('Demonstrated proactive electrical safety and power isolation protocols.');
  }
  if (hasSpecificNumbersOrTools) {
    strengths.push('Referenced appropriate test equipment (e.g. Multimeter, Megger, or calibrated ratings).');
  }

  if (missingKeyPoints.length > 0) {
    weaknesses.push(`Missed investigating key areas: ${missingKeyPoints.join(', ')}.`);
  }
  if (incorrectPointsFound.length > 0) {
    weaknesses.push(`Included inaccurate or hazardous actions: ${incorrectPointsFound.join(', ')}.`);
  }
  if (!criticalSafetyMentioned && isCriticalSafetyPassed) {
    weaknesses.push('Could explicitly emphasize zero-energy verification (LOTO) before physical contact.');
  }

  // 11. FEEDBACK SYNTHESIS (MULTILINGUAL PA / HI / EN)
  let feedback = '';
  if (language === 'pa') {
    if (finalScore >= 85) {
      feedback = `ਸ਼ਾਨਦਾਰ ਉੱਤਰ (${finalScore}%)। ਤੁਸੀਂ ਸੁਰੱਖਿਆ ਨਿਯਮਾਂ ਦੀ ਪਾਲਣਾ ਕਰਦੇ ਹੋਏ ${matchedKeyPoints.length} ਮੁੱਖ ਤਕਨੀਕੀ ਨੁਕਤੇ ਸਹੀ ਦੱਸੇ ਹਨ।`;
    } else if (finalScore >= 65) {
      feedback = `ਚੰਗਾ ਤਕਨੀਕੀ ਉੱਤਰ (${finalScore}%)। ਤੁਸੀਂ ${matchedKeyPoints.slice(0, 2).join(' ਅਤੇ ')} ਸਹੀ ਚੈੱਕ ਕੀਤਾ, ਪਰ ${missingKeyPoints.slice(0, 1).join('')} ਵੱਲ ਧਿਆਨ ਨਹੀਂ ਦਿੱਤਾ।`;
    } else if (finalScore >= 40) {
      feedback = `ਅੰਸ਼ਕ ਤੌਰ ਤੇ ਸਹੀ ਉੱਤਰ (${finalScore}%)। ਤੁਸੀਂ ਕੁਝ ਨੁਕਤੇ ਦੱਸੇ ਹਨ ਪਰ ${missingKeyPoints.slice(0, 2).join(' ਅਤੇ ')} ਚੈੱਕ ਕਰਨਾ ਜ਼ਰੂਰੀ ਸੀ।`;
    } else if (incorrectPointsFound.length > 0) {
      feedback = `ਗਲਤ / ਖ਼ਤਰਨਾਕ ਕਦਮ (${finalScore}%)। ਤੁਹਾਡੇ ਦੁਆਰਾ ਦੱਸਿਆ ਗਿਆ ਤਰੀਕਾ (${incorrectPointsFound.join(', ')}) ਮੋਟਰ ਜਾਂ ਸੁਰੱਖਿਆ ਲਈ ਖਤਰਨਾਕ ਹੈ।`;
    } else {
      feedback = `ਕਮਜ਼ੋਰ ਉੱਤਰ (${finalScore}%)। ਇਸ ਵਿੱਚ ਮੁੱਖ ਤਕਨੀਕੀ ਜਾਂਚਾਂ (${missingKeyPoints.slice(0, 2).join(', ')}) ਦੀ ਘਾਟ ਸੀ।`;
    }
  } else if (language === 'hi') {
    if (finalScore >= 85) {
      feedback = `उत्कृष्ट उत्तर (${finalScore}%)। आपने सुरक्षा मानकों का पालन करते हुए ${matchedKeyPoints.length} मुख्य तकनीकी बिंदु सही बताए।`;
    } else if (finalScore >= 65) {
      feedback = `अच्छा तकनीकी उत्तर (${finalScore}%)। आपने ${matchedKeyPoints.slice(0, 2).join(' और ')} सही जांचा, लेकिन ${missingKeyPoints.slice(0, 1).join('')} छूट गया।`;
    } else if (finalScore >= 40) {
      feedback = `आंशिक रूप से सही उत्तर (${finalScore}%)। आपने कुछ बिंदु बताए लेकिन ${missingKeyPoints.slice(0, 2).join(' और ')} देखना आवश्यक था।`;
    } else if (incorrectPointsFound.length > 0) {
      feedback = `गलत / खतरनाक कदम (${finalScore}%)। आपका सुझाव (${incorrectPointsFound.join(', ')}) दुर्घटना या उपकरण क्षति का जोखिम पैदा करता है।`;
    } else {
      feedback = `कमजोर उत्तर (${finalScore}%)। इसमें मुख्य जांच बिंदुओं (${missingKeyPoints.slice(0, 2).join(', ')}) की कमी थी।`;
    }
  } else {
    if (finalScore >= 85) {
      feedback = `Excellent answer (${finalScore}%). You demonstrated thorough practical understanding by covering ${matchedKeyPoints.length} of ${totalKeyPoints} key points with solid safety awareness.`;
    } else if (finalScore >= 65) {
      feedback = `Good diagnostic response (${finalScore}%). You correctly targeted ${matchedKeyPoints.join(' and ')}, but missed investigating ${missingKeyPoints.slice(0, 2).join(' and ')}.`;
    } else if (finalScore >= 40) {
      feedback = `Partially correct start (${finalScore}%). You identified ${matchedKeyPoints.length > 0 ? matchedKeyPoints.join(', ') : 'general context'}, but did not address ${missingKeyPoints.slice(0, 2).join(', ')}.`;
    } else if (incorrectPointsFound.length > 0) {
      feedback = `Incorrect/Hazardous proposal (${finalScore}%). The suggested action (${incorrectPointsFound.join(', ')}) creates severe equipment damage or electrical shock risks.`;
    } else {
      feedback = `Weak answer (${finalScore}%). The response did not identify the required diagnostic steps (${missingKeyPoints.slice(0, 3).join(', ')}).`;
    }
  }


  // 12. RELIABILITY CONFIDENCE
  const assessmentConfidence = rawText.length > 40 ? 92 : 84;

  return {
    id: `eval-${Date.now()}`,
    questionId: question.id,
    questionText: question.questionText[language] || question.questionText.en,
    answerText: rawText,
    isVoice,
    audioDurationSeconds: audioDurationSeconds || (isVoice ? 8 : undefined),
    transcript: rawText,
    language,
    translatedText: translatedText || rawText,
    scores: {
      technicalScore,
      keyPointScore,
      reasoningScore,
      safetyScore,
      specificityScore,
      overallScore: finalScore,
    },
    assessmentConfidence,
    matchedKeyPoints,
    missingKeyPoints,
    incorrectPointsFound,
    isCriticalSafetyPassed,
    isMeaninglessOrEmpty: false,
    strengths: strengths.length > 0 ? strengths : ['Attempted practical scenario'],
    weaknesses: weaknesses.length > 0 ? weaknesses : ['Could further elaborate on exact quantitative meter scales'],
    feedback,
    nextDifficulty,
    evaluatedAt: new Date().toISOString(),
  };
}

// Alias for evaluateAnswer matching input signature
export function evaluateAssessment(input: EvaluateAnswerInput): EvaluationResult {
  return evaluateAnswer(input);
}

/**
 * Calculates the overall comprehensive skill score across multi-question sessions
 * Applies the 6 STRICT CAPS defined in the requirements.
 */
export function calculateOverallSkillScore(
  skillName: string,
  candidateName: string = 'Arjun Kumar',
  language: Language = 'pa',
  results: EvaluationResult[]
): FinalSkillAssessmentReport {
  const completedCount = results.length;
  if (completedCount === 0) {
    return {
      sessionId: `skill-session-${Date.now()}`,
      skillName,
      candidateName,
      language,
      totalQuestions: 6,
      completedQuestions: 0,
      overallSkillScore: 0,
      assessmentConfidence: 30,
      performanceTier: 'Needs Foundation',
      technicalKnowledgePercent: 0,
      troubleshootingReasoningPercent: 0,
      safetyCompliancePercent: 0,
      specificityPercent: 0,
      allMatchedKeyPoints: [],
      allMissingKeyPoints: [],
      allIncorrectPointsFound: [],
      criticalSafetyStatus: 'Passed',
      strengths: [],
      growthOpportunities: ['No questions completed'],
      executiveSummary: 'Assessment not started.',
      completedAt: new Date().toISOString(),
    };
  }

  // Compute raw averages
  const avgTech = Math.round(
    results.reduce((acc, r) => acc + (r.scores.technicalScore / 40) * 100, 0) / completedCount
  );
  const avgReasoning = Math.round(
    results.reduce((acc, r) => acc + (r.scores.reasoningScore / 15) * 100, 0) / completedCount
  );
  const avgSafety = Math.round(
    results.reduce((acc, r) => acc + (r.scores.safetyScore / 10) * 100, 0) / completedCount
  );
  const avgSpecificity = Math.round(
    results.reduce((acc, r) => acc + (r.scores.specificityScore / 10) * 100, 0) / completedCount
  );
  const avgOverall = Math.round(
    results.reduce((acc, r) => acc + r.scores.overallScore, 0) / completedCount
  );

  // Check strict cap conditions
  const emptyCount = results.filter((r) => r.isMeaninglessOrEmpty || r.scores.overallScore === 0).length;
  const zeroKeyPointsCount = results.filter((r) => (r.matchedKeyPoints || []).length === 0).length;
  const incorrectCount = results.filter((r) => (r.incorrectPointsFound || []).length > 0).length;
  const hasSafetyFailure = results.some((r) => !r.isCriticalSafetyPassed);

  let finalSkillScore = avgOverall;

  // STRICT CAPS:
  // 1. If candidate answers fewer than 3 questions: Max = 50%
  if (completedCount < 3) {
    finalSkillScore = Math.min(50, finalSkillScore);
  }
  // 2. If candidate gives empty answers to all: Max = 10%
  if (emptyCount === completedCount) {
    finalSkillScore = 0;
  } else if (emptyCount >= Math.ceil(completedCount / 2)) {
    finalSkillScore = Math.min(25, finalSkillScore);
  }
  // 3. If candidate gets 0 key points in most questions: Max = 35%
  if (zeroKeyPointsCount >= Math.ceil(completedCount / 2)) {
    finalSkillScore = Math.min(35, finalSkillScore);
  }
  // 4. If candidate gives mostly incorrect answers: Max = 20%
  if (incorrectCount >= Math.ceil(completedCount / 2)) {
    finalSkillScore = Math.min(20, finalSkillScore);
  }
  // 5. If candidate had a critical safety failure: Max = 40%
  if (hasSafetyFailure) {
    finalSkillScore = Math.min(40, finalSkillScore);
  }

  // Assessment Confidence: reliability of the measurement
  // If completed 5-6 questions, reliability is 90%+
  let assessmentConfidence = Math.min(96, Math.round(50 + (completedCount / 6) * 44));
  if (emptyCount === completedCount) {
    assessmentConfidence = 96; // Highly confident that candidate failed
  }

  // Performance Tier
  let performanceTier: 'Needs Foundation' | 'Developing' | 'Competent' | 'Good' | 'Master Trade Specialist' = 'Competent';
  if (finalSkillScore >= 85) performanceTier = 'Master Trade Specialist';
  else if (finalSkillScore >= 70) performanceTier = 'Good';
  else if (finalSkillScore >= 50) performanceTier = 'Competent';
  else if (finalSkillScore >= 30) performanceTier = 'Developing';
  else performanceTier = 'Needs Foundation';

  // Aggregate Key Points
  const allMatchedKeyPoints = Array.from(new Set(results.flatMap((r) => r.matchedKeyPoints || [])));
  const allMissingKeyPoints = Array.from(new Set(results.flatMap((r) => r.missingKeyPoints || [])));
  const allIncorrectPointsFound = Array.from(new Set(results.flatMap((r) => r.incorrectPointsFound || [])));

  const allStrengths = Array.from(new Set(results.flatMap((r) => r.strengths))).slice(0, 4);
  const allWeaknesses = Array.from(new Set(results.flatMap((r) => r.weaknesses))).slice(0, 4);

  const executiveSummary = `${candidateName} completed a ${completedCount}-question rigorous practical assessment for ${skillName}. The candidate achieved a strictly verified skill score of ${finalSkillScore}% (Assessment Confidence: ${assessmentConfidence}%). Performance evaluated across physical fault finding, cause-and-effect reasoning, and safety protocol compliance in native ${
    language === 'pa' ? 'Punjabi' : language === 'hi' ? 'Hindi' : 'English'
  }.`;

  return {
    sessionId: `skill-report-${Date.now()}`,
    skillName,
    candidateName,
    language,
    totalQuestions: 6,
    completedQuestions: completedCount,
    overallSkillScore: finalSkillScore,
    assessmentConfidence,
    performanceTier,
    technicalKnowledgePercent: avgTech,
    troubleshootingReasoningPercent: avgReasoning,
    safetyCompliancePercent: avgSafety,
    specificityPercent: avgSpecificity,
    allMatchedKeyPoints,
    allMissingKeyPoints,
    allIncorrectPointsFound,
    criticalSafetyStatus: hasSafetyFailure ? 'Critical Safety Failure' : 'Passed',
    strengths: allStrengths.length > 0 ? allStrengths : ['Completed basic testing steps'],
    growthOpportunities: allWeaknesses.length > 0 ? allWeaknesses : ['Continue practicing advanced multi-system diagnostics'],
    executiveSummary,
    completedAt: new Date().toISOString(),
  };
}
