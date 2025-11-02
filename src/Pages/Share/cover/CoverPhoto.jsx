import { motion } from "framer-motion";
import coverpic from "../../../assets/home/banner.jpg";

const CoverPhoto = () => {
  return (
    <div
      className="relative w-full h-[80vh] md:h-[90vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${coverpic})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"></div>

      {/* Animated Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center px-4 md:px-8 text-white max-w-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold mb-5 drop-shadow-lg"
        >
          Hello There
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="text-sm md:text-lg mb-6 leading-relaxed opacity-90"
        >
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="btn bg-lime-500 hover:bg-lime-600 text-black font-semibold border-none shadow-lg transition-transform duration-300"
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Animated Future Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-5 md:bottom-10 flex flex-wrap gap-3 md:gap-4 justify-center w-full px-4"
      >
        {[
          { text: "🚀 Fast Delivery" },
          { text: "🍴 Fresh Food" },
          { text: "💯 Quality Service" },
        ].map((badge, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="bg-white/20 text-white px-4 py-2 rounded-xl backdrop-blur-md hover:bg-white/30 transition cursor-default"
          >
            {badge.text}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CoverPhoto;
