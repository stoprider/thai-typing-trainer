import type { PropsWithChildren, ReactNode } from 'react'

interface SectionCardProps extends PropsWithChildren {
  title: string
  subtitle?: string
  aside?: ReactNode
}

export function SectionCard({
  title,
  subtitle,
  aside,
  children,
}: SectionCardProps) {
  return (
    <section className="rounded-[28px] border border-white/50 bg-white/80 p-6 shadow-soft backdrop-blur md:p-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">{title}</h2>
          {subtitle ? <p className="mt-2 text-sm text-slate-600">{subtitle}</p> : null}
        </div>
        {aside}
      </div>
      {children}
    </section>
  )
}
