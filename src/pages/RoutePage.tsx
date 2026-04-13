import { useRef, useState } from 'react'
import { useLocalStorage } from '@mantine/hooks'
import { Modal, ScrollArea, Stack, Text, TextInput, Title } from '@mantine/core'
import { IconDownload, IconFlameFilled, IconGripVertical, IconPencilPlus, IconPlaylistAdd, IconUpload, IconX } from '@tabler/icons-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { tasks, DIFFICULTY_POINTS, type Difficulty, type Task } from '../data/tasks'
import { regions } from '../data/regions'

// ─── Types ───────────────────────────────────────────────────────────────────

type RouteStep =
  | { type: 'custom'; id: string; text: string; done?: boolean }
  | { type: 'task';   id: string; taskId: string; done?: boolean }

interface RouteSlot {
  name: string
  steps: RouteStep[]
}

const MAX_ROUTES = 5
const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard', 'Elite', 'Master']

/** Lookup that supports both new IDs (region-name) and legacy IDs (name only) */
const taskById = new Map<string, Task>()
for (const t of tasks) {
  taskById.set(t.id, t)
  // Legacy ID: just the name slug without region prefix
  const legacyId = t.id.replace(/^[^-]+-/, '')
  if (!taskById.has(legacyId)) taskById.set(legacyId, t)
}

function findTask(taskId: string): Task | undefined {
  return taskById.get(taskId)
}

function makeId() {
  return Math.random().toString(36).slice(2, 9)
}

function defaultRoutes(): RouteSlot[] {
  return [{ name: 'Route 1', steps: [] }]
}

// ─── Sortable step item ─────────────────────────────────────────────────────

interface StepItemProps {
  step: RouteStep
  index: number
  onRemove: () => void
  onUpdateText: (text: string) => void
  onAddBelow: () => void
  onToggleDone: () => void
  keyboardEnabled: boolean
}

function SortableStepItem({ step, index, onRemove, onUpdateText, onAddBelow, onToggleDone, keyboardEnabled }: StepItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  if (step.type === 'task') {
    const task = findTask(step.taskId)
    if (!task) return null
    const region = regions.find(r => r.id === task.region)
    return (
      <div className={`route-step${step.done ? ' route-step--done' : ''}`} ref={setNodeRef} style={style}>
        <span className="route-step-grip" {...attributes} {...listeners}>
          <IconGripVertical size={14} />
        </span>
        <input type="checkbox" className="route-step-check" checked={!!step.done} onChange={onToggleDone} />
        <span className="route-step-num">{index + 1}</span>
        <span className="route-step-body">
          <span className="route-step-name">{task.name}</span>
          <span className="route-step-tags">
            <span className="step-tag step-tag--region">{region?.name ?? 'Global'}</span>
            <span className={`step-tag step-tag--diff step-tag--${task.difficulty.toLowerCase()}`}>
              {task.difficulty}
            </span>
            <span className="step-tag step-tag--pts">+{DIFFICULTY_POINTS[task.difficulty]}</span>
            {task.pactPoint && <span className="step-tag step-tag--pact" title="Demonic Pact point"><IconFlameFilled size={14} /></span>}
          </span>
        </span>
        <button className="route-step-remove" onClick={onRemove} aria-label="Remove step">
          <IconX size={12} />
        </button>
      </div>
    )
  }

  return (
    <div className={`route-step${step.done ? ' route-step--done' : ''}`} ref={setNodeRef} style={style}>
      <span className="route-step-grip" {...attributes} {...listeners}>
        <IconGripVertical size={14} />
      </span>
      <input type="checkbox" className="route-step-check" checked={!!step.done} onChange={onToggleDone} />
      <span className="route-step-num">{index + 1}</span>
      <input
        className="route-step-input"
        value={step.text}
        onChange={e => onUpdateText(e.target.value)}
        onKeyDown={e => { if (keyboardEnabled && e.key === 'Enter') { e.preventDefault(); onAddBelow() } }}
        placeholder="Custom step…"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
      <button className="route-step-remove" onClick={onRemove} aria-label="Remove step">
        <IconX size={12} />
      </button>
    </div>
  )
}

// ─── Task search row ─────────────────────────────────────────────────────────

interface TaskRowProps {
  task: Task
  onAdd: () => void
}

function TaskRow({ task, onAdd }: TaskRowProps) {
  const region = regions.find(r => r.id === task.region)
  return (
    <button className="task-search-row" onClick={onAdd}>
      <span className="task-search-name">{task.name}</span>
      <span className="task-search-meta">
        {task.pactPoint && <span className="step-tag step-tag--pact" title="Demonic Pact point"><IconFlameFilled size={14} /></span>}
        <span className="step-tag step-tag--region">{region?.name ?? 'Global'}</span>
        <span className={`step-tag step-tag--diff step-tag--${task.difficulty.toLowerCase()}`}>
          {task.difficulty}
        </span>
      </span>
    </button>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

interface Props {
  selectedRegions: string[]
}

export function RoutePage({ selectedRegions }: Props) {
  const [keyboardEnabled, setKeyboardEnabled] = useLocalStorage<boolean>({
    key: 'osrs-leagues-route-keyboard',
    defaultValue: true,
  })
  const [routes, setRoutes] = useLocalStorage<RouteSlot[]>({
    key: 'osrs-leagues-routes',
    defaultValue: defaultRoutes(),
  })
  const [activeIndex, setActiveIndex] = useLocalStorage<number>({
    key: 'osrs-leagues-active-route',
    defaultValue: 0,
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [diffFilter, setDiffFilter] = useState<Difficulty[]>([])
  const [regionFilter, setRegionFilter] = useState('all')
  const [editingTab, setEditingTab] = useState<number | null>(null)
  const [importModalOpen, setImportModalOpen] = useState(false)
  const [pendingImport, setPendingImport] = useState<RouteStep[] | null>(null)
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [deleteConfirmIndex, setDeleteConfirmIndex] = useState<number | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Ensure activeIndex is valid
  const safeIndex = Math.min(activeIndex, routes.length - 1)
  const currentRoute = routes[safeIndex] ?? { name: 'Route 1', steps: [] }
  const steps = currentRoute.steps

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const availableRegionIds = new Set(['varlamore', 'karamja', 'global', ...selectedRegions])

  const addedTaskIds = new Set(
    steps
      .filter((s): s is Extract<RouteStep, { type: 'task' }> => s.type === 'task')
      .map(s => s.taskId)
  )

  const searchableTasks = tasks.filter(
    t => availableRegionIds.has(t.region) && !addedTaskIds.has(t.id)
  )

  const filteredTasks = searchableTasks.filter(t => {
    const matchesSearch = search === '' || t.name.toLowerCase().includes(search.toLowerCase())
    const matchesDiff = diffFilter.length === 0 || diffFilter.includes(t.difficulty)
    const matchesRegion = regionFilter === 'all' || t.region === regionFilter
    return matchesSearch && matchesDiff && matchesRegion
  })

  const regionSelectOptions = [
    { value: 'all', label: 'All Regions' },
    ...Array.from(availableRegionIds)
      .filter(id => id !== 'global')
      .map(id => ({ value: id, label: regions.find(r => r.id === id)?.name ?? id })),
    { value: 'global', label: 'Global' },
  ]

  const taskSteps = steps.filter(
    (s): s is Extract<RouteStep, { type: 'task' }> => s.type === 'task'
  )

  const totalPoints = taskSteps.reduce((sum, s) => {
    const t = findTask(s.taskId)
    return sum + (t ? DIFFICULTY_POINTS[t.difficulty] : 0)
  }, 0)

  // ─── Route slot helpers ─────────────────────────────────────────────

  function updateSteps(fn: (prev: RouteStep[]) => RouteStep[]) {
    setRoutes(prev => prev.map((r, i) => i === safeIndex ? { ...r, steps: fn(r.steps) } : r))
  }

  function addCustomStep() {
    updateSteps(prev => [...prev, { type: 'custom', id: makeId(), text: '' }])
  }

  function addCustomStepAfter(afterIndex: number) {
    updateSteps(prev => {
      const next = [...prev]
      next.splice(afterIndex + 1, 0, { type: 'custom', id: makeId(), text: '' })
      return next
    })
  }

  function addTaskStep(taskId: string) {
    updateSteps(prev => [...prev, { type: 'task', id: makeId(), taskId }])
  }

  function removeStep(id: string) {
    updateSteps(prev => prev.filter(s => s.id !== id))
  }

  function updateCustomText(id: string, text: string) {
    updateSteps(prev => prev.map(s => s.id === id && s.type === 'custom' ? { ...s, text } : s))
  }

  function toggleDone(id: string) {
    updateSteps(prev => prev.map(s => s.id === id ? { ...s, done: !s.done } : s))
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      updateSteps(prev => {
        const oldIndex = prev.findIndex(s => s.id === active.id)
        const newIndex = prev.findIndex(s => s.id === over.id)
        return arrayMove(prev, oldIndex, newIndex)
      })
    }
  }

  function addRoute() {
    if (routes.length >= MAX_ROUTES) return
    setRoutes(prev => [...prev, { name: `Route ${prev.length + 1}`, steps: [] }])
    setActiveIndex(routes.length)
  }

  function removeRoute(index: number) {
    if (routes.length <= 1) return
    setRoutes(prev => prev.filter((_, i) => i !== index))
    if (safeIndex >= routes.length - 1) setActiveIndex(Math.max(0, routes.length - 2))
    else if (index < safeIndex) setActiveIndex(safeIndex - 1)
  }

  function renameRoute(index: number, name: string) {
    setRoutes(prev => prev.map((r, i) => i === index ? { ...r, name } : r))
  }

  function toggleDiff(d: Difficulty) {
    setDiffFilter(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])
  }

  // ─── Export / Import ────────────────────────────────────────────────

  function exportRoute(index: number) {
    const route = routes[index]
    if (!route) return
    const data = JSON.stringify(route.steps, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${route.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.json`
    a.click()
    URL.revokeObjectURL(url)
    setExportModalOpen(false)
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string)
        if (Array.isArray(parsed) && parsed.every(s => s.id && s.type)) {
          setPendingImport(parsed)
          setImportModalOpen(true)
        }
      } catch { /* ignore malformed files */ }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  function confirmImport(targetIndex: number) {
    if (!pendingImport) return
    setRoutes(prev => prev.map((r, i) => i === targetIndex ? { ...r, steps: pendingImport } : r))
    setActiveIndex(targetIndex)
    setPendingImport(null)
    setImportModalOpen(false)
  }

  return (
    <>
      <div className="route-page">
        <div className="route-header">
          <div>
            <Title order={1}>Route</Title>
            <Text c="osrsGold.5">Plan your task order</Text>
          </div>
          <div className="route-stats">
            <div className="route-stat">
              <span className="route-stat-value">{steps.length}</span>
              <span className="route-stat-label">Steps</span>
            </div>
            <div className="route-stat-divider" />
            <div className="route-stat">
              <span className="route-stat-value">{taskSteps.length}</span>
              <span className="route-stat-label">Tasks</span>
            </div>
            <div className="route-stat-divider" />
            <div className="route-stat">
              <span className="route-stat-value">{totalPoints.toLocaleString()}</span>
              <span className="route-stat-label">Points</span>
            </div>
          </div>
        </div>
        <hr className="divider" />

        {/* Export/import buttons */}
        <div className="route-toolbar">
          <div className="route-add-btns">
            <button className="route-add-btn" onClick={() => setExportModalOpen(true)} title="Export route">
              <IconDownload size={18} stroke={1.5} />
            </button>
            <button className="route-add-btn" onClick={() => fileInputRef.current?.click()} title="Import route">
              <IconUpload size={18} stroke={1.5} />
            </button>
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileSelect} hidden />
          </div>
          <label className="route-keyboard-toggle">
            <input
              type="checkbox"
              checked={keyboardEnabled}
              onChange={e => setKeyboardEnabled(e.target.checked)}
            />
            <span>Enter adds new step</span>
          </label>
        </div>

        {/* Route tabs + add step buttons */}
        <div className="route-tabs">
          {routes.map((route, i) => (
            <div key={i} className={`route-tab${i === safeIndex ? ' route-tab--active' : ''}`}>
              {editingTab === i ? (
                <input
                  className="route-tab-input"
                  value={route.name}
                  onChange={e => renameRoute(i, e.target.value)}
                  onBlur={() => setEditingTab(null)}
                  onKeyDown={e => { if (e.key === 'Enter') setEditingTab(null) }}
                  autoFocus
                />
              ) : (
                <button
                  className="route-tab-btn"
                  onClick={() => setActiveIndex(i)}
                  onDoubleClick={() => setEditingTab(i)}
                >
                  {route.name}
                </button>
              )}
              {routes.length > 1 && (
                <button
                  className="route-tab-close"
                  onClick={() => route.steps.length > 0 ? setDeleteConfirmIndex(i) : removeRoute(i)}
                  aria-label="Remove route"
                >
                  <IconX size={10} />
                </button>
              )}
            </div>
          ))}
          {routes.length < MAX_ROUTES && (
            <button className="route-tab-add" onClick={addRoute} title="Add route">+</button>
          )}
          <div className="route-add-btns route-tab-actions">
            <button className="route-add-btn" onClick={addCustomStep} title="Add custom step">
              <IconPencilPlus size={18} stroke={1.5} />
            </button>
            <button className="route-add-btn" onClick={() => setModalOpen(true)} title="Add task">
              <IconPlaylistAdd size={18} stroke={1.5} />
            </button>
          </div>
        </div>

        {/* Step list — fills remaining vertical space */}
        {steps.length === 0 ? (
          <div className="panel-inset route-empty route-step-area">
            <Text c="osrsGold.5" size="sm">
              No steps yet — add a task or a custom step above.
            </Text>
          </div>
        ) : (
          <div className="panel-inset route-step-list route-step-area">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={steps.map(s => s.id)} strategy={verticalListSortingStrategy}>
                {steps.map((step, i) => (
                  <SortableStepItem
                    key={step.id}
                    step={step}
                    index={i}
                    onRemove={() => removeStep(step.id)}
                    onUpdateText={text => updateCustomText(step.id, text)}
                    onAddBelow={() => addCustomStepAfter(i)}
                    onToggleDone={() => toggleDone(step.id)}
                    keyboardEnabled={keyboardEnabled}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        )}
      </div>

      {/* Task search modal */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Task"
        size="lg"
        classNames={{
          content: 'osrs-modal',
          header: 'osrs-modal-header',
          title: 'osrs-modal-title',
          close: 'osrs-modal-close',
        }}
      >
        <Stack gap="sm">
          <TextInput
            placeholder="Search tasks…"
            value={search}
            onChange={e => setSearch(e.currentTarget.value)}
            classNames={{ input: 'osrs-input' }}
            autoFocus
          />
          <div className="task-filter-row">
            {DIFFICULTIES.map(d => (
              <button
                key={d}
                className={`diff-btn diff-btn--${d.toLowerCase()}${diffFilter.includes(d) ? ' diff-btn--on' : ''}`}
                onClick={() => toggleDiff(d)}
              >
                {d}
              </button>
            ))}
            <select
              className="osrs-select"
              value={regionFilter}
              onChange={e => setRegionFilter(e.target.value)}
            >
              {regionSelectOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <Text c="osrsGold.5" size="xs">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} available
          </Text>
          <ScrollArea h={360} type="scroll">
            {filteredTasks.length === 0 ? (
              <Text c="osrsGold.5" size="xs" p="xs">No tasks match your filters.</Text>
            ) : (
              <div className="task-search-list">
                {filteredTasks.map(task => (
                  <TaskRow key={task.id} task={task} onAdd={() => addTaskStep(task.id)} />
                ))}
              </div>
            )}
          </ScrollArea>
        </Stack>
      </Modal>

      {/* Delete route confirmation modal */}
      <Modal
        opened={deleteConfirmIndex !== null}
        onClose={() => setDeleteConfirmIndex(null)}
        title="Delete Route"
        size="sm"
        classNames={{
          content: 'osrs-modal',
          header: 'osrs-modal-header',
          title: 'osrs-modal-title',
          close: 'osrs-modal-close',
        }}
      >
        {deleteConfirmIndex !== null && (
          <Stack gap="md">
            <Text c="white" size="sm">
              "{routes[deleteConfirmIndex]?.name}" has {routes[deleteConfirmIndex]?.steps.length} step{routes[deleteConfirmIndex]?.steps.length !== 1 ? 's' : ''}. Are you sure you want to delete it?
            </Text>
            <Text c="red.5" size="xs">This action cannot be undone.</Text>
            <div className="config-confirm-btns">
              <button
                className="config-confirm-btn config-confirm-btn--danger"
                onClick={() => { removeRoute(deleteConfirmIndex); setDeleteConfirmIndex(null) }}
              >
                Delete
              </button>
              <button className="config-confirm-btn" onClick={() => setDeleteConfirmIndex(null)}>
                Cancel
              </button>
            </div>
          </Stack>
        )}
      </Modal>

      {/* Export route picker modal */}
      <Modal
        opened={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        title="Export Route"
        size="sm"
        classNames={{
          content: 'osrs-modal',
          header: 'osrs-modal-header',
          title: 'osrs-modal-title',
          close: 'osrs-modal-close',
        }}
      >
        <Stack gap="sm">
          <Text c="white" size="sm">Choose which route to export.</Text>
          <div className="import-slot-list">
            {routes.map((route, i) => (
              <button
                key={i}
                className="import-slot-btn"
                onClick={() => exportRoute(i)}
              >
                <span className="import-slot-name">{route.name}</span>
                <span className="import-slot-info">
                  {route.steps.length} step{route.steps.length !== 1 ? 's' : ''}
                </span>
              </button>
            ))}
          </div>
        </Stack>
      </Modal>

      {/* Import target picker modal */}
      <Modal
        opened={importModalOpen}
        onClose={() => { setImportModalOpen(false); setPendingImport(null) }}
        title="Import Route"
        size="sm"
        classNames={{
          content: 'osrs-modal',
          header: 'osrs-modal-header',
          title: 'osrs-modal-title',
          close: 'osrs-modal-close',
        }}
      >
        <Stack gap="sm">
          <Text c="white" size="sm">
            Choose which route slot to import into. The existing route will be overwritten.
          </Text>
          <Text c="red.5" size="xs">
            This action cannot be undone.
          </Text>
          <div className="import-slot-list">
            {routes.map((route, i) => (
              <button
                key={i}
                className="import-slot-btn"
                onClick={() => confirmImport(i)}
              >
                <span className="import-slot-name">{route.name}</span>
                <span className="import-slot-info">
                  {route.steps.length} step{route.steps.length !== 1 ? 's' : ''}
                </span>
              </button>
            ))}
          </div>
        </Stack>
      </Modal>
    </>
  )
}
