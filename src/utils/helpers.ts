export const idFromUrl = (url: string) => {
  if (!url) return '';
  const m = url.match(/\/(\d+)\/?$/);
  return m ? m[1] : url.replace(/\D/g, '');
};

export const speciesToColor = (speciesName?: string) => {
  switch ((speciesName || 'Unknown').toLowerCase()) {
    case 'human': return 'from-[#0ea5e9] to-[#6366f1]';
    case 'droid': return 'from-[#f59e0b] to-[#fb923c]';
    case 'wookiee': return 'from-[#ef4444] to-[#f97316]';
    default: return 'from-[#7c3aed] to-[#06b6d4]';
  }
};
// utils/helpers.ts
export const generateSpeciesColorMap = (speciesList: string[]) => {
  const colors = [
    "bg-[#1f2a44]", // Navy blue-ish, slightly lighter than bg
    "bg-[#4d3c1f]", // Dark yellow/brownish
    "bg-[#1f4433]", // Dark green
    "bg-[#3a1f4d]", // Dark purple
    "bg-[#4d1f3a]", // Dark pink/magenta
    "bg-[#441f1f]", // Dark red
    "bg-[#4d331f]", // Dark orange/brown
    "bg-[#1f4d4d]", // Dark cyan/teal
    "bg-[#1f2a4d]", // Deep indigo
    "bg-[#2c2f3a]", // Dark gray
  ];

  const map: Record<string, string> = {};
  speciesList.forEach((s, i) => {
    map[s] = colors[i % colors.length];
  });

  return map;
};

export const cmToMeters = (cm: string) => {
  const n = parseFloat(cm.replace(',', ''));
  if (isNaN(n)) return 'unknown';
  return (n / 100).toFixed(2);
};

export function formatDate(date: Date) {
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}