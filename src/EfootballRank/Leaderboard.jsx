// // Leaderboard.jsx
// import { motion } from "framer-motion";

// const Leaderboard = ({ leaderboard = [], search = "" }) => {
//   const filtered = leaderboard
//     .filter((p) =>
//       p?.name?.toLowerCase().includes(search.toLowerCase())
//     )
//     .sort((a, b) => b.points - a.points); // Optional: auto-sort by points

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-3 text-center">🏁 Leaderboard</h2>
//       <div className="grid gap-2">
//         {filtered.length === 0 && (
//           <p className="text-center text-gray-400">No players found.</p>
//         )}
//         {filtered.map((p, i) => (
//           <motion.div
//             key={p.name || i}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.05 }}
//             className={`flex justify-between p-3 rounded-lg items-center shadow-md ${
//               i === 0 ? "bg-yellow-400 text-black font-bold" : "bg-gray-700"
//             }`}
//           >
//             <span>
//               {i + 1}. {p.name}
//             </span>
//             <span>
//               Pts: {p.points} | W:{p.wins} D:{p.draws} L:{p.losses} | Played:{" "}
//               {p.played}
//             </span>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;
