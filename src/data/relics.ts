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
        minorSkills: ['strength', 'agility'],
      },
      {
        id: 'abundance',
        name: 'Abundance',
        description: 'All non-combat skills boosted by 10. Gain 2× XP per drop and earn 2× coins per XP gained.',
        iconUrl: 'https://oldschool.runescape.wiki/images/Abundance_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Abundance_(Demonic_Pacts_League)',
        majorSkills: [],
        minorSkills: ['cooking', 'crafting', 'fletching', 'construction', 'smithing'],
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
        majorSkills: ['cooking', 'smithing', 'agility'],
        minorSkills: [],
      },
      {
        id: 'friendly-forager',
        name: 'Friendly Forager',
        description: "Grants the forager's pouch. Gathering from Woodcutting, Fishing, Mining, and Hunter stores a random grimy herb. Functions as a herb sack. All Herblore items processed at once, 90% chance to save secondaries, potions created with 4 doses.",
        iconUrl: 'https://oldschool.runescape.wiki/images/Friendly_Forager_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Friendly_Forager_(Demonic_Pacts_League)',
        majorSkills: ['herblore'],
        minorSkills: [],
      },
      {
        id: 'woodsman',
        name: 'Woodsman',
        description: 'Auto-burns logs while woodcutting. 100% hunter success rate with double loot and XP.',
        iconUrl: 'https://oldschool.runescape.wiki/images/Woodsman_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Woodsman_(Demonic_Pacts_League)',
        majorSkills: ['firemaking', 'hunter', 'woodcutting'],
        minorSkills: ['farming'],
      },
    ],
  },
  {
    tier: 3,
    options: [
      {
        id: 'bank-heist',
        name: 'Bank Heist',
        description: "Grants a banker's briefcase that teleports to any bank, deposit box, or bank chest (including Wilderness) in your unlocked regions.",
        iconUrl: 'https://oldschool.runescape.wiki/images/Bank_Heist_%28Demonic_Pacts_League%29_detail.png?1ab04',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Bank_Heist_(Demonic_Pacts_League)',
        majorSkills: [],
        minorSkills: [],
      },
      {
        id: 'evil-eye',
        name: 'Evil Eye',
        description: 'Grants a teleportation item to access any boss or raid entrance in your unlocked regions.',
        iconUrl: 'https://oldschool.runescape.wiki/images/Evil_Eye_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Evil_Eye_(Demonic_Pacts_League)',
        majorSkills: [],
        minorSkills: [],
      },
      {
        id: 'map-of-alacrity',
        name: 'Map of Alacrity',
        description: 'Teleport to agility shortcuts throughout your unlocked regions, bypassing Agility level requirements.',
        iconUrl: 'https://oldschool.runescape.wiki/images/Map_of_Alacrity_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Map_of_Alacrity_(Demonic_Pacts_League)',
        majorSkills: [],
        minorSkills: [],
      },
    ],
  },
  {
    tier: 4,
    options: [
      {
        id: 'transmutation',
        name: 'Transmutation',
        description: 'Replaces alchemy spells with Alchemic Divergence (upgrade resources to a higher tier) and Alchemic Convergence (downgrade to a lower tier), processing up to 10 at once.',
        iconUrl: 'https://oldschool.runescape.wiki/images/Transmutation_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Transmutation_(Demonic_Pacts_League)',
        majorSkills: ['magic', 'prayer', 'crafting', 'fletching', 'farming', 'herblore'],
        minorSkills: ['smithing'],
      },
      {
        id: 'conniving-clues',
        name: 'Conniving Clues',
        description: 'Clue rewards grant teleportation contracts. 1-in-4 chance opened caskets contain another clue.',
        iconUrl: 'https://oldschool.runescape.wiki/images/Conniving_Clues_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Conniving_Clues_(Demonic_Pacts_League)',
        majorSkills: [],
        minorSkills: [],
      },
      {
        id: 'butlers-bell',
        name: "Butler's Bell",
        description: 'Summons a demon butler who passively gathers and processes resources (mining, fishing, woodcutting, flax, herbs, plus production skills at half rate), continuing to work even while offline.',
        iconUrl: 'https://oldschool.runescape.wiki/images/Butler%27s_Bell_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Butler%27s_Bell_(Demonic_Pacts_League)',
        majorSkills: ['herblore', 'crafting', 'smithing', 'cooking', 'fletching'],
        minorSkills: ['construction'],
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
        majorSkills: ['farming', 'herblore'],
        minorSkills: [],
      },
      {
        id: 'larcenist',
        name: 'Larcenist',
        description: '100% thieving success. Auto-pickpocket and auto-steal. Pickpocketing and stall loot is 10×.',
        iconUrl: 'https://oldschool.runescape.wiki/images/Larcenist_%28Demonic_Pacts_League%29.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Larcenist_(Demonic_Pacts_League)',
        majorSkills: ['thieving'],
        minorSkills: ['crafting', 'construction', 'fletching', 'smithing'],
      },
      {
        id: 'soul-harvest',
        name: 'Soul Harvest',
        description: 'Farming crops and slain NPCs drop stackable soul shards alongside (or in place of) bones and ashes.',
        iconUrl: 'https://oldschool.runescape.wiki/images/Soul_Harvest_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Soul_Harvest_(Demonic_Pacts_League)',
        majorSkills: ['prayer', 'runecraft'],
        minorSkills: [],
      },
    ],
  },
  {
    tier: 6,
    options: [
      {
        id: 'grimoire',
        name: 'Grimoire',
        description: 'Freely swap between spellbooks, act as a book of the dead, and unlock all prayers and spells regardless of area, quest, or diary requirements.',
        iconUrl: 'https://oldschool.runescape.wiki/images/Grimoire_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Grimoire_(Demonic_Pacts_League)',
        majorSkills: ['magic'],
        minorSkills: ['prayer'],
      },
      {
        id: 'eternal-sustenance',
        name: 'Eternal Sustenance',
        description: 'Food is no longer consumed when eaten, providing unlimited healing from a single piece of food.',
        iconUrl: 'https://oldschool.runescape.wiki/images/Eternal_Sustenance_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Eternal_Sustenance_(Demonic_Pacts_League)',
        majorSkills: [],
        minorSkills: ['cooking'],
      },
      {
        id: 'culling-spree',
        name: 'Culling Spree',
        description: 'Choose slayer tasks from 3 options. 50% superior creature spawn chance with free slayer perks.',
        iconUrl: 'https://oldschool.runescape.wiki/images/Culling_Spree_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Culling_Spree_(Demonic_Pacts_League)',
        majorSkills: ['slayer'],
        minorSkills: [],
      },
    ],
  },
  {
    tier: 7,
    options: [
      {
        id: 'flow-state',
        name: 'Flow State',
        description: 'Forces a fixed 2-tick action rate on most gathering and production skills, including Mining, Woodcutting, Fishing, Cooking, Firemaking, Fletching, Smithing, Crafting, Farming, prayer bone offering, and alchemy spells.',
        iconUrl: 'https://oldschool.runescape.wiki/images/Flow_State_%28Demonic_Pacts_League%29_detail.png?401d3',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Flow_State_(Demonic_Pacts_League)',
        majorSkills: ['mining', 'woodcutting', 'fishing'],
        minorSkills: ['prayer', 'magic', 'cooking', 'firemaking', 'fletching', 'smithing', 'crafting'],
      },
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
        id: 'executioner',
        name: 'Executioner',
        description: "Grants the Sage's axe, which instantly kills targets below 20% health from up to 5 tiles away.",
        iconUrl: 'https://oldschool.runescape.wiki/images/Executioner_detail.png?ed5b7',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Executioner',
        majorSkills: [],
        minorSkills: [],
      },
      {
        id: 'minion',
        name: 'Minion',
        description: 'Summons a combat minion for 30 minutes with configurable looting behaviour.',
        iconUrl: 'https://oldschool.runescape.wiki/images/Minion_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Minion_(Demonic_Pacts_League)',
        majorSkills: [],
        minorSkills: [],
      },
      {
        id: 'flask-of-fervour',
        name: 'Flask of Fervour',
        description: 'Restores HP, prayer, and special attack. Deals typeless AoE damage around you on use.',
        iconUrl: 'https://oldschool.runescape.wiki/images/Flask_of_Fervour_%28Demonic_Pacts_League%29_detail.png',
        wikiUrl: 'https://oldschool.runescape.wiki/w/Flask_of_Fervour_(Demonic_Pacts_League)',
        majorSkills: [],
        minorSkills: [],
      },
    ],
  },
]
