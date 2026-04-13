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

let _counter = 0
function task(name: string, difficulty: Difficulty, region: string, pactPoint = false): Task {
  const id = `t${++_counter}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}`
  return { id, region, difficulty, name, pactPoint }
}

export const tasks: Task[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // GENERAL — Easy
  // ═══════════════════════════════════════════════════════════════════════════
  task('Complete the Leagues Tutorial',          'Easy', 'global', true),
  task('Open the Leagues Menu',                  'Easy', 'global', true),
  task('Defeat a Hill Giant',                    'Easy', 'global', true),
  task('Achieve Your First Level Up',            'Easy', 'global'),
  task('Achieve Your First Level 5',             'Easy', 'global'),
  task('Achieve Your First Level 10',            'Easy', 'global'),
  task('Attack a dummy',                         'Easy', 'global'),
  task('Defeat a Chicken',                       'Easy', 'global'),
  task('Defeat a Rat',                           'Easy', 'global'),
  task('Defeat a Frog',                          'Easy', 'global'),
  task('Defeat a scorpion',                      'Easy', 'global'),
  task('Defeat an Imp with an earth spell',      'Easy', 'global'),
  task('Burn Some Normal Logs',                  'Easy', 'global'),
  task('Burn Some Oak Logs',                     'Easy', 'global'),
  task('Burn Some Food',                         'Easy', 'global'),
  task('Chop Some Logs',                         'Easy', 'global'),
  task('Chop Some Logs With a Steel Axe',        'Easy', 'global'),
  task('Catch a Shrimp',                         'Easy', 'global'),
  task('Catch a Herring',                        'Easy', 'global'),
  task('Catch an Anchovy',                       'Easy', 'global'),
  task('Cook Shrimp',                            'Easy', 'global'),
  task('Cook something with an apron',           'Easy', 'global'),
  task('Bury 6 bones',                           'Easy', 'global'),
  task('Activate a prayer near an altar',        'Easy', 'global'),
  task('Drink a Strength Potion',                'Easy', 'global'),
  task('Make an Attack Potion',                  'Easy', 'global'),
  task('Create an Antipoison',                   'Easy', 'global'),
  task('Create a Compost Potion',                'Easy', 'global'),
  task('Clean a Grimy Guam',                     'Easy', 'global'),
  task('Clean 25 Grimy Guam Leafs',              'Easy', 'global'),
  task('Clean 15 Grimy Tarromin',                'Easy', 'global'),
  task('Mine some Clay',                         'Easy', 'global'),
  task('Mine 5 Tin Ore',                         'Easy', 'global'),
  task('Mine some Ore With a Steel Pickaxe',     'Easy', 'global'),
  task('Smelt a Bronze Bar',                     'Easy', 'global'),
  task('Smelt an Iron Bar',                      'Easy', 'global'),
  task('Equip an Iron dagger',                   'Easy', 'global'),
  task('Equip an Elemental Staff',               'Easy', 'global'),
  task('Equip a Tyras helm',                     'Easy', 'global'),
  task('Light a Torch',                          'Easy', 'global'),
  task('Cast Home Teleport',                     'Easy', 'global'),
  task('Perform a Special Attack',               'Easy', 'global'),
  task('Fletch Some Arrow Shafts',               'Easy', 'global'),
  task('Fletch an Oak Shortbow',                 'Easy', 'global'),
  task('Craft Leather chaps',                    'Easy', 'global'),
  task('Cut a Ruby',                             'Easy', 'global'),
  task('Successfully Cut a Red Topaz',           'Easy', 'global'),
  task('Pickpocket a Citizen',                   'Easy', 'global'),
  task('Steal some bread',                       'Easy', 'global'),
  task('Snare a Bird',                           'Easy', 'global'),
  task('Snare 5 Crimson Swifts',                 'Easy', 'global'),
  task('Snare 15 Tropical Wagtails',             'Easy', 'global'),
  task('Catch a Baby Impling',                   'Easy', 'global'),
  task('Obtain a Casket from Fishing',           'Easy', 'global'),
  task('Obtain a Bird Nest',                     'Easy', 'global'),
  task('Pick 6 flax',                            'Easy', 'global'),
  task('Pick 6 wheat, 6 cabbages and 6 potatoes','Easy', 'global'),
  task('Plant Seeds in an Allotment Patch',      'Easy', 'global'),
  task('Protect Your Crops',                     'Easy', 'global'),
  task('Rake a Flower Patch',                    'Easy', 'global'),
  task('Spin a Ball of Wool',                    'Easy', 'global'),
  task('Eat an Onion',                           'Easy', 'global'),
  task('Eat a Rabbit',                           'Easy', 'global'),
  task('Dye a cape Purple',                      'Easy', 'global'),
  task('Enter your Player Owned House',          'Easy', 'global'),
  task('Purchase a Player Owned House',          'Easy', 'global'),
  task('Get a haircut',                          'Easy', 'global'),
  task('Talk to any Port master',                'Easy', 'global'),
  task('Turn off your run',                      'Easy', 'global'),
  task('Feed a dog some bones',                  'Easy', 'global'),
  task('Turn any Logs Into a Plank',             'Easy', 'global'),
  task('Reach Combat Level 25',                  'Easy', 'global'),

  // ═══════════════════════════════════════════════════════════════════════════
  // GENERAL — Medium
  // ═══════════════════════════════════════════════════════════════════════════
  task('Reach Combat Level 50',                  'Medium', 'global', true),
  task('Use the Protect from Melee Prayer',      'Medium', 'global', true),
  task('Achieve Your First Level 20',            'Medium', 'global'),
  task('Achieve Your First Level 30',            'Medium', 'global'),
  task('Achieve Your First Level 40',            'Medium', 'global'),
  task('Achieve Your First Level 50',            'Medium', 'global'),
  task('Achieve Your First Level 60',            'Medium', 'global'),
  task('1 Easy Clue Scroll',                     'Medium', 'global'),
  task('1 Medium Clue Scroll',                   'Medium', 'global'),
  task('1 Hard Clue Scroll',                     'Medium', 'global'),
  task('1 Elite Clue Scroll',                    'Medium', 'global'),
  task('5 Collection log slots',                 'Medium', 'global'),
  task('15 Collection log slots',                'Medium', 'global'),
  task('30 Collection log slots',                'Medium', 'global'),
  task('50 Collection log slots',                'Medium', 'global'),
  task('25 Easy Clue Scrolls',                   'Medium', 'global'),
  task('75 Easy Clue Scrolls',                   'Medium', 'global'),
  task('25 Medium Clue Scrolls',                 'Medium', 'global'),
  task('75 Medium Clue Scrolls',                 'Medium', 'global'),
  task('25 Hard Clue Scrolls',                   'Medium', 'global'),
  task('Fill 5 Easy Clue Collection Log Slots',  'Medium', 'global'),
  task('Fill 20 Easy Clue Collection Log Slots', 'Medium', 'global'),
  task('Fill 5 Medium Clue Collection Log Slots','Medium', 'global'),
  task('Fill 20 Medium Clue Collection Log Slots','Medium','global'),
  task('Fill 3 Hard Clue Collection Log Slots',  'Medium', 'global'),
  task('Fill 15 Hard Clue Collection Log Slots', 'Medium', 'global'),
  task('Fill 3 Elite Clue Collection Log Slots', 'Medium', 'global'),
  task('Defeat 25 Superior slayer creatures',    'Medium', 'global'),
  task('Defeat 75 Superior slayer creatures',    'Medium', 'global'),
  task('Activate Smite',                         'Medium', 'global'),
  task('Cast Low Level Alchemy',                 'Medium', 'global'),
  task('Cast an Earth Blast Spell',              'Medium', 'global'),
  task('Convert an item into at least 500 coins','Medium', 'global'),
  task('Burn 100 Willow Logs',                   'Medium', 'global'),
  task('Burn 25 Maple Logs',                     'Medium', 'global'),
  task('Burn Some Coloured Logs',                'Medium', 'global'),
  task('Chop 100 Willow Logs',                   'Medium', 'global'),
  task('Chop Some Logs With a Rune Axe',         'Medium', 'global'),
  task('Chop some Rising Roots',                 'Medium', 'global'),
  task('Chop 50 Maple Logs',                     'Medium', 'global'),
  task('Catch 10 Cod',                           'Medium', 'global'),
  task('Catch 20 mackerel',                      'Medium', 'global'),
  task('Catch 50 Tuna',                          'Medium', 'global'),
  task('Catch 75 Trout',                         'Medium', 'global'),
  task('Catch 75 Lobsters',                      'Medium', 'global'),
  task('Catch 100 Tuna',                         'Medium', 'global'),
  task('Catch 100 Swordfish',                    'Medium', 'global'),
  task('Catch a Butterfly',                      'Medium', 'global'),
  task('Catch a Swamp Lizard or Salamander',     'Medium', 'global'),
  task('Catch 50 Implings in Puro-Puro',         'Medium', 'global'),
  task('Cook 50 Tuna',                           'Medium', 'global'),
  task('Cook 100 Swordfish',                     'Medium', 'global'),
  task('Butter a potato',                        'Medium', 'global'),
  task('Churn some butter',                      'Medium', 'global'),
  task('Check a grown Tree',                     'Medium', 'global'),
  task('Check a grown Fruit Tree',               'Medium', 'global'),
  task('Clean a Grimy Avantoe',                  'Medium', 'global'),
  task('Clean 50 Grimy Ranarr Weed',             'Medium', 'global'),
  task('Clean 50 Grimy Cadantine',               'Medium', 'global'),
  task('Complete 1 Slayer Task',                 'Medium', 'global'),
  task('Defeat a Superior slayer creature',      'Medium', 'global'),
  task('Eat some Purple Sweets',                 'Medium', 'global'),
  task('Eat a piece of food that restores at least 6 hitpoints', 'Medium', 'global'),
  task('Equip some Steel armour',                'Medium', 'global'),
  task('Equip some Black armour',                'Medium', 'global'),
  task('Equip a Full Bronze Set',                'Medium', 'global'),
  task('Equip a Full Adamant Set',               'Medium', 'global'),
  task('Equip an Adamant Weapon',                'Medium', 'global'),
  task('Equip a Mithril Weapon',                 'Medium', 'global'),
  task('Equip a Rune Weapon',                    'Medium', 'global'),
  task('Equip a Yew Shortbow',                   'Medium', 'global'),
  task('Equip a Full Blue Dragonhide Set',       'Medium', 'global'),
  task('Equip a Full Red Dragonhide Set',        'Medium', 'global'),
  task('Equip a Piece of a Mystic Set',          'Medium', 'global'),
  task('Equip an Elemental Battlestaff or Mystic Staff', 'Medium', 'global'),
  task('Equip a Willow Shield',                  'Medium', 'global'),
  task('Equip a Trimmed Amulet',                 'Medium', 'global'),
  task("Equip a piece of Beekeeper's Outfit",    'Medium', 'global'),
  task('Equip a piece of Camouflage outfit',     'Medium', 'global'),
  task('Equip a piece of Mime Outfit',           'Medium', 'global'),
  task('Equip a piece of Zombie Outfit',         'Medium', 'global'),
  task('Equip the Forestry Basket',              'Medium', 'global'),
  task('Fletch 150 Iron Arrows',                 'Medium', 'global'),
  task('Fletch 25 Oak Stocks',                   'Medium', 'global'),
  task('Fletch 25 Maple longbow (u)',            'Medium', 'global'),
  task('Fletch 1000 arrow shafts',               'Medium', 'global'),
  task('Craft a Sapphire Amulet',                'Medium', 'global'),
  task('Craft an Emerald Ring',                  'Medium', 'global'),
  task("Create a Green d'hide shield",           'Medium', 'global'),
  task('Craft 20 Silver items',                  'Medium', 'global'),
  task('Craft Any Combination Rune',             'Medium', 'global'),
  task('Craft 200 Essence Into Runes',           'Medium', 'global'),
  task('Create a Guthix Rest Tea',               'Medium', 'global'),
  task('Fill a Large Pouch',                     'Medium', 'global'),
  task('Fill a Medium STASH Unit',               'Medium', 'global'),
  task('Build a Room in Your Player Owned House','Medium', 'global'),
  task('Build an Oak Larder',                    'Medium', 'global'),
  task('Build a Mahogany Portal',                'Medium', 'global'),
  task('Complete the Evil Bob random event',     'Medium', 'global'),
  task('Complete the Maze random event',         'Medium', 'global'),
  task('Complete the Pillory random event',      'Medium', 'global'),
  task('Complete the Pinball random event',      'Medium', 'global'),
  task('Complete the Postie Pete random event',  'Medium', 'global'),
  task('Complete the Prison Pete random event',  'Medium', 'global'),
  task('Complete the Surprise Exam random event','Medium', 'global'),
  task('Complete the Pheasant Forestry Event',   'Medium', 'global'),
  task('Complete the Ritual Forestry Event',     'Medium', 'global'),
  task('Complete the Struggling Sapling event',  'Medium', 'global'),
  task('Complete the Flowering Bush event',      'Medium', 'global'),
  task('Bury Some Wyvern or Dragon Bones',       'Medium', 'global'),
  task('Fill a Bucket With Supercompost',        'Medium', 'global'),

  // ═══════════════════════════════════════════════════════════════════════════
  // GENERAL — Hard / Elite
  // ═══════════════════════════════════════════════════════════════════════════
  task('Kill 1 unique Echo Boss',                'Hard',   'global', true),
  task('Kill 2 unique Echo Bosses',              'Hard',   'global', true),
  task('Kill 3 unique Echo Bosses',              'Hard',   'global', true),
  task('Kill 4 unique Echo Bosses',              'Elite',  'global', true),

  // ═══════════════════════════════════════════════════════════════════════════
  // VARLAMORE
  // ═══════════════════════════════════════════════════════════════════════════
  task('Sell some silk to a silk trader',         'Easy',   'varlamore'),
  task('1 Hueycoatl Kill',                       'Medium', 'varlamore', true),
  task('Complete Wave 12 of Fortis Colosseum',   'Elite',  'varlamore', true),
  task('Defeat Awakened Vardorvis',              'Elite',  'varlamore', true),
  task('Equip Avernic Treads',                   'Elite',  'varlamore', true),

  // ═══════════════════════════════════════════════════════════════════════════
  // KARAMJA
  // ═══════════════════════════════════════════════════════════════════════════
  task('Defeat a Steel Dragon on Karamja',       'Medium', 'karamja', true),
  task('Defeat a TzHaar',                        'Medium', 'karamja', true),
  task("Complete Tzhaar-Ket-Rak's third challenge",'Hard', 'karamja', true),
  task('Equip a Fire Cape',                      'Elite',  'karamja', true),
  task("Complete Tzhaar-Ket-Rak's Special challenge",'Master','karamja', true),
  task('Equip an Infernal Cape',                 'Master', 'karamja', true),

  // ═══════════════════════════════════════════════════════════════════════════
  // KEBOS & KOUREND (ZEAH)
  // ═══════════════════════════════════════════════════════════════════════════
  task('Open 1 Grubby Chest',                   'Easy',   'zeah', true),
  task('150 Lizardmen Shaman Kills',             'Medium', 'zeah', true),
  task('1 Skotizo Kill',                         'Hard',   'zeah', true),
  task('25 Chambers of Xeric',                   'Hard',   'zeah', true),
  task('Equip a Dragon Hunter Lance',            'Elite',  'zeah', true),
  task('Equip a piece of Radiant Oathplate',     'Elite',  'zeah', true),
  task('Equip any Ancestral piece',              'Elite',  'zeah', true),

  // ═══════════════════════════════════════════════════════════════════════════
  // FREMENNIK PROVINCE
  // ═══════════════════════════════════════════════════════════════════════════
  task('Defeat a Cockatrice in the Fremennik Province','Easy','fremennik', true),
  task('Kill 8 penguins within 5 seconds',       'Medium', 'fremennik', true),
  task('Defeat Phantom Muspah',                  'Hard',   'fremennik', true),
  task('Defeat a Basilisk Knight',               'Hard',   'fremennik', true),
  task('Defeat Awakened Duke Sucellus',          'Elite',  'fremennik', true),
  task('Defeat Vorkath 5 Times Without Special Damage','Elite','fremennik', true),
  task('Equip the Magus Ring',                   'Elite',  'fremennik', true),

  // ═══════════════════════════════════════════════════════════════════════════
  // WILDERNESS
  // ═══════════════════════════════════════════════════════════════════════════
  task('Defeat a Chaos Dwarf in the Wilderness', 'Easy',   'wilderness', true),
  task('Defeat the Corporeal Beast',             'Hard',   'wilderness', true),
  task('Equip a Dragon 2-Handed Sword in the Wilderness','Hard','wilderness', true),
  task('Equip a Malediction Ward',               'Hard',   'wilderness', true),
  task("Equip a Piece of the Dagon'Hai Set",     'Elite',  'wilderness', true),
  task('Equip the Voidwaker',                    'Elite',  'wilderness', true),
  task('Imbue a God Cape',                       'Elite',  'wilderness', true),

  // ═══════════════════════════════════════════════════════════════════════════
  // ASGARNIA
  // ═══════════════════════════════════════════════════════════════════════════
  task('Defeat a Troll in Asgarnia',             'Easy',   'asgarnia', true),
  task('Defeat the Royal Titans solo',           'Hard',   'asgarnia', true),
  task('Equip a Dragon Defender',                'Hard',   'asgarnia', true),
  task('Defeat Awakened Whisperer',              'Elite',  'asgarnia', true),
  task('Equip a Godsword',                       'Elite',  'asgarnia', true),
  task('Equip the Bellator Ring',                'Elite',  'asgarnia', true),
  task('Defeat Nex Solo',                        'Master', 'asgarnia', true),

  // ═══════════════════════════════════════════════════════════════════════════
  // TIRANNWN
  // ═══════════════════════════════════════════════════════════════════════════
  task('Kill a Black Dragon in Tirannwn',        'Medium', 'tirannwn', true),
  task('Complete the Corrupted Gauntlet',        'Hard',   'tirannwn', true),
  task('Defeat Zalcano',                         'Hard',   'tirannwn', true),
  task('Equip a Dark Bow in Tirannwn',           'Hard',   'tirannwn', true),
  task('Craft a Toxic Blowpipe',                 'Elite',  'tirannwn', true),
  task('Use a prayer altar to restore 90 prayer in Prifddinas','Elite','tirannwn', true),
  task('Equip a Corrupted Weapon',               'Master', 'tirannwn', true),

  // ═══════════════════════════════════════════════════════════════════════════
  // KANDARIN
  // ═══════════════════════════════════════════════════════════════════════════
  task('Defeat a Demonic Gorilla',               'Hard',   'kandarin', true),
  task('Defeat a Mithril Dragon',                'Hard',   'kandarin', true),
  task('Defeat the Kraken Boss 50 Times',        'Hard',   'kandarin', true),
  task('Equip a Trident of the Seas',            'Hard',   'kandarin', true),
  task('Equip Some Zenyte Jewelry',              'Elite',  'kandarin', true),
  task('Equip an Abyssal Tentacle',              'Elite',  'kandarin', true),
  task('Equip an Occult Necklace',               'Elite',  'kandarin', true),

  // ═══════════════════════════════════════════════════════════════════════════
  // MORYTANIA
  // ═══════════════════════════════════════════════════════════════════════════
  task('Defeat a Werewolf in Morytania',         'Easy',   'morytania', true),
  task('1 Araxxor Kill',                         'Hard',   'morytania', true),
  task('Assemble a Slayer Helm',                 'Hard',   'morytania', true),
  task('Create an Amulet of Blood Fury',         'Hard',   'morytania', true),
  task('Equip any Full Barrows Armour Set',      'Hard',   'morytania', true),
  task('Complete the Theatre of Blood 25 Times', 'Elite',  'morytania', true),
  task("Defeat Phosani's Nightmare",             'Elite',  'morytania', true),

  // ═══════════════════════════════════════════════════════════════════════════
  // KHARIDIAN DESERT
  // ═══════════════════════════════════════════════════════════════════════════
  task('Set a mummy ablaze',                     'Easy',   'desert', true),
  task('Cast Ice Barrage',                       'Elite',  'desert', true),
  task('Defeat Awakened Leviathan',              'Elite',  'desert', true),
  task('Equip a Dragon Chainbody in the Kharidian Desert','Elite','desert', true),
  task('Equip a Piece of Masori Armour',         'Elite',  'desert', true),
  task('Equip the Venator Ring',                 'Elite',  'desert', true),
  task("Equip Osmumten's Fang (or)",             'Master', 'desert', true),
]
