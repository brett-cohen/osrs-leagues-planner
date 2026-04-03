import { Stack, Text } from '@mantine/core'
import { regions } from '../data/regions'

const MAX_UNLOCKABLE = 3

interface Props {
  selectedIds: string[]
}

export function RegionSummary({ selectedIds }: Props) {
  const remaining = MAX_UNLOCKABLE - selectedIds.length
  const selected = selectedIds.map(id => regions.find(r => r.id === id)).filter(Boolean) as typeof regions

  return (
    <div className="panel">
      <Stack gap="sm">
        <Text c="osrsYellow.5" fw="bold" size="sm">
          {remaining === 0
            ? 'All regions chosen'
            : `${remaining} region${remaining !== 1 ? 's' : ''} left to pick`}
        </Text>
        <hr className="divider" style={{ margin: '2px 0' }} />
        {selected.length === 0 ? (
          <Text c="osrsGold.5" size="xs">
            Click a region on the map to select it
          </Text>
        ) : (
          <Stack gap="xs">
            {selected.map(region => (
              <div key={region.id} className="region-summary-row">
                <img
                  src={region.iconUrl}
                  alt={region.name}
                  className="region-summary-icon"
                />
                <Text c="white" size="xs">{region.name}</Text>
              </div>
            ))}
          </Stack>
        )}
      </Stack>
    </div>
  )
}
