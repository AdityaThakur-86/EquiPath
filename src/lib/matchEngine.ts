import { Candidate, Job, JobMatchBreakdown } from './types';

export function calculateMatchScore(candidate: Candidate, job: Job): JobMatchBreakdown {
  // If the job has a pre-calibrated score for Arjun, return it as baseline or calculate dynamically
  if (job.matchScoreForArjun && candidate.id === 'cand-arjun-01') {
    return job.matchScoreForArjun;
  }

  // Calculate skills overlap score (max 45)
  const candidateSkillNames = candidate.skills.map((s) => s.name.toLowerCase());
  let matchingSkillsCount = 0;
  let totalConfidenceSum = 0;

  job.requiredSkills.forEach((reqSkill) => {
    const found = candidate.skills.find(
      (s) => s.name.toLowerCase().includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(s.name.toLowerCase())
    );
    if (found) {
      matchingSkillsCount++;
      totalConfidenceSum += found.confidenceScore;
    }
  });

  const avgSkillConfidence = matchingSkillsCount > 0 ? totalConfidenceSum / matchingSkillsCount : 60;
  const skillsRatio = matchingSkillsCount / Math.max(1, job.requiredSkills.length);
  const skillsScore = Math.min(45, Math.round(skillsRatio * (avgSkillConfidence / 100) * 45));

  // Experience score (max 25)
  const expRatio = Math.min(1.2, candidate.experienceYears / Math.max(1, job.preferredExperienceYears));
  const experienceScore = Math.min(25, Math.round(expRatio * 22));

  // Evidence score (max 20)
  const completedCount = candidate.completedAssessments.length;
  const refCount = candidate.references.filter((r) => r.status === 'verified').length;
  const evidenceScore = Math.min(20, 10 + completedCount * 3 + refCount * 3);

  // Location score (max 10)
  const isSameRegion =
    job.location.toLowerCase().includes('chandigarh') ||
    job.location.toLowerCase().includes('punjab') ||
    job.location.toLowerCase().includes('mohali');
  const locationScore = isSameRegion ? 5 : 3;

  const totalMatch = Math.min(99, skillsScore + experienceScore + evidenceScore + locationScore);

  return {
    skillsScore,
    experienceScore,
    evidenceScore,
    locationScore,
    totalMatch,
  };
}

export function matchCandidateToJobs(candidate: Candidate, jobs: Job[]): (Job & { matchBreakdown: JobMatchBreakdown })[] {
  return jobs
    .map((job) => ({
      ...job,
      matchBreakdown: calculateMatchScore(candidate, job),
    }))
    .sort((a, b) => b.matchBreakdown.totalMatch - a.matchBreakdown.totalMatch);
}
