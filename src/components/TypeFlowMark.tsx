interface TypeFlowMarkProps {
  compact?: boolean
}

export function TypeFlowMark({ compact = false }: TypeFlowMarkProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${compact ? '' : 'rounded-full bg-white/75 px-4 py-2 ring-1 ring-white/70'}`}>
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-lagoon via-pine to-slate-900 text-lg font-black text-mist shadow-md">
        TF
      </div>
      <div>
        <p className="font-display text-lg font-semibold leading-none text-ink">TypeFlow</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.26em] text-slate-500">
          Thai Typing Trainer
        </p>
      </div>
    </div>
  )
}
