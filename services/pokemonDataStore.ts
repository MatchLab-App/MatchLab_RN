import type { PokemonType } from '@/constants/pokemonTypes';
import PokemonNamesData from '@/constants/Data/PokemonNames.json';
import PokemonTypeChartsData from '@/constants/Data/PokemonTypeCharts.json';

export interface PokemonSearchResult {
  id: string;
  name: string;
  englishName: string;
  japaneseName: string;
  types: PokemonType[];
}

export interface PokemonNameRawEntry {
  english_name: string;
  japanese_name: string;
  types: string[];
}

export interface TypeChartDetail {
  index: number;
  attack: Record<string, number>;
  defense: Record<string, number>;
}

export type PokemonTypeChartsMap = Record<string, TypeChartDetail>;

const namesMap = PokemonNamesData as Record<string, PokemonNameRawEntry>;
const typeChartsMap = PokemonTypeChartsData as PokemonTypeChartsMap;

interface IndexedPokemon {
  name: string;
  lowerName: string;
  englishName: string;
  lowerEnglishName: string;
  japaneseName: string;
  lowerJapaneseName: string;
  types: PokemonType[];
}

const indexedPokemonList: IndexedPokemon[] = Object.entries(namesMap).map(([name, entry]) => ({
  name,
  lowerName: name.toLowerCase(),
  englishName: entry.english_name,
  lowerEnglishName: entry.english_name.toLowerCase(),
  japaneseName: entry.japanese_name,
  lowerJapaneseName: entry.japanese_name.toLowerCase(),
  types: entry.types as PokemonType[],
}));

export function searchPokemon(query: string): PokemonSearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) {
    return [];
  }

  const lowerQuery = trimmed.toLowerCase();

  const filtered = indexedPokemonList.filter(
    (item) =>
      item.lowerName.includes(lowerQuery) ||
      item.lowerEnglishName.includes(lowerQuery) ||
      item.lowerJapaneseName.includes(lowerQuery)
  );

  filtered.sort((a, b) => {
    const aStarts = a.lowerName.startsWith(lowerQuery);
    const bStarts = b.lowerName.startsWith(lowerQuery);

    if (aStarts !== bStarts) {
      return aStarts ? -1 : 1;
    }

    return a.name.localeCompare(b.name);
  });

  return filtered.map((item) => ({
    id: `${item.name}-${item.englishName}`,
    name: item.name,
    englishName: item.englishName,
    japaneseName: item.japaneseName,
    types: item.types,
  }));
}

export function calculateMultiplier(
  attackType: PokemonType,
  defenseTypes: PokemonType[]
): number {
  if (attackType === 'noType') {
    return 1.0;
  }

  const chart = typeChartsMap[attackType];

  return defenseTypes
    .filter((type) => type !== 'noType')
    .reduce((result, defenseType) => {
      const factor = chart?.attack?.[defenseType] ?? 1.0;
      return result * factor;
    }, 1.0);
}

export function getTypeChart(): PokemonTypeChartsMap {
  return typeChartsMap;
}

export const PokemonDataStore = {
  searchPokemon,
  calculateMultiplier,
  multiplier: calculateMultiplier,
  getTypeChart,
};
