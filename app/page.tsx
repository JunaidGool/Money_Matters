"use client";

import { useState, useEffect } from "react";
import { sessions, categories } from "@/lib/sessions";
import { getState, getTotalMinutes, getAverageScore } from "@/lib/storage";
import SessionCard from "@/components/SessionCard";
import CategoryFilter from "@/components/CategoryFilter";
import StatsBar from "@/components/StatsBar";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [completedSessions, setCompletedSessions] = useState<string[]>([]);
  const [totalSessions, setTotalSessions] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [avgScore, setAvgScore] = useState(0);

  useEffect(() => {
    const state = getState();
    setCompletedSessions(state.completedSessions);
    setTotalSessions(state.sessions.length);
    setTotalMinutes(getTotalMinutes());
    setAvgScore(getAverageScore());
  }, []);

  const filteredSessions =
    selectedCategory === "All"
      ? sessions
      : sessions.filter((s) => s.category === selectedCategory);

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-slate-100">
          Money Matters
        </h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Your AI wealth coach
        </p>
      </div>

      {/* Stats */}
      <div className="animate-fade-in stagger-1">
        <StatsBar
          stats={[
            { label: "Sessions", value: totalSessions },
            { label: "Minutes", value: totalMinutes },
            { label: "Avg Score", value: avgScore || "—" },
          ]}
        />
      </div>

      {/* Category Filter */}
      <div className="animate-fade-in stagger-2">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {/* Session Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredSessions.map((session, i) => (
          <SessionCard
            key={session.id}
            session={session}
            completed={completedSessions.includes(session.id)}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
