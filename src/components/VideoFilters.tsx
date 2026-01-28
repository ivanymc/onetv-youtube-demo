import { useState, useRef, useEffect } from 'react'
import { Search, ChevronDown, Sparkles, Clock, Eye, Star, Type } from 'lucide-react'
import { type OrderValue, type SortOption, type VideoFiltersProps } from '../types/types'

const sortOptions: SortOption[] = [
  { value: 'relevance', label: 'Relevance', icon: Sparkles },
  { value: 'date', label: 'Newest', icon: Clock },
  { value: 'viewCount', label: 'Most viewed', icon: Eye },
  { value: 'rating', label: 'Top rated', icon: Star },
  { value: 'title', label: 'Title A-Z', icon: Type },
]

export const VideoFilters = ({
  query,
  order,
  onQueryChange,
  onOrderChange,
}: VideoFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = sortOptions.find((opt) => opt.value === order) || sortOptions[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [])

  const handleSelect = (value: OrderValue) => {
    onOrderChange(value);
    setIsOpen(false);
  }

  return (
    <div className="flex w-full max-w-150 gap-3">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-(--color-muted)"
        />

        <input
          type="search"
          value={query}
          placeholder="Search videos..."
          onChange={(event) => onQueryChange(event.target.value)}
          className="
            w-full
            rounded-xl
            border border-(--color-border)
            bg-(--color-surface)
            px-4 py-2 pl-10
            text-sm
            text-(--color-text)
            placeholder:text-(--color-muted)
            transition
            focus:outline-none
            focus:border-(--color-accent)
            focus:ring-4 focus:ring-(--color-focus-ring)
          "
        />
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="
            flex items-center gap-2
            rounded-xl
            border border-(--color-border)
            bg-(--color-surface)
            px-3 py-2
            text-sm
            text-(--color-text)
            transition
            hover:border-(--color-muted)
            focus:outline-none
            focus:border-(--color-accent)
            focus:ring-4 focus:ring-(--color-focus-ring)
            whitespace-nowrap
          "
        >
          <selectedOption.icon size={16} />
          <span>{selectedOption.label}</span>

          <ChevronDown
            size={16}
            className={`transition-transform text-(--color-muted) ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <ul
            role="listbox"
            className="
              absolute -right-2 top-[calc(100%+0.5rem)]
              z-50
              min-w-40
              rounded-xl
              border border-(--color-border)
              bg-(--color-surface)
              p-1
              shadow-lg
            "
          >
            {sortOptions.map((option) => (
              <li key={option.value} role="option" aria-selected={order === option.value}>
                <button
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`
                    flex w-full items-center gap-2
                    rounded-lg
                    px-3 py-2
                    text-left text-sm
                    transition
                    ${
                      order === option.value
                        ? 'bg-(--color-accent) text-white'
                        : 'text-(--color-text) hover:bg-(--color-surface-alt)'
                    }
                  `}
                >
                  <option.icon size={16} />
                  <span>{option.label}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )

}
