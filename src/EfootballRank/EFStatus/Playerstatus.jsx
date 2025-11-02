import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MessageCircle,
  Heart,
  HeartOff,
  Filter,
  Circle,
  Clock,
  X,
} from "lucide-react";

const PlayerStatus = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [minLevel, setMinLevel] = useState(0);
  const [minWinRate, setMinWinRate] = useState(0);

  // Mock Data
  useEffect(() => {
    setPlayers([
      {
        id: 1,
        name: "Rafi",
        level: 15,
        score: 1100,
        winRate: 88,
        online: true,
        lastMatch: "10 min ago",
        favorite: false,
        rating: 4,
      },
      {
        id: 2,
        name: "Sakib",
        level: 8,
        score: 720,
        winRate: 65,
        online: false,
        lastMatch: "1 hour ago",
        favorite: true,
        rating: 3,
      },
      {
        id: 3,
        name: "Nishat",
        level: 12,
        score: 950,
        winRate: 75,
        online: true,
        lastMatch: "5 min ago",
        favorite: false,
        rating: 5,
      },
      {
        id: 4,
        name: "Ayan",
        level: 10,
        score: 870,
        winRate: 70,
        online: false,
        lastMatch: "3 hours ago",
        favorite: false,
        rating: 4,
      },
    ]);
  }, []);

  // Filtering Logic
  const filteredPlayers = players.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      p.level >= minLevel &&
      p.winRate >= minWinRate &&
      (!onlineOnly || p.online)
  );

  // Toggle Favorite
  const toggleFavorite = (id) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, favorite: !p.favorite } : p
      )
    );
  };

  // Update Rating
  const handleRating = (id, value) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, rating: value } : p))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold flex items-center gap-2">
          🕹️ Player Dashboard
        </h1>
        <div className="flex items-center gap-3 mt-3 sm:mt-0">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 rounded-lg bg-gray-700 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Filter className="text-lime-400" />
        </div>
      </motion.div>

      {/* Advanced Filters */}
      <div className="bg-gray-800 p-4 rounded-2xl mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <label>🎯 Min Level:</label>
          <input
            type="number"
            min="0"
            className="w-20 bg-gray-700 px-2 py-1 rounded-md"
            value={minLevel}
            onChange={(e) => setMinLevel(Number(e.target.value))}
          />
        </div>
        <div className="flex items-center gap-2">
          <label>🏆 Min Win Rate:</label>
          <input
            type="number"
            min="0"
            className="w-20 bg-gray-700 px-2 py-1 rounded-md"
            value={minWinRate}
            onChange={(e) => setMinWinRate(Number(e.target.value))}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={onlineOnly}
            onChange={() => setOnlineOnly(!onlineOnly)}
          />
          <label>Show Online Only</label>
        </div>
      </div>

      {/* Player List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.map((player) => (
          <motion.div
            key={player.id}
            className="bg-gray-800 rounded-2xl p-5 shadow-md hover:shadow-lime-400/30 transition relative"
            whileHover={{ scale: 1.03 }}
          >
            {/* Favorite Button */}
            <button
              className="absolute right-4 top-4"
              onClick={() => toggleFavorite(player.id)}
            >
              {player.favorite ? (
                <Heart className="text-red-500" />
              ) : (
                <HeartOff className="text-gray-400" />
              )}
            </button>

            {/* Player Info */}
            <h2 className="text-xl font-bold mb-2">{player.name}</h2>
            <p className="text-sm text-gray-300">
              Level: {player.level} | Score: {player.score}
            </p>

            {/* Online Status */}
            <div className="flex items-center gap-2 mt-2">
              <Circle
                size={12}
                className={player.online ? "text-green-400" : "text-red-400"}
              />
              <span>{player.online ? "Online" : "Offline"}</span>
            </div>

            {/* Win Rate Progress */}
            <div className="mt-3">
              <div className="bg-gray-600 h-2 rounded-full">
                <div
                  className="bg-lime-400 h-2 rounded-full"
                  style={{ width: `${player.winRate}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400">
                Win Rate: {player.winRate}%
              </span>
            </div>

            {/* Rating */}
            <div className="flex gap-1 mt-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={18}
                  onClick={() => handleRating(player.id, i)}
                  className={`cursor-pointer ${
                    i <= player.rating ? "text-yellow-400" : "text-gray-500"
                  }`}
                />
              ))}
            </div>

            {/* Last Match Timeline */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-3">
              <Clock size={16} /> {player.lastMatch}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                className="px-3 py-2 bg-lime-500 text-black rounded-lg font-semibold hover:bg-lime-400 transition"
                onClick={() => {
                  setSelectedPlayer(player);
                  setShowChat(true);
                }}
              >
                <MessageCircle size={18} className="inline mr-1" /> Chat
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChat && selectedPlayer && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 p-6 rounded-2xl shadow-xl w-80 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setShowChat(false)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                <X />
              </button>
              <h3 className="text-lg font-bold mb-2">
                Chat with {selectedPlayer.name}
              </h3>
              <div className="bg-gray-700 h-40 rounded-md p-3 text-sm text-gray-300 overflow-y-auto mb-3">
                <p className="text-gray-400 italic">
                  (Chat feature under demo mode)
                </p>
              </div>
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full px-3 py-2 bg-gray-700 rounded-md outline-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlayerStatus;
