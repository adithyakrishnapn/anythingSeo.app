import { useState, useEffect } from 'react'
import Table from '../../components/common/Table'
import SearchBar from '../../components/common/SearchBar'
import Filters from '../../components/common/Filters'
import { leadFilters } from '@/constants/leadsData'
import LeadActions from '@/components/leads/LeadActions'
import { getLeads, getPriorities } from '@/services/lead.service'
import useTagsAndData from '@/hooks/useTagsAndData'
import { downloadLatestAiAnalysisPDF } from '@/services/pdf.service'
import { toast } from 'sonner';
import useDebounce from '@/hooks/useDebounce'


function LeadsPage() {

  const [search, setSearch] = useState('');
  const [usedFilters, setUsedFilters] = useState([]);
  const [leads, setLeads] = useState([]);
  const [priority, setPriority] = useState([]);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await getLeads();
        const priorities = await getPriorities();
        console.log('Fetched leads:', response);
        console.log('Fetched priorities:', priorities); 
        setLeads(response.data);
        setPriority(priorities.data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    }

    fetchLeads();
  }, [])

  const priorityMap = priority.reduce((acc, item) => {
    acc[item.leadId] = item.priority;
    return acc;
  }, {});

  const { tags, data } = useTagsAndData(leads);
  const visibleTags = tags.filter(
    (tag) => !['_id', '__v', 'activities', 'createdAt','address'].includes(tag)
  );

  const debouncedSearch = useDebounce(search, 1000);


  const filteredLeads = data.filter((lead) => {

    const matchesSearch =
      lead.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      lead.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      lead.source.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      lead.status.toLowerCase().includes(debouncedSearch.toLowerCase())
      // lead.value.toString().includes(debouncedSearch) ||
      // lead.date.toLowerCase().includes(debouncedSearch.toLowerCase());

    const matchesFilter =
      usedFilters.includes('All') ||
      usedFilters.length === 0 ||
      usedFilters.some((f) =>
        lead.status.toLowerCase().includes(f.toLowerCase())
      );

    return matchesSearch && matchesFilter;
  });

  const handleDownload = async () => {
    try {
      await downloadLatestAiAnalysisPDF();
      toast.success("AI analysis downloaded successfully");
    } catch (error) {
      toast.error("Error downloading AI analysis");
      console.error('Error downloading AI analysis:', error);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <SearchBar search={search} setSearch={setSearch} searchPlaceholder="Search leads..." />
      </div>
      <div className="mb-4">
        <Filters usedFilters={usedFilters} setUsedFilters={setUsedFilters} filterData={leadFilters} />
      </div>
      <div className="mb-4">
        <LeadActions detailed={false} downloadFunction={downloadLatestAiAnalysisPDF} />
      </div>
      <Table leads={filteredLeads} tags={visibleTags} linkto={"leads"} priority={priorityMap} />
    </div>
  )
}

export default LeadsPage