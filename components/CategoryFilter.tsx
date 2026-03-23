"use client";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => onSelect("All")}
        className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          selected === "All"
            ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30"
            : "bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-300"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            selected === cat
              ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30"
              : "bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
