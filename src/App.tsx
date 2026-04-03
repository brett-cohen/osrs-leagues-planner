import { useState } from 'react'
import { useLocalStorage } from '@mantine/hooks'
import { NavBar, type Page } from './components/NavBar'
import { UnlocksPage } from './pages/UnlocksPage'
import { RoutePage } from './pages/RoutePage'
import { ConfigPage } from './pages/ConfigPage'
import './App.css'

const MAX_REGIONS = 3

function App() {
  const [page, setPage] = useState<Page>('unlocks')

  const [selectedRegions, setSelectedRegions] = useLocalStorage<string[]>({
    key: 'osrs-leagues-selected-regions',
    defaultValue: [],
  })

  function handleToggleRegion(id: string) {
    setSelectedRegions(prev => {
      if (prev.includes(id)) return prev.filter(r => r !== id)
      if (prev.length >= MAX_REGIONS) return prev
      return [...prev, id]
    })
  }

  return (
    <>
      <NavBar current={page} onChange={setPage} />
      <div className="app-content">
        {page === 'unlocks' && (
          <UnlocksPage selectedRegions={selectedRegions} onToggleRegion={handleToggleRegion} />
        )}
        {page === 'route' && <RoutePage />}
        {page === 'config' && <ConfigPage />}
      </div>
    </>
  )
}

export default App
