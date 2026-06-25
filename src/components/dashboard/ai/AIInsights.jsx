function AIInsights({
  type,
  title,
  description,
}) {

  const insightStyles = {

    success:
      "bg-green-100 text-green-700",

    warning:
      "bg-yellow-100 text-yellow-700",

    error:
      "bg-red-100 text-red-700",

    info:
      "bg-blue-100 text-blue-700",

  };

  return (

    <div className="
      flex items-start gap-5
      rounded-xl border border-border p-4
      bg-background shadow-sm
    ">

      {/* BADGE */}
      <div
        className={`
          rounded-full px-2.5 py-1
          text-xs font-medium capitalize
          whitespace-nowrap
          ${insightStyles[type]}
        `}
      >
        {type}
      </div>

      {/* CONTENT */}
      <div className="space-y-1">

        <h3 className="
          text-sm font-semibold text-foreground
        ">
          {title}
        </h3>

        <p className="
          text-sm text-muted-foreground
        ">
          {description}
        </p>

      </div>

    </div>

  );
}

export default AIInsights;