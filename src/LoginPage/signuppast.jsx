// import React, { useState, useContext } from "react";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";
// import { UserPlus, Eye, EyeOff, Upload } from "lucide-react";
// import { AuthContext } from "../Provider/AuthProvider";
// import { useNavigate } from "react-router-dom";
// import { updateProfile } from "firebase/auth";
// import "./signin.css";

// const SignUp = () => {
//     const { createUser, loading } = useContext(AuthContext);
//     const [showPassword, setShowPassword] = useState(false);
//     const [previewImage, setPreviewImage] = useState(null);
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//         phone: "",
//         district: "",
//         bloodGroup: "",
//         facebook: "",
//         photo: null,
//     });

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === "photo" && files && files[0]) {
//             setFormData({ ...formData, photo: files[0] });
//             setPreviewImage(URL.createObjectURL(files[0]));
//         } else {
//             setFormData({ ...formData, [name]: value });
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const { name, email, password, phone, district, bloodGroup, facebook, photo } = formData;

//         if (!name || !email || !password || !photo) {
//             Swal.fire("⚠️ Warning", "Please fill all required fields!", "warning");
//             return;
//         }

//         try {
//             Swal.fire({
//                 title: "Creating your account...",
//                 allowOutsideClick: false,
//                 didOpen: () => Swal.showLoading(),
//             });

//             // ✅ 1. Upload image to IMGBB
//             const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;
//             const form = new FormData();
//             form.append("image", photo);

//             const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
//                 method: "POST",
//                 body: form,
//             });

//             const data = await res.json();
//             if (!data.success) throw new Error("Image upload failed!");

//             const photoURL = data.data.display_url; // ✅ image URL from imgbb

//             // ✅ 2. Create Firebase user
//             const userCredential = await createUser(email, password);

//             // ✅ 3. Update Firebase profile with name & photo
//             await updateProfile(userCredential.user, {
//                 displayName: name,
//                 photoURL: photoURL,
//             });
            
//             // 🌟 4. SAVE ADDITIONAL PLAYER INFO TO MONGODB 🌟
//             const playerInfo = {
//                 name,
//                 email,
//                 phone,
//                 district,
//                 bloodGroup,
//                 facebook,
//                 photo: photoURL, // Save the uploaded photo URL
//                 // Note: We don't save the password here
//             };

//             const dbSaveRes = await fetch("https://ef-server-rank-status.vercel.app/players", {
//               // http://localhost:13000/players
//               // https://ef-server-rank-status.vercel.app/players
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(playerInfo),
//             });

//             if (!dbSaveRes.ok) {
//                 // If DB save fails, log an error but don't stop the Firebase process
//                 console.error("Failed to save player info to MongoDB.");
//             }
//             // 🌟 END MONGODB SAVE 🌟

//             Swal.fire({
//                 icon: "success",
//                 title: "✅ Sign Up Successful!",
//                 text: `Welcome, ${name}!`,
//                 timer: 2000,
//                 showConfirmButton: false,
//             });

//             navigate("/");
//         } catch (error) {
//             console.error("Signup Error:", error);
//             Swal.fire("❌ Error", error.message, "error");
//         }
//     };

//     return (
//         <div className="min-h-screen signup flex items-center justify-center relative overflow-hidden">
//             {/* Glowing background */}
//             <div className="absolute -top-32 -left-32 w-72 h-72 bg-blue-500 blur-[150px] rounded-full opacity-40 animate-pulse"></div>
//             <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-indigo-500 blur-[150px] rounded-full opacity-40 animate-pulse"></div>

//             <motion.form
//                 onSubmit={handleSubmit}
//                 initial={{ opacity: 0, y: -30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//                 className="card bg-gradient-to-b from-gray-400/40 to-gray-600/40 shadow-2xl w-full max-w-sm border border-gray-700/30 rounded-2xl p-6 backdrop-blur-sm"
//             >
//                 <h2 className="text-2xl font-bold text-center mb-4 text-white flex items-center justify-center gap-2">
//                     <UserPlus /> Sign Up
//                 </h2>

//                 <fieldset className="fieldset">
//                     {/* Profile Photo */}
//                     <label className="label text-white">Profile Photo</label>
//                     <div className="flex items-center gap-3">
//                         <label className="cursor-pointer bg-gray-800 px-3 py-2 rounded-lg text-sm flex items-center gap-2 text-white hover:bg-gray-700">
//                             <Upload size={18} /> Choose Photo
//                             <input
//                                 type="file"
//                                 name="photo"
//                                 accept="image/*"
//                                 onChange={handleChange}
//                                 className="hidden"
//                                 required
//                             />
//                         </label>
//                         {previewImage && (
//                             <img
//                                 src={previewImage}
//                                 alt="Preview"
//                                 className="w-12 h-12 rounded-full object-cover border border-gray-600"
//                             />
//                         )}
//                     </div>

//                     {/* Username */}
//                     <label className="label text-white mt-3">Username</label>
//                     <input
//                         type="text"
//                         name="name"
//                         className="input input-bordered bg-gray-900 border-gray-700 text-white"
//                         placeholder="Enter your name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                     />

//                     {/* Email */}
//                     <label className="label text-white mt-2">Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         className="input input-bordered bg-gray-900 border-gray-700 text-white"
//                         placeholder="Enter your email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                     />

//                     {/* Password */}
//                     <label className="label text-white mt-2">Password</label>
//                     <div className="relative">
//                         <input
//                             type={showPassword ? "text" : "password"}
//                             name="password"
//                             className="input input-bordered w-full bg-gray-900 border-gray-700 text-white"
//                             placeholder="Enter password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                         />
//                         <span
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute right-3 top-3 text-gray-400 cursor-pointer hover:text-white"
//                         >
//                             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                         </span>
//                     </div>

//                     {/* Phone Number */}
//                     <label className="label text-white mt-2">Phone Number</label>
//                     <input
//                         type="tel"
//                         name="phone"
//                         className="input input-bordered bg-gray-900 border-gray-700 text-white"
//                         placeholder="Enter your phone number"
//                         value={formData.phone}
//                         onChange={handleChange}
//                     />

//                     {/* District / Zilla */}
//                     <label className="label text-white mt-2">District / Zilla</label>
//                     <input
//                         type="text"
//                         name="district"
//                         className="input input-bordered bg-gray-900 border-gray-700 text-white"
//                         placeholder="Enter your district or zilla"
//                         value={formData.district}
//                         onChange={handleChange}
//                     />

//                     {/* Blood Group */}
//                     <label className="label text-white mt-2">Blood Group</label>
//                     <select
//                         name="bloodGroup"
//                         className="select select-bordered w-full bg-gray-900 border-gray-700 text-white"
//                         value={formData.bloodGroup}
//                         onChange={handleChange}
//                     >
//                         <option value="">Select your blood group</option>
//                         <option value="A+">A+</option>
//                         <option value="A−">A−</option>
//                         <option value="B+">B+</option>
//                         <option value="B−">B−</option>
//                         <option value="AB+">AB+</option>
//                         <option value="AB−">AB−</option>
//                         <option value="O+">O+</option>
//                         <option value="O−">O−</option>
//                     </select>

//                     {/* Facebook ID Link */}
//                     <label className="label text-white mt-2">Facebook ID Link</label>
//                     <input
//                         type="url"
//                         name="facebook"
//                         className="input input-bordered bg-gray-900 border-gray-700 text-white"
//                         placeholder="Paste your Facebook profile link"
//                         value={formData.facebook}
//                         onChange={handleChange}
//                     />

//                     {/* Submit Button */}
//                     <motion.button
//                         whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px #60a5fa" }}
//                         whileTap={{ scale: 0.95 }}
//                         type="submit"
//                         disabled={loading}
//                         className="btn w-full mt-6 border-none bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold py-2 rounded-lg shadow-lg"
//                     >
//                         {loading ? (
//                             <span className="loading loading-spinner text-white"></span>
//                         ) : (
//                             <>
//                                 <UserPlus size={18} /> Sign Up
//                             </>
//                         )}
//                     </motion.button>
//                 </fieldset>
//             </motion.form>
//         </div>
//     );
// };

// export default SignUp;