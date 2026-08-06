const STATUS_COLORS = {

  // Lead Statuses
  new: 'bg-blue-100 text-blue-800',
  converted: 'bg-green-100 text-green-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  lost: 'bg-red-100 text-red-800',

  // Client Statuses
  active: 'bg-green-100 text-green-800',
  paused: 'bg-orange-100 text-orange-800',
  cancelled: 'bg-gray-100 text-gray-800',

  // Project Statuses
  planning: 'bg-amber-100 text-amber-800',
  'in progress': 'bg-sky-100 text-sky-800',
  review: 'bg-violet-100 text-violet-800',
  completed: 'bg-emerald-100 text-emerald-800',
  'on hold': 'bg-stone-100 text-stone-800',

  // Task Statuses (future)
  pending: 'bg-yellow-100 text-yellow-800',
  ongoing: 'bg-blue-100 text-blue-800',
  done: 'bg-green-100 text-green-800',

};


const PRIORITY_COLORS = {
  Low: 'bg-green-100 text-green-300',
  Medium: 'bg-yellow-100 text-yellow-300',
  High: 'bg-red-100 text-red-300',
};

export { STATUS_COLORS, PRIORITY_COLORS };