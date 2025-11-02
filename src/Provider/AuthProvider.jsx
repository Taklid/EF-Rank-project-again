import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail, // ✅ Forgot Password
} from "firebase/auth";
import { app } from "../Firebase/firebase.config";

// 🔹 Context তৈরি
export const AuthContext = createContext(null);

// 🔹 Auth ইনিশিয়ালাইজ
const auth = getAuth(app);

// 🔹 Google Provider ইনিশিয়ালাইজ
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔸 Create User (Sign Up)
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 🔸 Login User (Email & Password)
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🔸 Google Sign In
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // 🔸 Forgot Password / Reset Password
  const resetPassword = (email) => {
    setLoading(true);

    // 🔹 Deploy-ready action URL for SPA
    const actionCodeSettings = {
      url: "https://taklid-food.web.app/login", // আপনার deployed login page
      handleCodeInApp: true, // SPA support
    };

    return sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
        setLoading(false);
        console.log("🔹 Password reset email sent to:", email);
      })
      .catch((error) => {
        setLoading(false);
        console.error("❌ Error sending reset email:", error);
        throw error;
      });
  };

  // 🔸 Logout User
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // 🔸 Observe user state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log("✅ Current User:", currentUser);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Context value
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleLogin,
    resetPassword, // ✅ Forgot Password included
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;





