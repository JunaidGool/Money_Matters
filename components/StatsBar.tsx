"use client";

interface Stat {
  label: string;
  value: string | number;
}

interface StatsBarProps {
  stats: Stat[];
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-3"
        >
          <span className="text-lg font-bold text-emerald-400">
            {stat.value}
          </span>
          <span className="mt-0.5 text-[10px] font-medium text-slate-500">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
