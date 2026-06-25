import React from 'react'

function StatsCard({title, value, growth, icon}) {
  const isPositive = String(growth).trim().startsWith('+') || !String(growth).trim().startsWith('-');

  return (
    <div className='group overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-transform hover:-translate-y-0.5'>
      <div className='flex items-start gap-4'>
        <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl'>
          {icon}
        </div>
        <div className='min-w-0 flex-1 space-y-1'>
          <p className='text-sm font-medium uppercase tracking-wide text-muted-foreground'>{title}</p>
          <p className='text-3xl font-bold tracking-tight text-foreground'>{value}</p>
          <p className={`text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {growth}
          </p>
        </div>
      </div>
    </div>
  )
}

export default StatsCard