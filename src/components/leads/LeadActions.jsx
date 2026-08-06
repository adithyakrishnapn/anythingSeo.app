import { useNavigate } from "react-router-dom";
import { deleteLead } from "@/services/lead.service";
import { toast } from "sonner";
import DownoadAiAnalysis from "./DownoadAiAnalysis";

function LeadActions({
  detailed = false,
  id,
  setConvert,
  downloadFunction
}) {

  const navigate = useNavigate();

  function deleteLeadbyId() {
    try {
      deleteLead(id).then((response) => {
        setTimeout(() => {
          toast.dismiss();
        }, 3000);
        toast.success("Lead deleted successfully");
        navigate("/dashboard/leads");
      });
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  }


  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

        {/* LEFT SIDE */}
        <div className="flex-1">

          {/* TOP BAR */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Lead Actions
              </h2>

              <p className="text-sm text-muted-foreground">
                {detailed
                  ? "Manage the lead details and activities."
                  : "View and manage your lead."}
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
          hover:bg-muted
        "
              >
                ← Go Back
              </button>
            )}
          </div>

          {/* ACTIONS */}
          <div className="mt-4 flex flex-wrap gap-3">

            {detailed ? (
              <>
                <button
                  onClick={() => navigate(`/dashboard/leads/edit/${id}`)}
                  className="
            rounded-lg
            bg-primary
            px-4 py-2
            text-sm
            font-medium
            text-primary-foreground
            hover:opacity-90
          "
                >
                  Edit Lead
                </button>

                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this lead?"
                      )
                    ) {
                      deleteLeadbyId();
                    }
                  }}
                  className="
            rounded-lg
            border
            border-border
            bg-background
            px-4
            py-2
            text-sm
            font-medium
            hover:bg-muted
          "
                >
                  Delete Lead
                </button>

                <button
                  onClick={() => setConvert(prev => !prev)}
                  className="
            rounded-lg
            bg-green-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            hover:opacity-90
          "
                >
                  Convert Lead
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/dashboard/leads/create")}
                className="
          rounded-lg
          bg-green-600
          px-5
          py-2.5
          text-sm
          font-medium
          text-white
          hover:opacity-90
          w-fit
        "
              >
                + Create Lead
              </button>
            )}

          </div>

        </div>

        {/* RIGHT SIDE */}
        {!detailed && (
          <div className="lg:w-[340px] w-full">
            <DownoadAiAnalysis downloadFunc={downloadFunction} />
          </div>
        )}



      </div>
    </div>

  );

}

export default LeadActions;