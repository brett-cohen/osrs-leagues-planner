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
  item("Dizana's quiver",         'cape',          'varlamore'),
  item("Blood moon helm",        'head',          'varlamore'),
  item("Blue moon helm",         'head',          'varlamore'),
  item("Eclipse moon helm",      'head',          'varlamore'),
  item("Blood moon chestplate",  'body',          'varlamore'),
  item("Blue moon chestplate",   'body',          'varlamore'),
  item("Eclipse moon chestplate",'body',          'varlamore'),
  item("Blood moon tassets",     'legs',          'varlamore'),
  item("Blue moon tassets",      'legs',          'varlamore'),
  item("Blue moon spear",         'magic-weapon',  'varlamore'),
  item("Eclipse moon tassets",   'legs',          'varlamore'),
  item("Tonalztics of ralos",    'spec-weapon',  'varlamore'),
  item("Dual macuahuitl",        'melee-weapon',  'varlamore'),
  item("Eclipse atlatl",         'ranged-weapon', 'varlamore'),
  item("Avernic treads",           'feet',          'varlamore'),
  item("Eye of ayak",              'neck',          'varlamore'),
  item("Confliction gauntlets",          'hands',          'varlamore'),
  item("Ultor ring",               'ring',          'varlamore'),

  // ─── Karamja ───────────────────────────────────────────────────────────────
  item("Fire cape",              'cape',          'karamja'),
  item("Infernal cape",          'cape',          'karamja'),
  item("Obsidian helmet",        'head',          'karamja'),
  item("Obsidian platebody",     'body',          'karamja'),
  item("Amulet of fury",         'neck',          'karamja'),
  item("Obsidian platelegs",     'legs',          'karamja'),
  item("Toktz-xil-ak",           'melee-weapon',  'karamja'),
  item("Toktz-xil-ek",           'melee-weapon',  'karamja'),

  // ─── Kebos & Kourend (Zeah) ────────────────────────────────────────────────
  item("Ancestral hat",          'head',          'zeah'),
  item("Ancestral robe top",     'body',          'zeah'),
  item("Ancestral robe bottom",  'legs',          'zeah'),
  item("Dragon hunter crossbow", 'ranged-weapon', 'zeah'),
  item("Elder maul",             'melee-weapon',  'zeah'),
  item("Kodai wand",             'magic-weapon',  'zeah'),
  item("Dragon hunter lance",    'melee-weapon',  'zeah'),
  item("Ferocious gloves",       'hands',         'zeah'),
  item("Brimstone ring",         'ring',          'zeah'),
  item("Rada's blessing 4",      'ammo',          'zeah'),
    item("Dragon warhammer",         'spec-weapon', 'zeah'),


  // ─── Fremennik Province ────────────────────────────────────────────────────
  item("Neitiznot faceguard",    'head',          'fremennik'),
  item("Helm of neitiznot",      'head',          'fremennik'),
  item("Berserker ring",         'ring',          'fremennik'),
  item("Archers ring",           'ring',          'fremennik'),
  item("Seers ring",             'ring',          'fremennik'),
  item("Warrior ring",           'ring',          'fremennik'),
  item("Dragonfire ward",        'shield',        'fremennik'),
  item("Venator bow",             'ranged-weapon', 'fremennik'),
  item("Ancient sceptre",         'magic-weapon',  'fremennik'),
  item("Magus ring",               'ring',          'fremennik'),

  // ─── Wilderness ────────────────────────────────────────────────────────────
  item("Voidwaker",              'spec-weapon',  'wilderness'),
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
  item("Imbued zamorak cape",           'cape',          'wilderness'),
  item("Imbued saradomin cape",           'cape',          'wilderness'),
  item("Imbued guthix cape",           'cape',          'wilderness'),
  item("Spectral spirit shield", 'shield',        'wildereness'),
  item("Arcane spirit shield",   'shield',        'wildereness'),
  item("Elysian spirit shield",  'shield',        'wildereness'),

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
  item("Armadyl godsword",        'spec-weapon',   'asgarnia'),
  item("Bandos godsword",        'spec-weapon',   'asgarnia'),
  item("Saradomin godsword",        'spec-weapon',   'asgarnia'),
  item("Zamorak godsword",        'spec-weapon',   'asgarnia'),
  item("Zamorakian hasta",        'melee-weapon',   'asgarnia'),
  item("Ancient godsword",        'spec-weapon',   'asgarnia'),
  item("Torva full helm",        'head',          'asgarnia'),
  item("Torva platebody",        'body',          'asgarnia'),
  item("Torva platelegs",        'legs',          'asgarnia'),
  item("Dragon defender",        'shield',        'asgarnia'),
  item("Pegasian boots",         'feet',          'asgarnia'),
  item("Primordial boots",       'feet',          'asgarnia'),
  item("Eternal boots",          'feet',          'asgarnia'),
  item("Bellator ring",           'ring',          'asgarnia'),
    item("Dragon boots",           'feet',          'asgarnia'),


  // ─── Tirannwn ──────────────────────────────────────────────────────────────
  item("Crystal helm",           'head',          'tirannwn'),
  item("Crystal body",           'body',          'tirannwn'),
  item("Crystal legs",           'legs',          'tirannwn'),
  item("Bow of faerdhinen",      'ranged-weapon', 'tirannwn'),
  item("Blade of saeldor",       'melee-weapon',  'tirannwn'),
  item("Crystal shield",         'shield',        'tirannwn'),
  item("Tanzanite helm",         'head',          'tirannwn'),
  item("Serpentine helm",        'head',          'tirannwn'),
  item("Trident of the swamp",   'magic-weapon',  'tirannwn'),
  item("Toxic blowpipe",         'ranged-weapon', 'tirannwn'),
  item("Crystal halberd",         'spec-weapon', 'tirannwn'),

  // ─── Kandarin ──────────────────────────────────────────────────────────────
  item("Necklace of anguish",    'neck',          'kandarin'),
  item("Tormented bracelet",     'hands',         'kandarin'),
  item("Amulet of torture",      'neck',          'kandarin'),
  item("Occult necklace",        'neck',          'kandarin'),
  item("Ring of suffering",      'ring',          'kandarin'),
  item("Fighter torso",          'body',          'kandarin'),
  item("Heavy ballista",               'ranged-weapon', 'kandarin'),
  item("Trident of the seas",     'magic-weapon',  'kandarin'),

  // ─── Morytania ─────────────────────────────────────────────────────────────
  item("Justiciar faceguard",    'head',          'morytania'),
  item("Justiciar chestguard",   'body',          'morytania'),
  item("Justiciar legguards",    'legs',          'morytania'),
  item("Avernic defender",       'shield',        'morytania'),
  item("Ghrazi rapier",          'melee-weapon',  'morytania'),
  item("Sanguinesti staff",      'magic-weapon',  'morytania'),
  item("Slayer helmet (i)",      'head',          'morytania'),
  item("Salve amulet (e)",      'neck',          'morytania'),
  item("Inquisitor's great helm", 'head',        'morytania'),
  item("Inquisitor's hauberk",   'body',         'morytania'),
  item("Inquisitor's plateskirt",'legs',          'morytania'),
  item("Inquisitor's mace",      'melee-weapon', 'morytania'),
  item("Noxious halberd",         'melee-weapon', 'morytania'),
  item("Amulet of rancour",       'neck',         'morytania'),
  item("Granite ring",            'ring',         'morytania'),
  // Barrows — Ahrim
  item("Ahrim's hood",            'head',         'morytania'),
  item("Ahrim's robetop",         'body',         'morytania'),
  item("Ahrim's robeskirt",       'legs',         'morytania'),
  item("Ahrim's staff",           'magic-weapon', 'morytania'),
  // Barrows — Dharok
  item("Dharok's helm",           'head',         'morytania'),
  item("Dharok's platebody",      'body',         'morytania'),
  item("Dharok's platelegs",      'legs',         'morytania'),
  item("Dharok's greataxe",       'melee-weapon', 'morytania'),
  // Barrows — Guthan
  item("Guthan's helm",           'head',         'morytania'),
  item("Guthan's platebody",      'body',         'morytania'),
  item("Guthan's chainskirt",     'legs',         'morytania'),
  item("Guthan's warspear",       'melee-weapon', 'morytania'),
  // Barrows — Karil
  item("Karil's coif",            'head',         'morytania'),
  item("Karil's leathertop",      'body',         'morytania'),
  item("Karil's leatherskirt",    'legs',         'morytania'),
  item("Karil's crossbow",        'ranged-weapon','morytania'),
  // Barrows — Torag
  item("Torag's helm",            'head',         'morytania'),
  item("Torag's platebody",       'body',         'morytania'),
  item("Torag's platelegs",       'legs',         'morytania'),
  item("Torag's hammers",         'melee-weapon', 'morytania'),
  // Barrows — Verac
  item("Verac's helm",            'head',         'morytania'),
  item("Verac's brassard",        'body',         'morytania'),
  item("Verac's plateskirt",      'legs',         'morytania'),
  item("Verac's flail",           'melee-weapon', 'morytania'),

  // ─── Kharidian Desert ──────────────────────────────────────────────────────
  item("Masori mask",            'head',          'desert'),
  item("Masori body",            'body',          'desert'),
  item("Masori chaps",           'legs',          'desert'),
  item("Lightbearer",            'ring',          'desert'),
  item("Keris partisan",         'melee-weapon',  'desert'),
  item("Elidinis' ward",         'shield',        'desert'),
  item("Venator ring",            'ring',          'desert'),

  // ─── Global (always available) ─────────────────────────────────────────────
  item("Virtus mask",             'head',          'global'),
  item("Virtus robe top",          'body',          'global'),
  item("Virtus robe bottom",       'legs',          'global'),
  item("Soulreaper axe",           'melee-weapon',  'varlamore'),
  item("Amulet of power",        'neck',          'global'),
  item("Dragonfire shield",      'shield',        'global'),
  item("Twisted bow",            'ranged-weapon', 'global'),
  item("Scythe of vitur",        'melee-weapon',  'global'),
  item("Tumeken's shadow",       'magic-weapon',  'global'),
    item("Dragon dagger",         'spec-weapon', 'global'),

]
