export const clientsData = [

  {
    id: 1,
    leadId: 1,
    name: "Rahul",
    email: "rahul@gmail.com",
    company: "PixelCraft",
    status: "Active",
    contractValue: "₹25,000/month",
    projectCount: 2,
    renewalDate: "2027-05-20",
  },

  {
    id: 2,
    leadId: 2,
    name: "Vishnu",
    email: "vishnu@gmail.com",
    company: "NovaTech",
    status: "Cancelled",
    contractValue: "₹15,000/month",
    projectCount: 1,
    renewalDate: "2027-05-22",
  },

  {
    id: 3,
    leadId: 3,
    name: "Arjun",
    email: "arjun@gmail.com",
    company: "Skyline Media",
    status: "Active",
    contractValue: "₹40,000/month",
    projectCount: 3,
    renewalDate: "2027-05-18",
  },

  {
    id: 4,
    leadId: 4,
    name: "Meera",
    email: "meera@gmail.com",
    company: "BrightPath",
    status: "Paused",
    contractValue: "₹10,000/month",
    projectCount: 1,
    renewalDate: "2026-12-15",
  },

  {
    id: 5,
    leadId: 5,
    name: "Karthik",
    email: "karthik@gmail.com",
    company: "DevSphere",
    status: "Active",
    contractValue: "₹30,000/month",
    projectCount: 2,
    renewalDate: "2027-01-14",
  },

  {
    id: 6,
    leadId: 6,
    name: "Anjali",
    email: "anjali@gmail.com",
    company: "CloudEdge",
    status: "Active",
    contractValue: "₹50,000/month",
    projectCount: 4,
    renewalDate: "2027-05-10",
  },

];

export const clientsDetailsData = {

  1: {
    id: 1,
    leadId: 1,

    name: "Rahul",
    email: "rahul@gmail.com",
    phone: "+91 9876543210",
    company: "PixelCraft",

    status: "Active",

    website: "https://pixelcraft.com",

    contractValue: "₹25,000/month",

    onboardingDate: "2026-06-01",
    renewalDate: "2027-05-20",

    assignedTo: "Admin",

    address: "Trivandrum, Kerala",

    notes: "Monthly SEO retainer client.",

    projectCount: 2,

    activities: [
      "Client onboarded",
      "SEO audit completed",
      "Keyword research delivered",
      "Google Search Console configured",
    ],
  },

  2: {
    id: 2,
    leadId: 2,

    name: "Vishnu",
    email: "vishnu@gmail.com",
    phone: "+91 9123456780",
    company: "NovaTech",

    status: "Onboarding",

    website: "https://novatech.com",

    contractValue: "₹15,000/month",

    onboardingDate: "2026-06-05",
    renewalDate: "2027-05-22",

    assignedTo: "Rahul",

    address: "Kochi, Kerala",

    notes: "Initial website audit pending.",

    projectCount: 1,

    activities: [
      "Client onboarded",
      "Analytics configured",
      "Website access received",
    ],
  },

  3: {
    id: 3,
    leadId: 3,

    name: "Arjun",
    email: "arjun@gmail.com",
    phone: "+91 9988776655",
    company: "Skyline Media",

    status: "Active",

    website: "https://skylinemedia.com",

    contractValue: "₹40,000/month",

    onboardingDate: "2026-05-25",
    renewalDate: "2027-05-18",

    assignedTo: "Vishnu",

    address: "Bangalore, Karnataka",

    notes: "Enterprise SEO package.",

    projectCount: 3,

    activities: [
      "Client onboarded",
      "Technical SEO audit completed",
      "Competitor analysis delivered",
    ],
  },

  4: {
    id: 4,
    leadId: 4,

    name: "Meera",
    email: "meera@gmail.com",
    phone: "+91 9012345678",
    company: "BrightPath",

    status: "Paused",

    website: "https://brightpath.com",

    contractValue: "₹10,000/month",

    onboardingDate: "2026-04-15",
    renewalDate: "2026-12-15",

    assignedTo: "Admin",

    address: "Chennai, Tamil Nadu",

    notes: "Project paused by client.",

    projectCount: 1,

    activities: [
      "Client onboarded",
      "SEO strategy delivered",
      "Project paused",
    ],
  },

  5: {
    id: 5,
    leadId: 5,

    name: "Karthik",
    email: "karthik@gmail.com",
    phone: "+91 9345678901",
    company: "DevSphere",

    status: "Active",

    website: "https://devsphere.com",

    contractValue: "₹30,000/month",

    onboardingDate: "2026-05-14",
    renewalDate: "2027-01-14",

    assignedTo: "Rahul",

    address: "Hyderabad, Telangana",

    notes: "Local SEO and blogging package.",

    projectCount: 2,

    activities: [
      "Client onboarded",
      "Google Business Profile verified",
      "Content strategy delivered",
    ],
  },

  6: {
    id: 6,
    leadId: 6,

    name: "Anjali",
    email: "anjali@gmail.com",
    phone: "+91 9871200345",
    company: "CloudEdge",

    status: "Active",

    website: "https://cloudedge.com",

    contractValue: "₹50,000/month",

    onboardingDate: "2026-05-10",
    renewalDate: "2027-05-10",

    assignedTo: "Vishnu",

    address: "Mumbai, Maharashtra",

    notes: "Full SEO growth package.",

    projectCount: 4,

    activities: [
      "Client onboarded",
      "SEO audit completed",
      "Backlink campaign started",
      "Monthly reporting active",
    ],
  },

};

export const clientTags = [
  '',
  'name',
  'email',
  'company',
  'status',
  'projectCount',
  'contractValue',
  'renewalDate',
];

export const clientsDetailsTags = [
  '',
  'name',
  'email',
  'phone',
  'company',
  'status',
  'website',
  'contractValue',
  'onboardingDate',
  'renewalDate',
  'assignedTo',
  'address',
  'activities',
  'projectCount',
  'notes',
];

export const clientFilters = [
  'All',
  'Active',
  'Paused',
  'Cancelled',
];

export const clientStatuses = [
  'Active',
  'Paused',
  'Cancelled',
];