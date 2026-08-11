import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { projectDetailsTags } from '@/constants/projectData'
import ProjectDetailsCard from '@/components/projects/ProjectDetailsCard'
import ProjectActions from '@/components/projects/ProjectActions'
import ConvertStatus from '@/components/projects/ConvertStatus'
import { getProjectById, updateProject } from '@/services/project.service'
import { toast } from 'sonner'

function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [convertPopup, setConvertPopup] = useState(false);

    const fetchProject = () => {
        setLoading(true);
        getProjectById(id)
            .then((response) => {
                if (response && response.data) {
                    setProject(response.data);
                } else {
                    setProject(null);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching project:', error);
                setProject(null);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchProject();
    }, [id]);

    const handleCompleteProject = async () => {
        try {
            await updateProject(id, { ...project, status: 'completed' });
            toast.success("Project marked as completed");
            setConvertPopup(false);
            fetchProject();
        } catch (error) {
            console.error("Error updating project status:", error);
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update project status"
            );
        }
    };

    if (loading) {
        return <div className="p-6 text-center text-muted-foreground">Loading project details...</div>;
    }

    if (!project) {
        return <div className="p-6 text-center text-rose-500 font-medium">Project not found</div>;
    }

    return (
        <div className="space-y-6">
            {convertPopup && (
                <ConvertStatus
                    ConvertFunction={handleCompleteProject}
                    setConvertPopup={setConvertPopup}
                />
            )}
            <div className="mb-4">
                <ProjectActions detailed={true} id={id} project={project} setConvert={setConvertPopup} />
            </div>
            <div className="mb-4">
                <ProjectDetailsCard project={project} projectTags={projectDetailsTags} />
            </div>
        </div>
    )
}

export default ProjectDetails