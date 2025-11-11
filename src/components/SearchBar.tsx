import React from "react";
import { Search } from "lucide-react";

export const SearchBar: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => {
  return (
    <div className="relative w-full sm:max-w-md">
      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search characters..."
        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/20"
      />
    </div>
  );
};
