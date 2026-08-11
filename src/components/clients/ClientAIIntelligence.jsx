import { useState, useEffect } from 'react';
import { analyzeClient, generateMeetingSummary } from '@/services/ai.service';
import QuickTaskModal from './QuickTaskModal';
import MeetingBriefModal from './MeetingBriefModal';
import { toast } from 'sonner';
import { 
  Brain, 
  RefreshCw, 
  ShieldAlert, 
  Calendar, 
  CheckCircle, 
  ChevronRight, 
  Zap, 
  ClipboardList, 
  Sparkles,
  Play
} from 'lucide-react';

const CACHE_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes cache

function ClientAIIntelligence({ client }) {
  const clientId = client?._id || client?.id;
  const [analysis, setAnalysis] = useState(null);
  const [meetingBrief, setMeetingBrief] = useState(null);
  const [loading, setLoading] = useState(false);
  const [meetingLoading, setMeetingLoading] = useState(false);
  
  // Modals state
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const [briefModalOpen, setBriefModalOpen] = useState(false);

  const getCachedAnalysis = () => {
    try {
      const cached = localStorage.getItem(`client_analysis_${clientId}`);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
          return data;
        }
      }
    } catch (e) {
      console.error('Error reading client analysis cache:', e);
    }
    return null;
  };

  const setCachedAnalysis = (data) => {
    try {
      localStorage.setItem(
        `client_analysis_${clientId}`,
        JSON.stringify({ data, timestamp: Date.now() })
      );
    } catch (e) {
      console.error('Error writing client analysis cache:', e);
    }
  };

  const getCachedMeetingBrief = () => {
    try {
      const cached = localStorage.getItem(`client_brief_${clientId}`);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
          return data;
        }
      }
    } catch (e) {
      console.error('Error reading client meeting brief cache:', e);
    }
    return null;
  };

  const setCachedMeetingBrief = (data) => {
    try {
      localStorage.setItem(
        `client_brief_${clientId}`,
        JSON.stringify({ data, timestamp: Date.now() })
      );
    } catch (e) {
      console.error('Error writing client meeting brief cache:', e);
    }
  };

  const fetchAnalysis = async (force = false) => {
    if (!force) {
      const cached = getCachedAnalysis();
      if (cached) {
        setAnalysis(cached);
        return;
      }
    }

    setLoading(true);
    try {
      const res = await analyzeClient(clientId);
      if (res && res.success) {
        setAnalysis(res.data);
        setCachedAnalysis(res.data);
        toast.success('AI Client intelligence loaded successfully');
      } else {
        toast.error(res?.message || 'Failed to analyze client');
      }
    } catch (error) {
      console.error('Error fetching client analysis:', error);
      toast.error('Could not load AI client intelligence');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clientId) {
      fetchAnalysis();
      const cachedBrief = getCachedMeetingBrief();
      if (cachedBrief) {
        setMeetingBrief(cachedBrief);
      }
    }
  }, [clientId]);

  const handleGenerateMeetingBrief = async () => {
    const cached = getCachedMeetingBrief();
    if (cached) {
      setMeetingBrief(cached);
      setBriefModalOpen(true);
      return;
    }

    setMeetingLoading(true);
    try {
      toast.loading('Generating Meeting Brief with AI...');
      const res = await generateMeetingSummary(clientId);
      toast.dismiss();
      if (res && res.success) {
        setMeetingBrief(res.data);
        setCachedMeetingBrief(res.data);
        setBriefModalOpen(true);
        toast.success('Meeting brief generated successfully');
      } else {
        toast.error(res?.message || 'Failed to generate brief');
      }
    } catch (error) {
      toast.dismiss();
      console.error('Error generating meeting brief:', error);
      toast.error('Could not generate meeting brief');
    } finally {
      setMeetingLoading(false);
    }
  };

  // Remaining days calculation for renewals
  const renewalDate = client?.renewalDate ? new Date(client.renewalDate) : null;
  const daysRemaining = renewalDate
    ? Math.ceil((renewalDate.getTime() - Date.now()) / (1000 * 3600 * 24))
    : null;

  const getHealthBadgeStyle = (health) => {
    switch (health) {
      case 'Healthy':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'At Risk':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20';
      case 'Inactive':
        return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
      case 'Critical':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getRiskScoreColor = (score) => {
    if (score < 30) return 'bg-emerald-500';
    if (score < 60) return 'bg-yellow-500';
    if (score < 80) return 'bg-orange-500';
    return 'bg-rose-500';
  };

  return (
    <div className="space-y-6">
      {/* Modals */}
      <QuickTaskModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        client={client}
        recommendation={selectedAction}
      />
      <MeetingBriefModal
        isOpen={briefModalOpen}
        onClose={() => setBriefModalOpen(false)}
        client={client}
        meetingBrief={meetingBrief}
        clientAnalysis={analysis}
      />

      {/* Main card */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
        {/* Glow Effects */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-sky-500/5 blur-2xl" />

        {/* Card Header */}
        <div className="relative flex items-center justify-between mb-6 flex-wrap gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight">AI Client Intelligence</h3>
              <p className="text-xs text-muted-foreground">AI-powered health status and business insights</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerateMeetingBrief}
              disabled={loading || meetingLoading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground transition-all hover:bg-muted focus:outline-none"
            >
              <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              Generate Meeting Brief
            </button>
            <button
              onClick={() => fetchAnalysis(true)}
              disabled={loading}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:bg-muted hover:text-foreground focus:outline-none disabled:opacity-50"
              title="Refresh analysis"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
              <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin" />
            </div>
            <p className="text-sm font-medium text-muted-foreground animate-pulse">Analyzing client success metrics...</p>
          </div>
        ) : !analysis ? (
          <div className="py-10 text-center">
            <p className="text-sm text-muted-foreground">No AI Client analysis available.</p>
            <button
              onClick={() => fetchAnalysis(true)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Generate Intelligence
            </button>
          </div>
        ) : (
          <div className="space-y-6 relative">
            {/* Top Grid: Health/Risk & Renewal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Health and Risk Score Card */}
              <div className="rounded-xl border border-border p-4 bg-muted/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client Health</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getHealthBadgeStyle(analysis.health)}`}>
                    {analysis.health}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-muted-foreground">AI Risk Score</span>
                    <span className="text-xl font-extrabold text-foreground">{analysis.riskScore}/100</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${getRiskScoreColor(analysis.riskScore)}`}
                      style={{ width: `${analysis.riskScore}%` }}
                    />
                  </div>
                </div>

                {analysis.risks && analysis.risks.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <ShieldAlert className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                      Identified Risks
                    </span>
                    <ul className="space-y-1">
                      {analysis.risks.map((risk, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-start gap-1.5 leading-normal">
                          <span className="mt-1 h-1 w-1 rounded-full bg-rose-500 shrink-0" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Renewal Intelligence Card */}
              <div className="rounded-xl border border-border p-4 bg-muted/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Renewal Intelligence</span>
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>

                  {renewalDate ? (
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <p className="text-sm font-medium text-foreground">{renewalDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                        {daysRemaining !== null && (
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${daysRemaining < 30 ? 'bg-rose-500/10 text-rose-500' : 'bg-green-500/10 text-green-600'}`}>
                            {daysRemaining} days remaining
                          </span>
                        )}
                      </div>
                      
                      <div className="rounded-lg bg-background p-2.5 border border-border mt-3 text-xs leading-normal">
                        <p className="font-semibold text-primary mb-1">AI Recommendation:</p>
                        <p className="text-muted-foreground">
                          {daysRemaining < 30 
                            ? 'Renewal window is critical. Start renewal and upsell discussions this week immediately.'
                            : daysRemaining < 90
                            ? 'Start scheduling informal relationship reviews to prepare for upcoming renewal.'
                            : 'Monitor client milestones. Current contract is active with healthy buffer.'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">No renewal date specified for this client.</p>
                  )}
                </div>

                {analysis.opportunities && analysis.opportunities.length > 0 && (
                  <div className="space-y-1.5 mt-4">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-amber-500" />
                      Upsell Opportunities
                    </span>
                    <ul className="space-y-1">
                      {analysis.opportunities.slice(0, 2).map((opp, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-start gap-1.5 leading-normal">
                          <span className="mt-1 h-1 w-1 rounded-full bg-amber-500 shrink-0" />
                          {opp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* AI Summary Section */}
            <div className="rounded-xl border border-border p-4 bg-muted/5">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ClipboardList className="h-3.5 w-3.5" />
                AI Relationship Summary
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {analysis.summary}
              </p>
            </div>

            {/* Recommended Actions Panel */}
            {analysis.recommendedActions && analysis.recommendedActions.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI Recommended Actions</h4>
                <div className="space-y-2">
                  {analysis.recommendedActions.map((action, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between gap-4 p-3 rounded-xl border border-border bg-background hover:bg-muted/10 transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle className="h-4.5 w-4.5 text-primary mt-0.5 shrink-0" />
                        <p className="text-sm font-medium leading-normal">{action}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            setSelectedAction(action);
                            setTaskModalOpen(true);
                          }}
                          className="rounded-lg bg-primary/10 hover:bg-primary/20 px-3 py-1.5 text-xs font-bold text-primary transition-colors focus:outline-none"
                        >
                          Create Task
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientAIIntelligence;
