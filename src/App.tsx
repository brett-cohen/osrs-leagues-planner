import { Stack, Text, Title } from '@mantine/core'
import { RegionMap } from './components/RegionMap'
import { RelicMenu } from './components/RelicMenu'
import { LEAGUE_NAME } from './data/regions'
import './App.css'

function App() {
  return (
    <Stack gap="xl">
      <div>
        <Title order={1}>Leagues Planner</Title>
        <Text c="osrsGold.5">{LEAGUE_NAME}</Text>
      </div>
      <hr className="divider" />
      <RegionMap />
      <hr className="divider" />
      <RelicMenu />
    </Stack>
  )
}

export default App
