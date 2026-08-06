import { useState, useEffect } from 'react'
import Table from '@/components/common/Table'
import SearchBar from '@/components/common/SearchBar'
import Filters from '@/components/common/Filters'
import { getClients } from '@/services/client.service'
import { clientFilters } from '@/constants/clientData'
import ClientActions from '@/components/clients/ClientActions'
import useTagsAndData from '@/hooks/useTagsAndData'
import useDebounce from '@/hooks/useDebounce'


function ClientsPage() {

    const [search, setSearch] = useState('');
    const [usedFilters, setUsedFilters] = useState([]);
    const [clientsData, setClientsData] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await getClients();
                console.log('Fetched clients:', response);
                setClientsData(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, []);

    const { tags, data } = useTagsAndData(clientsData);
    const visibleTags = tags.filter((tag) => !['_id', '__v', 'activities', 'createdAt','address','leadId','contractValue','renewalDate','projects','onboardingDate','website'].includes(tag));

    const debouncedSearch = useDebounce(search, 1000);

    const filteredClients = data.filter((client) => {
        const matchesSearch = client.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            client.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            client.company.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            client.status.toLowerCase().includes(debouncedSearch.toLowerCase())
            // client.contractValue.includes(search) ||
            // client.renewalDate.includes(search.toLowerCase());


        const matchesFilter = usedFilters.length === 0 || usedFilters.includes('All') || usedFilters.some((f) => client.status.toLowerCase().includes(f.toLowerCase()));


        return matchesSearch && matchesFilter;
    });


    return (
        <div>
            <div className="mb-4">
                <SearchBar search={search} setSearch={setSearch} searchPlaceholder="Search clients..." />
            </div>
            <div className="mb-4">
                <Filters usedFilters={usedFilters} setUsedFilters={setUsedFilters} filterData={clientFilters} />
            </div>
            <div className="mb-4">
                <ClientActions />
            </div>
            <Table leads={filteredClients} tags={visibleTags} linkto={"clients"} />
        </div>
    )
}

export default ClientsPage