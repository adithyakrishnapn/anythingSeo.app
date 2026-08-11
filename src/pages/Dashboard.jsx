import React from 'react'

import ActivityFeeds from '../components/dashboard/activity/ActivityFeeds'
import AIInsights from '../components/dashboard/ai/AIInsights'
import DashboardStats from '../components/dashboard/stats/DashboardStats'
import DashboardCharts from '../components/dashboard/charts/DashboardCharts'
import LeadRow from '../components/dashboard/leads/LeadRow'
import TaskPanel from '../components/dashboard/tasks/TaskPanel'
import AiDashboard from '@/components/dashboard/ai/AIDashboard'

function Dashboard() {

  return (

    <div className="relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-background via-background to-muted/30 p-6 shadow-sm">

      <div className="pointer-events-none absolute -right-24 top-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />

      {/* HEADING */}
      <div className="relative space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Overview</p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Track leads, projects, tasks, and activity from one clean workspace.
        </p>
      </div>

      {/* DASHBOARD GRID */}
      <div className="relative grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* LEFT SECTION */}
        <div className="xl:col-span-2 flex flex-col gap-6">

          {/* STATS */}
          <DashboardStats />

          {/* CHART + TASKS */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            <DashboardCharts />

            <TaskPanel />

          </div>

          {/* LEADS + AI */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            <LeadRow />

            <AiDashboard />

          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col gap-6">

          <ActivityFeeds />

        </div>

      </div>

    </div>

  )
}

export default Dashboard