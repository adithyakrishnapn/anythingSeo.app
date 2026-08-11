import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProjectForm from '@/components/projects/ProjectForm'
import { getClients } from '@/services/client.service'
import { createProject, updateProject, getProjectById } from '@/services/project.service'
import { toast } from 'sonner'

const getSevenDaysFromNow = () => {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return expiry.toISOString().split('T')[0];
};

function CreateProject({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  
  const [formData, setFormData] = useState({
    clientId: '',
    clientName: '',
    ProjectName: '',
    description: '',
    status: 'active',
    assignedTo: '',
    expiryDate: getSevenDaysFromNow(),
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'clientId') {
      const selectedClient = clients.find((c) => c._id === value);
      setFormData((prev) => ({
        ...prev,
        clientId: value,
        clientName: selectedClient ? selectedClient.name : ''
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value
      }));
    }
  };

  const formSubmission = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateProject(id, formData);
        toast.success('Project updated successfully');
      } else {
        await createProject(formData);
        toast.success('Project created successfully');
      }
      navigate('/dashboard/projects');
    } catch (error) {
      console.error(isEdit ? 'Error updating project:' : 'Error creating project:', error);
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        (isEdit ? 'Error updating project' : 'Error creating project')
      );
    }
  };

  useEffect(() => {
    getClients()
      .then((response) => {
        if (response && response.data) {
          setClients(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });
  }, []);

  useEffect(() => {
    if (isEdit && id) {
      getProjectById(id)
        .then((response) => {
          if (response && response.data) {
            let expDate = '';
            if (response.data.expiryDate) {
              expDate = new Date(response.data.expiryDate).toISOString().split('T')[0];
            }
            setFormData({
              clientId: response.data.clientId?._id || response.data.clientId || '',
              clientName: response.data.clientName || '',
              ProjectName: response.data.ProjectName || response.data.name || '',
              description: response.data.description || '',
              status: response.data.status || 'active',
              assignedTo: response.data.assignedTo || '',
              expiryDate: expDate || getSevenDaysFromNow(),
            });
          }
        })
        .catch((error) => {
          console.error('Error fetching project:', error);
        });
    }
  }, [id, isEdit]);

  return (
    <div>
      <ProjectForm
        formData={formData}
        handleChange={handleChange}
        formSubmission={formSubmission}
        clients={clients}
      />
    </div>
  )
}

export default CreateProject