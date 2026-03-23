"use client";

import { useState } from "react";
import { copyToClipboard } from "@/lib/clipboard";
import { openClaude } from "@/lib/deeplink";

interface ShareToClaudeButtonProps {
  prompt: string;
}

export default function ShareToClaudeButton({
  prompt,
}: ShareToClaudeButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const handleClick = async () => {
    const success = await copyToClipboard(prompt);
    if (success) {
      setStatus("copied");
      setTimeout(() => openClaude(), 500);
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30 active:scale-[0.98]"
    >
      {status === "copied" ? (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Prompt Copied — Opening Claude...
        </>
      ) : status === "error" ? (
        "Copy failed — try manually"
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          Start Claude Voice Session
        </>
      )}
    </button>
  );
}
