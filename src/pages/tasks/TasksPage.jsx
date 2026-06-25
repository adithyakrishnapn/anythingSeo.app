import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { tasksData, taskTags, taskFilters, taskPriorityFilters } from '@/constants/tasksData'
import Table from '@/components/common/Table';
import TaskActions from '@/components/tasks/TaskActions';
import SearchBar from '@/components/common/SearchBar'
import Filters from '@/components/common/Filters'

function TasksPage() {
    const { id } = useParams();
    const projectTasks = tasksData.filter((task) => task.projectId === parseInt(id));
    
    const [search, setSearch] = useState('');
    const [usedFilters, setUsedFilters] = useState([]);

    const filteredTasks = projectTasks.filter((task) => {
        const matchesSearch =
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.assignedTo.toLowerCase().includes(search.toLowerCase()) ||
            task.priority.toLowerCase().includes(search.toLowerCase()) ||
            task.status.toLowerCase().includes(search.toLowerCase()) ||
            task.dueDate.toLowerCase().includes(search.toLowerCase());

        const matchesFilter =
            usedFilters.length === 0 ||
            usedFilters.includes('All') ||
            usedFilters.some((f) =>
                task.status.toLowerCase().includes(f.toLowerCase())
            );

        return matchesSearch && matchesFilter;
    });

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
                <p className="text-muted-foreground mt-1">Project #{id}</p>
            </div>
            
            <div className="mb-4">
                <SearchBar search={search} setSearch={setSearch} searchPlaceholder="Search tasks by title, assignee, priority..." />
            </div>
            
            <div className="mb-4">
                <Filters usedFilters={usedFilters} setUsedFilters={setUsedFilters} filterData={taskFilters} />
            </div>
            
            <div className="mb-4">
                <TaskActions />
            </div>
            
            {filteredTasks.length > 0 ? (
                <Table leads={filteredTasks} tags={taskTags} linkto={"tasks/details/"} />
            ) : (
                <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No tasks found</p>
                    <p className="text-muted-foreground text-sm mt-1">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    )
}

export default TasksPage