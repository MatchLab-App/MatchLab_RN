import type { ImageSourcePropType } from 'react-native';

export type PokemonType =
  | 'grass'
  | 'fire'
  | 'fighting'
  | 'flying'
  | 'fairy'
  | 'ground'
  | 'ice'
  | 'bug'
  | 'rock'
  | 'poison'
  | 'water'
  | 'dragon'
  | 'electric'
  | 'ghost'
  | 'normal'
  | 'psychic'
  | 'steel'
  | 'dark'
  | 'noType';

export type SelectablePokemonType = Exclude<PokemonType, 'noType'>;
export type typeSelectablePokemonType = SelectablePokemonType;

export const SELECTABLE_POKEMON_TYPES: PokemonType[] = [
  'normal',
  'bug',
  'fairy',
  'grass',
  'rock',
  'fighting',
  'ghost',
  'psychic',
  'fire',
  'water',
  'ice',
  'flying',
  'dark',
  'steel',
  'dragon',
  'ground',
  'poison',
  'electric',
];

export const START_CLOUD_TYPES: PokemonType[] = [
  'grass',
  'fire',
  'water',
  'electric',
  'fairy',
  'ghost',
  'poison',
  'normal',
  'ice',
  'rock',
  'ground',
  'flying',
  'psychic',
  'bug',
  'dragon',
  'dark',
  'steel',
];

export const TYPE_SMALL_IMAGES: Record<PokemonType, ImageSourcePropType> = {
  grass: require('@/assets/images/TypeCard_small/grass_small.png'),
  fire: require('@/assets/images/TypeCard_small/fire_small.png'),
  fighting: require('@/assets/images/TypeCard_small/fighting_small.png'),
  flying: require('@/assets/images/TypeCard_small/flying_small.png'),
  fairy: require('@/assets/images/TypeCard_small/fairy_small.png'),
  ground: require('@/assets/images/TypeCard_small/ground_small.png'),
  ice: require('@/assets/images/TypeCard_small/ice_small.png'),
  bug: require('@/assets/images/TypeCard_small/bug_small.png'),
  rock: require('@/assets/images/TypeCard_small/rock_small.png'),
  poison: require('@/assets/images/TypeCard_small/poison_small.png'),
  water: require('@/assets/images/TypeCard_small/water_small.png'),
  dragon: require('@/assets/images/TypeCard_small/dragon_small.png'),
  electric: require('@/assets/images/TypeCard_small/electronic_small.png'),
  ghost: require('@/assets/images/TypeCard_small/ghost_small.png'),
  normal: require('@/assets/images/TypeCard_small/normal_small.png'),
  psychic: require('@/assets/images/TypeCard_small/psychic_small.png'),
  steel: require('@/assets/images/TypeCard_small/steel_small.png'),
  dark: require('@/assets/images/TypeCard_small/dark_small.png'),
  noType: require('@/assets/images/TypeCard_small/noType_small.png'),
};

export const TYPE_BIG_IMAGES: Record<SelectablePokemonType, ImageSourcePropType> = {
  grass: require('@/assets/images/TypeCard_big/grass_big.png'),
  fire: require('@/assets/images/TypeCard_big/fire_big.png'),
  fighting: require('@/assets/images/TypeCard_big/fighting_big.png'),
  flying: require('@/assets/images/TypeCard_big/flying_big.png'),
  fairy: require('@/assets/images/TypeCard_big/fairy_big.png'),
  ground: require('@/assets/images/TypeCard_big/ground_big.png'),
  ice: require('@/assets/images/TypeCard_big/ice_big.png'),
  bug: require('@/assets/images/TypeCard_big/bug_big.png'),
  rock: require('@/assets/images/TypeCard_big/rock_big.png'),
  poison: require('@/assets/images/TypeCard_big/poison_big.png'),
  water: require('@/assets/images/TypeCard_big/water_big.png'),
  dragon: require('@/assets/images/TypeCard_big/dragon_big.png'),
  electric: require('@/assets/images/TypeCard_big/electronic_big.png'),
  ghost: require('@/assets/images/TypeCard_big/ghost_big.png'),
  normal: require('@/assets/images/TypeCard_big/normal_big.png'),
  psychic: require('@/assets/images/TypeCard_big/psychic_big.png'),
  steel: require('@/assets/images/TypeCard_big/steel_big.png'),
  dark: require('@/assets/images/TypeCard_big/dark_big.png'),
};

export function getSmallTypeImage(type: PokemonType): ImageSourcePropType {
  return TYPE_SMALL_IMAGES[type] ?? TYPE_SMALL_IMAGES.noType;
}

export function getBigTypeImage(type: PokemonType): ImageSourcePropType {
  if (type === 'noType') {
    return TYPE_BIG_IMAGES.normal;
  }
  return TYPE_BIG_IMAGES[type] ?? TYPE_BIG_IMAGES.normal;
}

export const LOGO_WHITE_IMAGE: ImageSourcePropType = require('@/assets/images/Logo/MatchLab_Logo_White.png');
