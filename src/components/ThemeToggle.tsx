import { Sun, Moon } from 'lucide-react'
import type { ThemeToggleProps } from '../types/types'
import type { ThemeMode } from '../utils/theme'

const iconMap: Record<ThemeMode, { icon: typeof Sun; label: string }> = {
  light: { icon: Sun, label: 'Light theme' },
  dark: { icon: Moon, label: 'Dark theme' },
}

export const ThemeToggle = ({ mode, onChange }: ThemeToggleProps) => {
  return (
    <div className="theme-toggle">
      <div className="toggle-group" role="group" aria-label="Theme selection">
        {(Object.keys(iconMap) as ThemeMode[]).map((value) => {
          const { icon: Icon, label } = iconMap[value]
          return (
            <button
              key={value}
              type="button"
              className={`toggle-button ${mode === value ? 'active' : ''}`}
              onClick={() => onChange(value)}
              aria-pressed={mode === value}
              aria-label={label}
              title={label}
            >
              <Icon size={22} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
