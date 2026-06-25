export const tasksData = [

  {
    id: 1,
    projectId: 1,
    title: "SEO Audit",
    status: "Completed",
    priority: "High",
    assignedTo: "Adithya",
    dueDate: "2026-06-05",
    progress: 100,
  },

  {
    id: 2,
    projectId: 1,
    title: "Keyword Research",
    status: "In Progress",
    priority: "High",
    assignedTo: "Adithya",
    dueDate: "2026-06-10",
    progress: 60,
  },

  {
    id: 3,
    projectId: 1,
    title: "Competitor Analysis",
    status: "Review",
    priority: "Medium",
    assignedTo: "Rahul",
    dueDate: "2026-06-12",
    progress: 90,
  },

  {
    id: 4,
    projectId: 1,
    title: "Internal Linking",
    status: "Pending",
    priority: "Medium",
    assignedTo: "Vishnu",
    dueDate: "2026-06-15",
    progress: 0,
  },

  {
    id: 5,
    projectId: 2,
    title: "Google Business Profile Setup",
    status: "Completed",
    priority: "High",
    assignedTo: "Adithya",
    dueDate: "2026-06-08",
    progress: 100,
  },

];

export const taskDetailsData = {

  1: {
    id: 1,
    projectId: 1,

    title: "SEO Audit",

    description:
      "Perform a complete technical SEO audit and identify issues affecting rankings.",

    status: "Completed",

    priority: "High",

    assignedTo: "Adithya",

    dueDate: "2026-06-05",

    completedAt: "2026-06-04",

    progress: 100,

    notes:
      "Audit completed using Screaming Frog and Google Search Console.",

    createdAt: "2026-06-01",

    deliverables: [
      {
        id: 1,
        name: "seo-audit-report.pdf",
        uploadedAt: "2026-06-04",
      },
    ],

    activities: [
      "Task created",
      "SEO crawl completed",
      "Audit report uploaded",
      "Task completed",
    ],
  },

  2: {
    id: 2,
    projectId: 1,

    title: "Keyword Research",

    description:
      "Research high-intent transactional and informational keywords.",

    status: "In Progress",

    priority: "High",

    assignedTo: "Adithya",

    dueDate: "2026-06-10",

    completedAt: null,

    progress: 60,

    notes:
      "Primary keyword clusters finalized.",

    createdAt: "2026-06-02",

    deliverables: [],

    activities: [
      "Task created",
      "Competitor keywords collected",
      "Search volume analysis completed",
    ],
  },

  3: {
    id: 3,
    projectId: 1,

    title: "Competitor Analysis",

    description:
      "Analyze top competitors and identify SEO opportunities.",

    status: "Review",

    priority: "Medium",

    assignedTo: "Rahul",

    dueDate: "2026-06-12",

    completedAt: null,

    progress: 90,

    notes:
      "Awaiting final review before submission.",

    createdAt: "2026-06-03",

    deliverables: [
      {
        id: 2,
        name: "competitor-analysis.xlsx",
        uploadedAt: "2026-06-11",
      },
    ],

    activities: [
      "Task created",
      "Top competitors identified",
      "Gap analysis completed",
    ],
  },

  4: {
    id: 4,
    projectId: 1,

    title: "Internal Linking",

    description:
      "Improve internal link structure across important pages.",

    status: "Pending",

    priority: "Medium",

    assignedTo: "Vishnu",

    dueDate: "2026-06-15",

    completedAt: null,

    progress: 0,

    notes:
      "Waiting for content team approval.",

    createdAt: "2026-06-05",

    deliverables: [],

    activities: [
      "Task created",
    ],
  },

};

export const taskTags = [
  "",
  "title",
  "status",
  "priority",
  "assignedTo",
  "dueDate",
  "progress",
];

export const taskDetailsTags = [
  "",
  "title",
  "description",
  "status",
  "priority",
  "assignedTo",
  "dueDate",
  "completedAt",
  "progress",
  "notes",
  "createdAt",
];


export const taskFilters = [
  "All",
  "Pending",
  "In Progress",
  "Review",
  "Completed",
  "Blocked",
];


export const taskPriorityFilters = [
  "All",
  "Low",
  "Medium",
  "High",
  "Critical",
];