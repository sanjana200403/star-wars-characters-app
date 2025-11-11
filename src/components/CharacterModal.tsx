import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { fetchJson } from "../utils/api";
import { cmToMeters, formatDate } from "../utils/helpers"; 
import type { SwapiPerson } from "../types/type";
import { X } from "lucide-react";

Modal.setAppElement("#root");

export const CharacterModal: React.FC<{
  person: SwapiPerson | null;
  onClose: () => void;
}> = ({ person, onClose }) => {
  const [homeworld, setHomeworld] = useState<any | null>(null);
  const [species, setSpecies] = useState<any[]>([]);
  const [films, setFilms] = useState<any[]>([]);
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    if (!person) return;
    let mounted = true;

    const loadData = async () => {
      try {
        const [world, speciesData, filmData] = await Promise.all([
          fetchJson(person.homeworld).catch(() => null),
          Promise.all(
            (person.species.length ? person.species : []).map((s) =>
              fetchJson(s).catch(() => null)
            )
          ),
          Promise.all(person.films.map((f) => fetchJson(f).catch(() => null))),
        ]);

        if (mounted) {
          setHomeworld(world);
          setSpecies(speciesData.filter(Boolean));
          setFilms(filmData.filter(Boolean));
        }
      } catch {
        // ignore
      }
    };
    loadData();
    return () => {
      mounted = false;
    };
  }, [person]);

  if (!person) return null;

  const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(
    person.name
  )}/600/360`;
  console.log("persom", person);
  return (
    <Modal
      isOpen={!!person}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      className="bg-[#111827] rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden text-white relative"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/60 hover:text-white transition z-10"
      >
        <X size={20} />
      </button>

      <div className="flex flex-col md:flex-row">
        {/* Image Section - hidden on small screens */}
        <div className="md:w-1/2 w-full relative items-center justify-center bg-black/20 hidden sm:flex">
          {imgLoading && (
            <div className="absolute text-white/60 text-sm">
              Loading image...
            </div>
          )}
          <img
            src={imageUrl}
            onLoad={() => setImgLoading(false)}
            onError={() => setImgLoading(false)}
            alt={person.name}
            className={`w-full h-48 md:h-full object-cover transition-opacity ${
              imgLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>

        {/* Info Section */}
        <div className="md:w-1/2 w-full p-6 space-y-3 overflow-y-auto max-h-[70vh] scrollbar-hide">
          <h2 className="text-2xl font-bold text-cyan-300">{person.name}</h2>

          <div className="grid grid-cols-2 gap-y-2 text-sm text-white/80">
            <p>
              <strong>Height:</strong> {cmToMeters(person.height)} m
            </p>
            <p>
              <strong>Mass:</strong> {person.mass} kg
            </p>
            <p>
              <strong>Birth Year:</strong> {person.birth_year}
            </p>
            <p>
              <strong>Date Added:</strong>{" "}
              {formatDate(new Date(person.created))}
            </p>
            <p>
              <strong>Films:</strong> {films.length}
            </p>
          </div>

          {/* Homeworld */}
          <div>
            <h3 className="font-semibold text-lg text-cyan-400">Homeworld</h3>
            {homeworld ? (
              <div className="flex flex-wrap gap-2 text-sm text-white/80 mt-1">
                <span className="px-2 py-1 bg-white/10 rounded">
                  <strong>Name:</strong> {homeworld.name}
                </span>
                <span className="px-2 py-1 bg-white/10 rounded">
                  <strong>Terrain:</strong> {homeworld.terrain}
                </span>
                <span className="px-2 py-1 bg-white/10 rounded">
                  <strong>Climate:</strong> {homeworld.climate}
                </span>
                <span className="px-2 py-1 bg-white/10 rounded">
                  <strong>Population:</strong> {homeworld.population}
                </span>
              </div>
            ) : (
              <p className="text-sm text-white/60 mt-1">Loading homeworld...</p>
            )}
          </div>

          {/* Species */}
          <div>
            <h3 className="font-semibold text-lg text-cyan-400">Species</h3>
            <div className="flex flex-wrap gap-2 mt-1 text-sm text-white/80">
              {species.length === 0 ? (
                <span className="px-2 py-1 bg-white/10 rounded">Human</span>
              ) : (
                species.map((s) => (
                  <span key={s.name} className="px-2 py-1 bg-white/10 rounded">
                    {s.name}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Films */}
          <div>
            <h3 className="font-semibold text-lg text-cyan-400">Films</h3>
            <div className="flex flex-wrap gap-2 mt-1 text-sm text-white/80">
              {films.map((f) => (
                <span key={f.title} className="px-2 py-1 bg-white/10 rounded">
                  {f.title}
                </span>
              ))}
            </div>
          </div>

          <p className="text-xs text-white/40 mt-4">
            Data fetched from SWAPI · {new Date().toLocaleDateString("en-GB")}
          </p>
        </div>
      </div>
    </Modal>
  );
};
