import React from 'react'
import {
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

function CollapsedBtn({collapsed, setCollapsed}) {
  return (
<button
            onClick={() => {
              setCollapsed(!collapsed);
              localStorage.setItem('sidebar-collapsed', !collapsed);
            }}
            className="
              p-2 rounded-md
              hover:bg-muted
              transition-colors
            "
          >

            {collapsed
              ? (
                <PanelLeftOpen
                  className="h-5 w-5"
                />
              )
              : (
                <PanelLeftClose
                  className="h-5 w-5"
                />
              )
            }

          </button>
  )
}

export default CollapsedBtn