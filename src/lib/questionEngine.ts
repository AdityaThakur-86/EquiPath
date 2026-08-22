import { DifficultyLevel, Language, QuestionType, ScenarioQuestion, KeyPointConcept, CriticalSafetyPoint, IncorrectMisconception } from './types';

export interface QuestionBlueprint {
  id: string;
  skill: string;
  topic: string;
  questionType: QuestionType;
  difficulty: DifficultyLevel;
  questionText: {
    en: string;
    hi: string;
    pa: string;
  };
  contextScenario?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageHotspots?: { x: number; y: number; label: string; issueDescription: string }[];
  
  // Hidden Evaluation Data (never exposed to candidate)
  keyPoints: KeyPointConcept[];
  criticalPoints: CriticalSafetyPoint[];
  incorrectPoints: IncorrectMisconception[];
  
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

export const QUESTION_BLUEPRINTS: QuestionBlueprint[] = [
  // ==========================================
  // SKILL 1: ELECTRICAL TROUBLESHOOTING
  // ==========================================

  // Q1: Basic Concept / Diagnosis
  {
    id: 'elec-tb-q1',
    skill: 'Electrical Troubleshooting',
    topic: 'Fan & Motor Slow Operation',
    questionType: 'Basic concept',
    difficulty: 'Beginner',
    questionText: {
      en: 'A single-phase ceiling or ventilation fan is running very slowly and humming loudly. What would you check step by step to find the fault?',
      hi: 'एक सिंगल-फेज पंखा बहुत धीरे चल रहा है और तेज हमिंग कर रहा है। फॉल्ट ढूंढने के लिए आप स्टेप-बाय-स्टेप क्या जांचेंगे?',
      pa: 'ਇੱਕ ਸਿੰਗਲ-ਫੇਜ਼ ਪੱਖਾ ਬਹੁਤ ਹੌਲੀ ਚੱਲ ਰਿਹਾ ਹੈ ਅਤੇ ਗੂੰਜ ਰਿਹਾ ਹੈ। ਖਰਾਬੀ ਲੱਭਣ ਲਈ ਤੁਸੀਂ ਇਕ-ਇਕ ਕਰਕੇ ਕੀ ਚੈੱਕ ਕਰੋਗੇ?',
    },
    contextScenario: 'Workshop auxiliary ventilation fan running on 230V single-phase line.',
    keyPoints: [
      {
        id: 'kp-1',
        label: 'Check starting/running capacitor value with capacitance meter',
        semanticTriggers: {
          en: ['capacitor', 'capacitance', 'microfarad', 'uf', 'cap test', 'condenser'],
          hi: ['कैपेसिटर', 'कंडेंसर', 'माइक्रोफैराड', 'uf', 'capacitor check'],
          pa: ['ਕਪੈਸਿਟਰ', 'ਕੰਡੈਂਸਰ', 'ਮਾਈਕ੍ਰੋਫੈਰਡ', 'uf', 'ਕਪੈਸਿਟਰ ਟੈਸਟ'],
          hinglish: ['capacitor check', 'condenser badalna', 'capacitor test'],
        },
        explanation: 'Weak or degraded starting capacitor is the #1 cause of slow motor speed and humming.',
      },
      {
        id: 'kp-2',
        label: 'Check supply voltage at terminals (230V AC)',
        semanticTriggers: {
          en: ['supply voltage', 'measure voltage', '230v', 'line voltage', 'multimeter voltage', 'terminal voltage'],
          hi: ['सप्लाई वोल्टेज', '230V', 'लाइन वोल्टेज', 'मल्टीमीटर से वोल्टेज'],
          pa: ['ਸਪਲਾਈ ਵੋਲਟੇਜ', '230V', 'ਲਾਈਨ ਵੋਲਟੇਜ', 'ਵੋਲਟਮੀਟਰ'],
          hinglish: ['supply voltage check', '230v voltage'],
        },
        explanation: 'Low input supply voltage reduces motor torque quadratically.',
      },
      {
        id: 'kp-3',
        label: 'Check mechanical bearing free rotation & lubrication',
        semanticTriggers: {
          en: ['bearing', 'free rotation', 'shaft binding', 'lubrication', 'bush', 'jammed by hand'],
          hi: ['बेयरिंग', 'फ्री रोटेशन', 'जाम', 'बुश', 'हाथ से घुमाकर'],
          pa: ['ਬੇਅਰਿੰਗ', 'ਫ੍ਰੀ ਘੁੰਮਣਾ', 'ਜਾਮ', 'ਬੁਸ਼', 'ਹੱਥ ਨਾਲ ਘੁਮਾ ਕੇ'],
          hinglish: ['bearing jam', 'free ghumna', 'bearing oiling'],
        },
        explanation: 'Dry or worn bearings cause severe mechanical drag.',
      },
      {
        id: 'kp-4',
        label: 'Check stator winding continuity and resistance',
        semanticTriggers: {
          en: ['winding', 'resistance', 'continuity', 'stator coils', 'open winding'],
          hi: ['वाइंडिंग', 'रेजिस्टेंस', 'कंटीन्यूटी', 'कॉइल'],
          pa: ['ਵਾਇੰਡਿੰਗ', 'ਰਜਿਸਟੈਂਸ', 'ਕੰਟੀਨਿਊਟੀ', 'ਕੋਇਲ'],
          hinglish: ['winding resistance', 'continuity test'],
        },
        explanation: 'An open auxiliary winding prevents the rotating magnetic field from developing proper torque.',
      },
    ],
    criticalPoints: [
      {
        id: 'cp-1',
        label: 'Discharge capacitor and isolate power before touching wiring',
        semanticTriggers: {
          en: ['discharge capacitor', 'turn off power', 'isolate switch', 'disconnect power'],
          hi: ['कैपेसिटर डिस्चार्ज', 'पावर बंद', 'स्विच ऑफ'],
          pa: ['ਕਪੈਸਿਟਰ ਡਿਸਚਾਰਜ', 'ਪਾਵਰ ਬੰਦ', 'ਸਵਿੱਚ ਆਫ'],
          hinglish: ['power band karke', 'capacitor discharge'],
        },
        explanation: 'Capacitors store lethal DC charge even when power is off.',
      },
    ],
    incorrectPoints: [
      {
        id: 'inc-1',
        label: 'Increase input voltage above rated 230V',
        semanticTriggers: {
          en: ['increase voltage', 'double voltage', 'give 440v', 'overvolt'],
          hi: ['वोल्टेज बढ़ाना', 'ज्यादा वोल्टेज देना', '440v देना'],
          pa: ['ਵੋਲਟੇਜ ਵਧਾਉਣਾ', 'ਵੱਧ ਵੋਲਟੇਜ ਦੇਣਾ'],
          hinglish: ['voltage badha do', 'jyada voltage'],
        },
        penaltyScore: 30,
        explanation: 'Increasing voltage burns out the insulation and causes motor fire.',
      },
      {
        id: 'inc-2',
        label: 'Touch spinning blades or live terminals with bare hands',
        semanticTriggers: {
          en: ['touch live wire', 'bare hands', 'force spin while live'],
          hi: ['नंगे हाथ से छूना', 'चालू में ब्लेड पकड़ना'],
          pa: ['ਨੰਗੇ ਹੱਥਾਂ ਨਾਲ ਛੂਹਣਾ'],
          hinglish: ['nange haath se'],
        },
        penaltyScore: 25,
        explanation: 'Direct physical safety violation risking amputations and electric shock.',
      },
    ],
    sampleVoiceTranscript: {
      pa: 'ਮੈਂ ਪਹਿਲਾਂ ਪਾਵਰ ਬੰਦ ਕਰਕੇ ਕਪੈਸਿਟਰ ਨੂੰ ਡਿਸਚਾਰਜ ਕਰਾਂਗਾ। ਫਿਰ ਮਲਟੀਮੀਟਰ ਨਾਲ 230V ਸਪਲਾਈ ਵੋਲਟੇਜ ਅਤੇ ਕਪੈਸਿਟਰ ਦੀ microfarad ਵੈਲਿਊ ਚੈੱਕ ਕਰਾਂਗਾ। ਨਾਲ ਹੀ ਹੱਥ ਨਾਲ ਘੁਮਾ ਕੇ ਦੇਖਾਂਗਾ ਕਿ ਬੇਅਰਿੰਗ ਜਾਮ ਤਾਂ ਨਹੀਂ ਅਤੇ ਵਾਇੰਡਿੰਗ ਦੀ ਰਜਿਸਟੈਂਸ ਮਿਣਾਂਗਾ।',
      hi: 'मैं पहले बिजली बंद करके कैपेसिटर को डिस्चार्ज करूंगा। फिर मल्टीमीटर से 230V सप्लाई वोल्टेज और कैपेसिटर की वैल्यू टेस्ट करूंगा। हाथ से चेक करूंगा कि बेयरिंग फ्री है या नहीं और वाइंडिंग रेजिस्टेंस नापूंगा।',
      en: 'I would first isolate power and safely discharge the capacitor. Then I would measure 230V supply voltage with a multimeter, test the capacitor microfarad rating on a capacitance meter, spin the rotor by hand to inspect bearing friction, and test stator winding resistance.',
    },
    sampleWeakVoiceTranscript: {
      pa: 'ਮੈਂ ਪੱਖੇ ਦੀਆਂ ਤਾਰਾਂ ਅਤੇ ਵੋਲਟੇਜ ਚੈੱਕ ਕਰਾਂਗਾ।',
      hi: 'मैं वोल्टेज और पंखे की तारें देखूंगा।',
      en: 'I would check the wires and voltage.',
    },
    sampleWrongVoiceTranscript: {
      pa: 'ਮੈਂ ਵੋਲਟੇਜ ਵਧਾ ਦੇਵਾਂਗਾ ਤਾਂ ਜੋ ਪੱਖਾ ਤੇਜ਼ ਚੱਲਣ ਲੱਗੇ।',
      hi: 'मैं वोल्टेज बढ़ा दूंगा ताकि पंखा तेजी से चलने लगे।',
      en: 'I would increase the input voltage to make it spin faster.',
    },
  },

  // Q2: Real-World Troubleshooting (3-Phase Motor Overheating)
  {
    id: 'elec-tb-q2',
    skill: 'Electrical Troubleshooting',
    topic: '3-Phase Motor Overheating',
    questionType: 'Real-world troubleshooting',
    difficulty: 'Intermediate',
    questionText: {
      en: 'A 3-phase induction motor starts normally but overheats severely after 15 minutes of operation even though line voltage is balanced. What sequence of checks would you perform and why?',
      hi: '3-फेज मोटर सामान्य शुरू होती है लेकिन 15 मिनट बाद बहुत गर्म हो जाती है जबकि वोल्टेज संतुलित है। आप क्या-क्या जांच करेंगे और क्यों?',
      pa: '3-ਫੇਜ਼ ਮੋਟਰ ਆਮ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ ਪਰ ਵੋਲਟੇਜ ਠੀਕ ਹੋਣ ਦੇ ਬਾਵਜੂਦ 15 ਮਿੰਟ ਬਾਅਦ ਬਹੁਤ ਗਰਮ ਹੋ ਜਾਂਦੀ ਹੈ। ਤੁਸੀਂ ਕੀ-ਕੀ ਚੈੱਕ ਕਰੋਗੇ ਅਤੇ ਕਿਉਂ?',
    },
    contextScenario: 'Industrial conveyor drive motor running in continuous plant production.',
    keyPoints: [
      {
        id: 'kp-1',
        label: 'Measure phase current balance with clamp meter (check for single-phasing)',
        semanticTriggers: {
          en: ['clamp meter', 'current balance', 'phase current', 'amps per phase', 'single phasing'],
          hi: ['क्लैंप मीटर', 'करंट बैलेंस', 'फेज करंट', 'सिंगल फेजिंग'],
          pa: ['ਕਲੈਂਪ ਮੀਟਰ', 'ਕਰੰਟ ਬੈਲੈਂਸ', 'ਫੇਜ਼ ਕਰੰਟ', 'ਸਿੰਗਲ ਫੇਜ਼ਿੰਗ'],
          hinglish: ['clamp meter se current', 'phase current balance'],
        },
        explanation: 'Current imbalance causes excessive stator I2R copper heating.',
      },
      {
        id: 'kp-2',
        label: 'Inspect mechanical load, coupling alignment, and bearing friction',
        semanticTriggers: {
          en: ['mechanical load', 'bearing friction', 'overloading', 'shaft alignment', 'drag'],
          hi: ['मैकेनिकल लोड', 'बेयरिंग घर्षण', 'ओवरलोड', 'एलाइनमेंट'],
          pa: ['ਮਕੈਨੀਕਲ ਲੋਡ', 'ਬੇਅਰਿੰਗ ਫ੍ਰਿਕਸ਼ਨ', 'ਓਵਰਲੋਡਿੰਗ', 'ਅਲਾਈਨਮੈਂਟ'],
          hinglish: ['load check', 'bearing heat', 'alignment'],
        },
        explanation: 'Mechanical overloading forces the motor into a continuous high-slip overload condition.',
      },
      {
        id: 'kp-3',
        label: 'Check cooling fan fins and airflow cowl for blockages',
        semanticTriggers: {
          en: ['cooling fan', 'airflow', 'cowl blockage', 'fan fins', 'ventilation blocked'],
          hi: ['कूलिंग फैन', 'एयरफ्लो', 'फैन की पंखुड़ियां', 'हवा का रास्ता ब्लॉक'],
          pa: ['ਕੂਲਿੰਗ ਫੈਨ', 'ਏਅਰਫਲੋਅ', 'ਹਵਾ ਬਲਾਕ', 'ਪੱਖੀ ਦੇ ਪਰ'],
          hinglish: ['cooling fan jammed', 'air blockage'],
        },
        explanation: 'Clogged cowl airways eliminate forced convection cooling.',
      },
      {
        id: 'kp-4',
        label: 'Measure winding resistance balance across all phases with ohmmeter',
        semanticTriggers: {
          en: ['winding resistance', 'stator coils balance', 'milliohm meter', 'u1-v1-w1'],
          hi: ['वाइंडिंग रेजिस्टेंस', 'कॉइल बैलेंस', 'ओममीटर'],
          pa: ['ਵਾਇੰਡਿੰਗ ਰਜਿਸਟੈਂਸ', 'ਕੋਇਲ ਬੈਲੈਂਸ', 'ਓਮਮੀਟਰ'],
          hinglish: ['winding check', 'coil resistance'],
        },
        explanation: 'Inter-turn short circuits cause local hot spots and rapid overheating.',
      },
    ],
    criticalPoints: [
      {
        id: 'cp-1',
        label: 'Isolate main breaker (LOTO) and verify 0V before touching motor terminals',
        semanticTriggers: {
          en: ['isolate power', 'loto', 'lockout', 'padlock', 'verify 0v', 'zero energy'],
          hi: ['पावर आइसोलेट', 'LOTO', 'ताला लगाएं', '0V चेक'],
          pa: ['ਪਾਵਰ ਆਈਸੋਲੇਟ', 'LOTO', 'ਤਾਲਾ ਲਗਾਓ', '0V ਚੈੱਕ'],
          hinglish: ['loto lagana', 'breaker off karke'],
        },
        explanation: 'High voltage 415V arc-flash and electrocution prevention.',
      },
    ],
    incorrectPoints: [
      {
        id: 'inc-1',
        label: 'Replace motor with arbitrary larger HP without root cause diagnosis',
        semanticTriggers: {
          en: ['replace without checking', 'put bigger motor', 'change motor immediately'],
          hi: ['बिना चेक किए मोटर बदलना', 'बड़ा मोटर लगा देना'],
          pa: ['ਬਿਨਾਂ ਚੈੱਕ ਕੀਤੇ ਮੋਟਰ ਬਦਲਣਾ'],
          hinglish: ['bada motor laga do', 'direct change'],
        },
        penaltyScore: 20,
        explanation: 'Masks underlying mechanical jamming or electrical imbalance.',
      },
    ],
    sampleVoiceTranscript: {
      pa: 'ਮੈਂ ਪਹਿਲਾਂ ਕਲੈਂਪ ਮੀਟਰ ਨਾਲ ਤਿੰਨੇ ਫੇਜ਼ਾਂ ਦਾ ਕਰੰਟ ਚੈੱਕ ਕਰਾਂਗਾ ਤਾਂ ਜੋ ਦੇਖਿਆ ਜਾਵੇ ਕੋਈ ਫੇਜ਼ ਵੱਧ ਕਰੰਟ ਤਾਂ ਨਹੀਂ ਲੈ ਰਿਹਾ। ਫਿਰ ਪਾਵਰ ਆਈਸੋਲੇਟ (LOTO) ਕਰਕੇ ਕੂਲਿੰਗ ਫੈਨ ਦੇ ਏਅਰਫਲੋਅ, ਬੇਅਰਿੰਗ ਫ੍ਰਿਕਸ਼ਨ ਅਤੇ ਮੋਟਰ ਦੀ ਵਾਇੰਡਿੰਗ ਰਜਿਸਟੈਂਸ ਬੈਲੈਂਸ ਦੀ ਜਾਂਚ ਕਰਾਂਗਾ।',
      hi: 'मैं पहले क्लैंप मीटर से तीनों फेजों का रनिंग करंट नापूंगा ताकि अनबैलेंस का पता चले। फिर LOTO करके पावर आइसोलेट करूंगा, कूलिंग फैन की सफाई, बेयरिंग की फ्रीनेस और वाइंडिंग रेजिस्टेंस की जांच करूंगा।',
      en: 'I would first measure the 3-phase running current using a true-RMS clamp meter to check for current imbalance or single-phasing. Next, safely isolate the breaker with LOTO, inspect the cooling fan cowl for blockages, check the mechanical load and bearings for friction, and test the stator winding resistance balance with a milliohm meter.',
    },
  },

  // Q3: Safety Scenario (Tripping Circuit Breaker)
  {
    id: 'elec-tb-q3',
    skill: 'Electrical Troubleshooting',
    topic: 'Circuit Breaker Tripping & Safety',
    questionType: 'Safety scenario',
    difficulty: 'Beginner',
    questionText: {
      en: 'A 32A circuit breaker trips repeatedly every time you switch on a workshop compressor. Before attempting to reset it again, what safety checks must you conduct?',
      hi: 'वर्कशॉप कंप्रेसर चालू करते ही 32A MCB बार-बार ट्रिप हो जाता है। इसे दोबारा रीसेट करने से पहले, कौन सी सुरक्षा जांच करेंगे?',
      pa: 'ਕੰਪ੍ਰੈਸਰ ਚਾਲੂ ਕਰਦੇ ਹੀ 32A MCB ਵਾਰ-ਵਾਰ ਟ੍ਰਿਪ ਹੋ ਜਾਂਦਾ ਹੈ। ਇਸਨੂੰ ਦੁਬਾਰਾ ਰੀਸੈਟ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ, ਤੁਸੀਂ ਕਿਹੜੀ ਸੁਰੱਖਿਆ ਜਾਂਚ ਕਰੋਗੇ?',
    },
    contextScenario: 'Main workshop distribution board feeding single-phase compressor motor.',
    keyPoints: [
      {
        id: 'kp-1',
        label: 'Check for dead short circuit between Phase-Neutral and Phase-Earth with multimeter',
        semanticTriggers: {
          en: ['short circuit', 'phase to neutral', 'phase to earth', 'continuity to ground', 'multimeter resistance'],
          hi: ['शॉर्ट सर्किट', 'फेज से न्यूट्रल', 'फेज से अर्थ', 'मल्टीमीटर'],
          pa: ['ਸ਼ਾਰਟ ਸਰਕਟ', 'ਫੇਜ਼ ਤੋਂ ਨਿਊਟਰਲ', 'ਫੇਜ਼ ਤੋਂ ਅਰਥ', 'ਮਲਟੀਮੀਟਰ'],
          hinglish: ['short circuit check', 'phase earth short'],
        },
        explanation: 'Direct dead shorts will instantly trip breakers on instantaneous magnetic trip.',
      },
      {
        id: 'kp-2',
        label: 'Check if compressor motor is mechanically seized or locked rotor',
        semanticTriggers: {
          en: ['locked rotor', 'compressor seized', 'motor jammed', 'mechanical bind'],
          hi: ['मोटर जाम', 'कंप्रेसर सीज', 'लॉक्ड रोटर'],
          pa: ['ਮੋਟਰ ਜਾਮ', 'ਕੰਪ੍ਰੈਸਰ ਸੀਜ਼', 'ਲਾਕਡ ਰੋਟਰ'],
          hinglish: ['motor jam hai', 'compressor seized'],
        },
        explanation: 'A locked rotor draws 6x FLC starting current and trips thermal/magnetic releases.',
      },
      {
        id: 'kp-3',
        label: 'Inspect cable insulation for burns, melting, or Megger insulation breakdown',
        semanticTriggers: {
          en: ['megger', 'insulation resistance', 'burnt wire', 'cable melting', 'insulation breakdown'],
          hi: ['मेगर', 'इन्सुलेशन टेस्ट', 'जली हुई तार', 'केबल पिघलना'],
          pa: ['ਮੈਗਰ', 'ਇੰਸੂਲੇਸ਼ਨ ਟੈਸਟ', 'ਸੜੀ ਤਾਰ', 'ਕੇਬਲ ਮੈਲਟਿੰਗ'],
          hinglish: ['megger test', 'insulation check', 'jali hui taar'],
        },
        explanation: 'Deteriorated cable insulation causes earth leakage faults.',
      },
    ],
    criticalPoints: [
      {
        id: 'cp-1',
        label: 'Never force hold the breaker handle in the ON position',
        semanticTriggers: {
          en: ['never force hold', 'do not hold breaker', 'dont force on', 'do not tape breaker'],
          hi: ['जबरदस्ती चालू न रखें', 'ब्रेकर को पकड़ कर न रखें'],
          pa: ['ਜ਼ਬਰਦਸਤੀ ਆਨ ਨਾ ਰੱਖੋ', 'ਬਰੇਕਰ ਨੂੰ ਫੜ ਕੇ ਨਾ ਰੱਖੋ'],
          hinglish: ['force mat karo', 'breaker dabake mat rakho'],
        },
        explanation: 'Force holding a breaker defeats trip-free protection and can cause catastrophic electrical panel explosions.',
      },
    ],
    incorrectPoints: [
      {
        id: 'inc-1',
        label: 'Increase breaker rating from 32A to 63A without checking wire size',
        semanticTriggers: {
          en: ['increase breaker rating', 'put 63a breaker', 'put bigger fuse', 'bypass fuse'],
          hi: ['बड़ा ब्रेकर लगाना', '63A का ब्रेकर लगा देना', 'फ्यूज बायपास करना'],
          pa: ['ਵੱਡਾ ਬਰੇਕਰ ਲਗਾਉਣਾ', '63A ਬਰੇਕਰ ਲਗਾਉਣਾ', 'ਫਿਊਜ਼ ਬਾਈਪਾਸ'],
          hinglish: ['bada breaker laga do', '63a breaker'],
        },
        penaltyScore: 30,
        explanation: 'Oversizing the breaker removes cable thermal protection, causing wiring inside walls to melt and burn.',
      },
    ],
    sampleVoiceTranscript: {
      pa: 'ਮੈਂ ਬਰੇਕਰ ਨੂੰ ਜ਼ਬਰਦਸਤੀ ਆਨ ਨਹੀਂ ਕਰਾਂਗਾ ਅਤੇ ਨਾ ਹੀ ਵੱਡਾ ਬਰੇਕਰ ਲਗਾਵਾਂਗਾ। ਪਹਿਲਾਂ ਮਲਟੀਮੀਟਰ ਨਾਲ ਤਾਰਾਂ ਵਿੱਚ ਫੇਜ਼-ਟੂ-ਅਰਥ ਸ਼ਾਰਟ ਸਰਕਟ ਚੈੱਕ ਕਰਾਂਗਾ, ਦੇਖਾਂਗਾ ਕਿ ਕੰਪ੍ਰੈਸਰ ਦੀ ਮੋਟਰ ਜਾਮ ਤਾਂ ਨਹੀਂ, ਅਤੇ ਮੈਗਰ ਨਾਲ ਕੇਬਲ ਇੰਸੂਲੇਸ਼ਨ ਟੈਸਟ ਕਰਾਂਗਾ।',
      hi: 'मैं ब्रेकर को जबरदस्ती चालू नहीं रखूंगा और न ही बड़ा ब्रेकर लगाऊंगा। पहले मल्टीमीटर से फेज-टू-अर्थ शॉर्ट सर्किट चेक करूंगा, कंप्रेसर मोटर के जाम होने की जांच करूंगा और मेगर से केबल इंसुलेशन नापूंगा।',
      en: 'I will never force-hold the breaker in the ON position or arbitrarily increase its rating. First, I would use a multimeter and Megger to test for phase-to-earth or dead short circuits, inspect the compressor pump to ensure the rotor is not locked, and verify cable insulation integrity.',
    },
  },

  // Q4: Fault Identification (Floating Neutral & Voltage Imbalance)
  {
    id: 'elec-tb-q4',
    skill: 'Electrical Troubleshooting',
    topic: 'Neutral Fault & Voltage Shift',
    questionType: 'Fault identification',
    difficulty: 'Advanced',
    questionText: {
      en: 'In a 3-phase 4-wire commercial subpanel, 230V lights in Zone A are burning out rapidly while lights in Zone B are dimming. What is the root cause and how do you test for it?',
      hi: '3-फेज 4-तार पैनल में, जोन A की 230V लाइटें तेजी से फ्यूज हो रही हैं जबकि जोन B की लाइटें धीमी हैं। इसका मूल कारण क्या है और आप इसे कैसे जांचेंगे?',
      pa: '3-ਫੇਜ਼ 4-ਤਾਰ ਪੈਨਲ ਵਿੱਚ, ਜ਼ੋਨ A ਦੀਆਂ 230V ਲਾਈਟਾਂ ਸੜ ਰਹੀਆਂ ਹਨ ਜਦਕਿ ਜ਼ੋਨ B ਦੀਆਂ ਲਾਈਟਾਂ ਮੱਧਮ ਹਨ। ਇਸਦਾ ਮੁੱਖ ਕਾਰਨ ਕੀ ਹੈ ਅਤੇ ਕਿਵੇਂ ਟੈਸਟ ਕਰੋਗੇ?',
    },
    contextScenario: 'Main commercial warehouse sub-distribution panel.',
    keyPoints: [
      {
        id: 'kp-1',
        label: 'Identify floating / open neutral conductor (neutral displacement)',
        semanticTriggers: {
          en: ['open neutral', 'floating neutral', 'neutral broken', 'loose neutral', 'neutral shift', 'neutral displacement'],
          hi: ['ओपन न्यूट्रल', 'फ्लोटिंग न्यूट्रल', 'न्यूट्रल टूटना', 'न्यूट्रल ढीला', 'न्यूट्रल शिफ्ट'],
          pa: ['ਓਪਨ ਨਿਊਟਰਲ', 'ਫਲੋਟਿੰਗ ਨਿਊਟਰਲ', 'ਨਿਊਟਰਲ ਟੁੱਟਣਾ', 'ਨਿਊਟਰਲ ਸ਼ਿਫਟ'],
          hinglish: ['open neutral fault', 'neutral loose hai', 'floating neutral'],
        },
        explanation: 'A broken neutral shifts the neutral star point, causing voltage to surge up to 400V on lightly loaded phases and collapse on heavily loaded phases.',
      },
      {
        id: 'kp-2',
        label: 'Measure phase-to-neutral voltages across all 3 phases (L1-N, L2-N, L3-N)',
        semanticTriggers: {
          en: ['phase to neutral voltage', 'l1-n', 'l2-n', 'l3-n', 'voltage across neutral', 'unequal voltage'],
          hi: ['फेज से न्यूट्रल वोल्टेज', 'L1-N', 'L2-N', 'असंतुलित वोल्टेज'],
          pa: ['ਫੇਜ਼ ਤੋਂ ਨਿਊਟਰਲ ਵੋਲਟੇਜ', 'L1-N', 'L2-N', 'ਅਸੰਤੁਲਿਤ ਵੋਲਟੇਜ'],
          hinglish: ['phase to neutral voltage naapo', 'l1 n l2 n'],
        },
        explanation: 'Confirms voltage imbalance (e.g. 330V on Zone A and 130V on Zone B).',
      },
      {
        id: 'kp-3',
        label: 'Check main neutral busbar lugs and earthing bond integrity',
        semanticTriggers: {
          en: ['neutral busbar', 'neutral lug', 'tighten connection', 'earth bond', 'loose terminal'],
          hi: ['न्यूट्रल बसबार', 'न्यूट्रल लग', 'टाइट करना', 'अर्थ बॉन्ड'],
          pa: ['ਨਿਊਟਰਲ ਬੱਸਬਾਰ', 'ਨਿਊਟਰਲ ਲੱਗ', 'ਟਾਈਟ ਕਰਨਾ', 'ਅਰਥਿੰਗ'],
          hinglish: ['neutral busbar check', 'terminal tight karna'],
        },
        explanation: 'Physical root cause is almost always a loose or corroded main neutral lug.',
      },
    ],
    criticalPoints: [
      {
        id: 'cp-1',
        label: 'Disconnect sensitive single-phase loads immediately to prevent fire',
        semanticTriggers: {
          en: ['disconnect loads', 'turn off main', 'isolate appliances', 'prevent fire'],
          hi: ['लोड बंद करना', 'मेन स्विच ऑफ', 'आग से बचाव'],
          pa: ['ਲੋਡ ਬੰਦ ਕਰਨਾ', 'ਮੇਨ ਸਵਿੱਚ ਆਫ'],
          hinglish: ['load disconnect karna', 'main switch off'],
        },
        explanation: 'High voltage surges destroy electronic equipment and ignite transformers.',
      },
    ],
    incorrectPoints: [
      {
        id: 'inc-1',
        label: 'Blame LED bulb quality and replace bulbs without testing neutral',
        semanticTriggers: {
          en: ['bad bulbs', 'change bulbs only', 'replace led lights only'],
          hi: ['सिर्फ बल्ब बदलना', 'बल्ब खराब हैं'],
          pa: ['ਸਿਰਫ ਬਲਬ ਬਦਲਣਾ', 'ਬਲਬ ਖਰਾਬ ਹਨ'],
          hinglish: ['sirf bulb change kar do'],
        },
        penaltyScore: 20,
        explanation: 'New bulbs will immediately explode due to the 330V+ neutral shift.',
      },
    ],
    sampleVoiceTranscript: {
      pa: 'ਇਹ ਇੱਕ ਓਪਨ ਜਾਂ ਫਲੋਟਿੰਗ ਨਿਊਟਰਲ (floating neutral) ਦਾ ਲੱਛਣ ਹੈ। ਨਿਊਟਰਲ ਟੁੱਟਣ ਨਾਲ ਲੋਡ ਅਨਬੈਲੈਂਸ ਹੋ ਜਾਂਦਾ ਹੈ ਅਤੇ ਜ਼ੋਨ A ਤੇ ਵੋਲਟੇਜ 300V ਤੋਂ ਵੱਧ ਚਲਾ ਜਾਂਦਾ ਹੈ। ਮੈਂ ਤੁਰੰਤ ਮੇਨ ਸਵਿੱਚ ਬੰਦ ਕਰਾਂਗਾ, ਮਲਟੀਮੀਟਰ ਨਾਲ L1-N, L2-N ਵੋਲਟੇਜ ਚੈੱਕ ਕਰਾਂਗਾ ਅਤੇ ਨਿਊਟਰਲ ਬੱਸਬਾਰ ਦੇ ਲੱਗ ਟਾਈਟ ਕਰਾਂਗਾ।',
      hi: 'यह स्पष्ट रूप से ओपन या फ्लोटिंग न्यूट्रल (Floating Neutral) का दोष है। न्यूट्रल कटने से वोल्टेज शिफ्ट होकर 300V+ हो जाता है जिससे लाइटें जलती हैं। मैं तुरंत लोड बंद करके L1-N, L2-N वोल्टेज चेक करूंगा और मुख्य न्यूट्रल बसबार टर्मिनल की जांच करूंगा।',
      en: 'This is a textbook floating or open neutral condition. The broken neutral causes a neutral point displacement where Zone A receives over 300V while Zone B drops. I would immediately isolate power to protect loads, measure phase-to-neutral voltages (L1-N, L2-N), and inspect the main neutral busbar connections for loose or burnt lugs.',
    },
  },

  // Q5: Scenario Reasoning (Intermittent Earth Leakage Tripping)
  {
    id: 'elec-tb-q5',
    skill: 'Electrical Troubleshooting',
    topic: 'Intermittent RCD/ELCB Tripping',
    questionType: 'Scenario reasoning',
    difficulty: 'Intermediate',
    questionText: {
      en: 'An industrial 30mA RCD (Residual Current Device / ELCB) trips intermittently twice a day without any pattern. How do you systematically isolate which machine or cable is leaking current without shutting down the entire factory?',
      hi: '30mA RCD (ELCB) दिन में बिना किसी तय समय के 2 बार ट्रिप हो जाता है। पूरी फैक्ट्री बंद किए बिना आप कैसे पता लगाएंगे कि कौन सी मशीन या केबल करंट लीक कर रही है?',
      pa: '30mA RCD (ELCB) ਦਿਨ ਵਿੱਚ 2 ਵਾਰ ਬਿਨਾਂ ਕਿਸੇ ਸਮੇਂ ਟ੍ਰਿਪ ਹੋ ਜਾਂਦਾ ਹੈ। ਸਾਰੀ ਫੈਕਟਰੀ ਬੰਦ ਕੀਤੇ ਬਿਨਾਂ ਤੁਸੀਂ ਕਿਵੇਂ ਪਤਾ ਕਰੋਗੇ ਕਿ ਕਿਹੜੀ ਮਸ਼ੀਨ ਕਰੰਟ ਲੀਕ ਕਰ ਰਹੀ ਹੈ?',
    },
    contextScenario: 'Commercial food packaging facility with multiple automated conveyor belts.',
    keyPoints: [
      {
        id: 'kp-1',
        label: 'Use an earth leakage clamp meter (mA resolution) around Phase + Neutral together',
        semanticTriggers: {
          en: ['earth leakage clamp meter', 'ma clamp', 'clamp phase and neutral together', 'residual current measurement', 'leakage current'],
          hi: ['अर्थ लीकेज क्लैंप मीटर', 'मिलीएम्पीयर क्लैंप', 'फेज और न्यूट्रल एकसाथ क्लैंप करना', 'mA करंट'],
          pa: ['ਅਰਥ ਲੀਕੇਜ ਕਲੈਂਪ ਮੀਟਰ', 'ਮਿਲੀਐਂਪੀਅਰ ਕਲੈਂਪ', 'ਫੇਜ਼ ਤੇ ਨਿਊਟਰਲ ਇਕੱਠੇ ਕਲੈਂਪ ਕਰਨਾ', 'mA ਕਰੰਟ'],
          hinglish: ['leakage clamp meter', 'ma leakage check'],
        },
        explanation: 'Clamping active and neutral together measures the net imbalance directly to earth.',
      },
      {
        id: 'kp-2',
        label: 'Isolate individual sub-circuits branch by branch (divide and conquer)',
        semanticTriggers: {
          en: ['branch by branch', 'sub-circuits', 'divide and conquer', 'isolate each machine', 'isolate individual breaker'],
          hi: ['एक-एक ब्रांच अलग करना', 'सब-सर्किट आइसोलेट', 'मशीन वाइज चेक'],
          pa: ['ਇਕ-ਇਕ ਬ੍ਰਾਂਚ ਵੱਖ ਕਰਨਾ', 'ਸਬ-ਸਰਕਟ ਆਈਸੋਲੇਟ'],
          hinglish: ['ek ek circuit isolate karna', 'branch wise'],
        },
        explanation: 'Isolates cumulative background filter leakage vs a single faulty motor heating coil.',
      },
      {
        id: 'kp-3',
        label: 'Perform Megger insulation test on individual de-energized branches',
        semanticTriggers: {
          en: ['megger', '500v insulation test', 'insulation resistance', 'megaohms'],
          hi: ['मेगर', '500V इन्सुलेशन', 'मेगाओम'],
          pa: ['ਮੈਗਰ', '500V ਇੰਸੂਲੇਸ਼ਨ', 'ਮੈਗਾਓਮ'],
          hinglish: ['megger testing', 'insulation resistance'],
        },
        explanation: 'Pinpoints cables with degraded insulation resistance (< 1 Megaohm).',
      },
    ],
    criticalPoints: [
      {
        id: 'cp-1',
        label: 'Never bypass or jumper the RCD/ELCB to solve nuisance tripping',
        semanticTriggers: {
          en: ['never bypass rcd', 'do not bypass elcb', 'dont jumper safety'],
          hi: ['RCD बायपास न करें', 'ELCB में जम्पर न लगाएं'],
          pa: ['RCD ਬਾਈਪਾਸ ਨਾ ਕਰੋ', 'ELCB ਬਾਈਪਾਸ ਨਹੀਂ ਕਰਨਾ'],
          hinglish: ['rcb bypass mat karo'],
        },
        explanation: 'Bypassing the 30mA RCD eliminates personnel shock protection and is an illegal safety violation.',
      },
    ],
    incorrectPoints: [
      {
        id: 'inc-1',
        label: 'Disconnect the main earth wire to stop the breaker tripping',
        semanticTriggers: {
          en: ['disconnect earth wire', 'cut earth wire', 'remove ground'],
          hi: ['अर्थिंग तार हटा देना', 'अर्थिंग काट देना'],
          pa: ['ਅਰਥਿੰਗ ਤਾਰ ਕੱਟਣਾ', 'ਅਰਥਿੰਗ ਹਟਾਉਣਾ'],
          hinglish: ['earthing taar hata do'],
        },
        penaltyScore: 35,
        explanation: 'Removing the ground wire electrifies all metal machine frames to 230V, creating a lethal shock hazard.',
      },
    ],
    sampleVoiceTranscript: {
      pa: 'ਮੈਂ ਕਦੇ ਵੀ RCD ਨੂੰ ਬਾਈਪਾਸ ਨਹੀਂ ਕਰਾਂਗਾ ਅਤੇ ਨਾ ਹੀ ਅਰਥਿੰਗ ਤਾਰ ਹਟਾਵਾਂਗਾ। ਮੈਂ mA ਲੀਕੇਜ ਕਲੈਂਪ ਮੀਟਰ ਨਾਲ ਫੇਜ਼ ਅਤੇ ਨਿਊਟਰਲ ਨੂੰ ਇਕੱਠੇ ਕਲੈਂਪ ਕਰਕੇ ਹਰੇਕ ਬ੍ਰਾਂਚ ਦੀ ਲੀਕੇਜ ਮਿਣਾਂਗਾ, ਅਤੇ ਫਿਰ ਮੈਗਰ ਨਾਲ ਉਸ ਖਾਸ ਮਸ਼ੀਨ ਦਾ ਇੰਸੂਲੇਸ਼ਨ ਟੈਸਟ ਕਰਾਂਗਾ।',
      hi: 'मैं कभी भी RCD बायपास नहीं करूंगा और न ही अर्थिंग तार काटूंगा। मैं मिली-एम्पीयर (mA) लीकेज क्लैंप मीटर से प्रत्येक सर्किट का लीकेज करंट नापूंगा और फिर मेगर से फॉल्टी मशीन का इंसुलेशन रेजिस्टेंस चेक करूंगा।',
      en: 'I will never bypass the RCD or disconnect the earth ground wire. I would use an earth leakage mA clamp meter clamping Phase and Neutral together on each sub-branch to measure cumulative leakage, then perform a 500V Megger insulation test on the identified circuit to find the damaged cable or motor coil.',
    },
  },

  // Q6: Image / Practical Inspection
  {
    id: 'elec-tb-q6',
    skill: 'Electrical Troubleshooting',
    topic: 'Burnt Contactor & Terminal Inspection',
    questionType: 'Image-based',
    difficulty: 'Intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'Industrial MCC Panel Contactor Terminals with Discoloration',
    questionText: {
      en: 'Looking at this industrial starter terminal block, terminal L2 shows severe black carbon discoloration and pitted copper contacts. What caused this specific failure and what repair procedure must you follow?',
      hi: 'इस स्टार्टर टर्मिनल ब्लॉक में टर्मिनल L2 पर काला कार्बन और पिटेड कॉपर दिख रहा है। यह खराबी किस कारण हुई और इसे ठीक करने की सही प्रक्रिया क्या है?',
      pa: 'ਇਸ ਸਟਾਰਟਰ ਟਰਮੀਨਲ ਬਲਾਕ ਵਿੱਚ ਟਰਮੀਨਲ L2 ਤੇ ਕਾਲਾ ਕਾਰਬਨ ਅਤੇ ਸੜਿਆ ਕਾਪਰ ਦਿਖ ਰਿਹਾ ਹੈ। ਇਸ ਖਰਾਬੀ ਦਾ ਮੁੱਖ ਕਾਰਨ ਕੀ ਹੈ ਅਤੇ ਰਿਪੇਅਰ ਕਿਵੇਂ ਕਰੋਗੇ?',
    },
    imageHotspots: [
      { x: 38, y: 44, label: 'Loose L2 Lug', issueDescription: 'High resistance joint causing thermal oxidation and carbon arcing.' },
      { x: 62, y: 52, label: 'Pitted Contact Tip', issueDescription: 'Electrical arcing erosion requiring contact kit replacement.' },
    ],
    keyPoints: [
      {
        id: 'kp-1',
        label: 'Identify high-resistance loose terminal joint causing thermal I2R overheating and arcing',
        semanticTriggers: {
          en: ['loose terminal', 'high resistance joint', 'loose lug', 'thermal overheating', 'arcing', 'pitting'],
          hi: ['ढीला टर्मिनल', 'हाई रेजिस्टेंस', 'ढीला लग', 'स्पार्किंग', 'आर्किंग'],
          pa: ['ਢਿੱਲਾ ਟਰਮੀਨਲ', 'ਹਾਈ ਰਜਿਸਟੈਂਸ', 'ਢਿੱਲਾ ਲੱਗ', 'ਸਪਾਰਕਿੰਗ'],
          hinglish: ['loose connection', 'high resistance', 'sparking'],
        },
        explanation: 'Loose connections create high contact resistance, causing localized heating exceeding 300°C.',
      },
      {
        id: 'kp-2',
        label: 'Cut back heat-damaged copper wire to clean metal and crimp a new certified lug',
        semanticTriggers: {
          en: ['cut back cable', 'crimp new lug', 'clean copper', 'replace terminal', 're-terminate'],
          hi: ['तार को काटकर नया लग लगाना', 'नया लग क्रिम्प करना', 'साफ कॉपर'],
          pa: ['ਤਾਰ ਕੱਟ ਕੇ ਨਵਾਂ ਲੱਗ ਲਗਾਉਣਾ', 'ਨਵਾਂ ਲੱਗ ਲਗਾਉਣਾ', 'ਸਾਫ ਕਾਪਰ'],
          hinglish: ['taar cut karke naya lug', 'crimp new lug'],
        },
        explanation: 'Annealed, oxidized copper cannot maintain mechanical clamping pressure.',
      },
      {
        id: 'kp-3',
        label: 'Replace pitted contactor contacts or the complete contactor assembly',
        semanticTriggers: {
          en: ['replace contact kit', 'replace contactor', 'change contactor', 'new contacts'],
          hi: ['कॉन्टैक्टर बदलना', 'नया कॉन्टैक्ट किट', 'कॉन्टैक्टर चेंज'],
          pa: ['ਕੰਟੈਕਟਰ ਬਦਲਣਾ', 'ਨਵਾਂ ਕੰਟੈਕਟ ਕਿੱਟ'],
          hinglish: ['contactor badalna', 'new contactor'],
        },
        explanation: 'Pitted contacts have high resistance and will quickly weld shut.',
      },
    ],
    criticalPoints: [
      {
        id: 'cp-1',
        label: 'Perform torque check with calibrated torque screwdriver on all terminal screws',
        semanticTriggers: {
          en: ['torque screwdriver', 'tighten all terminals', 'torque check', 'proper tightness'],
          hi: ['टॉर्क स्क्रूड्राइवर', 'सभी टर्मिनल टाइट करना'],
          pa: ['ਟਾਰਕ ਸਕ੍ਰਿਊਡ੍ਰਾਈਵਰ', 'ਸਾਰੇ ਟਰਮੀਨਲ ਟਾਈਟ ਕਰਨਾ'],
          hinglish: ['torque check', 'screw tight karna'],
        },
        explanation: 'Prevents recurrence of loose terminal thermal runaway.',
      },
    ],
    incorrectPoints: [
      {
        id: 'inc-1',
        label: 'Just wrap electrical tape over the burnt wire and retighten without cutting back',
        semanticTriggers: {
          en: ['put tape over burnt wire', 'just tape it', 'tape without cutting'],
          hi: ['सिर्फ टेप लगा देना', 'बिना काटे टेप लगाना'],
          pa: ['ਸਿਰਫ ਟੇਪ ਲਗਾ ਦੇਣਾ'],
          hinglish: ['tape laga do bas'],
        },
        penaltyScore: 25,
        explanation: 'Brittle, heat-damaged copper will loosen and cause an electrical fire within hours.',
      },
    ],
    sampleVoiceTranscript: {
      pa: 'ਇਹ ਖਰਾਬੀ ਟਰਮੀਨਲ L2 ਦੇ ਢਿੱਲੇ ਹੋਣ ਕਰਕੇ ਹਾਈ ਰਜਿਸਟੈਂਸ ਸਪਾਰਕਿੰਗ ਨਾਲ ਹੋਈ ਹੈ। ਮੈਂ ਪਾਵਰ ਬੰਦ ਕਰਕੇ ਸੜੀ ਹੋਈ ਤਾਰ ਨੂੰ ਕੱਟਾਂਗਾ, ਨਵਾਂ ਲੱਗ ਕ੍ਰਿੰਪ ਕਰਾਂਗਾ, ਕੰਟੈਕਟਰ ਦੇ ਪਿੱਟੇਡ ਕੰਟੈਕਟਸ ਬਦਲਾਂਗਾ ਅਤੇ ਟਾਰਕ ਸਕ੍ਰਿਊਡ੍ਰਾਈਵਰ ਨਾਲ ਸਾਰੇ ਪੇਚ ਟਾਈਟ ਕਰਾਂਗਾ।',
      hi: 'यह टर्मिनल L2 पर लूज कनेक्शन के कारण हुई हाई-रेजिस्टेंस आर्किंग का परिणाम है। मैं पावर बंद करके जली हुई केबल को काटकर नया लग क्रिम्प करूंगा, कॉन्टैक्टर बदलूंगा और टॉर्क स्क्रूड्राइवर से सभी टर्मिनल सही टॉर्क पर टाइट करूंगा।',
      en: 'This failure was caused by a loose terminal connection creating a high-resistance joint, thermal runaway, and electrical arcing. I would isolate power, cut back the annealed copper cable to clean shiny metal, crimp a new heavy-duty lug, replace the pitted contactor assembly, and verify all terminal screws with a calibrated torque screwdriver.',
    },
  },
];

// Helper functions for dynamic multi-question generation
export function getQuestionsForSkill(skillName: string): QuestionBlueprint[] {
  const filtered = QUESTION_BLUEPRINTS.filter(
    (q) => q.skill.toLowerCase() === skillName.toLowerCase() || skillName.toLowerCase().includes(q.skill.toLowerCase())
  );
  if (filtered.length > 0) return filtered;
  return QUESTION_BLUEPRINTS;
}

export function generateScenarioQuestion(
  skillName: string = 'Electrical Troubleshooting',
  topic?: string,
  difficulty?: DifficultyLevel,
  questionType?: QuestionType,
  language: Language = 'pa',
  usedQuestionIds: string[] = []
): ScenarioQuestion {
  const allForSkill = getQuestionsForSkill(skillName);
  const available = allForSkill.filter((q) => !usedQuestionIds.includes(q.id));
  const pool = available.length > 0 ? available : allForSkill;

  // Pick matching or random
  let selected = pool[0];
  if (difficulty) {
    const diffMatch = pool.find((q) => q.difficulty === difficulty);
    if (diffMatch) selected = diffMatch;
  }

  return {
    id: selected.id,
    skill: selected.skill,
    topic: selected.topic,
    difficulty: selected.difficulty,
    questionType: selected.questionType,
    language,
    questionText: selected.questionText,
    contextScenario: selected.contextScenario,
    imageUrl: selected.imageUrl,
    imageAlt: selected.imageAlt,
    imageHotspots: selected.imageHotspots,
    keyPoints: selected.keyPoints,
    criticalPoints: selected.criticalPoints,
    incorrectPoints: selected.incorrectPoints,
    sampleVoiceTranscript: selected.sampleVoiceTranscript,
    sampleWeakVoiceTranscript: selected.sampleWeakVoiceTranscript,
    sampleWrongVoiceTranscript: selected.sampleWrongVoiceTranscript,
  };
}

export function generateFollowUpQuestion(
  skillName: string = 'Electrical Troubleshooting',
  previousQuestion: ScenarioQuestion,
  candidateAnswerText: string,
  nextDifficulty: DifficultyLevel = 'Intermediate',
  language: Language = 'pa'
): ScenarioQuestion {
  // Pick a different question from pool that hasn't been asked
  const allForSkill = getQuestionsForSkill(skillName);
  const nextQ = allForSkill.find((q) => q.id !== previousQuestion.id) || allForSkill[0];

  return {
    ...nextQ,
    difficulty: nextDifficulty,
    language,
    questionType: 'Follow-up',
    id: `followup-${Date.now()}`,
  };
}
