import { useEffect, useState } from "react";
import { fetchPeoplePage, fetchJson } from "../utils/api";
import type { SwapiPerson } from "../types/type";

// Fetch all pages for species, planets, or films
async function fetchAllPages(url: string) {
  let all: any[] = [];
  while (url) {
    const res = await fetchJson(url);
    all.push(...res.results);
    url = res.next;
  }
  return all;
}

export function useSwapi(page: number) {
  const [allData, setAllData] = useState<SwapiPerson[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  // --- Caches for species, planets, films ---
  const [speciesMap, setSpeciesMap] = useState<Record<string, string>>({});
  const [worldMap, setWorldMap] = useState<Record<string, string>>({});
  const [filmMap, setFilmMap] = useState<Record<string, string>>({});

  const [dynamicSpecies, setDynamicSpecies] = useState<string[]>([]);
  const [dynamicWorlds, setDynamicWorlds] = useState<string[]>([]);
  const [dynamicFilms, setDynamicFilms] = useState<string[]>([]);

  // --- Load all species, planets, films once on mount ---
  useEffect(() => {
    async function loadAllMetaData() {
      try {
        // --- Species ---
        const allSpecies = await fetchAllPages("https://swapi.dev/api/species/");
        const smap: Record<string, string> = {};
        allSpecies.forEach((s) => (smap[s.url] = s.name));
        setSpeciesMap(smap);
        setDynamicSpecies(allSpecies.map((s) => s.name));

        // --- Planets ---
        const allPlanets = await fetchAllPages("https://swapi.dev/api/planets/");
        const wmap: Record<string, string> = {};
        allPlanets.forEach((p) => (wmap[p.url] = p.name));
        setWorldMap(wmap);
        setDynamicWorlds(allPlanets.map((p) => p.name));

        // --- Films ---
        const allFilms = await fetchAllPages("https://swapi.dev/api/films/");
        const fmap: Record<string, string> = {};
        allFilms.forEach((f) => (fmap[f.url] = f.title));
        setFilmMap(fmap);
        setDynamicFilms(allFilms.map((f) => f.title));
      } catch (err: unknown) {
        console.error("Error loading metadata", err);
      }
    }

    loadAllMetaData();
  }, []); // empty dependency → only once

  // --- Load characters for the current page ---
  useEffect(() => {
    async function loadCharacters() {
      try {
        setLoading(true);
        setError(null);

        const url =
          page === 1
            ? "https://swapi.dev/api/people/"
            : `https://swapi.dev/api/people/?page=${page}`;
        const res = await fetchPeoplePage(url);

        setAllData(res.results);
        setNextUrl(res.next);
        setPrevUrl(res.previous);
        setTotalPages(Math.ceil(82 / 10)); // SWAPI has 82 people
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Failed fetching data");
      } finally {
        setLoading(false);
      }
    }

    loadCharacters();
  }, [page]);

  return {
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
  };
}
