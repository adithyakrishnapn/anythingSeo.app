import React,{ useState, useEffect } from 'react'
import ClientForm from '@/components/clients/ClientForm'
import { useParams } from 'react-router-dom'
import { clientsDetailsData } from '@/constants/clientData'

function CreateClient({ isEdit=false }) {
    const { id } = useParams();


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        website: "",
        status: "",
        onboardingDate: "",
        contractValue: "",
        renewalDate: "",
        assignedTo: "",
        address: "",
        notes: "",
        projectCount: 0,
        activities: [],
    });


    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    }

    useEffect(() => {
        if (isEdit && id) {
            setFormData(clientsDetailsData[id]);
        }
    },[id, isEdit]);

  return (
    <div>
        <ClientForm isEdit={isEdit} formData={formData} handleChange={handleChange} />
    </div>
  )
}

export default CreateClient