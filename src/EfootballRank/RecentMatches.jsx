// // RecentMatches.jsx
// import { motion } from "framer-motion";
// import { Edit, Trash2 } from "lucide-react";

// const RecentMatches = ({ matches = [], onEdit, onDelete }) => {
//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mt-8 mb-3 text-center">⚡ Recent Matches</h2>

//       <div className="space-y-3">
//         {matches.length === 0 && (
//           <p className="text-center text-gray-400">No matches yet.</p>
//         )}

//         {matches.map((m) => (
//           <motion.div
//             key={m._id}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-gray-700 p-3 rounded-lg flex justify-between items-center"
//           >
//             <div>
//               <span className="font-bold">{m.player1}</span> 🆚{" "}
//               <span className="font-bold">{m.player2}</span>
//             </div>

//             <div className="flex items-center gap-3">
//               <span className="font-semibold text-lg">
//                 {m.score1} : {m.score2}
//               </span>

//               <button
//                 onClick={() => onEdit?.(m)}
//                 className="p-1 bg-blue-500 rounded hover:bg-blue-600"
//               >
//                 <Edit size={16} />
//               </button>

//               <button
//                 onClick={() => onDelete?.(m._id)}
//                 className="p-1 bg-red-500 rounded hover:bg-red-600"
//               >
//                 <Trash2 size={16} />
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecentMatches;
