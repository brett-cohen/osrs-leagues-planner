import { useState } from 'react'
import { useLocalStorage } from '@mantine/hooks'
import { Modal, ScrollArea, Stack, Text, TextInput, Title } from '@mantine/core'
import { IconPencilPlus, IconPlaylistAdd, IconX } from '@tabler/icons-react'
import { tasks, DIFFICULTY_POINTS, type Difficulty, type Task } from '../data/tasks'
import { regions } from '../data/regions'

// ─── Types ───────────────────────────────────────────────────────────────────

type RouteStep =
  | { type: 'custom'; id: string; text: string }
  | { type: 'task';   id: string; taskId: string }

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard', 'Elite', 'Master']

function makeId() {
  return Math.random().toString(36).slice(2, 9)
}

// ─── Step item ───────────────────────────────────────────────────────────────

interface StepItemProps {
  step: RouteStep
  index: number
  onRemove: () => void
  onUpdateText: (text: string) => void
}

function RouteStepItem({ step, index, onRemove, onUpdateText }: StepItemProps) {
  if (step.type === 'task') {
    const task = tasks.find(t => t.id === step.taskId)
    if (!task) return null
    const region = regions.find(r => r.id === task.region)
    return (
      <div className="route-step">
        <span className="route-step-num">{index + 1}</span>
        <span className="route-step-body">
          <span className="route-step-name">{task.name}</span>
          <span className="route-step-tags">
            <span className="step-tag step-tag--region">{region?.name ?? 'Global'}</span>
            <span className={`step-tag step-tag--diff step-tag--${task.difficulty.toLowerCase()}`}>
              {task.difficulty}
            </span>
            <span className="step-tag step-tag--pts">+{DIFFICULTY_POINTS[task.difficulty]}</span>
          </span>
        </span>
        <button className="route-step-remove" onClick={onRemove} aria-label="Remove step">
          <IconX size={12} />
        </button>
      </div>
    )
  }

  return (
    <div className="route-step">
      <span className="route-step-num">{index + 1}</span>
      <input
        className="route-step-input"
        value={step.text}
        onChange={e => onUpdateText(e.target.value)}
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
  const [steps, setSteps] = useLocalStorage<RouteStep[]>({
    key: 'osrs-leagues-route',
    defaultValue: [],
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [diffFilter, setDiffFilter] = useState<Difficulty[]>([])
  const [regionFilter, setRegionFilter] = useState('all')

  // Tasks available to this character (start + auto + selected + global)
  const availableRegionIds = new Set(['varlamore', 'karamja', 'global', ...selectedRegions])

  // Task IDs already in the route
  const addedTaskIds = new Set(
    steps
      .filter((s): s is Extract<RouteStep, { type: 'task' }> => s.type === 'task')
      .map(s => s.taskId)
  )

  const searchableTasks = tasks.filter(
    t => availableRegionIds.has(t.region) && !addedTaskIds.has(t.id)
  )

  const filteredTasks = searchableTasks.filter(t => {
    const matchesSearch =
      search === '' || t.name.toLowerCase().includes(search.toLowerCase())
    const matchesDiff =
      diffFilter.length === 0 || diffFilter.includes(t.difficulty)
    const matchesRegion =
      regionFilter === 'all' || t.region === regionFilter
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
    const t = tasks.find(x => x.id === s.taskId)
    return sum + (t ? DIFFICULTY_POINTS[t.difficulty] : 0)
  }, 0)

  function addCustomStep() {
    setSteps(prev => [...prev, { type: 'custom', id: makeId(), text: '' }])
  }

  function addTaskStep(taskId: string) {
    setSteps(prev => [...prev, { type: 'task', id: makeId(), taskId }])
  }

  function removeStep(id: string) {
    setSteps(prev => prev.filter(s => s.id !== id))
  }

  function updateCustomText(id: string, text: string) {
    setSteps(prev =>
      prev.map(s => s.id === id && s.type === 'custom' ? { ...s, text } : s)
    )
  }

  function toggleDiff(d: Difficulty) {
    setDiffFilter(prev =>
      prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
    )
  }

  return (
    <>
      <Stack gap="xl">
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

        {steps.length === 0 ? (
          <div className="panel-inset route-empty">
            <Text c="osrsGold.5" size="sm">
              No steps yet — add a task or a custom step below.
            </Text>
          </div>
        ) : (
          <div className="panel-inset route-step-list">
            {steps.map((step, i) => (
              <RouteStepItem
                key={step.id}
                step={step}
                index={i}
                onRemove={() => removeStep(step.id)}
                onUpdateText={text => updateCustomText(step.id, text)}
              />
            ))}
          </div>
        )}

        <div className="route-footer">
          <div className="route-add-btns">
            <button
              className="route-add-btn"
              onClick={addCustomStep}
              title="Add custom step"
            >
              <IconPencilPlus size={18} stroke={1.5} />
            </button>
            <button
              className="route-add-btn"
              onClick={() => setModalOpen(true)}
              title="Add task"
            >
              <IconPlaylistAdd size={18} stroke={1.5} />
            </button>
          </div>
        </div>
      </Stack>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Task"
        size="lg"
        classNames={{
          content: 'osrs-modal',
          header: 'osrs-modal-header',
          title:   'osrs-modal-title',
          close:   'osrs-modal-close',
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
    </>
  )
}
