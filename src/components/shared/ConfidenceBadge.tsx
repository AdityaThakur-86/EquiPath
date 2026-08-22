import React from 'react';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface ConfidenceBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  verified?: boolean;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({
  score,
  size = 'md',
  showLabel = true,
  verified = true,
}) => {
  let colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  let ringColor = 'text-emerald-600';

  if (score < 60) {
    colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
    ringColor = 'text-amber-600';
  } else if (score < 80) {
    colorClass = 'bg-blue-50 text-blue-700 border-blue-200';
    ringColor = 'text-blue-600';
  }

  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${colorClass}`}>
        {verified && <CheckCircle2 className="w-3 h-3" />}
        {score}% {showLabel && 'Confidence'}
      </span>
    );
  }

  if (size === 'lg') {
    return (
      <div className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl border ${colorClass} shadow-sm`}>
        <div className="relative flex items-center justify-center">
          <ShieldCheck className={`w-8 h-8 ${ringColor}`} />
        </div>
        <div>
          <div className="text-xl font-bold tracking-tight">{score}%</div>
          {showLabel && <div className="text-xs font-medium opacity-80">Assessment Confidence</div>}
        </div>
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border ${colorClass}`}>
      <Sparkles className="w-3.5 h-3.5" />
      <span>{score}%</span>
      {showLabel && <span className="opacity-90 font-normal">Confidence</span>}
    </span>
  );
};
