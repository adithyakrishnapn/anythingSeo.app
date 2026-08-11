import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TaskForm from '@/components/tasks/TaskForm'
import { getLeads } from '@/services/lead.service'
import { getClients } from '@/services/client.service'
import { getProjects } from '@/services/project.service'
import { currentUser } from '@/services/auth.service'
import { createTask, updateTask, getTaskById } from '@/services/task.service'
import { toast } from 'sonner'

function CreateTasks({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    relatedModel: 'Project',
    relatedTo: '',
    assignedTo: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '',
    estimatedHours: 0,
    note: ''
  });

  // Fetch lists for related entities
  useEffect(() => {
    getLeads().then(res => setLeads(res.data || [])).catch(err => console.error(err));
    getClients().then(res => setClients(res.data || [])).catch(err => console.error(err));
    getProjects().then(res => setProjects(res.data || [])).catch(err => console.error(err));
    
    // Fetch logged in user to default assignedTo
    currentUser().then(res => {
      if (res && res.data) {
        setFormData(prev => ({
          ...prev,
          assignedTo: prev.assignedTo || res.data._id || ''
        }));
      }
    }).catch(err => console.error(err));
  }, []);

  // Fetch task on edit
  useEffect(() => {
    if (isEdit && id) {
      getTaskById(id)
        .then((response) => {
          if (response && response.data) {
            const task = response.data;
            let formattedDate = '';
            if (task.dueDate) {
              formattedDate = new Date(task.dueDate).toISOString().split('T')[0];
            }
            setFormData({
              title: task.title || '',
              description: task.description || '',
              relatedModel: task.relatedModel || 'Project',
              relatedTo: task.relatedTo?._id || task.relatedTo || '',
              assignedTo: task.assignedTo?._id || task.assignedTo || '',
              status: task.status || 'Pending',
              priority: task.priority || 'Medium',
              dueDate: formattedDate,
              estimatedHours: task.estimatedHours || 0,
              note: Array.isArray(task.notes) ? task.notes[0] || '' : task.notes || ''
            });
          }
        })
        .catch((error) => {
          console.error('Error fetching task details:', error);
        });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const formSubmission = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        notes: formData.note ? [formData.note] : []
      };
      
      // Remove temporary note field
      delete payload.note;

      if (isEdit) {
        await updateTask(id, payload);
        toast.success('Task updated successfully');
      } else {
        await createTask(payload);
        toast.success('Task created successfully');
      }
      
      // Navigate back
      navigate(-1);
    } catch (error) {
      console.error(isEdit ? 'Error updating task:' : 'Error creating task:', error);
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        (isEdit ? 'Error updating task' : 'Error creating task')
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <TaskForm
        formData={formData}
        handleChange={handleChange}
        formSubmission={formSubmission}
        leads={leads}
        clients={clients}
        projects={projects}
        isEdit={isEdit}
      />
    </div>
  )
}

export default CreateTasks
