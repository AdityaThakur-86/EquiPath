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
  // If the question has a custom sample transcript for the language, use it
  if (questionContext?.sampleVoiceTranscript && questionContext.sampleVoiceTranscript[language]) {
    const transcript = questionContext.sampleVoiceTranscript[language];
    const translatedEn = questionContext.sampleVoiceTranscript.en || SAMPLE_TRANSCRIPTS.en.translation;
    return {
      transcript,
      durationSeconds: 8,
      confidence: 0.94,
      language,
      translatedEn,
    };
  }

  const sample = SAMPLE_TRANSCRIPTS[language] || SAMPLE_TRANSCRIPTS.pa;
  return {
    transcript: sample.raw,
    durationSeconds: 8,
    confidence: 0.94,
    language,
    translatedEn: sample.translation,
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

export function speakTextWebSpeech(text: string, lang: string = 'en-US'): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    if (lang.startsWith('pa')) utterance.lang = 'pa-IN';
    else if (lang.startsWith('hi')) utterance.lang = 'hi-IN';
    else utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }
}
