// import { useEffect, useState, useCallback, useContext } from "react";
// import {
//   Trash2,
//   Mail,
//   Phone,
//   MapPin,
//   Droplet,
//   Facebook,
//   Search,
//   Edit,
//   SortAsc,
//   SortDesc,
//   Copy,
//   RefreshCw,
//   Filter,
// } from "lucide-react";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../Provider/AuthProvider"; // ✅ সঠিক path ঠিক রাখো

// // ✅ নতুন ফিচার: Player Statuses/Ranks
// const PLAYER_STATUSES = ["Active", "Inactive", "Pro", "Beginner", "Captain"];

// const PlayerInfo = () => {
//   const [players, setPlayers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("name");
//   const [sortOrder, setSortOrder] = useState("asc");

//   // ✅ নতুন স্টেট: ফিল্টার করার জন্য
//   const [filterDistrict, setFilterDistrict] = useState("");
//   const [filterBloodGroup, setFilterBloodGroup] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");

//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [currentEditingPlayer, setCurrentEditingPlayer] = useState(null);
//   // ✅ Edit FormData তে status যোগ করা হলো
//   const [editFormData, setEditFormData] = useState({});

//   const API_URL = "https://ef-server-rank-status.vercel.app/players";
//   // https://ef-server-rank-status.vercel.app/players
//   // http://localhost:13000/players

//   // ✅ Firebase User Context থেকে ইউজার আনো
//   const { user } = useContext(AuthContext);
//   const currentUserEmail = user?.email || "";

//   // 🔑 Admin List (তুমি যত দরকার তত অ্যাড করতে পারো)
//   const adminEmails = [
//     "taklidahammed007@gmail.com",
//     "rahathossain200603@gmail.com"
   
//   ];
//   const isAdmin = adminEmails.includes(currentUserEmail);

//   // --- Fetch Players Data ---
//   // ✅ ফাংশনের নাম fetchPlayers থেকে data-র উপর নির্ভর করে রিফ্রেশ বাটন যোগ করা হয়েছে।
//   const fetchPlayers = useCallback(() => {
//     setLoading(true);
//     setError(null);
//     fetch(API_URL)
//       .then((res) => {
//         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//         return res.json();
//       })
//       .then((data) => {
//         // ✅ ডেটা লোডের সময় প্রতিটি প্লেয়ারে একটি ডিফল্ট 'status' যোগ করা হয়েছে যদি না থাকে।
//         const playersWithDefaultStatus = data.map((player) => ({
//           ...player,
//           status: player.status || "Active", // ডিফল্ট স্ট্যাটাস
//         }));
//         setPlayers(playersWithDefaultStatus);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Fetch Error:", err);
//         setError("Failed to load player data. Check your API server.");
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     fetchPlayers();
//   }, [fetchPlayers]);

//   // ✅ নতুন ফাংশন: ক্লিপবোর্ডে কপি
//   const copyToClipboard = (text, type) => {
//     navigator.clipboard
//       .writeText(text)
//       .then(() => {
//         Swal.fire({
//           icon: "success",
//           title: "Copied!",
//           text: `${type} copied to clipboard: ${text}`,
//           toast: true,
//           position: "top-end",
//           showConfirmButton: false,
//           timer: 2000,
//         });
//       })
//       .catch((err) => {
//         Swal.fire({
//           icon: "error",
//           title: "Copy Failed",
//           text: "Could not copy text.",
//         });
//         console.error("Could not copy text: ", err);
//       });
//   };

//   // --- Delete Player (Admin Only) ---
//   const handleDelete = async (playerId, playerName) => {
//     if (!isAdmin) {
//       Swal.fire(
//         "Access Denied",
//         "You do not have permission to delete profiles.",
//         "error"
//       );
//       return;
//     }

//     const result = await Swal.fire({
//       title: `Delete ${playerName}?`,
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#EF4444",
//       cancelButtonColor: "#6B7280",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         const res = await fetch(`${API_URL}/${playerId}`, {
//           method: "DELETE",
//         });
//         if (!res.ok)
//           throw new Error("Failed to delete. Server status: " + res.status);

//         setPlayers((prev) =>
//           prev.filter((player) => player._id !== playerId)
//         );

//         Swal.fire("Deleted!", `${playerName} has been removed.`, "success");
//       } catch (error) {
//         Swal.fire("Error!", error.message, "error");
//       }
//     }
//   };

//   // --- Edit Player (Admin Only) ---
//   const handleEditClick = (player) => {
//     if (!isAdmin) {
//       Swal.fire(
//         "Access Denied",
//         "You do not have permission to edit profiles.",
//         "error"
//       );
//       return;
//     }

//     setCurrentEditingPlayer(player);
//     setEditFormData({
//       name: player.name,
//       email: player.email,
//       phone: player.phone || "",
//       district: player.district || "",
//       bloodGroup: player.bloodGroup || "",
//       facebook: player.facebook || "",
//       photo: player.photo || "",
//       // ✅ Edit form এ status যোগ করা হলো
//       status: player.status || "Active",
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleEditFormChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditFormSubmit = async (e) => {
//     e.preventDefault();
//     if (!currentEditingPlayer) return;
//     if (!isAdmin) {
//       Swal.fire(
//         "Access Denied",
//         "You do not have permission to update profiles.",
//         "error"
//       );
//       return;
//     }

//     try {
//       const res = await fetch(`${API_URL}/${currentEditingPlayer._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editFormData),
//       });
//       if (!res.ok)
//         throw new Error("Failed to update. Server status: " + res.status);

//       setPlayers((prev) =>
//         prev.map((player) =>
//           player._id === currentEditingPlayer._id
//             ? { ...player, ...editFormData }
//             : player
//         )
//       );

//       Swal.fire("Updated!", "Player info updated successfully!", "success");
//       setIsEditModalOpen(false);
//     } catch (error) {
//       Swal.fire("Error!", error.message, "error");
//     }
//   };

//   // --- Search + Sort + Filter ---
//   const allDistricts = [
//     ...new Set(players.map((p) => p.district).filter(Boolean)),
//   ].sort();
//   const allBloodGroups = [
//     ...new Set(players.map((p) => p.bloodGroup).filter(Boolean)),
//   ].sort();

//   let filteredPlayers = players.filter((p) => {
//     const searchMatch =
//       p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       p.district?.toLowerCase().includes(searchTerm.toLowerCase());

//     const districtMatch =
//       !filterDistrict || p.district === filterDistrict;
//     const bloodGroupMatch =
//       !filterBloodGroup || p.bloodGroup === filterBloodGroup;
//     const statusMatch = !filterStatus || p.status === filterStatus;

//     return searchMatch && districtMatch && bloodGroupMatch && statusMatch;
//   });

//   const sortedPlayers = [...filteredPlayers].sort((a, b) => {
//     const valueA = (a[sortBy] || "").toString().toLowerCase();
//     const valueB = (b[sortBy] || "").toString().toLowerCase();
//     if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
//     if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
//     return 0;
//   });

//   const toggleSort = (column) => {
//     if (sortBy === column)
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     else {
//       setSortBy(column);
//       setSortOrder("asc");
//     }
//   };

//   // --- Loading / Error ---
  
// if (loading)
//     return (
//       <div className="min-h-screen flex items-center gap-3 justify-center text-blue-400 text-2xl bg-gray-900">
//         <RefreshCw className="animate-spin  text-blue-400" size={35} /> 
//         {/* গ্লোয়িং ইফেক্টের জন্য ইনলাইন স্টাইল ব্যবহার করা হলো */}
//         <span className="font-semibold" style={{ textShadow: '0 0 8px rgba(59, 130, 246, 0.7)' }}>
//             Loading players...
//         </span>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-400 text-xl bg-gray-900">
//         {error}
//       </div>
//     );

//   // --- Edit Modal ---
//   const EditPlayerModal = () => {
//     if (!isEditModalOpen || !currentEditingPlayer) return null;
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
//         <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
//           <h3 className="text-2xl font-bold mb-6 text-blue-400 border-b border-gray-700 pb-3">
//             Edit Player: {currentEditingPlayer.name}
//           </h3>
//           <form onSubmit={handleEditFormSubmit} className="space-y-4">
//             {[
//               "name",
//               "email",
//               "phone",
//               "district",
//               "bloodGroup",
//               "facebook",
//               "photo",
//             ].map((field) => (
//               <div key={field}>
//                 <label className="block text-sm font-medium text-gray-300 mb-1 capitalize">
//                   {field}
//                 </label>
//                 <input
//                   type={field === "email" ? "email" : "text"}
//                   name={field}
//                   value={editFormData[field]}
//                   onChange={handleEditFormChange}
//                   required={["name", "email"].includes(field)}
//                   className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
//                 />
//               </div>
//             ))}
//             {/* ✅ নতুন ফিল্ড: Status/Rank */}
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-1 capitalize">
//                 Status / Rank
//               </label>
//               <select
//                 name="status"
//                 value={editFormData.status}
//                 onChange={handleEditFormChange}
//                 className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
//               >
//                 {PLAYER_STATUSES.map((status) => (
//                   <option key={status} value={status}>
//                     {status}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {editFormData.photo && (
//               <img
//                 src={editFormData.photo}
//                 alt="Player"
//                 className="mt-3 w-20 h-20 rounded-full object-cover border-2 border-blue-400"
//               />
//             )}
//             <div className="flex justify-end gap-3 pt-4">
//               <button
//                 type="button"
//                 onClick={() => setIsEditModalOpen(false)}
//                 className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   };

//   // --- Render Players ---
//   return (
//     <div className="p-4 sm:p-6 bg-gray-900 min-h-screen">
//       <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-400 border-b border-blue-400/30 pb-2">
//         👤 All Registered Players ({players.length})
//       </h2>

//       {/* Search + Sort + Refresh + Filters */}
//       <div className="mb-6 flex flex-col gap-4 bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
//         <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
//           {/* Search */}
//           <div className="relative w-full md:w-1/3">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by name, email, or district..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
//             />
//           </div>
          
//           {/* Sort Buttons */}
//           <div className="flex space-x-3 w-full md:w-auto justify-center">
//             {["name", "district", "email"].map((col) => (
//               <button
//                 key={col}
//                 onClick={() => toggleSort(col)}
//                 className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition duration-200 ${
//                   sortBy === col
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//                 }`}
//               >
//                 <span className="hidden sm:inline">Sort by</span> {col.charAt(0).toUpperCase() + col.slice(1)}
//                 {sortBy === col &&
//                   (sortOrder === "asc" ? (
//                     <SortAsc size={16} />
//                   ) : (
//                     <SortDesc size={16} />
//                   ))}
//               </button>
//             ))}
//           </div>
          
//           {/* Refresh Button */}
//           <button
//             onClick={fetchPlayers}
//             className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 transition duration-200 w-full md:w-auto justify-center"
//             title="Refresh Player Data"
//           >
//             <RefreshCw size={16} /> Refresh
//           </button>
//         </div>
        
//         {/* Filter Dropdowns */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {/* Filter by District */}
//           <div className="relative">
//             <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <select
//               value={filterDistrict}
//               onChange={(e) => setFilterDistrict(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white appearance-none"
//             >
//               <option value="">Filter by District (All)</option>
//               {allDistricts.map((d) => (
//                 <option key={d} value={d}>
//                   {d}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Filter by Blood Group */}
//           <div className="relative">
//             <Droplet size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" />
//             <select
//               value={filterBloodGroup}
//               onChange={(e) => setFilterBloodGroup(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white appearance-none"
//             >
//               <option value="">Filter by Blood Group (All)</option>
//               {allBloodGroups.map((bg) => (
//                 <option key={bg} value={bg}>
//                   {bg}
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           {/* Filter by Status/Rank */}
//           <div className="relative">
//             <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400" />
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white appearance-none"
//             >
//               <option value="">Filter by Status (All)</option>
//               {PLAYER_STATUSES.map((status) => (
//                 <option key={status} value={status}>
//                   {status}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Players Grid */}
//       {sortedPlayers.length === 0 ? (
//         <div className="text-center text-gray-400 text-xl py-20">
//           No players found matching your criteria.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {sortedPlayers.map((player) => (
//             <div
//               key={player._id}
//               className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition duration-300 relative"
//             >
//               {/* ✅ নতুন ফিচার: Admin Badge */}
//               {adminEmails.includes(player.email) && (
//                 <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold py-1 px-3 rounded-tr-xl rounded-bl-lg">
//                   ADMIN
//                 </span>
//               )}
//               {/* ✅ নতুন ফিচার: Status/Rank Badge */}
//               <span className={`absolute top-0 left-0 text-white text-xs font-bold py-1 px-3 rounded-tl-xl rounded-br-lg ${
//                   player.status === "Pro" ? "bg-purple-600" :
//                   player.status === "Captain" ? "bg-yellow-600" :
//                   player.status === "Active" ? "bg-green-600" :
//                   "bg-gray-500"
//               }`}>
//                   {player.status}
//               </span>

//               <div className="flex items-start justify-between mb-4 border-b border-gray-700 pb-3 mt-4">
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={
//                       player.photo ||
//                       "https://via.placeholder.com/64?text=No+Photo"
//                     }
//                     alt={player.name}
//                     className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
//                   />
//                   <h3 className="font-extrabold text-xl text-white">
//                     {player.name}
//                   </h3>
//                 </div>
//                 {isAdmin && (
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleEditClick(player)}
//                       className="text-yellow-400 hover:text-yellow-500 p-2 rounded-full hover:bg-gray-700"
//                       title="Edit"
//                     >
//                       <Edit size={20} />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(player._id, player.name)}
//                       className="text-red-400 hover:text-red-500 p-2 rounded-full hover:bg-gray-700"
//                       title="Delete"
//                     >
//                       <Trash2 size={20} />
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="space-y-2 text-sm text-gray-300">
//                 <p className="flex items-center justify-between gap-2">
//                   <span className="flex items-center gap-2">
//                     <Mail size={16} className="text-indigo-400" />{" "}
//                     <span className="text-white break-all">{player.email}</span>
//                   </span>
//                   {/* ✅ নতুন ফিচার: Copy Email */}
//                   {player.email && (
//                     <button
//                       onClick={() => copyToClipboard(player.email, "Email")}
//                       className="text-gray-400 hover:text-blue-400"
//                       title="Copy Email"
//                     >
//                       <Copy size={14} />
//                     </button>
//                   )}
//                 </p>
//                 <p className="flex items-center justify-between gap-2">
//                   <span className="flex items-center gap-2">
//                     <Phone size={16} className="text-indigo-400" />{" "}
//                     {player.phone || "N/A"}
//                   </span>
//                   {/* ✅ নতুন ফিচার: Copy Phone */}
//                   {player.phone && (
//                     <button
//                       onClick={() => copyToClipboard(player.phone, "Phone")}
//                       className="text-gray-400 hover:text-blue-400"
//                       title="Copy Phone Number"
//                     >
//                       <Copy size={14} />
//                     </button>
//                   )}
//                 </p>
//                 <p className="flex items-center gap-2">
//                   <MapPin size={16} className="text-indigo-400" />{" "}
//                   {player.district || "N/A"}
//                 </p>
//                 <p className="flex items-center gap-2">
//                   <Droplet size={16} className="text-red-500" />{" "}
//                   {player.bloodGroup || "N/A"}
//                 </p>
//                 {player.facebook && (
//                   <a
//                     href={player.facebook}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-400 hover:text-blue-300 flex items-center gap-2 pt-2"
//                   >
//                     <Facebook size={16} /> Facebook Profile
//                   </a>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       <EditPlayerModal />
//     </div>
//   );
// };

// export default PlayerInfo;