import React, { useEffect, useState, useCallback, createContext, useContext } from "react";
import {
  Trash2,
  Mail,
  Phone,
  MapPin,
  Droplet,
  Facebook,
  Search,
  Edit,
  SortAsc,
  SortDesc,
  Copy,
  RefreshCw,
  Filter,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

// --- 1. Custom Auth Context (Replacing "../../Provider/AuthProvider") ---
// Single file restriction requires defining context and a mock provider here.
const AuthContext = createContext({
  // Mock user structure.
  user: { email: "taklidahammed007@gmail.com", uid: "mock-uid-123" },
});

const useAuthContext = () => useContext(AuthContext);

// --- 2. Custom Alert Modal (SweetAlert Style) ---
const CustomAlert = ({ isOpen, type, title, text, onClose }) => {
  if (!isOpen) return null;

  let icon, color, buttonColor;
  
  // Set icon and primary color based on type
  switch (type) {
    case 'success':
      icon = <CheckCircle className="w-8 h-8 md:w-10 md:h-10" />;
      color = 'text-green-400';
      buttonColor = 'bg-green-600 hover:bg-green-700 shadow-green-500/50';
      break;
    case 'error':
      icon = <XCircle className="w-8 h-8 md:w-10 md:h-10" />;
      color = 'text-red-400';
      buttonColor = 'bg-red-600 hover:bg-red-700 shadow-red-500/50';
      break;
    case 'warning':
      icon = <AlertTriangle className="w-8 h-8 md:w-10 md:h-10" />;
      color = 'text-yellow-400';
      buttonColor = 'bg-red-600 hover:bg-red-700 shadow-red-500/50'; // Warning confirmation uses red button
      break;
    default:
      icon = <AlertTriangle className="w-8 h-8 md:w-10 md:h-10" />;
      color = 'text-blue-400';
      buttonColor = 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/50';
  }

  // Determine if it's a Toast (only for copy success)
  const isToast = type === 'success' && text.includes("copied to clipboard");

  // Logic to auto-close toast
  useEffect(() => {
    if (isToast) {
        // Automatically close the toast after 3000 milliseconds (3 seconds)
        const timer = setTimeout(() => {
            onClose(false); // Do not execute action
        }, 1000);

        // Cleanup function
        return () => clearTimeout(timer);
    }
  }, [isToast, onClose]);

  // --- Toast Display (For Copy Success) ---
  if (isToast) {
    // Reusing the general color variables for the toast background and icon
    const toastBgColor = type === 'success' ? 'border-green-600' : 'border-red-600';
    const iconBgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

    return (
      <div className="fixed top-4 right-4 z-50 p-3 bg-gray-800 rounded-lg shadow-xl flex items-center space-x-3 border-2 transition-opacity duration-300 animate-slide-in-right" style={{ borderColor: toastBgColor.split('-')[1] }}>
        <div className={`p-1 rounded-full text-white ${iconBgColor}`}>{icon}</div>
        <div className="text-white text-sm font-medium">{text.split(': ')[0]}</div>
      </div>
    );
  }

  // --- Modal Display (For Delete Warning, Update Success, Update Error) ---
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
      <div className={`bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-sm transform scale-100 transition-transform duration-300 animate-drop-in border-t-4 border-b-4`} style={{ borderColor: color.split('-')[1] }}>
        <div className="flex flex-col items-center">
          
          {/* ICON: Large and Colored */}
          <div className={`p-3 rounded-full mb-4 ${color} animate-bounce-once`}>{icon}</div>
          
          {/* TITLE */}
          <h3 className="text-3xl font-extrabold text-white mb-2 text-center">{title}</h3>
          
          {/* TEXT */}
          <p className="text-md text-gray-400 text-center mb-6">{text}</p>
          
          <div className="flex space-x-3 w-full">
            {/* CANCEL BUTTON (Only for Warning) */}
            {type === 'warning' && (
              <button
                onClick={() => onClose(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors shadow-md"
              >
                Cancel
              </button>
            )}
            
            {/* MAIN ACTION BUTTON (OK or Confirm) */}
            <button
              onClick={() => onClose(true)}
              className={`flex-1 px-4 py-2 text-sm font-bold text-white rounded-lg transition-colors duration-300 shadow-xl ${buttonColor}`}
            >
              {type === 'warning' ? 'Yes, delete it!' : 'OK'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Global styles for custom alert animations
const GLOBAL_STYLES = `
@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
.animate-slide-in-right { animation: slideInRight 0.3s forwards; }

/* Enhanced Modal Drop-In Animation (SweetAlert style bounce) */
@keyframes dropIn {
  from { opacity: 0; transform: scale(0.9) translateY(-20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-drop-in { animation: dropIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

@keyframes bounceOnce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
.animate-bounce-once { animation: bounceOnce 0.4s ease-out; }
`;


// --- Edit Modal Component ---
const EditPlayerModal = ({
  isEditModalOpen,
  currentEditingPlayer,
  editFormData,
  handleEditFormSubmit,
  handleEditFormChange,
  setIsEditModalOpen,
  PLAYER_STATUSES,
}) => {
  if (!isEditModalOpen || !currentEditingPlayer) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
        <h3 className="text-2xl font-bold mb-6 text-blue-400 border-b border-gray-700 pb-3">
          Edit Player: {currentEditingPlayer.name}
        </h3>
        <form onSubmit={handleEditFormSubmit} className="space-y-4">
          {[
            "name",
            "email",
            "phone",
            "district",
            "bloodGroup",
            "facebook",
            "photo",
          ].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-300 mb-1 capitalize">
                {field}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={editFormData[field] || ''}
                onChange={handleEditFormChange}
                required={["name", "email"].includes(field)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
            </div>
          ))}
          {/* Status/Rank Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1 capitalize">
              Status / Rank
            </label>
            <select
              name="status"
              value={editFormData.status || 'Active'}
              onChange={handleEditFormChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            >
              {PLAYER_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          {editFormData.photo && (
            <img
              src={editFormData.photo}
              alt="Player"
              className="mt-3 w-20 h-20 rounded-full object-cover border-2 border-blue-400"
            />
          )}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 shadow-md shadow-blue-500/50 hover:shadow-lg hover:shadow-blue-400/70"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
// --- End Edit Modal Component ---

const PLAYER_STATUSES = ["Active", "Inactive", "Pro", "Beginner", "Captain"];


const PlayerInfo = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Filter states
  const [filterDistrict, setFilterDistrict] = useState("");
  const [filterBloodGroup, setFilterBloodGroup] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Edit modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditingPlayer, setCurrentEditingPlayer] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // Custom alert states 
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({});
  const [alertAction, setAlertAction] = useState(null);


  const API_URL = "https://ef-server-rank-status.vercel.app/players";
  // https://ef-server-rank-status.vercel.app/players
  // http://localhost:13000/players

  const { user } = useAuthContext();
  // FIX: Declared currentUserEmail using 'const' to resolve ReferenceError
  const currentUserEmail = user?.email || "";

  // Admin List [AIKHNE JOTO ICCA ADMIN EMAIL ADD KORA AABE]
  const adminEmails = [
    "taklidahammed007@gmail.com",
    "rahathossain200603@gmail.com"
  ];
  const isAdmin = adminEmails.includes(currentUserEmail);

  // --- Alert Handler ---
  const customAlert = useCallback((type, title, text, action = null) => {
    setAlertConfig({ type, title, text });
    setAlertAction(() => action); // Store the function to execute on confirmation
    setIsAlertOpen(true);
  }, []);

  const handleAlertClose = (confirmed) => {
    setIsAlertOpen(false);
    // Execute action only if confirmed (used for delete warning)
    if (confirmed && alertAction) {
      alertAction();
    }
    setAlertAction(null); // Clear action after execution
  };
  // --- End Alert Handler ---

  // --- Fetch Players Data ---
  const fetchPlayers = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const playersWithDefaultStatus = data.map((player) => ({
          ...player,
          status: player.status || "Active", 
        }));
        setPlayers(playersWithDefaultStatus);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError("Failed to load player data. Check your API server.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  // --- Copy to Clipboard ---
  const copyToClipboard = (text, type) => {
    // Check for document.execCommand('copy') fallback if navigator.clipboard fails
    const copyFallback = (text) => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed'; 
      document.body.appendChild(textarea);
      textarea.select();
      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        return successful;
      } catch (err) {
        console.error('Fallback copy failed', err);
        document.body.removeChild(textarea);
        return false;
      }
    };

    navigator.clipboard
      .writeText(text)
      .then(() => {
        customAlert("success", "Copied!", `${type} copied to clipboard: ${text}`);
      })
      .catch((err) => {
        // If clipboard API fails (e.g., in an iframe without user gesture), use fallback
        if (copyFallback(text)) {
          customAlert("success", "Copied!", `${type} copied to clipboard (Fallback): ${text}`);
        } else {
          customAlert("error", "Copy Failed", "Could not copy text.");
          console.error("Could not copy text: ", err);
        }
      });
  };

  // --- Delete Player (Admin Only) ---
  const handleDelete = async (playerId, playerName) => {
    if (!isAdmin) {
      customAlert(
        "error",
        "Access Denied",
        "You do not have permission to delete profiles."
      );
      return;
    }

    const deleteAction = async () => {
      try {
        const res = await fetch(`${API_URL}/${playerId}`, {
          method: "DELETE",
        });
        if (!res.ok)
          throw new Error("Failed to delete. Server status: " + res.status);

        setPlayers((prev) =>
          prev.filter((player) => player._id !== playerId)
        );

        customAlert("success", "Deleted!", `${playerName} has been removed.`);
      } catch (error) {
        customAlert("error", "Error!", error.message);
      }
    };

    customAlert(
      "warning",
      `Delete ${playerName}?`,
      "You won't be able to revert this!",
      deleteAction 
    );
  };

  // --- Edit Player (Admin Only) ---
  const handleEditClick = (player) => {
    if (!isAdmin) {
      customAlert(
        "error",
        "Access Denied",
        "You do not have permission to edit profiles."
      );
      return;
    }

    setCurrentEditingPlayer(player);
    setEditFormData({
      name: player.name,
      email: player.email,
      phone: player.phone || "",
      district: player.district || "",
      bloodGroup: player.bloodGroup || "",
      facebook: player.facebook || "",
      photo: player.photo || "",
      status: player.status || "Active",
    });
    setIsEditModalOpen(true);
  };

  const handleEditFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // ✅ ফিক্স: প্রোফাইল আপডেটের পর Swal-style modal দেখানো
  const handleEditFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!currentEditingPlayer) return;
    if (!isAdmin) {
      customAlert(
        "error",
        "Access Denied",
        "You do not have permission to update profiles."
      );
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${currentEditingPlayer._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });
      if (!res.ok)
        throw new Error("Failed to update. Server status: " + res.status);

      setPlayers((prev) =>
        prev.map((player) =>
          player._id === currentEditingPlayer._id
            ? { ...player, ...editFormData }
            : player
        )
      );

      setIsEditModalOpen(false);
      // ✅ SUCCESS MODAL: Beautiful, centered, with green checkmark
      customAlert("success", "Success!", "Player info updated successfully!");
      
    } catch (error) {
      setIsEditModalOpen(false);
      // ✅ ERROR MODAL: Beautiful, centered, with red X
      customAlert("error", "Error!", "Player info update failed: " + error.message);
    }
  }, [currentEditingPlayer, editFormData, isAdmin, setIsEditModalOpen, customAlert]);


  // --- Search + Sort + Filter ---
  const allDistricts = [
    ...new Set(players.map((p) => p.district).filter(Boolean)),
  ].sort();
  const allBloodGroups = [
    ...new Set(players.map((p) => p.bloodGroup).filter(Boolean)),
  ].sort();

  let filteredPlayers = players.filter((p) => {
    const searchMatch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.district?.toLowerCase().includes(searchTerm.toLowerCase());

    const districtMatch =
      !filterDistrict || p.district === filterDistrict;
    const bloodGroupMatch =
      !filterBloodGroup || p.bloodGroup === filterBloodGroup;
    const statusMatch = !filterStatus || p.status === filterStatus;

    return searchMatch && districtMatch && bloodGroupMatch && statusMatch;
  });

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    const valueA = (a[sortBy] || "").toString().toLowerCase();
    const valueB = (b[sortBy] || "").toString().toLowerCase();
    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const toggleSort = (column) => {
    if (sortBy === column)
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  // --- Loading / Error ---
  if (loading)
    return (
      <div className="min-h-screen flex items-center gap-3 justify-center text-blue-400 text-2xl bg-gray-900">
        <RefreshCw className="animate-spin text-blue-400" size={35} />
        <span className="font-semibold" style={{ textShadow: '0 0 8px rgba(59, 130, 246, 0.7)' }}>
          Loading players...
        </span>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 text-xl bg-gray-900">
        {error}
      </div>
    );

  // --- Render Players ---
  return (
    <div className="p-4 sm:p-6 bg-gray-900 min-h-screen font-sans">
      <style>{GLOBAL_STYLES}</style>
      <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-400 border-b border-blue-400/30 pb-2">
        👤 All Registered Players ({players.length})
      </h2>

      {/* Search + Sort + Refresh + Filters */}
      <div className="mb-6 flex flex-col gap-4 bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          {/* Sort Buttons */}
          <div className="flex space-x-3 w-full md:w-auto justify-center">
            {["name", "district", "email"].map((col) => (
              <button
                key={col}
                onClick={() => toggleSort(col)}
                className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition duration-200 ${
                  sortBy === col
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/50"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <span className="hidden sm:inline">Sort by</span> {col.charAt(0).toUpperCase() + col.slice(1)}
                {sortBy === col &&
                  (sortOrder === "asc" ? (
                    <SortAsc size={16} />
                  ) : (
                    <SortDesc size={16} />
                  ))}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchPlayers}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 transition duration-300 w-full md:w-auto justify-center shadow-md shadow-green-500/50 hover:shadow-lg hover:shadow-green-400/70"
            title="Refresh Player Data"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filter by District */}
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white appearance-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            >
              <option value="">Filter by District (All)</option>
              {allDistricts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Blood Group */}
          <div className="relative">
            <Droplet size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" />
            <select
              value={filterBloodGroup}
              onChange={(e) => setFilterBloodGroup(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white appearance-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            >
              <option value="">Filter by Blood Group (All)</option>
              {allBloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Status/Rank */}
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white appearance-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            >
              <option value="">Filter by Status (All)</option>
              {PLAYER_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Players Grid */}
      {sortedPlayers.length === 0 ? (
        <div className="text-center text-gray-400 text-xl py-20">
          No players found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedPlayers.map((player) => (
            <div
              key={player._id}
              className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition duration-300 relative"
            >
              {/* Admin Badge */}
              {adminEmails.includes(player.email) && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold py-1 px-3 rounded-tr-xl rounded-bl-lg">
                  ADMIN
                </span>
              )}
              {/* Status/Rank Badge */}
              <span className={`absolute top-0 left-0 text-white text-xs font-bold py-1 px-3 rounded-tl-xl rounded-br-lg ${
                  player.status === "Pro" ? "bg-purple-600" :
                  player.status === "Captain" ? "bg-yellow-600" :
                  player.status === "Active" ? "bg-green-600" :
                  "bg-gray-500"
              }`}>
                {player.status}
              </span>

              <div className="flex items-start justify-between mb-4 border-b border-gray-700 pb-3 mt-4">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      player.photo ||
                      `https://placehold.co/64x64/2563eb/ffffff?text=${player.name.charAt(0).toUpperCase()}`
                    }
                    alt={player.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                    onError={(e) => {
                      // Fallback to placeholder if photo URL fails
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/64x64/2563eb/ffffff?text=${player.name.charAt(0).toUpperCase()}`;
                    }}
                  />
                  <h3 className="font-extrabold text-xl text-white">
                    {player.name}
                  </h3>
                </div>
                {isAdmin && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(player)}
                      className="text-yellow-400 hover:text-yellow-500 p-2 rounded-full hover:bg-gray-700 transition duration-200"
                      title="Edit"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(player._id, player.name)}
                      className="text-red-400 hover:text-red-500 p-2 rounded-full hover:bg-gray-700 transition duration-200"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2 text-sm text-gray-300">
                <p className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 overflow-hidden">
                    <Mail size={16} className="text-indigo-400 flex-shrink-0" />{" "}
                    <span className="text-white truncate" title={player.email}>{player.email}</span>
                  </span>
                  {/* Copy Email */}
                  {player.email && (
                    <button
                      onClick={() => copyToClipboard(player.email, "Email")}
                      className="text-gray-400 hover:text-blue-400 p-1 rounded-full hover:bg-gray-700 transition duration-200 flex-shrink-0"
                      title="Copy Email"
                    >
                      <Copy size={14} />
                    </button>
                  )}
                </p>
                <p className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <Phone size={16} className="text-indigo-400 flex-shrink-0" />{" "}
                    {player.phone || "N/A"}
                  </span>
                  {/* Copy Phone */}
                  {player.phone && (
                    <button
                      onClick={() => copyToClipboard(player.phone, "Phone")}
                      className="text-gray-400 hover:text-blue-400 p-1 rounded-full hover:bg-gray-700 transition duration-200 flex-shrink-0"
                      title="Copy Phone Number"
                    >
                      <Copy size={14} />
                    </button>
                  )}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={16} className="text-indigo-400" />{" "}
                  {player.district || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <Droplet size={16} className="text-red-500" />{" "}
                  {player.bloodGroup || "N/A"}
                </p>
                {player.facebook && (
                  <a
                    href={player.facebook.startsWith('http') ? player.facebook : `https://${player.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-2 pt-2"
                  >
                    <Facebook size={16} /> Facebook Profile
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Modal Component */}
      <EditPlayerModal
        isEditModalOpen={isEditModalOpen}
        currentEditingPlayer={currentEditingPlayer}
        editFormData={editFormData}
        handleEditFormSubmit={handleEditFormSubmit}
        handleEditFormChange={handleEditFormChange}
        setIsEditModalOpen={setIsEditModalOpen}
        PLAYER_STATUSES={PLAYER_STATUSES}
      />

      {/* Custom Alert Component */}
      <CustomAlert
        isOpen={isAlertOpen}
        type={alertConfig.type}
        title={alertConfig.title}
        text={alertConfig.text}
        onClose={handleAlertClose}
      />
    </div>
  );
};

export default PlayerInfo;