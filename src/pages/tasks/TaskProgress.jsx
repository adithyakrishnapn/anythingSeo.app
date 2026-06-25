import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import TaskProgressBar from '@/components/tasks/TaskProgressBar'
import TaskProgressUpdate from '@/components/tasks/TaskProgressUpdate'
import { taskDetailsData } from '@/constants/tasksData'

function TaskProgress() {
    const { id } = useParams()
    const task = taskDetailsData[id]

    const [formdata, setFormData] = useState({
        update: '',
        status: '',
        attachment: null,
        note: ''
    })

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        setFormData(prev => ({
            ...prev,
            attachment: file
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formdata)
        // Reset form
        setFormData({
            update: '',
            status: '',
            attachment: null,
            note: ''
        })
    }

    if (!task) {
        return (
            <div className="text-center py-12">
                <p className="text-foreground text-lg">Task not found</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Current Progress */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                    Current Progress: {task.title}
                </h2>
                <TaskProgressBar progress={task.progress} showLabel={true} showPercentage={true} size="lg" />
            </div>

            {/* Update Form */}
            <TaskProgressUpdate
                formdata={formdata}
                handleChange={handleChange}
                handleFileChange={handleFileChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default TaskProgress