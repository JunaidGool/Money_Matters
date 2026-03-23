"use client";

import Link from "next/link";
import { WeekPlan, CoachingSession } from "@/lib/types";

interface WeekCardProps {
  plan: WeekPlan;
  sessions: CoachingSession[];
  completedSessionIds: string[];
  isCurrentWeek?: boolean;
}

export default function WeekCard({
  plan,
  sessions,
  completedSessionIds,
  isCurrentWeek,
}: WeekCardProps) {
  const weekSessions = sessions.filter((s) =>
    plan.sessionIds.includes(s.id)
  );
  const completedCount = weekSessions.filter((s) =>
    completedSessionIds.includes(s.id)
  ).length;
  const allDone =
    weekSessions.length > 0 && completedCount === weekSessions.length;

  return (
    <div
      className={`animate-fade-in rounded-xl border p-4 ${
        isCurrentWeek
          ? "border-emerald-500/30 bg-emerald-500/5"
          : "border-slate-800 bg-slate-900/60"
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
              allDone
                ? "bg-emerald-500/20 text-emerald-400"
                : isCurrentWeek
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-slate-800 text-slate-400"
            }`}
          >
            {allDone ? "✓" : plan.week}
          </span>
          <h3 className="text-sm font-semibold text-slate-100">{plan.title}</h3>
        </div>
        {isCurrentWeek && (
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
            Current
          </span>
        )}
      </div>

      <p className="mb-3 text-xs text-slate-500">{plan.description}</p>

      {weekSessions.length > 0 ? (
        <div className="flex flex-col gap-1.5">
          {weekSessions.map((session) => {
            const done = completedSessionIds.includes(session.id);
            return (
              <Link
                key={session.id}
                href={`/session/${session.id}`}
                className="flex items-center gap-2 rounded-lg bg-slate-800/40 px-3 py-2 transition-colors hover:bg-slate-800"
              >
                <span className="text-sm">{session.icon}</span>
                <span
                  className={`flex-1 text-xs font-medium ${
                    done ? "text-slate-500 line-through" : "text-slate-300"
                  }`}
                >
                  {session.title}
                </span>
                <span className="text-[10px] text-slate-600">
                  {session.minutes}m
                </span>
                {done && (
                  <span className="text-emerald-400">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-xs italic text-slate-600">
          All sessions unlocked — revisit any session to improve your scores.
        </p>
      )}
    </div>
  );
}
