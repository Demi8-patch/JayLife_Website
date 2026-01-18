import { useState } from 'react';

interface EmailCaptureProps {
    title?: string;
    description?: string;
    discount?: string;
}

export function EmailCapture({
    title = "Join the wellness movement",
    description = "Get 10% off your first order + exclusive wellness tips.",
    discount = "10% off"
}: EmailCaptureProps) {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Integrate with email service (Klaviyo, Mailchimp, etc.)
        console.log('Email submitted:', email);
        setIsSubmitted(true);

        // Reset after 3 seconds
        setTimeout(() => {
            setEmail('');
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <section className="bg-brand-sage/10 py-16 md:py-20">
            <div className="max-w-2xl mx-auto px-5 md:px-10 text-center">
                <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-navy mb-4">
                    {title}
                </h2>
                <p className="text-brand-navy/70 text-lg mb-8">
                    {description}
                </p>

                {isSubmitted ? (
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="text-brand-sage font-medium mb-2">
                            ✓ Success!
                        </div>
                        <p className="text-brand-navy/70">
                            Check your email for your {discount} discount code.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="flex-1 px-5 py-4 rounded-xl border border-brand-navy/20 focus:outline-none focus:ring-2 focus:ring-brand-sage focus:border-transparent text-brand-navy placeholder:text-brand-navy/40"
                        />
                        <button
                            type="submit"
                            className="bg-brand-navy text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-sage transition-colors shadow-sm whitespace-nowrap"
                        >
                            Get {discount}
                        </button>
                    </form>
                )}

                <p className="text-xs text-brand-navy/50 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    We respect your privacy. Unsubscribe anytime.
                </p>
            </div>
        </section>
    );
}
