import React from 'react'
import { useParams } from 'react-router-dom'
import { projectsDetailsData, projectDetailsTags } from '@/constants/projectData'
import ProjectDetailsCard from '@/components/projects/ProjectDetailsCard'
import ProjectActions from '@/components/projects/ProjectActions'

function ProjectDetails() {
    const { id } = useParams();

    const project = projectsDetailsData[parseInt(id)];
    if (!project) {
        return <div>Project not found</div>;
    }
    return (
        <div className="space-y-6">
            <div className="mb-4">
                <ProjectActions detailed={true} id={id} project={project} />
            </div>
            <div className="mb-4">
                <ProjectDetailsCard project={project} projectTags={projectDetailsTags} />
            </div>
        </div>
    )
}

export default ProjectDetails