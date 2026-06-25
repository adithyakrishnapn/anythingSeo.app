import React from 'react'
import { leadsData } from '@/constants/leadsData';
import RecentLeads from './RecentLeads';

function LeadRow() {
  const statusStyles = {
  New: "bg-blue-500/10 text-blue-700",
  Qualified: "bg-emerald-500/10 text-emerald-700",
  Lost: "bg-rose-500/10 text-rose-700",
};
  return (
    <div className='rounded-2xl border border-border bg-card p-5 shadow-sm h-[400px] overflow-y-auto'>
      <div className='mb-4'>
        <h2 className='text-xl font-bold text-foreground'>Recent Leads</h2>
        <p className='text-sm text-muted-foreground'>Newest lead activity and contact details</p>
      </div>
      {leadsData.map((lead) => (
        <div key={lead.id} className='mt-4 overflow-hidden min-w-0'>
          <RecentLeads
            key={lead.id}
            name={lead.name}
            email={lead.email}
            status={lead.status}
            source={lead.source}
            value={lead.value}
            date={lead.date}
            statusStyles={statusStyles[lead.status]}
          />
        </div>
      ))}

    </div>
  )
}

export default LeadRow