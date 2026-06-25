import React from 'react'
import LeadTableRow from './TableRow'
import { Link } from 'react-router-dom'

function Table({ leads, tags, linkto = false }) {
    return (
        <div className="
  w-full
  overflow-x-auto
  rounded-lg
  border
  bg-background scrollbar-thin scrollbar-thumb-muted/50
">

            <table className="
        min-w-full
        md:min-w-[900px]
        w-full
        text-sm
    ">

                <thead className="border-b bg-muted/50">
                    <tr>

                        {tags.map((tag) => (
                            <th
                                key={tag}
                                className="
              px-4 py-3
              text-left
              text-xs font-medium
              uppercase tracking-wider
              whitespace-nowrap
            "
                            >
                                {tag}
                            </th>
                        ))}

                    </tr>
                </thead>

                <tbody>

                    {leads.length === 0 ? (
                        <tr>
                            <td
                                colSpan={tags.length}
                                className="
              py-8 text-center
              text-muted-foreground
            "
                            >
                                No leads found.
                            </td>
                        </tr>


                    ) : (
                        leads.map((lead) =>
                            <LeadTableRow key={lead.id} rowData={lead} rowColumns={tags} islink={linkto} />
                        )

                    )}

                </tbody>

            </table>

        </div>
    )
}

export default Table