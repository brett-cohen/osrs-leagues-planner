import { SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { relicTiers, type Relic } from '../data/relics'

function RelicCard({ relic }: { relic: Relic }) {
  return (
    <div className="panel-inset">
      <Stack gap="xs">
        <Text c="osrsYellow.5" fw="bold" size="sm">
          {relic.name}
        </Text>
        <Text c="white" size="xs">
          {relic.description}
        </Text>
      </Stack>
    </div>
  )
}

export function RelicMenu() {
  return (
    <Stack gap="md">
      <div>
        <Title order={2}>Relics</Title>
        <Text c="osrsGold.5" size="sm">
          8 tiers · choose one relic per tier · some options not yet revealed
        </Text>
      </div>
      <Stack gap="sm">
        {relicTiers.map(({ tier, options }) => (
          <div key={tier} className="panel">
            <Stack gap="sm">
              <Text c="osrsYellow.5" fw="bold">
                Tier {tier}
              </Text>
              <hr className="divider" />
              <SimpleGrid cols={{ base: 1, sm: options.length > 1 ? 2 : 1, lg: options.length }}>
                {options.map(relic => (
                  <RelicCard key={relic.id} relic={relic} />
                ))}
              </SimpleGrid>
            </Stack>
          </div>
        ))}
      </Stack>
    </Stack>
  )
}
