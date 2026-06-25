import React from 'react'
import ChartCards from './ChartCards'
import { useDashboardCharts } from '@/hooks/useDashboardCharts';
import { chartsData } from '@/constants/charts';
import { useTheme } from '@/context/ThemeProvider';

function DashboardCharts() {
    const { selectedChart, setSelectedChart } = useDashboardCharts();

    const {theme} = useTheme();
    const chartData = chartsData[selectedChart];

    return (
        <div className='rounded-2xl border border-border bg-card p-5 shadow-sm'>
            <div className="rounded-xl border border-border bg-background/80 p-4">
                <ChartCards
                    title={chartData.title}
                    description={chartData.description}
                    data={chartData.data}
                    dataKey={chartData.dataKey}
                    xKey={chartData.xKey}
                    chartType={chartData.chartType}
                />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
                {Object.keys(chartsData).map((key) => (
                    <button
                        key={key}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${theme === 'dark' ? (selectedChart === key ? 'bg-white text-black' : 'border border-border bg-background text-foreground hover:bg-muted') : (selectedChart === key ? 'bg-primary text-primary-foreground' : 'border border-border bg-background text-foreground hover:bg-muted')}`}
                        onClick={() => setSelectedChart(key)}
                    >
                        {chartsData[key].title}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default DashboardCharts