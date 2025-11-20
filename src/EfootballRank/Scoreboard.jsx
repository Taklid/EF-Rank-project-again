import { useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";


import {
  Sun,
  Moon,
  Edit,
  Trash2,
  RefreshCcw,
  Download,
  ChevronDown,
  ChevronUp,
  X,
  Zap,
  Crown,
  TrendingUp,
  // 👑 New icon for Man of the Match (MOTM)
} from "lucide-react";
import { AuthContext } from "../Provider/AuthProvider";


const API_URL = "https://ef-server-rank-status.vercel.app/matches";

// NEW: Helper component for the modal
const StatCard = ({ label, value, color }) => (
  <div className="p-3 bg-gray-700 rounded-lg shadow-md">
    <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
    <p className="text-sm text-gray-400 mt-1">{label}</p>
  </div>
);


// NEW: Modal Component (Inline for simplicity)
const PlayerStatsModal = ({ playerName, leaderboard, matches, onClose }) => {
  const stats = leaderboard.find((p) => p.name === playerName);

  const playerMatches = matches
    .filter((m) => m.player1 === playerName || m.player2 === playerName)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!stats) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-800 text-white p-6 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center border-b border-gray-600 pb-3 mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Zap size={24} /> {playerName}'s Profile
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-700 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Key Stats Summary */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-center">
            <StatCard label="Total Points" value={stats.points} color="text-yellow-400" />
            <StatCard label="Win Percentage" value={`${stats.ratio}%`} color="text-green-400" />
            <StatCard label="Total Played" value={stats.played} color="text-blue-400" />
            {/* 👑 MOTM Stat Card Added */}
            <StatCard label="Man of the Match" value={stats.motm} color="text-yellow-600" />
            <StatCard label="Current Streak" value={stats.streak || "N/A"} color={stats.streak?.startsWith('W') ? "text-red-400" : "text-gray-400"} />
          </div>

          {/* Match History */}
          <h3 className="text-xl font-semibold mb-3 border-t pt-4 border-gray-600">Match History ({playerMatches.length})</h3>
          <div className="space-y-2">
            {playerMatches.slice(0, 10).map((m) => {
              const isP1 = m.player1 === playerName;
              const result =
                m.score1 === m.score2
                  ? "Draw"
                  : isP1
                    ? m.score1 > m.score2
                      ? "Win"
                      : "Loss"
                    : m.score2 > m.score1
                      ? "Win"
                      : "Loss";

              const opponent = isP1 ? m.player2 : m.player1;
              const score = isP1 ? `${m.score1}-${m.score2}` : `${m.score2}-${m.score1}`;

              let resultClass = "";
              if (result === "Win") resultClass = "bg-green-600";
              else if (result === "Loss") resultClass = "bg-red-600";
              else resultClass = "bg-yellow-600";

              return (
                <div key={m._id} className="flex justify-between items-center p-3 rounded-lg bg-gray-700">
                  <span className="text-sm text-gray-400">vs {opponent}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">{score}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${resultClass}`}>{result}</span>
                    {m.motm === playerName && <Crown size={16} className="text-yellow-400" title="Man of the Match" />}
                  </div>
                </div>
              );
            })}
            {playerMatches.length > 10 && <p className="text-center text-gray-500 text-sm">...and {playerMatches.length - 10} more matches</p>}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
// --------------------------------------------------------------------------------
// 👑 NEW PLAYER SUMMARY CARD COMPONENT (Matches the provided image)
// --------------------------------------------------------------------------------

const calculateStats = (playerStats) => {
  if (!playerStats) return {};
  const { played, wins, draws, goalsFor, goalsAgainst,  } = playerStats;
  const goalDifference = goalsFor - goalsAgainst;
  const winRate = played > 0 ? ((wins / played) * 100).toFixed(1) : 0;
  return { goalDifference, winRate };
};

// একটি ছোট ইউটিলিটি কম্পোনেন্ট স্ট্যাটগুলি ডিসপ্লে করার জন্য
const StatItem = ({ label, value, colorClass, isLarge = false }) => (
  <div className="flex flex-col items-center justify-center p-1 sm:p-2">
    <span className={`text-xs sm:text-sm font-bold tracking-wider mb-1 text-gray-400 uppercase`}>
      {label}
    </span>
    <span className={`text-xl sm:text-2xl font-extrabold ${colorClass} ${isLarge ? 'text-4xl' : ''}`}>
      {value}
    </span>
  </div>
);

const PlayerSummaryCard = ({ playerName, playerStats, teamTag, profileImageUrl, onClose }) => {
  if (!playerStats) return null;

  const { played, wins, draws, goalsFor, goalsAgainst, motm } = playerStats;
  const { goalDifference, winRate } = calculateStats(playerStats);

  // স্ট্যাটিক/প্লেসহোল্ডার ডেটা
  const cardId = "#2914";
  const logoUrl = "https://i.ibb.co.com/N6khvz5x/1000021816.png"; // UNDEFEATED লোগো

  // কন্ডিশনাল স্টাইলিং এর জন্য
  const gdColor = goalDifference > 0 ? 'text-lime-400' : goalDifference < 0 ? 'text-red-500' : 'text-yellow-400';
  const winRateColor = winRate >= 50 ? 'text-green-400' : 'text-orange-400';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-2 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-xs sm:max-w-sm mx-auto rounded-2xl shadow-2xl overflow-hidden text-white transition-all duration-300"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Card Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-30 p-1 rounded-full bg-black bg-opacity-40 hover:bg-opacity-60 transition"
            title="Close"
          >
            <X size={20} className="text-white" />
          </button>

          {/* Background and Header Section */}
          <div
            className="relative h-56 sm:h-64 flex flex-col items-center justify-center p-4"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 150, 0.7), rgba(0, 0, 0, 0.9))',
            }}
          >
            {/* Glow/Shine Effect for the border */}
            <div className="absolute inset-0 z-0 rounded-2xl animate-pulse" style={{ boxShadow: '0 0 15px rgba(255, 215, 0, 0.5), inset 0 0 15px rgba(255, 215, 0, 0.3)' }}></div>

            {/* Background Texture/Logo Overlay */}
            <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: `url(${logoUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="absolute inset-0 bg-black mix-blend-multiply opacity-50"></div>
            </div>

            {/* Top Bar - UWP & ID */}
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-3 z-10 text-xs font-mono">
              <span className="font-extrabold text-white text-lg sm:text-xl">UWP</span>
              <span className="bg-black bg-opacity-50 px-2 py-0.5 rounded text-yellow-400">{cardId}</span>
            </div>

            {/* Profile Image */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-yellow-400 shadow-xl z-20 mt-4">
              <img
                src={profileImageUrl || "https://via.placeholder.com/150/0000FF/FFFFFF?text=P"}
                alt={playerName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Middle Badge (Undefeated Warriors of PES) - Position adjusted for better centering on mobile */}
            <div className="absolute top-[40%] sm:top-[45%] z-20 p-1 bg-gray-900 rounded-full border-2 border-yellow-500 shadow-lg">
              <img src="https://i.imgur.com/3qD6z3O.png" alt="Badge" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
            </div>

            {/* Player Name */}
            <h3 className="text-lg sm:text-xl font-extrabold tracking-wider mt-10 sm:mt-12 mb-1 z-10 text-shadow-lg uppercase text-center">{playerName}</h3>
            {/* Team/Tag */}
            <p className="text-xs sm:text-sm text-gray-300 font-light z-10">{teamTag || "No Team Tag"}</p>
          </div>

          {/* Stats Section (PL, W, D, GF, GA, GD, WR, 👑) */}
          <div className="bg-black p-3 pt-6 sm:p-4 sm:pt-8 text-center border-t-2 border-yellow-500">
            <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-4">

              {/* Win Rate and Goal Difference - More prominent */}
              <div className="col-span-2 flex flex-col items-center border-r border-gray-800">
                <span className="text-sm font-bold tracking-wider mb-1 text-gray-400">WIN RATE</span>
                <span className={`text-3xl font-extrabold ${winRateColor}`}>{winRate}%</span>
              </div>

              <div className="col-span-2 flex flex-col items-center">
                <span className="text-sm font-bold tracking-wider mb-1 text-gray-400">GD <TrendingUp size={12} className="inline-block text-gray-400" /></span>
                <span className={`text-3xl font-extrabold ${gdColor}`}>{goalDifference}</span>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-0 border-t border-gray-800 pt-4">
              {/* Common Stats */}
              <StatItem label="PL" value={played} colorClass="text-white" />
              <StatItem label="W" value={wins} colorClass="text-green-400" />
              <StatItem label="D" value={draws} colorClass="text-yellow-400" />
              <StatItem label="GF" value={goalsFor} colorClass="text-blue-400" />
              <StatItem label="GA" value={goalsAgainst} colorClass="text-red-400" />
             

              {/* Trophies/Championships */}
              <div className="flex flex-col items-center justify-center p-1 sm:p-2">
    <span className="text-xs sm:text-sm font-bold tracking-wider mb-1 text-gray-400 uppercase">
       <span className="text-yellow-500">👑</span> {/* 👈 এখানে কালার যোগ করা হয়েছে */}
    </span>
                <span className="text-3xl font-extrabold text-yellow-500">{motm}</span> {/* Placeholder */}
              </div>
            </div>

            {/* Footer */}
            <p className="text-xs text-gray-500 mt-4">
              eFootball 26 | UWPARENA.com | {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
            </p>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};


const Scoreboard = () => {
  const { user } = useContext(AuthContext);
  const currentUserEmail = user?.email || "";
  const adminEmails = ["taklidahammed007@gmail.com", "rahathossain200603@gmail.com"];

  const [role, setRole] = useState("user");
  const [matches, setMatches] = useState([]);
  const [form, setForm] = useState({
    player1: "",
    player2: "",
    score1: "",
    score2: "",
    motm: "", // 👑 NEW: Man of the Match field
  });
  const [bulkText, setBulkText] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("points");
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("darkMode") === "true"
  );
  const [editMatch, setEditMatch] = useState(null);
  const [showMatches, setShowMatches] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [matchPlayerFilter, setMatchPlayerFilter] = useState("all");
  const [selectedPlayer, setSelectedPlayer] = useState(null); // NEW: State for selected player for modal
  const [selectedCardPlayer, setSelectedCardPlayer] = useState(null);
  const perPage = 5;
  const [searchTerm, setSearchTerm] = useState('');
  // const playerStats = cardPlayerStats;
  // const playerPhotoUrl = playerStats?.photo;



  // Detect Admin
  useEffect(() => {
    if (adminEmails.includes(currentUserEmail)) setRole("admin");
    else setRole("user");
  }, [currentUserEmail]);
  const isAdmin = role === "admin";

  // Load Matches (Auto Refresh)
  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      const sorted = res.data
        .map((m) => ({
          _id: m._id,
          player1: (m.player1 || "Unknown").trim(),
          player2: (m.player2 || "Unknown").trim(),
          score1: Number(m.score1 ?? 0),
          score2: Number(m.score2 ?? 0),
          date: m.date || new Date().toISOString(),
          motm: (m.motm || "").trim(), // 👑 NEW: Fetch MOTM
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      setMatches(sorted);
    } catch (err) {
      console.error(err);
      Swal.fire("⚠️ Error", "Failed to load matches!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
    const interval = setInterval(fetchMatches, 20000);
    return () => clearInterval(interval);
  }, []);

  // Input Handlers and Form Logic (Unchanged)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // 👑 NEW: MOTM Toggle Handler
  const handleMotmToggle = (player) => {
    setForm((f) => ({
      ...f,
      motm: f.motm === player ? "" : player // Toggle MOTM
    }));
  };

  const resetForm = () => {
    setEditMatch(null);
    setForm({ player1: "", player2: "", score1: "", score2: "", motm: "" }); // 👑 Reset motm
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.player1.trim() || !form.player2.trim()) {
      Swal.fire("❗ Validation", "Player names are required.", "warning");
      return;
    }
    if (form.player1.trim() === form.player2.trim()) {
      Swal.fire("❗ Validation", "Players must be different.", "warning");
      return;
    }

    // 👑 MOTM Validation: If motm is set, it must be player1 or player2
    if (form.motm && form.motm !== form.player1 && form.motm !== form.player2) {
      Swal.fire("❗ Validation", "Man of the Match must be one of the two players.", "warning");
      return;
    }

    try {
      const payload = {
        player1: form.player1.trim(),
        player2: form.player2.trim(),
        score1: Number(form.score1),
        score2: Number(form.score2),
        motm: form.motm, // 👑 Include MOTM
      };

      if (editMatch) {
        await axios.put(`${API_URL}/${editMatch._id}`, payload);
        Swal.fire("✅ Updated!", "Match updated successfully!", "success");
        resetForm();
      } else {
        await axios.post(API_URL, {
          ...payload,
          date: new Date().toISOString(),
        });
        Swal.fire("✅ Added!", "Match added successfully!", "success");
        setForm({ player1: "", player2: "", score1: "", score2: "", motm: "" }); // 👑 Reset motm
      }
      fetchMatches();
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Failed to save match!", "error");
    }
  };

  // 👑 FIXED BULK SUBMIT WITH MOTM SUPPORT
  const handleBulkSubmit = async () => {
    if (!bulkText.trim()) {
      Swal.fire("❗ Validation", "Please enter matches.", "warning");
      return;
    }

    const lines = bulkText
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const bulkData = [];

    // 👑 FIXED MOTM LOGIC: 
    // Updated Regex:
    // 1. (.*?): Player 1 Name (non-greedy)
    // 2. \s*(\u{1F451})?: Optional MOTM Crown for P1 (👑)
    // 3. \s*(\d+): Score 1
    // 4. \s*🆚\s*(\d+): Separator and Score 2
    // 5. \s*(.*?): Player 2 Name (non-greedy)
    // 6. \s*(\u{1F451})?: Optional MOTM Crown for P2 (👑)
    // The 'u' flag is essential for Unicode characters like 👑.

    // This regex is designed to capture the player name even if it includes spaces, and the crown, wherever it is placed.
    const regex = /^(.*?)\s*(\u{1F451})?\s*(\d+)\s*🆚\s*(\d+)\s*(.*?)\s*(\u{1F451})?$/u;

    for (let line of lines) {
      const match = line.match(regex);
      if (!match) {
        console.warn("❌ Invalid bulk format or failed regex match (Skipping):", line);
        continue;
      }

      // Destructure with the new structure:
      // Index 0: Full match
      // Index 1: Player 1 Name
      // Index 2: MOTM Crown for Player 1 (undefined if not present)
      // Index 3: Score 1
      // Index 4: Score 2
      // Index 5: Player 2 Name
      // Index 6: MOTM Crown for Player 2 (undefined if not present)
      const [, rawPlayer1, motm1, score1, score2, rawPlayer2, motm2] = match;

      const player1 = rawPlayer1.trim().replace(/\s*👑\s*$/, ''); // Re-trim in case name parsing captured leading/trailing crown incorrectly
      const player2 = rawPlayer2.trim().replace(/\s*👑\s*$/, '');

      if (!player1 || !player2 || player1 === player2) {
        console.warn("❌ Invalid Player Names or Same Players (Skipping):", line);
        continue;
      }

      // 👑 MOTM Logic:
      let motmPlayer = "";

      // Check for crown presence in the captured groups
      const isCrown1 = !!motm1;
      const isCrown2 = !!motm2;

      if (isCrown1 && isCrown2) {
        // Two crowns in one match is ambiguous, skip it
        Swal.fire("⚠️ Ambiguity", `Match line: "${line}" has two MOTMs (👑) and will be skipped.`, "warning");
        continue;
      } else if (isCrown1) {
        motmPlayer = player1;
      } else if (isCrown2) {
        motmPlayer = player2;
      }

      bulkData.push({
        player1: player1,
        player2: player2,
        score1: Number(score1),
        score2: Number(score2),
        date: new Date().toISOString(),
        motm: motmPlayer, // 👑 MOTM is now set correctly
      });
    }

    if (bulkData.length === 0) {
      Swal.fire(
        "⚠️ No valid matches found!",
        "Please check your input format (Example: PlayerA 👑 3 🆚 2 PlayerB).",
        "info"
      );
      return;
    }

    // Limit check: 14 matches maximum
    if (bulkData.length > 14) {
      Swal.fire(
        "⚠️ Too many matches!",
        "You can only add up to 14 matches at a time.",
        "warning"
      );
      return;
    }


    try {
      await Promise.all(bulkData.map((m) => axios.post(API_URL, m)));

      Swal.fire(
        "✅ Added!",
        `${bulkData.length} matches added successfully!`,
        "success"
      );

      setBulkText("");
      fetchMatches();
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Failed to add bulk matches!", "error");
    }
  };


  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this match?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });
    if (!confirm.isConfirmed) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setMatches((prev) => prev.filter((m) => m._id !== id));
      Swal.fire("🗑 Deleted!", "Match removed!", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Failed to delete!", "error");
    }
  };

  // Streak Calculation Function
  const calculateStreaks = (matches, stats) => {
    const playerStatsWithStreaks = { ...stats };

    Object.keys(playerStatsWithStreaks).forEach(playerName => {
      // Get matches for the current player, sorted by date (most recent first)
      const playerMatches = matches
        .filter(m => m.player1 === playerName || m.player2 === playerName)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      let streakCount = 0;
      let streakType = null; // 'W', 'L', or 'D'

      for (const m of playerMatches) {
        const isP1 = m.player1 === playerName;
        let result;

        if (m.score1 === m.score2) result = 'D';
        else if ((isP1 && m.score1 > m.score2) || (!isP1 && m.score2 > m.score1)) result = 'W';
        else result = 'L';

        if (streakType === null) {
          streakType = result;
          streakCount = 1;
        } else if (result === streakType) {
          streakCount++;
        } else {
          break; // Streak broken
        }
      }

      if (streakCount > 0) {
        playerStatsWithStreaks[playerName].streak = `${streakType}${streakCount}`;
      } else {
        playerStatsWithStreaks[playerName].streak = 'N/A';
      }
    });

    return playerStatsWithStreaks;
  };


  // Leaderboard Calculation (Updated for MOTM)
  useEffect(() => {
    const stats = {};
    matches.forEach((m) => {
      const s1 = Number(m.score1),
        s2 = Number(m.score2);

      // Basic initialization
      [m.player1, m.player2].forEach(p => {
        if (!stats[p]) stats[p] = { points: 0, wins: 0, draws: 0, losses: 0, played: 0, motm: 0 }; // 👑 motm: 0 added
        stats[p].played++;
      });


      if (s1 > s2) {
        stats[m.player1].points += 3;
        stats[m.player1].wins++;
        stats[m.player2].losses++;
      } else if (s2 > s1) {
        stats[m.player2].points += 3;
        stats[m.player2].wins++;
        stats[m.player1].losses++;
      } else {
        stats[m.player1].points++;
        stats[m.player2].points++;
        stats[m.player1].draws++;
        stats[m.player2].draws++;
      }

      // 👑 MOTM Logic: Increment count for the player who was MOTM
      if (m.motm && stats[m.motm]) {
        stats[m.motm].motm++;
      }
    });

    // Apply streak calculation
    const statsWithStreaks = calculateStreaks(matches, stats);

    const sorted = Object.entries(statsWithStreaks)
      .map(([name, s]) => ({
        name,
        ...s,
        ratio: s.played ? ((s.wins / s.played) * 100).toFixed(1) : "0.0",
      }))
      .sort((a, b) => b[sortBy] - a[sortBy]);

    setLeaderboard(sorted);
  }, [matches, sortBy]); // Recalculate when matches or sortBy changes

  // Reset Leaderboard (delete all - Unchanged)
  const handleReset = async () => {
    const step1 = await Swal.fire({
      title: "Reset all matches?",
      text: "This will permanently delete all matches.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reset",
    });
    if (!step1.isConfirmed) return;
    try {
      for (const m of matches) {
        await axios.delete(`${API_URL}/${m._id}`);
      }
      setMatches([]);
      setLeaderboard([]);
      Swal.fire("✅ Cleared!", "Leaderboard reset done!", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Failed to reset!", "error");
    }
  };

  // Export CSV (Unchanged)
  const exportCSV = (data, filename = "export.csv") => {
    if (!data || data.length === 0) {
      Swal.fire("⚠️ Empty", "No data to export.", "info");
      return;
    }
    const keys = Object.keys(data[0]);
    const csvRows = [keys.join(",")];
    for (const row of data) {
      csvRows.push(
        keys
          .map((k) => {
            const cell = row[k] ?? "";
            const safe = String(cell).replace(/"/g, '""');
            return `"${safe}"`;
          })
          .join(",")
      );
    }
    const csv = csvRows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Theme toggle (Unchanged)
  const toggleTheme = () => {
    setDarkMode((prev) => {
      localStorage.setItem("darkMode", String(!prev));
      return !prev;
    });
  };

  const theme = darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";
  const playerNames = [
    ...new Set(matches.flatMap((m) => [m.player1, m.player2])),
  ];

  const topMatch = matches.reduce((top, current) => {
    const currentScore = current.score1 + current.score2;
    const topScore = top ? top.score1 + top.score2 : -1;
    return currentScore > topScore ? current : top;
  }, null);

  // Filtered and Paginated Matches
  const filteredMatches = matches.filter((m) => {
    // NEW: Highlight filter logic - also used for pagination/filtering
    if (matchPlayerFilter === "all") return true;
    return m.player1 === matchPlayerFilter || m.player2 === matchPlayerFilter;
  });
  const paginated = filteredMatches.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredMatches.length / perPage)
  );

  const filteredBoard = leaderboard
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => {
      if (filter === "winners") return p.wins > p.losses;
      if (filter === "draws") return p.draws > 0;
      return true;
    });

  // NEW: Player Profile Modal Handler
  const handlePlayerClick = (playerName) => {
    setSelectedPlayer(playerName);
  };

  // 👑 NEW: Player Card Modal Handler
  const handleCardClick = (playerName) => {
    setSelectedCardPlayer(playerName);
  };
  const [registeredPlayers, setRegisteredPlayers] = useState([]); 

  // ... আপনার fetchMatches ফাংশন এবং useEffect এখানে থাকবে ...

  // 🆕 ২. প্লেয়ারদের ছবি আনার জন্য এই useEffect টি যোগ করুন
  useEffect(() => {
    const fetchRegisteredPlayers = async () => {
      try {
        const res = await axios.get("https://ef-server-rank-status.vercel.app/players");
        setRegisteredPlayers(res.data);
      } catch (err) {
        console.error("Error fetching players:", err);
      }
    };
    fetchRegisteredPlayers();
  }, []);

  // Find stats for the selected card player
  const cardPlayerStats = leaderboard.find(p => p.name === selectedCardPlayer);
  // 🆕 ৩. ছবি ঠিক করার মেইন লজিক (এখানে পরিবর্তন করা হয়েছে)
  const registeredProfile = registeredPlayers.find((p) => {
    // ১. নাম না থাকলে চেক করার দরকার নেই
    if (!p.name || !selectedCardPlayer) return false;
    const cleanString = (str) => {
      return str
        .toString()
        .toLowerCase()             // ছোট হাতের করা
        .normalize("NFD")          // অ্যাক্সেন্ট আলাদা করা
        .replace(/[\u0300-\u036f]/g, "") // অ্যাক্সেন্ট মুছে ফেলা (ú -> u)
        .trim();
    };
    const dbName = cleanString(p.name);              // ডাটাবেসের ক্লিন নাম
    const scoreName = cleanString(selectedCardPlayer); // স্কোরবোর্ডের ক্লিন নাম
    

    // // ২. সব নাম ছোট হাতের অক্ষরে নিয়ে আসা এবং সাইডের স্পেস কমানো
    // const dbName = p.name.toLowerCase().trim();       // ডাটাবেসের নাম (যেমন: rahat hossain)
    // const scoreName = selectedCardPlayer.toLowerCase().trim(); // স্কোরবোর্ডের নাম (যেমন: rahat)

    return dbName === scoreName || scoreName.includes(dbName) || dbName.includes(scoreName);
  });

  // ছবি সেট করা (ডাটাবেস -> ডিফল্ট)
  const playerPhotoUrl = registeredProfile?.photo || cardPlayerStats?.photo || "https://i.ibb.co/N2PZW2yV/platini.jpg";
  

  // 👑 NEW: Filtered player list for the card selection dropdown
  const cardPlayerNames = useMemo(() => {
    return leaderboard.map(p => p.name).sort();
  }, [leaderboard]);

  return (
    <div className={`${theme} min-h-screen p-4 sm:p-6 transition-all duration-500`}>
      <div className="max-w-7xl mx-auto">
        {/* Player Stats Modal */}
        {selectedPlayer && (
          <PlayerStatsModal
            playerName={selectedPlayer}
            leaderboard={leaderboard}
            matches={matches}
            onClose={() => setSelectedPlayer(null)}
          />
        )}
        {/* --- */}

        {/* Header */}

       {/* 👑 NEW Player Summary Card Modal */}
        {selectedCardPlayer && cardPlayerStats && (
          <PlayerSummaryCard
            playerName={selectedCardPlayer}
            playerStats={cardPlayerStats}
            teamTag={registeredProfile?.district || "Undefeated Warriors Of Pes"} // 🆕 চাইলে জেলা দেখাতে পারেন
            profileImageUrl={playerPhotoUrl} // 🆕 এখানে এখন সঠিক ছবি যাবে
            onClose={() => setSelectedCardPlayer(null)}
          />
        )}
        {/* --- */}

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-0">
            🏆 Smart Scoreboard
          </h1>
          <div className="flex gap-2 items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-700 hover:scale-105 transition"
              title="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={fetchMatches}
              className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 hover:scale-105 transition text-white"
              title="Refresh"
            >
              <RefreshCcw size={18} />
            </button>
            {isAdmin && (
              <button
                onClick={handleReset}
                className="p-2 rounded-full bg-red-600 hover:bg-red-700 hover:scale-105 transition text-white"
                title="Reset all matches"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>

        {/* 👑 NEW: Card Generation Tool for Admin/User */}
        <div className="mb-6 p-4 rounded-lg bg-gray-800/50 dark:bg-gray-700/50">
          <h2 className="text-xl font-semibold mb-3">Player Card</h2>

          {/* --- Search Input Field --- */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search Player Name..."
              value={searchTerm} // State variable for search term
              onChange={(e) => setSearchTerm(e.target.value)} // Handler to update search term
              className="p-2 rounded bg-gray-700 text-white w-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedCardPlayer || ""}
              onChange={(e) => setSelectedCardPlayer(e.target.value)}
              className="p-2 rounded bg-gray-700 text-white w-full sm:w-1/2"
            >
              <option value="">Select Player for Card</option>
              {/* 💡 এখানে startsWith ব্যবহার করা হয়েছে যা নিশ্চিত করবে যে সার্চ করা অংশটি নামের শুরুতেই আছে। 
               যদি আপনি নামের যেকোনো অংশে সার্চ করতে চান, তাহলে startsWith-এর বদলে includes ব্যবহার করুন (যেমনটা আগের কোডে ছিল) */}
              {cardPlayerNames
                .filter(name => name.toLowerCase().startsWith(searchTerm.toLowerCase()))
                .map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
            </select>
            <button
              onClick={() => handleCardClick(selectedCardPlayer)}
              disabled={!selectedCardPlayer}
              className="bg-yellow-600 hover:bg-yellow-700 p-2 rounded font-bold w-full sm:w-1/2 transition disabled:opacity-50"
            >
              Show Player Card
            </button>
          </div>
        </div>

        {/* Admin Form */}
        {isAdmin && (
          <div className="mb-6 p-4 rounded-lg bg-gray-800/50 dark:bg-gray-700/50">
            <h2 className="text-xl font-semibold mb-3">Add/Edit Match</h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4"
            >
              {/* Player 1 Input + MOTM Toggle */}
              <div className="flex col-span-2 md:col-span-1 gap-1">
                <input
                  name="player1"
                  list="players"
                  value={form.player1}
                  onChange={handleChange}
                  placeholder="Player 1"
                  className="p-2 rounded bg-gray-700 text-white w-full"
                />
                <button
                  type="button"
                  onClick={() => handleMotmToggle(form.player1)}
                  className={`p-2 rounded transition ${form.motm === form.player1
                      ? "bg-yellow-400 text-black hover:bg-yellow-500"
                      : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                    }`}
                  title={`Set ${form.player1 || "Player 1"} as Man of the Match`}
                  disabled={!form.player1.trim()}
                >
                  <Crown size={20} />
                </button>
              </div>

              {/* Player 2 Input + MOTM Toggle */}
              <div className="flex col-span-2 md:col-span-1 gap-1">
                <input
                  name="player2"
                  list="players"
                  value={form.player2}
                  onChange={handleChange}
                  placeholder="Player 2"
                  className="p-2 rounded bg-gray-700 text-white w-full"
                />
                <button
                  type="button"
                  onClick={() => handleMotmToggle(form.player2)}
                  className={`p-2 rounded transition ${form.motm === form.player2
                      ? "bg-yellow-400 text-black hover:bg-yellow-500"
                      : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                    }`}
                  title={`Set ${form.player2 || "Player 2"} as Man of the Match`}
                  disabled={!form.player2.trim()}
                >
                  <Crown size={20} />
                </button>
              </div>

              {/* Score 1 and Score 2 */}
              <input
                name="score1"
                type="number"
                value={form.score1}
                onChange={handleChange}
                placeholder="Score 1"
                className="p-2 rounded bg-gray-700 text-white"
              />
              <input
                name="score2"
                type="number"
                value={form.score2}
                onChange={handleChange}
                placeholder="Score 2"
                className="p-2 rounded bg-gray-700 text-white"
              />

              {/* Submit/Reset Buttons */}
              <div className="flex gap-2 col-span-2 md:col-span-1">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 p-2 rounded font-bold w-full transition"
                >
                  {editMatch ? "Update" : "Add"}
                </button>
                {(editMatch || form.player1 || form.player2 || form.score1 || form.score2 || form.motm) && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-red-500 hover:bg-red-600 p-2 rounded font-medium transition"
                    title="Reset Form"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
              <datalist id="players">
                {playerNames.map((p) => (
                  <option key={p} value={p} />
                ))}
              </datalist>
            </form>

            {/* Bulk Add */}
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2"> 👑 Add Total Match (Use '👑' for Man of the Match)</h3>
              <textarea
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder={`Paste multiple matches here, one per line:\nExample 1 (Player 1 MOTM):\nAsib Ahmed 👑 3 🆚 2 Shahriar Ali\nExample 2 (Player 2 MOTM):\nRahat 5 🆚 5 Samira 👑`}
                className="w-full p-2 rounded bg-gray-700 text-white h-32 resize-none"
              ></textarea>
              <button
                onClick={handleBulkSubmit}
                className="
        mt-2 
        bg-purple-600 
        hover:bg-purple-700 
        text-white 
        p-2 
        rounded 
        font-bold 
        transition 
        w-full 
        md:w-auto
        
        /* 💡 Enhanced Glow Effect Classes 💡 */
        relative                
        overflow-hidden         
        shadow-xl               
        shadow-purple-700/60    
        hover:shadow-purple-600 
        hover:scale-105 
        duration-300
        group                  
        
        /* Apply custom glow for a stronger effect */
        custom-glow-button
    "
              >
                <span className="relative z-10">Add Match</span> {/* Text needs to be above the glow */}
              </button>
            </div>
          </div>
        )}

        <hr className="my-6 border-gray-700" />

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 justify-between items-start sm:items-center p-3 rounded-lg bg-gray-800/50 dark:bg-gray-700/50">
          <input
            type="text"
            placeholder="🔍 Search player"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded bg-gray-700 w-full sm:w-1/4"
          />
          <div className="flex flex-wrap gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 rounded bg-gray-700 text-white"
            >
              <option value="all">All Players</option>
              <option value="winners">Winners Only</option>
              <option value="draws">Draws Only</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 rounded bg-gray-700 text-white"
            >
              <option value="points">Sort by Points</option>
              <option value="wins">Sort by Wins</option>
              <option value="played">Sort by Played</option>
              <option value="motm">Sort by MOTM 👑</option> {/* 👑 Sort by MOTM */}
            </select>
            <button
              onClick={() => exportCSV(leaderboard, "leaderboard.csv")}
              className="p-2 bg-green-700 hover:bg-green-600 rounded flex items-center gap-1 transition text-white"
            >
              <Download size={16} /> Leaderboard
            </button>
          </div>
        </div>

        {/* Summary (Unchanged) */}
        <div className="text-center mb-6 space-y-1 p-3 rounded-lg bg-gray-800/50 dark:bg-gray-700/50">
          {/* Grid Layout: 2 columns on mobile, 5 columns on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-y-4 gap-x-2 text-sm text-gray-400">

            {/* 1. Total Players - col-span-1 */}
            <p className="flex flex-col items-center col-span-1">
              <span className="font-bold text-lg text-white">
                {leaderboard.length}
              </span>
              <span>Total Players</span>
            </p>

            {/* 2. Matches Played - col-span-1 */}
            <p className="flex flex-col items-center col-span-1">
              <span className="font-bold text-lg text-white">
                {matches.length}{" "}
                {loading && (
                  <span className="ml-1 animate-spin inline-block w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full"></span>
                )}
              </span>
              <span>Matches Played</span>
            </p>

            {/* 3. Top Scorer - col-span-1 */}
            <p className="flex flex-col items-center col-span-1">
              <span className="font-bold text-lg text-yellow-400">
                {leaderboard[0]?.name || "N/A"}
              </span>
              <span>
                Top Scorer ({leaderboard[0]?.points || 0} PTS)
              </span>
            </p>

            {/* 4. Highest Score Match - col-span-1 */}
            <p className="flex flex-col items-center col-span-1">
              <span className="font-bold text-sm text-white">
                {topMatch
                  ? `${topMatch.player1} ${topMatch.score1} - ${topMatch.score2} ${topMatch.player2}`
                  : "N/A"}
              </span>
              <span>Highest Score Match</span>
            </p>

            {/* 5. Avg Score - CRITICAL CHANGE: col-span-2 on mobile for full width center */}
            <p className="flex flex-col items-center col-span-2 sm:col-span-1">
              <span className="font-bold text-lg text-blue-500">
                {matches.length
                  ? (
                    matches.reduce(
                      (acc, m) => acc + m.score1 + m.score2,
                      0
                    ) /
                    (matches.length * 2)
                  ).toFixed(1)
                  : 0}
              </span>
              <span>Avg Score</span>
            </p>
          </div>

          {/* Last Match Date */}
          <p className="text-xs text-gray-500 mt-2">
            Last Match:{" "}
            {matches[0] ? new Date(matches[0].date).toLocaleString() : "N/A"}
          </p>
        </div>

        <hr className="my-6 border-gray-700" />

        {/* Leaderboard (Updated for MOTM) */}
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-100">
          🏆 Leaderboard
        </h2>

        <div className="space-y-3">
          {filteredBoard.length === 0 && (
            <p className="text-center text-gray-400 text-sm sm:text-base">
              No players found.
            </p>
          )}

          {filteredBoard.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`flex flex-col sm:flex-row justify-between sm:items-center p-4 rounded-xl shadow-md transition-all duration-300
              ${i === 0
                  ? "bg-yellow-400 text-black font-bold hover:shadow-[0_0_15px_#FFD700]"
                  : i === 1
                    ? "bg-gray-400 text-black font-semibold hover:shadow-[0_0_15px_#C0C0C0]"
                    : i === 2
                      ? "bg-amber-700 text-white font-semibold hover:shadow-[0_0_15px_#FFBF00]"
                      : "bg-gray-800 text-white hover:shadow-[0_0_10px_#00FFFF]"
                } hover:scale-[1.01]`}
            >
              {/* Player Name + Icon */}
              <button
                onClick={() => handlePlayerClick(p.name)}
                className="flex items-center justify-center sm:justify-start gap-2 mb-3 sm:mb-0 text-lg font-bold hover:underline transition text-center sm:text-left"
                title="View player stats"
              >
                {i + 1}. {p.name} {i < 3 && ["🥇", "🥈", "🥉"][i]}
                <Zap size={16} className="text-blue-400" />
              </button>

              {/* Stats Section - single line scrollable */}
              <div className="flex items-center justify-center sm:justify-end gap-3 sm:gap-5 overflow-x-auto scrollbar-hide text-sm w-full sm:w-auto py-1">
                {/* MOTM */}
                <div className="flex flex-col items-center min-w-[50px]">
                  <span className="text-gray-300 text-xs">MOTM</span>
                  <span className="font-bold text-yellow-500 flex justify-center items-center gap-1">
                    {p.motm}
                    {p.motm > 0 && <Crown size={14} className="text-yellow-600" />}
                  </span>
                </div>

                {/* STRK */}
                <div className="flex flex-col items-center min-w-[50px]">
                  <span className="text-gray-300 text-xs">STRK</span>
                  <span
                    className={`font-bold ${p.streak?.startsWith("W")
                        ? "text-green-400"
                        : p.streak?.startsWith("L")
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}
                  >
                    {p.streak}
                  </span>
                </div>

                {/* PTS */}
                <div className="flex flex-col items-center min-w-[40px]">
                  <span className="text-gray-300 text-xs">PTS</span>
                  <span className="font-bold">{p.points}</span>
                </div>

                {/* Played */}
                <div className="flex flex-col items-center min-w-[30px]">
                  <span className="text-gray-300 text-xs">P</span>
                  <span className="font-bold">{p.played}</span>
                </div>

                {/* Wins */}
                <div className="flex flex-col items-center min-w-[30px]">
                  <span className="text-gray-300 text-xs">W</span>
                  <span className="font-bold text-green-400">{p.wins}</span>
                </div>

                {/* Losses */}
                <div className="flex flex-col items-center min-w-[30px]">
                  <span className="text-gray-300 text-xs">L</span>
                  <span className="font-bold text-red-400">{p.losses}</span>
                </div>

                {/* Draws */}
                <div className="flex flex-col items-center min-w-[30px]">
                  <span className="text-gray-300 text-xs">D</span>
                  <span className="font-bold text-blue-400">{p.draws}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <hr className="my-6 border-gray-700" />

        <h2
          className="text-2xl font-semibold mb-3 flex  justify-between items-center cursor-pointer select-none"
          onClick={() => setShowMatches((p) => !p)}
        >
          Recent Match History
          {showMatches ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </h2>

        <AnimatePresence>
          {showMatches && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Player Filter */}
              <div className="mb-4">
                <select
                  value={matchPlayerFilter}
                  onChange={(e) => setMatchPlayerFilter(e.target.value)}
                  className="p-2 rounded bg-gray-700 text-white w-full sm:w-auto"
                >
                  <option value="all">All Matches</option>
                  {playerNames.map((p) => (
                    <option key={p} value={p}>
                      {p}'s Matches
                    </option>
                  ))}
                </select>
              </div>

              {/* Matches List */}
              <div className="space-y-3">
                {paginated.length === 0 ? (
                  <p className="text-center text-gray-400">No matches found.</p>
                ) : (
                  paginated.map((m) => {
                    const winner =
                      m.score1 > m.score2
                        ? m.player1
                        : m.score2 > m.score1
                          ? m.player2
                          : "Draw";
                    const isDraw = winner === "Draw";

                    return (
                      <div
                        key={m._id}
                        className={`p-3 rounded-lg flex flex-col sm:flex-row justify-between items-center transition-all duration-300 gap-2
                        ${isDraw
                            ? "bg-blue-900/40 border border-blue-700"
                            : "bg-gray-800/50 border border-gray-700"
                          }`}
                      >
                        {/* Name + Score + MOTM */}
                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
                          <span
                            className={`font-bold ${m.player1 === winner && !isDraw
                                ? "text-green-400"
                                : "text-gray-200"
                              }`}
                          >
                            {m.player1}
                          </span>
                          {m.motm === m.player1 && (
                            <Crown size={20} className="text-yellow-400" title="Man of the Match" />
                          )}
                          <span className="text-sm font-semibold">
                            {m.score1} 🆚 {m.score2}
                          </span>
                          <span
                            className={`font-bold ${m.player2 === winner && !isDraw
                                ? "text-green-400"
                                : "text-gray-200"
                              }`}
                          >
                            {m.player2}
                          </span>
                          {m.motm === m.player2 && (
                            <Crown size={20} className="text-yellow-400" title="Man of the Match" />
                          )}
                        </div>

                        {/* Date + Admin buttons */}
                        <div className="flex gap-2 items-center flex-wrap sm:flex-nowrap mt-2 sm:mt-0">
                          <span className="text-xs text-gray-400 whitespace-nowrap">
                            {new Date(m.date).toLocaleString()}
                          </span>
                          {isAdmin && (
                            <button
                              onClick={() => {
                                setEditMatch(m);
                                setForm({
                                  player1: m.player1,
                                  player2: m.player2,
                                  score1: m.score1,
                                  score2: m.score2,
                                  motm: m.motm,
                                });
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="p-2 rounded-full text-blue-400 hover:bg-gray-700 transition"
                              title="Edit Match"
                            >
                              <Edit size={20} />
                            </button>
                          )}
                          {isAdmin && (
                            <button
                              onClick={() => handleDelete(m._id)}
                              className="p-2 rounded-full text-red-400 hover:bg-gray-700 transition"
                              title="Delete Match"
                            >
                              <Trash2 size={20} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Pagination */}
              {filteredMatches.length > perPage && (
                <div className="flex justify-center items-center gap-4 mt-4 flex-wrap">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 rounded bg-gray-700 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-gray-400">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-2 rounded bg-gray-700 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default Scoreboard;