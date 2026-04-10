import { useState } from 'react'
import { Modal, ScrollArea, Stack, Text, TextInput } from '@mantine/core'
import { equipmentSlots, weaponSlots, gearItems, type EquipmentSlot, type GearItem } from '../data/equipment'
import { regions } from '../data/regions'

const INVENTORY_SLOTS = 28
const INVENTORY_ICON = 'https://oldschool.runescape.wiki/images/Inventory.png'

export type EquipmentSelections = Record<string, string>

// ─── Gear picker modal ──────────────────────────────────────────────────────

interface PickerProps {
  slotId: string | null
  slotName: string
  availableRegionIds: Set<string>
  onPick: (itemId: string) => void
  onClear: () => void
  currentItemId: string
}

function GearPicker({ slotId, slotName, availableRegionIds, onPick, onClear, currentItemId }: PickerProps) {
  const [search, setSearch] = useState('')

  const items = gearItems.filter(g =>
    (slotId === null || g.slot === slotId) &&
    availableRegionIds.has(g.region) &&
    (search === '' || g.name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <Stack gap="sm">
      <TextInput
        placeholder={`Search ${slotName} gear…`}
        value={search}
        onChange={e => setSearch(e.currentTarget.value)}
        classNames={{ input: 'osrs-input' }}
        autoFocus
      />
      {currentItemId && (
        <button className="config-reset-btn" onClick={onClear}>Clear slot</button>
      )}
      <Text c="osrsGold.5" size="xs">{items.length} item{items.length !== 1 ? 's' : ''} available</Text>
      <ScrollArea h={300} type="scroll">
        {items.length === 0 ? (
          <Text c="osrsGold.5" size="xs" p="xs">No gear found for this slot.</Text>
        ) : (
          <div className="gear-pick-list">
            {items.map(g => {
              const region = regions.find(r => r.id === g.region)
              return (
                <button
                  key={g.id}
                  className={`gear-pick-row${g.id === currentItemId ? ' gear-pick-row--selected' : ''}`}
                  onClick={() => onPick(g.id)}
                >
                  <img src={g.iconUrl} alt={g.name} className="gear-pick-icon" />
                  <span className="gear-pick-name">{g.name}</span>
                  <span className="gear-pick-region">{region?.name ?? 'Global'}</span>
                </button>
              )
            })}
          </div>
        )}
      </ScrollArea>
    </Stack>
  )
}

// ─── Slot button ─────────────────────────────────────────────────────────────

interface SlotBtnProps {
  slot: EquipmentSlot
  selectedItem: GearItem | undefined
  onClick: () => void
}

function SlotButton({ slot, selectedItem, onClick }: SlotBtnProps) {
  return (
    <button className="equip-slot" onClick={onClick} title={slot.name}>
      <div className="equip-slot-icon-wrap">
        {selectedItem
          ? <img src={selectedItem.iconUrl} alt={selectedItem.name} className="equip-slot-icon equip-slot-icon--filled" />
          : <img src={slot.iconUrl} alt={slot.name} className="equip-slot-icon" />
        }
      </div>
      <span className={`equip-slot-label${selectedItem ? ' equip-slot-label--filled' : ''}`}>
        {selectedItem?.name ?? slot.name}
      </span>
    </button>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

interface Props {
  equipment: EquipmentSelections
  onChangeEquipment: (fn: (prev: EquipmentSelections) => EquipmentSelections) => void
  selectedRegions: string[]
}

type EditTarget = { type: 'equip'; slot: EquipmentSlot } | { type: 'inv'; index: number }

export function EquipmentLoadout({ equipment, onChangeEquipment, selectedRegions }: Props) {
  const [editing, setEditing] = useState<EditTarget | null>(null)
  const availableRegionIds = new Set(['varlamore', 'karamja', 'global', ...selectedRegions])

  const editingKey = editing
    ? editing.type === 'equip' ? editing.slot.id : `inv-${editing.index}`
    : null
  const editingName = editing
    ? editing.type === 'equip' ? editing.slot.name : `Inventory Slot ${editing.index + 1}`
    : ''
  const editingSlotFilter = editing?.type === 'equip' ? editing.slot.id : null

  function getSelectedItem(slotId: string): GearItem | undefined {
    const itemId = equipment[slotId]
    return itemId ? gearItems.find(g => g.id === itemId) : undefined
  }

  function handlePick(itemId: string) {
    if (!editingKey) return
    onChangeEquipment(prev => ({ ...prev, [editingKey]: itemId }))
    setEditing(null)
  }

  function handleClear() {
    if (!editingKey) return
    onChangeEquipment(prev => {
      const next = { ...prev }
      delete next[editingKey]
      return next
    })
    setEditing(null)
  }

  return (
    <>
      <Stack gap="md">
        <div className="equip-grid-wrap">
          <div className="equip-section">
            <Text c="osrsYellow.5" fw="bold" size="xs" mb={4}>Armour</Text>
            <div className="equip-grid">
              <div /><SlotButton slot={equipmentSlots[0]} selectedItem={getSelectedItem('head')} onClick={() => setEditing({ type: 'equip', slot: equipmentSlots[0] })} /><div />
              <SlotButton slot={equipmentSlots[1]} selectedItem={getSelectedItem('cape')} onClick={() => setEditing({ type: 'equip', slot: equipmentSlots[1] })} />
              <SlotButton slot={equipmentSlots[2]} selectedItem={getSelectedItem('neck')} onClick={() => setEditing({ type: 'equip', slot: equipmentSlots[2] })} />
              <SlotButton slot={equipmentSlots[3]} selectedItem={getSelectedItem('ammo')} onClick={() => setEditing({ type: 'equip', slot: equipmentSlots[3] })} />
              <div />
              <SlotButton slot={equipmentSlots[4]} selectedItem={getSelectedItem('body')} onClick={() => setEditing({ type: 'equip', slot: equipmentSlots[4] })} />
              <SlotButton slot={equipmentSlots[5]} selectedItem={getSelectedItem('shield')} onClick={() => setEditing({ type: 'equip', slot: equipmentSlots[5] })} />
              <div /><SlotButton slot={equipmentSlots[6]} selectedItem={getSelectedItem('legs')} onClick={() => setEditing({ type: 'equip', slot: equipmentSlots[6] })} /><div />
              <SlotButton slot={equipmentSlots[7]} selectedItem={getSelectedItem('hands')} onClick={() => setEditing({ type: 'equip', slot: equipmentSlots[7] })} />
              <SlotButton slot={equipmentSlots[8]} selectedItem={getSelectedItem('feet')} onClick={() => setEditing({ type: 'equip', slot: equipmentSlots[8] })} />
              <SlotButton slot={equipmentSlots[9]} selectedItem={getSelectedItem('ring')} onClick={() => setEditing({ type: 'equip', slot: equipmentSlots[9] })} />
            </div>
          </div>

          <div className="equip-section">
            <Text c="osrsYellow.5" fw="bold" size="xs" mb={4}>Weapons</Text>
            <div className="equip-weapons">
              {weaponSlots.map(slot => (
                <SlotButton key={slot.id} slot={slot} selectedItem={getSelectedItem(slot.id)} onClick={() => setEditing({ type: 'equip', slot })} />
              ))}
            </div>
          </div>

          <div className="equip-section">
            <Text c="osrsYellow.5" fw="bold" size="xs" mb={4}>Inventory</Text>
            <div className="equip-inventory">
              {Array.from({ length: INVENTORY_SLOTS }, (_, i) => {
                const key = `inv-${i}`
                const item = getSelectedItem(key)
                return (
                  <button
                    key={i}
                    className="equip-inv-slot"
                    onClick={() => setEditing({ type: 'inv', index: i })}
                    title={item?.name ?? `Slot ${i + 1}`}
                  >
                    {item
                      ? <img src={item.iconUrl} alt={item.name} className="equip-slot-icon equip-slot-icon--filled" />
                      : <img src={INVENTORY_ICON} alt="" className="equip-slot-icon" />
                    }
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </Stack>

      <Modal
        opened={editing !== null}
        onClose={() => setEditing(null)}
        title={editingName}
        size="md"
        classNames={{
          content: 'osrs-modal',
          header: 'osrs-modal-header',
          title: 'osrs-modal-title',
          close: 'osrs-modal-close',
        }}
      >
        {editing && editingKey && (
          <GearPicker
            slotId={editingSlotFilter}
            slotName={editingName}
            availableRegionIds={availableRegionIds}
            onPick={handlePick}
            onClear={handleClear}
            currentItemId={equipment[editingKey] ?? ''}
          />
        )}
      </Modal>
    </>
  )
}
