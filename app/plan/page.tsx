"use client";

import { useEffect, useState } from "react";
import { weeks } from "@/lib/weeks";
import { sessions } from "@/lib/sessions";
import { getState } from "@/lib/storage";
import WeekCard from "@/components/WeekCard";

export default function PlanPage() {
  const [completedSessions, setCompletedSessions] = useState<string[]>([]);

  useEffect(() => {
    setCompletedSessions(getState().completedSessions);
  }, []);

  // Determine current week based on completed sessions
  const getCurrentWeek = () => {
    for (let i = 0; i < weeks.length; i++) {
      const week = weeks[i];
      const weekSessions = sessions.filter((s) =>
        week.sessionIds.includes(s.id)
      );
      const allDone = weekSessions.every((s) =>
        completedSessions.includes(s.id)
      );
      if (!allDone || week.sessionIds.length === 0) return i;
    }
    return weeks.length - 1;
  };

  const currentWeek = getCurrentWeek();

  return (
    <div className="flex flex-col gap-5">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-slate-100">
          8-Week Wealth Plan
        </h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Your structured path to financial wellness
        </p>
      </div>

      {/* Progress bar */}
      <div className="animate-fade-in stagger-1">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Week {currentWeek + 1} of 8</span>
          <span>
            {Math.round(((currentWeek) / 8) * 100)}% complete
          </span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all"
            style={{ width: `${(currentWeek / 8) * 100}%` }}
          />
        </div>
      </div>

      {/* Week cards */}
      <div className="flex flex-col gap-4">
        {weeks.map((week, i) => (
          <WeekCard
            key={week.week}
            plan={week}
            sessions={sessions}
            completedSessionIds={completedSessions}
            isCurrentWeek={i === currentWeek}
          />
        ))}
      </div>
    </div>
  );
}
