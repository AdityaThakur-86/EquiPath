'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { CandidateSidebar } from '@/components/layout/CandidateSidebar';
import {
  Briefcase,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Filter,
  DollarSign,
  ShieldCheck,
  Building,
  ChevronRight,
  X,
  Send,
} from 'lucide-react';
import { Job, JobMatchBreakdown } from '@/lib/types';
import { ExplainableScoreCard } from '@/components/recruiter/ExplainableScoreCard';

export default function JobMatchingPage() {
  const { jobs, candidate, applyToJob, applications, showToast } = useApp();
  const [selectedJobForModal, setSelectedJobForModal] = useState<Job | null>(null);
  const [filterTrade, setFilterTrade] = useState<string>('all');
  const [appliedJobs, setAppliedJobs] = useState<string[]>(applications.map((a) => a.jobId));

  const handleApply = (job: Job) => {
    applyToJob(job.id);
    setAppliedJobs((prev) => [...prev, job.id]);
    setSelectedJobForModal(null);
  };

  const filteredJobs = jobs.filter((job) => {
    if (filterTrade === 'all') return true;
    return job.title.toLowerCase().includes(filterTrade.toLowerCase()) || job.requiredSkills.some(s => s.toLowerCase().includes(filterTrade.toLowerCase()));
  });

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-slate-50 min-h-screen">
      <CandidateSidebar />

      <main className="flex-1 p-6 sm:p-8 max-w-6xl">
        {/* Header */}
        <div className="mb-6 pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Explainable Skills Match Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Jobs Matched to Your Verified Skills
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Ranked purely on your demonstrated test scores, field safety compliance, and practical experience.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Filter:</span>
            <select
              value={filterTrade}
              onChange={(e) => setFilterTrade(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-2xs focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Trade Roles ({jobs.length})</option>
              <option value="electrical">Electrical & Wiring</option>
              <option value="motor">Motor Repair</option>
              <option value="maintenance">Maintenance</option>
              <option value="hvac">HVAC & Climate</option>
              <option value="plumbing">Plumbing</option>
            </select>
          </div>
        </div>

        {/* Jobs List Grid */}
        <div className="space-y-4">
          {filteredJobs.map((job) => {
            const isApplied = appliedJobs.includes(job.id);
            const breakdown: JobMatchBreakdown = job.matchScoreForArjun || {
              skillsScore: 42,
              experienceScore: 24,
              evidenceScore: 16,
              locationScore: 4,
              totalMatch: 86,
            };

            return (
              <div
                key={job.id}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                {/* Left: Job Meta */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                      {job.type}
                    </span>
                    {job.urgency === 'Immediate' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-bold">
                        Immediate Requirement
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400 font-medium">{job.postedDate}</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 leading-snug">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1 font-bold text-indigo-900">
                      <Building className="w-3.5 h-3.5 text-indigo-600" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.location}
                    </span>
                    <span className="font-bold text-slate-900">
                      {job.salaryRange}
                    </span>
                  </div>

                  {/* Why you're a match */}
                  <div className="pt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-500 mr-1">Skills Verified:</span>
                    {job.requiredSkills.map((sk, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Explainable Match Score & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-shrink-0 w-full md:w-auto justify-between border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                  {/* Clickable Match Pill */}
                  <div
                    onClick={() => setSelectedJobForModal(job)}
                    className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 hover:bg-indigo-100/70 cursor-pointer transition-colors text-right"
                    title="Click to view explainable score breakdown"
                  >
                    <div className="text-xl font-black text-indigo-700">{breakdown.totalMatch}% Match</div>
                    <div className="text-[10px] text-indigo-900 font-bold flex items-center justify-end gap-1">
                      <span>View Breakdown (+45)</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Apply Buttons */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedJobForModal(job)}
                      className="flex-1 sm:flex-none px-4 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => handleApply(job)}
                      disabled={isApplied}
                      className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 ${
                        isApplied
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Applied</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Apply</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Job & Explainable Match Modal */}
        {selectedJobForModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                    {selectedJobForModal.type} • {selectedJobForModal.location}
                  </span>
                  <h2 className="text-xl font-black text-slate-900 mt-1">{selectedJobForModal.title}</h2>
                  <p className="text-xs font-bold text-indigo-700">{selectedJobForModal.company} • {selectedJobForModal.salaryRange}</p>
                </div>

                <button
                  onClick={() => setSelectedJobForModal(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Explainable Score Breakdown */}
              <ExplainableScoreCard
                breakdown={selectedJobForModal.matchScoreForArjun || {
                  skillsScore: 45,
                  experienceScore: 25,
                  evidenceScore: 18,
                  locationScore: 4,
                  totalMatch: 92,
                }}
                jobTitle={selectedJobForModal.title}
                candidateName={candidate.name}
              />

              {/* Job Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Job Description</h4>
                <p className="text-xs text-slate-700 leading-relaxed">{selectedJobForModal.description}</p>
              </div>

              {/* Key Responsibilities */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Practical Responsibilities</h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedJobForModal.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedJobForModal(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  onClick={() => handleApply(selectedJobForModal)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all active:scale-95"
                >
                  {appliedJobs.includes(selectedJobForModal.id) ? 'Already Applied' : 'Submit 1-Click Application'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
