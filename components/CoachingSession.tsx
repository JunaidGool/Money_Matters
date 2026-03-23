"use client";

import { useState, useCallback } from "react";
import { CoachingSession as CoachingSessionType } from "@/lib/types";
import { logSession } from "@/lib/storage";
import Timer from "./Timer";
import ShareToClaudeButton from "./ShareToClaudeButton";
import CopyPromptButton from "./CopyPromptButton";
import PromptViewer from "./PromptViewer";
import SelfAssessment from "./SelfAssessment";

interface CoachingSessionViewProps {
  session: CoachingSessionType;
}

type Phase = "prep" | "active" | "assess" | "done";

export default function CoachingSessionView({
  session,
}: CoachingSessionViewProps) {
  const [phase, setPhase] = useState<Phase>("prep");
  const [timerRunning, setTimerRunning] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);

  const handleStartSession = () => {
    setPhase("active");
    setTimerRunning(true);
  };

  const handleTimerComplete = useCallback(() => {
    setTimerRunning(false);
  }, []);

  const handleFinishSession = () => {
    setTimerRunning(false);
    setPhase("assess");
    setShowAssessment(true);
  };

  const handleAssessmentSubmit = (scores: Record<string, number>) => {
    const values = Object.values(scores);
    const avg =
      Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) /
      10;

    logSession({
      id: `${session.id}-${Date.now()}`,
      sessionId: session.id,
      date: new Date().toISOString(),
      durationMinutes: session.minutes,
      scores,
      averageScore: avg,
    });

    setShowAssessment(false);
    setPhase("done");
  };

  return (
    <div className="animate-fade-in flex flex-col gap-5">
      {/* Header */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-3xl">{session.icon}</span>
          <div>
            <span className="mb-0.5 block rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-400 w-fit">
              {session.category}
            </span>
            <h1 className="text-xl font-bold text-slate-100">
              {session.title}
            </h1>
          </div>
        </div>
        <p className="text-sm text-slate-400">{session.description}</p>
      </div>

      {/* Timer */}
      <div className="flex justify-center">
        <Timer
          minutes={session.minutes}
          running={timerRunning}
          onComplete={handleTimerComplete}
        />
      </div>

      {/* Phase-specific content */}
      {phase === "prep" && (
        <div className="flex flex-col gap-4">
          {/* Tips */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h3 className="mb-2 text-sm font-semibold text-slate-200">
              Before you start
            </h3>
            <ul className="flex flex-col gap-1.5">
              {session.tips.map((tip, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-slate-400"
                >
                  <span className="mt-0.5 text-emerald-400">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <ShareToClaudeButton prompt={session.systemPrompt} />
          <div className="flex gap-3">
            <CopyPromptButton prompt={session.systemPrompt} />
            <button
              onClick={handleStartSession}
              className="flex-1 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800"
            >
              Start Timer Only
            </button>
          </div>
        </div>
      )}

      {phase === "active" && (
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-sm text-amber-300">
              Session in progress — have your conversation with Claude, then
              come back to assess yourself.
            </p>
          </div>
          <ShareToClaudeButton prompt={session.systemPrompt} />
          <button
            onClick={handleFinishSession}
            className="rounded-xl border border-slate-700 bg-slate-800/60 py-3 text-sm font-semibold text-slate-300 transition-colors hover:bg-slate-800"
          >
            Finish & Self-Assess
          </button>
        </div>
      )}

      {phase === "done" && (
        <div className="animate-scale-in rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 text-center">
          <span className="mb-2 block text-3xl">🎉</span>
          <h3 className="text-lg font-bold text-emerald-400">
            Session Complete!
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Great work! Your assessment has been saved.
          </p>
        </div>
      )}

      {/* Prompt Viewer */}
      <PromptViewer prompt={session.systemPrompt} />

      {/* Assessment Criteria preview */}
      {phase === "prep" && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h3 className="mb-2 text-sm font-semibold text-slate-200">
            You&apos;ll assess yourself on
          </h3>
          <ul className="flex flex-col gap-1.5">
            {session.assessmentCriteria.map((criterion, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-400"
              >
                <span className="mt-0.5 text-slate-600">{i + 1}.</span>
                {criterion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Assessment Modal */}
      {showAssessment && (
        <SelfAssessment
          criteria={session.assessmentCriteria}
          onSubmit={handleAssessmentSubmit}
          onCancel={() => {
            setShowAssessment(false);
            setPhase("active");
          }}
        />
      )}
    </div>
  );
}
