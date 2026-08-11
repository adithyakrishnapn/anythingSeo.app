import { useState, useEffect } from 'react';
import ActivityList from "./ActivityList";
import { getLeads } from '@/services/lead.service';
import { getClients } from '@/services/client.service';
import { getAllTasks } from '@/services/task.service';

function ActivityFeeds() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const [leadsRes, clientsRes, tasksRes] = await Promise.all([
          getLeads(),
          getClients(),
          getAllTasks()
        ]);

        const leads = leadsRes?.data || [];
        const clients = clientsRes?.data || [];
        const tasks = tasksRes?.data || [];

        const allActivities = [];

        // 1. Gather Lead activities
        leads.forEach(lead => {
          const lName = lead.name;
          const date = new Date(lead.createdAt || Date.now());
          
          // Core Lead Creation Activity
          allActivities.push({
            type: "lead",
            action: `New lead added: ${lName} (${lead.company || ''})`,
            createdAt: date
          });

          // Custom activities
          if (Array.isArray(lead.activities)) {
            lead.activities.forEach(act => {
              allActivities.push({
                type: "lead",
                action: `${lName}: ${act}`,
                createdAt: date
              });
            });
          }
        });

        // 2. Gather Client activities
        clients.forEach(client => {
          const cName = client.name;
          const date = new Date(client.onBoardingDate || Date.now());

          // Core Onboarding Activity
          allActivities.push({
            type: "meeting", // mapped to meeting or custom type icon
            action: `Client onboarding: ${cName} (${client.company || ''})`,
            createdAt: date
          });

          // Custom activities
          if (Array.isArray(client.activities)) {
            client.activities.forEach(act => {
              allActivities.push({
                type: "meeting",
                action: `${cName}: ${act}`,
                createdAt: date
              });
            });
          }
        });

        // 3. Gather Task activities
        tasks.forEach(task => {
          const tTitle = task.title;
          const date = new Date(task.updatedAt || task.createdAt || Date.now());

          // Task Created Activity
          allActivities.push({
            type: "task",
            action: `Task created: ${tTitle} (Status: ${task.status})`,
            createdAt: date
          });

          // Custom activities
          if (Array.isArray(task.activities)) {
            task.activities.forEach(act => {
              allActivities.push({
                type: "task",
                action: `${tTitle}: ${act}`,
                createdAt: date
              });
            });
          }
        });

        // Sort by date descending
        const sorted = allActivities.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        setActivities(sorted.slice(0, 5)); // Show top 5 activities

      } catch (error) {
        console.error('Error fetching recent activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
        <p className="text-sm text-muted-foreground">Latest workspace updates</p>
      </div>

      {/* ACTIVITIES */}
      <div className="space-y-3">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="h-12 animate-pulse bg-muted rounded-xl" />
          ))
        ) : activities.length > 0 ? (
          activities.map((act, index) => {
            const formattedTime = act.createdAt 
              ? new Date(act.createdAt).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })
              : 'Recently';

            return (
              <ActivityList
                key={index}
                type={act.type}
                message={act.action}
                time={formattedTime}
              />
            );
          })
        ) : (
          <p className="text-xs text-muted-foreground italic py-4 text-center">No recent activities recorded.</p>
        )}
      </div>
    </div>
  );
}

export default ActivityFeeds;