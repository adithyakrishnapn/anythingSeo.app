import { useState } from 'react'
import Table from '../../components/common/Table'
import SearchBar from '../../components/common/SearchBar'
import Filters from '../../components/common/Filters'
import { leadsData } from '@/constants/leadsData'
import { leadTags } from '@/constants/leadsData'
import { leadFilters } from '@/constants/leadsData'
import LeadActions from '@/components/leads/LeadActions'

function LeadsPage() {

  const [search, setSearch] = useState('');
  const [usedFilters, setUsedFilters] = useState([]);

 const filteredLeads = leadsData.filter((lead) => {

  const matchesSearch =
    lead.name.toLowerCase().includes(search.toLowerCase()) ||
    lead.email.toLowerCase().includes(search.toLowerCase()) ||
    lead.source.toLowerCase().includes(search.toLowerCase()) ||
    lead.status.toLowerCase().includes(search.toLowerCase()) ||
    lead.value.toString().includes(search) ||
    lead.date.toLowerCase().includes(search.toLowerCase());

  const matchesFilter =
    usedFilters.includes('All') ||
    usedFilters.length === 0 ||
    usedFilters.some((f) =>
      lead.status.toLowerCase().includes(f.toLowerCase())
    );

  return matchesSearch && matchesFilter;
});

  return (
    <div>
      <div className="mb-4">
        <SearchBar search={search} setSearch={setSearch} searchPlaceholder="Search leads..." />
      </div>
        <div className="mb-4">
          <Filters usedFilters={usedFilters} setUsedFilters={setUsedFilters} filterData={leadFilters} />
        </div>
      <div className="mb-4">
        <LeadActions detailed={false} />
      </div>
      <Table leads={filteredLeads} tags={leadTags} linkto={"leads"} />
    </div>
  )
}

export default LeadsPage