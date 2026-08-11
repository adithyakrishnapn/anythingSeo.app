import { useState, useEffect } from 'react';
import { analyzeTask } from '@/services/ai.service';
import { updateTask } from '@/services/task.service';
import { toast } from 'sonner';
import { Brain, Sparkles, Check, RefreshCw, AlertCircle, ArrowUpRight } from 'lucide-react';

const CACHE_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes cache

function TaskAIIntelligence({ task, onPriorityUpdated }) {
  const taskId = task?._id || task?.id;
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const getCachedAnalysis = () => {
    try {
      const cached = localStorage.getItem(`task_analysis_${taskId}`);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
          return data;
        }
      }
    } catch (e) {
      console.error('Error reading task analysis cache:', e);
    }
    return null;
  };

  const setCachedAnalysis = (data) => {
    try {
      localStorage.setItem(
        `task_analysis_${taskId}`,
        JSON.stringify({ data, timestamp: Date.now() })
      );
    } catch (e) {
      console.error('Error writing task analysis cache:', e);
    }
  };

  const runAnalysis = async (force = false) => {
    if (!force) {
      const cached = getCachedAnalysis();
      if (cached) {
        setAnalysis(cached);
        return;
      }
    }

    setLoading(true);
    try {
      toast.loading('Analyzing task context with AI...');
      const res = await analyzeTask(taskId);
      toast.dismiss();
      if (res && res.success) {
        setAnalysis(res.data);
        setCachedAnalysis(res.data);
        toast.success('AI task analysis generated successfully');
      } else {
        toast.error(res?.message || 'Failed to analyze task');
      }
    } catch (error) {
      toast.dismiss();
      console.error('Error running task analysis:', error);
      toast.error('Could not generate AI task analysis');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (taskId) {
      // Just check cache on load, do not force-generate unless clicked, keeping it user-controlled.
      const cached = getCachedAnalysis();
      if (cached) {
        setAnalysis(cached);
      }
    }
  }, [taskId]);

  const handleApplyPriority = async () => {
    if (!analysis || !analysis.priority) return;

    setUpdating(true);
    try {
      // Fetch full task data and update priority
      const res = await updateTask(taskId, {
        ...task,
        priority: analysis.priority
      });
      if (res && res.success) {
        toast.success(`Task priority updated to ${analysis.priority}`);
        if (onPriorityUpdated) {
          onPriorityUpdated();
        }
        // Update cached analysis priority to match current to hide button
        const updatedAnalysis = { ...analysis };
        setAnalysis(updatedAnalysis);
        setCachedAnalysis(updatedAnalysis);
      } else {
        toast.error(res?.message || 'Failed to update priority');
      }
    } catch (error) {
      console.error('Error applying priority:', error);
      toast.error('Error applying priority recommendation');
    } finally {
      setUpdating(false);
    }
  };

  const getPriorityBadgeStyle = (priority) => {
    switch (priority) {
      case 'Low':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Medium':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20';
      case 'High':
        return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20';
      case 'Critical':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const isDifferentPriority = analysis && task && analysis.priority !== task.priority;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm relative overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 blur-2xl" />

      {/* Header */}
      <div className="flex items-center justify-between mb-5 border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Task Analysis</h3>
            <p className="text-xs text-muted-foreground">Priority recommendations and impact insights</p>
          </div>
        </div>
        <button
          onClick={() => runAnalysis(true)}
          disabled={loading}
          className="inline-flex h-8 px-3 items-center gap-1.5 rounded-lg border border-border bg-background text-xs font-semibold text-foreground transition-all hover:bg-muted focus:outline-none"
        >
          <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
          {analysis ? 'Re-Analyze' : 'Analyze Task'}
        </button>
      </div>

      {!analysis ? (
        <div className="py-8 text-center space-y-3">
          <p className="text-sm text-muted-foreground">Generate AI priority recommendation and reason analysis.</p>
          <button
            onClick={() => runAnalysis(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity focus:outline-none"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Analyze Now
          </button>
        </div>
      ) : (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          {/* Priority comparison */}
          <div className="grid grid-cols-2 gap-4 rounded-xl border border-border p-4 bg-muted/10">
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Current Priority</p>
              <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-bold border ${getPriorityBadgeStyle(task.priority)}`}>
                {task.priority}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">AI Recommended</p>
              <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-bold border ${getPriorityBadgeStyle(analysis.priority)}`}>
                {analysis.priority}
              </span>
            </div>
          </div>

          {/* Reason list */}
          {analysis.reason && analysis.reason.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5 text-muted-foreground" />
                AI Priority Reasoning
              </span>
              <ul className="space-y-1.5 pl-1">
                {analysis.reason.map((r, index) => (
                  <li key={index} className="text-xs text-muted-foreground flex items-start gap-1.5 leading-normal">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommended Action */}
          <div className="rounded-xl border border-primary/10 bg-primary/5 p-4">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">Recommended Next Step</span>
            <p className="text-xs font-medium text-foreground leading-normal">{analysis.recommendedAction}</p>
          </div>

          {/* Apply recommendation button */}
          {isDifferentPriority && (
            <button
              onClick={handleApplyPriority}
              disabled={updating}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-600/90 text-white px-4 py-2 text-xs font-semibold shadow-sm focus:outline-none disabled:opacity-50 transition-colors"
            >
              <ArrowUpRight className="h-4.5 w-4.5" />
              {updating ? 'Applying Priority...' : `Apply AI Recommended Priority (${analysis.priority})`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default TaskAIIntelligence;
