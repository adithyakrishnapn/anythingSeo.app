import LeadStatusBadge from "../common/StatusBadge";

function LeadDetailsCard({ lead, leadTags }) {

  const formatTagLabel = (tag) =>
    tag
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (char) => char.toUpperCase());

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
              text-foreground
            ">
              {lead.notes || 'No notes available.'}
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

          <ul className="
            space-y-3
          ">

            {Array.isArray(lead.activities) && lead.activities.length > 0 ? (

              lead.activities.map(
                (activity, index) => (

                  <li
                    key={index}
                    className="
                      flex items-start gap-3
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

                    <span>
                      {activity}
                    </span>

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