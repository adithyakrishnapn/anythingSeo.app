import React from 'react'
import { useParams } from 'react-router-dom'
import { leadsDetailsData } from '@/constants/leadsData'
import LeadDetailsCard from '@/components/leads/LeadDetailsCard'
import LeadActions from '@/components/leads/LeadActions'
import { leadsDetailsTags } from '@/constants/leadsData'

function LeadsDetails() {
  const { id } = useParams();

  const lead = leadsDetailsData[parseInt(id)];

  if (!lead) {
    return <div>Lead not found</div>;
  }

  return (
    <div className="space-y-6">
      <LeadActions detailed={true} id={id} />
      <LeadDetailsCard lead={lead} leadTags={leadsDetailsTags} />
    </div>
  )
}

export default LeadsDetails