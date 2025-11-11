// import React, { useState, useEffect } from "react";
// import coverimg from "../../assets/home/naturel.jpg";
// import { motion, AnimatePresence } from "framer-motion";
// import { Utensils, Coffee, Gamepad2, Trophy, Users, ArrowUp, Search } from "lucide-react";
// import Card from "../../FoodCard/Card";
// import UseMenu from "../../CustomHook/Hook/UseMenu";
// import { Link } from "react-router-dom";

// const OrderFood = () => {
//   const [activeTab, setActiveTab] = useState("salad");
//   const [menu] = UseMenu(); // ✅ Custom hook
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("default");
//   const [showTop, setShowTop] = useState(false);

//   const tabs = [
//     { id: "salad", label: "🥗 SALAD" },
//     { id: "pizza", label: "🍕 PIZZA" },
//     { id: "dessert", label: "🍰 DESSERT" },
//     { id: "drinks", label: "🥤 DRINKS" },
//   ];

//   const tabContent = {
//     salad: {
//       title: "Healthy Salads",
//       text: "Fresh and organic salads — fuel up before your next match!",
//     },
//     pizza: {
//       title: "Cheesy Pizzas",
//       text: "Perfect for your gaming squad! Crispy crust, cheesy layers, and love in every bite.",
//     },
//     dessert: {
//       title: "Sweet Desserts",
//       text: "Celebrate your victory with UWP’s signature desserts!",
//     },
//     drinks: {
//       title: "Refreshing Drinks",
//       text: "Stay hydrated while you play — from smoothies to mocktails!",
//     },
//   };

//   // ✅ Filter + Search + Sort
//   const filteredMenu = menu
//     ?.filter((item) => item.category === activeTab)
//     ?.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
//     ?.sort((a, b) => {
//       if (sortBy === "price-low") return a.price - b.price;
//       if (sortBy === "price-high") return b.price - a.price;
//       if (sortBy === "rating") return b.rating - a.rating;
//       return 0;
//     });

//   // ✅ Scroll-to-top visibility
//   useEffect(() => {
//     const onScroll = () => setShowTop(window.scrollY > 300);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <>
//       {/* 🌟 Hero / Cover Section */}
//       <section className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden bg-black">
//         <motion.img
//           src={coverimg}
//           alt="UWP Club Food"
//           initial={{ scale: 1.2 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 8, ease: "easeOut" }}
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/95" />

//         {/* Floating Icons */}
//         <motion.div
//           animate={{ y: [0, -20, 0] }}
//           transition={{ duration: 6, repeat: Infinity }}
//           className="absolute top-[18%] left-[10%] text-amber-400/80"
//         >
//           <Gamepad2 size={60} />
//         </motion.div>

//         <motion.div
//           animate={{ y: [0, 20, 0] }}
//           transition={{ duration: 6, repeat: Infinity, delay: 1 }}
//           className="absolute bottom-[15%] right-[12%] text-yellow-400/80"
//         >
//           <Trophy size={50} />
//         </motion.div>

//         {/* Hero Text */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="relative z-10 px-6 sm:px-10 text-white max-w-3xl"
//         >
//           <h2 className="text-4xl sm:text-6xl font-extrabold mb-5 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 drop-shadow-[0_0_20px_#fbbf24]">
//             UWP CLUB CAFE
//           </h2>
//           <p className="text-base md:text-lg text-gray-200 leading-relaxed">
//             “Fuel your passion. Play stronger. Eat smarter.” <br />
//             From the UWP Club kitchen — serving champions every day!
//           </p>
//           <motion.div
//             initial={{ width: 0 }}
//             animate={{ width: "70%" }}
//             transition={{ duration: 1.2, delay: 0.4 }}
//             className="mt-6 mx-auto h-[3px] bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 rounded-full shadow-[0_0_20px_#fbbf24]"
//           />
//         </motion.div>

//         {/* Club Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.7, duration: 1 }}
//           className="absolute bottom-10 left-1/2 -translate-x-1/2 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
//         >
//           {[{ icon: <Users />, label: "Members", value: "120+" },
//             { icon: <Trophy />, label: "Tournaments", value: "25+" },
//             { icon: <Gamepad2 />, label: "Matches", value: "300+" },
//             { icon: <Utensils />, label: "Dishes", value: "50+" }]
//             .map((stat, i) => (
//               <motion.div
//                 key={i}
//                 whileHover={{ scale: 1.1 }}
//                 className="bg-white/10 border border-yellow-400/30 rounded-xl px-4 py-2 text-yellow-300 backdrop-blur-md shadow-md"
//               >
//                 <div className="flex justify-center mb-1">{stat.icon}</div>
//                 <p className="text-xs uppercase text-gray-300">{stat.label}</p>
//                 <p className="font-bold text-lg text-amber-400">{stat.value}</p>
//               </motion.div>
//             ))}
//         </motion.div>
//       </section>

//       {/* 🌟 Tabs + Filter + Sort Section */}
//       <section className="bg-gradient-to-b from-gray-900 to-black text-white py-20 px-4 md:px-10 flex flex-col items-center">
//         <h3 className="text-3xl sm:text-4xl font-bold mb-8 text-amber-400 tracking-widest">
//           UWP Club Menu
//         </h3>

//         {/* Search + Sort Controls */}
//         <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
//           <div className="relative">
//             <Search className="absolute left-3 top-2.5 text-amber-400" size={18} />
//             <input
//               type="text"
//               placeholder="Search your food..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 rounded-full bg-white/10 border border-amber-400/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition w-64 sm:w-72"
//             />
//           </div>
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="py-2 px-4 rounded-full bg-white/10 border border-amber-400/40 text-white focus:ring-2 focus:ring-amber-400 transition"
//           >
//             <option value="default">Sort by</option>
//             <option value="price-low">Price: Low → High</option>
//             <option value="price-high">Price: High → Low</option>
//             <option value="rating">Top Rated</option>
//           </select>
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-4 flex-wrap justify-center mb-10">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`px-6 py-2 font-semibold rounded-full text-sm sm:text-base transition-all duration-300 ${
//                 activeTab === tab.id
//                   ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg"
//                   : "border border-amber-400/40 text-gray-300 hover:bg-amber-500/10"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* Tab Info */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             initial={{ opacity: 0, y: 25 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -25 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-amber-400/30 shadow-lg text-center max-w-xl"
//           >
//             <h4 className="text-2xl font-bold text-amber-400 mb-3">
//               {tabContent[activeTab].title}
//             </h4>
//             <p className="text-gray-200">{tabContent[activeTab].text}</p>
//           </motion.div>
//         </AnimatePresence>

//         {/* Food Cards */}
//         <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 w-full max-w-7xl">
//           {filteredMenu?.length > 0 ? (
//             filteredMenu.map((item) => <Card key={item._id} item={item} />)
//           ) : (
//             <p className="col-span-full text-center text-gray-400">
//               No items available in this category.
//             </p>
//           )}
//         </div>

//         {/* Footer CTA */}
//         <div className="mt-20 text-center">
//           <motion.h4
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//             className="text-xl text-yellow-400 font-semibold mb-4"
//           >
//             Ready to join the champions?
//           </motion.h4>
//           <Link
//             to="/join"
//             className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:scale-105 transition-all shadow-lg"
//           >
//             Join UWP Club
//           </Link>
//         </div>
//       </section>

//       {/* Scroll To Top */}
//       <AnimatePresence>
//         {showTop && (
//           <motion.button
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 40 }}
//             whileHover={{ scale: 1.1 }}
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             className="fixed bottom-6 right-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-black p-3 rounded-full shadow-lg z-50"
//           >
//             <ArrowUp />
//           </motion.button>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default OrderFood;
