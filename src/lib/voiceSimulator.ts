import { Language, ScenarioQuestion } from './types';

export interface SimulatedSpeechResult {
  transcript: string;
  durationSeconds: number;
  confidence: number;
  language: Language;
  translatedEn: string;
}

export const SAMPLE_TRANSCRIPTS: Record<Language, { raw: string; translation: string }> = {
  pa: {
    raw: 'ਮੈਂ ਪਹਿਲਾਂ motor ਦੀ winding ਅਤੇ bearing check ਕਰਾਂਗਾ, ਅਤੇ ਇਹ ਦੇਖਾਂਗਾ ਕਿ cooling fan ਜਾਮ ਤਾਂ ਨਹੀਂ। ਨਾਲ ਹੀ power isolate ਕਰਕੇ earth leakage ਚੈੱਕ ਕਰਾਂਗਾ।',
    translation: 'I would first check the motor winding and bearing, and verify that the cooling fan is not jammed. Also isolate power and check for earth leakage with a multimeter.',
  },
  hi: {
    raw: 'मैं पहले मोटर की वाइंडिंग और बेयरिंग की जांच करूंगा, और देखूंगा कि कूलिंग फैन ब्लॉक तो नहीं है। साथ ही बिजली बंद करके अर्थ लीकेज चेक करूंगा।',
    translation: 'I would first inspect the motor winding and bearing, and check whether the cooling fan is blocked. Also turn off power and check for earth leakage.',
  },
  en: {
    raw: 'I would first isolate power at the main breaker, then test the stator winding resistance balance and inspect the bearing for thermal friction or ventilation blockage.',
    translation: 'I would first isolate power at the main breaker, then test the stator winding resistance balance and inspect the bearing for thermal friction or ventilation blockage.',
  },
};

export async function speechToText(
  language: Language = 'pa',
  questionContext?: ScenarioQuestion
): Promise<SimulatedSpeechResult> {
  return {
    transcript: '',
    durationSeconds: 0,
    confidence: 0,
    language,
    translatedEn: '',
  };
}

export function translateResponse(
  text: string,
  sourceLanguage: Language,
  targetLanguage: Language = 'en'
): string {
  if (sourceLanguage === targetLanguage) return text;
  if (SAMPLE_TRANSCRIPTS[sourceLanguage]) {
    return SAMPLE_TRANSCRIPTS[sourceLanguage].translation;
  }
  return text;
}

export function playAudioSimulation(durationSeconds: number = 8, onProgress?: (percent: number) => void): () => void {
  let elapsed = 0;
  const interval = setInterval(() => {
    elapsed += 0.2;
    const progress = Math.min(100, Math.round((elapsed / durationSeconds) * 100));
    if (onProgress) onProgress(progress);
    if (elapsed >= durationSeconds) {
      clearInterval(interval);
    }
  }, 200);

  return () => clearInterval(interval);
}

export function speakTextWebSpeech(text: string, lang: string = 'en-US', rate: number = 0.95): void {
  speakTextWithVoiceover({ text, language: (lang.startsWith('pa') ? 'pa' : lang.startsWith('hi') ? 'hi' : 'en'), rate });
}

export interface SpeakOptions {
  text: string;
  language: Language;
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

export function stopVoiceover(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function speakTextWithVoiceover({
  text,
  language,
  rate = 0.95,
  pitch = 1.0,
  onStart,
  onEnd,
  onError,
}: SpeakOptions): () => void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onStart) onStart();
    const cleanup = playAudioSimulation(6, (pct) => {
      if (pct >= 100 && onEnd) onEnd();
    });
    return cleanup;
  }

  window.speechSynthesis.cancel();
  const cleanText = text.replace(/[*_#`~]/g, '').trim();
  if (!cleanText) return () => {};

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = rate;
  utterance.pitch = pitch;

  // Language & Voice target matching
  let targetLangCode = 'en-US';
  if (language === 'pa') targetLangCode = 'pa-IN';
  else if (language === 'hi') targetLangCode = 'hi-IN';

  utterance.lang = targetLangCode;

  // Attempt to select specific Indian voice if available
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(
    (v) =>
      v.lang.toLowerCase().replace('_', '-') === targetLangCode.toLowerCase() ||
      (language === 'pa' && v.name.toLowerCase().includes('punjabi')) ||
      (language === 'hi' && v.name.toLowerCase().includes('hindi'))
  );
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    if (onError) onError(e);
    else if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);

  return () => {
    window.speechSynthesis.cancel();
  };
}

export function getQuestionVoiceoverScript(
  questionText: { en: string; hi: string; pa: string },
  contextScenario?: string,
  language: Language = 'pa'
): string {
  const mainText = questionText[language] || questionText.en;
  if (language === 'pa') {
    return contextScenario
      ? `ਸਵਾਲ: ${contextScenario}। ${mainText}`
      : `ਸਵਾਲ: ${mainText}`;
  }
  if (language === 'hi') {
    return contextScenario
      ? `प्रश्न: ${contextScenario}। ${mainText}`
      : `प्रश्न: ${mainText}`;
  }
  return contextScenario
    ? `Question Context: ${contextScenario}. ${mainText}`
    : `Scenario Question: ${mainText}`;
}

export function getEvaluationVoiceoverScript(
  overallScore: number,
  feedback: string,
  strengths: string[],
  weaknesses: string[],
  language: Language = 'pa'
): string {
  const isHigh = overallScore >= 80;
  const isPass = overallScore >= 50;

  if (language === 'pa') {
    let script = `ਮੁਲਾਂਕਣ ਨਤੀਜਾ: ਤੁਹਾਡਾ ਕੁੱਲ ਸਕੋਰ ${overallScore} ਪ੍ਰਤੀਸ਼ਤ ਹੈ। `;
    if (isHigh) script += `ਸ਼ਾਨਦਾਰ ਪ੍ਰਦਰਸ਼ਨ! `;
    else if (isPass) script += `ਚੰਗਾ ਯਤਨ! `;
    else script += `ਇਸ ਵਿੱਚ ਸੁਧਾਰ ਦੀ ਲੋੜ ਹੈ। `;

    script += `${feedback} `;
    if (strengths.length > 0) {
      script += `ਮੁੱਖ ਤਾਕਤਾਂ: ${strengths[0]}। `;
    }
    if (weaknesses.length > 0) {
      script += `ਧਿਆਨ ਦੇਣ ਯੋਗ ਨੁਕਤੇ: ${weaknesses[0]}। `;
    }
    return script;
  }

  if (language === 'hi') {
    let script = `मूल्यांकन परिणाम: आपका कुल स्कोर ${overallScore} प्रतिशत है। `;
    if (isHigh) script += `शानदार प्रदर्शन! `;
    else if (isPass) script += `अच्छा प्रयास! `;
    else script += `इसमें सुधार की आवश्यकता है। `;

    script += `${feedback} `;
    if (strengths.length > 0) {
      script += `मुख्य विशेषताएं: ${strengths[0]}। `;
    }
    if (weaknesses.length > 0) {
      script += `सुधार के बिंदु: ${weaknesses[0]}। `;
    }
    return script;
  }

  let script = `Evaluation Summary: Your earned overall score is ${overallScore} percent. `;
  script += `${feedback} `;
  if (strengths.length > 0) script += `Key strength: ${strengths[0]}. `;
  if (weaknesses.length > 0) script += `Area for improvement: ${weaknesses[0]}. `;
  return script;
}

