import React from 'react'
import AiDashboard from '@/components/dashboard/ai/AiDashboard'

function AiInsightsPage() {
  return (
    <div className="relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-background via-background to-muted/30 p-6 shadow-sm">
      <div className="pointer-events-none absolute -right-24 top-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Insights</p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">AI Insights</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Review the latest alerts and suggestions generated from your workspace activity.
        </p>
      </div>

      <div className="relative max-w-3xl">
        <AiDashboard />
      </div>
    </div>
  )
}

export default AiInsightsPage