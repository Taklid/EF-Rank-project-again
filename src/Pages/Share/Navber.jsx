import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../Provider/AuthProvider"; // তোমার AuthProvider path অনুযায়ী ঠিক করে নেবে
import clubpic from '../../assets/icon/1000021816.png'

const Navber = () => {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showName, setShowName] = useState(false); // profile click করলে নাম দেখাবে
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);

  // Theme handler
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleName = () => setShowName(!showName);

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  const links = (
    <>
      <li>
        <Link
          to="/menu"
          className="font-semibold text-white hover:text-lime-400 transition"
        >
          MENU
        </Link>
      </li>
      <li>
        <Link
          to="/order"
          className="font-semibold text-white hover:text-lime-400 transition"
        >
          FOOD ORDER
        </Link>
      </li>
      <li>
        <Link
          to="/board"
          className="font-semibold text-white hover:text-lime-400 transition"
        >
          SAVE BOARD
        </Link>
      </li>
      <li>
        <Link
          to="/form"
          className="font-semibold text-white hover:text-lime-400 transition"
        >
          SCOREBOARD
        </Link>
      </li>
    </>
  );

  return (
    <div
      className="navbar sticky top-0 z-50 backdrop-blur-lg bg-gradient-to-r 
                 from-[#0f172a]/70 via-[#1e293b]/60 to-[#0f172a]/70 
                 shadow-lg border-b border-white/20"
    >
      {/* Navbar Start */}
      <div className="navbar-start flex items-center gap-2">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white hover:text-lime-400 transition p-2"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="flex gap-2 items-center">

          <div
            className=" normal-case text-2xl font-bold text-lime-400 
             hover:text-white transition duration-300 hidden md:inline-block"
          >UWP</div>
          <div>
            <img className="w-[50px]" src={clubpic} alt="" />
          </div>

        </div>

      </div>

      {/* Navbar Center (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* User Info */}
        {user ? (
          <div className="flex items-center gap-3">
            {/* User photo */}
            <div className="tooltip tooltip-bottom" data-tip={user.displayName || "User"}>
              <img
                src={user.photoURL || ""}
                alt="user"
                className="w-10 h-10 rounded-full border-2 border-lime-400 hover:scale-105 transition-transform"
              />
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="btn btn-sm bg-lime-400 border-none text-black hover:bg-lime-300 transition duration-300 shadow-md flex items-center gap-1"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn bg-lime-400 border-none text-black hover:bg-lime-300 transition duration-300 shadow-lg">
              LOGIN
            </button>
          </Link>
        )}
      </div>

      {/* Animated Mobile Drawer */}

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 90, damping: 15 }}
              className="fixed top-0 left-0 h-screen w-72 sm:w-80 
                   bg-gray-900/80 backdrop-blur-xl 
                   shadow-2xl z-50 flex flex-col border-r border-gray-700"
            >
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Header */}
                <div className="flex  items-center p-4 border-b border-gray-700">
                  <div>
                    <h2 className="text-lime-400 text-xl font-bold tracking-wide">
                   UWP BD 
                  </h2>
                  </div>
                   <img className="w-[50px] ml-1" src={clubpic} alt="" />
                  <button
                    onClick={toggleMenu}
                    className="text-white ml-[90px] hover:text-lime-400 transition"
                  >
                    <X size={28} />
                  </button>
                </div>

                {/* Top Section: Theme + Profile */}
                <div className="p-5 flex gap-6 justify-center items-center border-b border-gray-700">
                  {/* Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                  >
                    {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
                  </button>

                  {/* Profile */}
                  {user ? (
                    <div className="flex flex-col items-center space-y-1">
                      <img
                        onClick={toggleName}
                        src={user.photoURL || ""}
                        alt="user"
                        className="w-14 h-14 rounded-full border-2 border-lime-400 cursor-pointer hover:scale-105 transition-transform"
                      />
                      {showName && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-white font-semibold text-sm mt-1"
                        >
                          {user.displayName || "User"}
                        </motion.p>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm">Guest User</div>
                  )}
                </div>

                {/* Menu Links */}
                <ul
                  className="menu p-5 space-y-3 text-white font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  {links}
                </ul>

                {/* ✅ Footer Section moved UP */}
                <div className="p-5 mt-4 border-t border-gray-700">
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="btn w-full bg-lime-400 border-none text-black hover:bg-lime-300 transition duration-300 shadow-md flex items-center justify-center gap-1"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  ) : (
                    <Link to="/login" onClick={() => setMenuOpen(false)}>
                      <button className="btn w-full bg-lime-400 border-none text-black hover:bg-lime-300 transition duration-300 shadow-md">
                        LOGIN
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Gray Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-gray-800/50 backdrop-blur-md z-40"
            />
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Navber;
