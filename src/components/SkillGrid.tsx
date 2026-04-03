import { IconCheck, IconStarFilled, IconX } from '@tabler/icons-react'
import { skills } from '../data/skills'
import { regions } from '../data/regions'
import { relicTiers } from '../data/relics'

type SolveStatus = 'none' | 'minor' | 'major' | 'star'

const allRelics = relicTiers.flatMap(t => t.options)

function getSolveStatus(
  skillId: string,
  activeRegionIds: Set<string>,
  activeRelicIds: Set<string>,
): SolveStatus {
  const activeRegions = regions.filter(r => activeRegionIds.has(r.id))
  const activeRelics = allRelics.filter(r => activeRelicIds.has(r.id))

  const hasRegion = activeRegions.some(r => r.skills.includes(skillId))
  const relicMajor = activeRelics.some(r => r.majorSkills.includes(skillId))
  const relicMinor = activeRelics.some(r => r.minorSkills.includes(skillId))

  // Major + any other source → gold star
  if (relicMajor && (relicMinor || hasRegion)) return 'star'
  // Major only → green check
  if (relicMajor) return 'major'
  // Minor or region → yellow check
  if (relicMinor || hasRegion) return 'minor'

  return 'none'
}

const STATUS_ICON: Record<SolveStatus, React.ReactNode> = {
  none:  <IconX size={12} stroke={2.5} color="#ff4444" />,
  minor: <IconCheck size={12} stroke={2.5} color="#ffff00" />,
  major: <IconCheck size={12} stroke={2.5} color="#00c800" />,
  star:  <IconStarFilled size={12} color="#ff981f" />,
}

interface Props {
  selectedRegions: string[]
  selectedRelics: Record<string, string>
}

export function SkillGrid({ selectedRegions, selectedRelics }: Props) {
  const activeRegionIds = new Set(['varlamore', 'karamja', ...selectedRegions])
  const activeRelicIds = new Set(Object.values(selectedRelics))

  return (
    <div className="skill-grid">
      {skills.map(skill => {
        const status = getSolveStatus(skill.id, activeRegionIds, activeRelicIds)
        return (
          <div key={skill.id} className={`skill-cell skill-cell--${status}`} title={skill.name}>
            <img src={skill.iconUrl} alt={skill.name} className="skill-cell-icon" />
            <span className="skill-cell-status">{STATUS_ICON[status]}</span>
          </div>
        )
      })}
    </div>
  )
}
