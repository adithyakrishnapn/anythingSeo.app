import { ArrowRight, Loader2, LockKeyhole, Mail, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

function SignupForm({
    formData,
    setFormData,
    onSubmitFun,
    submitting,
    otpToggler,
    showOtp,
    onGenerateOtp,
    otpComponent,
}) {

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    return (

        <Card className="w-full border-border/70 bg-card/95 shadow-xl shadow-foreground/5 backdrop-blur">

            <CardHeader className="space-y-2 border-b border-border/60 pb-4">

                <CardDescription className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                    Create your account
                </CardDescription>

                <CardTitle className="text-2xl font-semibold text-foreground">
                    Start managing everything in one place
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                    Create a workspace profile and keep your team, tasks,
                    and client activity in sync.
                </p>

            </CardHeader>

            <CardContent className="pt-6">

                <form
                    className="space-y-5"
                    onSubmit={onSubmitFun}
                >

                    <div className="space-y-2">

                        <label
                            htmlFor="name"
                            className="text-sm font-medium text-foreground"
                        >
                            Name
                        </label>

                        <div className="relative">

                            <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your full name"
                                className="w-full rounded-lg border border-input bg-background px-10 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                                required
                            />

                        </div>

                    </div>

                    <div className="space-y-2">

                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-foreground"
                        >
                            Email
                        </label>

                        <div className="relative">

                            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@company.com"
                                className="w-full rounded-lg border border-input bg-background px-10 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                                required
                            />

                        </div>

                    </div>

                    <div className="space-y-2">

                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-foreground"
                        >
                            Password
                        </label>

                        <div className="relative">

                            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a strong password"
                                className="w-full rounded-lg border border-input bg-background px-10 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                                required
                            />

                        </div>

                    </div>

                    <div className="rounded-lg border border-border/70 bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                        Your role is set to <strong>User</strong> by default.
                    </div>

                    <div className="space-y-3 rounded-2xl border border-border/70 bg-card/80 p-4 shadow-sm backdrop-blur">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold text-foreground">Verify your email</p>
                                <p className="text-sm text-muted-foreground">
                                    Send a one-time code before finishing setup.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={onGenerateOtp}
                                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                {showOtp ? "Resend OTP" : "Generate OTP"}
                            </button>
                        </div>

                        {showOtp && otpComponent ? (
                            <div className="pt-1">
                                {otpComponent}
                            </div>
                        ) : null}
                    </div>

                    {otpToggler === false && (
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full gap-2"
                            disabled={submitting}
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="size-4" />
                                </>
                            )}
                        </Button>
                    )}

                </form>

            </CardContent>

        </Card>

    );

}

export default SignupForm;