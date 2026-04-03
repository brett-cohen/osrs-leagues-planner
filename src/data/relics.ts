export interface Relic {
  id: string
  name: string
  description: string
  /** Wiki icon image URL */
  iconUrl: string
  /** OSRS wiki URL for more info */
  wikiUrl: string
  /** Skills this relic strongly helps train */
  majorSkills: string[]
  /** Skills this relic partially helps train */
  minorSkills: string[]
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
        iconUrl: 'https://oldschool.runescape.wiki/images/Endless_Harvest_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Endless_Harvest_(Demonic_Pacts_League)',
        majorSkills: ['fishing', 'woodcutting', 'mining'],
        minorSkills: [],
      },
      {
        id: 'barbarian-gathering',
        name: 'Barbarian Gathering',
        description: 'Grants a knapsack. Gather resources bare-handed at the equivalent of crystal tool speed.',
        iconUrl: 'https://oldschool.runescape.wiki/images/Barbarian_Gathering_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Barbarian_Gathering_(Demonic_Pacts_League)',
        majorSkills: ['mining', 'fishing', 'woodcutting'],
        minorSkills: ['strength'],
      },
      {
        id: 'abundance',
        name: 'Abundance',
        description: 'All non-combat skills boosted by 10. Gain 2× XP per drop and earn 2× coins per XP gained.',
        iconUrl: 'https://oldschool.runescape.wiki/images/Abundance_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Abundance_(Demonic_Pacts_League)',
        majorSkills: ['herblore', 'crafting', 'smithing', 'fletching'],
        minorSkills: ['cooking', 'firemaking', 'farming', 'construction', 'runecraft'],
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
        iconUrl: 'https://oldschool.runescape.wiki/images/Hotfoot_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Hotfoot_(Demonic_Pacts_League)',
        majorSkills: ['cooking', 'smithing'],
        minorSkills: ['fishing', 'mining'],
      },
      {
        id: 'woodsman',
        name: 'Woodsman',
        description: 'Auto-burns logs while woodcutting. 100% hunter success rate with double loot and XP.',
        iconUrl: 'https://oldschool.runescape.wiki/images/Woodsman_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Woodsman_(Demonic_Pacts_League)',
        majorSkills: ['firemaking', 'hunter', 'woodcutting'],
        minorSkills: [],
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
        iconUrl: 'https://oldschool.runescape.wiki/images/Evil_Eye_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Evil_Eye_(Demonic_Pacts_League)',
        majorSkills: [],
        minorSkills: [],
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
        iconUrl: 'https://oldschool.runescape.wiki/images/Conniving_Clues_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Conniving_Clues_(Demonic_Pacts_League)',
        majorSkills: [],
        minorSkills: ['crafting'],
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
        iconUrl: 'https://oldschool.runescape.wiki/images/Nature%27s_Accord_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Nature%27s_Accord_(Demonic_Pacts_League)',
        majorSkills: ['farming'],
        minorSkills: ['herblore'],
      },
      {
        id: 'larcenist',
        name: 'Larcenist',
        description: '100% thieving success. Auto-pickpocket and auto-steal. Pickpocketing and stall loot is 10×.',
        iconUrl: 'https://oldschool.runescape.wiki/images/Larcenist_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Larcenist_(Demonic_Pacts_League)',
        majorSkills: ['thieving'],
        minorSkills: [],
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
        iconUrl: 'https://oldschool.runescape.wiki/images/Culling_Spree_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Culling_Spree_(Demonic_Pacts_League)',
        majorSkills: ['slayer'],
        minorSkills: ['attack', 'strength', 'defence', 'ranged', 'magic', 'hitpoints'],
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
        iconUrl: 'https://oldschool.runescape.wiki/images/Reloaded_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Reloaded_(Demonic_Pacts_League)',
        majorSkills: [],
        minorSkills: [],
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
        iconUrl: 'https://oldschool.runescape.wiki/images/Minion_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Minion_(Demonic_Pacts_League)',
        majorSkills: [],
        minorSkills: ['attack', 'strength', 'ranged', 'magic'],
      },
      {
        id: 'flask-of-fervour',
        name: 'Flask of Fervour',
        description: 'Restores HP, prayer, and special attack. Deals typeless AoE damage around you on use.',
        iconUrl: 'https://oldschool.runescape.wiki/images/Flask_of_Fervour_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Flask_of_Fervour_(Demonic_Pacts_League)',
        majorSkills: [],
        minorSkills: ['prayer', 'hitpoints'],
      },
    ],
  },
]
