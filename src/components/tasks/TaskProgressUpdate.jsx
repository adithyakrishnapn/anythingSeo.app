import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { taskDetailsData } from '@/constants/tasksData'

function TaskProgressUpdate({formdata, handleChange, handleFileChange, handleSubmit}) {
  const { id } = useParams();
  const status = taskDetailsData[id]?.status || '';
  return (
    <div className="w-full rounded-2xl border border-border bg-card p-6 shadow-sm">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Task Progress Update
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Update the task status and add progress notes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* PROGRESS UPDATE */}
        <div className="space-y-2">
          <label htmlFor="update" className="text-sm font-medium text-foreground">
            Progress Update
          </label>
          <textarea
            id="update"
            value={formdata.update}
            onChange={handleChange}
            placeholder="Describe what has been completed..."
            rows="3"
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </div>

        {/* STATUS */}
        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium text-foreground">
            Status
          </label>
          <select
            id="status"
            value={formdata.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
          >
            <option value="">{status || 'Select status'}</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>

        {/* ATTACHMENT */}
        <div className="space-y-2">
          <label htmlFor="attachment" className="text-sm font-medium text-foreground">
            Attachment
          </label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              id="attachment"
              onChange={handleFileChange}
              className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground file:mr-3 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1 file:text-xs file:font-medium file:text-primary-foreground hover:file:opacity-90 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
            {formdata.attachment && (
              <span className="text-xs text-muted-foreground">
                {formdata.attachment.name}
              </span>
            )}
          </div>
        </div>

        {/* NOTE */}
        <div className="space-y-2">
          <label htmlFor="note" className="text-sm font-medium text-foreground">
            Notes
          </label>
          <textarea
            id="note"
            value={formdata.note}
            onChange={handleChange}
            placeholder="Add any additional notes..."
            rows="2"
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
          >
            Submit Update
          </button>
          <button
            type="reset"
            className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskProgressUpdate