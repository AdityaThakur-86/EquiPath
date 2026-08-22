import { Language, DifficultyLevel } from './types';

export type QuestionCategory = 
  | 'troubleshooting' 
  | 'safety_emergency' 
  | 'sizing_calculations' 
  | 'schematic_blueprints' 
  | 'behavioral_field' 
  | 'obscure_edge_case';

export interface DynamicInterviewQuestion {
  id: string;
  category: QuestionCategory;
  categoryLabel: string;
  categoryIcon: string;
  difficulty: DifficultyLevel;
  stageName: string;
  stageSubtitle: string;
  question: {
    en: string;
    hi: string;
    pa: string;
  };
  interviewerTone: 'welcoming' | 'probing' | 'safety_focused' | 'pressure_test';
  expectedKeywords: {
    en: string[];
    hi: string[];
    pa: string[];
  };
  sampleAnswers: {
    en: string;
    hi: string;
    pa: string;
  };
  contextNote: string;
  followUpStarters?: {
    en: string[];
    hi: string[];
    pa: string[];
  };
}

export interface TradeInterviewBlueprint {
  tradeId: string;
  tradeName: string;
  tradeIcon: string;
  description: string;
  interviewerName: string;
  interviewerTitle: string;
  interviewerAvatar: string;
  questions: DynamicInterviewQuestion[];
}

export const QUESTION_CATEGORIES: { id: QuestionCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'All Question Types', icon: 'Sparkles' },
  { id: 'troubleshooting', label: '🔧 Diagnostic & Fault Finding', icon: 'Wrench' },
  { id: 'safety_emergency', label: '🛡️ Safety & Emergency Protocol', icon: 'ShieldAlert' },
  { id: 'sizing_calculations', label: '📐 Sizing & Field Calculations', icon: 'Calculator' },
  { id: 'schematic_blueprints', label: '🔍 Schematics & Wiring Logic', icon: 'FileCode' },
  { id: 'behavioral_field', label: '🤝 Field Scenario & Conflict', icon: 'Users' },
  { id: 'obscure_edge_case', label: '🧩 Obscure & Intermittent Faults', icon: 'HelpCircle' },
];

export const TRADE_INTERVIEW_BLUEPRINTS: TradeInterviewBlueprint[] = [
  // ==========================================
  // 1. INDUSTRIAL ELECTRICAL & 3-PHASE MOTORS
  // ==========================================
  {
    tradeId: 'industrial_electrical',
    tradeName: 'Industrial Electrical & 3-Phase Systems',
    tradeIcon: 'Zap',
    description: '3-Phase induction motors, star-delta starters, VFD parameters, insulation resistance testing, and substation LOTO.',
    interviewerName: 'Er. Rajeshwar Singh',
    interviewerTitle: 'Chief Industrial Electrical Lead, Metro Power Systems',
    interviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    questions: [
      // 1.1 Troubleshooting
      {
        id: 'elec-tb-01',
        category: 'troubleshooting',
        categoryLabel: 'Diagnostic & Fault Finding',
        categoryIcon: 'Wrench',
        difficulty: 'Intermediate',
        stageName: 'Initial Diagnostic Screening',
        stageSubtitle: 'Targeting physical symptoms and line balance',
        question: {
          en: 'A 15kW 3-phase squirrel cage motor running a critical plant ventilation pump suddenly starts drawing 1.8x its full load current, accompanied by heavy vibration and a low 100Hz humming sound. What is your immediate diagnostic hypothesis and what measurement do you take first?',
          hi: 'प्लांट का 15kW 3-फेज मोटर अचानक अपने फुल लोड करंट से 1.8 गुना अधिक करंट लेने लगा है और तेज 100Hz गुंजन व कंपन कर रहा है। आपकी प्रारंभिक जांच क्या होगी और आप सबसे पहले कौन सा माप लेंगे?',
          pa: 'ਪਲਾਂਟ ਦਾ 15kW 3-ਫੇਜ਼ ਮੋਟਰ ਅਚਾਨਕ ਆਪਣੇ ਫੁੱਲ ਲੋਡ ਕਰੰਟ ਤੋਂ 1.8 ਗੁਣਾ ਵੱਧ ਕਰੰਟ ਲੈਣ ਲੱਗ ਪਿਆ ਹੈ ਅਤੇ ਤੇਜ਼ ਗੂੰਜ ਤੇ ਵਾਈਬ੍ਰੇਸ਼ਨ ਕਰ ਰਿਹਾ ਹੈ। ਤੁਹਾਡੀ ਪਹਿਲੀ ਜਾਂਚ ਕੀ ਹੋਵੇਗੀ ਅਤੇ ਤੁਸੀਂ ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਕੀ ਮਾਪੋਗੇ?',
        },
        interviewerTone: 'welcoming',
        expectedKeywords: {
          en: ['single-phasing', 'clamp meter', 'phase balance', 'voltage drop', 'blown fuse', 'overload relay', 'multimeter'],
          hi: ['सिंगल फेजिंग', 'क्लैंप मीटर', 'फेज बैलेंस', 'वोल्टेज ड्रॉप', 'फ्यूज', 'ओवरलोड रिले'],
          pa: ['ਸਿੰਗਲ ਫੇਜ਼ਿੰਗ', 'ਕਲੈਂਪ ਮੀਟਰ', 'ਫੇਜ਼ ਬੈਲੈਂਸ', 'ਵੋਲਟੇਜ ਡਰਾਪ', 'ਫਿਊਜ਼', 'ਓਵਰਲੋਡ ਰਿਲੇ'],
        },
        sampleAnswers: {
          en: 'This classic symptom indicates single-phasing or severe phase voltage unbalance. I would first hook a true-RMS clamp meter around all 3 phase leads (L1, L2, L3) while running to check current balance. If one phase is drawing zero amps while the other two draw excessive current, a phase has dropped. I would then de-energize the circuit, lock it out, and measure line-to-line voltages (415V) and inspect the backup fuses, contactor main contacts, and terminal bridge connections.',
          hi: 'यह लक्षण सिंगल फेजिंग या फेज वोल्टेज असंतुलन का संकेत देता है। मैं पहले ट्रू-आरएमएस क्लैंप मीटर से तीनों फेजों (L1, L2, L3) का करंट मापूँगा। यदि एक फेज में करंट शून्य है और अन्य दो में अत्यधिक है, तो एक फेज गायब है। इसके बाद बिजली बंद करके 415V लाइन वोल्टेज, फ्यूज और कॉन्टैक्टर पॉइंट्स की जांच करूँगा।',
          pa: 'ਇਹ ਲੱਛਣ ਸਿੰਗਲ ਫੇਜ਼ਿੰਗ ਜਾਂ ਫੇਜ਼ ਵੋਲਟੇਜ ਅਸੰਤੁਲਨ ਵੱਲ ਇਸ਼ਾਰਾ ਕਰਦਾ ਹੈ। ਮੈਂ ਪਹਿਲਾਂ ਕਲੈਂਪ ਮੀਟਰ ਨਾਲ ਤਿੰਨੇ ਫੇਜ਼ਾਂ (L1, L2, L3) ਦਾ ਕਰੰਟ ਚੈੱਕ ਕਰਾਂਗਾ। ਜੇਕਰ ਇੱਕ ਫੇਜ਼ ਜ਼ੀਰੋ ਹੈ ਅਤੇ ਬਾਕੀ ਦੋ ਵੱਧ ਕਰੰਟ ਲੈ ਰਹੇ ਹਨ ਤਾਂ ਲਾਈਨ ਟੁੱਟੀ ਹੈ। ਫਿਰ ਪਾਵਰ ਬੰਦ ਕਰਕੇ 415V ਵੋਲਟੇਜ, ਫਿਊਜ਼ ਅਤੇ ਕੰਟੈਕਟਰ ਚੈੱਕ ਕਰਾਂਗਾ।',
        },
        contextNote: 'Tests ability to recognize single-phasing failure mode without guessing randomly.',
      },

      // 1.2 Safety Emergency
      {
        id: 'elec-sf-01',
        category: 'safety_emergency',
        categoryLabel: 'Safety & Emergency Protocol',
        categoryIcon: 'ShieldAlert',
        difficulty: 'Advanced',
        stageName: 'High-Voltage Safety & Rescue Protocol',
        stageSubtitle: 'Emergency electrical shock rescue & zero-energy state',
        question: {
          en: 'You are working in a main 415V Motor Control Center (MCC) room. A junior apprentice accidentally touches an energized busbar with an uninsulated spanner and is in direct locked-on muscular contracture. Describe your exact, second-by-second actions in the first 15 seconds to save their life without becoming a second victim.',
          hi: 'आप 415V MCC रूम में हैं। एक जूनियर हेल्पर ने अनइंसुलेटेड पाने से लाइव बसबार को छू लिया है और करंट से चिपका हुआ है। अगले 15 सेकंड में अपनी जान जोखिम में डाले बिना उसकी जान बचाने के लिए आप क्या कदम उठाएंगे?',
          pa: 'ਤੁਸੀਂ 415V MCC ਰੂਮ ਵਿੱਚ ਹੋ। ਇੱਕ ਹੈਲਪਰ ਦਾ ਹੱਥ ਲਾਈਵ ਬੱਸਬਾਰ ਨਾਲ ਲੱਗ ਗਿਆ ਹੈ ਅਤੇ ਉਹ ਕਰੰਟ ਨਾਲ ਚਿਪਕਿਆ ਹੋਇਆ ਹੈ। ਪਹਿਲੇ 15 ਸੈਕਿੰਡਾਂ ਵਿੱਚ ਆਪਣੇ ਆਪ ਨੂੰ ਬਚਾਉਂਦੇ ਹੋਏ ਉਸਨੂੰ ਛੁਡਾਉਣ ਲਈ ਤੁਸੀਂ ਕੀ ਕਰੋਗੇ?',
        },
        interviewerTone: 'safety_focused',
        expectedKeywords: {
          en: ['emergency trip', 'main breaker', 'fiberglass rescue hook', 'do not touch with bare hands', 'cpr', 'de-energize', 'isolate'],
          hi: ['इमरजेंसी ट्रिप', 'मेन ब्रेकर', 'फाइबरग्लास हुक', 'नंगे हाथों से न छुएं', 'CPR', 'आइसोलेट'],
          pa: ['ਐਮਰਜੈਂਸੀ ਟ੍ਰਿਪ', 'ਮੇਨ ਬਰੇਕਰ', 'ਫਾਈਬਰਗਲਾਸ ਹੁੱਕ', 'ਨੰਗੇ ਹੱਥੀਂ ਨਾ ਫੜੋ', 'CPR', 'ਆਈਸੋਲੇਟ'],
        },
        sampleAnswers: {
          en: 'First and most crucially: NEVER touch the victim with bare hands. Second 1–3: Immediately hit the red Mushroom Emergency Stop button or trip the main upstream MCC incomer breaker to cut power instantly. Second 4–8: If the breaker is out of immediate reach, grab the certified non-conductive fiberglass electrical rescue shepherd hook or a dry wooden plank to forcibly break their contact with the busbar. Second 9–15: Check for breathing and carotid pulse; if absent, shout for someone to call emergency medical services and fetch the AED while immediately initiating 30:2 chest compressions (CPR).',
          hi: 'सबसे पहले: पीड़ित को कभी भी सीधे नंगे हाथों से न छुएं। 1 से 3 सेकंड: तुरंत पैनल का रेड इमरजेंसी स्टॉप पुशबटन दबाएं या मेन इनकमर ब्रेकर ट्रिप करें। यदि ब्रेकर दूर है: तो इंसुलेटेड फाइबरग्लास रेस्क्यू हुक या सूखे लकड़ी के डंडे से पीड़ित को बसबार से अलग करें। तुरंत पल्स और सांस चेक करें, एम्बुलेंस को कॉल करवाएं और सीपीआर (CPR) शुरू करें।',
          pa: 'ਸਭ ਤੋਂ ਪਹਿਲਾਂ: ਵਿਅਕਤੀ ਨੂੰ ਕਦੇ ਵੀ ਨੰਗੇ ਹੱਥੀਂ ਨਾ ਛੂਹੋ। ਤੁਰੰਤ ਮੇਨ ਐਮਰਜੈਂਸੀ ਬਟਨ ਦਬਾਓ ਜਾਂ ਮੇਨ ਬਰੇਕਰ ਬੰਦ ਕਰੋ। ਜੇਕਰ ਬਰੇਕਰ ਦੂਰ ਹੈ ਤਾਂ ਫਾਈਬਰਗਲਾਸ ਰੈਸਕਿਊ ਹੁੱਕ ਜਾਂ ਸੁੱਕੀ ਲੱਕੜ ਨਾਲ ਉਸਨੂੰ ਬੱਸਬਾਰ ਤੋਂ ਵੱਖ ਕਰੋ। ਤੁਰੰਤ ਸਾਹ ਚੈੱਕ ਕਰਕੇ CPR ਸ਼ੁਰੂ ਕਰੋ ਅਤੇ ਡਾਕਟਰ ਨੂੰ ਬੁਲਾਓ।',
        },
        contextNote: 'Critical life-safety emergency response protocol under extreme pressure.',
      },

      // 1.3 Schematics & Logic
      {
        id: 'elec-sch-01',
        category: 'schematic_blueprints',
        categoryLabel: 'Schematics & Wiring Logic',
        categoryIcon: 'FileCode',
        difficulty: 'Intermediate',
        stageName: 'Control Wiring & Interlock Diagnostics',
        stageSubtitle: 'Star-Delta transition timer and mechanical interlocks',
        question: {
          en: 'In an automatic Star-Delta motor starter panel, pressing the Start pushbutton pulls in the Main Contactor and Star Contactor normally. However, after 8 seconds when the pneumatic/electronic timer transitions, the Star contactor drops out but the Delta contactor never pulls in, and the motor slows down to a stop. What electrical and mechanical interlocks in the control circuit do you troubleshoot?',
          hi: 'स्टार-डेल्टा स्टार्टर में स्टार्ट दबाने पर मेन और स्टार कॉन्टैक्टर चालू होते हैं। लेकिन 8 सेकंड बाद टाइमर बदलने पर स्टार बंद हो जाता है पर डेल्टा कॉन्टैक्टर ऑन नहीं होता और मोटर रुक जाती है। आप कंट्रोल सर्किट में किन इंटरलॉक्स की जांच करेंगे?',
          pa: 'ਸਟਾਰ-ਡੈਲਟਾ ਸਟਾਰਟਰ ਵਿੱਚ ਸਟਾਰਟ ਦਬਾਉਣ ਤੇ ਮੇਨ ਅਤੇ ਸਟਾਰ ਕੰਟੈਕਟਰ ਆਨ ਹੁੰਦੇ ਹਨ। ਪਰ 8 ਸੈਕਿੰਡ ਬਾਅਦ ਟਾਈਮਰ ਬਦਲਣ ਤੇ ਸਟਾਰ ਬੰਦ ਹੋ ਜਾਂਦਾ ਹੈ ਪਰ ਡੈਲਟਾ ਕੰਟੈਕਟਰ ਆਨ ਨਹੀਂ ਹੁੰਦਾ ਅਤੇ ਮੋਟਰ ਬੰਦ ਹੋ ਜਾਂਦੀ ਹੈ। ਤੁਸੀਂ ਕਿਹੜੇ ਇੰਟਰਲਾਕ ਚੈੱਕ ਕਰੋਗੇ?',
        },
        interviewerTone: 'probing',
        expectedKeywords: {
          en: ['normally closed contact', 'nc interlock', 'timer contact 15-18', 'delta coil a1-a2', 'auxiliary contact', 'mechanical interlock jam'],
          hi: ['NC इंटरलॉक', 'टाइमर कॉन्टैक्ट 15-18', 'डेल्टा कॉइल A1-A2', 'ऑक्सिलरी कॉन्टैक्ट', 'मैकेनिकल इंटरलॉक'],
          pa: ['NC ਇੰਟਰਲਾਕ', 'ਟਾਈਮਰ ਕੰਟੈਕਟ 15-18', 'ਡੈਲਟਾ ਕੋਇਲ A1-A2', 'ਸਹਾਇਕ ਕੰਟੈਕਟ', 'ਮਕੈਨੀਕਲ ਇੰਟਰਲਾਕ'],
        },
        sampleAnswers: {
          en: 'I would trace the Delta contactor coil (A1-A2) control line. Specifically: 1) Verify the Normally Open (NO) delayed contact on the timer (terminals 15-18 or 17-18) actually closes when timing out. 2) Check the electrical interlocking Normally Closed (NC) auxiliary contact on the Star contactor — if its contacts are pitted, loose, or stuck open, power will never reach the Delta coil. 3) Inspect the mechanical interlock bar between the Star and Delta contactors to ensure it is not physically jamming the Delta armature. 4) Measure 230V/110V control voltage directly across Delta coil terminals A1-A2 with a multimeter.',
          hi: 'मैं डेल्टा कॉइल (A1-A2) की कंट्रोल वायरिंग की जांच करूंगा: 1) टाइमर का NO कॉन्टैक्ट (15-18) समय पूरा होने पर बंद हो रहा है या नहीं। 2) स्टार कॉन्टैक्टर पर लगा NC ऑक्ज़िलरी इंटरलॉक कॉन्टैक्ट चेक करें कि कहीं वह ओपन या खराब तो नहीं। 3) दोनों कॉन्टैक्टरों के बीच लगी मैकेनिकल इंटरलॉक पत्ती चेक करें कि वह डेल्टा को जाम तो नहीं कर रही।',
          pa: 'ਮੈਂ ਡੈਲਟਾ ਕੋਇਲ (A1-A2) ਦੀ ਵਾਇਰਿੰਗ ਦੇਖਾਂਗਾ: 1) ਟਾਈਮਰ ਦਾ NO ਕੰਟੈਕਟ (15-18) ਸਮਾਂ ਪੂਰਾ ਹੋਣ ਤੇ ਕਲੋਜ਼ ਹੋ ਰਿਹਾ ਹੈ ਜਾਂ ਨਹੀਂ। 2) ਸਟਾਰ ਕੰਟੈਕਟਰ ਦਾ NC ਸਹਾਇਕ ਇੰਟਰਲਾਕ ਚੈੱਕ ਕਰਾਂਗਾ ਕਿ ਕੋਈ ਕਾਰਬਨ ਤਾਂ ਨਹੀਂ। 3) ਦੋਵਾਂ ਕੰਟੈਕਟਰਾਂ ਵਿਚਕਾਰ ਮਕੈਨੀਕਲ ਇੰਟਰਲਾਕ ਲਿੰਕ ਚੈੱਕ ਕਰਾਂਗਾ ਕਿ ਡੈਲਟਾ ਨੂੰ ਜਾਮ ਤਾਂ ਨਹੀਂ ਕਰ ਰਿਹਾ।',
        },
        contextNote: 'Probes understanding of control schematic ladder logic and interlocking safety.',
      },

      // 1.4 Sizing & Calculations
      {
        id: 'elec-calc-01',
        category: 'sizing_calculations',
        categoryLabel: 'Sizing & Field Calculations',
        categoryIcon: 'Calculator',
        difficulty: 'Advanced',
        stageName: 'Cable Ampacity & Protection Sizing',
        stageSubtitle: 'Voltage drop calculation over 120m run and MCCB trip selection',
        question: {
          en: 'You need to feed a new 37kW (50 HP), 415V, 3-phase induction motor with a power factor of 0.86 and efficiency of 92% located 120 meters away from the main distribution board. Calculate the full load current (FLC), select the appropriate copper XLPE armored cable size to keep voltage drop under 3%, and choose the motor circuit breaker (MCCB) rating.',
          hi: 'मेन बोर्ड से 120 मीटर दूर 37kW (50 HP), 415V, 3-फेज मोटर लगानी है (PF 0.86, एफिशिएंसी 92%)। इसका फुल लोड करंट (FLC) निकालें, 3% से कम वोल्टेज ड्रॉप के लिए कॉपर केबल का साइज और MCCB की रेटिंग बताएं।',
          pa: 'ਮੇਨ ਬੋਰਡ ਤੋਂ 120 ਮੀਟਰ ਦੂਰ 37kW (50 HP), 415V, 3-ਫੇਜ਼ ਮੋਟਰ ਲਗਾਉਣੀ ਹੈ (PF 0.86, ਕੁਸ਼ਲਤਾ 92%)। ਫੁੱਲ ਲੋਡ ਕਰੰਟ (FLC) ਕੱਢੋ, 3% ਤੋਂ ਘੱਟ ਵੋਲਟੇਜ ਡਰਾਪ ਲਈ ਕਾਪਰ ਕੇਬਲ ਦਾ ਸਾਈਜ਼ ਅਤੇ MCCB ਰੇਟਿੰਗ ਚੁਣੋ।',
        },
        interviewerTone: 'pressure_test',
        expectedKeywords: {
          en: ['flc = 66a', '66 to 68 amps', 'voltage drop formula', '35 sq mm', '50 sq mm', '100a mccb', 'motor duty rating', 'derating factor'],
          hi: ['FLC 66-68A', 'वोल्टेज ड्रॉप सूत्र', '35 sq mm', '50 sq mm', '100A MCCB', 'डीरेटिंग फैक्टर'],
          pa: ['FLC 66-68A', 'ਵੋਲਟੇਜ ਡਰਾਪ ਫਾਰਮੂਲਾ', '35 sq mm', '50 sq mm', '100A MCCB', 'ਡੀਰੇਟਿੰਗ ਫੈਕਟਰ'],
        },
        sampleAnswers: {
          en: '1) FLC Calculation: P / (√3 × V × PF × Eff) = 37000 / (1.732 × 415 × 0.86 × 0.92) ≈ 65.5 Amperes. 2) Cable Sizing: Continuous duty rating requires 125% of FLC = 65.5 × 1.25 = 81.9A. Over a 120m run, a standard 25 sq mm copper cable would have excessive voltage drop (> 4.2%). Using 35 sq mm 4-core XLPE armored copper cable keeps the voltage drop at approximately 2.3% (9.5V drop on 415V line), well below the 3% limit. 3) Breaker Selection: Select a 100A 3-pole Motor-Duty MCCB (Type D or adjustable thermal-magnetic release) set to 1.15x to 1.25x FLC with a Type-2 coordination table.',
          hi: '1) फुल लोड करंट: 37000 / (1.732 × 415 × 0.86 × 0.92) = लगभग 66A। 2) केबल साइज: 120 मीटर लंबी दूरी के लिए वोल्टेज ड्रॉप 3% (12.4V) से कम रखने के लिए 35 sq mm 4-कोर XLPE कॉपर आर्मर्ड केबल चुनेंगे। 3) प्रोटेक्शन: 100A मोटर ड्यूटी MCCB (थर्मल सेटिंग 70-80A) चुनेंगे।',
          pa: '1) ਫੁੱਲ ਲੋਡ ਕਰੰਟ: 37000 / (1.732 × 415 × 0.86 × 0.92) = ਲਗਭਗ 66A। 2) ਕੇਬਲ ਸਾਈਜ਼: 120 ਮੀਟਰ ਦੂਰੀ ਲਈ ਵੋਲਟੇਜ ਡਰਾਪ 3% ਤੋਂ ਘੱਟ ਰੱਖਣ ਲਈ 35 sq mm ਕਾਪਰ ਆਰਮਰਡ ਕੇਬਲ ਸਭ ਤੋਂ ਉੱਤਮ ਹੈ। 3) ਬਰੇਕਰ: 100A ਮੋਟਰ ਡਿਊਟੀ MCCB ਚੁਣਾਂਗਾ।',
        },
        contextNote: 'Tests precision electrical math, IEEE/NEC ampacity tables, and line voltage drop limits.',
      },

      // 1.5 Behavioral Field Conflict
      {
        id: 'elec-beh-01',
        category: 'behavioral_field',
        categoryLabel: 'Field Scenario & Conflict',
        categoryIcon: 'Users',
        difficulty: 'Intermediate',
        stageName: 'Production Pressure & Safety Integrity',
        stageSubtitle: 'Handling managerial pushback against mandatory safety isolation',
        question: {
          en: 'You are troubleshooting a main bottling line MCC panel. The production plant manager rushes in angrily shouting that downtime is costing ₹50,000 per minute, demanding you bypass the faulty earth leakage relay (ELCB) with a jumper wire so they can run the shift, promising to fix it on Sunday. How do you handle this high-pressure confrontation professionally and safely?',
          hi: 'आप MCC पैनल ठीक कर रहे हैं। प्लांट मैनेजर गुस्से में आकर कहता है कि हर मिनट 50,000 का नुकसान हो रहा है, और ELCB रिले को जम्पर तार से बायपास करके तुरंत लाइन चालू करने का दबाव बनाता है। आप इस स्थिति को कैसे संभालेंगे?',
          pa: 'ਤੁਸੀਂ MCC ਪੈਨਲ ਰਿਪੇਅਰ ਕਰ ਰਹੇ ਹੋ। ਪਲਾਂਟ ਮੈਨੇਜਰ ਗੁੱਸੇ ਵਿੱਚ ਆ ਕੇ ਕਹਿੰਦਾ ਹੈ ਕਿ ਹਰ ਮਿੰਟ 50,000 ਦਾ ਨੁਕਸਾਨ ਹੋ ਰਿਹਾ ਹੈ, ਅਤੇ ELCB ਰਿਲੇ ਨੂੰ ਤਾਰ ਨਾਲ ਬਾਈਪਾਸ ਕਰਕੇ ਤੁਰੰਤ ਮਸ਼ੀਨ ਚਲਾਉਣ ਦਾ ਦਬਾਅ ਪਾਉਂਦਾ ਹੈ। ਤੁਸੀਂ ਇਸਨੂੰ ਕਿਵੇਂ ਸੰਭਾਲੋਗੇ?',
        },
        interviewerTone: 'pressure_test',
        expectedKeywords: {
          en: ['never bypass safety', 'electrocution risk', 'fire hazard', 'explain liability', 'isolate specific sub-branch', 'rapid megger test', 'incident log'],
          hi: ['सुरक्षा रिले बायपास कभी नहीं', 'करंट लगने का खतरा', 'आग का जोखिम', 'सब-ब्रांच आइसोलेट', 'तेजी से मेगर टेस्ट', 'लिखित लॉग'],
          pa: ['ਸੁਰੱਖਿਆ ਰਿਲੇ ਕਦੇ ਬਾਈਪਾਸ ਨਹੀਂ', 'ਕਰੰਟ ਲੱਗਣ ਦਾ ਖਤਰਾ', 'ਅੱਗ ਦਾ ਖਤਰਾ', 'ਸਬ-ਸਰਕਟ ਆਈਸੋਲੇਟ', 'ਤੇਜ਼ੀ ਨਾਲ ਮੈਗਰ ਟੈਸਟ'],
        },
        sampleAnswers: {
          en: 'I remain calm, empathetic to the production urgency, but completely unyielding on life safety: 1) Clearly state: "I understand the cost of downtime, but bypassing the Earth Leakage Relay creates an immediate risk of fatal electrocution and electrical fire that could destroy the entire plant and trigger criminal liability." 2) Offer an immediate actionable technical compromise: instead of holding the entire line down, rapidly isolate and disconnect individual branch feeder circuits with a Megger to isolate the single faulted motor or heating element in 5 minutes, allowing the rest of the line to run safely on partial capacity with full protection intact. 3) Document all actions in the official shift maintenance log.',
          hi: 'मैं शांत रहकर मैनेजर को समझाऊंगा: "मैं उत्पादन नुकसान को समझता हूँ, लेकिन ELCB बायपास करने से ऑपरेटर को जानलेवा शॉक लग सकता है या पैनल में आग लग सकती है।" इसके बाद मैं तुरंत 5 मिनट में प्रत्येक फीडर को अलग-अलग मेगर करके केवल फॉल्टी मोटर को अलग कर दूंगा ताकि बाकी लाइन सुरक्षित रूप से चालू हो सके।',
          pa: 'ਮੈਂ ਸ਼ਾਂਤ ਰਹਿ ਕੇ ਸਮਝਾਵਾਂਗਾ: "ਮੈਂ ਨੁਕਸਾਨ ਸਮਝਦਾ ਹਾਂ ਪਰ ELCB ਬਾਈਪਾਸ ਕਰਨ ਨਾਲ ਕਿਸੇ ਵਰਕਰ ਦੀ ਜਾਨ ਜਾ ਸਕਦੀ ਹੈ ਜਾਂ ਪਲਾਂਟ ਵਿੱਚ ਅੱਗ ਲੱਗ ਸਕਦੀ ਹੈ।" ਮੈਂ ਤੁਰੰਤ 5 ਮਿੰਟ ਵਿੱਚ ਮੈਗਰ ਨਾਲ ਚੈੱਕ ਕਰਕੇ ਸਿਰਫ ਖਰਾਬ ਮੋਟਰ ਨੂੰ ਅਲੱਗ ਕਰ ਦੇਵਾਂਗਾ ਤਾਂ ਜੋ ਬਾਕੀ ਸਿਸਟਮ ਸੁਰੱਖਿਅਤ ਚੱਲ ਸਕੇ।',
        },
        contextNote: 'Tests ethical integrity, assertiveness under authority pressure, and creative troubleshooting.',
      },

      // 1.6 Obscure Edge Case
      {
        id: 'elec-edge-01',
        category: 'obscure_edge_case',
        categoryLabel: 'Obscure & Intermittent Faults',
        categoryIcon: 'HelpCircle',
        difficulty: 'Advanced',
        stageName: 'Intermittent Midnight Tripping & Harmonics',
        stageSubtitle: 'Diagnosing 3 AM VFD harmonic resonance and neutral overheating',
        question: {
          en: 'An industrial HVAC chiller VFD panel runs perfectly during the day, but trips erratically on "DC Bus Overvoltage" and "Earth Leakage" only between 2:00 AM and 4:00 AM when factory loads are light. Additionally, the neutral conductor in the main subpanel is running 60°C hotter than the phase conductors despite phase current being low. What obscure electrical phenomenon is taking place and how do you diagnose it with a power quality analyzer?',
          hi: 'एक चिलर VFD दिन में ठीक चलता है, लेकिन रात 2 से 4 बजे के बीच जब लोड कम होता है तो "DC बस ओवरवोल्टेज" और "अर्थ लीकेज" पर ट्रिप हो जाता है। साथ ही न्यूट्रल तार 60°C गर्म हो रहा है। यह कौन सी दुर्लभ समस्या है और इसे कैसे ठीक करेंगे?',
          pa: 'ਚਿਲਰ VFD ਦਿਨ ਵੇਲੇ ਠੀਕ ਚੱਲਦਾ ਹੈ ਪਰ ਰਾਤ 2 ਤੋਂ 4 ਵਜੇ ਵਿਚਕਾਰ ਜਦੋਂ ਲੋਡ ਘੱਟ ਹੁੰਦਾ ਹੈ ਤਾਂ "DC Bus Overvoltage" ਤੇ ਟ੍ਰਿਪ ਹੁੰਦਾ ਹੈ ਅਤੇ ਨਿਊਟਰਲ ਤਾਰ 60°C ਗਰਮ ਹੋ ਜਾਂਦੀ ਹੈ। ਇਹ ਕਿਹੜੀ ਗੰਭੀਰ ਸਮੱਸਿਆ ਹੈ ਅਤੇ ਕਿਵੇਂ ਠੀਕ ਕਰੋਗੇ?',
        },
        interviewerTone: 'probing',
        expectedKeywords: {
          en: ['triplen harmonics', '3rd harmonic', 'capacitor resonance', 'grid utility voltage rise', 'power quality analyzer', 'line reactor', 'harmonic filter'],
          hi: ['ट्रिपलन हार्मोनिक्स', 'तीसरा हार्मोनिक', 'कैपेसिटर रेजोनेंस', 'ग्रिड वोल्टेज वृद्धि', 'पावर क्वालिटी एनालाइज़र', 'लाइन रिएक्टर'],
          pa: ['ਹਾਰਮੋਨਿਕਸ', 'ਤੀਜਾ ਹਾਰਮੋਨਿਕ', 'ਕਪੈਸਿਟਰ ਰੈਜ਼ੋਨੈਂਸ', 'ਗਰਿੱਡ ਵੋਲਟੇਜ ਵਾਧਾ', 'ਪਾਵਰ ਕੁਆਲਿਟੀ ਐਨਾਲਾਈਜ਼ਰ', 'ਲਾਈਨ ਰਿਐਕਟਰ'],
        },
        sampleAnswers: {
          en: 'This is caused by a combination of grid utility lightly-loaded voltage surge (Ferranti effect / off-peak grid voltage rise) and 3rd/9th Triplen Harmonics from non-linear VFD rectifiers. At 3 AM, grid voltage climbs from 415V to 450V, pushing the rectified VFD DC link voltage above the 780V DC overvoltage trip threshold. Triplen harmonic currents add up in phase in the neutral conductor (rather than cancelling), causing extreme neutral overheating (In = 1.73 x Iphase). To diagnose, connect a Fluke 435 Power Quality Analyzer to record THD-V, THD-I, and individual harmonic spectrums. Fix by installing a 3% or 5% AC Line Reactor or Active Harmonic Filter (AHF) and setting VFD DC overvoltage deceleration braking resistors.',
          hi: 'यह रात के समय ग्रिड वोल्टेज बढ़ने और VFD के नॉन-लीनियर लोड से उत्पन्न तीसरे (3rd Triplen) हार्मोनिक्स के कारण होता है। रात में ग्रिड वोल्टेज 440V+ होने से DC बस 780V पार कर जाती है। ट्रिपलन हार्मोनिक्स न्यूट्रल में जुड़कर उसे अत्यधिक गर्म करते हैं। इसे पावर क्वालिटी एनालाइज़र से THD नापकर 3% लाइन रिएक्टर और हार्मोनिक फिल्टर लगाकर हल करेंगे।',
          pa: 'ਇਹ ਰਾਤ ਵੇਲੇ ਗਰਿੱਡ ਵੋਲਟੇਜ ਵਧਣ ਅਤੇ VFD ਦੇ ਤੀਜੇ ਹਾਰਮੋਨਿਕਸ (Triplen Harmonics) ਕਰਕੇ ਹੁੰਦਾ ਹੈ। ਰਾਤ ਨੂੰ ਵੋਲਟੇਜ ਵਧਣ ਨਾਲ DC ਬੱਸ ਓਵਰਵੋਲਟੇਜ ਹੋ ਜਾਂਦੀ ਹੈ ਅਤੇ ਹਾਰਮੋਨਿਕਸ ਨਿਊਟਰਲ ਤਾਰ ਨੂੰ ਗਰਮ ਕਰ ਦਿੰਦੇ ਹਨ। ਇਸਨੂੰ ਪਾਵਰ ਕੁਆਲਿਟੀ ਐਨਾਲਾਈਜ਼ਰ ਨਾਲ ਜਾਂਚ ਕੇ AC ਲਾਈਨ ਰਿਐਕਟਰ ਜਾਂ ਐਕਟਿਵ ਹਾਰਮੋਨਿਕ ਫਿਲਟਰ ਲਗਾ ਕੇ ਠੀਕ ਕਰਾਂਗਾ।',
        },
        contextNote: 'Probes master-level understanding of power quality, harmonics, and utility transients.',
      },
    ],
  },

  // ==========================================
  // 2. HVAC & COMMERCIAL REFRIGERATION
  // ==========================================
  {
    tradeId: 'hvac_refrigeration',
    tradeName: 'HVAC & Commercial Refrigeration',
    tradeIcon: 'Snowflake',
    description: 'R410A/R32 systems, TXV superheat diagnostics, scroll compressor burnouts, recovery procedures, and airflow static pressure.',
    interviewerName: 'Gurpreet Singh Kahlon',
    interviewerTitle: 'Senior HVAC & Chillers Lead Engineer',
    interviewerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    questions: [
      {
        id: 'hvac-tb-01',
        category: 'troubleshooting',
        categoryLabel: 'Diagnostic & Fault Finding',
        categoryIcon: 'Wrench',
        difficulty: 'Intermediate',
        stageName: 'Initial Diagnostic Screening',
        stageSubtitle: 'Diagnosing refrigeration cycle pressure anomalies',
        question: {
          en: 'A 10-ton commercial rooftop package unit running R-410A is cooling poorly. Your digital manifold gauges read: Low side suction pressure 82 psig with 28°F superheat, while High side head pressure is 410 psig with 22°F subcooling. What is your primary diagnosis?',
          hi: '10-टन कमर्शियल रूफटॉप एसी कम कूलिंग कर रहा है। लो साइड प्रेशर 82 psig व सुपरहीट 28°F है, और हाई साइड 410 psig व सबकूलिंग 22°F है। आपकी प्राथमिक डायग्नोसिस क्या है?',
          pa: '10-ਟਨ ਕਮਰਸ਼ੀਅਲ ਰੂਫਟਾਪ AC ਠੰਢਾ ਘੱਟ ਕਰ ਰਿਹਾ ਹੈ। ਲੋਅ ਸਾਈਡ ਪ੍ਰੈਸ਼ਰ 82 psig ਤੇ ਸੁਪਰਹੀਟ 28°F ਹੈ, ਅਤੇ ਹਾਈ ਸਾਈਡ 410 psig ਤੇ ਸਬਕੂਲਿੰਗ 22°F ਹੈ। ਤੁਹਾਡਾ ਮੁੱਖ ਕਾਰਨ ਕੀ ਹੈ?',
        },
        interviewerTone: 'welcoming',
        expectedKeywords: {
          en: ['txv', 'expansion valve', 'restriction', 'filter drier', 'liquid line', 'superheat high', 'subcooling high', 'underfeed'],
          hi: ['TXV', 'एक्सपेंशन वाल्व', 'फिल्टर ड्रायर', 'लिक्विड लाइन', 'हाई सुपरहीट', 'हाई सबकूलिंग'],
          pa: ['TXV', 'ਐਕਸਪੈਂਸ਼ਨ ਵਾਲਵ', 'ਫਿਲਟਰ ਡਰਾਇਰ', 'ਲਿਕਵਿਡ ਲਾਈਨ', 'ਹਾਈ ਸੁਪਰਹੀਟ', 'ਹਾਈ ਸਬਕੂਲਿੰਗ'],
        },
        sampleAnswers: {
          en: 'High superheat (28°F) paired with high subcooling (22°F) and low suction pressure is the textbook indicator of a liquid line restriction — typically a restricted Thermal Expansion Valve (TXV) orifice/bulb failure or a clogged liquid line filter-drier backing up refrigerant into the condenser.',
          hi: 'हाई सुपरहीट (28°F) और हाई सबकूलिंग (22°F) के साथ कम सक्शन प्रेशर लिक्विड लाइन में रुकावट (रेस्ट्रिक्शन) का स्पष्ट संकेत है, जो चोक्ड TXV वाल्व या बंद फिल्टर-ड्रायर के कारण होता है।',
          pa: 'ਹਾਈ ਸੁਪਰਹੀਟ (28°F) ਅਤੇ ਹਾਈ ਸਬਕੂਲਿੰਗ (22°F) ਨਾਲ ਘੱਟ ਪ੍ਰੈਸ਼ਰ ਲਿਕਵਿਡ ਲਾਈਨ ਵਿੱਚ ਰੁਕਾਵਟ ਦਰਸਾਉਂਦਾ ਹੈ, ਜੋ ਕਿ ਫਿਲਟਰ ਡਰਾਇਰ ਜਾਂ TXV ਐਕਸਪੈਂਸ਼ਨ ਵਾਲਵ ਬਲਾਕ ਹੋਣ ਕਰਕੇ ਹੁੰਦਾ ਹੈ।',
        },
        contextNote: 'Superheat vs subcooling matrix diagnosis.',
      },
      {
        id: 'hvac-sf-01',
        category: 'safety_emergency',
        categoryLabel: 'Safety & Emergency Protocol',
        categoryIcon: 'ShieldAlert',
        difficulty: 'Advanced',
        stageName: 'EPA Recovery & Oxygen Explosion Safety',
        stageSubtitle: 'EPA 608 recovery, deep vacuum & nitrogen purge safety',
        question: {
          en: 'You must replace a burned-out scroll compressor. Explain your EPA Section 608 compliant recovery process, the exact micron level for evacuation, and why you must NEVER use pure oxygen or shop compressed air for pressure testing.',
          hi: 'आपको जले हुए स्क्रॉल कंप्रेसर को बदलना है। EPA 608 रिकवरी प्रक्रिया, कितने माइक्रोन तक वैक्यूम करना है, और प्रेशर टेस्टिंग के लिए ऑक्सीजन का उपयोग क्यों वर्जित है?',
          pa: 'ਤੁਸੀਂ ਸੜਿਆ ਕੰਪ੍ਰੈਸਰ ਬਦਲਣਾ ਹੈ। EPA 608 ਰਿਕਵਰੀ ਪ੍ਰਕਿਰਿਆ, ਵੈਕਿਊਮ ਲਈ ਕਿੰਨੇ ਮਾਈਕ੍ਰੋਨ ਚਾਹੀਦੇ ਹਨ, ਅਤੇ ਪ੍ਰੈਸ਼ਰ ਟੈਸਟ ਲਈ ਆਕਸੀਜਨ ਦੀ ਵਰਤੋਂ ਕਿਉਂ ਮਨ੍ਹਾ ਹੈ?',
        },
        interviewerTone: 'safety_focused',
        expectedKeywords: {
          en: ['epa 608', 'recovery cylinder', '500 microns', 'deep vacuum', 'dry nitrogen', 'oxygen explosion hazard', 'diesel effect'],
          hi: ['EPA 608', 'रिकवरी सिलेंडर', '500 माइक्रोन', 'ड्राई नाइट्रोजन', 'ऑक्सीजन ब्लास्ट का खतरा', 'डीजल इफ़ेक्ट'],
          pa: ['EPA 608', 'ਰਿਕਵਰੀ ਸਿਲੰਡਰ', '500 ਮਾਈਕ੍ਰੋਨ', 'ਡਰਾਈ ਨਾਈਟ੍ਰੋਜਨ', 'ਆਕਸੀਜਨ ਧਮਾਕੇ ਦਾ ਖਤਰਾ'],
        },
        sampleAnswers: {
          en: '1) Recover all refrigerant into a certified recovery cylinder down to 10 inches Hg vacuum. 2) Flow 2-5 SCFH dry nitrogen while brazing. 3) Evacuate down below 500 microns with a two-stage vacuum pump. 4) NEVER use oxygen or compressed air for pressure testing because compressing pure oxygen with residual POE/mineral refrigeration oil causes catastrophic auto-ignition diesel explosions.',
          hi: '1) सर्टिफाइड यूनिट से गैस रिकवर करें। 2) ब्रेजिंग में ड्राई नाइट्रोजन बहाएं। 3) 500 माइक्रोन से नीचे वैक्यूम करें। 4) प्रेशर टेस्टिंग के लिए कभी ऑक्सीजन न लगाएं क्योंकि ऑयल और ऑक्सीजन मिलकर भयानक विस्फोट करते हैं।',
          pa: '1) ਰਿਕਵਰੀ ਮਸ਼ੀਨ ਨਾਲ ਗੈਸ ਸਿਲੰਡਰ ਵਿੱਚ ਕੱਢੋ। 2) ਵੈਲਡਿੰਗ ਵੇਲੇ ਡਰਾਈ ਨਾਈਟ੍ਰੋਜਨ ਚਲਾਓ। 3) 500 ਮਾਈਕ੍ਰੋਨ ਤੋਂ ਹੇਠਾਂ ਵੈਕਿਊਮ ਕਰੋ। 4) ਪ੍ਰੈਸ਼ਰ ਟੈਸਟ ਲਈ ਆਕਸੀਜਨ ਕਦੇ ਨਾ ਵਰਤੋ ਕਿਉਂਕਿ ਤੇਲ ਨਾਲ ਧਮਾਕਾ ਹੋ ਸਕਦਾ ਹੈ।',
        },
        contextNote: 'Life-safety and EPA refrigeration standards.',
      },
      {
        id: 'hvac-calc-01',
        category: 'sizing_calculations',
        categoryLabel: 'Sizing & Field Calculations',
        categoryIcon: 'Calculator',
        difficulty: 'Intermediate',
        stageName: 'Airflow & Static Pressure Verification',
        stageSubtitle: 'Total external static pressure (ESP) and Delta-T calculation',
        question: {
          en: 'With the system running, how do you measure Total External Static Pressure (ESP) using a dual-port digital manometer to verify 400 CFM per ton across the cooling coil, and what is the target dry-bulb Delta-T split under normal 50% relative humidity?',
          hi: 'डिजिटल मैनोमीटर से 400 CFM प्रति टन एयरफ्लो के लिए टोटल एक्सटर्नल स्टैटिक प्रेशर (ESP) कैसे मापेंगे और कॉइल पर कितना Delta-T तापमान अंतर सही माना जाता है?',
          pa: 'ਡਿਜੀਟਲ ਮੈਨੋਮੀਟਰ ਨਾਲ 400 CFM ਪ੍ਰਤੀ ਟਨ ਲਈ ਸਟੈਟਿਕ ਪ੍ਰੈਸ਼ਰ (ESP) ਕਿਵੇਂ ਚੈੱਕ ਕਰੋਗੇ ਅਤੇ ਠੰਢਕ ਲਈ ਕਿੰਨਾ Delta-T ਤਾਪਮਾਨ ਫਰਕ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ?',
        },
        interviewerTone: 'pressure_test',
        expectedKeywords: {
          en: ['manometer', 'static pressure', '0.50 in wc', 'delta-t', '18 to 22 degrees', 'cfm per ton', 'blower performance curve'],
          hi: ['मैनोमीटर', 'स्टैटिक प्रेशर', '0.50 in wc', 'डेल्टा-टी', '18-22 डिग्री', 'CFM'],
          pa: ['ਮੈਨੋਮੀਟਰ', 'ਸਟੈਟਿਕ ਪ੍ਰੈਸ਼ਰ', '0.50 in wc', 'ਡੈਲਟਾ-ਟੀ', '18-22 ਡਿਗਰੀ', 'CFM'],
        },
        sampleAnswers: {
          en: 'Measure static pressure in supply and return plenums before and after the blower. Add absolute values to obtain ESP (typically 0.50 in. w.c. for 400 CFM/ton). Measure return vs supply air temperatures; a healthy clean evaporator coil produces an 18°F to 22°F Delta-T split.',
          hi: 'सप्लाई और रिटर्न डक्ट में प्रेशर नापकर टोटल स्टैटिक प्रेशर (0.50 in wc) निकालें। सप्लाई और रिटर्न के बीच 18°F से 22°F का डेल्टा-टी सही एयरफ्लो और हीट ट्रांसफर दर्शाता है।',
          pa: 'ਡਿਜੀਟਲ ਮੈਨੋਮੀਟਰ ਨਾਲ ਸਪਲਾਈ ਅਤੇ ਰਿਟਰਨ ਦਾ ਸਟੈਟਿਕ ਪ੍ਰੈਸ਼ਰ (0.50 in wc) ਕੱਢੋ। ਸਪਲਾਈ ਤੇ ਰਿਟਰਨ ਹਵਾ ਵਿਚਕਾਰ 18°F ਤੋਂ 22°F ਦਾ ਤਾਪਮਾਨ ਫਰਕ ਸਹੀ ਕੂਲਿੰਗ ਦੀ ਨਿਸ਼ਾਨੀ ਹੈ।',
        },
        contextNote: 'Thermodynamics and psychrometric airflow verification.',
      },
    ],
  },

  // ==========================================
  // 3. WELDING & PIPE FABRICATION
  // ==========================================
  {
    tradeId: 'welding_fabrication',
    tradeName: 'Welding & Pipe Fabrication',
    tradeIcon: 'Flame',
    description: 'TIG/MIG pipe welding, 6G position joints, shielding gas flow rates, weld porosity inspection, and preheat temperature control.',
    interviewerName: 'Master Harbhajan Sandhu',
    interviewerTitle: 'Senior AWS Certified Welding Inspector & Fabrication Foreman',
    interviewerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    questions: [
      {
        id: 'weld-tb-01',
        category: 'troubleshooting',
        categoryLabel: 'Diagnostic & Fault Finding',
        categoryIcon: 'Wrench',
        difficulty: 'Intermediate',
        stageName: 'Root Pass Weld Defect Analysis',
        stageSubtitle: 'Porosity and lack of penetration in 6G pipe joint',
        question: {
          en: 'During a 6G fixed position TIG root pass on a 6-inch Schedule 80 carbon steel pipe, you observe lack of root penetration and porosity at the 6 o\'clock overhead position. What root causes do you investigate first?',
          hi: '6G पोजीशन में 6-इंच स्टीम पाइप पर TIG रूट पास लगाते समय 6 बजे ओवरहेड पोजीशन पर पेनिट्रेशन की कमी और पोरोसिटी दिखती है। आप किन कारणों की जांच करेंगे?',
          pa: '6G ਪੁਜ਼ੀਸ਼ਨ ਵਿੱਚ TIG ਰੂਟ ਪਾਸ ਲਗਾਉਂਦੇ ਸਮੇਂ 6 ਵਜੇ ਦੀ ਓਵਰਹੈੱਡ ਪੁਜ਼ੀਸ਼ਨ ਤੇ ਪੈਨੀਟ੍ਰੇਸ਼ਨ ਦੀ ਕਮੀ ਅਤੇ ਪੋਰੋਸਿਟੀ ਆਉਂਦੀ ਹੈ। ਤੁਸੀਂ ਕੀ ਕਾਰਨ ਦੇਖੋਗੇ?',
        },
        interviewerTone: 'welcoming',
        expectedKeywords: {
          en: ['argon shielding gas', 'root gap', 'land thickness', 'back purge', 'oxygen below 50 ppm', 'torch angle', 'travel speed'],
          hi: ['आर्गन गैस', 'रूट गैप', 'बैक पर्ज', 'ऑक्सीजन 50 ppm', 'टॉर्च एंगल', 'ट्रैवल स्पीड'],
          pa: ['ਆਰਗਨ ਗੈਸ', 'ਰੂਟ ਗੈਪ', 'ਬੈਕ ਪਰਜ', 'ਆਕਸੀਜਨ 50 ppm', 'ਟਾਰਚ ਐਂਗਲ'],
        },
        sampleAnswers: {
          en: 'Lack of root penetration at 6 o\'clock is caused by too tight a root gap (< 3/32"), excessive root land, too low amperage, or pushing wire rather than keyholing. Porosity is caused by turbulent or contaminated argon gas, draft breezes blowing away the gas lens envelope, or inadequate back-purge oxygen levels (> 50 ppm).',
          hi: 'ओवरहेड में पेनिट्रेशन की कमी रूट गैप कम होने या कम करंट से होती है। पोरोसिटी का कारण आर्गन गैस का खराब फ्लो, हवा का झोंका या पाइप में अपूर्ण बैक-पर्जिंग है।',
          pa: 'ਓਵਰਹੈੱਡ ਵਿੱਚ ਪੈਨੀਟ੍ਰੇਸ਼ਨ ਦੀ ਕਮੀ ਰੂਟ ਗੈਪ ਘੱਟ ਹੋਣ ਕਰਕੇ ਹੁੰਦੀ ਹੈ। ਪੋਰੋਸਿਟੀ ਆਰਗਨ ਗੈਸ ਦੇ ਲੀਕ ਹੋਣ ਜਾਂ ਅੰਦਰ ਪਰਜਿੰਗ ਸਹੀ ਨਾ ਹੋਣ ਕਾਰਨ ਹੁੰਦੀ ਹੈ।',
        },
        contextNote: 'Pipe welding metallurgy and shielding dynamics.',
      },
      {
        id: 'weld-sf-01',
        category: 'safety_emergency',
        categoryLabel: 'Safety & Emergency Protocol',
        categoryIcon: 'ShieldAlert',
        difficulty: 'Advanced',
        stageName: 'Confined Space Hot Work & Fire Watch',
        stageSubtitle: 'Boiler room flammable proximity and gas cylinder safety',
        question: {
          en: 'You are welding inside a confined boiler room with nearby fuel supply lines. What signed hot work permits, continuous atmospheric gas testing (LEL / O2), 35-foot combustible clearance, and 30-minute fire watch protocols must you enforce?',
          hi: 'बॉयलर रूम में फ्यूल लाइनों के पास वेल्डिंग करते समय हॉट वर्क परमिट, गैस डिटेक्टर LEL 0%, 35 फीट की दूरी और 30 मिनट फायर वॉच के क्या नियम हैं?',
          pa: 'ਬਾਇਲਰ ਰੂਮ ਵਿੱਚ ਪਾਈਪਾਂ ਕੋਲ ਵੈਲਡਿੰਗ ਕਰਦੇ ਸਮੇਂ ਹਾਟ ਵਰਕ ਪਰਮਿਟ, ਗੈਸ ਟੈਸਟਿੰਗ, 35 ਫੁੱਟ ਦੂਰੀ ਅਤੇ 30 ਮਿੰਟ ਫਾਇਰ ਵਾਚ ਦੇ ਕੀ ਨਿਯਮ ਹਨ?',
        },
        interviewerTone: 'safety_focused',
        expectedKeywords: {
          en: ['hot work permit', 'fire watch 30 min', 'lel 0%', 'o2 19.5-23.5%', '35 feet clearance', 'fire blanket', 'flashback arrestor'],
          hi: ['हॉट वर्क परमिट', 'फायर वॉच 30 मिनट', 'LEL 0%', '35 फीट दूरी', 'फायर ब्लैंकेट', 'फ्लैशबैक अरेस्टर'],
          pa: ['ਹਾਟ ਵਰਕ ਪਰਮਿਟ', 'ਫਾਇਰ ਵਾਚ 30 ਮਿੰਟ', 'LEL 0%', '35 ਫੁੱਟ ਦੂਰੀ', 'ਫਾਇਰ ਬਲੈਂਕੇਟ', 'ਫਲੈਸ਼ਬੈਕ ਅਰੈਸਟਰ'],
        },
        sampleAnswers: {
          en: '1) Obtain authorized Hot Work Permit and verify atmosphere (LEL 0%, O2 19.5–23.5%). 2) Cover all combustibles within 35 feet with rated welding blankets. 3) Maintain a dedicated Fire Watch during hot work and for 30 minutes post-weld with an extinguisher. 4) Use chained upright cylinders with flashback arrestors at both torch and regulator.',
          hi: '1) हॉट वर्क परमिट लें और LEL 0% जांचें। 2) 35 फीट के दायरे में सभी ज्वलनशील पदार्थों को फायर ब्लैंकेट से ढकें। 3) वेल्डिंग के बाद 30 मिनट तक फायर वॉच रखें। 4) सिलेंडरों में फ्लैशबैक अरेस्टर लगाएं।',
          pa: '1) ਹਾਟ ਵਰਕ ਪਰਮਿਟ ਲਵਾਂਗਾ ਅਤੇ ਗੈਸ ਟੈਸਟਰ ਨਾਲ ਹਵਾ ਚੈੱਕ ਕਰਾਂਗਾ। 2) 35 ਫੁੱਟ ਦੇ ਦਾਇਰੇ ਵਿੱਚ ਅੱਗ ਲੱਗਣ ਵਾਲੀਆਂ ਚੀਜ਼ਾਂ ਨੂੰ ਫਾਇਰ ਬਲੈਂਕੇਟ ਨਾਲ ਢਕਾਂਗਾ। 3) ਕੰਮ ਤੋਂ ਬਾਅਦ 30 ਮਿੰਟ ਤੱਕ ਫਾਇਰ ਵਾਚ ਰਹੇਗੀ।',
        },
        contextNote: 'OSHA 1910 hot work and confined space life-safety.',
      },
    ],
  },

  // ==========================================
  // 4. COMMERCIAL PLUMBING & HYDRONICS
  // ==========================================
  {
    tradeId: 'plumbing_hydronics',
    tradeName: 'Commercial Plumbing & Hydronics',
    tradeIcon: 'Droplets',
    description: 'Reduced pressure zone backflow preventers, PRV stations, high-rise booster pump cavitation, and hydronic loop air separation.',
    interviewerName: 'Er. Jasleen Kaur',
    interviewerTitle: 'Lead Mechanical & Utilities Systems Engineer',
    interviewerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    questions: [
      {
        id: 'plumb-tb-01',
        category: 'troubleshooting',
        categoryLabel: 'Diagnostic & Fault Finding',
        categoryIcon: 'Wrench',
        difficulty: 'Intermediate',
        stageName: 'Booster Pump Cavitation Analysis',
        stageSubtitle: 'Rattling impeller noise and suction head deficiency',
        question: {
          en: 'A duplex variable speed booster pump system in a 14-story building is making a violent gravel-churning noise inside the impeller casing, and pressure is hunting between 45 psi and 95 psi. What is happening and what do you inspect first?',
          hi: '14 मंजिला इमारत का बूस्टर पंप कंकड़ चबाने जैसी आवाज कर रहा है और प्रेशर 45 से 95 psi के बीच झूल रहा है। यह क्या समस्या है और आप सबसे पहले क्या जांचेंगे?',
          pa: '14 ਮੰਜ਼ਿਲਾ ਇਮਾਰਤ ਦਾ ਬੂਸਟਰ ਪੰਪ ਕੰਕਰ ਘੁੰਮਣ ਵਰਗੀ ਆਵਾਜ਼ ਕਰ ਰਿਹਾ ਹੈ ਅਤੇ ਪ੍ਰੈਸ਼ਰ 45 ਤੋਂ 95 psi ਵਿਚਕਾਰ ਝਟਕੇ ਲੈ ਰਿਹਾ ਹੈ। ਇਹ ਕੀ ਸਮੱਸਿਆ ਹੈ?',
        },
        interviewerTone: 'welcoming',
        expectedKeywords: {
          en: ['cavitation', 'npsh', 'net positive suction head', 'suction strainer', 'inlet valve', 'impeller pitting'],
          hi: ['कैविटेशन', 'NPSH', 'सक्शन स्ट्रेनर', 'इनलेट वाल्व', 'इम्पेलर'],
          pa: ['ਕੈਵੀਟੇਸ਼ਨ', 'NPSH', 'ਸਕਸ਼ਨ ਸਟ੍ਰੇਨਰ', 'ਇਨਲੈੱਟ ਵਾਲਵ'],
        },
        sampleAnswers: {
          en: 'The "gravel sound" is classic pump cavitation caused by insufficient Net Positive Suction Head Available (NPSHa). I would immediately inspect the suction Y-strainer for debris clogging, check suction inlet valve open percentage, and test the municipal suction pressure gauge.',
          hi: 'कंकड़ जैसी आवाज पंप कैविटेशन का संकेत है जो सक्शन प्रेशर (NPSH) कम होने के कारण होता है। मैं तुरंत सक्शन साइड के Y-स्ट्रेनर की सफाई और इनलेट वाल्व की जांच करूंगा।',
          pa: 'ਕੰਕਰਾਂ ਵਰਗੀ ਆਵਾਜ਼ ਪੰਪ ਵਿੱਚ ਕੈਵੀਟੇਸ਼ਨ ਦੀ ਨਿਸ਼ਾਨੀ ਹੈ ਜੋ ਕਿ ਸੈਕਸ਼ਨ ਪ੍ਰੈਸ਼ਰ (NPSH) ਘਟਣ ਕਰਕੇ ਹੁੰਦੀ ਹੈ। ਮੈਂ ਪਹਿਲਾਂ ਸਕਸ਼ਨ Y-ਸਟ੍ਰੇਨਰ ਅਤੇ ਇਨਲੈੱਟ ਵਾਲਵ ਚੈੱਕ ਕਰਾਂਗਾ।',
        },
        contextNote: 'Fluid mechanics and hydraulic pump cavitation diagnostics.',
      },
    ],
  },

  // ==========================================
  // 5. SOFTWARE ENGINEERING / FULL STACK
  // ==========================================
  {
    tradeId: 'software_engineering',
    tradeName: 'Full-Stack Software Engineering',
    tradeIcon: 'Code',
    description: 'Next.js App Router, React state hydration race conditions, optimistic mutations, database indexing, and real-time WebSockets.',
    interviewerName: 'Devansh Verma',
    interviewerTitle: 'Principal Distributed Systems Architect',
    interviewerAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    questions: [
      {
        id: 'soft-tb-01',
        category: 'troubleshooting',
        categoryLabel: 'Diagnostic & Fault Finding',
        categoryIcon: 'Wrench',
        difficulty: 'Intermediate',
        stageName: 'SSR Hydration Mismatch Diagnostics',
        stageSubtitle: 'React 19 hydration mismatch error #418 and client-only state',
        question: {
          en: 'A high-traffic Next.js 15 e-commerce checkout page experiences sudden flashes of incorrect prices during initial page load, followed by a React hydration mismatch error #418 in the browser console. What is the root architecture issue and how do you resolve it?',
          hi: 'Next.js चेकआउट पेज लोड होते ही गलत प्राइस फ्लैश होती है और कंसोल में React Hydration Mismatch एरर #418 आता है। इसका मूल कारण क्या है और इसे कैसे हल करेंगे?',
          pa: 'Next.js ਚੈੱਕਆਊਟ ਪੇਜ ਲੋਡ ਹੁੰਦੇ ਹੀ ਗਲਤ ਕੀਮਤ ਫਲੈਸ਼ ਹੁੰਦੀ ਹੈ ਅਤੇ ਕੰਸੋਲ ਵਿੱਚ Hydration Error #418 ਆਉਂਦੀ ਹੈ। ਇਸਦਾ ਮੁੱਖ ਕਾਰਨ ਕੀ ਹੈ ਅਤੇ ਕਿਵੇਂ ਠੀਕ ਕਰੋਗੇ?',
        },
        interviewerTone: 'welcoming',
        expectedKeywords: {
          en: ['hydration mismatch', 'server vs client render', 'localstorage', 'date.now', 'useeffect', 'dynamic import ssr false', 'suspense'],
          hi: ['हाइड्रेशन मिसमैच', 'सर्वर बनाम क्लाइंट', 'लोकलस्टोरेज', 'useEffect', 'डायनेमिक इम्पोर्ट', 'सस्पेंस'],
          pa: ['ਹਾਈਡ੍ਰੇਸ਼ਨ ਮਿਸਮੈਚ', 'ਸਰਵਰ ਕਲਾਇੰਟ ਫਰਕ', 'ਲੋਕਲਸਟੋਰੇਜ', 'useEffect', 'ਡਾਇਨਾਮਿਕ ਇੰਪੋਰਟ', 'ਸਸਪੈਂਸ'],
        },
        sampleAnswers: {
          en: 'Hydration mismatch occurs when server-rendered HTML diverges from the initial client render tree, often by reading browser-only globals (like localStorage or window) directly during render. I isolate client-only state behind useEffect or dynamic(() => import(...), { ssr: false }).',
          hi: 'हाइड्रेशन मिसमैच तब होता है जब सर्वर का HTML और क्लाइंट का रेंडर मैच नहीं करता, जैसे रेंडर में सीधे localStorage एक्सेस करना। इसे हल करने के लिए क्लाइंट स्टेट को useEffect या dynamic ssr:false में डालें।',
          pa: 'ਹਾਈਡ੍ਰੇਸ਼ਨ ਮਿਸਮੈਚ ਉਦੋਂ ਹੁੰਦਾ ਹੈ ਜਦੋਂ ਸਰਵਰ ਦਾ HTML ਅਤੇ ਕਲਾਇੰਟ ਦਾ DOM ਮੇਲ ਨਹੀਂ ਖਾਂਦੇ। ਇਸਨੂੰ ਠੀਕ ਕਰਨ ਲਈ ਕਲਾਇੰਟ ਡਾਟਾ useEffect ਜਾਂ dynamic(..., { ssr: false }) ਰਾਹੀਂ ਲੋਡ ਕਰੋ।',
        },
        contextNote: 'Next.js SSR/CSR hydration lifecycle.',
      },
    ],
  },
];

// Helper functions for dynamic non-repeating questioning
export function getQuestionsForTradeAndCategory(
  tradeId: string,
  category: QuestionCategory | 'all' = 'all'
): DynamicInterviewQuestion[] {
  const blueprint = TRADE_INTERVIEW_BLUEPRINTS.find((t) => t.tradeId === tradeId) || TRADE_INTERVIEW_BLUEPRINTS[0];
  if (category === 'all') return blueprint.questions;
  return blueprint.questions.filter((q) => q.category === category);
}

export function getRandomQuestion(
  tradeId: string,
  excludeIds: string[] = [],
  category: QuestionCategory | 'all' = 'all'
): DynamicInterviewQuestion {
  const available = getQuestionsForTradeAndCategory(tradeId, category).filter(
    (q) => !excludeIds.includes(q.id)
  );
  if (available.length > 0) {
    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
  }
  // Fallback to all questions if exhausted
  const allForTrade = getQuestionsForTradeAndCategory(tradeId, category);
  return allForTrade[Math.floor(Math.random() * allForTrade.length)] || TRADE_INTERVIEW_BLUEPRINTS[0].questions[0];
}
