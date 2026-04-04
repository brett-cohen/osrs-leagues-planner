import { IconExternalLink, IconLoader2, IconLockOpen, IconRoute, IconSettings } from '@tabler/icons-react'
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
  exporting?: boolean
}

export function NavBar({ current, onChange, onExport, exporting }: Props) {
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
        <button className="nav-export-btn" onClick={onExport} disabled={exporting} title="Export character summary as PNG">
          {exporting
            ? <IconLoader2 size={16} stroke={1.5} className="spin" />
            : <IconExternalLink size={16} stroke={1.5} />
          }
          <span>{exporting ? 'Exporting…' : 'Share Summary'}</span>
        </button>
      </div>
    </nav>
  )
}
