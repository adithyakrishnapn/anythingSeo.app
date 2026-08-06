import React from 'react'

function ClientForm({ formData, handleChange, formSubmission }) {
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
                    Client Information
                </h2>

                <p className="
                    mt-1
                    text-sm
                    text-muted-foreground
                ">
                    Fill in the client details below.
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

                        <label htmlFor="name" className="text-sm font-medium text-foreground">
                            Name
                        </label>

                        <input
                            type="text"
                            id="name"
                            value={formData.name || ''}
                            onChange={handleChange}
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

                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                            Email
                        </label>

                        <input
                            type="email"
                            id="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            placeholder="Enter client email"
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

                        <label htmlFor="phone" className="text-sm font-medium text-foreground">
                            Phone
                        </label>

                        <input
                            type="tel"
                            id="phone"
                            value={formData.phone || ''}
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

                    <div className="space-y-2">

                        <label htmlFor="company" className="text-sm font-medium text-foreground">
                            Company
                        </label>

                        <input
                            type="text"
                            id="company"
                            value={formData.company || ''}
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
                            <option value="paused">Paused</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>

                    </div>

                    <div className="space-y-2">

                        <label htmlFor="website" className="text-sm font-medium text-foreground">
                            Website
                        </label>

                        <input
                            type="url"
                            id="website"
                            value={formData.website || ''}
                            onChange={handleChange}
                            placeholder="Enter website URL"
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

                        <label htmlFor="contractValue" className="text-sm font-medium text-foreground">
                            Contract Value
                        </label>

                        <input
                            type="text"
                            id="contractValue"
                            value={formData.contractValue || ''}
                            onChange={handleChange}
                            placeholder="Enter contract value"
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

                        <label htmlFor="onboardingDate" className="text-sm font-medium text-foreground">
                            Onboarding Date
                        </label>

                        <input
                            type="date"
                            id="onboardingDate"
                            value={formData.onboardingDate || ''}
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

                        <label htmlFor="renewalDate" className="text-sm font-medium text-foreground">
                            Renewal Date
                        </label>

                        <input
                            type="date"
                            id="renewalDate"
                            value={formData.renewalDate || ''}
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

                        <label htmlFor="assignedTo" className="text-sm font-medium text-foreground">
                            Assigned To
                        </label>

                        <input
                            type="text"
                            id="assignedTo"
                            value={formData.assignedTo || ''}
                            onChange={handleChange}
                            placeholder="Enter assigned person"
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

                <div className="space-y-2">

                    <label htmlFor="address" className="text-sm font-medium text-foreground">
                        Address
                    </label>

                    <input
                        type="text"
                        id="address"
                        value={formData.address || ''}
                        onChange={handleChange}
                        placeholder="Enter client address"
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

                    <label htmlFor="notes" className="text-sm font-medium text-foreground">
                        Notes
                    </label>

                    <textarea
                        id="notes"
                        rows={5}
                        value={formData.notes || ''}
                        onChange={handleChange}
                        placeholder="Add client notes..."
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
                        Save Client
                    </button>

                </div>

            </form>

        </div>
    )
}

export default ClientForm