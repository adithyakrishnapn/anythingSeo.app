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
    path: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Leads",
    path: "/leads",
    icon: UserPlus,
  },

  {
    title: "Clients",
    path: "/clients",
    icon: Briefcase,
  },
  
  {
    title: "Projects",
    path: "/projects",
    icon: Layers,
  },

  {
    title: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },


  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },

  {
    title: "AI Insights",
    path: "/ai-insights",
    icon: Sparkles,
  },

  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];