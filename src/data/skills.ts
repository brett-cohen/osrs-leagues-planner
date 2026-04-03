export interface Skill {
  id: string
  name: string
  iconUrl: string
}

/** Skills in OSRS stats-tab grid order (3 columns, top-to-bottom). */
export const skills: Skill[] = [
  // Row 1
  { id: 'attack',       name: 'Attack',       iconUrl: 'https://oldschool.runescape.wiki/images/Attack_icon.png' },
  { id: 'hitpoints',    name: 'Hitpoints',    iconUrl: 'https://oldschool.runescape.wiki/images/Hitpoints_icon.png' },
  { id: 'mining',       name: 'Mining',       iconUrl: 'https://oldschool.runescape.wiki/images/Mining_icon.png' },
  // Row 2
  { id: 'strength',     name: 'Strength',     iconUrl: 'https://oldschool.runescape.wiki/images/Strength_icon.png' },
  { id: 'agility',      name: 'Agility',      iconUrl: 'https://oldschool.runescape.wiki/images/Agility_icon.png' },
  { id: 'smithing',     name: 'Smithing',     iconUrl: 'https://oldschool.runescape.wiki/images/Smithing_icon.png' },
  // Row 3
  { id: 'defence',      name: 'Defence',      iconUrl: 'https://oldschool.runescape.wiki/images/Defence_icon.png' },
  { id: 'herblore',     name: 'Herblore',     iconUrl: 'https://oldschool.runescape.wiki/images/Herblore_icon.png' },
  { id: 'fishing',      name: 'Fishing',      iconUrl: 'https://oldschool.runescape.wiki/images/Fishing_icon.png' },
  // Row 4
  { id: 'ranged',       name: 'Ranged',       iconUrl: 'https://oldschool.runescape.wiki/images/Ranged_icon.png' },
  { id: 'thieving',     name: 'Thieving',     iconUrl: 'https://oldschool.runescape.wiki/images/Thieving_icon.png' },
  { id: 'cooking',      name: 'Cooking',      iconUrl: 'https://oldschool.runescape.wiki/images/Cooking_icon.png' },
  // Row 5
  { id: 'prayer',       name: 'Prayer',       iconUrl: 'https://oldschool.runescape.wiki/images/Prayer_icon.png' },
  { id: 'crafting',     name: 'Crafting',     iconUrl: 'https://oldschool.runescape.wiki/images/Crafting_icon.png' },
  { id: 'firemaking',   name: 'Firemaking',   iconUrl: 'https://oldschool.runescape.wiki/images/Firemaking_icon.png' },
  // Row 6
  { id: 'magic',        name: 'Magic',        iconUrl: 'https://oldschool.runescape.wiki/images/Magic_icon.png' },
  { id: 'fletching',    name: 'Fletching',     iconUrl: 'https://oldschool.runescape.wiki/images/Fletching_icon.png' },
  { id: 'woodcutting',  name: 'Woodcutting',  iconUrl: 'https://oldschool.runescape.wiki/images/Woodcutting_icon.png' },
  // Row 7
  { id: 'runecraft',    name: 'Runecraft',    iconUrl: 'https://oldschool.runescape.wiki/images/Runecraft_icon.png' },
  { id: 'slayer',       name: 'Slayer',       iconUrl: 'https://oldschool.runescape.wiki/images/Slayer_icon.png' },
  { id: 'farming',      name: 'Farming',      iconUrl: 'https://oldschool.runescape.wiki/images/Farming_icon.png' },
  // Row 8
  { id: 'construction', name: 'Construction', iconUrl: 'https://oldschool.runescape.wiki/images/Construction_icon.png' },
  { id: 'hunter',       name: 'Hunter',       iconUrl: 'https://oldschool.runescape.wiki/images/Hunter_icon.png' },
]
