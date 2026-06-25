import React, { useState } from 'react'
import Table from '@/components/common/Table'
import SearchBar from '@/components/common/SearchBar'
import Filters from '@/components/common/Filters'
import { clientsData, clientTags, clientFilters } from '@/constants/clientData'
import ClientActions from '@/components/clients/ClientActions'


function ClientsPage() {

    const [search, setSearch] = useState('');
    const [usedFilters, setUsedFilters] = useState([]);

    const filteredClients = clientsData.filter((client) => {
        const matchesSearch = client.name.toLowerCase().includes(search.toLowerCase()) ||
            client.email.toLowerCase().includes(search.toLowerCase()) ||
            client.company.toLowerCase().includes(search.toLowerCase()) ||
            client.status.toLowerCase().includes(search.toLowerCase()) ||
            client.contractValue.toLowerCase().includes(search.toLowerCase()) ||
            client.renewalDate.toLowerCase().includes(search.toLowerCase());


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
            <Table leads={filteredClients} tags={clientTags} linkto={"clients"} />
        </div>
    )
}

export default ClientsPage