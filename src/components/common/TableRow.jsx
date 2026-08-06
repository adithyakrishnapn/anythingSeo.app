import React from 'react'
import LeadStatusBadge from './StatusBadge'
import { useNavigate } from 'react-router-dom'
import { PRIORITY_COLORS } from '@/constants/statusConfig'


function TableRow({ rowData, rowColumns, islink = null, priority = {} }) {
  const navigate = useNavigate();

  const handleRowClick = () => {
    if (islink) {
      console.log(rowData._id);
      navigate(`/dashboard/${islink}/${rowData._id}`);
    }
  };

  return (
    <tr onClick={handleRowClick} className={`border-b cursor-pointer ${islink ? 'hover:bg-muted/50' : ''}`}>
      {rowColumns.map((col, index) => {
        return (
          <td key={`${col}-${index}`} className={`px-6 py-4 whitespace-nowrap bg-${PRIORITY_COLORS[priority[rowData._id]] || 'background'}`}>
            {col === 'status' ? <LeadStatusBadge status={rowData[col]} /> : rowData[col]}
          </td>
        )
      }
      )
      }
    </tr>
  )
}

export default TableRow