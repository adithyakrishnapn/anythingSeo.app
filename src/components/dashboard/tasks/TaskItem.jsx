function TaskItem({
    title,
    completed,
    priority,
    onToggle,
}) {

    const priorityStyles = {
        High: "bg-red-100 text-red-700",
        Medium: "bg-yellow-100 text-yellow-700",
        Low: "bg-green-100 text-green-700",
    };

    return (

        <div className="
      flex items-center justify-between
      rounded-xl border border-border bg-background p-4
    ">
            <div className="flex items-center gap-3">

                <input
                    type="checkbox"
                    checked={completed}
                    onChange={onToggle}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
                />

                <p
                    className={`
            text-sm font-medium text-foreground

            ${completed
                            ? "line-through opacity-50"
                            : ""
                        }
          `}
                >
                    {title}
                </p>

            </div>

            <span
                className={`
                    rounded-full px-2.5 py-1 text-xs font-medium
          ${priorityStyles[priority]}
        `}
            >
                {priority}
            </span>

        </div>

    );
}

export default TaskItem;