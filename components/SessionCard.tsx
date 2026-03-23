"use client";

import Link from "next/link";
import { CoachingSession } from "@/lib/types";

interface SessionCardProps {
  session: CoachingSession;
  completed?: boolean;
  index?: number;
}

export default function SessionCard({
  session,
  completed,
  index = 0,
}: SessionCardProps) {
  const staggerClass = index < 6 ? `stagger-${index + 1}` : "";

  return (
    <Link
      href={`/session/${session.id}`}
      className={`animate-fade-in ${staggerClass} group relative flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-slate-700 hover:bg-slate-900 active:scale-[0.98]`}
    >
      {completed && (
        <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-400"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}
      <span className="text-2xl">{session.icon}</span>
      <h3 className="text-sm font-semibold leading-tight text-slate-100">
        {session.title}
      </h3>
      <div className="flex items-center gap-2">
        <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-400">
          {session.category}
        </span>
        <span className="text-[10px] text-slate-500">{session.minutes} min</span>
      </div>
    </Link>
  );
}
