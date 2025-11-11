import React from 'react';
import type { SwapiPerson } from '../types/type';

export const CharacterCard: React.FC<{
  person: SwapiPerson;
  speciesName?: string;
  onClick: () => void;
  speciesColorMap: Record<string, string>;
}> = ({ person, speciesName, onClick, speciesColorMap }) => {
  const imgUrl = `https://picsum.photos/seed/${encodeURIComponent(person.name)}/600/360`;

  // Get solid background class
  const colorClass = speciesColorMap[speciesName || 'Unknown'] || 'bg-gray-500';

  return (
    <article
      onClick={onClick}
      className="rounded-2xl overflow-hidden shadow-neon cursor-pointer group"
    >
      <div className={`h-44 w-full relative ${colorClass}`}>
        <img
          src={imgUrl}
          alt={person.name}
          className="object-cover w-full h-full opacity-90"
        />
        <div className="absolute inset-0 card-image-overlay"></div>
      </div>
      <div className={`p-4 ${colorClass}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{person.name}</h3>
        </div>
        <div className="mt-3 text-sm text-white/70 flex items-center justify-between">
          <span>Species:</span>
          <span className="font-medium">{speciesName || 'Unknown'}</span>
        </div>
      </div>
    </article>
  );
};
