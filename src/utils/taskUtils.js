/**
 * Get the color class for a progress value
 * @param {number} progress - Progress percentage (0-100)
 * @returns {string} Tailwind color class
 */
export const getProgressColor = (progress) => {
  if (progress >= 75) return 'bg-emerald-500';
  if (progress >= 50) return 'bg-sky-500';
  if (progress >= 25) return 'bg-amber-500';
  return 'bg-red-500';
};

/**
 * Get the status/label for a progress value
 * @param {number} progress - Progress percentage (0-100)
 * @returns {string} Status label
 */
export const getProgressStatus = (progress) => {
  if (progress >= 100) return 'Completed';
  if (progress >= 75) return 'Almost Done';
  if (progress >= 50) return 'Halfway';
  if (progress >= 25) return 'Started';
  return 'Not Started';
};

/**
 * Get the badge color for priority level
 * @param {string} priority - Priority level (Critical, High, Medium, Low)
 * @returns {string} Tailwind color class
 */
export const getPriorityColor = (priority) => {
  const colors = {
    Critical: 'bg-red-100 text-red-800',
    High: 'bg-orange-100 text-orange-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-blue-100 text-blue-800'
  };
  return colors[priority] || 'bg-gray-100 text-gray-800';
};

/**
 * Format date to readable format
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date
 */
export const formatTaskDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
