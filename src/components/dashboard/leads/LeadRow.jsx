import { useState, useEffect } from 'react';
import { getLeads } from '@/services/lead.service';
import RecentLeads from './RecentLeads';

function LeadRow() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusStyles = {
    new: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
    contacted: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    converted: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
    lost: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20",
  };

  useEffect(() => {
    const fetchLeadsData = async () => {
      try {
        const res = await getLeads();
        if (res && res.success) {
          // Sort by newest leads first
          const sortedLeads = (res.data || []).sort((a, b) => 
            new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
          );
          setLeads(sortedLeads.slice(0, 4)); // Show top 4 recent leads
        }
      } catch (error) {
        console.error('Error fetching recent leads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeadsData();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm h-[400px] flex flex-col justify-between">
        <div className="mb-4 animate-pulse h-6 w-1/3 bg-muted rounded" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 animate-pulse bg-muted rounded-xl mt-3" />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm h-[400px] overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-foreground">Recent Leads</h2>
        <p className="text-sm text-muted-foreground">Newest lead activity and contact details</p>
      </div>
      {leads.length > 0 ? (
        leads.map((lead) => {
          const lId = lead._id || lead.id;
          const formattedDate = lead.createdAt 
            ? new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            : 'Recently';

          return (
            <div key={lId} className="mt-4 overflow-hidden min-w-0">
              <RecentLeads
                name={lead.name}
                email={lead.email}
                status={lead.status}
                source={lead.source}
                value={lead.value ? `$${lead.value.toLocaleString()}` : '$0'}
                date={formattedDate}
                statusStyles={statusStyles[String(lead.status).toLowerCase()] || 'bg-muted text-muted-foreground'}
              />
            </div>
          );
        })
      ) : (
        <div className="h-full flex items-center justify-center py-12">
          <p className="text-sm text-muted-foreground italic">No leads found in database.</p>
        </div>
      )}
    </div>
  );
}

export default LeadRow;