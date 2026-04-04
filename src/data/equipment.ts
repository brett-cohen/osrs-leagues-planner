export interface EquipmentSlot {
  id: string
  name: string
  iconUrl: string
}

export interface GearItem {
  id: string
  name: string
  slot: string
  region: string
  iconUrl: string
}

export const equipmentSlots: EquipmentSlot[] = [
  { id: 'head',   name: 'Head',   iconUrl: 'https://oldschool.runescape.wiki/images/Head_slot.png' },
  { id: 'cape',   name: 'Cape',   iconUrl: 'https://oldschool.runescape.wiki/images/Cape_slot.png' },
  { id: 'neck',   name: 'Neck',   iconUrl: 'https://oldschool.runescape.wiki/images/Neck_slot.png' },
  { id: 'ammo',   name: 'Ammo',   iconUrl: 'https://oldschool.runescape.wiki/images/Ammo_slot.png' },
  { id: 'body',   name: 'Body',   iconUrl: 'https://oldschool.runescape.wiki/images/Body_slot.png' },
  { id: 'shield', name: 'Shield', iconUrl: 'https://oldschool.runescape.wiki/images/Shield_slot.png' },
  { id: 'legs',   name: 'Legs',   iconUrl: 'https://oldschool.runescape.wiki/images/Legs_slot.png' },
  { id: 'hands',  name: 'Hands',  iconUrl: 'https://oldschool.runescape.wiki/images/Hands_slot.png' },
  { id: 'feet',   name: 'Feet',   iconUrl: 'https://oldschool.runescape.wiki/images/Feet_slot.png' },
  { id: 'ring',   name: 'Ring',   iconUrl: 'https://oldschool.runescape.wiki/images/Ring_slot.png' },
]

export const weaponSlots: EquipmentSlot[] = [
  { id: 'melee-weapon',  name: 'Melee Weapon',  iconUrl: 'https://oldschool.runescape.wiki/images/Weapon_slot.png' },
  { id: 'ranged-weapon', name: 'Ranged Weapon', iconUrl: 'https://oldschool.runescape.wiki/images/Weapon_slot.png' },
  { id: 'magic-weapon',  name: 'Magic Weapon',  iconUrl: 'https://oldschool.runescape.wiki/images/Weapon_slot.png' },
  { id: 'spec-weapon',   name: 'Spec Weapon',   iconUrl: 'https://oldschool.runescape.wiki/images/2h_slot.png' },
]

function item(name: string, slot: string, region: string): GearItem {
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const wikiName = name.replace(/ /g, '_').replace(/'/g, '%27')
  return { id, name, slot, region, iconUrl: `https://oldschool.runescape.wiki/images/${wikiName}.png` }
}

export const gearItems: GearItem[] = [
  // ─── Varlamore ─────────────────────────────────────────────────────────────
  item("Dizana's quiver",         'ammo',          'varlamore'),
  item("Blood moon helm",        'head',          'varlamore'),
  item("Blue moon helm",         'head',          'varlamore'),
  item("Eclipse moon helm",      'head',          'varlamore'),
  item("Blood moon chestplate",  'body',          'varlamore'),
  item("Blue moon chestplate",   'body',          'varlamore'),
  item("Eclipse moon chestplate",'body',          'varlamore'),
  item("Blood moon tassets",     'legs',          'varlamore'),
  item("Blue moon tassets",      'legs',          'varlamore'),
  item("Eclipse moon tassets",   'legs',          'varlamore'),
  item("Tonalztics of ralos",    'melee-weapon',  'varlamore'),
  item("Dual macuahuitl",        'melee-weapon',  'varlamore'),
  item("Scorching bow",          'ranged-weapon', 'varlamore'),
  item("Eclipse atlatl",         'ranged-weapon', 'varlamore'),
  item("Blood moon helm",        'melee-weapon',  'varlamore'),

  // ─── Karamja ───────────────────────────────────────────────────────────────
  item("Fire cape",              'cape',          'karamja'),
  item("Infernal cape",          'cape',          'karamja'),
  item("TzKal-Zuk's cape",      'cape',          'karamja'),
  item("Obsidian helmet",        'head',          'karamja'),
  item("Obsidian platebody",     'body',          'karamja'),
  item("Obsidian platelegs",     'legs',          'karamja'),
  item("Toktz-xil-ak",           'melee-weapon',  'karamja'),
  item("Toktz-xil-ek",           'melee-weapon',  'karamja'),

  // ─── Kebos & Kourend (Zeah) ────────────────────────────────────────────────
  item("Ancestral hat",          'head',          'zeah'),
  item("Ancestral robe top",     'body',          'zeah'),
  item("Ancestral robe bottom",  'legs',          'zeah'),
  item("Dragon hunter crossbow", 'ranged-weapon', 'zeah'),
  item("Twisted bow",            'ranged-weapon', 'zeah'),
  item("Elder maul",             'melee-weapon',  'zeah'),
  item("Kodai wand",             'magic-weapon',  'zeah'),
  item("Dragon hunter lance",    'melee-weapon',  'zeah'),
  item("Ferocious gloves",       'hands',         'zeah'),
  item("Brimstone ring",         'ring',          'zeah'),
  item("Xeric's talisman",       'neck',          'zeah'),
  item("Rada's blessing 4",      'ammo',          'zeah'),

  // ─── Fremennik Province ────────────────────────────────────────────────────
  item("Neitiznot faceguard",    'head',          'fremennik'),
  item("Helm of neitiznot",      'head',          'fremennik'),
  item("Berserker ring",         'ring',          'fremennik'),
  item("Archers ring",           'ring',          'fremennik'),
  item("Seers ring",             'ring',          'fremennik'),
  item("Warrior ring",           'ring',          'fremennik'),
  item("Dragonfire shield",      'shield',        'fremennik'),
  item("Dragonfire ward",        'shield',        'fremennik'),
  item("Fremennik sea boots 4",  'feet',          'fremennik'),
  item("Basilisk jaw",           'head',          'fremennik'),

  // ─── Wilderness ────────────────────────────────────────────────────────────
  item("Voidwaker",              'melee-weapon',  'wilderness'),
  item("Craw's bow",             'ranged-weapon', 'wilderness'),
  item("Thammaron's sceptre",    'magic-weapon',  'wilderness'),
  item("Viggora's chainmace",    'melee-weapon',  'wilderness'),
  item("Webweaver bow",          'ranged-weapon', 'wilderness'),
  item("Accursed sceptre",       'magic-weapon',  'wilderness'),
  item("Ursine chainmace",       'melee-weapon',  'wilderness'),
  item("Ring of the gods",       'ring',          'wilderness'),
  item("Treasonous ring",        'ring',          'wilderness'),
  item("Tyrannical ring",        'ring',          'wilderness'),
  item("Malediction ward",       'shield',        'wilderness'),
  item("Odium ward",             'shield',        'wilderness'),
  item("God cape (i)",           'cape',          'wilderness'),

  // ─── Asgarnia ──────────────────────────────────────────────────────────────
  item("Bandos chestplate",      'body',          'asgarnia'),
  item("Bandos tassets",         'legs',          'asgarnia'),
  item("Bandos boots",           'feet',          'asgarnia'),
  item("Armadyl helmet",         'head',          'asgarnia'),
  item("Armadyl chestplate",     'body',          'asgarnia'),
  item("Armadyl chainskirt",     'legs',          'asgarnia'),
  item("Saradomin sword",        'melee-weapon',  'asgarnia'),
  item("Armadyl crossbow",       'ranged-weapon', 'asgarnia'),
  item("Staff of the dead",      'magic-weapon',  'asgarnia'),
  item("Zaryte crossbow",        'ranged-weapon', 'asgarnia'),
  item("Godsword (any)",         'melee-weapon',  'asgarnia'),
  item("Torva full helm",        'head',          'asgarnia'),
  item("Torva platebody",        'body',          'asgarnia'),
  item("Torva platelegs",        'legs',          'asgarnia'),
  item("Ancient hilt",           'melee-weapon',  'asgarnia'),
  item("Spectral spirit shield", 'shield',        'asgarnia'),
  item("Arcane spirit shield",   'shield',        'asgarnia'),
  item("Elysian spirit shield",  'shield',        'asgarnia'),

  // ─── Tirannwn ──────────────────────────────────────────────────────────────
  item("Crystal helm",           'head',          'tirannwn'),
  item("Crystal body",           'body',          'tirannwn'),
  item("Crystal legs",           'legs',          'tirannwn'),
  item("Bow of faerdhinen",      'ranged-weapon', 'tirannwn'),
  item("Blade of saeldor",       'melee-weapon',  'tirannwn'),
  item("Crystal shield",         'shield',        'tirannwn'),
  item("Tanzanite helm",         'head',          'tirannwn'),
  item("Serpentine helm",        'head',          'tirannwn'),
  item("Magma helm",             'head',          'tirannwn'),
  item("Trident of the swamp",   'magic-weapon',  'tirannwn'),
  item("Toxic blowpipe",         'ranged-weapon', 'tirannwn'),
  item("Magic fang",             'magic-weapon',  'tirannwn'),

  // ─── Kandarin ──────────────────────────────────────────────────────────────
  item("Amulet of fury",         'neck',          'kandarin'),
  item("Amulet of glory",        'neck',          'kandarin'),
  item("Necklace of anguish",    'neck',          'kandarin'),
  item("Tormented bracelet",     'hands',         'kandarin'),
  item("Zenyte bracelet",        'hands',         'kandarin'),
  item("Amulet of torture",      'neck',          'kandarin'),
  item("Occult necklace",        'neck',          'kandarin'),
  item("Pegasian boots",         'feet',          'kandarin'),
  item("Primordial boots",       'feet',          'kandarin'),
  item("Eternal boots",          'feet',          'kandarin'),
  item("Fighter torso",          'body',          'kandarin'),
  item("Ballista",               'ranged-weapon', 'kandarin'),

  // ─── Morytania ─────────────────────────────────────────────────────────────
  item("Justiciar faceguard",    'head',          'morytania'),
  item("Justiciar chestguard",   'body',          'morytania'),
  item("Justiciar legguards",    'legs',          'morytania'),
  item("Avernic defender",       'shield',        'morytania'),
  item("Ghrazi rapier",          'melee-weapon',  'morytania'),
  item("Sanguinesti staff",      'magic-weapon',  'morytania'),
  item("Scythe of vitur",        'melee-weapon',  'morytania'),
  item("Black mask (i)",         'head',          'morytania'),
  item("Slayer helmet (i)",      'head',          'morytania'),
  item("Salve amulet (ei)",      'neck',          'morytania'),
  item("Barrows gloves",         'hands',         'morytania'),

  // ─── Kharidian Desert ──────────────────────────────────────────────────────
  item("Masori mask",            'head',          'desert'),
  item("Masori body",            'body',          'desert'),
  item("Masori chaps",           'legs',          'desert'),
  item("Lightbearer",            'ring',          'desert'),
  item("Keris partisan",         'melee-weapon',  'desert'),
  item("Pharaoh's sceptre",      'magic-weapon',  'desert'),
  item("Elidinis' ward",         'shield',        'desert'),

  // ─── Global (always available) ─────────────────────────────────────────────
  item("Dragon defender",        'shield',        'global'),
  item("Rune gloves",            'hands',         'global'),
  item("Dragon boots",           'feet',          'global'),
  item("Amulet of power",        'neck',          'global'),
  item("Ava's assembler",        'cape',          'global'),
]
