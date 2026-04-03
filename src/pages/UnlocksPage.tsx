import { Stack, Text, Title } from '@mantine/core'
import { RegionMap } from '../components/RegionMap'
import { RegionSummary } from '../components/RegionSummary'
import { RelicMenu } from '../components/RelicMenu'
import { LEAGUE_NAME } from '../data/regions'

interface Props {
  selectedRegions: string[]
  onToggleRegion: (id: string) => void
}

export function UnlocksPage({ selectedRegions, onToggleRegion }: Props) {
  return (
    <Stack gap="xl">
      <div>
        <Title order={1}>Leagues Planner</Title>
        <Text c="osrsGold.5">{LEAGUE_NAME}</Text>
      </div>
      <hr className="divider" />
      <Stack gap="md">
        <div>
          <Title order={2}>Regions</Title>
          <Text c="osrsGold.5" size="sm">
            Start in Varlamore · Karamja auto-unlocked · Choose up to 3 more
          </Text>
        </div>
        <div className="region-layout">
          <div className="region-layout-main">
            <RegionMap selectedIds={selectedRegions} onToggleRegion={onToggleRegion} />
          </div>
          <div className="app-sidebar">
            <RegionSummary selectedIds={selectedRegions} />
          </div>
        </div>
      </Stack>
      <hr className="divider" />
      <RelicMenu />
    </Stack>
  )
}
