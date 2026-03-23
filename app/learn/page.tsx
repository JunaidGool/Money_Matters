"use client";

import { useState, useEffect } from "react";
import { questions, sections } from "@/lib/questions";
import { getState, updateStudyProgress } from "@/lib/storage";
import LearnCard from "@/components/LearnCard";

type StudyFilter = "all" | "unseen" | "needs-work" | "confident";

export default function LearnPage() {
  const [filter, setFilter] = useState<StudyFilter>("all");
  const [selectedSection, setSelectedSection] = useState("All");
  const [progress, setProgress] = useState<
    Record<string, "confident" | "needs-work" | "unseen">
  >({});

  useEffect(() => {
    const state = getState();
    const p: Record<string, "confident" | "needs-work" | "unseen"> = {};
    for (const q of questions) {
      p[q.id] = state.studyProgress[q.id] || "unseen";
    }
    setProgress(p);
  }, []);

  const handleMark = (
    questionId: string,
    status: "confident" | "needs-work"
  ) => {
    updateStudyProgress(questionId, status);
    setProgress((prev) => ({ ...prev, [questionId]: status }));
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesSection =
      selectedSection === "All" || q.section === selectedSection;
    const status = progress[q.id] || "unseen";
    const matchesFilter = filter === "all" || status === filter;
    return matchesSection && matchesFilter;
  });

  const stats = {
    confident: Object.values(progress).filter((v) => v === "confident").length,
    needsWork: Object.values(progress).filter((v) => v === "needs-work").length,
    unseen: Object.values(progress).filter(
      (v) => v === "unseen" || v === undefined
    ).length,
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-slate-100">Learn</h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Financial literacy flashcards
        </p>
      </div>

      {/* Stats */}
      <div className="animate-fade-in stagger-1 grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-3">
          <span className="text-lg font-bold text-emerald-400">
            {stats.confident}
          </span>
          <span className="text-[10px] font-medium text-slate-500">
            Confident
          </span>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-3">
          <span className="text-lg font-bold text-amber-400">
            {stats.needsWork}
          </span>
          <span className="text-[10px] font-medium text-slate-500">
            Needs Work
          </span>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-3">
          <span className="text-lg font-bold text-slate-400">
            {stats.unseen}
          </span>
          <span className="text-[10px] font-medium text-slate-500">
            Unseen
          </span>
        </div>
      </div>

      {/* Section filter */}
      <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
        {["All", ...sections].map((section) => (
          <button
            key={section}
            onClick={() => setSelectedSection(section)}
            className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              selectedSection === section
                ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30"
                : "bg-slate-800/60 text-slate-400 hover:bg-slate-800"
            }`}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Status filter */}
      <div className="flex gap-2">
        {(
          [
            ["all", "All"],
            ["unseen", "Unseen"],
            ["needs-work", "Needs Work"],
            ["confident", "Confident"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === key
                ? "bg-slate-700 text-slate-200"
                : "bg-slate-800/40 text-slate-500 hover:text-slate-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {filteredQuestions.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-600">
            No cards match your filters
          </p>
        ) : (
          filteredQuestions.map((q) => (
            <LearnCard
              key={q.id}
              card={q}
              status={progress[q.id]}
              onMark={(status) => handleMark(q.id, status)}
            />
          ))
        )}
      </div>
    </div>
  );
}
