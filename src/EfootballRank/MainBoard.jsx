// import { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import ScoreForm from "./ScoreForm";
// import BoardDisplay from "./BoardDisplay";

// const API_URL = "http://localhost:13000/matches";

// const MainBoard = () => {
//   const [matches, setMatches] = useState([]);

//   useEffect(() => {
//     const loadMatches = async () => {
//       try {
//         const res = await axios.get(API_URL);
//         setMatches(res.data);
//       } catch {
//         Swal.fire("⚠️ Error", "Failed to load matches!", "error");
//       }
//     };
//     loadMatches();
//   }, []);

//   // নতুন ম্যাচ যোগ করার function
//   const addMatch = async (match) => {
//     try {
//       const res = await axios.post(API_URL, match);
//       const newMatch = { ...match, _id: res.data._id || Date.now() };
//       setMatches((prev) => [newMatch, ...prev]);
//       Swal.fire("✅ Added!", "Match successfully added!", "success");
//     } catch {
//       Swal.fire("❌ Error", "Failed to add match!", "error");
//     }
//   };

//   const deleteMatch = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       setMatches((prev) => prev.filter((m) => m._id !== id));
//       Swal.fire("🗑 Deleted!", "Match removed!", "success");
//     } catch {
//       Swal.fire("⚠️ Error", "Failed to delete match!", "error");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">🏆 Smart Scoreboard</h1>

//       {/* Props হিসেবে addMatch পাঠানো হলো */}
//       <ScoreForm addMatch={addMatch} />

//       {/* Leaderboard & Recent Matches */}
//       <BoardDisplay matches={matches} deleteMatch={deleteMatch} />
//     </div>
//   );
// };

// export default MainBoard;
