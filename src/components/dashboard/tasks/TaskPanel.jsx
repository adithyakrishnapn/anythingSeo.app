import { useState } from "react";

import TaskItem from "./TaskItem";

import { tasksData } from "@/constants/tasksData";

function TasksPanel() {

    const [tasks, setTasks] = useState(tasksData);

    // TOGGLE TASK
    const handleToggleTask = (id) => {

        setTasks((prevTasks) =>

            prevTasks.map((task) =>

                task.id === id
                    ? {
                        ...task,
                        completed: !task.completed,
                    }
                    : task

            )

        );

    };
    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    return (

        <div className="
            rounded-2xl
            border border-border
            bg-card
            p-5
            shadow-sm
            space-y-4
    ">

            <div className="
        flex items-center justify-between
      ">

                <div>

                    <h2 className="text-xl font-bold text-foreground">
                        Tasks
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        {completedTasks}/{tasks.length} completed
                    </p>

                </div>

                <button className="
                rounded-lg
                border border-border
                bg-background
                px-3 py-2
                text-sm font-medium text-foreground
                transition-colors
                hover:bg-muted
        ">
                    + Add Task
                </button>

            </div>

            <div className="space-y-3">

                {tasks.map((task) => (

                    <TaskItem
                        key={task.id}
                        title={task.title}
                        completed={task.completed}
                        priority={task.priority}
                        onToggle={() =>
                            handleToggleTask(task.id)
                        }
                    />

                ))}

            </div>

        </div>

    );
}

export default TasksPanel;