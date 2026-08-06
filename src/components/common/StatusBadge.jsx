import React from 'react'
import { STATUS_COLORS } from '@/constants/statusConfig'

function StatusBadge({ status }) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  )
}

export default StatusBadge