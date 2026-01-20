import { useState } from 'react';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
    return [
        { title: 'Warm Sunrise | Jay Life Popup' },
        { name: 'description', content: 'Limited edition collection dropping now.' },
    ];
};

export default function WarmSunrise() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-warm-sunrise-charcoal font-sans text-warm-sunrise-offwhite selection:bg-warm-sunrise-lime selection:text-warm-sunrise-charcoal">

            {/* ═══════════════════════════════════════════════════════════════════
          NAVBAR - Minimal
      ═══════════════════════════════════════════════════════════════════ */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-warm-sunrise-charcoal/90 backdrop-blur border-b-2 border-warm-sunrise-lime">
                <div className="text-2xl font-bold tracking-tighter uppercase font-display text-warm-sunrise-lime">
                    Jay Life<span className="text-warm-sunrise-orange">.</span>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-2 text-sm font-bold uppercase transition-all transform border-2 bg-warm-sunrise-lime text-warm-sunrise-charcoal border-warm-sunrise-offwhite shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg active:translate-x-0 active:translate-y-0 active:shadow-none"
                >
                    Sign Up
                </button>
            </nav>

            {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION - High Energy
      ═══════════════════════════════════════════════════════════════════ */}
            <section className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-20 text-center pattern-grid-lg">
                <div className="relative z-10 max-w-5xl space-y-8">
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest uppercase border border-warm-sunrise-lime text-warm-sunrise-lime bg-warm-sunrise-lime/10 rotate-[-2deg]">
                        Limited Edition Drop
                    </div>

                    <h1 className="text-6xl font-black leading-none md:text-8xl font-display text-warm-sunrise-offwhite">
                        WAKE UP <br />
                        <span className="text-warm-sunrise-orange text-stroke-lime">TO WELLNESS</span>
                    </h1>

                    <p className="max-w-xl mx-auto text-xl font-medium md:text-2xl text-warm-sunrise-blush">
                        Reclaim your mornings with the Warm Sunrise collection.
                        Clean energy for the digital native.
                    </p>

                    <div className="pt-8">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-8 py-4 text-xl font-black tracking-wide uppercase transition-all transform border-2 bg-warm-sunrise-lime text-warm-sunrise-charcoal border-warm-sunrise-offwhite shadow-neo md:shadow-neo-lg hover:bg-warm-sunrise-orange hover:text-white hover:scale-105 active:scale-95 active:shadow-none"
                        >
                            Shop The Drop
                        </button>
                    </div>
                </div>

                {/* Abstract Background Elements */}
                <div className="absolute top-1/4 left-10 w-32 h-32 bg-warm-sunrise-orange rounded-full blur-[80px] opacity-20 animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-warm-sunrise-lime rounded-full blur-[100px] opacity-10"></div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          BENTO GRID - Product Showcase
      ═══════════════════════════════════════════════════════════════════ */}
            <section className="px-4 py-24 bg-warm-sunrise-offwhite text-warm-sunrise-charcoal">
                <div className="max-w-6xl mx-auto">
                    <h2 className="mb-16 text-5xl font-black text-center uppercase font-display md:text-7xl">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-sunrise-orange to-warm-sunrise-lime">Collection</span>
                    </h2>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-2 h-auto md:h-[800px]">

                        {/* Feature Item - Large Left */}
                        <div className="relative overflow-hidden group border-4 border-warm-sunrise-charcoal bg-warm-sunrise-blush shadow-neo-lg md:col-span-1 md:row-span-2 rounded-2xl">
                            <div className="absolute inset-0 transition-transform duration-500 bg-cover group-hover:scale-110 grayscale group-hover:grayscale-0" style={{ backgroundImage: 'url(/images/product-1.jpg)' }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-warm-sunrise-charcoal/80 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 text-warm-sunrise-offwhite">
                                <h3 className="text-3xl font-bold uppercase font-display">Morning Fuel</h3>
                                <p className="mt-2 text-sm opacity-90">Plant-based protein to jumpstart your metabolism.</p>
                                <div className="mt-4 text-warm-sunrise-lime font-mono font-bold">$45.00</div>
                            </div>
                        </div>

                        {/* Feature Item - Top Middle */}
                        <div className="relative p-8 border-4 border-warm-sunrise-charcoal bg-warm-sunrise-lime shadow-neo-lg rounded-2xl group overflow-hidden">
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                            <h3 className="relative z-10 text-2xl font-black uppercase text-warm-sunrise-charcoal">Focus Drops</h3>
                            <p className="relative z-10 mt-2 font-bold text-warm-sunrise-charcoal/80">Citrus Blend</p>
                            <button className="absolute bottom-6 right-6 p-2 border-2 border-warm-sunrise-charcoal bg-white rounded-full hover:bg-warm-sunrise-charcoal hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </button>
                        </div>

                        {/* Feature Item - Top Right */}
                        <div className="relative flex items-center justify-center p-8 border-4 border-warm-sunrise-charcoal bg-warm-sunrise-charcoal shadow-neo-lg rounded-2xl text-warm-sunrise-offwhite">
                            <div className="text-center">
                                <div className="text-sm tracking-widest uppercase text-warm-sunrise-lime">Limited Stock</div>
                                <div className="text-5xl font-black font-display">24<span className="text-2xl">h</span></div>
                                <div className="text-sm text-warm-sunrise-orange">Flash Sale Ends Soon</div>
                            </div>
                        </div>

                        {/* Feature Item - Bottom Wide */}
                        <div className="relative p-8 border-4 border-warm-sunrise-charcoal bg-white shadow-neo-lg md:col-span-2 rounded-2xl overflow-hidden group">
                            <div className="absolute right-0 top-0 w-1/2 h-full bg-warm-sunrise-blush/30 skew-x-12 transform origin-top-right group-hover:skew-x-0 transition-transform duration-500"></div>
                            <div className="relative z-10 max-w-sm">
                                <h3 className="text-3xl font-black uppercase text-warm-sunrise-charcoal">The Starter Kit</h3>
                                <p className="mt-4 text-lg font-medium text-gray-800">Everything you need to reset your routine. Includes Fuel, Drops, and Shaker.</p>
                                <button className="mt-6 px-6 py-3 font-bold uppercase border-2 border-warm-sunrise-charcoal bg-warm-sunrise-orange text-white shadow-neo hover:shadow-neo-lg hover:-translate-y-1 transition-all">
                                    Bundle & Save
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          CHECKOUT MODAL
      ═══════════════════════════════════════════════════════════════════ */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-warm-sunrise-charcoal/90 backdrop-blur-sm animate-fade-in">
                    <div className="relative w-full max-w-md bg-warm-sunrise-offwhite border-4 border-warm-sunrise-lime shadow-[10px_10px_0px_0px_#BFFF00] p-8 animate-scale-in">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 p-1 transition-transform hover:rotate-90"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-warm-sunrise-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        <h3 className="mb-2 text-3xl font-black uppercase font-display text-warm-sunrise-charcoal">
                            Join the <span className="text-warm-sunrise-orange">Movement</span>
                        </h3>
                        <p className="mb-6 font-medium text-gray-600">Get early access to the drop and 10% off your first order.</p>

                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block mb-1 text-xs font-bold uppercase text-warm-sunrise-charcoal">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full p-4 font-bold border-2 border-warm-sunrise-charcoal bg-white focus:outline-none focus:border-warm-sunrise-orange focus:ring-0 placeholder:font-normal"
                                />
                            </div>
                            <button className="w-full py-4 text-xl font-black uppercase transition-all bg-warm-sunrise-lime border-2 border-warm-sunrise-charcoal text-warm-sunrise-charcoal shadow-neo hover:bg-warm-sunrise-charcoal hover:text-warm-sunrise-lime hover:border-warm-sunrise-lime active:translate-y-1 active:shadow-none">
                                Unlock Access
                            </button>
                        </form>

                        <div className="mt-6 text-xs font-medium text-center text-gray-400 uppercase">
                            No spam. Just vibes.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
