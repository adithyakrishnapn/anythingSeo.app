import React from 'react'
import SearchBar from '@/components/common/SearchBar'
import Filters from '@/components/common/Filters'
import ProjectActions from '@/components/projects/ProjectActions'
import Table from '@/components/common/Table'
import { useState } from 'react'
import { projectFilters } from '@/constants/projectData'
import { projectTags } from '@/constants/projectData'
import { projectsData } from '@/constants/projectData'

function ProjectPage() {
    const [search, setSearch] = useState('');
    const [usedFilters, setUsedFilters] = useState([]);

    const projects = projectsData.filter((project) => {
        const matchSearch = project.name.toLowerCase().includes(search.toLowerCase()) ||
            project.client.toLowerCase().includes(search.toLowerCase()) ||
            project.status.toLowerCase().includes(search.toLowerCase()) ||
            project.value.toString().includes(search) ||
            project.startDate.toLowerCase().includes(search.toLowerCase()) ||
            project.endDate.toLowerCase().includes(search.toLowerCase());


        const matchFilter = usedFilters.includes('All') || usedFilters.length === 0 || usedFilters.some((f) => project.status.toLowerCase().includes(f.toLowerCase()));

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
                <Table leads={projects} tags={projectTags} linkto={"projects"} />
            </div>
        </div>
    )
}

export default ProjectPage