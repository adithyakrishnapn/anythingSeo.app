export const projectsData = [

    {
        id: 1,
        clientId: 1,
        name: "June 2026 SEO Campaign",
        status: "In Progress",
        assignedTo: "Adithya",
        progress: 45,
        endDate: "2026-06-30",
    },

    {
        id: 2,
        clientId: 1,
        name: "Website Redesign SEO",
        status: "Planning",
        assignedTo: "Adithya",
        progress: 0,
        endDate: "2026-08-01",
    },

    {
        id: 3,
        clientId: 2,
        name: "Local SEO Growth",
        status: "In Progress",
        assignedTo: "Rahul",
        progress: 60,
        endDate: "2026-07-15",
    },

    {
        id: 4,
        clientId: 3,
        name: "GBP Optimization",
        status: "Review",
        assignedTo: "Vishnu",
        progress: 90,
        endDate: "2026-06-25",
    },

    {
        id: 5,
        clientId: 4,
        name: "Content Marketing Campaign",
        status: "Completed",
        assignedTo: "Adithya",
        progress: 100,
        endDate: "2026-05-31",
    },

];


export const projectsDetailsData = {

    1: {
        id: 1,
        clientId: 1,

        name: "June 2026 SEO Campaign",

        status: "In Progress",

        assignedTo: "Adithya",

        priority: "High",

        progress: 45,

        startDate: "2026-06-01",

        endDate: "2026-06-30",

        description:
            "Complete monthly SEO campaign including technical audit, keyword research, content optimization and backlink building.",

        createdAt: "2026-06-01",

        objectives: [
            "Increase organic traffic",
            "Improve keyword rankings",
            "Generate qualified leads",
        ],

        deliverables: [
            "SEO Audit Report",
            "Keyword Research Report",
            "Monthly SEO Report",
        ],
    },

    2: {
        id: 2,
        clientId: 1,

        name: "Website Redesign SEO",

        status: "Planning",

        assignedTo: "Adithya",

        priority: "Medium",

        progress: 0,

        startDate: "2026-07-01",

        endDate: "2026-08-01",

        description:
            "SEO implementation during website redesign process.",

        createdAt: "2026-06-15",

        objectives: [
            "Maintain rankings",
            "Improve site structure",
            "Improve Core Web Vitals",
        ],

        deliverables: [
            "SEO Migration Plan",
            "Technical SEO Checklist",
        ],
    },

    3: {
        id: 3,
        clientId: 2,

        name: "Local SEO Growth",

        status: "In Progress",

        assignedTo: "Rahul",

        priority: "High",

        progress: 60,

        startDate: "2026-06-10",

        endDate: "2026-07-15",

        description:
            "Improve local search visibility and Google Business Profile rankings.",

        createdAt: "2026-06-10",

        objectives: [
            "Improve local rankings",
            "Increase calls",
            "Increase map visibility",
        ],

        deliverables: [
            "GBP Audit",
            "Citation Report",
            "Local SEO Report",
        ],
    },

    4: {
        id: 4,
        clientId: 3,

        name: "GBP Optimization",

        status: "Review",

        assignedTo: "Vishnu",

        priority: "Medium",

        progress: 90,

        startDate: "2026-05-20",

        endDate: "2026-06-25",

        description:
            "Complete Google Business Profile optimization.",

        createdAt: "2026-05-20",

        objectives: [
            "Increase GBP visibility",
            "Improve reviews",
            "Increase direction requests",
        ],

        deliverables: [
            "GBP Optimization Report",
            "Review Strategy Document",
        ],
    },

    5: {
        id: 5,
        clientId: 4,

        name: "Content Marketing Campaign",

        status: "Completed",

        assignedTo: "Adithya",

        priority: "Low",

        progress: 100,

        startDate: "2026-05-01",

        endDate: "2026-05-31",

        description:
            "Monthly content marketing and blogging campaign.",

        createdAt: "2026-05-01",

        objectives: [
            "Increase organic traffic",
            "Publish optimized blogs",
        ],

        deliverables: [
            "Content Calendar",
            "Blog Reports",
        ],
    },

};

export const projectTags = [
    "",
    "name",
    "status",
    "assignedTo",
    "progress",
    "endDate",
];


export const projectDetailsTags = [
    "",
    "name",
    "status",
    "assignedTo",
    "priority",
    "progress",
    "startDate",
    "endDate",
    "description",
    "createdAt",
];

export const projectFilters = [
    "All",
    "Planning",
    "In Progress",
    "Review",
    "Completed",
    "On Hold",
];