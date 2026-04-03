export interface Relic {
  id: string
  name: string
  description: string
}

export interface RelicTier {
  tier: number
  options: Relic[]
}

// Leagues VI: Demonic Pacts — relics as revealed pre-launch
export const relicTiers: RelicTier[] = [
  {
    tier: 1,
    options: [
      {
        id: 'endless-harvest',
        name: 'Endless Harvest',
        description: 'Resources from fishing, woodcutting, and mining are doubled and sent directly to the bank.',
      },
      {
        id: 'barbarian-gathering',
        name: 'Barbarian Gathering',
        description: 'Grants a knapsack. Gather resources bare-handed at the equivalent of crystal tool speed.',
      },
      {
        id: 'abundance',
        name: 'Abundance',
        description: 'All non-combat skills boosted by 10. Gain 2× XP per drop and earn 2× coins per XP gained.',
      },
    ],
  },
  {
    tier: 2,
    options: [
      {
        id: 'hotfoot',
        name: 'Hotfoot',
        description: 'Grants searing boots. Auto-cooks fish and auto-smelts ore with 100% success rate.',
      },
      {
        id: 'woodsman',
        name: 'Woodsman',
        description: 'Auto-burns logs while woodcutting. 100% hunter success rate with double loot and XP.',
      },
    ],
  },
  {
    tier: 3,
    options: [
      {
        id: 'evil-eye',
        name: 'Evil Eye',
        description: 'Grants a teleportation item to access any boss or raid entrance in your unlocked regions.',
      },
    ],
  },
  {
    tier: 4,
    options: [
      {
        id: 'conniving-clues',
        name: 'Conniving Clues',
        description: 'Clue rewards grant teleportation contracts. 1-in-4 chance opened caskets contain another clue.',
      },
    ],
  },
  {
    tier: 5,
    options: [
      {
        id: 'natures-accord',
        name: "Nature's Accord",
        description: 'Grants a fairy mushroom for teleportation. Farming patches yield 10× resources and never die.',
      },
      {
        id: 'larcenist',
        name: 'Larcenist',
        description: '100% thieving success. Auto-pickpocket and auto-steal. Pickpocketing and stall loot is 10×.',
      },
    ],
  },
  {
    tier: 6,
    options: [
      {
        id: 'culling-spree',
        name: 'Culling Spree',
        description: 'Choose slayer tasks from 3 options. 50% superior creature spawn chance with free slayer perks.',
      },
    ],
  },
  {
    tier: 7,
    options: [
      {
        id: 'reloaded',
        name: 'Reloaded',
        description: 'Choose one additional relic from any previously available tier.',
      },
    ],
  },
  {
    tier: 8,
    options: [
      {
        id: 'minion',
        name: 'Minion',
        description: 'Summons a combat minion for 30 minutes with configurable looting behaviour.',
      },
      {
        id: 'flask-of-fervour',
        name: 'Flask of Fervour',
        description: 'Restores HP, prayer, and special attack. Deals typeless AoE damage around you on use.',
      },
    ],
  },
]
