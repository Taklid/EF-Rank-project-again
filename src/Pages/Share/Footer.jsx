import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowUp,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const Footer = () => {
  // Scroll To Top Function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-300 pt-10 pb-6 overflow-hidden">
      {/* 🔹 Animated Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,204,0.05)_0%,_transparent_70%)] pointer-events-none"></div>

      {/* 🔹 Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 z-10 relative">
        {/* 🏢 Company Info */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[20px] font-bold text-cyan-400 mb-4"
          >
            UWP EFOOTBALL CLUB 
          </motion.h2>
          <p className="text-sm leading-relaxed">
          UWP eFootball Club is a passionate and fast-growing eSports team dedicated to the world of eFootball (PES). Formed by a group of talented and determined players, UWP stands for unity, discipline, and excellence on the virtual pitch.
          </p>

          <div className="mt-4 space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <MapPin size={16} className="text-cyan-400" /> Dhaka, Bangladesh
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-cyan-400" /> support@uwp.com
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} className="text-cyan-400" /> +880 1234-567890
            </p>
          </div>
        </div>

        {/* 🔗 Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {["Home", "Menu", "About Us", "Reservation", "Contact"].map((link, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 5, color: "#00ffff" }}
                className="transition-all cursor-pointer"
              >
                {link}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* 🕒 Opening Hours */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Opening Hours</h3>
          <ul className="space-y-2 text-sm">
            <li>Mon - Fri: 10:00 AM - 10:00 PM</li>
            <li>Saturday: 11:00 AM - 11:30 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>

        {/* 🌐 Social Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <motion.a
                key={i}
                whileHover={{
                  scale: 1.2,
                  rotate: 8,
                  color: "#00ffff",
                  boxShadow: "0 0 15px #00ffff",
                }}
                className="bg-gray-800 p-3 rounded-full hover:bg-cyan-600 transition cursor-pointer"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 Divider Line */}
      <div className="border-t border-gray-700 my-8 mx-6 z-10 relative"></div>

      {/* 🔹 Bottom Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto px-6 text-sm text-gray-400 z-10 relative">
    <p>© {new Date().getFullYear()} UWP Esports Club.</p>

    <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-4 sm:mt-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 font-semibold tracking-widest animate-pulse drop-shadow-[0_0_10px_#00ffff]"
    >
        @DEVELOPER BY TAKLID AHAMMED
    </motion.p>

    <motion.button
        whileHover={{ scale: 1.2, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="mt-4 sm:mt-0 flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-400 text-white px-4 py-2 rounded-full shadow-md"
    >
        <ArrowUp size={16} /> Back to Top
    </motion.button>
</div>
    </footer>
  );
};

export default Footer;
