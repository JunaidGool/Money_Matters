"use client";

import { useState } from "react";
import { FlashCard } from "@/lib/types";

interface LearnCardProps {
  card: FlashCard;
  status?: "confident" | "needs-work" | "unseen";
  onMark: (status: "confident" | "needs-work") => void;
}

export default function LearnCard({ card, status, onMark }: LearnCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="animate-fade-in">
      <button
        onClick={() => setFlipped(!flipped)}
        className="w-full rounded-xl border border-slate-800 bg-slate-900/60 p-5 text-left transition-all hover:border-slate-700 active:scale-[0.99]"
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-400">
            {card.section}
          </span>
          {status && status !== "unseen" && (
            <span
              className={`text-[10px] font-medium ${
                status === "confident" ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {status === "confident" ? "✓ Confident" : "↻ Needs work"}
            </span>
          )}
        </div>

        <p className="text-sm font-medium text-slate-200">{card.question}</p>

        {flipped && (
          <div className="animate-fade-in mt-3 border-t border-slate-800 pt-3">
            <p className="text-sm leading-relaxed text-slate-400">
              {card.answer}
            </p>
          </div>
        )}

        <p className="mt-2 text-[10px] text-slate-600">
          {flipped ? "Tap to collapse" : "Tap to reveal answer"}
        </p>
      </button>

      {flipped && (
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => onMark("confident")}
            className="flex-1 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
          >
            Got it ✓
          </button>
          <button
            onClick={() => onMark("needs-work")}
            className="flex-1 rounded-lg bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-400 transition-colors hover:bg-amber-500/20"
          >
            Needs work ↻
          </button>
        </div>
      )}
    </div>
  );
}
