import React from 'react'

function AddActivity({ setActivity, closeFunction, submitFunc, act }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <input
        type="text"
        placeholder="Add activity"
        className="flex-1 min-w-0 w-full rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
        onChange={(e) => setActivity(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') submitFunc() }}
        aria-label="Add activity"
        ref={act}
      />

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <button
          type="button"
          className="w-full sm:w-auto rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          onClick={submitFunc}
        >
          Add
        </button>

        <button
          type="button"
          className="w-full sm:w-auto rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
          onClick={closeFunction}
          aria-label="Close activity input"
        >
          X
        </button>
      </div>
    </div>
  )
}

export default AddActivity