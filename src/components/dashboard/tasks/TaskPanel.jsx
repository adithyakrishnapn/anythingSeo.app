import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskItem from "./TaskItem";
import { getAllTasks, updateTaskStatus } from "@/services/task.service";
import { toast } from "sonner";

function TasksPanel() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasksData = async () => {
    try {
      const res = await getAllTasks();
      if (res && res.data) {
        setTasks(res.data);
      }
    } catch (error) {
      console.error("Error loading tasks for dashboard panel:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksData();
  }, []);

  // TOGGLE TASK
  const handleToggleTask = async (id, currentStatus) => {
    const newStatus = currentStatus === "Completed" ? "Pending" : "Completed";
    
    // Optimistic UI update
    setTasks(prevTasks =>
      prevTasks.map(t => {
        const tId = t._id || t.id;
        return String(tId) === String(id) ? { ...t, status: newStatus } : t;
      })
    );

    try {
      const res = await updateTaskStatus(id, newStatus);
      if (res && res.success) {
        toast.success(`Task status updated to ${newStatus}`);
      } else {
        toast.error("Failed to update task status");
        // Revert UI on failure
        fetchTasksData();
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Error updating task status");
      fetchTasksData();
    }
  };

  const completedTasks = tasks.filter(task => task.status === "Completed").length;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4 h-[300px] flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-xl font-bold text-foreground">Tasks</h2>
          {loading ? (
            <p className="text-sm text-muted-foreground animate-pulse">Calculating completion...</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              {completedTasks}/{tasks.length} completed
            </p>
          )}
        </div>

        <button 
          onClick={() => navigate("/dashboard/tasks/create")}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
        >
          + Add Task
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0 py-2">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="h-10 animate-pulse bg-muted rounded-xl" />
          ))
        ) : tasks.length > 0 ? (
          tasks.map(task => {
            const tId = task._id || task.id;
            return (
              <TaskItem
                key={tId}
                title={task.title}
                completed={task.status === "Completed"}
                priority={task.priority}
                onToggle={() => handleToggleTask(tId, task.status)}
              />
            );
          })
        ) : (
          <div className="h-full flex items-center justify-center py-6">
            <p className="text-xs text-muted-foreground italic">No tasks found. Workload is clear.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TasksPanel;