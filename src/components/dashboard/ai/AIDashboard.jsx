import { aiInsights }
from "@/constants/aiInsights";

import AIInsights
from "./AIInsights";

function AIDashboard() {

  return (

    <div className="
      space-y-4
      rounded-2xl
      border border-border
      bg-card
      p-5
      shadow-sm
      h-[400px]
      overflow-y-auto
    ">

      <div>
        <h2 className="text-xl font-bold text-foreground">AI Insights</h2>
        <p className="text-sm text-muted-foreground">Suggestions and alerts from your workspace</p>
      </div>

      {aiInsights.map((insight) => (

        <AIInsights
          key={insight.id}
          type={insight.type}
          title={insight.title}
          description={insight.description}
        />

      ))}

    </div>

  );
}

export default AIDashboard;