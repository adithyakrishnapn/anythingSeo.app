export const chartsData = {

  leads: {
    title: "Leads",
    description: "Monthly leads",

    data: [
      { month: "Jan", leads: 400 },
      { month: "Feb", leads: 300 },
      { month: "Mar", leads: 500 },
    ],

    xKey: "month",
    dataKey: "leads",
    chartType: "line",
  },

  revenue: {
    title: "Revenue",
    description: "Monthly revenue",

    data: [
      { month: "Jan", revenue: 1200 },
      { month: "Feb", revenue: 900 },
      { month: "Mar", revenue: 1500 },
    ],

    xKey: "month",
    dataKey: "revenue",
    chartType: "bar",
  },

};