import { useNavigate } from "react-router-dom";

function TaskActions({
  detailed = false,
  id,
}) {

  const navigate = useNavigate();

  return (

    <div className="
      flex flex-col gap-5
      rounded-2xl
      border border-border
      bg-card
      p-6
      shadow-sm
    ">

      {/* TOP BAR */}
      <div className="
        flex items-center justify-between
        flex-wrap gap-3
      ">

        <div>

          <h2 className="
            text-xl font-bold
            text-foreground
          ">
            Task Actions
          </h2>

          <p className="
            text-sm text-muted-foreground
          ">
            {detailed
              ? "Manage the task details and activities."
              : "View and manage your task."
            }
          </p>

        </div>

        {detailed && (
          <button
            onClick={() => navigate(-1)}
            className="
              rounded-lg
              border border-border
              bg-background
              px-4 py-2
              text-sm font-medium
              text-foreground
              transition-colors
              hover:bg-muted
            "
          >
            ← Go Back
          </button>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="
        flex flex-wrap gap-3
      ">

        {detailed ? (

          <>

            <button
              onClick={() =>
                navigate(`/tasks/edit/${id}`)
              }
              className="
                rounded-lg
                bg-primary
                px-4 py-2

                text-sm font-medium
                text-primary-foreground

                transition-opacity
                hover:opacity-90
              "
            >
              Edit Task
            </button>

            <button
              className="
                rounded-lg
                border border-border
                bg-rose-500/10
                px-4 py-2

                text-sm font-medium
                text-rose-700

                transition-colors
                hover:bg-rose-500/15
              "
            >
              Delete Task
            </button>

            <button
            onClick={()=> navigate(`/tasks/update/${id}`)}
              className="
                rounded-lg
                bg-sky-500/10
                px-4 py-2

                text-sm font-medium
                text-sky-700

                transition-colors
                hover:bg-sky-500/15
              "
            >
              Update Progress
            </button>

            <button
              className="
                rounded-lg
                bg-emerald-500/10
                px-4 py-2

                text-sm font-medium
                text-emerald-700

                transition-colors
                hover:bg-emerald-500/15
              "
            >
              View Tasks
            </button>

          </>

        ) : (

          <button
            onClick={() =>
              navigate("/tasks/create")
            }
            className="
              rounded-lg
              bg-violet-600
              px-4 py-2

              text-sm font-medium
              text-white

              transition-opacity
              hover:opacity-90
            "
          >
            Create Task
          </button>

        )}

      </div>

    </div >

  );

}

export default TaskActions;