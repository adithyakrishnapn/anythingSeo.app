import React from 'react'
import Table from '@/components/common/Table'

function TaskFromProjectComponent({selectedClientDetails}) {
    
  const projectRows = selectedClientDetails.map((project) => ({
    ...project,
    'Project Name': project.ProjectName || project.name,
    _id: project._id || project.id
  }));

  return (
    <div className='mt-10'>
        {selectedClientDetails.length === 0 ? (
            <p>No projects found for the selected client.</p>
        ) : (
      <Table leads={projectRows} tags={["Project Name"]} linkto={"tasks/select/"} />
        )}
    </div>
  )
}

export default TaskFromProjectComponent;