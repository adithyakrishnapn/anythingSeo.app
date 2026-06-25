import React from 'react'
import { getProgressColor, getProgressStatus } from '@/utils/taskUtils'

function TaskProgressBar({ progress, showLabel = true, showPercentage = true, size = 'md' }) {
  if (progress === undefined || progress === null) {
    return null;
  }

  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  // Size variants
  const sizeClasses = {
    sm: { bar: 'h-1.5', label: 'text-xs' },
    md: { bar: 'h-2', label: 'text-sm' },
    lg: { bar: 'h-3', label: 'text-base' }
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div className="space-y-2">
      {/* Header with label and percentage */}
      {(showLabel || showPercentage) && (
        <div className="flex justify-between items-center">
          {showLabel && (
            <span className={`font-medium text-muted-foreground ${sizeClass.label}`}>
              {getProgressStatus(normalizedProgress)}
            </span>
          )}
          {showPercentage && (
            <span className={`font-semibold text-foreground ${sizeClass.label}`}>
              {normalizedProgress}%
            </span>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div className={`w-full ${sizeClass.bar} bg-muted rounded-full overflow-hidden`}>
        <div
          className={`${sizeClass.bar} ${getProgressColor(normalizedProgress)} transition-all duration-500 ease-out`}
          style={{ width: `${normalizedProgress}%` }}
        />
      </div>
    </div>
  )
}

export default TaskProgressBar