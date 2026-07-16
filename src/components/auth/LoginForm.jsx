import { useState } from "react";
import { ArrowRight, Loader2, LockKeyhole, Mail } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function LoginForm({setFormData, formData, onSubmitFun, submitting}) {


	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData((current) => ({
			...current,
			[name]: value,
		}));
	};

	return (
		<Card className="w-full border-border/70 bg-card/95 shadow-xl shadow-foreground/5 backdrop-blur">
			<CardHeader className="space-y-2 border-b border-border/60 pb-4">
				<CardDescription className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
					Secure access
				</CardDescription>
				<CardTitle className="text-2xl font-semibold text-foreground">
					Sign in to your workspace
				</CardTitle>
				<p className="text-sm text-muted-foreground">
					Pick up your campaigns, clients, and tasks where you left off.
				</p>
			</CardHeader>

			<CardContent className="pt-6">
				<form className="space-y-5" onSubmit={onSubmitFun}>
					<div className="space-y-2">
						<label htmlFor="email" className="text-sm font-medium text-foreground">
							Email
						</label>
						<div className="relative">
							<Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
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
						<label htmlFor="password" className="text-sm font-medium text-foreground">
							Password
						</label>
						<div className="relative">
							<LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								value={formData.password}
								onChange={handleChange}
								placeholder="Enter your password"
								className="w-full rounded-lg border border-input bg-background px-10 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
								required
							/>
						</div>
					</div>

					<Button type="submit" size="lg" className="w-full gap-2" disabled={submitting} >
						{submitting ? <Loader2 className="size-4 animate-spin" /> : null}
						{submitting ? "Signing in" : "Sign in"}
						{!submitting ? <ArrowRight className="size-4" /> : null}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}

export default LoginForm;
