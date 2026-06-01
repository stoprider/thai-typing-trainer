import type { Lesson } from '../types'

interface LessonListProps {
  lessons: Lesson[]
  selectedLessonId: string
  onSelect: (lessonId: string) => void
}

export function LessonList({
  lessons,
  selectedLessonId,
  onSelect,
}: LessonListProps) {
  return (
    <div className="grid gap-3">
      {lessons.map((lesson) => {
        const active = lesson.id === selectedLessonId

        return (
          <button
            key={lesson.id}
            type="button"
            onClick={() => onSelect(lesson.id)}
            className={`rounded-2xl border p-4 text-left transition ${
              active
                ? 'border-amber-400 bg-amber-50 shadow-sm'
                : 'border-slate-200 bg-white hover:border-cyan-300 hover:bg-cyan-50/40'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-ink">{lesson.title}</p>
                <p className="mt-1 text-sm text-slate-600">{lesson.description}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-600">
                {lesson.level}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {lesson.focusKeys.map((key) => (
                <span
                  key={`${lesson.id}-${key}`}
                  className="rounded-full bg-slate-900 px-2.5 py-1 font-mono text-xs text-white"
                >
                  {key === ' ' ? 'space' : key}
                </span>
              ))}
            </div>
          </button>
        )
      })}
    </div>
  )
}
