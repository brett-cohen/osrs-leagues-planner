import { IconCheck, IconWorld, IconStarFilled, IconX } from '@tabler/icons-react'
import { skills } from '../data/skills'
import { regions } from '../data/regions'
import { relicTiers } from '../data/relics'
import type { SkillOverrides } from '../App'

type SolveStatus = 'none' | 'region' | 'minor' | 'major' | 'star'

const allRelics = relicTiers.flatMap(t => t.options)

function getSolveStatus(
  skillId: string,
  activeRegionIds: Set<string>,
  activeRelicIds: Set<string>,
  overrides: SkillOverrides,
): SolveStatus {
  const activeRegions = regions.filter(r => activeRegionIds.has(r.id))
  const activeRelics = allRelics.filter(r => activeRelicIds.has(r.id))

  const hasRegion = activeRegions.some(r => {
    const sk = overrides[r.id] ?? r.skills
    return sk.includes(skillId)
  })
  const relicMajor = activeRelics.some(r => {
    const sk = overrides[`${r.id}:major`] ?? r.majorSkills
    return sk.includes(skillId)
  })
  const relicMinor = activeRelics.some(r => {
    const sk = overrides[`${r.id}:minor`] ?? r.minorSkills
    return sk.includes(skillId)
  })

  // Major + any other source → gold star
  if (relicMajor && (relicMinor || hasRegion)) return 'star'
  // Major only → green check
  if (relicMajor) return 'major'
  // Minor relic (with or without region) → yellow check
  if (relicMinor) return 'minor'
  // Region only → map pin
  if (hasRegion) return 'region'

  return 'none'
}

const STATUS_ICON: Record<SolveStatus, React.ReactNode> = {
  none:   <IconX size={12} stroke={2.5} color="#ff4444" />,
  region: <IconWorld size={12} stroke={2.5} color="#ffff00" />,
  minor:  <IconCheck size={12} stroke={2.5} color="#ffff00" />,
  major:  <IconCheck size={12} stroke={2.5} color="#00c800" />,
  star:   <IconStarFilled size={12} color="#ff981f" />,
}

const NO_STATUS_SKILLS = new Set(['attack', 'strength', 'defence', 'hitpoints', 'ranged'])

interface Props {
  selectedRegions: string[]
  selectedRelics: Record<string, string>
  skillOverrides: SkillOverrides
}

export function SkillGrid({ selectedRegions, selectedRelics, skillOverrides }: Props) {
  const activeRegionIds = new Set(['varlamore', 'karamja', ...selectedRegions])
  const activeRelicIds = new Set(Object.values(selectedRelics))

  return (
    <div className="skill-grid">
      {skills.map(skill => {
        const status = getSolveStatus(skill.id, activeRegionIds, activeRelicIds, skillOverrides)
        const showStatus = !NO_STATUS_SKILLS.has(skill.id)
        return (
          <div key={skill.id} className={`skill-cell skill-cell--${status}`} title={skill.name}>
            <img src={skill.iconUrl} alt={skill.name} className="skill-cell-icon" />
            {showStatus && <span className="skill-cell-status">{STATUS_ICON[status]}</span>}
          </div>
        )
      })}
    </div>
  )
}
