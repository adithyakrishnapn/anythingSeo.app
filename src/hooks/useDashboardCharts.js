import {useState} from 'react';


export function useDashboardCharts() {
    const [selectedChart, setSelectedChart] = useState("leads");

    return{
        selectedChart,
        setSelectedChart
    }
}


