import { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [alertShown, setAlertShown] = useState(false);

  // 🌀 Loading Spinner UI
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-lime-400">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-lime-400 border-opacity-70 mb-4"></div>
        <p className="text-xl font-semibold">Please wait...</p>
      </div>
    );
  }

  // 🧩 Error handling (in case context fails)
  if (user === undefined) {
    return (
      <div className="text-center py-20 text-red-500 text-xl font-semibold">
        Something went wrong. Please refresh the page.
      </div>
    );
  }

  // ✅ Logged-in User
  if (user) {
    // Optional Role-based restriction
    if (requiredRole && user.role !== requiredRole) {
      if (!alertShown) {
        Swal.fire({
          icon: "error",
          title: "Access Denied 🚫",
          text: `Only ${requiredRole} can access this page.`,
          confirmButtonText: "OK",
          confirmButtonColor: "#84cc16",
        });
        setAlertShown(true);
      }
      return <Navigate to="/" replace />;
    }
    return children;
  }

  // 🚫 If not logged in
  // ⛔ Skip alert if already on login page
  if (location.pathname === "/login" || location.pathname === "/signin") {
    return;
    // <Navigate to="/login" replace />
  }

  // Show alert once
  if (!alertShown) {
    setAlertShown(true);
    Swal.fire({
      icon: "warning",
      title: "Restricted Area 🔒",
      text: "You must be logged in to view this page.",
      showCancelButton: true,
      confirmButtonText: "Login Now",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#84cc16",
      cancelButtonColor: "#ef4444",
      reverseButtons: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login", { state: { from: location } });
      }
    });
  }

  // Prevent auto-redirect — wait for user’s action
  return null;
};

export default PrivateRoute;
