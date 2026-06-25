import React from 'react'
import StatusBadge from '../common/StatusBadge'
import STATUS_COLORS from '@/constants/statusConfig'
import { getProgressColor, getPriorityColor, formatTaskDate } from '@/utils/taskUtils'
import TaskProgressBar from './TaskProgressBar'

function TaskDetailsCard({ task, taskDetailsTags }) {
  if (!task) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="text-muted-foreground">Task data not available</p>
      </div>
    );
  }

  const formatTagLabel = (tag) =>
    tag
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (char) => char.toUpperCase());

  const renderFieldValue = (tag, value) => {
    if (!value) return null;

    if (tag === 'status') {
      return <StatusBadge status={value} />;
    }
    
    if (tag === 'priority') {
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold w-fit ${getPriorityColor(value)}`}>
          {value}
        </span>
      );
    }
    
    if (tag === 'progress') {
      return (
        <div>
          <TaskProgressBar progress={value} showLabel={true} showPercentage={true} size="md" />
        </div>
      );
    }
    
    if (tag === 'dueDate' || tag === 'completedAt' || tag === 'createdAt') {
      return formatTaskDate(value);
    }
    
    return value;
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* LEFT SECTION - Main Details */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {task.title}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Task Details
          </p>
        </div>

        {/* Description */}
        {task.description && (
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Description
            </span>
            <p className="text-sm leading-relaxed text-foreground bg-muted/40 rounded-lg p-3">
              {task.description}
            </p>
          </div>
        )}

        {/* Dynamic Fields from taskDetailsTags */}
        <div className="space-y-4">
          {taskDetailsTags.map((tag) => {
            // Skip empty strings and special fields handled separately
            if (
              !tag ||
              tag === 'title' ||
              tag === 'description' ||
              tag === 'notes' ||
              tag === 'activities' ||
              tag === 'deliverables'
            ) {
              return null;
            }

            const value = task[tag];
            if (!value && tag !== 'progress') return null;

            // Special rendering for progress
            if (tag === 'progress') {
              return (
                <div key={tag}>
                  <TaskProgressBar progress={value} showLabel={true} showPercentage={true} size="md" />
                </div>
              );
            }

            return (
              <div
                key={tag}
                className="flex flex-col gap-1 border-b border-border pb-3 last:border-none"
              >
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {formatTagLabel(tag)}
                </span>

                {tag === 'status' ? (
                  <StatusBadge status={value} />
                ) : tag === 'priority' ? (
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold w-fit ${getPriorityColor(value)}`}>
                    {value}
                  </span>
                ) : tag === 'dueDate' || tag === 'completedAt' || tag === 'createdAt' ? (
                  <p className="text-sm font-medium text-foreground">
                    {formatTaskDate(value)}
                  </p>
                ) : (
                  <p className="text-sm font-medium text-foreground break-words">
                    {value}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT SECTION - Notes, Deliverables, Activities */}
      <div className="flex flex-col gap-6">
        {/* Notes */}
        {task.notes && (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Notes
            </h3>
            <div className="rounded-xl bg-muted/40 p-4">
              <p className="text-sm leading-relaxed text-foreground">
                {task.notes}
              </p>
            </div>
          </div>
        )}

        {/* Deliverables */}
        {task.deliverables && task.deliverables.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Deliverables
            </h3>
            <div className="space-y-2">
              {task.deliverables.map((deliverable) => (
                <div
                  key={deliverable.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {deliverable.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Uploaded {new Date(deliverable.uploadedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activities */}
        {task.activities && task.activities.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Activity Timeline
            </h3>
            <div className="space-y-3">
              {task.activities.map((activity, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    {idx !== task.activities.length - 1 && (
                      <div className="w-0.5 h-8 bg-border mt-1" />
                    )}
                  </div>
                  <p className="text-sm text-foreground pt-1">
                    {activity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskDetailsCard