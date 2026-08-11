import React from 'react'
import LeadStatusBadge from './StatusBadge'
import { useNavigate } from 'react-router-dom'
import { PRIORITY_COLORS } from '@/constants/statusConfig'


function TableRow({ rowData, rowColumns, islink = null, priority = {}, onAnalyzeTask }) {
  const navigate = useNavigate();

  const handleRowClick = () => {
    if (islink) {
      console.log(rowData._id);
      navigate(`/dashboard/${islink}/${rowData._id}`);
    }
  };

  // Detect task and overdue status
  const isTask = rowData && 'dueDate' in rowData && 'status' in rowData;
  const isOverdue = isTask && 
    rowData.status !== 'Completed' && 
    rowData.dueDate && 
    // Compare dates ignoring time
    new Date(rowData.dueDate).setHours(0,0,0,0) < new Date().setHours(0,0,0,0);

  return (
    <tr onClick={handleRowClick} className={`border-b cursor-pointer ${islink ? 'hover:bg-muted/50' : ''}`}>
      {rowColumns.map((col, index) => {
        return (
          <td key={`${col}-${index}`} className={`px-6 py-4 whitespace-nowrap bg-${PRIORITY_COLORS[priority[rowData._id]] || 'background'}`}>
            {col === 'status' ? (
              <LeadStatusBadge status={rowData[col]} />
            ) : col === 'dueDate' ? (
              <div className="flex items-center gap-2">
                <span>{rowData[col]}</span>
                {isOverdue && (
                  <span className="inline-flex items-center rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-500 border border-rose-500/20">
                    Overdue
                  </span>
                )}
                {isOverdue && onAnalyzeTask && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAnalyzeTask(rowData);
                    }}
                    className="px-2 py-0.5 rounded bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-bold transition-all focus:outline-none shrink-0"
                  >
                    Analyze
                  </button>
                )}
              </div>
            ) : (
              rowData[col]
            )}
          </td>
        )
      }
      )
      }
    </tr>
  )
}

export default TableRow