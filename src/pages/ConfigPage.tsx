import { useState } from 'react'
import { Modal, Stack, Text, Title } from '@mantine/core'
import { regions } from '../data/regions'
import { relicTiers } from '../data/relics'
import { skills } from '../data/skills'
import type { SkillOverrides } from '../App'

// ─── Skill toggle grid inside modal ─────────────────────────────────────────

interface SkillToggleProps {
  activeSkills: string[]
  onToggle: (skillId: string) => void
}

function SkillToggleGrid({ activeSkills, onToggle }: SkillToggleProps) {
  return (
    <div className="config-skill-grid">
      {skills.map(skill => {
        const isOn = activeSkills.includes(skill.id)
        return (
          <button
            key={skill.id}
            className={`config-skill-btn${isOn ? ' config-skill-btn--on' : ''}`}
            onClick={() => onToggle(skill.id)}
            title={skill.name}
          >
            <img src={skill.iconUrl} alt={skill.name} className="config-skill-img" />
            <span className="config-skill-label">{skill.name}</span>
          </button>
        )
      })}
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

interface Props {
  skillOverrides: SkillOverrides
  onChangeOverrides: (fn: (prev: SkillOverrides) => SkillOverrides) => void
}

type EditTarget =
  | { type: 'region'; id: string; name: string; defaultSkills: string[]; overrideKey: string }
  | { type: 'relic-major'; id: string; name: string; defaultSkills: string[]; overrideKey: string }
  | { type: 'relic-minor'; id: string; name: string; defaultSkills: string[]; overrideKey: string }

export function ConfigPage({ skillOverrides, onChangeOverrides }: Props) {
  const [editing, setEditing] = useState<EditTarget | null>(null)

  const currentSkills = editing
    ? skillOverrides[editing.overrideKey] ?? editing.defaultSkills
    : []

  function handleToggleSkill(skillId: string) {
    if (!editing) return
    const key = editing.overrideKey
    onChangeOverrides(prev => {
      const current = prev[key] ?? editing.defaultSkills
      const next = current.includes(skillId)
        ? current.filter(s => s !== skillId)
        : [...current, skillId]
      return { ...prev, [key]: next }
    })
  }

  function handleReset() {
    if (!editing) return
    onChangeOverrides(prev => {
      const next = { ...prev }
      delete next[editing.overrideKey]
      return next
    })
  }

  const modalTitle = editing
    ? editing.type === 'region'
      ? `${editing.name} — Skills`
      : editing.type === 'relic-major'
        ? `${editing.name} — Major Skills`
        : `${editing.name} — Minor Skills`
    : ''

  return (
    <>
      <Stack gap="xl">
        <div>
          <Title order={1}>Config</Title>
          <Text c="osrsGold.5">Customize skill tags for regions and relics</Text>
        </div>
        <hr className="divider" />

        <Stack gap="md">
          <Title order={2}>Regions</Title>
          <div className="config-item-grid">
            {regions.map(region => {
              const hasOverride = editing?.overrideKey === region.id || skillOverrides[region.id] !== undefined
              return (
                <button
                  key={region.id}
                  className={`config-item-btn${hasOverride ? ' config-item-btn--custom' : ''}`}
                  onClick={() => setEditing({
                    type: 'region',
                    id: region.id,
                    name: region.name,
                    defaultSkills: region.skills,
                    overrideKey: region.id,
                  })}
                >
                  <img src={region.iconUrl} alt={region.name} className="config-item-icon" />
                  <span className="config-item-name">{region.name}</span>
                  <span className="config-item-count">
                    {(skillOverrides[region.id] ?? region.skills).length} skills
                  </span>
                </button>
              )
            })}
          </div>
        </Stack>

        <hr className="divider" />

        <Stack gap="md">
          <Title order={2}>Relics</Title>
          {relicTiers.map(({ tier, options }) => (
            <div key={tier}>
              <Text c="osrsGold.5" size="sm" mb={4}>Tier {tier}</Text>
              <div className="config-item-grid">
                {options.filter(r => r.name !== '???').map(relic => {
                  const majorKey = `${relic.id}:major`
                  const minorKey = `${relic.id}:minor`
                  const hasMajorOverride = skillOverrides[majorKey] !== undefined
                  const hasMinorOverride = skillOverrides[minorKey] !== undefined
                  return (
                    <div key={relic.id} className="config-relic-group">
                      <div className="config-relic-header">
                        {relic.iconUrl
                          ? <img src={relic.iconUrl} alt={relic.name} className="config-item-icon config-item-icon--relic" />
                          : <span className="config-relic-placeholder">{relic.name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()}</span>
                        }
                        <span className="config-item-name">{relic.name}</span>
                      </div>
                      <div className="config-relic-btns">
                        <button
                          className={`config-tag-btn${hasMajorOverride ? ' config-item-btn--custom' : ''}`}
                          onClick={() => setEditing({
                            type: 'relic-major',
                            id: relic.id,
                            name: relic.name,
                            defaultSkills: relic.majorSkills,
                            overrideKey: majorKey,
                          })}
                        >
                          Major ({(skillOverrides[majorKey] ?? relic.majorSkills).length})
                        </button>
                        <button
                          className={`config-tag-btn${hasMinorOverride ? ' config-item-btn--custom' : ''}`}
                          onClick={() => setEditing({
                            type: 'relic-minor',
                            id: relic.id,
                            name: relic.name,
                            defaultSkills: relic.minorSkills,
                            overrideKey: minorKey,
                          })}
                        >
                          Minor ({(skillOverrides[minorKey] ?? relic.minorSkills).length})
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </Stack>
      </Stack>

      <Modal
        opened={editing !== null}
        onClose={() => setEditing(null)}
        title={modalTitle}
        size="md"
        classNames={{
          content: 'osrs-modal',
          header: 'osrs-modal-header',
          title: 'osrs-modal-title',
          close: 'osrs-modal-close',
        }}
      >
        {editing && (
          <Stack gap="sm">
            <Text c="osrsGold.5" size="xs">
              Toggle skills on or off. {currentSkills.length} selected.
            </Text>
            <SkillToggleGrid
              activeSkills={currentSkills}
              onToggle={handleToggleSkill}
            />
            {skillOverrides[editing.overrideKey] !== undefined && (
              <button className="config-reset-btn" onClick={handleReset}>
                Reset to defaults
              </button>
            )}
          </Stack>
        )}
      </Modal>
    </>
  )
}
