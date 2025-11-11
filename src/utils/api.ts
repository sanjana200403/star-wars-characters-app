import axios from 'axios';

const cache: Record<string, any> = {};

// tiny cache wrapper for SWAPI calls
export async function fetchJson(url: string) {
  if (!url) return null;
  if (cache[url]) return cache[url];
  const res = await axios.get(url);
  cache[url] = res.data;
  return res.data;
}

export async function fetchPeoplePage(url = 'https://swapi.dev/api/people/') {
  const res = await axios.get(url);
  return res.data;
}
