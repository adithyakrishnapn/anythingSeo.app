import React from 'react'
import { useNavigate } from "react-router-dom";


function ClientActions({detailed = false,
    id,
}) {

    const navigate = useNavigate();

    return (

        <div className="
      flex flex-col gap-4
      rounded-xl
      border border-border
      bg-card
      p-4
      shadow-sm
    ">

            {/* TOP BAR */}
            <div className="
        flex items-center justify-between
        flex-wrap gap-3
      ">

                <div>

                    <h2 className="
            text-lg font-semibold
            text-foreground
          ">
                        Client Actions
                    </h2>

                    <p className="
            text-sm text-muted-foreground
          ">
                        {detailed
                            ? "Manage the client details and activities."
                            : "View and manage your client."
                        }
                    </p>

                </div>

                {detailed && (
                    <>
                        {/* BACK BUTTON */}
                        <button
                            onClick={() => navigate(-1)}
                            className="
        rounded-lg
        border border-border
        bg-background
        px-4 py-2

        text-sm font-medium
        text-foreground

        transition-colors
        hover:bg-muted
      "
                        >
                            ← Go Back
                        </button>
                    </>
                )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="
        flex flex-wrap gap-3
      ">

                {detailed ? (

                    <>

                        <button
                            onClick={() =>
                                navigate(`/clients/edit/${id}`)
                            }
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
                            Edit Client
                        </button>

                        <button
                            className="
                rounded-lg
                border border-border
                bg-background
                px-4 py-2

                text-sm font-medium
                text-foreground

                transition-colors
                hover:bg-muted
              "
                        >
                            Delete Client
                        </button>

                        <button
                            className="
                rounded-lg
                bg-green-600
                px-4 py-2

                text-sm font-medium
                text-white

                transition-opacity
                hover:opacity-90
              "
                        >
                            Convert Client
                        </button>

                    </>

                ) : (

                    <button
                        onClick={() =>
                            navigate("/clients/create")
                        }
                        className="
              rounded-lg
              bg-green-600
              px-4 py-2

              text-sm font-medium
              text-white

              transition-opacity
              hover:opacity-90
            "
                    >
                        Create Client
                    </button>

                )}

            </div>

        </div >

    );

}

export default ClientActions