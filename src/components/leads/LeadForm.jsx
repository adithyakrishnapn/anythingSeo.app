import React from 'react'

function LeadForm({
  formData,
  handleChange,
}) {


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

        <h2 className="
          text-2xl font-bold
          text-foreground
        ">
          Lead Information
        </h2>

        <p className="
          mt-1
          text-sm
          text-muted-foreground
        ">
          Fill the lead details below.
        </p>

      </div>

      <form className="space-y-6">

        {/* GRID */}
        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-5
        ">

          {/* NAME */}
          <div className="space-y-2">

            <label
              htmlFor="name"
              className="
                text-sm font-medium
                text-foreground
              "
            >
              Name
            </label>

            <input
              type="text"
              id="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Enter lead name"
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

          {/* EMAIL */}
          <div className="space-y-2">

            <label
              htmlFor="email"
              className="
                text-sm font-medium
                text-foreground
              "
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Enter email"
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

          {/* PHONE */}
          <div className="space-y-2">

            <label
              htmlFor="phone"
              className="
                text-sm font-medium
                text-foreground
              "
            >
              Phone
            </label>

            <input
              type="tel"
              id="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              placeholder="Enter phone number"
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

          {/* COMPANY */}
          <div className="space-y-2">

            <label
              htmlFor="company"
              className="
                text-sm font-medium
                text-foreground
              "
            >
              Company
            </label>

            <input
              type="text"
              id="company"
              value={formData.company || ""}
              onChange={handleChange}
              placeholder="Enter company name"
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

          {/* STATUS */}
          <div className="space-y-2">

            <label
              htmlFor="status"
              className="
                text-sm font-medium
                text-foreground
              "
            >
              Status
            </label>

            <select
              id="status"
              value={formData.status || ""}
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

                placeholder:text-muted-foreground

                focus:border-primary
                focus:ring-2
                focus:ring-primary/20
              "
            >
              <option value="organic">Organic</option>
              <option value="paid">Paid</option>
              <option value="referral">Referral</option>
            </select>

          </div>

          {/* SOURCE */}
          <div className="space-y-2">

            <label
              htmlFor="source"
              className="
                text-sm font-medium
                text-foreground
              "
            >
              Source
            </label>

            <input
              type="text"
              id="source"
              value={formData.source || ""}
              onChange={handleChange}
              placeholder="Lead source"
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

          {/* ASSIGNED TO */}
          <div className="space-y-2">

            <label
              htmlFor="assignedTo"
              className="
                text-sm font-medium
                text-foreground
              "
            >
              Assigned To
            </label>

            <input
              type="text"
              id="assignedTo"
              value={formData.assignedTo || ""}
              onChange={handleChange}
              placeholder="Assigned user"
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

          {/* ADDRESS */}
          <div className="space-y-2">

            <label
              htmlFor="address"
              className="
                text-sm font-medium
                text-foreground
              "
            >
              Address
            </label>

            <input
              type="text"
              id="address"
              value={formData.address || ""}
              onChange={handleChange}
              placeholder="Enter address"
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

        {/* DESCRIPTION */}
        <div className="space-y-2">

          <label
            htmlFor="description"
            className="
              text-sm font-medium
              text-foreground
            "
          >
            Description
          </label>

          <textarea
            id="description"
            rows={5}
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Enter lead description..."
            className="
              w-full
              rounded-lg
              border border-input
              bg-background
              px-4 py-3
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
            Save Lead
          </button>

        </div>

      </form>

    </div>

  )
}

export default LeadForm