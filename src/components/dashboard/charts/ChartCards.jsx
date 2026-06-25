import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

function ChartCards({
  title,
  description,
  data,
  dataKey,
  xKey,
  chartType = "line",
}) {

  const renderChart = () => {

    switch(chartType){

      case "bar":
        return (
          <BarChart data={data}>
            <XAxis dataKey={xKey} />
            <Tooltip />
            <Bar
              dataKey={dataKey}
              fill="#8884d8"
            />
          </BarChart>
        )

      case "line":
      default:
        return (
          <LineChart data={data}>
            <XAxis dataKey={xKey} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#8884d8"
            />
          </LineChart>
        )
    }
  }

  return (
    <Card className="border-0 bg-transparent shadow-none">

      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
      </CardHeader>

      <CardContent>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          {renderChart()}
        </ResponsiveContainer>

      </CardContent>

    </Card>
  )
}

export default ChartCards