import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Modal, Stack, TextInput } from '@mantine/core'
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
  yamaMode: boolean
}

export interface CharacterSummaryHandle {
  openModal: () => void
}

export const CharacterSummary = forwardRef<CharacterSummaryHandle, Props>(function CharacterSummary({ selectedRegions, selectedRelics, equipment, skillOverrides, yamaMode }, ref) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [planName, setPlanName] = useState('')
  const [exporting, setExporting] = useState(false)

  const activeRegionIds = new Set(['varlamore', 'karamja', ...selectedRegions])
  const activeRelicIds = new Set(Object.values(selectedRelics))
  const chosenRegions = regions.filter(r => selectedRegions.includes(r.id))

  function getItem(slotId: string) {
    const id = equipment[slotId]
    return id ? gearItems.find(g => g.id === id) : undefined
  }

  async function downloadPng() {
    if (!cardRef.current || exporting) return
    setExporting(true)
    try {
      const el = cardRef.current
      const rect = el.getBoundingClientRect()
      const canvas = await html2canvas(el, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: rect.width,
        height: rect.height,
        scrollX: 0,
        scrollY: 0,
        windowWidth: rect.width,
        windowHeight: rect.height,
      })
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      const filename = planName.trim()
        ? `${planName.trim().replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-leagues-plan.png`
        : 'leagues-plan.png'
      a.download = filename
      a.click()
    } catch (err) {
      console.error('PNG export failed:', err)
    }
    setExporting(false)
  }

  useImperativeHandle(ref, () => ({ openModal: () => setModalOpen(true) }))

  const subtitle = planName.trim() || 'Character Plan'

  return (
    <Modal
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
      title="Export Summary"
      size="auto"
      classNames={{
        content: 'osrs-modal',
        header: 'osrs-modal-header',
        title: 'osrs-modal-title',
        close: 'osrs-modal-close',
      }}
    >
      <Stack gap="md">
        <TextInput
          placeholder="Plan name (optional)"
          value={planName}
          onChange={e => setPlanName(e.currentTarget.value)}
          classNames={{ input: 'osrs-input' }}
        />

          <div className="summary-card" ref={cardRef}>
            <div className="summary-title">{LEAGUE_NAME}</div>
            <div className="summary-subtitle">{subtitle}</div>

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

        {/* Decorative embers or Yama easter egg */}
        {yamaMode ? <YamaOverlay /> : <EmberCanvas />}

        <div className="summary-watermark">osrs-leagues-planner</div>
          </div>

        <button
          className="summary-download-btn"
          onClick={downloadPng}
          disabled={exporting}
        >
          {exporting ? 'Exporting…' : 'Download PNG'}
        </button>
      </Stack>
    </Modal>
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

const EMBERS = [
  { x: 25, y: 180, r: 3,   color: [255,106,0], glow: 12 },
  { x: 55, y: 150, r: 2,   color: [255,170,0], glow: 9 },
  { x: 15, y: 135, r: 4,   color: [255,68,0],  glow: 16 },
  { x: 80, y: 170, r: 1.5, color: [255,204,0], glow: 7 },
  { x: 45, y: 100, r: 2.5, color: [255,85,0],  glow: 12 },
  { x: 12, y: 202, r: 5,   color: [255,51,0],  glow: 20 },
  { x: 100,y: 125, r: 1.5, color: [255,221,68], glow: 6 },
  { x: 65, y: 195, r: 3.5, color: [255,85,0],  glow: 14 },
  { x: 120,y: 160, r: 2,   color: [255,136,0], glow: 9 },
  { x: 35, y: 70,  r: 2.5, color: [255,51,0],  glow: 12 },
  { x: 145,y: 185, r: 1.5, color: [255,187,0], glow: 7 },
  { x: 90, y: 80,  r: 3,   color: [255,68,0],  glow: 14 },
  { x: 150,y: 175, r: 2,   color: [255,170,0], glow: 10 },
  { x: 55, y: 60,  r: 3.5, color: [255,51,0],  glow: 16 },
  { x: 175,y: 190, r: 1.5, color: [255,221,68], glow: 7 },
  { x: 110,y: 75,  r: 2.5, color: [255,102,0], glow: 12 },
]

const EMBER_W = 240
const EMBER_H = 220
const EMBER_SCALE = 2

function EmberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(EMBER_SCALE, 0, 0, EMBER_SCALE, 0, 0)
    ctx.clearRect(0, 0, EMBER_W, EMBER_H)

    // Flame wisps behind embers — large, overlapping to simulate off-screen fire
    const wisps = [
      { x: -10, y: 220, r: 80, color: 'rgba(255, 60, 0, 0.4)' },
      { x: 30,  y: 210, r: 70, color: 'rgba(255, 80, 0, 0.35)' },
      { x: 70,  y: 200, r: 60, color: 'rgba(255, 50, 0, 0.3)' },
      { x: -5,  y: 180, r: 65, color: 'rgba(200, 30, 0, 0.3)' },
      { x: 50,  y: 185, r: 55, color: 'rgba(255, 100, 20, 0.25)' },
      { x: 110, y: 195, r: 50, color: 'rgba(255, 60, 0, 0.2)' },
      { x: 20,  y: 160, r: 50, color: 'rgba(200, 40, 0, 0.2)' },
      { x: 140, y: 205, r: 40, color: 'rgba(255, 80, 0, 0.15)' },
      { x: 80,  y: 170, r: 45, color: 'rgba(255, 50, 0, 0.18)' },
    ]
    for (const w of wisps) {
      const g = ctx.createRadialGradient(w.x, w.y, 0, w.x, w.y, w.r)
      g.addColorStop(0, w.color)
      g.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2)
      ctx.fillStyle = g
      ctx.fill()
    }

    // Ember particles
    for (const e of EMBERS) {
      const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.glow)
      grad.addColorStop(0, `rgba(${e.color.join(',')}, 0.95)`)
      grad.addColorStop(e.r / e.glow, `rgba(${e.color.join(',')}, 0.7)`)
      grad.addColorStop(0.5, `rgba(${e.color[0]}, ${Math.floor(e.color[1]*0.6)}, 0, 0.25)`)
      grad.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(e.x, e.y, e.glow, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
    }
  }, [])

  useEffect(() => { draw() }, [draw])

  return (
    <canvas
      ref={canvasRef}
      width={EMBER_W * EMBER_SCALE}
      height={EMBER_H * EMBER_SCALE}
      className="summary-embers-canvas"
      style={{ width: EMBER_W, height: EMBER_H }}
    />
  )
}

const YAMA_W = 120
const YAMA_H = 140
const YAMA_SCALE = 1
const YAMA_IMG_URL = 'https://oldschool.runescape.wiki/images/Yama.png'

function YamaOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(YAMA_SCALE, 0, 0, YAMA_SCALE, 0, 0)
    ctx.clearRect(0, 0, YAMA_W, YAMA_H)

    // Fiery background glow
    const bgGlow = ctx.createRadialGradient(YAMA_W / 2, YAMA_H * 0.6, 3, YAMA_W / 2, YAMA_H * 0.6, 70)
    bgGlow.addColorStop(0, 'rgba(255, 60, 0, 0.45)')
    bgGlow.addColorStop(0.3, 'rgba(200, 20, 0, 0.25)')
    bgGlow.addColorStop(0.6, 'rgba(120, 10, 0, 0.12)')
    bgGlow.addColorStop(1, 'transparent')
    ctx.fillStyle = bgGlow
    ctx.fillRect(0, 0, YAMA_W, YAMA_H)

    // Flame wisps behind yama
    const flames = [
      { x: 35, y: 95,  r: 22, color: 'rgba(255, 80, 0, 0.4)' },
      { x: 75, y: 100, r: 20, color: 'rgba(255, 50, 0, 0.35)' },
      { x: 55, y: 85,  r: 28, color: 'rgba(200, 30, 0, 0.3)' },
      { x: 45, y: 115, r: 18, color: 'rgba(255, 100, 20, 0.4)' },
      { x: 68, y: 120, r: 16, color: 'rgba(255, 60, 0, 0.35)' },
    ]
    for (const f of flames) {
      const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r)
      g.addColorStop(0, f.color)
      g.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
      ctx.fillStyle = g
      ctx.fill()
    }

    // Draw embers around the face
    for (const e of EMBERS.slice(0, 10)) {
      const grad = ctx.createRadialGradient(e.x + 20, e.y + 30, 0, e.x + 20, e.y + 30, e.glow)
      grad.addColorStop(0, `rgba(${e.color.join(',')}, 0.95)`)
      grad.addColorStop(e.r / e.glow, `rgba(${e.color.join(',')}, 0.7)`)
      grad.addColorStop(0.5, `rgba(${e.color[0]}, ${Math.floor(e.color[1] * 0.6)}, 0, 0.25)`)
      grad.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(e.x + 20, e.y + 30, e.glow, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
    }

    // Load and draw Yama
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      // Draw just the upper portion (head/face) of Yama
      const cropH = img.height * 0.45
      const drawW = YAMA_W * 1.15
      const drawH = (cropH / img.width) * drawW
      const dx = (YAMA_W - drawW) / 2
      const dy = YAMA_H - drawH - 5

      // Red underglow behind face
      const faceGlow = ctx.createRadialGradient(YAMA_W / 2, dy + drawH * 0.5, 5, YAMA_W / 2, dy + drawH * 0.5, drawW * 0.6)
      faceGlow.addColorStop(0, 'rgba(255, 40, 0, 0.5)')
      faceGlow.addColorStop(0.5, 'rgba(180, 20, 0, 0.2)')
      faceGlow.addColorStop(1, 'transparent')
      ctx.fillStyle = faceGlow
      ctx.fillRect(0, 0, YAMA_W, YAMA_H)

      // Source: full width, top 45% of image
      ctx.drawImage(img, 0, 0, img.width, cropH, dx, dy, drawW, drawH)
    }
    img.src = YAMA_IMG_URL
  }, [])

  useEffect(() => { draw() }, [draw])

  return (
    <canvas
      ref={canvasRef}
      width={YAMA_W * YAMA_SCALE}
      height={YAMA_H * YAMA_SCALE}
      className="summary-yama-canvas"
      style={{ width: YAMA_W, height: YAMA_H }}
    />
  )
}
