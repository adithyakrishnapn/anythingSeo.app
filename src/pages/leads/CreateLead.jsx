import LeadForm from '@/components/leads/LeadForm';
import { createLeads,updateLead } from '@/services/lead.service';
import React, {
  useEffect,
  useState,
} from 'react';
import { toast } from 'sonner';
import {
  useParams,
} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getLeadById } from '@/services/lead.service';

function CreateLead({
  isEdit = false,
}) {

  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "",
      source: "",
      value: "",
      assignedTo: "",
      address: "",
      description: "",
      notes: "",
    });


  const handleChange = (e) => {

    const { id, value } = e.target;

    if (id.includes(".")) {
      const [parentKey, childKey] = id.split(".");

      setFormData((prev) => ({
        ...prev,
        [parentKey]: {
          ...(prev[parentKey] || {}),
          [childKey]: value,
        },
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

  };

  useEffect(() => {

    if (isEdit && id) {

      getLeadById(id).then((response) => {
        setFormData((prev) => ({
          ...prev,
          ...response.data,
        }));
      }).catch((error) => {
        console.error('Error fetching lead:', error);
      });
    }
    
  }, [id, isEdit]);

  async function formSubmission(e){
    e.preventDefault();

    try {
      if (isEdit) {
        await updateLead(id, formData);
        toast.success("Lead updated successfully");
      } else {
        await createLeads(formData);
        toast.success("Lead created successfully");
      }

      navigate("/dashboard/leads");
    } catch (error) {
      console.error(isEdit ? "Error updating lead:" : "Error creating lead:", error);
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        (isEdit ? "Error updating lead" : "Error creating lead")
      );
    }
  }

  return (

    <div>

      <LeadForm
        formData={formData}
        handleChange={handleChange}
        formSubmission={formSubmission}
      />

    </div>

  );

}

export default CreateLead;