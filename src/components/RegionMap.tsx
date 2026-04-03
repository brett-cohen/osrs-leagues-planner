import { Popover, Stack, Text, Title } from '@mantine/core'
import { MAP_IMAGE_URL, regions, type Region, type RegionStatus } from '../data/regions'

const STATUS_LABEL: Record<RegionStatus, string> = {
  start:      'Starting Region',
  auto:       'Auto-Unlocked',
  unlockable: 'Unlockable',
}

function RegionMarker({ region }: { region: Region }) {
  return (
    <div
      className={`region-marker-anchor`}
      style={{ left: `${region.mapX}%`, top: `${region.mapY}%` }}
    >
      <Popover position="top" withArrow={false} offset={6} withinPortal>
        <Popover.Target>
          <button
            className={`region-marker region-marker--${region.status}`}
            aria-label={region.name}
          >
            {region.name}
          </button>
        </Popover.Target>
        <Popover.Dropdown className="relic-popover">
          <Stack gap="xs">
            <Text c="osrsYellow.5" fw="bold" size="sm">
              {region.name}
            </Text>
            <Text c="osrsGold.5" size="xs">
              {STATUS_LABEL[region.status]}
            </Text>
            <hr className="divider" style={{ margin: '2px 0' }} />
            {region.highlights.map(h => (
              <Text key={h} c="white" size="xs">· {h}</Text>
            ))}
          </Stack>
        </Popover.Dropdown>
      </Popover>
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
      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="region-map">
          <img
            src={MAP_IMAGE_URL}
            alt="Gielinor — Leagues VI regions"
            className="region-map-img"
          />
          {regions.map(region => (
            <RegionMarker key={region.id} region={region} />
          ))}
        </div>
      </div>
    </Stack>
  )
}
