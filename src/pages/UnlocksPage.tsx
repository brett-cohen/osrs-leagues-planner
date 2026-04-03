import { Stack, Text, Title } from '@mantine/core'
import { RegionMap } from '../components/RegionMap'
import { RegionSummary } from '../components/RegionSummary'
import { RelicMenu } from '../components/RelicMenu'
import { SkillGrid } from '../components/SkillGrid'
import { LEAGUE_NAME } from '../data/regions'

interface Props {
  selectedRegions: string[]
  onToggleRegion: (id: string) => void
  selectedRelics: Record<string, string>
  onToggleRelic: (tier: number, relicId: string) => void
}

export function UnlocksPage({ selectedRegions, onToggleRegion, selectedRelics, onToggleRelic }: Props) {
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
      <RelicMenu selectedRelics={selectedRelics} onToggleRelic={onToggleRelic} />
      <hr className="divider" />
      <Stack gap="md">
        <Title order={2}>Skills</Title>
        <SkillGrid selectedRegions={selectedRegions} selectedRelics={selectedRelics} />
      </Stack>
    </Stack>
  )
}
