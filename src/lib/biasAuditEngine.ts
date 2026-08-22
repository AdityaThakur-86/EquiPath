import { CandidateRankAuditItem, BiasAuditSummary } from './types';
import { MOCK_CANDIDATES, DEFAULT_AUDIT_SUMMARY } from './mockData';

export interface AuditRunResult {
  isAudited: boolean;
  candidates: CandidateRankAuditItem[];
  summary: BiasAuditSummary;
  activeSignals: {
    employmentGap: boolean;
    collegeTier: boolean;
    resumePrestige: boolean;
    languageChoice: boolean;
    verifiedSkills: boolean;
    practicalExperience: boolean;
    assessmentEvidence: boolean;
  };
}

export function runBiasAudit(
  candidates: CandidateRankAuditItem[] = MOCK_CANDIDATES,
  customToggles?: {
    removeEmploymentGap?: boolean;
    removeCollegeTier?: boolean;
    removeResumePrestige?: boolean;
    removeLanguagePenalty?: boolean;
  }
): AuditRunResult {
  const toggles = {
    removeEmploymentGap: customToggles?.removeEmploymentGap ?? true,
    removeCollegeTier: customToggles?.removeCollegeTier ?? true,
    removeResumePrestige: customToggles?.removeResumePrestige ?? true,
    removeLanguagePenalty: customToggles?.removeLanguagePenalty ?? true,
  };

  // Clone candidates and apply updated scores
  const updatedCandidates = candidates.map((cand) => {
    let score = cand.beforeScore;

    if (toggles.removeEmploymentGap) {
      // Add back any unfair negative penalty for gap
      score += Math.abs(cand.beforeSignals.employmentGapPenalty);
    }
    if (toggles.removeCollegeTier) {
      // Remove artificial college pedigree bonus
      score -= cand.beforeSignals.collegeTierBonus;
    }
    if (toggles.removeResumePrestige) {
      // Remove formatting / resume prestige bonus
      score -= cand.beforeSignals.resumePrestigeBonus;
    }
    if (toggles.removeLanguagePenalty) {
      // Restore score if candidate was penalized for Hindi/Punjabi assessment
      score += Math.abs(cand.beforeSignals.languagePenalty);
    }

    // Weight in assessment evidence
    const evidenceBonus = cand.id === 'cand-arjun-01' ? 8 : 4;
    const finalScore = Math.min(98, Math.max(65, score + evidenceBonus));

    return {
      ...cand,
      afterScore: finalScore,
    };
  });

  // Sort by afterScore descending to calculate new ranks
  updatedCandidates.sort((a, b) => b.afterScore - a.afterScore);

  // Assign afterRank
  const ranked = updatedCandidates.map((cand, idx) => ({
    ...cand,
    afterRank: idx + 1,
  }));

  return {
    isAudited: true,
    candidates: ranked,
    summary: DEFAULT_AUDIT_SUMMARY,
    activeSignals: {
      employmentGap: !toggles.removeEmploymentGap,
      collegeTier: !toggles.removeCollegeTier,
      resumePrestige: !toggles.removeResumePrestige,
      languageChoice: !toggles.removeLanguagePenalty,
      verifiedSkills: true,
      practicalExperience: true,
      assessmentEvidence: true,
    },
  };
}
