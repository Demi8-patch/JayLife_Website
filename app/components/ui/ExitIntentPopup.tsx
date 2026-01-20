import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        // Check if already shown in this session
        const shownInSession = sessionStorage.getItem('jaylife_exit_intent_shown');
        if (shownInSession) {
            setHasShown(true);
            return;
        }

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasShown && !isVisible) {
                setIsVisible(true);
                setHasShown(true);
                sessionStorage.setItem('jaylife_exit_intent_shown', 'true');
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [hasShown, isVisible]);

    const closePopup = () => setIsVisible(false);

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closePopup}
                        className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-branding-cream bg-white overflow-hidden rounded-3xl shadow-2xl border-2 border-electric-lime"
                    >
                        <div className="p-8 md:p-12 text-center">
                            <span className="inline-block bg-sale-red text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                                WAIT! DON'T GO
                            </span>
                            <h2 className="font-display font-bold text-3xl text-brand-navy mb-4">
                                Unlock 10% Off Your First Ritual
                            </h2>
                            <p className="text-brand-navy/70 mb-8">
                                Join 12,000+ others optimizing their daily performance. We'll send your code immediately.
                            </p>

                            <form onSubmit={(e) => { e.preventDefault(); closePopup(); }} className="flex flex-col gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 rounded-xl border border-brand-navy/20 focus:outline-none focus:border-electric-lime text-lg"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full btn-primary py-3 text-lg font-bold"
                                >
                                    Get My 10% Off
                                </button>
                            </form>

                            <button
                                onClick={closePopup}
                                className="mt-4 text-sm text-brand-navy/40 hover:text-brand-navy underline"
                            >
                                No thanks, I don't want to optimize my health
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
