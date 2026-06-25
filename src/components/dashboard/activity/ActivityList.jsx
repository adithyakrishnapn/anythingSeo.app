import { formatTimeAgo } from '@/utils/dateUtils'


function ActivityList({
  type,
  message,
  time
}) {

  return (

    <div className="
      flex items-start gap-3
      border-b border-border pb-3
      last:border-none
    ">

      {/* STATUS DOT */}
      <div className="
        w-2 h-2 rounded-full
        bg-emerald-500 mt-2
      " />

      {/* CONTENT */}
      <div className="flex-1">

        <p className="
          text-sm font-medium text-foreground
        ">
          {type} - {message}
        </p>

      </div>

      {/* TIME */}
      <p className="
        text-xs text-muted-foreground
        whitespace-nowrap
      ">
        {formatTimeAgo(time)}
      </p>

    </div>

  );
}

export default ActivityList;