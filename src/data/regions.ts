export const LEAGUE_NAME = 'Leagues VI: Demonic Pacts'

// Self-hosted clean map image — place the file at public/map.png
// import.meta.env.BASE_URL resolves to /osrs-leagues-planner/ in production
export const MAP_IMAGE_URL = `${import.meta.env.BASE_URL}map.png`

export type RegionStatus = 'start' | 'auto' | 'unlockable'

export interface Region {
  id: string
  name: string
  status: RegionStatus
  highlights: string[]
  /** Wiki badge image URL */
  iconUrl: string
  /** Percentage from left edge of the map image (0–100) */
  mapX: number
  /** Percentage from top edge of the map image (0–100) */
  mapY: number
  /** Skills this region strongly helps train */
  majorSkills: string[]
  /** Skills this region partially helps train */
  minorSkills: string[]
}

export const regions: Region[] = [
  {
    id: 'zeah',
    name: 'Kebos & Kourend',
    status: 'unlockable',
    highlights: ['Chambers of Xeric', 'Mount Karuulm', 'Catacombs of Kourend', 'Sarachnis'],
    iconUrl: 'https://oldschool.runescape.wiki/images/Kourend_Area_Badge.png',
    mapX: 19.7,
    mapY: 33.7,
    majorSkills: ['farming', 'runecraft', 'woodcutting', 'mining'],
    minorSkills: ['slayer', 'prayer', 'construction', 'fishing'],
  },
  {
    id: 'fremennik',
    name: 'Fremennik Province',
    status: 'unlockable',
    highlights: ['Waterbirth Island', 'Keldagrim', 'Lunar Isle', 'Ungael'],
    iconUrl: 'https://oldschool.runescape.wiki/images/Fremennik_Area_Badge.png',
    mapX: 52.7,
    mapY: 29.2,
    majorSkills: ['crafting', 'slayer'],
    minorSkills: ['fishing', 'mining', 'agility', 'construction'],
  },
  {
    id: 'wilderness',
    name: 'Wilderness',
    status: 'unlockable',
    highlights: ['Ferox Enclave', 'Mage Arena', "Rogues' Castle", 'Wilderness Bosses'],
    iconUrl: 'https://oldschool.runescape.wiki/images/Wilderness_Area_Badge.png',
    mapX: 73.6,
    mapY: 23.4,
    majorSkills: ['prayer', 'mining'],
    minorSkills: ['slayer', 'agility', 'thieving'],
  },
  {
    id: 'varlamore',
    name: 'Varlamore',
    status: 'start',
    highlights: ['Fortis Colosseum', 'Moons of Peril', 'Vardorvis', 'Hunter Guild'],
    iconUrl: 'https://oldschool.runescape.wiki/images/Varlamore_Area_Badge.png',
    mapX: 19.7,
    mapY: 68.5,
    majorSkills: ['hunter', 'agility'],
    minorSkills: ['prayer', 'mining', 'crafting'],
  },
  {
    id: 'asgarnia',
    name: 'Asgarnia',
    status: 'unlockable',
    highlights: ['God Wars Dungeon', 'Falador', 'Dwarven Mine', 'Troll Stronghold'],
    iconUrl: 'https://oldschool.runescape.wiki/images/Asgarnia_Area_Badge.png',
    mapX: 63.8,
    mapY: 43.7,
    majorSkills: ['smithing', 'mining', 'prayer', 'construction'],
    minorSkills: ['crafting', 'farming', 'agility'],
  },
  {
    id: 'tirannwn',
    name: 'Tirannwn',
    status: 'unlockable',
    highlights: ['The Gauntlet', 'Zulrah', 'Prifddinas', 'Zalcano'],
    iconUrl: 'https://oldschool.runescape.wiki/images/Tirannwn_Area_Badge.png',
    mapX: 39.9,
    mapY: 58.5,
    majorSkills: ['agility', 'mining', 'crafting', 'herblore'],
    minorSkills: ['thieving', 'fletching', 'farming', 'hunter'],
  },
  {
    id: 'kandarin',
    name: 'Kandarin',
    status: 'unlockable',
    highlights: ['Barbarian Assault', 'Ardougne', 'Catherby', 'Ape Atoll'],
    iconUrl: 'https://oldschool.runescape.wiki/images/Kandarin_Area_Badge.png',
    mapX: 50.4,
    mapY: 56.3,
    majorSkills: ['fishing', 'thieving', 'farming', 'herblore'],
    minorSkills: ['agility', 'cooking', 'fletching', 'crafting'],
  },
  {
    id: 'morytania',
    name: 'Morytania',
    status: 'unlockable',
    highlights: ['Theatre of Blood', 'Darkmeyer', "Mos Le'Harmless", 'Barrows'],
    iconUrl: 'https://oldschool.runescape.wiki/images/Morytania_Area_Badge.png',
    mapX: 85.4,
    mapY: 50.4,
    majorSkills: ['prayer', 'agility', 'slayer'],
    minorSkills: ['farming', 'crafting', 'firemaking'],
  },
  {
    id: 'karamja',
    name: 'Karamja',
    status: 'auto',
    highlights: ['Fight Caves / TzHaar', 'Brimhaven Dungeon', 'Shilo Village', 'Mor Ul Rek'],
    iconUrl: 'https://oldschool.runescape.wiki/images/Karamja_Area_Badge.png',
    mapX: 61.0,
    mapY: 74.7,
    majorSkills: ['firemaking', 'mining'],
    minorSkills: ['fishing', 'agility', 'woodcutting'],
  },
  {
    id: 'desert',
    name: 'Kharidian Desert',
    status: 'unlockable',
    highlights: ['Necropolis', 'Ruins of Unkah', 'Bandit Camp', 'Bedabin Camp'],
    iconUrl: 'https://oldschool.runescape.wiki/images/Desert_Area_Badge.png',
    mapX: 77.7,
    mapY: 78.3,
    majorSkills: ['thieving', 'prayer'],
    minorSkills: ['mining', 'crafting', 'agility', 'firemaking'],
  },
]
