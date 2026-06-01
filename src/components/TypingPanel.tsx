import { useEffect, useMemo, useRef } from 'react'
import { calculateSessionMetrics } from '../features/typing/typingEngine'
import type { Lesson, TypingSession } from '../types'
import { StatPill } from './StatPill'

interface TypingPanelProps {
  lesson: Lesson
  session: TypingSession
  onKeyPress: (key: string) => void
  onReset: () => void
  onFocusInput?: () => void
}

function renderCharacter(character: string): string {
  return character === ' ' ? '·' : character
}

export function TypingPanel({
  lesson,
  session,
  onKeyPress,
  onReset,
  onFocusInput,
}: TypingPanelProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const metrics = calculateSessionMetrics(session)

  useEffect(() => {
    inputRef.current?.focus()
  }, [lesson.id])

  const renderedContent = useMemo(
    () =>
      lesson.content.split('').map((character, index) => {
        let className = 'text-slate-400'

        if (index < session.currentIndex) {
          className = 'text-emerald-600'
        } else if (index === session.currentIndex) {
          className = 'rounded bg-amber-200 px-0.5 text-ink'
        }

        return (
          <span key={`${character}-${index}`} className={className}>
            {renderCharacter(character)}
          </span>
        )
      }),
    [lesson.content, session.currentIndex],
  )

  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-3">
        <StatPill label="WPM" value={`${metrics.wpm}`} />
        <StatPill label="Accuracy" value={`${metrics.accuracy}%`} tone="cool" />
        <StatPill label="Errors" value={`${session.errorCount}`} />
      </div>

      <div className="rounded-[24px] bg-slate-950 px-5 py-6 text-left text-lg leading-9 text-white md:px-7">
        {renderedContent}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <textarea
          ref={inputRef}
          rows={2}
          value=""
          onChange={() => undefined}
          onFocus={onFocusInput}
          onKeyDown={(event) => {
            if (event.key === 'Tab') {
              return
            }

            if (event.key === 'Backspace') {
              event.preventDefault()
              onReset()
              return
            }

            if (event.key.length === 1 || event.key === ' ') {
              event.preventDefault()
              onKeyPress(event.key)
            }
          }}
          placeholder="Click here and start typing"
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          className="min-h-[88px] flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-ink outline-none ring-0 transition placeholder:text-slate-400 focus:border-cyan-400"
        />
        <button
          type="button"
          onClick={onReset}
          className="rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Restart Lesson
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <span className="font-semibold text-ink">Tip:</span> Backspace restarts the
        current lesson so learners keep practicing correct rhythm instead of editing.
      </div>
    </div>
  )
}
