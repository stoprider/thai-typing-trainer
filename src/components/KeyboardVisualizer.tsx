import { getKeyboardLayout, keyMatchesCharacter } from '../features/keyboard/keyboardLayouts'
import type { Language } from '../types'

interface KeyboardVisualizerProps {
  language: Language
  expectedChar: string | null
  pressedKey: string | null
}

function normalizeKeyLabel(value: string): string {
  return value === ' ' ? 'space' : value
}

export function KeyboardVisualizer({
  language,
  expectedChar,
  pressedKey,
}: KeyboardVisualizerProps) {
  const layout = getKeyboardLayout(language)

  return (
    <div className="space-y-3">
      {layout.map((row, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className={`grid gap-2 ${rowIndex === 3 ? 'grid-cols-1' : 'grid-cols-10'}`}
        >
          {row.map((key) => {
            const isExpected = expectedChar ? keyMatchesCharacter(key, expectedChar) : false
            const isPressed =
              pressedKey !== null &&
              [key.primary, key.secondary]
                .filter(Boolean)
                .some((value) => value?.toLowerCase() === pressedKey.toLowerCase()) ||
              (pressedKey === ' ' && key.primary === 'space')

            return (
              <div
                key={key.id}
                className={`rounded-2xl border px-3 py-3 text-center shadow-sm transition ${
                  isPressed
                    ? 'border-emerald-400 bg-emerald-100'
                    : isExpected
                      ? 'border-amber-400 bg-amber-100'
                      : 'border-slate-200 bg-white'
                } ${rowIndex === 3 ? 'mx-auto w-full max-w-xs' : ''}`}
              >
                <p className="font-mono text-sm font-semibold text-ink">
                  {normalizeKeyLabel(key.primary)}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  {key.finger.replace('-', ' ')}
                </p>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
