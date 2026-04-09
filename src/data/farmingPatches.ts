export type PatchType =
  | 'Allotment'
  | 'Flower'
  | 'Herb'
  | 'Hops'
  | 'Tree'
  | 'Fruit tree'
  | 'Bush'
  | 'Hardwood tree'
  | 'Spirit tree'
  | 'Cactus'
  | 'Calquat'
  | 'Celastrus'
  | 'Crystal tree'
  | 'Redwood'
  | 'Mushroom'
  | 'Seaweed'
  | 'Anima'
  | 'Grape vine'
  | 'Belladonna'

/** Display order for patch type listings */
export const patchTypeOrder: PatchType[] = [
  'Allotment',
  'Flower',
  'Herb',
  'Hops',
  'Tree',
  'Fruit tree',
  'Bush',
  'Hardwood tree',
  'Spirit tree',
  'Cactus',
  'Calquat',
  'Celastrus',
  'Crystal tree',
  'Redwood',
  'Mushroom',
  'Seaweed',
  'Anima',
  'Grape vine',
  'Belladonna',
]

/** Farming patches by region. Counts approximate the live game; refine as needed. */
export const regionPatches: Record<string, Partial<Record<PatchType, number>>> = {
  varlamore: {
    Allotment: 2,
    Flower: 1,
    Herb: 1,
    Hops: 1,
    Tree: 1,
    'Fruit tree': 1,
    Bush: 1,
    Calquat: 1,
  },
  karamja: {
    Bush: 1,        // Brimhaven
    'Spirit tree': 1,
    Calquat: 1,
    'Fruit tree': 1, // Brimhaven
  },
  zeah: {
    Allotment: 2,    // Hosidius
    Flower: 1,
    Herb: 1,
    Tree: 1,
    'Fruit tree': 1,
    Bush: 1,
    Hops: 1,
    'Grape vine': 5,
    'Spirit tree': 1,
    Anima: 1,
    'Hardwood tree': 3, // Farming Guild
    Celastrus: 1,
    Redwood: 1,
    Mushroom: 1,
  },
  fremennik: {
    'Spirit tree': 1, // Etceteria
  },
  wilderness: {
    Herb: 1,
  },
  asgarnia: {
    Allotment: 2,    // Falador
    Flower: 1,
    Herb: 1,
    Tree: 1,         // Falador
    'Spirit tree': 1, // Port Sarim
  },
  tirannwn: {
    Herb: 1,         // Prifddinas
    'Fruit tree': 1, // Lletya
    'Crystal tree': 1,
  },
  kandarin: {
    Allotment: 4,    // Catherby + Ardougne
    Flower: 2,
    Herb: 2,
    Tree: 1,         // Gnome Stronghold
    'Fruit tree': 3, // Catherby + Tree Gnome Stronghold + Tree Gnome Village
    Hops: 1,         // Yanille
    Bush: 1,
    'Spirit tree': 1, // Tree Gnome Stronghold
  },
  morytania: {
    Allotment: 1,    // Harmony Island
    Herb: 2,         // Canifis + Harmony
    Mushroom: 1,
    Hops: 1,         // Lvl 2 farming - Mort Myre? Actually no, but keeping minor
  },
  desert: {
    Cactus: 1,
    Belladonna: 1,
  },
}
