interface StatPillProps {
  label: string
  value: string
  tone?: 'warm' | 'cool'
}

export function StatPill({
  label,
  value,
  tone = 'warm',
}: StatPillProps) {
  const palette =
    tone === 'warm'
      ? 'bg-amber-50 text-amber-900 ring-amber-200'
      : 'bg-cyan-50 text-cyan-900 ring-cyan-200'

  return (
    <div className={`rounded-2xl px-4 py-3 ring-1 ${palette}`}>
      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <p className="mt-1 font-mono text-2xl font-semibold">{value}</p>
    </div>
  )
}
