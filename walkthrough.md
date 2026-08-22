# EquiPath Prototype Walkthrough

**"Skills First. Opportunities for Everyone."**

EquiPath is a complete, polished, and fully clickable AI-powered skills-first hiring platform built for skilled trade and blue/grey-collar workers who may lack traditional resumes, degrees, or corporate pedigrees.

---

## 🚀 Key Features Built & Verified

### 1. Dynamic Multilingual Scenario Assessment
- **Controlled Blueprint Randomizer (`questionEngine.ts`)**: Combines trade skills (Electrical Troubleshooting, Motor Repair, Wiring, Earthing, HVAC, Plumbing, Welding, Appliance Repair), topics (Motor Faults, Voltage Drops, Capacitors, Breakers, LOTO), question types (Real-world scenario, Troubleshooting, Safety, Diagnosis, Image-based with interactive hotspots), and difficulties without repeats.
- **Multilingual Native Execution**: Native scenarios, voice recording, speech-to-text transcripts, and AI evaluations directly in **Punjabi (`ਪੰਜਾਬੀ`)**, **Hindi (`हिंदी`)**, and **English**.
- **Voice Recording Suite (`VoiceRecorder.tsx`)**: High-fidelity soundwave visualizer, 00:08 live timer, Stop/Re-record controls, native Gurmukhi/Devanagari transcription, and inline transcript editing modal.
- **Adaptive Difficulty (`evaluationEngine.ts`)**: Evaluates responses across 4 dimensions (**Technical Knowledge 88%**, **Troubleshooting Reasoning 82%**, **Safety Awareness 91%**, **Specificity 79%**, **Assessment Confidence 87/100**). Scores $\ge 80$ adaptively escalate subsequent questions to Intermediate/Advanced.

### 2. Star Feature: Ranking Transparency / Bias Audit Engine
- **The Challenge**: Traditional keyword resume screeners penalize skilled workers for employment gaps (e.g. gig/informal work), lack of tier-1 university degrees, resume formatting, or non-English speech.
- **The Solution (`biasAuditEngine.ts` & `BiasAuditVisualizer.tsx`)**:
  - **Before Audit (Traditional Baseline)**: Arjun Kumar is ranked **#7 (78% match)**.
  - **Click `[ Run Fairness Audit ]`**: Strips non-job-relevant signals (Employment Gap, College Tier, Resume Prestige, Language Choice) and prioritizes verified scenario tests, field experience, and safety evidence.
  - **After Audit**: Arjun Kumar animates from **#7 → #2 (91% match)**.
  - **Explainability Breakdown**: Transparent waterfall points (`+45` Verified Skills, `+25` Experience, `+18` Evidence, `+3` Requirements, `0` penalty).
  - **Ethical AI Disclaimer**: Clear decision support notice emphasizing human recruiter autonomy.

### 3. Explainable Job Matching & Verified Profile
- **10+ Realistic Trade Jobs**: BrightCore Services (92% Match), Apex Industrial Corp (88%), Metro Power Systems (89%), Punjab Rewinding Works (87%), CoolWave HVAC (77%), etc.
- **Score Breakdown**: Instant inspection of `+45` Skills, `+25` Experience, `+18` Evidence, `+4` Location.
- **Verified Public Profile (`candidate/profile`)**: Overall Confidence (84%), Scenario Badges, Audio voice excerpts with native transcripts, and Supervisor Peer References (Harpreet Singh, 5-star supervisor reference).

### 4. Recruiter & Candidate Two-Way Voice/Text Messaging
- **Recruiter Pipeline Dashboard**: 128 applicants, 47 verified, 12 strong matches, 5 shortlisted.
- **Candidate Evidence Review Drawer**: Full audio playback, transcript translation toggles, and safety checklists.
- **Interactive Messaging**: Recruiter sends direct interview invitations; candidate accepts in chat and replies via Punjabi voice note.

### 5. 20-Step Guided Hackathon Demo Mode
- A persistent floating toolbar (`DemoTourBar.tsx`) and dedicated demo hub (`/demo`) guiding judges through the 20-step end-to-end user story in 2–3 minutes with 1-click step jumping and auto-play.

---

## 📁 Application Structure

```
equipath/
├── src/
│   ├── app/
│   │   ├── layout.tsx                   # App provider, Navbar, ToastContainer, DemoTourBar
│   │   ├── page.tsx                     # Landing page with Arjun Kumar hero card & multilingual showcase
│   │   ├── candidate/
│   │   │   ├── dashboard/page.tsx       # Candidate metrics (6 skills, 81% conf, 14 matches)
│   │   │   ├── claim/page.tsx           # Trade selector (No resume upload required)
│   │   │   ├── skills/page.tsx          # My Skills with evidence inspector modal
│   │   │   ├── verify/page.tsx          # Dynamic Voice/Text Assessment & Adaptive Engine
│   │   │   ├── interview/page.tsx       # Conversational AI Technical Interview
│   │   │   ├── profile/page.tsx         # Verified Skill Profile & Peer References
│   │   │   ├── jobs/page.tsx            # 10+ jobs with explainable score breakdowns
│   │   │   ├── applications/page.tsx    # Pipeline status tracking & interview confirmations
│   │   │   └── messages/page.tsx        # Candidate voice/text chat inbox
│   │   ├── recruiter/
│   │   │   ├── dashboard/page.tsx       # Recruiter hiring pipeline & active opening stats
│   │   │   ├── candidates/page.tsx      # Candidate ranking table & evidence drawer
│   │   │   ├── bias-audit/page.tsx      # STAR FEATURE: Ranking Transparency Audit (#7 -> #2)
│   │   │   ├── messages/page.tsx        # Recruiter voice/text messaging & interview scheduling
│   │   │   └── analytics/page.tsx       # Skill distribution & bias reduction metrics
│   │   └── demo/page.tsx                # Hackathon 20-step interactive tour hub
│   ├── components/                      # Reusable modern UI components
│   └── lib/                             # Core engines, types, and mock data
```

---

## 🛠️ Verification & Build Results

```bash
npm run build
```
- **Result**: `✓ Compiled successfully in 9.0s`, `19/19 static pages generated`, `0 TypeScript errors`.
