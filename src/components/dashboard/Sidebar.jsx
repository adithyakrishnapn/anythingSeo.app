import { NavLink } from "react-router-dom";
import { SheetClose } from "@/components/ui/sheet";
import {
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { sidebarItems }
from "../../constants/sidebarItems";

import { anythingSeo }
from "../../constants/anythingSeo";

import ThemeToggler
from "../common/ThemeToggler";
import CollapsedBtn from "../common/CollapsedBtn";

const toneClasses = {
  slate: "bg-slate-500/10 text-slate-600 dark:text-slate-300",
  amber: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  emerald: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  violet: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  sky: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  rose: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  fuchsia: "bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300",
  stone: "bg-stone-500/10 text-stone-700 dark:text-stone-300",
};

function Sidebar({
  mobile = false, collapsed, setCollapsed
}) {
  return (
    <aside
      className={`

        ${mobile
          ? "flex"
          : "hidden md:flex"
        }

        ${mobile
          ? "w-full"
          : collapsed
            ? "w-20"
            : "w-64"
        }

        h-screen
        flex-col
        border-r border-border
        bg-gradient-to-b from-background via-background to-muted/30
        p-4

        transition-all duration-300
      `}
    >

      {/* TOP SECTION */}
      <div
        className={`
          mb-6 rounded-2xl border border-border bg-card/80 px-4 py-4 shadow-sm backdrop-blur
          flex

          ${collapsed
            ? "flex-col items-center gap-3"
            : "items-center justify-between"
          }
        `}
      >

        {/* LOGO */}
        {!collapsed && (

          <div>

            <h1 className="
              mt-1
              text-l font-semibold
              text-foreground
              tracking-tight
            ">
              {anythingSeo.companyName}
            </h1>
          </div>

        )}

        {/* ACTIONS */}
        <div
          className={`
            flex

            ${collapsed
              ? "flex-col items-center gap-3"
              : "items-center gap-2"
            }
          `}
        >
          <ThemeToggler />

          {mobile ? (
            <SheetClose asChild>
              <button
                type="button"
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground shadow-sm hover:text-foreground"
                aria-label="Close menu"
              >
                Close
              </button>
            </SheetClose>
          ) : (
            <CollapsedBtn collapsed={collapsed} setCollapsed={setCollapsed} />
          )}

        </div>

      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-1.5">

        {sidebarItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `

              flex items-center
              relative overflow-hidden

              ${collapsed
                ? "justify-center"
                : "gap-3"
              }

              rounded-xl
              px-4 py-3.5

              text-sm font-medium

              transition-all duration-200

              hover:bg-foreground/5

              ${isActive
                ? "bg-card text-foreground shadow-sm ring-1 ring-border"
                : "text-muted-foreground hover:text-foreground"
              }

            `}
          >
            {({ isActive }) => (
              <>

                {isActive && (
                  <span className="absolute inset-y-2 left-1 w-1 rounded-full bg-primary" />
                )}

                <item.icon
                  className={`h-4.5 w-4.5 shrink-0 rounded-md p-0.5 ${toneClasses[item.tone] || toneClasses.slate}`}
                />

                {!collapsed && (
                  <span className="tracking-tight">
                    {item.title}
                  </span>
                )}

              </>
            )}

          </NavLink>

        ))}

      </nav>

    </aside>

  );

}

export default Sidebar;