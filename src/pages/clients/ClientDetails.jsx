import React from 'react'
import { useParams } from 'react-router-dom'
import { clientsDetailsData, clientsDetailsTags } from '@/constants/clientData'
import ClientDetailsCard from '@/components/clients/ClientDetailsCard'
import ClientActions from '@/components/clients/ClientActions'



function ClientDetails() {
  const { id } = useParams();

  const client = clientsDetailsData[parseInt(id)];
  if (!client) {
    return <div>Client not found</div>;
  }

  return (
    <div className="space-y-6">
      <ClientActions detailed={true} id={id} />
      <ClientDetailsCard client={client} clientTags={clientsDetailsTags} />
    </div>
  )
}

export default ClientDetails