"use client";

import { useState } from "react";

interface PromptViewerProps {
  prompt: string;
}

export default function PromptViewer({ prompt }: PromptViewerProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:text-slate-100"
      >
        <span>View System Prompt</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${expanded ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {expanded && (
        <div className="animate-fade-in border-t border-slate-800 px-4 py-3">
          <pre className="whitespace-pre-wrap text-xs leading-relaxed text-slate-400">
            {prompt}
          </pre>
        </div>
      )}
    </div>
  );
}
