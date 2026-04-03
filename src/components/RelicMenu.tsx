import { HoverCard, Stack, Text, Title } from '@mantine/core'
import { relicTiers, type Relic } from '../data/relics'
import { skills } from '../data/skills'

const skillMap = Object.fromEntries(skills.map(s => [s.id, s]))

interface RelicIconProps {
  relic: Relic
  isSelected: boolean
  onToggle: () => void
}

function RelicIcon({ relic, isSelected, onToggle }: RelicIconProps) {
  return (
    <HoverCard position="bottom" withArrow={false} offset={6} withinPortal openDelay={150} closeDelay={100}>
      <HoverCard.Target>
        <button
          className={`relic-icon-btn${isSelected ? ' relic-icon-btn--selected' : ''}`}
          aria-label={relic.name}
          onClick={onToggle}
        >
          <img src={relic.iconUrl} alt={relic.name} className="relic-icon-img" />
        </button>
      </HoverCard.Target>
      <HoverCard.Dropdown className="relic-popover">
        <Stack gap="xs">
          <a href={relic.wikiUrl} target="_blank" rel="noopener noreferrer" className="popover-wiki-link">
            {relic.name}
          </a>
          <Text c="white" size="xs">
            {relic.description}
          </Text>
          {(relic.majorSkills.length > 0 || relic.minorSkills.length > 0) && (
            <hr className="divider" style={{ margin: '2px 0' }} />
          )}
          {relic.majorSkills.length > 0 && (
            <div className="skill-solve-row">
              <Text c="osrsYellow.5" size="xs">Major</Text>
              <div className="skill-solve-icons">
                {relic.majorSkills.map(id => {
                  const s = skillMap[id]
                  return s ? <img key={id} src={s.iconUrl} alt={s.name} title={s.name} className="skill-solve-icon" /> : null
                })}
              </div>
            </div>
          )}
          {relic.minorSkills.length > 0 && (
            <div className="skill-solve-row">
              <Text c="osrsGold.5" size="xs">Minor</Text>
              <div className="skill-solve-icons">
                {relic.minorSkills.map(id => {
                  const s = skillMap[id]
                  return s ? <img key={id} src={s.iconUrl} alt={s.name} title={s.name} className="skill-solve-icon" /> : null
                })}
              </div>
            </div>
          )}
        </Stack>
      </HoverCard.Dropdown>
    </HoverCard>
  )
}

interface Props {
  selectedRelics: Record<string, string>
  onToggleRelic: (tier: number, relicId: string) => void
}

export function RelicMenu({ selectedRelics, onToggleRelic }: Props) {
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
                    <RelicIcon
                      key={relic.id}
                      relic={relic}
                      isSelected={selectedRelics[String(tier)] === relic.id}
                      onToggle={() => onToggleRelic(tier, relic.id)}
                    />
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
