import React, { useState, useEffect } from 'react';
import { getClients } from '@/services/client.service';
import { getAllTasks } from '@/services/task.service';
import { getDailyTaskSummary } from '@/services/ai.service';
import { 
  AlertTriangle, 
  Clock, 
  Calendar, 
  TrendingUp, 
  Brain, 
  CheckCircle,
  Sparkles
} from 'lucide-react';

const CACHE_EXPIRY_MS = 15 * 60 * 1000;

function AiDashboard() {
  const [stats, setStats] = useState({
    clientsAtRisk: 0,
    overdueTasks: 0,
    renewalsApproaching: 0,
    upsellOpportunities: 0
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCachedSummaryActions = () => {
    try {
      const cached = localStorage.getItem('daily_task_summary');
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
          return data.recommendedNextActions || [];
        }
      }
    } catch (e) {
      console.error('Error reading task summary cache from dashboard:', e);
    }
    return null;
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Clients and Tasks lists
      const [clientsRes, tasksRes] = await Promise.all([
        getClients(),
        getAllTasks()
      ]);

      const clients = clientsRes?.data || [];
      const tasks = tasksRes?.data || [];

      // Calculate Overdue Tasks
      const today = new Date().setHours(0, 0, 0, 0);
      const overdueTasksList = tasks.filter(t => 
        t.status !== 'Completed' && 
        t.dueDate && 
        new Date(t.dueDate).setHours(0, 0, 0, 0) < today
      );
      const overdueCount = overdueTasksList.length;

      // Calculate Renewals Approaching (within next 30 days)
      const thirtyDaysFromNow = today + 30 * 24 * 3600 * 1000;
      const renewalsList = clients.filter(c => 
        c.renewalDate && 
        new Date(c.renewalDate).getTime() >= today && 
        new Date(c.renewalDate).getTime() <= thirtyDaysFromNow
      );
      const renewalsCount = renewalsList.length;

      // Calculate Upsell Opportunities (clients with renewals in 30-90 days, or contract > 5000)
      const ninetyDaysFromNow = today + 90 * 24 * 3600 * 1000;
      const upsellsList = clients.filter(c => 
        (c.renewalDate && new Date(c.renewalDate).getTime() <= ninetyDaysFromNow) || 
        (c.contractValue && c.contractValue >= 5000)
      );
      const upsellCount = upsellsList.length;

      // Calculate Clients At Risk
      // A client is at risk if they are active/paused AND have renewal approaching or have overdue tasks
      const clientIdsWithOverdue = new Set(
        overdueTasksList
          .map(t => t.relatedTo?._id || t.relatedTo)
          .filter(Boolean)
      );

      const clientsAtRiskList = clients.filter(c => {
        const cId = c._id || c.id;
        const isApproachingRenewal = c.renewalDate && new Date(c.renewalDate).getTime() <= thirtyDaysFromNow;
        const hasOverdueTasks = clientIdsWithOverdue.has(String(cId));
        return c.status !== 'completed' && (isApproachingRenewal || hasOverdueTasks);
      });
      const riskCount = clientsAtRiskList.length;

      setStats({
        clientsAtRisk: riskCount,
        overdueTasks: overdueCount,
        renewalsApproaching: renewalsCount,
        upsellOpportunities: upsellCount
      });

      // 2. Fetch or compute recommended actions
      const cachedActions = getCachedSummaryActions();
      if (cachedActions !== null) {
        setRecommendations(cachedActions);
      } else {
        const summaryRes = await getDailyTaskSummary();
        if (summaryRes && summaryRes.success) {
          const recs = summaryRes.data?.recommendedNextActions || [];
          setRecommendations(recs);
          // Cache the daily summary object so other components can reuse it
          localStorage.setItem(
            'daily_task_summary',
            JSON.stringify({ data: summaryRes.data, timestamp: Date.now() })
          );
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard AI insights:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm min-h-[400px] flex flex-col justify-between">
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-border pb-3 shrink-0">
        <Brain className="h-5 w-5 text-primary" />
        <div>
          <h2 className="text-base font-bold text-foreground">AI CRM Insights</h2>
          <p className="text-xs text-muted-foreground">Workspace alerts and proactive actions</p>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 py-12 flex flex-col items-center justify-center gap-3">
          <div className="relative h-7 w-7">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-2 border-t-primary animate-spin" />
          </div>
          <p className="text-xs text-muted-foreground animate-pulse">Running workspace diagnostics...</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between py-2 space-y-4">
          {/* Diagnostic Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="flex items-center gap-2.5 rounded-xl border border-border bg-muted/20 p-3">
              <div className="rounded-lg bg-rose-500/10 p-2 text-rose-500">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wide">At Risk</span>
                <span className="text-sm font-bold text-foreground">{stats.clientsAtRisk} Clients</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-border bg-muted/20 p-3">
              <div className="rounded-lg bg-orange-500/10 p-2 text-orange-500">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Overdue</span>
                <span className="text-sm font-bold text-foreground">{stats.overdueTasks} Tasks</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-border bg-muted/20 p-3">
              <div className="rounded-lg bg-sky-500/10 p-2 text-sky-500">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Renewals</span>
                <span className="text-sm font-bold text-foreground">{stats.renewalsApproaching} Soon</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-border bg-muted/20 p-3">
              <div className="rounded-lg bg-amber-500/10 p-2 text-amber-500">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Upsell Chance</span>
                <span className="text-sm font-bold text-foreground">{stats.upsellOpportunities} Targets</span>
              </div>
            </div>
          </div>

          {/* Today's Recommended Actions */}
          <div className="flex-1 flex flex-col justify-start space-y-2.5 min-h-[120px]">
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              Today's Recommended Actions
            </h3>
            {recommendations.length > 0 ? (
              <ul className="space-y-1.5">
                {recommendations.slice(0, 3).map((action, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground leading-normal">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="font-medium text-foreground/95">{action}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-muted-foreground italic pt-2">No recommended actions today. Workload is optimal.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AiDashboard;