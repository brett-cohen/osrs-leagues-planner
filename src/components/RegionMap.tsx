import { SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { regions, type Region, type RegionStatus } from '../data/regions'

const STATUS_LABEL: Record<RegionStatus, string> = {
  start:      'Starting Region',
  auto:       'Auto-Unlocked',
  unlockable: 'Unlockable',
}

const STATUS_COLOR: Record<RegionStatus, string> = {
  start:      'osrsYellow.5',
  auto:       'green.5',
  unlockable: 'osrsGold.5',
}

function RegionCard({ region }: { region: Region }) {
  return (
    <div className="panel">
      <Stack gap="xs">
        <Text c={STATUS_COLOR[region.status]} size="xs">
          {STATUS_LABEL[region.status]}
        </Text>
        <Title order={4} c="osrsYellow.5">
          {region.name}
        </Title>
        <Stack gap={2}>
          {region.highlights.map(h => (
            <Text key={h} c="white" size="xs">
              · {h}
            </Text>
          ))}
        </Stack>
      </Stack>
    </div>
  )
}

export function RegionMap() {
  return (
    <Stack gap="md">
      <div>
        <Title order={2}>Regions</Title>
        <Text c="osrsGold.5" size="sm">
          Start in Varlamore · Karamja auto-unlocked · Choose up to 3 more
        </Text>
      </div>
      <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5 }}>
        {regions.map(region => (
          <RegionCard key={region.id} region={region} />
        ))}
      </SimpleGrid>
    </Stack>
  )
}
