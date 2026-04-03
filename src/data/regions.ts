export const LEAGUE_NAME = 'Leagues VI: Demonic Pacts'

export type RegionStatus = 'start' | 'auto' | 'unlockable'

export interface Region {
  id: string
  name: string
  status: RegionStatus
  highlights: string[]
}

export const regions: Region[] = [
  {
    id: 'varlamore',
    name: 'Varlamore',
    status: 'start',
    highlights: ['Fortis Colosseum', 'Moons of Peril', 'Vardorvis', 'Hunter Guild'],
  },
  {
    id: 'karamja',
    name: 'Karamja',
    status: 'auto',
    highlights: ['Fight Caves / TzHaar', 'Brimhaven Dungeon', 'Shilo Village', 'Mor Ul Rek'],
  },
  {
    id: 'asgarnia',
    name: 'Asgarnia',
    status: 'unlockable',
    highlights: ['God Wars Dungeon', 'Falador', 'Dwarven Mine', 'Troll Stronghold'],
  },
  {
    id: 'desert',
    name: 'Kharidian Desert',
    status: 'unlockable',
    highlights: ['Necropolis', 'Ruins of Unkah', 'Bandit Camp', 'Bedabin Camp'],
  },
  {
    id: 'kandarin',
    name: 'Kandarin',
    status: 'unlockable',
    highlights: ['Barbarian Assault', 'Ardougne', 'Catherby', 'Ape Atoll'],
  },
  {
    id: 'fremennik',
    name: 'Fremennik Province',
    status: 'unlockable',
    highlights: ['Waterbirth Island', 'Keldagrim', 'Lunar Isle', 'Ungael'],
  },
  {
    id: 'zeah',
    name: 'Kebos & Kourend',
    status: 'unlockable',
    highlights: ['Chambers of Xeric', 'Mount Karuulm', 'Catacombs of Kourend', 'Sarachnis'],
  },
  {
    id: 'morytania',
    name: 'Morytania',
    status: 'unlockable',
    highlights: ['Theatre of Blood', 'Darkmeyer', "Mos Le'Harmless", 'Barrows'],
  },
  {
    id: 'tirannwn',
    name: 'Tirannwn',
    status: 'unlockable',
    highlights: ['The Gauntlet', 'Zulrah', 'Prifddinas', 'Zalcano'],
  },
  {
    id: 'wilderness',
    name: 'Wilderness',
    status: 'unlockable',
    highlights: ['Ferox Enclave', 'Mage Arena', "Rogues' Castle", 'Wilderness Bosses'],
  },
]
