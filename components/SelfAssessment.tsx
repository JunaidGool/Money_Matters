"use client";

import { useState } from "react";

interface SelfAssessmentProps {
  criteria: string[];
  onSubmit: (scores: Record<string, number>) => void;
  onCancel: () => void;
}

const scoreLabels: Record<number, { label: string; color: string }> = {
  1: { label: "Missed", color: "text-red-400" },
  2: { label: "Needs work", color: "text-orange-400" },
  3: { label: "Okay", color: "text-amber-400" },
  4: { label: "Good", color: "text-green-400" },
  5: { label: "Excellent", color: "text-emerald-400" },
};

export default function SelfAssessment({
  criteria,
  onSubmit,
  onCancel,
}: SelfAssessmentProps) {
  const [scores, setScores] = useState<Record<string, number>>({});

  const allScored = criteria.every((c) => scores[c] !== undefined);

  const handleSubmit = () => {
    if (allScored) onSubmit(scores);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center">
      <div className="animate-slide-up w-full max-w-lg rounded-t-2xl border border-slate-800 bg-slate-950 p-5 sm:rounded-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-100">
            Self-Assessment
          </h2>
          <button
            onClick={onCancel}
            className="rounded-lg p-1 text-slate-500 hover:text-slate-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <p className="mb-4 text-sm text-slate-400">
          Rate yourself honestly on each criterion (1-5):
        </p>

        <div className="flex flex-col gap-4">
          {criteria.map((criterion) => (
            <div key={criterion}>
              <p className="mb-2 text-sm font-medium text-slate-300">
                {criterion}
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((score) => {
                  const isSelected = scores[criterion] === score;
                  const { color } = scoreLabels[score];
                  return (
                    <button
                      key={score}
                      onClick={() =>
                        setScores((prev) => ({ ...prev, [criterion]: score }))
                      }
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold transition-all ${
                        isSelected
                          ? `${color} ring-2 ring-current bg-slate-800`
                          : "bg-slate-800/60 text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                      }`}
                    >
                      {score}
                    </button>
                  );
                })}
              </div>
              {scores[criterion] && (
                <span
                  className={`mt-1 block text-xs ${scoreLabels[scores[criterion]].color}`}
                >
                  {scoreLabels[scores[criterion]].label}
                </span>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!allScored}
          className={`mt-5 w-full rounded-xl py-3 text-sm font-semibold transition-all ${
            allScored
              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
              : "cursor-not-allowed bg-slate-800 text-slate-600"
          }`}
        >
          Save Assessment
        </button>
      </div>
    </div>
  );
}
