import React from "react";

export const CharacterCardSkeleton: React.FC = () => {
  return (
    <article className="rounded-2xl overflow-hidden shadow-neon animate-pulse cursor-pointer group">
      <div className="h-44 w-full bg-white/10 relative">
        <div className="absolute inset-0 bg-white/20 rounded-t-2xl" />
      </div>
      <div className="p-4 bg-gradient-to-t from-black/30 to-transparent">
        <div className="h-6 w-3/4 bg-white/20 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-white/20 rounded"></div>
      </div>
    </article>
  );
};
