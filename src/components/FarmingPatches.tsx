import { Stack, Text, Title } from '@mantine/core'
import { patchTypeOrder, regionPatches, type PatchType } from '../data/farmingPatches'

interface Props {
  selectedRegions: string[]
}

export function FarmingPatches({ selectedRegions }: Props) {
  // Always include start (Varlamore) and auto (Karamja) regions
  const activeRegionIds = ['varlamore', 'karamja', ...selectedRegions]

  // Aggregate patch counts across active regions
  const totals: Partial<Record<PatchType, number>> = {}
  for (const regionId of activeRegionIds) {
    const patches = regionPatches[regionId]
    if (!patches) continue
    for (const [type, count] of Object.entries(patches) as [PatchType, number][]) {
      totals[type] = (totals[type] ?? 0) + count
    }
  }

  const patchEntries = patchTypeOrder
    .filter(type => (totals[type] ?? 0) > 0)
    .map(type => ({ type, count: totals[type]! }))

  return (
    <Stack gap="md">
      <div>
        <Title order={2}>Farming Patches</Title>
        <Text c="osrsGold.5" size="sm">
          Patches available across your unlocked regions
        </Text>
      </div>
      <div className="patch-grid">
        {patchEntries.length === 0 ? (
          <Text c="osrsGold.5" size="sm">No patches available.</Text>
        ) : (
          patchEntries.map(({ type, count }) => (
            <div key={type} className="patch-cell">
              <span className="patch-count">{count}</span>
              <span className="patch-type">{type}</span>
            </div>
          ))
        )}
      </div>
    </Stack>
  )
}
