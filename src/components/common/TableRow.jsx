import React from 'react'
import LeadStatusBadge from './StatusBadge'
import { useNavigate } from 'react-router-dom'

function TableRow({ rowData, rowColumns, islink = null }) {
  const navigate = useNavigate();

  const handleRowClick = () => {
    if (islink) {
      navigate(`/${islink}/${rowData.id}`);
    }
  };

  return (
    <tr onClick={handleRowClick} className={`border-b cursor-pointer ${islink ? 'hover:bg-muted/50' : ''}`}>
        {rowColumns.map((col) => {
          return(
            <td key={col} className="px-6 py-4 whitespace-nowrap">
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