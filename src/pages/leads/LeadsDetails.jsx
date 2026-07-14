import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getLeadById } from '@/services/lead.service'
import LeadDetailsCard from '@/components/leads/LeadDetailsCard'
import LeadActions from '@/components/leads/LeadActions'
import { leadsDetailsTags } from '@/constants/leadsData'
import { convertLeadToCustomer } from "@/services/lead.service";
import { toast } from "sonner";
import ConvertPopUp from '@/components/leads/ConvertPopUp'


function LeadsDetails() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [act, changeact] = useState(false);
  const [status, changeStatus] = useState(false);
  const [convertPopup, setConvertPopup] = useState(false);


  useEffect(() => {
    const fethcData = async () => {
      try {
        const response = await getLeadById(id);
        console.log('Fetched lead:', response);
        setLead(response.data);
      } catch (error) {
        console.error('Error fetching lead:', error);
      }
    }

    fethcData();
  }, [id, act, status]);

  async function convertLead() {
    try {
      await convertLeadToCustomer(id);
      toast.success("Lead converted to customer successfully");
      changeStatus((prev) => !prev);
      setConvertPopup(false);
    } catch (error) {
      console.error('Error converting lead:', error);
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Error converting lead"
      );
    }
  }

  if (!lead) {
    return <div>Lead not found</div>;
  }

  return (
    <div className="space-y-6">
      {convertPopup && <ConvertPopUp ConvertFunction={convertLead} setConvertPopup={setConvertPopup} />}
      <LeadActions detailed={true} id={id} setConvert={setConvertPopup} />
      <LeadDetailsCard lead={lead} leadTags={leadsDetailsTags} id={id} changeActivity={changeact} />
    </div>
  )
}

export default LeadsDetails