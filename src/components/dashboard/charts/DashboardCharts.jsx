import { useState, useEffect } from 'react';
import ChartCards from './ChartCards';
import { useDashboardCharts } from '@/hooks/useDashboardCharts';
import { getClients } from '@/services/client.service';
import { getLeads } from '@/services/lead.service';
import { useTheme } from '@/context/ThemeProvider';

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function DashboardCharts() {
  const { selectedChart, setSelectedChart } = useDashboardCharts();
  const { theme } = useTheme();
  
  const [charts, setCharts] = useState({
    leads: {
      title: "Leads",
      description: "Monthly leads",
      data: [
        { month: "Jan", leads: 0 },
        { month: "Feb", leads: 0 },
        { month: "Mar", leads: 0 }
      ],
      xKey: "month",
      dataKey: "leads",
      chartType: "line"
    },
    revenue: {
      title: "Revenue",
      description: "Monthly revenue",
      data: [
        { month: "Jan", revenue: 0 },
        { month: "Feb", revenue: 0 },
        { month: "Mar", revenue: 0 }
      ],
      xKey: "month",
      dataKey: "revenue",
      chartType: "bar"
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const [clientsRes, leadsRes] = await Promise.all([
          getClients(),
          getLeads()
        ]);

        const clients = clientsRes?.data || [];
        const leads = leadsRes?.data || [];

        // Group leads by month
        const leadsByMonth = {};
        leads.forEach(lead => {
          const date = new Date(lead.createdAt || Date.now());
          const mName = MONTH_NAMES[date.getMonth()];
          leadsByMonth[mName] = (leadsByMonth[mName] || 0) + 1;
        });

        // Group revenue (client contractValue) by onboarding month
        const revenueByMonth = {};
        clients.forEach(client => {
          const date = new Date(client.onBoardingDate || Date.now());
          const mName = MONTH_NAMES[date.getMonth()];
          revenueByMonth[mName] = (revenueByMonth[mName] || 0) + (client.contractValue || 0);
        });

        // Build list of months to show (e.g. current month and last 5 months, or just months containing data)
        // Let's gather all months that actually have data, or default to the last 6 months.
        const currentMonthIdx = new Date().getMonth();
        const displayMonths = [];
        for (let i = 5; i >= 0; i--) {
          const idx = (currentMonthIdx - i + 12) % 12;
          displayMonths.push(MONTH_NAMES[idx]);
        }

        const leadsDataList = displayMonths.map(m => ({
          month: m,
          leads: leadsByMonth[m] || 0
        }));

        const revenueDataList = displayMonths.map(m => ({
          month: m,
          revenue: revenueByMonth[m] || 0
        }));

        setCharts({
          leads: {
            title: "Leads",
            description: "Monthly lead generation",
            data: leadsDataList,
            xKey: "month",
            dataKey: "leads",
            chartType: "line"
          },
          revenue: {
            title: "Revenue",
            description: "Monthly contract onboarding revenue",
            data: revenueDataList,
            xKey: "month",
            dataKey: "revenue",
            chartType: "bar"
          }
        });
      } catch (error) {
        console.error('Error loading dashboard chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) {
    return (
      <div className="h-[300px] animate-pulse rounded-2xl border border-border bg-card p-5" />
    );
  }

  const activeChart = charts[selectedChart] || charts.leads;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="rounded-xl border border-border bg-background/80 p-4">
        <ChartCards
          title={activeChart.title}
          description={activeChart.description}
          data={activeChart.data}
          dataKey={activeChart.dataKey}
          xKey={activeChart.xKey}
          chartType={activeChart.chartType}
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {Object.keys(charts).map((key) => (
          <button
            key={key}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${theme === 'dark' ? (selectedChart === key ? 'bg-white text-black' : 'border border-border bg-background text-foreground hover:bg-muted') : (selectedChart === key ? 'bg-primary text-primary-foreground' : 'border border-border bg-background text-foreground hover:bg-muted')}`}
            onClick={() => setSelectedChart(key)}
          >
            {charts[key].title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DashboardCharts;