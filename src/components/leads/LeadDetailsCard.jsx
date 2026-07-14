import LeadStatusBadge from "../common/StatusBadge";
import { useState, useRef } from "react";
import AddActivity from "./AddActivity";
import { addActivity, deleteActivity } from "@//services/lead.service.js";
import { toast } from "sonner";


function LeadDetailsCard({ lead, leadTags, id, changeActivity }) {
  const [activitySection, setActivitySection] = useState(false); 
  const [activity, setActivity] = useState("");
  const activityInputRef = useRef(null);


  const formatTagLabel = (tag) =>
    tag
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (char) => char.toUpperCase());

  const closeActivity =()=>{
    setActivitySection((prev)=>!prev);
  }


async function addActivitytoLead(){
  try{
    const res = await addActivity(id,activity);
    if(res){
      toast.success("Activity added successfully");
      changeActivity((prev)=>!prev);
      activityInputRef.current.value = "";
    }
  } catch(e){
    console.error("Error in adding activity", e);
  }
}

async function deleteActivityLead(act){
  try{
    const res = await deleteActivity(id,act);
    if(res){
      toast.success("Activity deleted successfully");
      changeActivity((prev)=>!prev);
    }
  } catch(e){
    console.error("Error in deleting activity", e);
  }
}

  return (

    <div className="
      grid
      gap-6
      md:grid-cols-2
    ">

      {/* LEFT SECTION */}
      <div className="
        rounded-2xl
        border border-border
        bg-card
        p-6
        shadow-sm
        space-y-5
      ">

        <div>
          <h2 className="
            text-2xl font-bold
            text-foreground
          ">
            {lead.name}
          </h2>

          <p className="
            text-sm text-muted-foreground
          ">
            Lead Details
          </p>
        </div>

        <div className="space-y-4">

          {leadTags.map((tag) => {

            if (
              tag === "activities" ||
              tag === "notes"
            ) return null;

            return (

              <div
                key={tag}
                className="
                  flex flex-col gap-1
                  border-b border-border
                  pb-3
                  last:border-none
                "
              >

                <span className="
                  text-xs uppercase
                  tracking-wide
                  text-muted-foreground
                ">
                  {formatTagLabel(tag)}
                </span>

                {tag === "status" ? (

                  <LeadStatusBadge
                    status={lead[tag]}
                  />

                ) : (

                  <p className="
                    text-sm font-medium
                    text-foreground
                    break-words
                  ">
                    {lead[tag]}
                  </p>

                )}

              </div>

            );

          })}

        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="
        flex flex-col gap-6
      ">

        {/* NOTES */}
        <div className="
          rounded-2xl
          border border-border
          bg-card
          p-6
          shadow-sm
        ">

          <h3 className="
            text-lg font-semibold
            text-foreground
            mb-3
          ">
            Notes
          </h3>

          <div className="
            rounded-xl
            bg-muted/40
            p-4
          ">

            <p className="
              text-sm
              leading-relaxed
              text-muted-foreground
            ">
              {lead.notes.length > 0 ? lead.notes : 'No notes available.'}
            </p>

          </div>

        </div>

        {/* ACTIVITIES */}
        <div className="
          rounded-2xl
          border border-border
          bg-card
          p-6
          shadow-sm
        ">

          <h3 className="
            text-lg font-semibold
            text-foreground
            mb-4
          ">
            Activities
          </h3>
          <button
            type="button"
            onClick={() => setActivitySection((prev) => !prev)}
            aria-expanded={activitySection}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-opacity mb-4 focus:outline-none ${activitySection ? 'border border-border bg-background text-foreground hover:opacity-90' : 'bg-primary text-primary-foreground hover:opacity-90'}`}
          >
            {activitySection ? 'Close' : 'Add Activity'}
          </button>
          { activitySection && (
            <div className="mt-4 mb-4">
              <AddActivity setActivity={setActivity} closeFunction={closeActivity} submitFunc={addActivitytoLead} act={activityInputRef} />
            </div>
          )}

          <ul className="
            space-y-3
          ">

            {Array.isArray(lead.activities) && lead.activities.length > 0 ? (

              lead.activities.map(
                (activity, index) => (

                  <li
                    key={index}
                    className="
                      flex items-center gap-3
                      text-sm text-foreground
                    "
                  >

                    <span className="
                      mt-1.5
                      h-2 w-2
                      rounded-full
                      bg-primary
                      shrink-0
                    " />

                    <span className="flex-1">
                      {activity}
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteActivityLead(activity)}
                      className="
                        ml-auto
                        shrink-0
                        rounded-lg
                        border border-border
                        bg-background
                        px-3 py-1.5
                        text-xs font-medium
                        text-foreground
                        transition-colors
                        hover:bg-rose-500/10
                        hover:text-rose-700
                      "
                    >
                      Delete
                    </button>

                  </li>

                )
              )

            ) : (

              <p className="text-sm text-muted-foreground">
                No recent activities.
              </p>

            )}

          </ul>

        </div>

      </div>

    </div>

  );

}

export default LeadDetailsCard;