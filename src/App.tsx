import { useMemo, useState } from "react";
import { CharacterGrid } from "./components/CharacterGrid";
import { CharacterModal } from "./components/CharacterModal";
import { FiltersSection } from "./components/FiltersSection";
import { Header } from "./components/Header";
import { PaginationControls } from "./components/PaginationControls";
import { SearchBar } from "./components/SearchBar";
import { CharacterCardSkeleton } from "./components/CharacterCardSkeleton";
import type { SwapiPerson } from "./types/type";
import { useSwapi } from "./CustomeHooks/useSwapi";
import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { generateSpeciesColorMap } from "./utils/helpers";

export default function App() {
  const [query, setQuery] = useState("");
  const [filterSpecies, setFilterSpecies] = useState<string[]>([]);
  const [filterWorlds, setFilterWorlds] = useState<string[]>([]);
  const [filterFilms, setFilterFilms] = useState<string[]>([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<SwapiPerson | null>(null);

  const {
    allData,
    loading,
    error,
    nextUrl,
    prevUrl,
    totalPages,
    speciesMap,
    worldMap,
    filmMap,
    dynamicSpecies,
    dynamicWorlds,
    dynamicFilms,
  } = useSwapi(page);
  // Predefined filters
  const predefinedSpecies = ["Droid", "Human"];
  const predefinedWorlds = ["Naboo"];
  const predefinedFilms = ["A New Hope", "Attack of the Clones"];

  // Merge selected filters + current page + predefined
  const allSpeciesOptions = useMemo(() => {
    const currentPageSpecies = new Set<string>();
    allData.forEach((p) => {
      const speciesNames = p.species.length
        ? p.species.map((s) => speciesMap[s] || "Unknown")
        : ["Human"];
      speciesNames.forEach((s) => currentPageSpecies.add(s));
    });

    filterSpecies.forEach((s) => currentPageSpecies.add(s));
    predefinedSpecies.forEach((s) => currentPageSpecies.add(s));

    return Array.from(currentPageSpecies).sort();
  }, [allData, speciesMap, filterSpecies]);

  const allWorldOptions = useMemo(() => {
    const currentPageWorlds = new Set<string>();
    allData.forEach((p) => {
      const worldName = worldMap[p.homeworld] || "Unknown";
      currentPageWorlds.add(worldName);
    });

    filterWorlds.forEach((w) => currentPageWorlds.add(w));
    predefinedWorlds.forEach((w) => currentPageWorlds.add(w));

    return Array.from(currentPageWorlds).sort();
  }, [allData, worldMap, filterWorlds]);

  const allFilmOptions = useMemo(() => {
    const currentPageFilms = new Set<string>();
    allData.forEach((p) => {
      const filmNames = p.films.map((f) => filmMap[f] || "Unknown");
      filmNames.forEach((f) => currentPageFilms.add(f));
    });

    filterFilms.forEach((f) => currentPageFilms.add(f));
    predefinedFilms.forEach((f) => currentPageFilms.add(f));

    return Array.from(currentPageFilms).sort();
  }, [allData, filmMap, filterFilms]);

  // --- Filter & Search combined ---
  const filtered = useMemo(() => {
    let result = [...allData];

    if (query) {
      // If search query exists, only filter by search
      result = result.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    } else if (
      filterSpecies.length ||
      filterWorlds.length ||
      filterFilms.length
    ) {
      // OR logic for filters when no search query
      result = result.filter((p) => {
        const speciesNames = p.species.length
          ? p.species.map((s) => speciesMap[s] || "Unknown")
          : ["Human"];
        const matchesSpecies = filterSpecies.length
          ? filterSpecies.some((s) => speciesNames.includes(s))
          : false;

        const worldName = worldMap[p.homeworld] || "Unknown";
        const matchesWorld = filterWorlds.length
          ? filterWorlds.includes(worldName)
          : false;

        const filmNames = p.films.map((f) => filmMap[f] || "Unknown");
        const matchesFilm = filterFilms.length
          ? filterFilms.some((f) => filmNames.includes(f))
          : false;

        return matchesSpecies || matchesWorld || matchesFilm;
      });
    }

    // Sorting
    result.sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    return result;
  }, [
    allData,
    query,
    filterSpecies,
    filterWorlds,
    filterFilms,
    sortAsc,
    speciesMap,
    worldMap,
    filmMap,
  ]);
  const speciesColorMap = generateSpeciesColorMap(allSpeciesOptions);

  return (
    <div className="min-h-screen bg-[#0b0d17] text-white pb-10">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
          <SearchBar value={query} onChange={setQuery} />
          <button
            className="flex items-center gap-1 px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-sm transition"
            onClick={() => setSortAsc(!sortAsc)}
          >
            Sort: {sortAsc ? "A→Z" : "Z→A"}{" "}
            {sortAsc ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Filters */}
        <div className="mt-4">
          <FiltersSection
            species={allSpeciesOptions}
            worlds={allWorldOptions}
            films={allFilmOptions}
            filterSpecies={filterSpecies}
            filterWorlds={filterWorlds}
            filterFilms={filterFilms}
            loading={loading}
            onToggle={(type, value) => {
              if (type === "species") {
                setFilterSpecies((prev) =>
                  prev.includes(value)
                    ? prev.filter((x) => x !== value)
                    : [...prev, value]
                );
              }
              if (type === "world") {
                setFilterWorlds((prev) =>
                  prev.includes(value)
                    ? prev.filter((x) => x !== value)
                    : [...prev, value]
                );
              }
              if (type === "film") {
                setFilterFilms((prev) =>
                  prev.includes(value)
                    ? prev.filter((x) => x !== value)
                    : [...prev, value]
                );
              }
            }}
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <CharacterCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-4 mt-4 flex items-center gap-2 bg-red-700/20 rounded text-red-200">
            <AlertCircle size={20} /> {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="p-8 text-center text-white/60">
            No matching data for the selected filters.
          </div>
        )}

        {/* Character Grid */}
        {!loading && filtered.length > 0 && (
          <main className="mt-6">
            <CharacterGrid
              characters={filtered}
              speciesMap={speciesMap}
              speciesColorMap={speciesColorMap}
              onSelect={setSelected}
            />
          </main>
        )}

        {/* Pagination */}
        <PaginationControls
          page={page}
          totalPages={totalPages}
          nextUrl={nextUrl}
          prevUrl={prevUrl}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="mt-6"
        />

        {/* Modal */}
        {selected && (
          <CharacterModal person={selected} onClose={() => setSelected(null)} />
        )}
      </div>
    </div>
  );
}
