import React from "react";

interface FilterChipsProps {
  speciesList: string[];
  active: string[];
  onSelect: (value: string) => void;
  loading?: boolean;
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  speciesList,
  active,
  onSelect,
  loading = false,
}) => {
  if (loading) {
    // show blue shimmer placeholders
    return (
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-6 w-20 rounded-full bg-blue-400/20 animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {speciesList.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className={`px-3 py-1 rounded-full text-sm border transition ${
            active.includes(s)
              ? "bg-blue-400 text-black border-blue-400"
              : "border-white/20 hover:bg-blue-400/20"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
};
