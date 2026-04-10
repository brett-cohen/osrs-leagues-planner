import { IconExternalLink, IconLockOpen, IconRoute, IconSettings } from '@tabler/icons-react'
import type { ReactNode } from 'react'

export type Page = 'unlocks' | 'route' | 'config'

const NAV_ITEMS: { page: Page; label: string; icon: ReactNode }[] = [
  { page: 'unlocks', label: 'Unlocks', icon: <IconLockOpen size={16} stroke={1.5} /> },
  { page: 'route',   label: 'Route',   icon: <IconRoute    size={16} stroke={1.5} /> },
  { page: 'config',  label: 'Config',  icon: <IconSettings size={16} stroke={1.5} /> },
]

interface Props {
  current: Page
  onChange: (page: Page) => void
  onExport: () => void
}

export function NavBar({ current, onChange, onExport }: Props) {
  return (
    <nav className="app-nav">
      <div className="app-nav-inner">
        <span className="app-nav-logo">Leagues Planner</span>
        <div className="app-nav-tabs">
          {NAV_ITEMS.map(({ page, label, icon }) => (
            <button
              key={page}
              className={`nav-item${current === page ? ' nav-item--active' : ''}`}
              onClick={() => onChange(page)}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
        <button className="nav-export-btn" onClick={onExport} title="Export character summary as PNG">
          <IconExternalLink size={16} stroke={1.5} />
          <span>Share Summary</span>
        </button>
      </div>
    </nav>
  )
}
