export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Elite' | 'Master'

export const DIFFICULTY_POINTS: Record<Difficulty, number> = {
  Easy:   10,
  Medium: 50,
  Hard:   100,
  Elite:  250,
  Master: 500,
}

export interface Task {
  id: string
  /** Matches Region.id, or 'global' for region-agnostic tasks */
  region: string
  difficulty: Difficulty
  name: string
  /** Whether this task awards a demonic pact point */
  pactPoint: boolean
}

function pact(name: string, difficulty: Difficulty, region: string): Task {
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
  return { id, region, difficulty, name, pactPoint: true }
}

export const tasks: Task[] = [
  // ─── General ───────────────────────────────────────────────────────────────
  pact('Complete the Leagues Tutorial',                     'Easy',   'global'),
  pact('Defeat a Hill Giant',                               'Easy',   'global'),
  pact('Open the Leagues Menu',                             'Easy',   'global'),
  pact('Reach Combat Level 50',                             'Medium', 'global'),
  pact('Use the Protect from Melee Prayer',                 'Medium', 'global'),
  pact('Kill 1 unique Echo Boss',                           'Hard',   'global'),
  pact('Kill 2 unique Echo Bosses',                         'Hard',   'global'),
  pact('Kill 3 unique Echo Bosses',                         'Hard',   'global'),
  pact('Kill 4 unique Echo Bosses',                         'Elite',  'global'),

  // ─── Varlamore ─────────────────────────────────────────────────────────────
  pact('1 Hueycoatl Kill',                                  'Medium', 'varlamore'),
  pact('Complete Wave 12 of Fortis Colosseum',              'Elite',  'varlamore'),
  pact('Defeat Awakened Vardorvis',                         'Elite',  'varlamore'),
  pact('Equip Avernic Treads',                              'Elite',  'varlamore'),

  // ─── Karamja ───────────────────────────────────────────────────────────────
  pact('Defeat a Steel Dragon on Karamja',                  'Medium', 'karamja'),
  pact('Defeat a TzHaar',                                   'Medium', 'karamja'),
  pact("Complete Tzhaar-Ket-Rak's third challenge",         'Hard',   'karamja'),
  pact('Equip a Fire Cape',                                 'Elite',  'karamja'),
  pact("Complete Tzhaar-Ket-Rak's Special challenge",       'Master', 'karamja'),
  pact('Equip an Infernal Cape',                            'Master', 'karamja'),

  // ─── Kebos & Kourend (Zeah) ────────────────────────────────────────────────
  pact('Open 1 Grubby Chest',                              'Easy',   'zeah'),
  pact('150 Lizardmen Shaman Kills',                        'Medium', 'zeah'),
  pact('1 Skotizo Kill',                                    'Hard',   'zeah'),
  pact('25 Chambers of Xeric',                              'Hard',   'zeah'),
  pact('Equip a Dragon Hunter Lance',                       'Elite',  'zeah'),
  pact('Equip a piece of Radiant Oathplate',                'Elite',  'zeah'),
  pact('Equip any Ancestral piece',                         'Elite',  'zeah'),

  // ─── Fremennik Province ────────────────────────────────────────────────────
  pact('Defeat a Cockatrice in the Fremennik Province',     'Easy',   'fremennik'),
  pact('Kill 8 penguins within 5 seconds',                  'Medium', 'fremennik'),
  pact('Defeat Phantom Muspah',                             'Hard',   'fremennik'),
  pact('Defeat a Basilisk Knight',                          'Hard',   'fremennik'),
  pact('Defeat Awakened Duke Sucellus',                     'Elite',  'fremennik'),
  pact('Defeat Vorkath 5 Times Without Special Damage',     'Elite',  'fremennik'),
  pact('Equip the Magus Ring',                              'Elite',  'fremennik'),

  // ─── Wilderness ────────────────────────────────────────────────────────────
  pact('Defeat a Chaos Dwarf in the Wilderness',            'Easy',   'wilderness'),
  pact('Defeat the Corporeal Beast',                        'Hard',   'wilderness'),
  pact('Equip a Dragon 2-Handed Sword in the Wilderness',   'Hard',   'wilderness'),
  pact('Equip a Malediction Ward',                          'Hard',   'wilderness'),
  pact("Equip a Piece of the Dagon'Hai Set",                'Elite',  'wilderness'),
  pact('Equip the Voidwaker',                               'Elite',  'wilderness'),
  pact('Imbue a God Cape',                                  'Elite',  'wilderness'),

  // ─── Asgarnia ──────────────────────────────────────────────────────────────
  pact('Defeat a Troll in Asgarnia',                        'Easy',   'asgarnia'),
  pact('Defeat the Royal Titans solo',                      'Hard',   'asgarnia'),
  pact('Equip a Dragon Defender',                           'Hard',   'asgarnia'),
  pact('Defeat Awakened Whisperer',                         'Elite',  'asgarnia'),
  pact('Equip a Godsword',                                  'Elite',  'asgarnia'),
  pact('Equip the Bellator Ring',                           'Elite',  'asgarnia'),
  pact('Defeat Nex Solo',                                   'Master', 'asgarnia'),

  // ─── Tirannwn ──────────────────────────────────────────────────────────────
  pact('Kill a Black Dragon in Tirannwn',                   'Medium', 'tirannwn'),
  pact('Complete the Corrupted Gauntlet',                   'Hard',   'tirannwn'),
  pact('Defeat Zalcano',                                    'Hard',   'tirannwn'),
  pact('Equip a Dark Bow in Tirannwn',                      'Hard',   'tirannwn'),
  pact('Craft a Toxic Blowpipe',                            'Elite',  'tirannwn'),
  pact('Use a prayer altar to restore 90 prayer in Prifddinas', 'Elite', 'tirannwn'),
  pact('Equip a Corrupted Weapon',                          'Master', 'tirannwn'),

  // ─── Kandarin ──────────────────────────────────────────────────────────────
  pact('Defeat a Demonic Gorilla',                          'Hard',   'kandarin'),
  pact('Defeat a Mithril Dragon',                           'Hard',   'kandarin'),
  pact('Defeat the Kraken Boss 50 Times',                   'Hard',   'kandarin'),
  pact('Equip a Trident of the Seas',                       'Hard',   'kandarin'),
  pact('Equip Some Zenyte Jewelry',                         'Elite',  'kandarin'),
  pact('Equip an Abyssal Tentacle',                         'Elite',  'kandarin'),
  pact('Equip an Occult Necklace',                          'Elite',  'kandarin'),

  // ─── Morytania ─────────────────────────────────────────────────────────────
  pact('Defeat a Werewolf in Morytania',                    'Easy',   'morytania'),
  pact('1 Araxxor Kill',                                    'Hard',   'morytania'),
  pact('Assemble a Slayer Helm',                            'Hard',   'morytania'),
  pact('Create an Amulet of Blood Fury',                    'Hard',   'morytania'),
  pact('Equip any Full Barrows Armour Set',                 'Hard',   'morytania'),
  pact('Complete the Theatre of Blood 25 Times',            'Elite',  'morytania'),
  pact("Defeat Phosani's Nightmare",                        'Elite',  'morytania'),

  // ─── Kharidian Desert ──────────────────────────────────────────────────────
  pact('Set a mummy ablaze',                                'Easy',   'desert'),
  pact('Cast Ice Barrage',                                  'Elite',  'desert'),
  pact('Defeat Awakened Leviathan',                         'Elite',  'desert'),
  pact('Equip a Dragon Chainbody in the Kharidian Desert',  'Elite',  'desert'),
  pact('Equip a Piece of Masori Armour',                    'Elite',  'desert'),
  pact('Equip the Venator Ring',                            'Elite',  'desert'),
  pact("Equip Osmumten's Fang (or)",                        'Master', 'desert'),
]
