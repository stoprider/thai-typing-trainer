import type { DesktopPreferences, DesktopRuntimeInfo } from '../types'

interface DesktopControlPanelProps {
  info: DesktopRuntimeInfo
  preferences: DesktopPreferences
  onChange: (nextValue: DesktopPreferences) => void
  onCenterWindow: () => void
  onToggleMaximize: () => void
}

function ToggleRow({
  label,
  description,
  checked,
  onToggle,
}: {
  label: string
  description: string
  checked: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-cyan-300 hover:bg-cyan-50/40"
    >
      <div>
        <p className="font-semibold text-ink">{label}</p>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
          checked
            ? 'bg-emerald-600 text-white'
            : 'bg-slate-200 text-slate-600'
        }`}
      >
        {checked ? 'On' : 'Off'}
      </span>
    </button>
  )
}

export function DesktopControlPanel({
  info,
  preferences,
  onChange,
  onCenterWindow,
  onToggleMaximize,
}: DesktopControlPanelProps) {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-900 p-4 text-white">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Runtime</p>
          <p className="mt-2 text-lg font-semibold">
            {info.isDesktop ? 'Tauri Desktop' : 'Browser Preview'}
          </p>
        </div>
        <div className="rounded-2xl bg-amber-100 p-4 text-amber-950">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-700">App Version</p>
          <p className="mt-2 font-mono text-2xl font-semibold">{info.appVersion}</p>
        </div>
        <div className="rounded-2xl bg-cyan-100 p-4 text-cyan-950">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-700">Platform</p>
          <p className="mt-2 font-mono text-base font-semibold">
            {info.platformLabel} / Tauri {info.tauriVersion}
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        <ToggleRow
          label="Compact Workspace"
          description="ลดระยะห่างของ layout เพื่อให้มองเห็นข้อมูลพร้อมกันได้มากขึ้น"
          checked={preferences.compactMode}
          onToggle={() =>
            onChange({
              ...preferences,
              compactMode: !preferences.compactMode,
            })
          }
        />
        <ToggleRow
          label="Always On Top"
          description="ปักหน้าต่าง TypeFlow ไว้เหนือหน้าต่างอื่น เหมาะกับการฝึกข้างเอกสารหรือ reference"
          checked={preferences.alwaysOnTop}
          onToggle={() =>
            onChange({
              ...preferences,
              alwaysOnTop: !preferences.alwaysOnTop,
            })
          }
        />
        <ToggleRow
          label="Fullscreen Practice"
          description="สลับหน้าต่างเป็นโหมดเต็มจอ เพื่อโฟกัสกับบทเรียนอย่างต่อเนื่อง"
          checked={preferences.fullscreen}
          onToggle={() =>
            onChange({
              ...preferences,
              fullscreen: !preferences.fullscreen,
            })
          }
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onCenterWindow}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:border-amber-300 hover:bg-amber-50"
        >
          Center Window
        </button>
        <button
          type="button"
          onClick={onToggleMaximize}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:border-cyan-300 hover:bg-cyan-50"
        >
          Toggle Maximize
        </button>
      </div>
    </div>
  )
}
