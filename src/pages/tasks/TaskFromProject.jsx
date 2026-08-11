import React, { useMemo, useState, useEffect } from 'react'
import TaskSearchBar from '@/components/tasks/TaskSearchBar';
import { clientsDetailsData } from '@/constants/clientData';
import TasksProjectFromClient from '@/components/tasks/TasksProjectFromClient';
import TaskFromProjectComponent from '@/components/tasks/TaskFromProjectComponent';
import { getClientNameAndId } from '@/services/client.service'
import { getProjectsByClientId } from '@/services/project.service'
import useDebounce from '@/hooks/useDebounce'

function TaskFromProject() {
  const [search, setSearch] = useState('');
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedClientDetails, setSelectedClientDetails] = useState([]);
  const [focused, setFocused] = useState(false);

  // Fetch clients on mount
  useEffect(() => {
    getClientNameAndId()
      .then((res) => {
        if (res && res.data) {
          setClients(res.data);
        } else {
          setClients(Object.values(clientsDetailsData));
        }
      })
      .catch((err) => {
        console.error("Error loading clients:", err);
        setClients(Object.values(clientsDetailsData));
      });
  }, []);

  // Fetch projects when selected client changes
  useEffect(() => {
    if (selectedClient) {
      const clientId = selectedClient._id || selectedClient.id;
      getProjectsByClientId(clientId)
        .then((res) => {
          if (res && res.data) {
            setSelectedClientDetails(res.data);
          } else {
            setSelectedClientDetails([]);
          }
        })
        .catch((err) => {
          console.error("Error loading client projects:", err);
          setSelectedClientDetails([]);
        });
    } else {
      setSelectedClientDetails([]);
    }
  }, [selectedClient]);

  // Load from local storage on mount
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

  const debouncedSearch = useDebounce(search, 1000);

  const filteredResults = useMemo(() => {
    return clients.filter((client) =>
      (client.name || '').toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [clients, debouncedSearch]);

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
                Selected Client Details
              </p>

              <div className='mt-4 flex flex-col gap-2'>
                <p>Name: {selectedClient.name}</p>
                {selectedClient.email && <p>Email: {selectedClient.email}</p>}
                {selectedClient.company && <p>Company: {selectedClient.company}</p>}
              </div>
            </div>
          ) : <p className='mt-10'>Please select a client to view their projects.</p>}
      </div>

      {selectedClient && <TaskFromProjectComponent selectedClientDetails={selectedClientDetails} />}
    </div>
  )
}

export default TaskFromProject