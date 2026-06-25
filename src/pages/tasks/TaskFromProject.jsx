import React, { useMemo, useState, useEffect } from 'react'
import TaskSearchBar from '@/components/tasks/TaskSearchBar';
import { clientsDetailsData } from '@/constants/clientData';
import TasksProjectFromClient from '@/components/tasks/TasksProjectFromClient';
import { projectsData } from '@/constants/projectData';
import TaskFromProjectComponent from '@/components/tasks/TaskFromProjectComponent';

function TaskFromProject() {
  const [search, setSearch] = React.useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [focused, setFocused] = useState(false);



  const filteredResults = useMemo(() => {
    return Object.values(clientsDetailsData).filter((client) =>
      client.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const selectedClientDetails = projectsData.filter((project) => project.clientId === selectedClient?.id);
  console.log('selectedClientDetails:', selectedClientDetails);

  useEffect(() => {
    const itemStr = localStorage.getItem('selectedClient');
    if (!itemStr) return;

    try {
      const item = JSON.parse(itemStr);
      if (item.expiry && Date.now() > item.expiry) {
        localStorage.removeItem('selectedClient');
        return;
      }
      setSelectedClient(item.value ?? item);
    } catch (err) {
      console.error('Failed to parse selectedClient', err);
      localStorage.removeItem('selectedClient');
    }
  }, []);

  return (
    <div>
      <TaskSearchBar search={search} setSearch={setSearch} setFocused={setFocused} searchPlaceholder="Search clients..." />
      {filteredResults.length === 0 && search.length > 0 ? (
        <p className='pt-2'>No results found for "{search}"</p>
      ) : ((focused &&
        <TasksProjectFromClient results={filteredResults} setSelectedClient={setSelectedClient} setSearch={setSearch} />
      )
      )}


      <div>
        {selectedClient ?
          (
            <div className='mt-10 p-4 border border-border rounded-lg bg-background'>
              <p className='inline-block w-fit font-bold bg-green-200 text-[10pt] text-background rounded-xl p-2'>
                Project Details
              </p>

              <div className='mt-4 flex flex-col gap-2'>
                <p>Name: {selectedClient.name}</p>
                <p>Email: {selectedClient.email}</p>
              </div>
            </div>
          ) : <p className='mt-10'>Please select a client to view their projects.</p>}
      </div>

      {selectedClient && <TaskFromProjectComponent selectedClientDetails={selectedClientDetails} />}
    </div>
  )
}

export default TaskFromProject