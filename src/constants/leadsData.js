export const leadsData = [

  {
    id: 1,
    name: "Rahul",
    email: "rahul@gmail.com",
    status: "Qualified",
    source: "Instagram",
    value: "₹12,000",
    date: "Today",
  },

  {
    id: 2,
    name: "Vishnu",
    email: "vishnu@gmail.com",
    status: "New",
    source: "SEO",
    value: "₹8,500",
    date: "Yesterday",
  },

  {
    id: 3,
    name: "Arjun",
    email: "arjun@gmail.com",
    status: "Qualified",
    source: "Referral",
    value: "₹22,000",
    date: "2 days ago",
  },

  {
    id: 4,
    name: "Meera",
    email: "meera@gmail.com",
    status: "Lost",
    source: "Facebook Ads",
    value: "₹5,000",
    date: "3 days ago",
  },

  {
    id: 5,
    name: "Karthik",
    email: "karthik@gmail.com",
    status: "New",
    source: "Website",
    value: "₹15,500",
    date: "4 days ago",
  },

  {
    id: 6,
    name: "Anjali",
    email: "anjali@gmail.com",
    status: "Qualified",
    source: "LinkedIn",
    value: "₹30,000",
    date: "5 days ago",
  },

  {
    id: 7,
    name: "Nikhil",
    email: "nikhil@gmail.com",
    status: "Lost",
    source: "Cold Call",
    value: "₹7,000",
    date: "1 week ago",
  },

  {
    id: 8,
    name: "Sneha",
    email: "sneha@gmail.com",
    status: "New",
    source: "Instagram",
    value: "₹18,000",
    date: "1 week ago",
  },

];

export const leadsDetailsData = {

  1: {
    id: 1,
    name: "Rahul",
    email: "rahul@gmail.com",
    phone: "+91 9876543210",
    company: "PixelCraft",
    status: "Qualified",
    source: "Instagram",
    value: "₹12,000",
    assignedTo: "Admin",
    notes: "Interested in CRM automation setup.",
    address: "Trivandrum, Kerala",
    createdAt: "2026-05-20",
    activities: [
      "Lead created",
      "Demo scheduled",
      "Proposal sent",
    ],
  },

  2: {
    id: 2,
    name: "Vishnu",
    email: "vishnu@gmail.com",
    phone: "+91 9123456780",
    company: "NovaTech",
    status: "New",
    source: "SEO",
    value: "₹8,500",
    assignedTo: "Rahul",
    notes: "Requested product demo next week.",
    address: "Kochi, Kerala",
    createdAt: "2026-05-22",
    activities: [
      "Lead created",
      "Initial contact completed",
    ],
  },

  3: {
    id: 3,
    name: "Arjun",
    email: "arjun@gmail.com",
    phone: "+91 9988776655",
    company: "Skyline Media",
    status: "Qualified",
    source: "Referral",
    value: "₹22,000",
    assignedTo: "Vishnu",
    notes: "High priority enterprise client.",
    address: "Bangalore, Karnataka",
    createdAt: "2026-05-18",
    activities: [
      "Lead created",
      "Discovery call completed",
      "Pricing shared",
    ],
  },

  4: {
    id: 4,
    name: "Meera",
    email: "meera@gmail.com",
    phone: "+91 9012345678",
    company: "BrightPath",
    status: "Lost",
    source: "Facebook Ads",
    value: "₹5,000",
    assignedTo: "Admin",
    notes: "Client dropped due to budget issues.",
    address: "Chennai, Tamil Nadu",
    createdAt: "2026-05-15",
    activities: [
      "Lead created",
      "Consultation completed",
      "Lead marked as lost",
    ],
  },

  5: {
    id: 5,
    name: "Karthik",
    email: "karthik@gmail.com",
    phone: "+91 9345678901",
    company: "DevSphere",
    status: "New",
    source: "Website",
    value: "₹15,500",
    assignedTo: "Rahul",
    notes: "Waiting for scheduled callback.",
    address: "Hyderabad, Telangana",
    createdAt: "2026-05-14",
    activities: [
      "Lead created",
      "Inquiry received from website",
    ],
  },

  6: {
    id: 6,
    name: "Anjali",
    email: "anjali@gmail.com",
    phone: "+91 9871200345",
    company: "CloudEdge",
    status: "Qualified",
    source: "LinkedIn",
    value: "₹30,000",
    assignedTo: "Vishnu",
    notes: "Interested in yearly enterprise subscription.",
    address: "Mumbai, Maharashtra",
    createdAt: "2026-05-10",
    activities: [
      "Lead created",
      "LinkedIn conversation started",
      "Proposal under review",
    ],
  },

  7: {
    id: 7,
    name: "Nikhil",
    email: "nikhil@gmail.com",
    phone: "+91 9765432109",
    company: "Fusion Labs",
    status: "Lost",
    source: "Cold Call",
    value: "₹7,000",
    assignedTo: "Admin",
    notes: "No response after follow-ups.",
    address: "Pune, Maharashtra",
    createdAt: "2026-05-08",
    activities: [
      "Lead created",
      "Cold call completed",
      "No further response",
    ],
  },

  8: {
    id: 8,
    name: "Sneha",
    email: "sneha@gmail.com",
    phone: "+91 9087654321",
    company: "MarketFlow",
    status: "New",
    source: "Instagram",
    value: "₹18,000",
    assignedTo: "Rahul",
    notes: "Requested pricing and onboarding details.",
    address: "Delhi, India",
    createdAt: "2026-05-06",
    activities: [
      "Lead created",
      "Instagram DM conversation started",
    ],
  },

};


export const leadsDetailsTags = ['','name','email','phone','company','status', 'source', 'value', 'assignedTo', 'notes', 'address', 'createdAt'];
export const leadTags = ['','name','email','status', 'source', 'value', 'date'];
export const leadFilters = ['All', 'New', 'Qualified', 'Lost'];