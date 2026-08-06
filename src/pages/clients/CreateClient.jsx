import React, { useState, useEffect } from 'react'
import ClientForm from '@/components/clients/ClientForm'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getClientById, updateClient, createClients } from '@/services/client.service'
import { toast } from 'sonner'


function CreateClient({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
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
  });


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  async function formSubmission(e) {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateClient(id, formData);
        toast.success("Client updated successfully");
      } else {
        await createClients(formData);
        toast.success("Client created successfully");
      }

      navigate("/dashboard/clients");
    } catch (error) {
      console.error(isEdit ? "Error updating client:" : "Error creating client:", error);
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        (isEdit ? "Error updating client" : "Error creating client")
      );
    }
  }

  useEffect(() => {
    if (isEdit && id) {
      getClientById(id).then((response) => {
        setFormData((prev) => ({
          ...prev,
          ...response.data,
        }));
      }).catch((error) => {
        console.error('Error fetching client:', error);
      });
    }
  }, [id, isEdit]);

  return (
    <div>
      <ClientForm formData={formData} handleChange={handleChange} formSubmission={formSubmission} />
    </div>
  )
}

export default CreateClient