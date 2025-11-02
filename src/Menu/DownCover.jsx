import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

/**
 * DownCover.jsx
 * Enhanced, responsive cover / hero component built with Tailwind CSS + Framer Motion.
 *
 * Features:
 * - accepts a coverImage prop (URL or imported asset)
 * - responsive layout (stack on mobile, split on larger screens)
 * - configurable title, subtitle, and two CTAs
 * - gradient overlay and optional dark mode overlay
 * - subtle enter animations using framer-motion
 * - accessible buttons and semantic markup
 *
 * Usage examples:
 * <DownCover />
 * <DownCover
 *    coverImage={yourImage}
 *    title="Delicious food, delivered fast"
 *    subtitle="Fresh ingredients • Local chefs • Easy ordering"
 *    primaryCta={{ label: 'Order Now', to: '/menu' }}
 *    secondaryCta={{ label: 'Reserve Table', to: '/reservation' }}
 * />
 */

const DownCover = ({
    coverImage = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1650&q=80',
    title = 'Delicious food, delivered fast',
    subtitle = 'Fresh ingredients • Local chefs • Easy ordering',
    primaryCta = { label: 'Order Now', to: '/menu' },
    secondaryCta = { label: 'Reserve Table', to: '/reservation' },
    darkOverlay = true,
}) => {
    return (
        <section
            aria-label="Hero - food cover"
            className="relative w-full min-h-[62vh] sm:min-h-[70vh] lg:min-h-[78vh] flex items-center"
            style={{
                backgroundImage: `url(${coverImage})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
            {/* optional dark overlay for contrast */}
            <div
                className={`absolute inset-0 pointer-events-none ${darkOverlay ? 'bg-black/45' : ''} `}
            />

            {/* subtle gradient at bottom to make text pop */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-6 lg:gap-12">
                    {/* Left: Text area */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="w-full lg:w-2/3 text-center lg:text-left"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
                            {title}
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/90">
                            {subtitle}
                        </p>

                        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-start gap-3 sm:gap-4">
                            <Link
                                to={primaryCta.to}
                                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-medium text-sm sm:text-base bg-amber-500/95 hover:bg-amber-600 transition-shadow shadow-md"
                                aria-label={primaryCta.label}
                            >
                                {primaryCta.label}
                            </Link>

                            <Link
                                to={secondaryCta.to}
                                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-medium text-sm sm:text-base bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20"
                                aria-label={secondaryCta.label}
                            >
                                {secondaryCta.label}
                            </Link>
                        </div>

                        {/* optional small features row */}
                        <div className="mt-6 flex flex-wrap gap-3 text-xs sm:text-sm text-white/90">
                            <span className="bg-white/10 px-3 py-1 rounded-full">Free delivery over $20</span>
                            <span className="bg-white/10 px-3 py-1 rounded-full">30 mins avg delivery</span>
                            <span className="bg-white/10 px-3 py-1 rounded-full">Local favorites</span>
                        </div>
                    </motion.div>

                    {/* Right: Decorative card (visible on medium+) */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.12 }}
                        className="w-full lg:w-1/3 flex justify-center lg:justify-end"
                    >
                        <div className="hidden sm:block bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 w-72 lg:w-80 shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src={coverImage}
                                        alt="preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-white">Chef’s special — Today</h3>
                                    <p className="text-[13px] text-white/80 mt-1">Spicy honey glazed chicken with seasonal salad</p>
                                    <div className="mt-3 flex items-center gap-2">
                                        <span className="text-sm font-bold text-white">$12.99</span>
                                        <span className="text-xs text-white/80 line-through">$15.99</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <Link
                                    to={primaryCta.to}
                                    className="block text-center rounded-xl py-2 font-medium bg-amber-500/95 hover:bg-amber-600"
                                >
                                    Add to cart
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll down chevron - anchored bottom center */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-20">
                <motion.button
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    whileHover={{ y: -3 }}
                    aria-label="Scroll down"
                    className="flex flex-col items-center gap-1"
                    onClick={() => {
                        const el = document.querySelector('#next-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                        <FaChevronDown className="text-white" />
                    </div>
                    <span className="text-xs text-white/80 mt-1">Scroll</span>
                </motion.button>
            </div>
        </section>
    );
};

export default DownCover;
