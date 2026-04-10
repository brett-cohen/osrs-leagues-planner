import { useRef, useState } from 'react'
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
      return { ...prev, [key]: relicId }
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
    </>
  )
}

export default App
