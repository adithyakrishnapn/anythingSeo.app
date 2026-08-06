import {
    Calendar,
    Target,
    AlertTriangle,
    CheckCircle2,
    Brain,
    TrendingUp,
    Star
} from "lucide-react";
import { Button } from "../ui/button";

function LeadAIAnalysisCard({ analysis, analyzeGenerate }) {

    if (!analysis) {
        return (
            <div
                className="
                rounded-xl
                border
                border-border
                bg-card
                p-6
                shadow-sm
                "
            >
                <h2 className="text-lg font-semibold">
                    AI Lead Analysis
                </h2>

                <p className="mt-4 text-sm text-muted-foreground">
                    No AI analysis available for this lead.
                </p>
                <div className="mt-4">
                    <Button onClick={analyzeGenerate} >Generate Analysis</Button>
                </div>
            </div>
        );
    }

    const priorityColor = {
        High: "bg-red-500",
        Medium: "bg-yellow-500",
        Low: "bg-green-500"
    };

    const riskColor = {
        High: "bg-red-500",
        Medium: "bg-yellow-500",
        Low: "bg-green-500"
    };

    return (
        <div
            className="
            rounded-xl
            border
            border-border
            bg-card
            p-6
            shadow-sm
            "
        >

            <div className="flex items-center gap-2 mb-6">

                <Brain className="h-5 w-5 text-primary" />

                <h2 className="text-lg font-semibold">
                    AI Lead Analysis
                </h2>

            </div>

            {/* SCORE */}

            <div className="mb-6">

                <div className="flex justify-between mb-2">

                    <span className="text-sm font-medium">
                        Lead Score
                    </span>

                    <span className="font-bold">
                        {analysis.score}/100
                    </span>

                </div>

                <div className="h-3 rounded-full bg-muted overflow-hidden">

                    <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{
                            width: `${analysis.score}%`
                        }}
                    />

                </div>

            </div>

            <div className="grid md:grid-cols-2 gap-4">

                {/* Priority */}

                <div className="rounded-lg border p-4">

                    <div className="flex items-center gap-2 mb-2">

                        <Star className="h-4 w-4" />

                        <span className="font-medium">
                            Priority
                        </span>

                    </div>

                    <span
                        className={`
                            inline-flex
                            items-center
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            text-white
                            ${priorityColor[analysis.priority]}
                        `}
                    >
                        {analysis.priority}
                    </span>

                </div>

                {/* Conversion */}

                <div className="rounded-lg border p-4">

                    <div className="flex items-center gap-2 mb-2">

                        <TrendingUp className="h-4 w-4" />

                        <span className="font-medium">
                            Conversion Chance
                        </span>

                    </div>

                    <p className="text-lg font-semibold">
                        {analysis.conversionChance}%
                    </p>

                </div>

                {/* Risk */}

                <div className="rounded-lg border p-4">

                    <div className="flex items-center gap-2 mb-2">

                        <AlertTriangle className="h-4 w-4" />

                        <span className="font-medium">
                            Risk
                        </span>

                    </div>

                    <span
                        className={`
                            inline-flex
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            text-white
                            ${riskColor[analysis.risk]}
                        `}
                    >
                        {analysis.risk}
                    </span>

                </div>

                {/* Generated */}

                <div className="rounded-lg border p-4">

                    <div className="flex items-center gap-2 mb-2">

                        <Calendar className="h-4 w-4" />

                        <span className="font-medium">
                            Generated
                        </span>

                    </div>

                    <p className="text-sm text-muted-foreground">
                        {new Date(analysis.generatedAt).toLocaleString()}
                    </p>

                </div>

            </div>

            {/* Reason */}

            <div className="mt-6 rounded-lg border p-4">

                <div className="flex items-center gap-2 mb-2">

                    <Target className="h-4 w-4" />

                    <span className="font-medium">
                        AI Reasoning
                    </span>

                </div>

                <p className="text-sm text-muted-foreground leading-6">
                    {analysis.reason}
                </p>

            </div>

            {/* Recommendation */}

            <div className="mt-4 rounded-lg border p-4">

                <div className="flex items-center gap-2 mb-2">

                    <CheckCircle2 className="h-4 w-4 text-green-600" />

                    <span className="font-medium">
                        Recommended Action
                    </span>

                </div>

                <p className="text-sm leading-6">
                    {analysis.recommendedAction}
                </p>

            </div>

        </div>
    );
}

export default LeadAIAnalysisCard;