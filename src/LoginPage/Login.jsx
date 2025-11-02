import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Eye, EyeOff, LogIn } from "lucide-react";
import "./login.css";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { signIn, resetPassword } = useContext(AuthContext); // ✅ resetPassword context থেকে আনলাম
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const navigate = useNavigate();

  // 🔹 Handle Login Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill out both email and password!",
        background: "#1a1a1a",
        color: "#fff",
      });
      return;
    }

    setLoading(true);

    try {
      // ✅ Firebase Authentication Login
      const result = await signIn(email, password);
      const loggedUser = result.user;

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome back, ${loggedUser.displayName || "User"}!`,
        background: "#0d0d0d",
        color: "#00ffff",
        showConfirmButton: false,
        timer: 2000,
        
      });
      navigate('/')

      event.target.reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
        background: "#1a1a1a",
        color: "#ff4d4d",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Forgot Password (with Firebase)
  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "🔑 Reset Password",
      input: "email",
      inputLabel: "Enter your email to receive reset link",
      inputPlaceholder: "example@email.com",
      confirmButtonText: "Send Reset Link",
      background: "#0d0d0d",
      color: "#00ffff",
      inputAttributes: {
        required: true,
      },
      showCancelButton: true,
    });

    if (!email) return;

    setResetting(true);
    try {
      // ✅ Firebase reset password function
      await resetPassword(email);

      Swal.fire({
        icon: "success",
        title: "Reset Link Sent!",
        text: `A password reset email has been sent to ${email}`,
        background: "#0d0d0d",
        color: "#00ffff",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error Sending Reset Email",
        text: error.message,
        background: "#1a1a1a",
        color: "#ff4d4d",
      });
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="login-container">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="login-form"
      >
        <h2 className="login-title">🔐 Login</h2>

        {/* Email */}
        <label className="label">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          className="input-field"
          required
        />

        {/* Password */}
        <label className="label">Password</label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="input-field pr-10"
            required
          />
          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Forgot Password */}
        <button
          type="button"
          className="forgot-btn"
          onClick={handleForgotPassword}
          disabled={resetting}
        >
          {resetting ? "Sending..." : "Forgot Password?"}
        </button>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px #00ffff" }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="submit-btn"
        >
          {loading ? (
            <span className="loader"></span>
          ) : (
            <>
              <LogIn size={18} />
              Login
            </>
          )}
        </motion.button>

        <p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?
          <Link to="/signin">
            <span className="text-blue-400 cursor-pointer hover:underline">
              Sign Up
            </span>
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
