import { useState, useEffect } from 'react';
import { getDailyTaskSummary, prioritizeTasks } from '@/services/ai.service';
import { toast } from 'sonner';
import { 
  Sparkles, 
  RefreshCw, 
  Activity, 
  CheckSquare, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  ArrowUpRight 
} from 'lucide-react';

const CACHE_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes cache

function DailyTaskSummaryCard({ onTasksPrioritized }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prioritizing, setPrioritizing] = useState(false);
  const [checkedActions, setCheckedActions] = useState({});

  const getCachedSummary = () => {
    try {
      const cached = localStorage.getItem('daily_task_summary');
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
          return data;
        }
      }
    } catch (e) {
      console.error('Error reading task summary cache:', e);
    }
    return null;
  };

  const setCachedSummary = (data) => {
    try {
      localStorage.setItem(
        'daily_task_summary',
        JSON.stringify({ data, timestamp: Date.now() })
      );
    } catch (e) {
      console.error('Error writing task summary cache:', e);
    }
  };

  const fetchSummary = async (force = false) => {
    if (!force) {
      const cached = getCachedSummary();
      if (cached) {
        setSummary(cached);
        return;
      }
    }

    setLoading(true);
    try {
      const res = await getDailyTaskSummary();
      if (res && res.success) {
        setSummary(res.data);
        setCachedSummary(res.data);
      } else {
        toast.error(res?.message || 'Failed to fetch daily task summary');
      }
    } catch (error) {
      console.error('Error fetching daily task summary:', error);
      toast.error('Could not load AI daily task summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const handleBulkPrioritize = async () => {
    setPrioritizing(true);
    try {
      toast.loading('AI Agent prioritizing pending tasks...', { id: 'bulk-prioritize' });
      const res = await prioritizeTasks();
      toast.dismiss('bulk-prioritize');
      if (res && res.success) {
        toast.success(res.message || 'Tasks prioritized successfully!');
        if (onTasksPrioritized) {
          onTasksPrioritized();
        }
        // Force refresh daily summary since priorities changed
        fetchSummary(true);
      } else {
        toast.error(res?.message || 'Failed to prioritize tasks');
      }
    } catch (error) {
      toast.dismiss('bulk-prioritize');
      console.error('Error prioritizing tasks:', error);
      toast.error('Could not prioritize tasks');
    } finally {
      setPrioritizing(false);
    }
  };

  const toggleAction = (idx) => {
    setCheckedActions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const getWorkloadStyle = (status) => {
    switch (status) {
      case 'Optimal':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Overloaded':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      case 'Under-utilized':
        return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
      {/* Background gradients */}
      <div className="pointer-events-none absolute -right-24 top-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-sky-500/5 blur-3xl" />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-5 border-b border-border pb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight">Today's AI Task Summary</h2>
            <p className="text-xs text-muted-foreground">Team operational health and workload analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleBulkPrioritize}
            disabled={loading || prioritizing}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground transition-all hover:bg-muted focus:outline-none disabled:opacity-50"
          >
            <Activity className={`h-3.5 w-3.5 text-primary ${prioritizing ? 'animate-pulse' : ''}`} />
            Bulk Prioritize Pending
          </button>
          <button
            onClick={() => fetchSummary(true)}
            disabled={loading}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:bg-muted hover:text-foreground focus:outline-none disabled:opacity-50"
            title="Refresh summary"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center gap-3">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-2 border-t-primary animate-spin" />
          </div>
          <p className="text-xs font-medium text-muted-foreground animate-pulse">Analyzing task metrics...</p>
        </div>
      ) : !summary ? (
        <div className="py-10 text-center">
          <p className="text-sm text-muted-foreground">No AI Task summary available.</p>
          <button
            onClick={() => fetchSummary(true)}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Load Task Summary
          </button>
        </div>
      ) : (
        <div className="space-y-6 relative">
          {/* Top grid metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border border-border p-3.5 bg-muted/15 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <CheckSquare className="h-3 w-3 text-primary" />
                Workload
              </span>
              <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-bold border ${getWorkloadStyle(summary.workloadStatus)}`}>
                {summary.workloadStatus}
              </span>
            </div>

            <div className="rounded-xl border border-border p-3.5 bg-muted/15 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <AlertTriangle className="h-3 w-3 text-rose-500" />
                Overdue
              </span>
              <p className="text-xl font-extrabold text-foreground">{summary.overdueCount}</p>
            </div>

            <div className="rounded-xl border border-border p-3.5 bg-muted/15 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Clock className="h-3 w-3 text-yellow-500" />
                Due Today
              </span>
              <p className="text-xl font-extrabold text-foreground">{summary.dueTodayCount}</p>
            </div>

            <div className="rounded-xl border border-border p-3.5 bg-muted/15 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                Active Analysis
              </span>
              <p className="text-xs font-medium text-muted-foreground leading-snug">
                {summary.statusAnalysis || 'Tasks in progress.'}
              </p>
            </div>
          </div>

          {/* AI Narrative summary */}
          <div className="rounded-xl border border-border p-4 bg-muted/5 leading-relaxed text-sm text-muted-foreground">
            {summary.dailySummary}
          </div>

          {/* Recommended actions checklist */}
          {summary.recommendedNextActions && summary.recommendedNextActions.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recommended Next Actions</h3>
              <div className="space-y-2">
                {summary.recommendedNextActions.map((action, index) => (
                  <div
                    key={index}
                    onClick={() => toggleAction(index)}
                    className="flex items-start gap-3 p-3 rounded-xl border border-border bg-background hover:bg-muted/10 cursor-pointer transition-colors"
                  >
                    <div className="mt-0.5 shrink-0">
                      <div className={`h-4.5 w-4.5 rounded-md border flex items-center justify-center transition-all ${checkedActions[index] ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background'}`}>
                        {checkedActions[index] && (
                          <svg className="h-3 w-3 fill-none stroke-current stroke-[3]" viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <p className={`text-xs leading-normal font-medium ${checkedActions[index] ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                      {action}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DailyTaskSummaryCard;
