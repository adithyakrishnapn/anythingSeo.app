import { useState,useEffect } from 'react'
import SearchBar from '@/components/common/SearchBar'
import Filters from '@/components/common/Filters'
import ProjectActions from '@/components/projects/ProjectActions'
import Table from '@/components/common/Table'
import { projectFilters } from '@/constants/projectData'
import { getProjects } from '@/services/project.service';
import useTagsAndData from '@/hooks/useTagsAndData'

function ProjectPage() {
    const [search, setSearch] = useState('');
    const [projectsData, setProjectsData] = useState([]);
    const [usedFilters, setUsedFilters] = useState([]);


    useEffect(()=>{
        async function fetchProjects() {
            try{
                const response = await getProjects();
                console.log(response);
                setProjectsData(response.data);
            }catch(error){
                console.log("Error fetching projects",error);
            }
        }

        fetchProjects();
    },[])

    const {tags, data} = useTagsAndData(projectsData);
    const visibleTags = tags.filter((tag)=> !['_id','__v','clientId','createdAt'].includes(tag));


    const projects = data.filter((project) => {
        const matchSearch = (project.name || '').toLowerCase().includes(search.toLowerCase()) ||
            (project.client || '').toLowerCase().includes(search.toLowerCase()) ||
            (project.status || '').toLowerCase().includes(search.toLowerCase()) ||
            (project.ProjectName || '').toLowerCase().includes(search.toLowerCase());


        const matchFilter = usedFilters.includes('All') || usedFilters.length === 0 || usedFilters.some((f) => (project.status || '').toLowerCase().includes(f.toLowerCase()));

        return matchSearch && matchFilter;
    })

    return (
        <div>
            <div className="mb-4">
                <SearchBar search={search} setSearch={setSearch} searchPlaceholder="Search projects..." />
            </div>
            <div className="mb-4">
                <Filters usedFilters={usedFilters} setUsedFilters={setUsedFilters} filterData={projectFilters} />
            </div>
            <div className="mb-4">
                <ProjectActions />
            </div>
            <div className="mb-4">
                <Table leads={projects} tags={visibleTags} linkto={"projects"} />
            </div>
        </div>
    )
}

export default ProjectPage