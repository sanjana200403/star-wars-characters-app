import React from "react";
import { CharacterCard } from "./CharacterCard";
import type { SwapiPerson } from "../types/type";

interface CharacterGridProps {
  characters: SwapiPerson[];
  speciesMap: Record<string, string>;
  onSelect: (p: SwapiPerson) => void;
  speciesColorMap: Record<string, string>; 
}

export const CharacterGrid: React.FC<CharacterGridProps> = ({
  characters, speciesMap, onSelect, speciesColorMap
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {characters.map((p) => {
      const speciesName = p.species.length > 0 ? speciesMap[p.species[0]] || "Human" : "Human";
      return <CharacterCard key={p.url} person={p} speciesName={speciesName} onClick={() => onSelect(p)} speciesColorMap={speciesColorMap} />;
    })}
  </div>
);
