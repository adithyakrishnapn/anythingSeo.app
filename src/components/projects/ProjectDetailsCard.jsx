import React from 'react'
import StatusBadge from '../common/StatusBadge'

function ProjectDetailsCard({ project, projectTags }) {

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const detailItems = [
    { label: 'Client Name', value: project.clientName || project.client || 'N/A' },
    { label: 'Status', value: project.status || 'N/A', isStatus: true },
    { label: 'Assigned To', value: project.assignedTo || 'N/A' },
    { label: 'Created At', value: formatDate(project.createdAt) },
    { label: 'Expiry Date', value: formatDate(project.expiryDate || project.endDate) },
  ];

  return (
    <div className="
      grid
      gap-6
      md:grid-cols-2
    ">

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
            text-xl font-bold
            text-foreground
          ">
            {project.ProjectName || project.name || 'Untitled Project'}
          </h2>

          <p className="
            text-sm text-muted-foreground
          ">
            Project Details
          </p>
        </div>

        <div className="space-y-4">

          {detailItems.map((item, index) => (

            <div
              key={index}
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
                {item.label}
              </span>

              {item.isStatus ? (

                <StatusBadge status={item.value} />

              ) : (

                <p className="
                  text-sm font-medium
                  text-foreground
                  break-words
                ">
                  {item.value}
                </p>

              )}

            </div>

          ))}

        </div>

      </div>

      <div className="flex flex-col gap-6">

        <div className="
          rounded-2xl
          border border-border
          bg-card
          p-6
          shadow-sm
          h-full
          flex
          flex-col
        ">

          <h3 className="
            text-lg font-semibold
            text-foreground
            mb-3
          ">
            Description
          </h3>

          <div className="
            rounded-lg
            bg-muted/40
            p-4
            flex-1
          ">

            <p className="
              text-sm
              leading-relaxed
              text-foreground
            ">
              {project.description || 'No description available.'}
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ProjectDetailsCard