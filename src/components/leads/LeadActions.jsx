import { useNavigate } from "react-router-dom";
import { deleteLead } from "@/services/lead.service";
import { toast } from "sonner";

function LeadActions({
  detailed = false,
  id,
  setConvert
}) {

  const navigate = useNavigate();

  function deleteLeadbyId() {
    try{
      deleteLead(id).then((response) => {
        setTimeout(()=>{
          toast.dismiss();
        },3000);
        toast.success("Lead deleted successfully");
        navigate("/leads");
      });
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  }


  return (

    <div className="
      flex flex-col gap-4
      rounded-xl
      border border-border
      bg-card
      p-4
      shadow-sm
    ">

      {/* TOP BAR */}
      <div className="
        flex items-center justify-between
        flex-wrap gap-3
      ">

        <div>

          <h2 className="
            text-lg font-semibold
            text-foreground
          ">
            Lead Actions
          </h2>

          <p className="
            text-sm text-muted-foreground
          ">
            {detailed
              ? "Manage the lead details and activities."
              : "View and manage your lead."
            }
          </p>

        </div>

        {detailed && (
          <>
            {/* BACK BUTTON */}
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
          </>
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
                navigate(`/leads/edit/${id}`)
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
              Edit Lead
            </button>

            <button
              className="
                rounded-lg
                border border-border
                bg-background
                px-4 py-2

                text-sm font-medium
                text-foreground

                transition-colors
                hover:bg-muted
              " onClick={()=>{
                if(window.confirm("Are you sure you want to delete this lead? This action cannot be undone.")){
                  deleteLeadbyId();
                }
              }}
            >
              Delete Lead
            </button>

            <button
              className="
                rounded-lg
                bg-green-600
                px-4 py-2

                text-sm font-medium
                text-white

                transition-opacity
                hover:opacity-90
              " onClick={()=> setConvert(prev=>!prev)}
            >
              Convert Lead
            </button>

          </>

        ) : (

          <button
            onClick={() =>
              navigate("/leads/create")
            }
            className="
              rounded-lg
              bg-green-600
              px-4 py-2

              text-sm font-medium
              text-white

              transition-opacity
              hover:opacity-90
            "
          >
            Create Lead
          </button>

        )}

      </div>

    </div >

  );

}

export default LeadActions;