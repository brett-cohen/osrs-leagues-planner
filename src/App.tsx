import { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from '@mantine/hooks'
import { NavBar, type Page } from './components/NavBar'
import { CharacterSummary, type CharacterSummaryHandle } from './components/CharacterSummary'
import { UnlocksPage } from './pages/UnlocksPage'
import { RoutePage } from './pages/RoutePage'
import { ConfigPage } from './pages/ConfigPage'
import './App.css'

/** Custom skill overrides keyed by region/relic id → skill id list.
 *  Relics use separate keys for major/minor: `${id}:major` and `${id}:minor`. */
export type SkillOverrides = Record<string, string[]>

/** Equipment text entries keyed by slot id */
export type EquipmentSelections = Record<string, string>

const MAX_REGIONS = 3

function App() {
  const [page, setPage] = useState<Page>('unlocks')
  const summaryRef = useRef<CharacterSummaryHandle>(null)

  // Easter egg: type "yama" to toggle demonic mode
  const [yamaMode, setYamaMode] = useState(false)
  useEffect(() => {
    const seq = 'yama'
    let buf = ''
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      buf = (buf + e.key.toLowerCase()).slice(-seq.length)
      if (buf === seq) setYamaMode(prev => !prev)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const [selectedRegions, setSelectedRegions] = useLocalStorage<string[]>({
    key: 'osrs-leagues-selected-regions',
    defaultValue: [],
  })

  const [selectedRelics, setSelectedRelics] = useLocalStorage<Record<string, string>>({
    key: 'osrs-leagues-selected-relics',
    defaultValue: {},
  })

  const [skillOverrides, setSkillOverrides] = useLocalStorage<SkillOverrides>({
    key: 'osrs-leagues-skill-overrides',
    defaultValue: {},
  })

  const [equipment, setEquipment] = useLocalStorage<EquipmentSelections>({
    key: 'osrs-leagues-equipment',
    defaultValue: {},
  })

  function handleToggleRegion(id: string) {
    setSelectedRegions(prev => {
      if (prev.includes(id)) return prev.filter(r => r !== id)
      if (prev.length >= MAX_REGIONS) return prev
      return [...prev, id]
    })
  }

  function handleToggleRelic(tier: number, relicId: string) {
    setSelectedRelics(prev => {
      const key = String(tier)
      if (prev[key] === relicId) {
        const next = { ...prev }
        delete next[key]
        // Clear reloaded bonus when deselecting Reloaded
        if (relicId === 'reloaded') delete next['reloaded-bonus']
        return next
      }
      const next = { ...prev, [key]: relicId }
      // Clear reloaded bonus when switching tier 7 away from Reloaded
      if (tier === 7 && relicId !== 'reloaded') delete next['reloaded-bonus']
      return next
    })
  }

  function handleSetReloadedBonus(relicId: string | null) {
    setSelectedRelics(prev => {
      const next = { ...prev }
      if (relicId === null) {
        delete next['reloaded-bonus']
      } else {
        next['reloaded-bonus'] = relicId
      }
      return next
    })
  }

  return (
    <>
      <NavBar current={page} onChange={setPage} onExport={() => summaryRef.current?.openModal()} />
      <CharacterSummary
        ref={summaryRef}
        selectedRegions={selectedRegions}
        selectedRelics={selectedRelics}
        equipment={equipment}
        skillOverrides={skillOverrides}
        yamaMode={yamaMode}
      />
      <div className="app-content">
        {page === 'unlocks' && (
          <UnlocksPage
            selectedRegions={selectedRegions}
            onToggleRegion={handleToggleRegion}
            selectedRelics={selectedRelics}
            onToggleRelic={handleToggleRelic}
            onSetReloadedBonus={handleSetReloadedBonus}
            skillOverrides={skillOverrides}
            equipment={equipment}
            onChangeEquipment={setEquipment}
          />
        )}
        {page === 'route' && <RoutePage selectedRegions={selectedRegions} />}
        {page === 'config' && (
          <ConfigPage skillOverrides={skillOverrides} onChangeOverrides={setSkillOverrides} />
        )}
      </div>
      <footer className="app-footer">
        <p>
          This is a fan-made tool and is not affiliated with, endorsed by, or associated with Jagex Ltd.
          Old School RuneScape is a registered trademark of Jagex Ltd.
          All game assets, names, and related content are the property of Jagex Ltd.
          Use of these materials is done under the belief of fair use for non-commercial, community purposes.
        </p>
      </footer>
    </>
  )
}

export default App
