import React from 'react'

function RecentLeads({ name,
  email,
  status,
  source,
  value,
  date,
  statusStyles }) {
  return (
    <div className={`flex items-start gap-4 rounded-xl border border-border p-4 overflow-hidden min-w-0 ${statusStyles}`}>
      <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background text-xl'>👤</div>
      <div className='min-w-0 flex-1'>
        <h3 className='truncate font-semibold text-foreground'>{name}</h3>
        <p className='truncate text-sm text-muted-foreground'>{email}</p>
      </div>
      <div className='ml-auto text-right text-xs sm:text-sm text-muted-foreground'>
        <p><span className='font-medium text-foreground'>Status:</span> {status}</p>
        <p><span className='font-medium text-foreground'>Source:</span> {source}</p>
        <p><span className='font-medium text-foreground'>Value:</span> {value}</p>
        <p><span className='font-medium text-foreground'>Date:</span> {date}</p>
      </div>
    </div>
  )
}

export default RecentLeads