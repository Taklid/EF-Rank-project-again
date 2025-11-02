import React, { useState } from "react";
import coverimg from "../../assets/home/naturel.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Coffee } from "lucide-react";
import Card from "../../FoodCard/Card";
import UseMenu from "../../CustomHook/Hook/UseMenu";

const OrderFood = () => {
  const [activeTab, setActiveTab] = useState("salad");
  const [menu] = UseMenu(); // ✅ Correct hook call

  const tabs = [
    { id: "salad", label: "🥗 SALAD" },
    { id: "pizza", label: "🍕 PIZZA" },
    { id: "dessert", label: "🍰 DESSERT" },
    { id: "drinks", label: "🥤 DRINKS" },
  ];

  const tabContent = {
    salad: {
      title: "Healthy Salads",
      text: "Fresh and organic salads prepared with the finest ingredients to refresh your day!",
    },
    pizza: {
      title: "Cheesy Pizzas",
      text: "Crispy crust, melted cheese, and toppings made to perfection. Try our pizza today!",
    },
    dessert: {
      title: "Sweet Desserts",
      text: "Cakes, brownies, and more — a perfect ending to any meal!",
    },
    drinks: {
      title: "Refreshing Drinks",
      text: "Smoothies, mocktails, and beverages to keep you energized and happy.",
    },
  };

  // ✅ Filter food items by active category
  const filteredMenu = menu?.filter((item) => item.category === activeTab);

  return (
    <>
      {/* 🔹 Hero / Cover Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Background Image */}
        <motion.img
          src={coverimg}
          alt="Order Food"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 backdrop-blur-[1.5px]" />

        {/* Floating Icons */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: [0, -20, 0], opacity: 1 }}
          transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
          className="absolute top-[15%] left-[12%] text-amber-400/80"
        >
          <Utensils size={50} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: [0, 20, 0], opacity: 1 }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[18%] right-[14%] text-yellow-400/70"
        >
          <Coffee size={45} />
        </motion.div>

        {/* Main Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 px-6 sm:px-10 text-white max-w-3xl"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block text-5xl md:text-6xl font-extrabold mb-5 tracking-widest text-amber-400 drop-shadow-[0_0_20px_#fbbf24]"
          >
            <span className="relative z-10">ORDER FOOD</span>
            <span className="absolute -inset-2 rounded-xl border-2 border-amber-400/50 animate-pulse blur-sm"></span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-base md:text-lg text-gray-200 leading-relaxed drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          >
            Fresh, organic, and handcrafted meals — ready to serve your taste buds!
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "70%" }}
            transition={{ duration: 1.3, ease: "easeInOut", delay: 0.7 }}
            className="mt-6 mx-auto h-[3px] bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 rounded-full shadow-[0_0_25px_#fbbf24]"
          ></motion.div>
        </motion.div>
      </section>

      {/* 🔹 Tabs Section */}
      <section className="bg-gradient-to-b from-gray-900 to-black text-white py-16 px-6 flex flex-col items-center justify-center">
        <h3 className="text-3xl sm:text-4xl font-bold mb-8 text-amber-400 tracking-widest drop-shadow-[0_0_15px_#fbbf24]">
          Our Special Menu
        </h3>

        {/* Tab Buttons */}
        <div className="flex gap-4 flex-wrap justify-center mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-2 font-semibold rounded-full text-sm sm:text-base transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-amber-500 text-white shadow-lg shadow-amber-500/40"
                  : "border border-amber-400/40 text-gray-300 hover:bg-amber-500/20"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 rounded-full bg-amber-500 -z-10"
                  transition={{ type: "spring", duration: 0.5 }}
                ></motion.div>
              )}
            </button>
          ))}
        </div>

        {/* Tab Info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-amber-400/30 shadow-lg text-center max-w-xl"
          >
            <h4 className="text-2xl font-bold text-amber-400 mb-3">
              {tabContent[activeTab].title}
            </h4>
            <p className="text-gray-200">{tabContent[activeTab].text}</p>
          </motion.div>
        </AnimatePresence>

        {/* Food Cards */}
        <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMenu?.length > 0 ? (
            filteredMenu.map((item) => <Card key={item._id} item={item} />)
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No items available in this category.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default OrderFood;
