import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import ClientDetailsCard from '@/components/clients/ClientDetailsCard'
import ClientActions from '@/components/clients/ClientActions'
import ClientAIIntelligence from '@/components/clients/ClientAIIntelligence'
import { clientsDetailsTags } from '@/constants/clientData'
import { getClientById } from '@/services/client.service'

function ClientDetails() {
  const { id } = useParams();
  const [client, setClient] = useState(null);


  useEffect(()=>{
    const getClientDetails = async()=>{
      try{
        const response = await getClientById(id);
        console.log('Fetched client:', response);
        setClient(response.data);
      }catch(error){
        console.error('Error fetching client:', error);
      }
    }
    getClientDetails();
  },[]);

  if (!client) {
    return <div>Client not found</div>;
  }

  return (
    <div className="space-y-6">
      <ClientActions detailed={true} id={id} />
      <ClientDetailsCard client={client} clientTags={clientsDetailsTags} />
      <ClientAIIntelligence client={client} />
    </div>
  )
}

export default ClientDetails