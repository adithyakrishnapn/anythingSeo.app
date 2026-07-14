const STATUS_COLORS = {

  // Lead Statuses
  new: 'bg-blue-100 text-blue-800',
  converted: 'bg-green-100 text-green-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  lost: 'bg-red-100 text-red-800',

  // Client Statuses
  Active: 'bg-green-100 text-green-800',
  Paused: 'bg-orange-100 text-orange-800',
  Cancelled: 'bg-gray-100 text-gray-800',

  // Project Statuses
  Planning: 'bg-amber-100 text-amber-800',
  'In Progress': 'bg-sky-100 text-sky-800',
  Review: 'bg-violet-100 text-violet-800',
  Completed: 'bg-emerald-100 text-emerald-800',
  'On Hold': 'bg-stone-100 text-stone-800',

  // Task Statuses (future)
  Pending: 'bg-yellow-100 text-yellow-800',
  Ongoing: 'bg-blue-100 text-blue-800',
  Done: 'bg-green-100 text-green-800',

};

export default STATUS_COLORS;