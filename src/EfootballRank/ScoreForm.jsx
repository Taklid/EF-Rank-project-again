// import { useState } from "react";

// const ScoreForm = ({ addMatch }) => {
//   const [form, setForm] = useState({ player1: "", player2: "", score1: "", score2: "" });

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!form.player1 || !form.player2) return;
//     if (typeof addMatch === "function") {
//       addMatch(form);
//       setForm({ player1: "", player2: "", score1: "", score2: "" });
//     } else {
//       console.error("addMatch function is missing!");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3 mb-6">
//       <input
//         name="player1"
//         value={form.player1}
//         onChange={handleChange}
//         placeholder="Player 1"
//         className="p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400"
//         required
//       />
//       <input
//         name="player2"
//         value={form.player2}
//         onChange={handleChange}
//         placeholder="Player 2"
//         className="p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400"
//         required
//       />
//       <input
//         name="score1"
//         type="number"
//         value={form.score1}
//         onChange={handleChange}
//         placeholder="Score 1"
//         className="p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400"
//         required
//       />
//       <input
//         name="score2"
//         type="number"
//         value={form.score2}
//         onChange={handleChange}
//         placeholder="Score 2"
//         className="p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-green-400"
//         required
//       />
//       <button type="submit" className="col-span-2 bg-green-600 hover:bg-green-700 p-2 rounded font-bold">
//         Submit Match
//       </button>
//     </form>
//   );
// };

// export default ScoreForm;
