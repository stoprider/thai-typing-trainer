const fingers = [
  { label: 'LP', name: 'Left Pinky', color: 'bg-rose-100 text-rose-700' },
  { label: 'LR', name: 'Left Ring', color: 'bg-orange-100 text-orange-700' },
  { label: 'LM', name: 'Left Middle', color: 'bg-amber-100 text-amber-700' },
  { label: 'LI', name: 'Left Index', color: 'bg-lime-100 text-lime-700' },
  { label: 'RI', name: 'Right Index', color: 'bg-cyan-100 text-cyan-700' },
  { label: 'RM', name: 'Right Middle', color: 'bg-sky-100 text-sky-700' },
  { label: 'RR', name: 'Right Ring', color: 'bg-indigo-100 text-indigo-700' },
  { label: 'RP', name: 'Right Pinky', color: 'bg-fuchsia-100 text-fuchsia-700' },
]

export function FingerGuide() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
      {fingers.map((finger) => (
        <div
          key={finger.label}
          className={`rounded-2xl px-4 py-3 ${finger.color}`}
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em]">
            {finger.label}
          </p>
          <p className="mt-1 text-sm font-medium">{finger.name}</p>
        </div>
      ))}
    </div>
  )
}
