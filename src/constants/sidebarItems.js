import {
  LayoutDashboard,
  UserPlus,
  Briefcase,
  CheckSquare,
  BarChart3,
  Sparkles,
  Settings,
  Layers,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    path: "/dashboard/main",
    icon: LayoutDashboard,
  },

  {
    title: "Leads",
    path: "/dashboard/leads",
    icon: UserPlus,
  },

  {
    title: "Clients",
    path: "/dashboard/clients",
    icon: Briefcase,
  },
  
  {
    title: "Projects",
    path: "/dashboard/projects",
    icon: Layers,
  },

  {
    title: "Tasks",
    path: "/dashboard/tasks",
    icon: CheckSquare,
  },


  {
    title: "Analytics",
    path: "/dashboard/analytics",
    icon: BarChart3,
  },

  {
    title: "AI Insights",
    path: "/dashboard/ai-insights",
    icon: Sparkles,
  },

  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];