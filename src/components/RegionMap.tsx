import { HoverCard, Stack, Text } from '@mantine/core'
import { MAP_IMAGE_URL, regions, type Region, type RegionStatus } from '../data/regions'
import { skills } from '../data/skills'

const skillMap = Object.fromEntries(skills.map(s => [s.id, s]))

// Set to true to show all hotspot boxes and enable click-to-log coordinates.
const DEBUG_COORDS = false

const STATUS_LABEL: Record<RegionStatus, string> = {
  start:      'Starting Region',
  auto:       'Auto-Unlocked',
  unlockable: 'Unlockable',
}

const STATUS_COLOR: Record<RegionStatus, string> = {
  start:      'osrsYellow.5',
  auto:       'green.4',
  unlockable: 'osrsGold.5',
}

interface RegionMapProps {
  selectedIds: string[]
  onToggleRegion: (id: string) => void
}

interface RegionMarkerProps {
  region: Region
  isSelected: boolean
  onToggle: () => void
}

function RegionMarker({ region, isSelected, onToggle }: RegionMarkerProps) {
  const isSelectable = region.status === 'unlockable'

  const markerClass = [
    'region-marker',
    `region-marker--${region.status}`,
    isSelected ? 'region-marker--selected' : '',
    DEBUG_COORDS ? 'region-marker--debug' : '',
  ].filter(Boolean).join(' ')

  return (
    <div
      className="region-marker-anchor"
      style={{ left: `${region.mapX}%`, top: `${region.mapY}%` }}
    >
      <HoverCard position="top" withArrow={false} offset={4} withinPortal openDelay={150} closeDelay={100}>
        <HoverCard.Target>
          <button
            className={markerClass}
            aria-label={region.name}
            onClick={isSelectable ? onToggle : undefined}
            style={isSelectable ? undefined : { cursor: 'default' }}
          />
        </HoverCard.Target>
        <HoverCard.Dropdown className="relic-popover">
          <Stack gap="xs">
            <a href={region.wikiUrl} target="_blank" rel="noopener noreferrer" className="popover-wiki-link">
              {region.name}
            </a>
            <Text c={STATUS_COLOR[region.status]} size="xs">
              {STATUS_LABEL[region.status]}
            </Text>
            <hr className="divider" style={{ margin: '2px 0' }} />
            {region.highlights.map(h => (
              <Text key={h} c="white" size="xs">· {h}</Text>
            ))}
            {(region.majorSkills.length > 0 || region.minorSkills.length > 0) && (
              <hr className="divider" style={{ margin: '2px 0' }} />
            )}
            {region.majorSkills.length > 0 && (
              <div className="skill-solve-row">
                <Text c="osrsYellow.5" size="xs">Major</Text>
                <div className="skill-solve-icons">
                  {region.majorSkills.map(id => {
                    const s = skillMap[id]
                    return s ? <img key={id} src={s.iconUrl} alt={s.name} title={s.name} className="skill-solve-icon" /> : null
                  })}
                </div>
              </div>
            )}
            {region.minorSkills.length > 0 && (
              <div className="skill-solve-row">
                <Text c="osrsGold.5" size="xs">Minor</Text>
                <div className="skill-solve-icons">
                  {region.minorSkills.map(id => {
                    const s = skillMap[id]
                    return s ? <img key={id} src={s.iconUrl} alt={s.name} title={s.name} className="skill-solve-icon" /> : null
                  })}
                </div>
              </div>
            )}
          </Stack>
        </HoverCard.Dropdown>
      </HoverCard>
    </div>
  )
}

function handleMapClick(e: React.MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1)
  const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1)
  console.log(`mapX: ${x}, mapY: ${y}`)
}

export function RegionMap({ selectedIds, onToggleRegion }: RegionMapProps) {
  return (
    <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
      <div
        className="region-map"
        onClick={DEBUG_COORDS ? handleMapClick : undefined}
        style={DEBUG_COORDS ? { cursor: 'crosshair' } : undefined}
      >
        <img
          src={MAP_IMAGE_URL}
          alt="Gielinor — Leagues VI regions"
          className="region-map-img"
        />
        {regions.map(region => (
          <RegionMarker
            key={region.id}
            region={region}
            isSelected={selectedIds.includes(region.id)}
            onToggle={() => onToggleRegion(region.id)}
          />
        ))}
      </div>
    </div>
  )
}
