export const LEAGUE_NAME = 'Leagues VI: Demonic Pacts'

// Map image used as the background for region overlays.
// Source: oldschool.runescape.wiki — swap with a self-hosted copy if needed.
export const MAP_IMAGE_URL =
  'https://oldschool.runescape.wiki/images/Get_Ready_For_Leagues_VI-_Demonic_Pacts_-_April_15th_(5).png'

export type RegionStatus = 'start' | 'auto' | 'unlockable'

export interface Region {
  id: string
  name: string
  status: RegionStatus
  highlights: string[]
  /** Percentage from left edge of the map image */
  mapX: number
  /** Percentage from top edge of the map image */
  mapY: number
}

export const regions: Region[] = [
  {
    id: 'varlamore',
    name: 'Varlamore',
    status: 'start',
    highlights: ['Fortis Colosseum', 'Moons of Peril', 'Vardorvis', 'Hunter Guild'],
    mapX: 36,
    mapY: 76,
  },
  {
    id: 'karamja',
    name: 'Karamja',
    status: 'auto',
    highlights: ['Fight Caves / TzHaar', 'Brimhaven Dungeon', 'Shilo Village', 'Mor Ul Rek'],
    mapX: 24,
    mapY: 64,
  },
  {
    id: 'asgarnia',
    name: 'Asgarnia',
    status: 'unlockable',
    highlights: ['God Wars Dungeon', 'Falador', 'Dwarven Mine', 'Troll Stronghold'],
    mapX: 34,
    mapY: 43,
  },
  {
    id: 'desert',
    name: 'Kharidian Desert',
    status: 'unlockable',
    highlights: ['Necropolis', 'Ruins of Unkah', 'Bandit Camp', 'Bedabin Camp'],
    mapX: 55,
    mapY: 60,
  },
  {
    id: 'kandarin',
    name: 'Kandarin',
    status: 'unlockable',
    highlights: ['Barbarian Assault', 'Ardougne', 'Catherby', 'Ape Atoll'],
    mapX: 22,
    mapY: 37,
  },
  {
    id: 'fremennik',
    name: 'Fremennik Province',
    status: 'unlockable',
    highlights: ['Waterbirth Island', 'Keldagrim', 'Lunar Isle', 'Ungael'],
    mapX: 57,
    mapY: 20,
  },
  {
    id: 'zeah',
    name: 'Kebos & Kourend',
    status: 'unlockable',
    highlights: ['Chambers of Xeric', 'Mount Karuulm', 'Catacombs of Kourend', 'Sarachnis'],
    mapX: 14,
    mapY: 74,
  },
  {
    id: 'morytania',
    name: 'Morytania',
    status: 'unlockable',
    highlights: ['Theatre of Blood', 'Darkmeyer', "Mos Le'Harmless", 'Barrows'],
    mapX: 68,
    mapY: 42,
  },
  {
    id: 'tirannwn',
    name: 'Tirannwn',
    status: 'unlockable',
    highlights: ['The Gauntlet', 'Zulrah', 'Prifddinas', 'Zalcano'],
    mapX: 10,
    mapY: 44,
  },
  {
    id: 'wilderness',
    name: 'Wilderness',
    status: 'unlockable',
    highlights: ['Ferox Enclave', 'Mage Arena', "Rogues' Castle", 'Wilderness Bosses'],
    mapX: 44,
    mapY: 10,
  },
]
