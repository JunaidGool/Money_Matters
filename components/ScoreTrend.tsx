"use client";

interface ScoreTrendProps {
  scores: number[];
  maxBars?: number;
}

export default function ScoreTrend({ scores, maxBars = 5 }: ScoreTrendProps) {
  const displayScores = scores.slice(-maxBars);

  if (displayScores.length === 0) {
    return (
      <span className="text-xs text-slate-600">No sessions yet</span>
    );
  }

  return (
    <div className="flex items-end gap-1">
      {displayScores.map((score, i) => {
        const height = (score / 5) * 28;
        const color =
          score >= 4.5
            ? "bg-emerald-400"
            : score >= 3.5
              ? "bg-green-400"
              : score >= 2.5
                ? "bg-amber-400"
                : score >= 1.5
                  ? "bg-orange-400"
                  : "bg-red-400";

        return (
          <div
            key={i}
            className={`w-3 rounded-sm ${color}`}
            style={{ height: `${Math.max(height, 4)}px` }}
            title={`Score: ${score}`}
          />
        );
      })}
    </div>
  );
}
