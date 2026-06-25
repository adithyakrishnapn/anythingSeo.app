import React from 'react'
import { useParams } from 'react-router-dom'
import TaskActions from '@/components/tasks/TaskActions'
import { taskDetailsData, taskDetailsTags } from '@/constants/tasksData'
import TaskDetailsCard from '@/components/tasks/TaskDetailsCard';

function TaskDetailsPage() {
    const { id } = useParams();
    const task = taskDetailsData[id];
    
    if (!task) {
        return (
            <div className="text-center py-12">
                <p className="text-foreground text-lg">Task not found</p>
            </div>
        );
    }
    
    return (
        <div>
            <div>
                <TaskActions detailed={true} id={id} />
            </div>
            <div className="mt-6">
                <TaskDetailsCard task={task} taskDetailsTags={taskDetailsTags} />
            </div>
        </div>
    )
}

export default TaskDetailsPage