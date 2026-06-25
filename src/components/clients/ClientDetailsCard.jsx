import React from 'react'
import StatusBadge from '../common/StatusBadge'

function ClientDetailsCard({ client, clientTags }) {
    const formatTagLabel = (tag) =>
        tag
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (char) => char.toUpperCase());

    return (
        <div className="
            grid
            gap-6
            md:grid-cols-2
        ">

            <div className="
                rounded-2xl
                border border-border
                bg-card
                p-6
                shadow-sm
                space-y-5
            ">

                <div>
                    <h2 className="
                        text-2xl font-bold
                        text-foreground
                    ">
                        {client.name}
                    </h2>

                    <p className="
                        text-sm text-muted-foreground
                    ">
                        Client Details
                    </p>
                </div>

                <div className="space-y-4">

                    {clientTags.map((tag) => {

                        if (
                            !tag ||
                            tag === 'activities' ||
                            tag === 'notes'
                        ) return null;

                        return (

                            <div
                                key={tag}
                                className="
                                    flex flex-col gap-1
                                    border-b border-border
                                    pb-3
                                    last:border-none
                                "
                            >

                                <span className="
                                    text-xs uppercase
                                    tracking-wide
                                    text-muted-foreground
                                ">
                                    {formatTagLabel(tag)}
                                </span>

                                {tag === 'status' ? (

                                    <StatusBadge status={client[tag]} />

                                ) : (

                                    <p className="
                                        text-sm font-medium
                                        text-foreground
                                        break-words
                                    ">
                                        {client[tag]}
                                    </p>

                                )}

                            </div>

                        );

                    })}

                </div>

            </div>

            <div className="
                flex flex-col gap-6
            ">

                <div className="
                    rounded-2xl
                    border border-border
                    bg-card
                    p-6
                    shadow-sm
                ">

                    <h3 className="
                        text-lg font-semibold
                        text-foreground
                        mb-3
                    ">
                        Notes
                    </h3>

                    <div className="
                        rounded-xl
                        bg-muted/40
                        p-4
                    ">

                        <p className="
                            text-sm
                            leading-relaxed
                            text-foreground
                        ">
                            {client.notes || 'No notes available.'}
                        </p>

                    </div>

                </div>

                <div className="
                    rounded-2xl
                    border border-border
                    bg-card
                    p-6
                    shadow-sm
                ">

                    <h3 className="
                        text-lg font-semibold
                        text-foreground
                        mb-4
                    ">
                        Activities
                    </h3>

                    {Array.isArray(client.activities) && client.activities.length > 0 ? (

                        <ul className="
                            space-y-3
                        ">

                            {client.activities.map((activity, index) => (

                                <li
                                    key={index}
                                    className="
                                        flex items-start gap-3
                                        text-sm text-foreground
                                    "
                                >

                                    <span className="
                                        mt-1.5
                                        h-2 w-2
                                        rounded-full
                                        bg-primary
                                        shrink-0
                                    " />

                                    <span>
                                        {activity}
                                    </span>

                                </li>

                            ))}

                        </ul>

                    ) : (

                        <p className="
                            text-sm text-muted-foreground
                        ">
                            No recent activities.
                        </p>

                    )}

                </div>

            </div>

        </div>
    )
}

export default ClientDetailsCard