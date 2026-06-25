import React,{ useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProjectForm from '@/components/projects/ProjectForm'
import { projectsDetailsData } from '@/constants/projectData'

function CreateProject({ isEdit=false }) {
  const [formData, setFormData] = useState({
    name: '',
    status: '',
    assignedTo: '',
    priority: '',
    progress: '',
    startDate: '',
    endDate: '',
    description: '',
    objectives: [],
    deliverables: [],
  });
  const {id} = useParams();


  const handleChange = (e) =>{
    const {id, value} = e.target;

    let parsedValue = value;

    if (id === 'objectives' || id === 'deliverables') {
      parsedValue = value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }

    if (id === 'progress') {
      parsedValue = value;
    }

    setFormData((prev)=>{
      return {
        ...prev,
        [id]: parsedValue
      }
    })
  }

  useEffect(()=>{
    if(isEdit && id){
      setFormData(projectsDetailsData[id]);
    } 
  },[isEdit, id]);

  return (
    <div>
      <ProjectForm formData={formData} handleChange={handleChange} />
    </div>
  )
}

export default CreateProject