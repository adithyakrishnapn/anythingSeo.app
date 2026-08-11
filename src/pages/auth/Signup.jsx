import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BadgeCheck, Users, Workflow } from "lucide-react";
import { toast } from "sonner";
import { generateOtp } from "@/services/otp.service";

import SignupForm from "@/components/auth/SignupForm";
import OtpComponent from "@/components/auth/OtpComponent";
import ThemeToggler from "@/components/common/ThemeToggler";
import useAuth from "@/hooks/useAuth";

function Signup() {

    const navigate = useNavigate();

    const { signup } = useAuth();

    const [submitting, setSubmitting] = useState(false);
    const [otpToggler, setOtpToggler] = useState(true);
    const [showOtp, setShowOtp] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        otp: "",
    });

    const benefits = [
        "Keep clients, leads, and tasks under one roof.",
        "Invite teammates into a workspace built for day-to-day operations.",
        "Use a layout that matches the rest of the app instead of a separate auth style.",
    ];

    const SignupFunction = async (e) => {
        e.preventDefault();

        if (showOtp && !formData.otp?.trim()) {
            toast.error("Please enter the OTP code before creating your account.");
            return;
        }

        try {
            setSubmitting(true);

            const response = await signup(formData);

            if (response?.success) {
                toast.success(response?.message || "Registered Successfully");
                navigate("/dashboard/settings");
            } else {
                toast.error(response?.message || "Failed to register");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Registration failed");
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const generateOtpFunction = async (e) => {
        e.preventDefault();

        if (!formData.email?.trim()) {
            toast.error("Please enter your email before requesting an OTP.");
            return;
        }

        try {
            const response = await generateOtp(formData.email);

            if (response?.success) {
                toast.success(response?.message || "OTP sent successfully");
                setShowOtp(true);
                setOtpToggler(false);
            } else {
                toast.error(response?.message || "Failed to generate OTP");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to generate OTP");
            console.error(error);
        }
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(15,23,42,0.08),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(148,163,184,0.18),_transparent_35%),linear-gradient(180deg,_hsl(var(--background))_0%,_hsl(var(--muted)/0.45)_100%)] text-foreground">

            <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)] [background-size:72px_72px]" />

            <div className="absolute top-20 right-8 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

            <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-muted-foreground/10 blur-3xl" />

            <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 lg:px-8">

                <div className="mb-6 flex items-center justify-end">
                    <ThemeToggler />
                </div>

                <div className="grid flex-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] xl:gap-16">

                    {/* RIGHT CONTENT */}
                    <section className="space-y-8 lg:order-2">

                        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur">
                            <Workflow className="size-4 text-primary" />
                            Create your workspace profile
                        </div>

                        <div className="space-y-5 max-w-2xl">

                            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl xl:text-6xl">
                                Set up your account in a few seconds.
                            </h1>

                            <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                                A clean signup page with the same polished cards, borders, and muted surfaces used across the rest of the project.
                            </p>

                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">

                            {[
                                {
                                    icon: Users,
                                    label: "Team ready"
                                },
                                {
                                    icon: BadgeCheck,
                                    label: "Role defaulted"
                                },
                                {
                                    icon: ArrowRight,
                                    label: "Quick onboarding"
                                },
                            ].map((item) => (

                                <div
                                    key={item.label}
                                    className="rounded-xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur"
                                >

                                    <item.icon className="mb-3 size-5 text-primary" />

                                    <p className="text-sm font-medium text-foreground">
                                        {item.label}
                                    </p>

                                </div>

                            ))}

                        </div>

                        <div className="space-y-3 rounded-2xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur">

                            <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
                                Why this setup works
                            </p>

                            <div className="space-y-3 text-sm text-muted-foreground">

                                {benefits.map((benefit) => (

                                    <div
                                        key={benefit}
                                        className="flex gap-3"
                                    >

                                        <span className="mt-2 size-2 rounded-full bg-primary" />

                                        <span>
                                            {benefit}
                                        </span>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </section>

                    {/* FORM */}
                    <section className="mx-auto w-full max-w-lg lg:order-1">

                        <SignupForm
                            formData={formData}
                            setFormData={setFormData}
                            submitting={submitting}
                            onSubmitFun={SignupFunction}
                            otpToggler={otpToggler}
                            showOtp={showOtp}
                            onGenerateOtp={generateOtpFunction}
                            otpComponent={showOtp ? (
                                <OtpComponent
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                            ) : null}
                        />

                        <p className="mt-4 text-center text-sm text-muted-foreground">

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="font-medium text-foreground underline-offset-4 hover:underline"
                            >
                                Sign in
                            </Link>

                        </p>

                    </section>

                </div>

            </div>

        </main>
    );
}

export default Signup;