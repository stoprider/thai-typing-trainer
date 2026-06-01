import type { SoundSettings } from '../types'

interface SoundControlsProps {
  value: SoundSettings
  onChange: (nextValue: SoundSettings) => void
}

export function SoundControls({ value, onChange }: SoundControlsProps) {
  return (
    <div className="rounded-[28px] border border-white/60 bg-white/75 p-5 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-display text-lg font-semibold text-ink">Sound Feedback</p>
          <p className="mt-1 text-sm text-slate-600">
            เสียงตอบกลับสำหรับพิมพ์ถูก พิมพ์ผิด และจบบทเรียน
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            onChange({
              ...value,
              enabled: !value.enabled,
            })
          }
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            value.enabled
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          {value.enabled ? 'Sound On' : 'Sound Off'}
        </button>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-500">
          <span>Volume</span>
          <span>{Math.round(value.volume * 100)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(value.volume * 100)}
          onChange={(event) =>
            onChange({
              ...value,
              volume: Number(event.target.value) / 100,
            })
          }
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-cyan-600"
        />
      </div>
    </div>
  )
}
