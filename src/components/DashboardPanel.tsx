import type { DashboardStats } from '../types'

interface DashboardPanelProps {
  stats: DashboardStats
  onClear: () => void
}

export function DashboardPanel({ stats, onClear }: DashboardPanelProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-slate-900 p-4 text-white">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Sessions</p>
          <p className="mt-2 font-mono text-3xl font-semibold">{stats.totalSessions}</p>
        </div>
        <div className="rounded-2xl bg-amber-100 p-4 text-amber-950">
          <p className="text-xs uppercase tracking-[0.24em] text-amber-700">Avg Accuracy</p>
          <p className="mt-2 font-mono text-3xl font-semibold">{stats.averageAccuracy}%</p>
        </div>
        <div className="rounded-2xl bg-cyan-100 p-4 text-cyan-950">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-700">Avg WPM</p>
          <p className="mt-2 font-mono text-3xl font-semibold">{stats.averageWpm}</p>
        </div>
        <div className="rounded-2xl bg-emerald-100 p-4 text-emerald-950">
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-700">Best WPM</p>
          <p className="mt-2 font-mono text-3xl font-semibold">{stats.bestWpm}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-ink">Recent Sessions</p>
              <p className="text-sm text-slate-500">Last five saved training results</p>
            </div>
            <button
              type="button"
              onClick={onClear}
              className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:border-rose-300 hover:text-rose-600"
            >
              Clear History
            </button>
          </div>

          <div className="space-y-3">
            {stats.recentResults.length === 0 ? (
              <p className="rounded-2xl bg-slate-50 px-4 py-6 text-sm text-slate-500">
                No saved sessions yet.
              </p>
            ) : (
              stats.recentResults.map((result) => (
                <div
                  key={result.id}
                  className="grid gap-3 rounded-2xl border border-slate-200 px-4 py-3 md:grid-cols-[1.5fr_repeat(4,0.7fr)]"
                >
                  <div>
                    <p className="font-semibold text-ink">{result.lessonTitle}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(result.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="font-mono text-sm text-slate-700">{result.wpm} WPM</p>
                  <p className="font-mono text-sm text-slate-700">{result.accuracy}%</p>
                  <p className="font-mono text-sm text-slate-700">{result.errors} errors</p>
                  <p className="font-mono text-sm text-slate-700">
                    {result.durationSeconds}s
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-950 p-5 text-white">
          <p className="font-semibold">Focus Areas</p>
          <p className="mt-1 text-sm text-slate-300">
            Personalized practice uses these frequent misses.
          </p>
          <div className="mt-5 space-y-3">
            {stats.weakKeys.length === 0 ? (
              <p className="rounded-2xl bg-white/10 px-4 py-6 text-sm text-slate-300">
                No weak keys recorded yet.
              </p>
            ) : (
              stats.weakKeys.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3"
                >
                  <span className="font-mono text-lg">{item.key}</span>
                  <span className="text-sm text-slate-300">{item.count} misses</span>
                </div>
              ))
            )}
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Practice Time
            </p>
            <p className="mt-2 font-mono text-3xl font-semibold">
              {stats.totalPracticeMinutes} min
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
