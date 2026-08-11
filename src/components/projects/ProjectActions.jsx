import { useNavigate } from "react-router-dom";
import { deleteProject } from "@/services/project.service";
import { toast } from "sonner";

function ProjectActions({
  detailed = false,
  id,
  setConvert
}) {

  const navigate = useNavigate();


    function deleteProjectById() {
      try {
        deleteProject(id).then((response) => {
          setTimeout(() => {
            toast.dismiss();
          }, 3000);
          toast.success("Project deleted successfully");
          navigate("/dashboard/projects");
        });
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }

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
            Project Actions
          </h2>

          <p className="
            text-sm text-muted-foreground
          ">
            {detailed
              ? "Manage the project details and activities."
              : "View and manage your project."
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
                navigate(`/dashboard/projects/edit/${id}`)
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
              Edit Project
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
              onClick={deleteProjectById}
            >
              Delete Project
            </button>

            <button
            onClick={() => setConvert(prev => !prev)}
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
              Update Status
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
              navigate("/dashboard/projects/create")
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
            Create Project
          </button>

        )}

      </div>

    </div >

  );

}

export default ProjectActions;