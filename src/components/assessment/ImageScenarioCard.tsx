'use client';

import React, { useState } from 'react';
import { Eye, AlertCircle, Info, ZoomIn } from 'lucide-react';
import { ScenarioQuestion } from '@/lib/types';

interface ImageScenarioCardProps {
  question: ScenarioQuestion;
}

export const ImageScenarioCard: React.FC<ImageScenarioCardProps> = ({ question }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null);

  if (!question.imageUrl) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-indigo-600" />
          <h4 className="font-bold text-slate-900 text-sm">Practical Visual Inspection Scenario</h4>
        </div>
        <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
          Click highlighted points to inspect details
        </span>
      </div>

      {/* Image with Hotspots */}
      <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 max-h-96">
        <img
          src={question.imageUrl}
          alt={question.imageAlt || 'Assessment Inspection Component'}
          className="w-full h-80 object-cover opacity-90 hover:opacity-100 transition-opacity"
        />

        {/* Hotspot Pins */}
        {question.imageHotspots?.map((spot, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedHotspot(idx)}
            className={`absolute w-7 h-7 -ml-3.5 -mt-3.5 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-all transform hover:scale-125 ${
              selectedHotspot === idx
                ? 'bg-rose-500 text-white ring-4 ring-rose-200 scale-110 z-20'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 ring-2 ring-white z-10 animate-bounce'
            }`}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            title={spot.label}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Selected Hotspot Detail Box */}
      {selectedHotspot !== null && question.imageHotspots && (
        <div className="mt-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-slate-900">
              Point #{selectedHotspot + 1}: {question.imageHotspots[selectedHotspot].label}
            </div>
            <div className="text-slate-600 mt-0.5">
              {question.imageHotspots[selectedHotspot].issueDescription}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
