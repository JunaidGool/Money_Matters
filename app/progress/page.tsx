"use client";

import { useEffect, useState } from "react";
import { sessions } from "@/lib/sessions";
import { questions } from "@/lib/questions";
import {
  getState,
  getTotalMinutes,
  getAverageScore,
  getSessionLogs,
  resetAllData,
  resetStudyProgress,
} from "@/lib/storage";
import { AppState } from "@/lib/types";
import ScoreTrend from "@/components/ScoreTrend";

export default function ProgressPage() {
  const [state, setState] = useState<AppState | null>(null);
  const [confirmReset, setConfirmReset] = useState<
    "none" | "all" | "study"
  >("none");

  useEffect(() => {
    setState(getState());
  }, []);

  if (!state) return null;

  const totalMinutes = getTotalMinutes();
  const avgScore = getAverageScore();
  const triedCount = state.completedSessions.length;

  // Build activity heatmap (last 30 days)
  const today = new Date();
  const heatmapDays: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const count = state.sessions.filter(
      (s) => s.date.split("T")[0] === dateStr
    ).length;
    heatmapDays.push({ date: dateStr, count });
  }

  // Study progress
  const studyConfident = Object.values(state.studyProgress).filter(
    (v) => v === "confident"
  ).length;
  const studyNeedsWork = Object.values(state.studyProgress).filter(
    (v) => v === "needs-work"
  ).length;
  const studyUnseen = questions.length - studyConfident - studyNeedsWork;

  const handleResetAll = () => {
    resetAllData();
    setState(getState());
    setConfirmReset("none");
  };

  const handleResetStudy = () => {
    resetStudyProgress();
    setState(getState());
    setConfirmReset("none");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-slate-100">Progress</h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Track your wealth coaching journey
        </p>
      </div>

      {/* Summary */}
      <div className="animate-fade-in stagger-1 grid grid-cols-2 gap-3">
        {[
          { label: "Total Sessions", value: state.sessions.length },
          { label: "Total Minutes", value: totalMinutes },
          { label: "Sessions Tried", value: `${triedCount}/16` },
          { label: "Avg Score", value: avgScore || "—" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-3"
          >
            <span className="text-lg font-bold text-emerald-400">
              {stat.value}
            </span>
            <span className="text-[10px] font-medium text-slate-500">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Streaks */}
      <div className="animate-fade-in stagger-2 grid grid-cols-2 gap-3">
        <div className="flex flex-col items-center rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-4">
          <span className="text-2xl font-bold text-emerald-400">
            {state.streaks.currentStreak}
          </span>
          <span className="text-[10px] font-medium text-slate-500">
            Current Streak
          </span>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-4">
          <span className="text-2xl font-bold text-slate-300">
            {state.streaks.longestStreak}
          </span>
          <span className="text-[10px] font-medium text-slate-500">
            Longest Streak
          </span>
        </div>
      </div>

      {/* 30-Day Activity Heatmap */}
      <div className="animate-fade-in stagger-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-200">
          30-Day Activity
        </h3>
        <div className="grid grid-cols-10 gap-1.5">
          {heatmapDays.map((day) => (
            <div
              key={day.date}
              title={`${day.date}: ${day.count} session${day.count !== 1 ? "s" : ""}`}
              className={`aspect-square rounded-sm ${
                day.count === 0
                  ? "bg-slate-800"
                  : day.count === 1
                    ? "bg-emerald-500/30"
                    : day.count === 2
                      ? "bg-emerald-500/50"
                      : "bg-emerald-500/80"
              }`}
            />
          ))}
        </div>
        <p className="mt-2 text-[10px] text-slate-600">
          Last 30 days — darker = more sessions
        </p>
      </div>

      {/* Per-session score trends */}
      <div className="animate-fade-in stagger-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-200">
          Score Trends
        </h3>
        <div className="flex flex-col gap-3">
          {sessions.map((session) => {
            const logs = getSessionLogs(session.id);
            const recentScores = logs
              .slice(-5)
              .map((l) => l.averageScore);
            return (
              <div
                key={session.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{session.icon}</span>
                  <span className="text-xs font-medium text-slate-400">
                    {session.title}
                  </span>
                </div>
                <ScoreTrend scores={recentScores} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Study Progress */}
      <div className="animate-fade-in stagger-5 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-200">
          Study Progress
        </h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-400">
              {studyConfident} Confident
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="text-xs text-slate-400">
              {studyNeedsWork} Needs Work
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-600" />
            <span className="text-xs text-slate-400">
              {studyUnseen} Unseen
            </span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">
          <div className="flex h-full">
            <div
              className="bg-emerald-400 transition-all"
              style={{
                width: `${(studyConfident / questions.length) * 100}%`,
              }}
            />
            <div
              className="bg-amber-400 transition-all"
              style={{
                width: `${(studyNeedsWork / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Reset Options */}
      <div className="animate-fade-in stagger-6 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-200">
          Data Management
        </h3>
        <div className="flex gap-3">
          <button
            onClick={() => setConfirmReset("study")}
            className="flex-1 rounded-lg bg-slate-800 px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-700 hover:text-slate-300"
          >
            Reset Study Progress
          </button>
          <button
            onClick={() => setConfirmReset("all")}
            className="flex-1 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20"
          >
            Reset All Data
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmReset !== "none" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="animate-scale-in mx-4 w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <h3 className="text-lg font-bold text-slate-100">
              {confirmReset === "all"
                ? "Reset All Data?"
                : "Reset Study Progress?"}
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              {confirmReset === "all"
                ? "This will delete all session logs, streaks, study progress, and scores. This cannot be undone."
                : "This will reset all flashcard progress to unseen. Session data will be preserved."}
            </p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setConfirmReset("none")}
                className="flex-1 rounded-lg bg-slate-800 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={
                  confirmReset === "all"
                    ? handleResetAll
                    : handleResetStudy
                }
                className="flex-1 rounded-lg bg-red-500/20 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/30"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
