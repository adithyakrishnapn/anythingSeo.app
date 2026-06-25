import LeadForm from '@/components/leads/LeadForm';
import React, {
  useEffect,
  useState,
} from 'react';

import {
  useParams,
} from 'react-router-dom';

import { leadsDetailsData } from '@/constants/leadsData';

function CreateLead({
  isEdit = false,
}) {

  const { id } = useParams();

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
    });

  const handleChange = (e) => {

    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

  };

  useEffect(() => {

    if (isEdit && id) {

      setFormData(
        leadsDetailsData[id]
      );
    }
    
  }, [id, isEdit]);

  function formSubmission(){
    if(isEdit){

    } else {
      
    }
  }

  return (

    <div>

      <LeadForm
        formData={formData}
        handleChange={handleChange}
      />

    </div>

  );

}

export default CreateLead;