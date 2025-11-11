// DownCover.jsx — UWP Club Hero Section (Enhanced & Responsive)

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChevronDown, FaTrophy, FaUsers, FaGamepad, FaMedal } from "react-icons/fa";
import { useEffect, useState } from "react";

// একটি ছোট কম্পোনেন্ট, যা Stat Card-এর ভেতরের তথ্যগুলো দেখায়
const StatItem = ({ icon: Icon, label, value }) => (
    <motion.div
        className="flex flex-col items-center p-2 sm:p-0"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
    >
        <Icon className="text-amber-400 text-3xl sm:text-4xl mb-1.5 drop-shadow-md" />
        <p className="text-sm sm:text-base text-gray-400 font-medium">{label}</p>
        <p className="text-xl sm:text-2xl font-black text-gray-100 mt-0.5">{value}</p>
    </motion.div>
);

const DownCover = ({
    coverImage = "/assets/EF-Player-Pic/pic-1.jpg",
    title = "UWP CLUB — WARRIORS OF PES MEETS GAMEPLAY",
    subtitle = "Train. Compete. Conquer. Join Bangladesh’s fastest-growing eFootball community.",
    primaryCta = { label: "Join the Club", to: "/signin" }, // DUMMY PATH
    secondaryCta = { label: "View Matches"}, // DUMMY PATH
}) => {
    // 🎯 Animated Counter State
    const [count, setCount] = useState({ members: 0, tournaments: 0, matches: 0, champions: 0 });

    useEffect(() => {
        const target = { members: 120, tournaments: 25, matches: 300, champions: 8 };
        const duration = 1500;
        let startTime;

        const animateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            setCount({
                members: Math.floor(progress * target.members),
                tournaments: Math.floor(progress * target.tournaments),
                matches: Math.floor(progress * target.matches),
                champions: Math.floor(progress * target.champions),
            });

            if (progress < 1) {
                requestAnimationFrame(animateCount);
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(animateCount);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 }); // যখন ২০% স্ক্রিনে আসবে তখন অ্যানিমেশন শুরু হবে

        const statsElement = document.getElementById("club-stats");
        if (statsElement) observer.observe(statsElement);

        return () => {
            if (statsElement) observer.unobserve(statsElement);
        };
    }, []);

    // 🕓 Countdown for Next Tournament
    const [countdown, setCountdown] = useState("");
    useEffect(() => {
        // টার্গেট তারিখটি আপনার প্রয়োজন অনুযায়ী পরিবর্তন করুন
        const targetDate = new Date("2026-01-20T10:00:00").getTime(); 
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const diff = targetDate - now;

            if (diff <= 0) {
                setCountdown("Live Now!");
                clearInterval(interval);
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);

                // রেসপন্সিভ কাউন্টডাউন ফরম্যাট
                const countdownString = days > 0 
                    ? `${days}d ${hours}h ${minutes}m` 
                    : `${hours}h ${minutes}m ${seconds}s`;

                setCountdown(countdownString);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            aria-label="Hero - UWP Club"
            className="relative w-full min-h-[90vh] flex items-center justify-center bg-black overflow-hidden"
        >
            {/* 🖼️ Background Image (Using a pseudo-element for better control) */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    backgroundImage: `url(${coverImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: 'grayscale(50%) blur(2px)', // হালকা ব্লার ও গ্রেস্কেল যোগ করা হলো
                    transform: 'scale(1.05)',
                }}
            ></div>

            {/* 🖤 Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/95 z-0"></div>

            {/* ✨ Moving Glow Animation */}
            <motion.div
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    x: ["-10%", "10%", "-10%"],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-500/10 z-0 pointer-events-none"
            ></motion.div>

            {/* 🌟 Content Container */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
                
                {/* 📝 Left Text & CTAs */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 0.1 }}
                    className="w-full lg:w-2/3 max-w-4xl"
                >
                    {/* Title */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-500 to-orange-500 leading-tight drop-shadow-[0_4px_10px_rgba(255,200,0,0.5)]">
                        {title}
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="mt-5 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto lg:mx-0 font-light leading-relaxed">
                        {subtitle}
                    </p>

                    {/* 🎯 CTA Buttons - Better Responsive */}
                    <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                to={primaryCta.to}
                                className="inline-block w-full sm:w-auto px-8 py-3 rounded-full font-bold text-black text-lg bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-400 shadow-xl transition-all duration-300 transform hover:shadow-[0_10px_20px_rgba(255,200,0,0.4)]"
                            >
                                {primaryCta.label}
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                to={secondaryCta.to}
                                className="inline-block w-full sm:w-auto px-8 py-3 rounded-full border-2 border-yellow-400 text-yellow-300 font-semibold hover:bg-yellow-400/15 transition-all duration-300"
                            >
                                {secondaryCta.label}
                            </Link>
                        </motion.div>
                    </div>

                    {/* 💫 Club Stats - Now using StatItem component and intersection observer */}
                    <div 
                        id="club-stats" // For Intersection Observer
                        className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto lg:mx-0 text-gray-100 bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-yellow-400/20"
                    >
                        <StatItem icon={FaUsers} label="Members" value={`${count.members}+`} />
                        <StatItem icon={FaTrophy} label="Tournaments" value={`${count.tournaments}+`} />
                        <StatItem icon={FaGamepad} label="Matches" value={`${count.matches}+`} />
                        <StatItem icon={FaMedal} label="Champions" value={`${count.champions}x`} />
                    </div>
                </motion.div>

                {/* 🎮 Right Info Card - Sticky on large screens */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,200,0,0.3)" }}
                    className="w-full lg:w-1/3 flex justify-center lg:justify-end"
                >
                    <div className="relative bg-white/10 backdrop-blur-lg border border-yellow-400/50 rounded-3xl p-6 w-72 sm:w-80 text-center shadow-[0_0_20px_rgba(255,200,0,0.2)] transition-all duration-300">
                        <h3 className="text-yellow-400 font-black text-xl mb-3 border-b border-yellow-400/30 pb-2">Next Tournament</h3>
                        <p className="text-gray-100 text-base mb-1">
                            <strong>UWP eFootball Cup 2026</strong>
                        </p>
                        <p className="text-gray-300 text-sm mb-1">Date: 20 January 2026</p>
                        <p className="text-gray-300 text-sm mb-4">Venue: Online Global Qualifier</p>

                        <div className="bg-black/40 p-3 rounded-xl mb-4">
                            <p className="text-amber-400 font-extrabold text-2xl">{countdown}</p>
                            <p className="text-xs text-gray-400 mt-1">Countdown</p>
                        </div>
                        
                        <Link
                            to="/signin" // DUMMY PATH
                            className="block mt-4 rounded-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-extrabold text-lg hover:from-orange-600 hover:to-yellow-500 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Register Now
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* ⬇️ Scroll Down Button */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-10 z-20">
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="flex flex-col items-center gap-1 text-yellow-400 transition-transform"
                    onClick={() => {
                        const el = document.querySelector("#next-section");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                >
                    <div className="w-12 h-12 rounded-full bg-black/50 border-2 border-yellow-400/60 flex items-center justify-center animate-bounce">
                        <FaChevronDown className="text-yellow-400 text-xl" />
                    </div>
                    <span className="text-xs text-yellow-300 font-medium mt-1 uppercase tracking-wider">Explore</span>
                </motion.button>
            </div>
        </section>
    );
};

export default DownCover;