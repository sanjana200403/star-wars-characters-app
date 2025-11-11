export type SwapiPerson = {
  name: string;
  height: string;
  mass: string;
  films: string[];
  species: string[];
  homeworld: string;
  birth_year: string;
  url: string;
  created: string
};

export type SwapiList<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
