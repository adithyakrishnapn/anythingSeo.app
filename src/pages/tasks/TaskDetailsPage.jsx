import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TaskActions from '@/components/tasks/TaskActions'
import { taskDetailsData, taskDetailsTags } from '@/constants/tasksData'
import TaskDetailsCard from '@/components/tasks/TaskDetailsCard';
import TaskAIIntelligence from '@/components/tasks/TaskAIIntelligence';
import { getTaskById, deleteTask, sendTaskFollowUp } from '@/services/task.service'
import { toast } from 'sonner'

function TaskDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const fetchTaskDetails = async () => {
        await Promise.resolve();
        setLoading(true);
        try {
            const res = await getTaskById(id);
            if (res && res.data) {
                setTask(res.data);
            } else {
                setTask(taskDetailsData[id] || null);
            }
        } catch (err) {
            console.error("Error fetching task details:", err);
            setTask(taskDetailsData[id] || null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTaskDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const [sendingFollowUp, setSendingFollowUp] = useState(false);

    const handleDeleteTask = async () => {
        try {
            await deleteTask(id);
            toast.success("Task deleted successfully");
            navigate(-1);
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error("Failed to delete task");
        }
    };

    const handleSendFollowUp = async () => {
        setSendingFollowUp(true);
        try {
            const res = await sendTaskFollowUp(id);
            if (res && res.success) {
                toast.success(res.message || "Follow-up email sent successfully");
                fetchTaskDetails();
            } else {
                toast.error(res?.message || "Failed to send follow-up email");
            }
        } catch (error) {
            console.error("Error sending follow-up email:", error);
            toast.error(error?.response?.data?.message || "Failed to send follow-up email");
        } finally {
            setSendingFollowUp(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                Loading task details...
            </div>
        );
    }
    
    if (!task) {
        return (
            <div className="text-center py-12">
                <p className="text-rose-500 font-semibold text-lg">Task not found</p>
            </div>
        );
    }
    
    // Format complex user/project references for presentation in detail fields if they are populated objects
    const formattedTask = {
        ...task,
        assignedTo: task.assignedTo?.name || task.assignedTo || 'Unassigned',
        createdBy: task.createdBy?.name || task.createdBy || 'System',
        notes: Array.isArray(task.notes) ? task.notes.join('\n') : task.notes || ''
    };

    return (
        <div className="space-y-6">
            <div>
                <TaskActions 
                    detailed={true} 
                    id={id} 
                    deleteFunction={handleDeleteTask} 
                    sendFollowUpFunction={handleSendFollowUp}
                    sendingFollowUp={sendingFollowUp}
                />
            </div>
            <div>
                <TaskDetailsCard task={formattedTask} taskDetailsTags={taskDetailsTags} />
            </div>
            <div>
                <TaskAIIntelligence task={task} onPriorityUpdated={fetchTaskDetails} />
            </div>
        </div>
    )
}

export default TaskDetailsPage