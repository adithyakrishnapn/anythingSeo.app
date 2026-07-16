import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Shield, Sparkles } from "lucide-react";
import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import ThemeToggler from "@/components/common/ThemeToggler";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Login() {
	const [submitting, setSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const features = [
		"Keep your pipeline, tasks, and client activity aligned.",
		"Switch between light and dark theme without leaving the page.",
		"Return to the same workspace flow your team already uses.",
	];
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setSubmitting(true);

			const response = await login(formData);
			if (!response?.success) {
				toast.error(response?.message || "Failed to log in");
				return;
			}
			toast.success(response?.message || "Logged in successfully");
			navigate("/dashboard");

		} catch (error) {
			toast.error(error?.response?.data?.message || "Failed to log in");
			console.error(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(148,163,184,0.18),_transparent_35%),linear-gradient(180deg,_hsl(var(--background))_0%,_hsl(var(--muted)/0.45)_100%)] text-foreground">
			<div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)] [background-size:72px_72px]" />
			<div className="absolute top-14 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
			<div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-muted-foreground/10 blur-3xl" />

			<div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 lg:px-8">
				<div className="mb-6 flex items-center justify-end">
					<ThemeToggler />
				</div>

				<div className="grid flex-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] xl:gap-16">
					<section className="space-y-8">
						<div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur">
							<Sparkles className="size-4 text-primary" />
							AnythingSEO workspace access
						</div>

						<div className="space-y-5 max-w-2xl">
							<h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl xl:text-6xl">
								Sign in and get back to the work that matters.
							</h1>
							<p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
								A focused login screen for your CRM, with the same clean card styling and muted surfaces used across the rest of the project.
							</p>
						</div>

						<div className="grid gap-3 sm:grid-cols-3">
							{[
								{ icon: Shield, label: "Secure sign in" },
								{ icon: BadgeCheck, label: "Simple workflow" },
								{ icon: ArrowRight, label: "Fast access" },
							].map((item) => (
								<div key={item.label} className="rounded-xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur">
									<item.icon className="mb-3 size-5 text-primary" />
									<p className="text-sm font-medium text-foreground">{item.label}</p>
								</div>
							))}
						</div>

						<div className="space-y-3 rounded-2xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur">
							<p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
								What you’ll find inside
							</p>
							<div className="space-y-3 text-sm text-muted-foreground">
								{features.map((feature) => (
									<div key={feature} className="flex gap-3">
										<span className="mt-2 size-2 rounded-full bg-primary" />
										<span>{feature}</span>
									</div>
								))}
							</div>
						</div>
					</section>

					<section className="mx-auto w-full max-w-lg">
						<LoginForm onSubmitFun={handleSubmit} submitting={submitting} setFormData={setFormData} formData={formData} />
						<p className="mt-4 text-center text-sm text-muted-foreground">
							New here?{" "}
							<Link to="/signup" className="font-medium text-foreground underline-offset-4 hover:underline">
								Create an account
							</Link>
						</p>
					</section>
				</div>
			</div>
		</main>
	);
}

export default Login;
