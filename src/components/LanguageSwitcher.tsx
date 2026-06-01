import type { Language } from '../types'

interface LanguageSwitcherProps {
  value: Language
  onChange: (language: Language) => void
}

const options: Array<{ value: Language; label: string }> = [
  { value: 'th', label: 'Thai' },
  { value: 'en', label: 'English' },
]

export function LanguageSwitcher({ value, onChange }: LanguageSwitcherProps) {
  return (
    <div className="inline-flex rounded-full bg-white/70 p-1 ring-1 ring-slate-200">
      {options.map((option) => {
        const active = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active
                ? 'bg-ink text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
