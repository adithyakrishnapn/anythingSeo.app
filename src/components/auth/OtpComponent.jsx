import {LockKeyhole, ShieldCheck } from "lucide-react";

function OtpComponent({
    formData,
    setFormData,
}) {


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-background/95 p-4 shadow-lg shadow-foreground/5 ring-1 ring-black/5 backdrop-blur-sm">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="mb-4 flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 text-primary shadow-sm">
                    <ShieldCheck className="size-4" />
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">Enter your one-time code</p>
                    <p className="text-sm text-muted-foreground">
                        We sent a verification code to your email.
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        placeholder="6-digit OTP"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        className="w-full rounded-xl border border-input bg-background px-10 py-3 text-center text-sm font-medium tracking-[0.28em] text-foreground outline-none transition-colors placeholder:tracking-normal placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                        required
                    />
                </div>

                <p className="text-xs text-muted-foreground">
                    Tip: paste the code directly from your email if you copied it.
                </p>
            </div>
        </div>
    );
}

export default OtpComponent;