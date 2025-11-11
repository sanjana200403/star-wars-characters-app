// src/testing/characterModal.test.tsx
// import Modal from "react-modal";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import type { SwapiPerson } from "../types/type";
import { CharacterModal } from "../components/CharacterModal";

describe("CharacterModal Integration Test", () => {
  const mockPerson: SwapiPerson = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    birth_year: "19BBY",
    homeworld: "https://swapi.dev/api/planets/1/",
    species: [],
    films: ["https://swapi.dev/api/films/1/"],
    created: "2014-12-09T13:50:51.644000Z",
    url: "https://swapi.dev/api/people/1/",
  };

  beforeEach(() => {
    // Mock fetch calls for planets and films
    globalThis.fetch = vi.fn((url) => {
      if (url.includes("planets")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              name: "Tatooine",
              terrain: "desert",
              climate: "arid",
              population: "200000",
            }),
        });
      }
      if (url.includes("films")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              title: "A New Hope",
            }),
        });
      }
      return Promise.resolve({ ok: false, json: () => Promise.resolve({}) });
    }) as any;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("opens with correct character details", async () => {
    const handleClose = vi.fn();

    render(<CharacterModal person={mockPerson} onClose={handleClose} />);

    // Check character name
    expect(await screen.findByText("Luke Skywalker")).toBeInTheDocument();

    // Wait for homeworld to appear
    await waitFor(() => {
      expect(screen.getByText(/Tatooine/)).toBeInTheDocument();
    });

    // Check film title
    expect(screen.getByText("A New Hope")).toBeInTheDocument();

    // Close modal
    const closeBtn = screen.getByRole("button");
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });
});
