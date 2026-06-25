import React from 'react'

function ProjectForm({ formData, handleChange }) {

  const objectivesValue = Array.isArray(formData.objectives)
    ? formData.objectives.join(', ')
    : formData.objectives || '';

  const deliverablesValue = Array.isArray(formData.deliverables)
    ? formData.deliverables.join(', ')
    : formData.deliverables || '';

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="
      w-full
      rounded-2xl
      border border-border
      bg-card
      p-6
      shadow-sm
    ">

      <div className="mb-6">

        <h2 className="
          text-2xl font-bold
          text-foreground
        ">
          Project Information
        </h2>

        <p className="
          mt-1
          text-sm
          text-muted-foreground
        ">
          Fill in the project details below.
        </p>

      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>

        <div className="
          grid
          grid-cols-1
          gap-5
          md:grid-cols-2
        ">

          <div className="space-y-2 md:col-span-2">

            <label htmlFor="name" className="text-sm font-medium text-foreground">
              Name
            </label>

            <input
              type="text"
              id="name"
              value={formData.name || ''}
              onChange={handleChange}
              placeholder="Enter project name"
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

          <div className="space-y-2">

            <label htmlFor="status" className="text-sm font-medium text-foreground">
              Status
            </label>

            <select
              id="status"
              value={formData.status || ''}
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
              <option value="">Select status</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Completed">Completed</option>
            </select>

          </div>

          <div className="space-y-2">

            <label htmlFor="assignedTo" className="text-sm font-medium text-foreground">
              Assigned To
            </label>

            <input
              type="text"
              id="assignedTo"
              value={formData.assignedTo || ''}
              onChange={handleChange}
              placeholder="Enter team member name"
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

          <div className="space-y-2">

            <label htmlFor="priority" className="text-sm font-medium text-foreground">
              Priority
            </label>

            <select
              id="priority"
              value={formData.priority || ''}
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
              <option value="">Select priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

          </div>

          <div className="space-y-2">

            <label htmlFor="progress" className="text-sm font-medium text-foreground">
              Progress (%)
            </label>

            <input
              type="number"
              id="progress"
              min="0"
              max="100"
              value={formData.progress || ''}
              onChange={handleChange}
              placeholder="Enter progress"
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

          <div className="space-y-2">

            <label htmlFor="startDate" className="text-sm font-medium text-foreground">
              Start Date
            </label>

            <input
              type="date"
              id="startDate"
              value={formData.startDate || ''}
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
            />

          </div>

          <div className="space-y-2">

            <label htmlFor="endDate" className="text-sm font-medium text-foreground">
              End Date
            </label>

            <input
              type="date"
              id="endDate"
              value={formData.endDate || ''}
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
            />

          </div>

          <div className="space-y-2 md:col-span-2">

            <label htmlFor="description" className="text-sm font-medium text-foreground">
              Description
            </label>

            <textarea
              id="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={4}
              placeholder="Write project description"
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

          <div className="space-y-2 md:col-span-2">

            <label htmlFor="objectives" className="text-sm font-medium text-foreground">
              Objectives
            </label>

            <textarea
              id="objectives"
              value={objectivesValue}
              onChange={handleChange}
              rows={3}
              placeholder="Enter objectives separated by commas"
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

          <div className="space-y-2 md:col-span-2">

            <label htmlFor="deliverables" className="text-sm font-medium text-foreground">
              Deliverables
            </label>

            <textarea
              id="deliverables"
              value={deliverablesValue}
              onChange={handleChange}
              rows={3}
              placeholder="Enter deliverables separated by commas"
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

        <div className="flex justify-end">
          <button
            type="submit"
            className="
              rounded-lg
              bg-primary
              px-4 py-2
              text-sm font-medium
              text-primary-foreground
              transition-opacity
              hover:opacity-90
            "
          >
            Save Project
          </button>
        </div>

      </form>

    </div>
  )
}

export default ProjectForm