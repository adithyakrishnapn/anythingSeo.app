import React from 'react'

function ProjectForm({ formData, handleChange, formSubmission, clients = [] }) {

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

      <form className="space-y-6" onSubmit={formSubmission}>

        <div className="
          grid
          grid-cols-1
          gap-5
          md:grid-cols-2
        ">

          <div className="space-y-2">

            <label htmlFor="clientId" className="text-sm font-medium text-foreground">
              Client
            </label>

            <select
              id="clientId"
              value={formData.clientId || ''}
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
              <option value="">Select client</option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name} {client.company ? `(${client.company})` : ''}
                </option>
              ))}
            </select>

          </div>

          <div className="space-y-2">

            <label htmlFor="clientName" className="text-sm font-medium text-foreground">
              Client Name
            </label>

            <input
              type="text"
              id="clientName"
              value={formData.clientName || ''}
              onChange={handleChange}
              required
              placeholder="Enter client name"
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

            <label htmlFor="ProjectName" className="text-sm font-medium text-foreground">
              Project Name
            </label>

            <input
              type="text"
              id="ProjectName"
              value={formData.ProjectName || ''}
              onChange={handleChange}
              required
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="completed">Completed</option>
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

            <label htmlFor="expiryDate" className="text-sm font-medium text-foreground">
              Expiry Date
            </label>

            <input
              type="date"
              id="expiryDate"
              value={formData.expiryDate || ''}
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
              required
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