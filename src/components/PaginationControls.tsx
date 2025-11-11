import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  nextUrl: string | null;
  prevUrl: string | null;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

export const PaginationControls: React.FC<PaginationProps> = ({
  page,
  totalPages,
  nextUrl,
  prevUrl,
  onPrev,
  onNext,
  className = "",
}) => {
  const isPrevDisabled = !prevUrl || page <= 1;
  const isNextDisabled = !nextUrl || page >= totalPages;

  return (
    <div
      className={`max-w-6xl mx-auto px-4 sm:px-6 mt-6 flex flex-col sm:flex-row sm:justify-between items-center gap-3 ${className}`}
    >
      {/* Page Info */}
      <div className="text-sm text-white/70">
        Page <span className="font-medium">{page}</span> of{" "}
        <span className="font-medium">{totalPages}</span>
      </div>

      {/* Prev/Next Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onPrev}
          disabled={isPrevDisabled}
          className={`px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium transition
            ${isPrevDisabled ? "opacity-40 cursor-not-allowed" : "hover:bg-white/20"}`}
        >
          Prev
        </button>
        <button
          onClick={onNext}
          disabled={isNextDisabled}
          className={`px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium transition
            ${isNextDisabled ? "opacity-40 cursor-not-allowed" : "hover:bg-white/20"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
