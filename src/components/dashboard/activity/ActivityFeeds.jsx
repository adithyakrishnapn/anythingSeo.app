import { activities }
from "@/constants/activityList";

import ActivityList
from "./ActivityList";

function ActivityFeeds() {

  return (

    <div className="
      rounded-2xl
      border border-border
      bg-card
      p-5
      shadow-sm
      space-y-4
    ">

      {/* HEADER */}
      <div>

        <h2 className="
          text-xl font-bold
          text-foreground
        ">
          Recent Activity
        </h2>

        <p className="
          text-sm text-muted-foreground
        ">
          Latest dashboard updates
        </p>

      </div>

      {/* ACTIVITIES */}
      <div className="space-y-3">

        {activities.map((act, index) => (

          <ActivityList
            key={index}
            type={act.type}
            message={act.action}
            time={act.createdAt}
          />

        ))}

      </div>

    </div>

  );
}

export default ActivityFeeds;