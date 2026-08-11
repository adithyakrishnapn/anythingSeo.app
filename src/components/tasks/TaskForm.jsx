import React from 'react'

function TaskForm({
  formData,
  handleChange,
  formSubmission,
  leads = [],
  clients = [],
  projects = [],
  isEdit = false
}) {

  // Determine which list to display for "Related To"
  const getRelatedEntitiesList = () => {
    switch (formData.relatedModel) {
      case 'Lead':
        return leads.map(l => ({ id: l._id || l.id, name: `${l.name} - ${l.company || 'Lead'}` }));
      case 'Client':
        return clients.map(c => ({ id: c._id || c.id, name: `${c.name} - ${c.company || 'Client'}` }));
      case 'Project':
        return projects.map(p => ({ id: p._id || p.id, name: p.ProjectName || p.name || 'Project' }));
      default:
        return [];
    }
  };

  const relatedEntities = getRelatedEntitiesList();

  return (
    <div className="
      w-full
      rounded-2xl
      border border-border
      bg-card
      p-6
      shadow-sm
    ">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          {isEdit ? "Edit Task" : "Create Task"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the task details below.
        </p>
      </div>

      <form className="space-y-6" onSubmit={formSubmission}>

        {/* GRID */}
        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-5
        ">

          {/* TITLE */}
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="title" className="text-sm font-medium text-foreground">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title || ""}
              onChange={handleChange}
              required
              placeholder="Enter task title"
              className="
                w-full
                rounded-lg
                border border-input
                bg-background
                px-4 py-2.5
                text-sm
                text-foreground
                outline-none
                transition-colors
                placeholder:text-muted-foreground
                focus:border-primary
                focus:ring-2
                focus:ring-primary/20
              "
            />
          </div>

          {/* RELATED MODEL */}
          <div className="space-y-2">
            <label htmlFor="relatedModel" className="text-sm font-medium text-foreground">
              Related To (Type)
            </label>
            <select
              id="relatedModel"
              value={formData.relatedModel || "Project"}
              onChange={handleChange}
              required
              className="
                w-full
                rounded-lg
                border border-input
                bg-background
                px-4 py-2.5
                text-sm
                text-foreground
                outline-none
                transition-colors
                focus:border-primary
                focus:ring-2
                focus:ring-primary/20
              "
            >
              <option value="Lead">Lead</option>
              <option value="Client">Client</option>
              <option value="Project">Project</option>
            </select>
          </div>

          {/* RELATED TO ENTITY */}
          <div className="space-y-2">
            <label htmlFor="relatedTo" className="text-sm font-medium text-foreground">
              Related Entity
            </label>
            <select
              id="relatedTo"
              value={formData.relatedTo || ""}
              onChange={handleChange}
              required
              className="
                w-full
                rounded-lg
                border border-input
                bg-background
                px-4 py-2.5
                text-sm
                text-foreground
                outline-none
                transition-colors
                focus:border-primary
                focus:ring-2
                focus:ring-primary/20
              "
            >
              <option value="">Select Entity</option>
              {relatedEntities.map((entity) => (
                <option key={entity.id} value={entity.id}>
                  {entity.name}
                </option>
              ))}
            </select>
          </div>

          {/* ASSIGNED TO */}
          <div className="space-y-2">
            <label htmlFor="assignedTo" className="text-sm font-medium text-foreground">
              Assigned User ID
            </label>
            <input
              type="text"
              id="assignedTo"
              value={formData.assignedTo || ""}
              onChange={handleChange}
              required
              placeholder="Enter User ID"
              className="
                w-full
                rounded-lg
                border border-input
                bg-background
                px-4 py-2.5
                text-sm
                text-foreground
                outline-none
                transition-colors
                placeholder:text-muted-foreground
                focus:border-primary
                focus:ring-2
                focus:ring-primary/20
              "
            />
          </div>

          {/* DUE DATE */}
          <div className="space-y-2">
            <label htmlFor="dueDate" className="text-sm font-medium text-foreground">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={formData.dueDate || ""}
              onChange={handleChange}
              required
              className="
                w-full
                rounded-lg
                border border-input
                bg-background
                px-4 py-2.5
                text-sm
                text-foreground
                outline-none
                transition-colors
                focus:border-primary
                focus:ring-2
                focus:ring-primary/20
              "
            />
          </div>

          {/* STATUS */}
          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium text-foreground">
              Status
            </label>
            <select
              id="status"
              value={formData.status || "Pending"}
              onChange={handleChange}
              className="
                w-full
                rounded-lg
                border border-input
                bg-background
                px-4 py-2.5
                text-sm
                text-foreground
                outline-none
                transition-colors
                focus:border-primary
                focus:ring-2
                focus:ring-primary/20
              "
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* PRIORITY */}
          <div className="space-y-2">
            <label htmlFor="priority" className="text-sm font-medium text-foreground">
              Priority
            </label>
            <select
              id="priority"
              value={formData.priority || "Medium"}
              onChange={handleChange}
              className="
                w-full
                rounded-lg
                border border-input
                bg-background
                px-4 py-2.5
                text-sm
                text-foreground
                outline-none
                transition-colors
                focus:border-primary
                focus:ring-2
                focus:ring-primary/20
              "
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          {/* ESTIMATED HOURS */}
          <div className="space-y-2">
            <label htmlFor="estimatedHours" className="text-sm font-medium text-foreground">
              Estimated Hours
            </label>
            <input
              type="number"
              id="estimatedHours"
              value={formData.estimatedHours || 0}
              onChange={handleChange}
              min="0"
              className="
                w-full
                rounded-lg
                border border-input
                bg-background
                px-4 py-2.5
                text-sm
                text-foreground
                outline-none
                transition-colors
                focus:border-primary
                focus:ring-2
                focus:ring-primary/20
              "
            />
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="description" className="text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Enter task description..."
              className="
                w-full
                rounded-lg
                border border-input
                bg-background
                px-4 py-2.5
                text-sm
                text-foreground
                outline-none
                transition-colors
                placeholder:text-muted-foreground
                focus:border-primary
                focus:ring-2
                focus:ring-primary/20
              "
            />
          </div>

          {/* NOTES (for creation) */}
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="note" className="text-sm font-medium text-foreground">
              Initial Note (Optional)
            </label>
            <textarea
              id="note"
              rows={2}
              value={formData.note || ""}
              onChange={handleChange}
              placeholder="Enter task notes..."
              className="
                w-full
                rounded-lg
                border border-input
                bg-background
                px-4 py-2.5
                text-sm
                text-foreground
                outline-none
                transition-colors
                placeholder:text-muted-foreground
                focus:border-primary
                focus:ring-2
                focus:ring-primary/20
              "
            />
          </div>

        </div>

        {/* BUTTON */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="
              rounded-lg
              bg-primary
              px-5 py-2.5
              text-sm font-medium
              text-primary-foreground
              transition-opacity
              hover:opacity-90
            "
          >
            {isEdit ? "Update Task" : "Create Task"}
          </button>
        </div>

      </form>
    </div>
  )
}

export default TaskForm
