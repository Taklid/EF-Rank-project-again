// CoverPhoto.jsx — UWP eFootball Club Hero Section (Full Enhanced & Responsive)
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import coverpic from "../../../assets/home/messi-3.jpg";
import { Volume2, VolumeX, ChevronDown } from "lucide-react";

// ✅ Reusable CTA Button
const CtaButton = ({ children, onClick = () => {} }) => (
  <motion.button
    whileHover={{
      scale: 1.05,
      boxShadow:
        "0 10px 15px -3px rgba(163,230,53,0.4), 0 4px 6px -2px rgba(163,230,53,0.2)",
    }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1, duration: 0.6 }}
    onClick={onClick}
    className="px-6 md:px-10 py-3 md:py-4 text-base md:text-lg bg-lime-500 hover:bg-lime-600 text-black font-bold rounded-full border-none shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-lime-500/50"
  >
    {children}
  </motion.button>
);

// ✅ Player Badge Component
const PlayerBadge = ({ name, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      delay: 1.2 + index * 0.1,
      type: "spring",
      stiffness: 100,
    }}
    whileHover={{
      scale: 1.15,
      backgroundColor: "rgba(255,255,255,0.45)",
      rotate: 1,
    }}
    className="bg-white/20 text-white text-xs sm:text-sm md:text-base px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition duration-300 cursor-default shadow-lg ring-1 ring-white/50"
  >
    {name}
  </motion.div>
);

const CoverPhoto = () => {
  const players = [
    { name: "🔥 Rakib" },
    { name: "🔥 Harun" },
    { name: "🔥 Raju" },
    { name: "🔥 Rajib" },
    { name: "🔥 Sakil" },
    { name: "🔥 Imran" },
    { name: "🔥 Rohim" },
  ];

  const [musicOn, setMusicOn] = useState(false);

  // Framer Motion scroll-based parallax
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.4]);

  const handleJoinClick = () => {
    console.log("Join Our Team clicked!");
    // Example: navigate("/join")
  };

  return (
    <div className="relative w-full min-h-[80vh] md:min-h-[100vh] flex items-center justify-center overflow-hidden bg-black">
      {/* 🖼️ Background with Parallax */}
      <motion.img
        src={coverpic}
        alt="UWP eFootball Club - Hero background image"
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full object-cover object-center scale-110"
      />

      {/* 🌑 Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>

      {/* 🎧 Background Music Toggle */}
      {/* <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setMusicOn(!musicOn)}
        className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/10 p-3 rounded-full backdrop-blur-md hover:bg-white/20 transition"
      >
        {musicOn ? (
          <Volume2 className="text-lime-400 w-6 h-6" />
        ) : (
          <VolumeX className="text-gray-300 w-6 h-6" />
        )}
      </motion.button> */}

      {/* 🎶 Optional audio tag */}
      {/* {musicOn && (
        <audio
          src="/music/uwp-theme.mp3" // 🎵 নিজের মিউজিক path দিন
          autoPlay
          loop
          volume={0.5}
        />
      )} */}

      {/* 🏆 Center Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center px-4 md:px-8 text-white max-w-5xl w-full py-16"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-6xl lg:text-8xl font-black mb-4 drop-shadow-2xl tracking-tight leading-tight"
        >
          UWP <span className="text-lime-400">eFootball Club</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="text-base sm:text-xl md:text-2xl mb-8 leading-relaxed text-white/90 font-medium"
        >
          Undefeated Warriors Of PES • Play With Heart • Win With Honor
          <br className="hidden sm:block" />
          <span className="text-lime-300 block mt-2">
            Representing Bangladesh in the global eFootball arena!
          </span>
        </motion.p>

        <CtaButton onClick={handleJoinClick}>Join Our Team</CtaButton>
      </motion.div>

      {/* 🏅 Player Badges */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 md:bottom-12 flex flex-wrap gap-2 md:gap-4 justify-center w-full px-4 max-w-4xl z-10"
      >
        {players.map((player, index) => (
          <PlayerBadge key={index} name={player.name} index={index} />
        ))}
      </motion.div>

      {/* ⬇️ Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-2 md:bottom-6 text-center text-lime-400"
      >
        <ChevronDown className="w-8 h-8 animate-pulse mx-auto" />
        <p className="text-xs sm:text-sm text-white/60">Scroll Down</p>
      </motion.div>

      {/* ✨ Moving Glow Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.2, 0.6, 0.2],
          x: ["-20%", "20%", "-20%"],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-lime-400/10 via-transparent to-lime-400/10 pointer-events-none z-0"
      ></motion.div>
    </div>
  );
};

export default CoverPhoto;
