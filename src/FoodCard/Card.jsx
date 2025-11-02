import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star } from "lucide-react";
import "./card.css";

const Card = ({ item }) => {
  if (!item) return null;

  const { name, image, price, recipe } = item;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="flex justify-center p-3"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative flex flex-col justify-between bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl border border-gray-700 overflow-hidden w-[90%] sm:w-[300px] md:w-[320px] min-h-[430px] hover:shadow-[0_0_20px_#00ffcc] transition-all duration-500"
      >
        {/* 🔹 Animated Border Glow */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-0 hover:opacity-100 animate-glow pointer-events-none"></div>

        {/* ❤️ Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          className="absolute top-3 right-3 bg-white/10 backdrop-blur-md p-2 rounded-full hover:bg-pink-600/70 transition"
        >
          <Heart className="text-pink-400 hover:text-white" size={18} />
        </motion.button>

        {/* 🖼️ Food Image */}
        <div className="relative overflow-hidden group h-[200px]">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-xs p-2 text-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            {recipe?.length > 70 ? recipe.slice(0, 70) + "..." : recipe}
          </div>
        </div>

        {/* 🧾 Content */}
        <div className="flex flex-col justify-between flex-grow p-4 text-center">
          <div>
            <h2 className="text-lg font-bold mb-1">{name}</h2>

            {/* ⭐ Rating Stars */}
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="text-yellow-400 fill-yellow-400"
                  size={15}
                />
              ))}
            </div>

            <p className="text-gray-300 mb-3 text-sm min-h-[45px]">
              {recipe?.length > 80 ? recipe.slice(0, 80) + "..." : recipe}
            </p>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-base font-semibold text-cyan-400">
              ${price}
            </span>

            {/* 🛒 Add to Cart Button */}
            <motion.button
              whileHover={{
                scale: 1.08,
                boxShadow: "0px 0px 10px #00ffcc",
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold px-3 py-1.5 rounded-full shadow-md transition-all duration-300 text-sm"
            >
              <ShoppingCart size={16} />
              Add
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
