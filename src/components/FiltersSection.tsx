import { FilterChips } from "./FilterChips";

interface FiltersSectionProps {
  species: string[];
  worlds: string[];
  films: string[];
  filterSpecies: string[];
  filterWorlds: string[];
  filterFilms: string[];
  onToggle: (type: "species" | "world" | "film", value: string) => void;
  loading?: boolean; // 👈 add this
}

export const FiltersSection: React.FC<FiltersSectionProps> = ({
  species,
  worlds,
  films,
  filterSpecies,
  filterWorlds,
  filterFilms,
  onToggle,
  loading = false, // default false
}) => {
  return (
    <div className="mt-4">
      <h3 className="text-white/70 text-sm mb-2">Filter by Species</h3>
      <FilterChips
        speciesList={species}
        active={filterSpecies}
        onSelect={(s) => onToggle("species", s)}
        loading={loading}
      />

      <h3 className="text-white/70 text-sm mt-4 mb-2">Filter by Homeworld</h3>
      <FilterChips
        speciesList={worlds}
        active={filterWorlds}
        onSelect={(s) => onToggle("world", s)}
        loading={loading}
      />

      <h3 className="text-white/70 text-sm mt-4 mb-2">Filter by Films</h3>
      <FilterChips
        speciesList={films}
        active={filterFilms}
        onSelect={(s) => onToggle("film", s)}
        loading={loading}
      />
    </div>
  );
};
