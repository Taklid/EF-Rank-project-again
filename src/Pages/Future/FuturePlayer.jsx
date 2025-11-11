
import Imglp from "../../assets/EF-New-Player-Pic/nedvad.jpeg";
import { motion } from "framer-motion";
import { Trophy, Users, Rocket, Gamepad2 } from "lucide-react";
import "./FutureDesigen.css";

const FuturePlayer = () => {
  return (
    <div className="future bg-gradient-to-b from-gray-900 to-black flex flex-col md:flex-row justify-center items-center gap-10 py-16 px-4 md:px-10 relative overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-md z-0"></div>

      {/* Image Section */}
      <motion.div
        className="flex justify-center z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          className="w-[90%] md:w-[420px] h-[240px] md:h-[260px] rounded-xl shadow-2xl object-cover border border-gray-700"
          src={Imglp}
          alt="Featured"
        />
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="text-white text-center md:text-left space-y-4 max-w-[450px] z-10"
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lime-400 font-medium tracking-wide">
          🔥 UWP Club eFootball 2025
        </p>
        <h2 className="text-3xl font-extrabold uppercase tracking-wider">
          The Future of eFootball Starts Here
        </h2>
        <p className="text-gray-200 leading-relaxed">
          Experience the next generation of virtual football with{" "}
          <span className="text-lime-400 font-semibold">UWP Club eFootball</span>.
          Play, compete, and build your dream club — powered by AI analytics,
          global matchmaking, and immersive 3D visuals.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-sm">
          <div className="flex flex-col items-center">
            <Trophy className="text-lime-400 w-8 h-8 mb-1" />
            <span>Global Cups</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="text-lime-400 w-8 h-8 mb-1" />
            <span>Team Builder</span>
          </div>
          <div className="flex flex-col items-center">
            <Rocket className="text-lime-400 w-8 h-8 mb-1" />
            <span>Career Mode</span>
          </div>
          <div className="flex flex-col items-center">
            <Gamepad2 className="text-lime-400 w-8 h-8 mb-1" />
            <span>eSports Ready</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-6 py-3 bg-lime-500 text-black font-bold rounded-lg shadow-md hover:bg-lime-400 transition"
        >
          EXPLORE FUTURE
        </motion.button>
      </motion.div>
    </div>
  );
};

export default FuturePlayer;
