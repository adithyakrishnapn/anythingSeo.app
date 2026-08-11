import { Button } from "@/components/ui/button";

function ConvertStatus({ ConvertFunction, setConvertPopup }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 text-foreground shadow-2xl">
        <button
          type="button"
          onClick={() => setConvertPopup(false)}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close popup"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Project Completion
          </p>
          <h1 className="text-2xl font-bold tracking-tight">
            Complete Project
          </h1>
          <p className="text-sm leading-6 text-muted-foreground">
            This will mark the project status as completed and update the database.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <Button
            onClick={ConvertFunction}
            className="bg-emerald-600 text-white hover:bg-emerald-600/90"
          >
            Complete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConvertStatus