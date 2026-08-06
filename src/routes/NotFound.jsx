import { Link } from "react-router-dom";

function NotFound() {

    return (

        <div className="flex min-h-screen flex-col items-center justify-center gap-5">

            <h1 className="text-7xl font-bold">

                404

            </h1>

            <p className="text-muted-foreground">

                Page Not Found

            </p>

            <Link

                to="/dashboard"

                className="rounded bg-primary px-5 py-2 text-primary-foreground"

            >

                Go to Dashboard

            </Link>

        </div>

    );

}

export default NotFound;