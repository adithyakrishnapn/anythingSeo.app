import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { tasksData, taskTags, taskFilters } from '@/constants/tasksData'
import Table from '@/components/common/Table';
import TaskActions from '@/components/tasks/TaskActions';
import SearchBar from '@/components/common/SearchBar'
import Filters from '@/components/common/Filters'
import DailyTaskSummaryCard from '@/components/tasks/DailyTaskSummaryCard'
import TaskAIIntelligence from '@/components/tasks/TaskAIIntelligence'
import { getAllTasks } from '@/services/task.service'
import { getProjectById } from '@/services/project.service'
import useDebounce from '@/hooks/useDebounce'
import { X } from 'lucide-react'

function TasksPage() {
    const { id } = useParams();
    const [tasksDataList, setTasksDataList] = useState([]);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [usedFilters, setUsedFilters] = useState([]);
    const [selectedTaskToAnalyze, setSelectedTaskToAnalyze] = useState(null);

    const fetchProjectDetails = async () => {
        await Promise.resolve();
        try {
            const res = await getProjectById(id);
            if (res && res.data) {
                setProject(res.data);
            }
        } catch (error) {
            console.error("Error fetching project details:", error);
        }
    };

    const fetchTasks = async () => {
        await Promise.resolve();
        setLoading(true);
        try {
            const response = await getAllTasks();
            if (response && response.data) {
                setTasksDataList(response.data);
            } else {
                setTasksDataList(tasksData);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setTasksDataList(tasksData);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProjectDetails();
        fetchTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const projectTasks = tasksDataList.filter((task) => {
        const relatedId = task.relatedTo?._id || task.relatedTo;
        const isProjectMatch = String(relatedId) === String(id) || task.projectId === parseInt(id);
        const isClientMatch = project && 
            task.relatedModel === 'Client' && 
            String(relatedId) === String(project.clientId?._id || project.clientId);

        return isProjectMatch || isClientMatch;
    });

    const debouncedSearch = useDebounce(search, 1000);

    const filteredTasks = projectTasks.filter((task) => {
        const assignee = task.assignedTo?.name || task.assignedTo || '';
        const matchesSearch =
            (task.title || '').toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            assignee.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            (task.priority || '').toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            (task.status || '').toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            (task.dueDate || '').toLowerCase().includes(debouncedSearch.toLowerCase());

        const matchesFilter =
            usedFilters.length === 0 ||
            usedFilters.includes('All') ||
            usedFilters.some((f) =>
                (task.status || '').toLowerCase().includes(f.toLowerCase())
            );

        return matchesSearch && matchesFilter;
    });

    const displayTasks = filteredTasks.map(task => ({
        ...task,
        assignedTo: task.assignedTo?.name || task.assignedTo || 'Unassigned',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : 'No Due Date',
        progress: task.progress !== undefined ? task.progress : (task.status === 'Completed' ? 100 : 0),
        _id: task._id || task.id
    }));

    return (
        <div className="space-y-6">
            <div className="mb-2">
                <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
                <p className="text-muted-foreground mt-1">Project #{id}</p>
            </div>

            <DailyTaskSummaryCard onTasksPrioritized={fetchTasks} />
            
            <div className="mb-4">
                <SearchBar search={search} setSearch={setSearch} searchPlaceholder="Search tasks by title, assignee, priority..." />
            </div>
            
            <div className="mb-4">
                <Filters usedFilters={usedFilters} setUsedFilters={setUsedFilters} filterData={taskFilters} />
            </div>
            
            <div className="mb-4">
                <TaskActions />
            </div>
            
            {loading ? (
                <div className="text-center py-12 text-muted-foreground">
                    Loading tasks...
                </div>
            ) : displayTasks.length > 0 ? (
                <Table leads={displayTasks} tags={taskTags} linkto={"tasks/details"} onAnalyzeTask={(task) => setSelectedTaskToAnalyze(task)} />
            ) : (
                <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No tasks found</p>
                    <p className="text-muted-foreground text-sm mt-1">Try adjusting your search or filters</p>
                </div>
            )}

            {/* Overdue Task Analysis Modal Overlay */}
            {selectedTaskToAnalyze && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setSelectedTaskToAnalyze(null)} />
                    <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 text-foreground shadow-2xl animate-in fade-in-50 zoom-in-95 duration-200">
                        <button
                            type="button"
                            onClick={() => setSelectedTaskToAnalyze(null)}
                            className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            aria-label="Close popup"
                        >
                            <X className="h-4 w-4" />
                        </button>
                        <div className="mt-2">
                            <TaskAIIntelligence 
                                task={selectedTaskToAnalyze} 
                                onPriorityUpdated={() => {
                                    setSelectedTaskToAnalyze(null);
                                    fetchTasks();
                                }} 
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TasksPage