import { Stack, Text, Title } from '@mantine/core'
import { RegionMap } from '../components/RegionMap'
import { RegionSummary } from '../components/RegionSummary'
import { RelicMenu } from '../components/RelicMenu'
import { SkillGrid } from '../components/SkillGrid'
import { EquipmentLoadout } from '../components/EquipmentLoadout'
import { FarmingPatches } from '../components/FarmingPatches'
import { LEAGUE_NAME } from '../data/regions'
import type { EquipmentSelections, SkillOverrides } from '../App'

interface Props {
  selectedRegions: string[]
  onToggleRegion: (id: string) => void
  selectedRelics: Record<string, string>
  onToggleRelic: (tier: number, relicId: string) => void
  onSetReloadedBonus: (relicId: string | null) => void
  skillOverrides: SkillOverrides
  equipment: EquipmentSelections
  onChangeEquipment: (fn: (prev: EquipmentSelections) => EquipmentSelections) => void
}

export function UnlocksPage({ selectedRegions, onToggleRegion, selectedRelics, onToggleRelic, onSetReloadedBonus, skillOverrides, equipment, onChangeEquipment }: Props) {
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
      <RelicMenu selectedRelics={selectedRelics} onToggleRelic={onToggleRelic} onSetReloadedBonus={onSetReloadedBonus} />
      <hr className="divider" />
      <div className="skills-equip-layout">
        <Stack gap="md">
          <Title order={2}>Skills</Title>
          <SkillGrid selectedRegions={selectedRegions} selectedRelics={selectedRelics} skillOverrides={skillOverrides} />
        </Stack>
        <div className="skills-equip-divider" />
        <Stack gap="md" className="skills-equip-right">
          <Title order={2}>Equipment</Title>
          <EquipmentLoadout equipment={equipment} onChangeEquipment={onChangeEquipment} selectedRegions={selectedRegions} />
        </Stack>
      </div>
      <hr className="divider" />
      <FarmingPatches selectedRegions={selectedRegions} />
    </Stack>
  )
}
