import { useState } from 'react'
import { HoverCard, Modal, ScrollArea, Stack, Text, Title } from '@mantine/core'
import { relicTiers, type Relic } from '../data/relics'
import { skills } from '../data/skills'

const skillMap = Object.fromEntries(skills.map(s => [s.id, s]))

const RELOADED_BONUS_KEY = 'reloaded-bonus'

interface RelicIconProps {
  relic: Relic
  isSelected: boolean
  bonusRelic?: Relic
  onClick: () => void
}

function RelicIcon({ relic, isSelected, bonusRelic, onClick }: RelicIconProps) {
  return (
    <HoverCard position="bottom" withArrow={false} offset={6} withinPortal openDelay={150} closeDelay={100}>
      <HoverCard.Target>
        <button
          className={`relic-icon-btn${isSelected ? ' relic-icon-btn--selected' : ''}`}
          aria-label={relic.name}
          onClick={onClick}
        >
          {relic.iconUrl
            ? <img src={relic.iconUrl} alt={relic.name} className="relic-icon-img" />
            : <span className="relic-icon-placeholder">{relic.name === '???' ? '?' : relic.name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()}</span>
          }
          {bonusRelic && (
            <span className="relic-bonus-overlay" title={bonusRelic.name}>
              {bonusRelic.iconUrl
                ? <img src={bonusRelic.iconUrl} alt={bonusRelic.name} className="relic-bonus-overlay-img" />
                : <span className="relic-bonus-overlay-placeholder">?</span>
              }
            </span>
          )}
        </button>
      </HoverCard.Target>
      <HoverCard.Dropdown className="relic-popover">
        <Stack gap="xs">
          {relic.wikiUrl
            ? <a href={relic.wikiUrl} target="_blank" rel="noopener noreferrer" className="popover-wiki-link">{relic.name}</a>
            : <Text c="osrsYellow.5" fw="bold" size="sm">{relic.name}</Text>
          }
          <Text c="white" size="xs">
            {relic.description}
          </Text>
          {bonusRelic && (
            <>
              <hr className="divider" style={{ margin: '2px 0' }} />
              <Text c="osrsGold.5" size="xs">Bonus: {bonusRelic.name}</Text>
            </>
          )}
          {(relic.majorSkills.length > 0 || relic.minorSkills.length > 0) && (
            <hr className="divider" style={{ margin: '2px 0' }} />
          )}
          {relic.majorSkills.length > 0 && (
            <div className="skill-solve-row">
              <Text c="green.5" size="xs">Major</Text>
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
              <Text c="osrsYellow.5" size="xs">Minor</Text>
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
  onSetReloadedBonus: (relicId: string | null) => void
}

export function RelicMenu({ selectedRelics, onToggleRelic, onSetReloadedBonus }: Props) {
  const [reloadedPickerOpen, setReloadedPickerOpen] = useState(false)

  const reloadedSelected = selectedRelics['7'] === 'reloaded'
  const reloadedBonusId = selectedRelics[RELOADED_BONUS_KEY]
  // Look up the actual bonus relic across tiers 1-6
  const reloadedBonus = reloadedBonusId
    ? relicTiers
        .filter(t => t.tier < 7)
        .flatMap(t => t.options)
        .find(r => r.id === reloadedBonusId)
    : undefined

  function handleRelicClick(tier: number, relicId: string) {
    if (relicId === 'reloaded') {
      setReloadedPickerOpen(true)
      return
    }
    onToggleRelic(tier, relicId)
  }

  function handlePickBonus(bonusId: string) {
    if (!reloadedSelected) {
      onToggleRelic(7, 'reloaded')
    }
    onSetReloadedBonus(bonusId)
    setReloadedPickerOpen(false)
  }

  function handleDeselectReloaded() {
    if (reloadedSelected) onToggleRelic(7, 'reloaded')
    onSetReloadedBonus(null)
    setReloadedPickerOpen(false)
  }

  return (
    <>
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
                        bonusRelic={relic.id === 'reloaded' ? reloadedBonus : undefined}
                        onClick={() => handleRelicClick(tier, relic.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Stack>

      <Modal
        opened={reloadedPickerOpen}
        onClose={() => setReloadedPickerOpen(false)}
        title="Reloaded — Choose a bonus relic"
        size="md"
        classNames={{
          content: 'osrs-modal',
          header: 'osrs-modal-header',
          title: 'osrs-modal-title',
          close: 'osrs-modal-close',
        }}
      >
        <Stack gap="sm">
          <Text c="osrsGold.5" size="xs">
            Select an additional relic from any previously available tier.
          </Text>
          <ScrollArea h={420} type="scroll">
            <Stack gap="sm">
              {relicTiers.filter(t => t.tier < 7).map(({ tier, options }) => (
                <div key={tier}>
                  <Text c="osrsYellow.5" fw="bold" size="xs" mb={4}>Tier {tier}</Text>
                  <div className="reloaded-pick-row">
                    {options.filter(r => r.name !== '???').map(relic => {
                      const isSelectedBonus = reloadedBonusId === relic.id
                      const alreadyPicked = selectedRelics[String(tier)] === relic.id
                      return (
                        <button
                          key={relic.id}
                          className={`reloaded-pick-btn${isSelectedBonus ? ' reloaded-pick-btn--selected' : ''}${alreadyPicked ? ' reloaded-pick-btn--disabled' : ''}`}
                          onClick={() => !alreadyPicked && handlePickBonus(relic.id)}
                          disabled={alreadyPicked}
                          title={alreadyPicked ? `${relic.name} (already selected)` : relic.name}
                        >
                          {relic.iconUrl
                            ? <img src={relic.iconUrl} alt={relic.name} className="reloaded-pick-img" />
                            : <span className="reloaded-pick-placeholder">{relic.name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()}</span>
                          }
                          <span className="reloaded-pick-name">{relic.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </Stack>
          </ScrollArea>
          {reloadedSelected && (
            <button className="config-reset-btn" onClick={handleDeselectReloaded}>
              Deselect Reloaded
            </button>
          )}
        </Stack>
      </Modal>
    </>
  )
}
