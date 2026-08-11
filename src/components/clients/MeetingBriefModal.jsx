import { Button } from '@/components/ui/button';
import { 
  X, 
  Presentation, 
  Layers, 
  CheckSquare, 
  AlertTriangle, 
  Lightbulb, 
  MessageSquare, 
  History 
} from 'lucide-react';

function MeetingBriefModal({ isOpen, onClose, client, meetingBrief, clientAnalysis }) {
  if (!isOpen) return null;

  // Recent activities from the client data
  const activities = client?.activities || [];
  
  // Opportunities from the client health analysis if available
  const opportunities = clientAnalysis?.opportunities || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-border bg-card p-6 text-foreground shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in-50 zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close popup"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="space-y-1 mb-4 shrink-0">
          <div className="flex items-center gap-2">
            <Presentation className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold tracking-tight">AI Meeting Brief</h2>
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Preparation briefing for {client.name} — {client.company}
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-5 pr-2">
          {/* Summary / Overview */}
          <div className="rounded-xl border border-border bg-muted/20 p-4">
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
              <span>Client Relationship Summary</span>
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {meetingBrief?.summary || 'No summary available.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Active Projects */}
            <div className="rounded-xl border border-border p-4">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-1.5 text-foreground">
                <Layers className="h-4 w-4 text-sky-500" />
                Active Projects
              </h4>
              {meetingBrief?.activeProjects && meetingBrief.activeProjects.length > 0 ? (
                <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4">
                  {meetingBrief.activeProjects.map((proj, idx) => (
                    <li key={idx} className="leading-normal">{proj}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground italic">No active projects.</p>
              )}
            </div>

            {/* Pending Tasks */}
            <div className="rounded-xl border border-border p-4">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-1.5 text-foreground">
                <CheckSquare className="h-4 w-4 text-emerald-500" />
                Pending Tasks
              </h4>
              {meetingBrief?.pendingTasks && meetingBrief.pendingTasks.length > 0 ? (
                <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4">
                  {meetingBrief.pendingTasks.map((task, idx) => (
                    <li key={idx} className="leading-normal">{task}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground italic">No pending tasks.</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Recent Activities */}
            <div className="rounded-xl border border-border p-4">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-1.5 text-foreground">
                <History className="h-4 w-4 text-indigo-500" />
                Recent Activities
              </h4>
              {activities.length > 0 ? (
                <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4">
                  {activities.slice(0, 5).map((act, idx) => (
                    <li key={idx} className="leading-normal">{act}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground italic">No recent activities.</p>
              )}
            </div>

            {/* Opportunities */}
            <div className="rounded-xl border border-border p-4">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-1.5 text-foreground">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                Opportunities
              </h4>
              {opportunities.length > 0 ? (
                <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4">
                  {opportunities.map((opp, idx) => (
                    <li key={idx} className="leading-normal">{opp}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground italic">No opportunities identified.</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Risks */}
            {meetingBrief?.risks && meetingBrief.risks.length > 0 && (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
                <h4 className="text-sm font-semibold mb-2.5 flex items-center gap-1.5 text-rose-700 dark:text-rose-400">
                  <AlertTriangle className="h-4 w-4 text-rose-500" />
                  Key Risks
                </h4>
                <ul className="space-y-1.5 text-xs text-rose-700/80 dark:text-rose-300/80 list-disc pl-4">
                  {meetingBrief.risks.map((risk, idx) => (
                    <li key={idx} className="leading-normal">{risk}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggested Discussion Points */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <h4 className="text-sm font-semibold mb-2.5 flex items-center gap-1.5 text-primary">
                <MessageSquare className="h-4 w-4" />
                Suggested Talking Points
              </h4>
              {meetingBrief?.recommendedDiscussionPoints && meetingBrief.recommendedDiscussionPoints.length > 0 ? (
                <ul className="space-y-2 text-xs leading-normal list-decimal pl-4">
                  {meetingBrief.recommendedDiscussionPoints.map((point, idx) => (
                    <li key={idx} className="text-foreground/90 font-medium pl-1">
                      {point}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground italic">No talking points generated.</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 shrink-0 flex items-center justify-end gap-3 pt-3 border-t">
          <Button
            type="button"
            className="bg-primary text-primary-foreground hover:opacity-90"
            onClick={onClose}
          >
            Close Brief
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MeetingBriefModal;
