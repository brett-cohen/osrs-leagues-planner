import { Popover, Stack, Text, Title } from '@mantine/core'
import { relicTiers, type Relic } from '../data/relics'

function RelicIcon({ relic }: { relic: Relic }) {
  // Abbreviated label for the icon placeholder.
  // Replace with <img> pointing to a self-hosted sprite once assets are available.
  const abbr = relic.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()

  return (
    <Popover position="bottom" withArrow={false} offset={6} withinPortal>
      <Popover.Target>
        <button className="relic-icon-btn" aria-label={relic.name}>
          {abbr}
        </button>
      </Popover.Target>
      <Popover.Dropdown className="relic-popover">
        <Stack gap="xs">
          <Text c="osrsYellow.5" fw="bold" size="sm">
            {relic.name}
          </Text>
          <Text c="white" size="xs">
            {relic.description}
          </Text>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}

export function RelicMenu() {
  return (
    <Stack gap="md">
      <div>
        <Title order={2}>Relics</Title>
        <Text c="osrsGold.5" size="sm">
          8 tiers · choose one relic per tier
        </Text>
      </div>
      <div className="panel">
        <div className="relic-track">
          <div className="relic-track-line" />
          <div className="relic-track-tiers">
            {relicTiers.map(({ tier, options }) => (
              <div key={tier} className="relic-track-tier">
                <span className="relic-tier-label">Tier {tier}</span>
                <div className="relic-tier-node" />
                <div className="relic-tier-icons">
                  {options.map(relic => (
                    <RelicIcon key={relic.id} relic={relic} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Stack>
  )
}
