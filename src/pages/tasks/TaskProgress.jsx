import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TaskProgressBar from '@/components/tasks/TaskProgressBar'
import TaskProgressUpdate from '@/components/tasks/TaskProgressUpdate'
import { taskDetailsData } from '@/constants/tasksData'
import { getTaskById, updateTaskStatus, addNote, addComment, addAttachment } from '@/services/task.service'
import { toast } from 'sonner'

function TaskProgress() {
    const { id } = useParams()
    const navigate = useNavigate()
    
    const [task, setTask] = useState(null)
    const [loading, setLoading] = useState(true)

    const [formdata, setFormData] = useState({
        update: '',
        status: '',
        attachment: null,
        note: ''
    })

    const fetchTask = () => {
        setLoading(true);
        getTaskById(id)
            .then(res => {
                if (res && res.data) {
                    setTask(res.data);
                    setFormData(prev => ({
                        ...prev,
                        status: res.data.status || ''
                    }));
                } else {
                    const mockTask = taskDetailsData[id];
                    setTask(mockTask || null);
                    if (mockTask) {
                        setFormData(prev => ({
                            ...prev,
                            status: mockTask.status || ''
                        }));
                    }
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching task details:", err);
                const mockTask = taskDetailsData[id];
                setTask(mockTask || null);
                if (mockTask) {
                    setFormData(prev => ({
                        ...prev,
                        status: mockTask.status || ''
                    }));
                }
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTask();
    }, [id]);

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const promises = [];
            
            if (formdata.status && formdata.status !== task.status) {
                promises.push(updateTaskStatus(id, formdata.status));
            }
            
            if (formdata.note) {
                promises.push(addNote(id, formdata.note));
            }
            
            if (formdata.update) {
                // Comments require message, createdBy (we can pass current user if available, or keep it basic)
                promises.push(addComment(id, { message: formdata.update }));
            }
            
            if (formdata.attachment) {
                promises.push(addAttachment(id, {
                    fileName: formdata.attachment.name,
                    fileUrl: 'http://placeholder.com/' + formdata.attachment.name,
                    fileType: 'other'
                }));
            }

            if (promises.length > 0) {
                await Promise.all(promises);
                toast.success('Task progress updated successfully');
            } else {
                toast.info('No changes to update');
            }
            
            navigate(-1);
        } catch (error) {
            console.error('Error updating task progress:', error);
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                'Failed to update task progress'
            );
        }
    }

    if (loading) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                Loading task progress...
            </div>
        )
    }

    if (!task) {
        return (
            <div className="text-center py-12">
                <p className="text-rose-500 font-semibold text-lg">Task not found</p>
            </div>
        )
    }

    const currentProgress = task.progress !== undefined 
        ? task.progress 
        : (task.status === 'Completed' ? 100 : 0);

    return (
        <div className="space-y-6">
            {/* Current Progress */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                    Current Progress: {task.title}
                </h2>
                <TaskProgressBar progress={currentProgress} showLabel={true} showPercentage={true} size="lg" />
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