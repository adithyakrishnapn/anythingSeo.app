import React from 'react'
import StatusBadge from '../common/StatusBadge'

function ProjectDetailsCard({ project , projectTags}) {

  const formatTagLabel = (tag) =>
    tag
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (char) => char.toUpperCase());

  const detailTags = projectTags.filter((tag) => tag && !['description', 'createdAt'].includes(tag));

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
              {project.name}
            </h2>

            <p className="
              text-sm text-muted-foreground
            ">
              Project Details
            </p>
          </div>

          <div className="space-y-4">

            {detailTags.map((tag) => (

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

                {tag === 'status' ? (

                  <StatusBadge status={project[tag]} />

                ) : tag === 'progress' ? (

                  <div className="space-y-2">

                    <div className="flex items-center justify-between text-sm text-foreground">
                      <span className="font-medium">{project[tag]}%</span>
                      <span className="text-muted-foreground">Progress</span>
                    </div>

                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${project[tag]}%` }}
                      />
                    </div>

                  </div>

                ) : (

                  <p className="
                    text-sm font-medium
                    text-foreground
                    break-words
                  ">
                    {project[tag]}
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
              Objectives
            </h3>

            <ul className="space-y-3">
              {(project.objectives || []).map((objective, index) => (

                <li
                  key={index}
                  className="flex items-start gap-3 text-sm text-foreground"
                >

                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />

                  <span>{objective}</span>

                </li>

              ))}
            </ul>

          </div>

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
              Deliverables
            </h3>

            <div className="flex flex-wrap gap-2">
              {(project.deliverables || []).map((deliverable, index) => (

                <span
                  key={index}
                  className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-700"
                >
                  {deliverable}
                </span>

              ))}
            </div>

          </div>

        </div>

    </div>
  )
}

export default ProjectDetailsCard