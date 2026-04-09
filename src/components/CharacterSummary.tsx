import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { IconCheck, IconWorld, IconStarFilled, IconX } from '@tabler/icons-react'
import { regions } from '../data/regions'
import { relicTiers } from '../data/relics'
import { gearItems, equipmentSlots, weaponSlots } from '../data/equipment'
import { skills } from '../data/skills'
import { LEAGUE_NAME } from '../data/regions'
import type { EquipmentSelections, SkillOverrides } from '../App'

// ─── Skill solve (duplicated from SkillGrid to keep this self-contained) ────

type SolveStatus = 'none' | 'region' | 'minor' | 'major' | 'star'

const NO_STATUS_SKILLS = new Set(['attack', 'strength', 'defence', 'hitpoints', 'ranged'])

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
  if (relicMajor && (relicMinor || hasRegion)) return 'star'
  if (relicMajor) return 'major'
  if (relicMinor) return 'minor'
  if (hasRegion) return 'region'
  return 'none'
}

const STATUS_ICON: Record<SolveStatus, React.ReactNode> = {
  none:   <IconX size={10} stroke={2.5} color="#ff4444" />,
  region: <IconWorld size={10} stroke={2.5} color="#ffff00" />,
  minor:  <IconCheck size={10} stroke={2.5} color="#ffff00" />,
  major:  <IconCheck size={10} stroke={2.5} color="#00c800" />,
  star:   <IconStarFilled size={10} color="#ff981f" />,
}

// ─── Component ───────────────────────────────────────────────────────────────

interface Props {
  selectedRegions: string[]
  selectedRelics: Record<string, string>
  equipment: EquipmentSelections
  skillOverrides: SkillOverrides
}

export interface CharacterSummaryHandle {
  exportPng: () => Promise<void>
  exporting: boolean
}

export const CharacterSummary = forwardRef<CharacterSummaryHandle, Props>(function CharacterSummary({ selectedRegions, selectedRelics, equipment, skillOverrides }, ref) {
  const cardRef = useRef<HTMLDivElement>(null)

  const activeRegionIds = new Set(['varlamore', 'karamja', ...selectedRegions])
  const activeRelicIds = new Set(Object.values(selectedRelics))
  // Only show user-selected regions (exclude start/auto)
  const chosenRegions = regions.filter(r => selectedRegions.includes(r.id))

  function getItem(slotId: string) {
    const id = equipment[slotId]
    return id ? gearItems.find(g => g.id === id) : undefined
  }

  const [exporting, setExporting] = useState(false)

  async function exportPng() {
    if (!cardRef.current || exporting) return
    setExporting(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#000',
        useCORS: true,
        allowTaint: true,
        logging: false,
      })
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.download = 'leagues-character.png'
      a.click()
    } catch (err) {
      console.error('PNG export failed:', err)
    }
    setExporting(false)
  }

  useImperativeHandle(ref, () => ({ exportPng, exporting }))

  return (
    <div className="summary-card summary-card--offscreen" ref={cardRef}>
        {/* Header */}
        <div className="summary-title">{LEAGUE_NAME}</div>
        <div className="summary-subtitle">Character Plan</div>

        {/* Relics — horizontal tier row */}
        <div className="summary-relic-row">
          {relicTiers.map(t => {
            const relicId = selectedRelics[String(t.tier)]
            const relic = relicId ? t.options.find(r => r.id === relicId) : undefined
            // For tier 7 (Reloaded), look up the bonus relic
            const bonusRelicId = relic?.id === 'reloaded' ? selectedRelics['reloaded-bonus'] : undefined
            const bonusRelic = bonusRelicId
              ? relicTiers.flatMap(tt => tt.options).find(r => r.id === bonusRelicId)
              : undefined
            return (
              <div key={t.tier} className="summary-relic-col">
                <span className="summary-relic-tier">{t.tier}</span>
                {relic ? (
                  <>
                    <div className="summary-relic-icon-wrap">
                      {relic.iconUrl
                        ? <img src={relic.iconUrl} alt={relic.name} className="summary-relic-icon" />
                        : <span className="summary-relic-placeholder">{relic.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}</span>
                      }
                      {bonusRelic && (
                        <span className="summary-relic-bonus">
                          {bonusRelic.iconUrl
                            ? <img src={bonusRelic.iconUrl} alt={bonusRelic.name} className="summary-relic-bonus-img" />
                            : <span className="summary-relic-bonus-placeholder">?</span>
                          }
                        </span>
                      )}
                    </div>
                    <span className="summary-relic-name">{bonusRelic ? `${relic.name} + ${bonusRelic.name}` : relic.name}</span>
                  </>
                ) : (
                  <span className="summary-relic-empty">—</span>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom: regions | equipment | skills */}
        <div className="summary-bottom">
          {/* Regions — vertical stack */}
          <div className="summary-bottom-col">
            <div className="summary-section-label">Regions</div>
            <div className="summary-regions">
              {chosenRegions.map(r => (
                <div key={r.id} className="summary-region-row">
                  <img src={r.iconUrl} alt={r.name} className="summary-region-icon" />
                  <span className="summary-region-name">{r.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment — grid matching the selector layout */}
          <div className="summary-bottom-col summary-bottom-col--equip">
            <div className="summary-section-label">Equipment</div>
            <div className="summary-equip-grid">
              {/* Row 1: head */}
              <div /><EquipSlot item={getItem('head')} fallback={equipmentSlots[0]} /><div />
              {/* Row 2: cape, neck, ammo */}
              <EquipSlot item={getItem('cape')} fallback={equipmentSlots[1]} />
              <EquipSlot item={getItem('neck')} fallback={equipmentSlots[2]} />
              <EquipSlot item={getItem('ammo')} fallback={equipmentSlots[3]} />
              {/* Row 3: _, body, shield */}
              <div />
              <EquipSlot item={getItem('body')} fallback={equipmentSlots[4]} />
              <EquipSlot item={getItem('shield')} fallback={equipmentSlots[5]} />
              {/* Row 4: legs */}
              <div /><EquipSlot item={getItem('legs')} fallback={equipmentSlots[6]} /><div />
              {/* Row 5: hands, feet, ring */}
              <EquipSlot item={getItem('hands')} fallback={equipmentSlots[7]} />
              <EquipSlot item={getItem('feet')} fallback={equipmentSlots[8]} />
              <EquipSlot item={getItem('ring')} fallback={equipmentSlots[9]} />
            </div>
            {/* Weapons row */}
            <div className="summary-weapons-row">
              {weaponSlots.map(slot => (
                <EquipSlot key={slot.id} item={getItem(slot.id)} fallback={slot} />
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="summary-bottom-col">
            <div className="summary-section-label">Skills</div>
            <div className="summary-skill-grid">
              {skills.map(skill => {
                const status = getSolveStatus(skill.id, activeRegionIds, activeRelicIds, skillOverrides)
                const showStatus = !NO_STATUS_SKILLS.has(skill.id)
                return (
                  <div key={skill.id} className="summary-skill-cell">
                    <img src={skill.iconUrl} alt={skill.name} className="summary-skill-icon" />
                    {showStatus && <span className="summary-skill-status">{STATUS_ICON[status]}</span>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="summary-watermark">osrs-leagues-planner</div>
      </div>
  )
})

function EquipSlot({ item, fallback }: { item: ReturnType<typeof gearItems.find>; fallback: { iconUrl: string; name: string } }) {
  return (
    <div className="summary-equip-cell" title={item?.name ?? fallback.name}>
      <img
        src={item?.iconUrl ?? fallback.iconUrl}
        alt={item?.name ?? fallback.name}
        className={`summary-equip-cell-icon${item ? '' : ' summary-equip-cell-icon--empty'}`}
      />
    </div>
  )
}
