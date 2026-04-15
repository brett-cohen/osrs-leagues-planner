const fs = require('fs')
const wikiKeys = new Set(fs.readFileSync('/tmp/wiki_keys.txt', 'utf-8').trim().split('\n'))
const content = fs.readFileSync('src/data/tasks.ts', 'utf-8')
const lines = content.split('\n')

const regex = /task\(\s*(['"])((?:\\\1|(?!\1).)*)\1\s*,\s*'(Easy|Medium|Hard|Elite|Master)'\s*,\s*'(\w+)'/

const extras = []
lines.forEach((line, i) => {
  const m = line.match(regex)
  if (!m) return
  const name = m[2].replace(/\\'/g, "'")
  const diff = m[3].toLowerCase()
  const region = m[4]
  const norm = name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
  const key = region + '|' + diff + '|' + norm
  if (!wikiKeys.has(key)) {
    extras.push({ lineNum: i + 1, line, name, diff, region, key })
  }
})

console.log(`Found ${extras.length} extras:`)
for (const e of extras) {
  console.log(`  Line ${e.lineNum}: [${e.region}|${e.diff}] ${e.name}`)
}
fs.writeFileSync('_extras.json', JSON.stringify(extras.map(e => ({ lineNum: e.lineNum, line: e.line })), null, 2))
