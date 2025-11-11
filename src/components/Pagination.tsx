import React from 'react';

export const Pagination: React.FC<{ previous: string | null; next: string | null; onPrev: () => void; onNext: () => void }> = ({ previous, next, onPrev, onNext }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6 flex items-center justify-between">
      <div className="text-sm text-white/70">Results</div>
      <div className="flex gap-2">
        <button onClick={onPrev} disabled={!previous} className="px-3 py-1 rounded bg-white/5 disabled:opacity-40">Previous</button>
        <button onClick={onNext} disabled={!next} className="px-3 py-1 rounded bg-white/5 disabled:opacity-40">Next</button>
      </div>
    </div>
  );
};
