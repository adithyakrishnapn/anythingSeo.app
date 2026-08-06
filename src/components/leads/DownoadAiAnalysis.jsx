import React from 'react'

function DownoadAiAnalysis({ downloadFunc }) {
  return (
    <div>
          <div className="w-full lg:w-72 border border-border rounded-lg p-4 bg-background">

            <h3 className="text-sm font-semibold text-foreground">
              AI Actions
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              Download the latest AI-generated lead analysis report.
            </p>

            <button
              onClick={downloadFunc}
              className="
            mt-4
            w-full
            rounded-lg
            bg-blue-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            transition-opacity
            hover:opacity-90
          "
            >
              📄 Download AI Analysis
            </button>

          </div>
    </div>
  )
}

export default DownoadAiAnalysis
