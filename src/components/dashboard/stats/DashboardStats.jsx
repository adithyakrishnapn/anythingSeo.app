import React from 'react'
import StatsCard from './StatsCard'

function DashboardStats() {
    
    const statsData = [
  {
    title: "Total Leads",
    value: "1,245",
    growth: "+12%",
    icon: "👥"
  },
  {
    title: "Revenue",
    value: "$12,450",
    growth: "+8%",
    icon: "💰"
  },
  {
    title: "Conversion Rate",
    value: "5.2%",
    growth: "+0.5%",
    icon: "📈"
  }
];
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {statsData.map((stat, index) => (
            <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                growth={stat.growth}
                icon={stat.icon}
            />
        ))}
    </div>
  )
}

export default DashboardStats