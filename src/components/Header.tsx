import React, { useEffect, useState } from "react";
import { User, LogOut, LogIn, Menu, X } from "lucide-react";
import { LoginModal } from "./LoginModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FAKE_TOKEN_KEY = "sw_token";

export const Header: React.FC = () => {
  const [auth, setAuth] = useState<{ username: string } | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Load token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem(FAKE_TOKEN_KEY);
    if (token) setAuth(JSON.parse(token));
  }, []);

  // Handle login
  const handleLogin = (username: string, password: string) => {
    if (username === "admin" && password === "admin") {
      const token = { username };
      localStorage.setItem(FAKE_TOKEN_KEY, JSON.stringify(token));
      setAuth(token);
      setShowLogin(false);
      toast.success("Logged in successfully!");
    } else {
      toast.error("Invalid credentials!");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem(FAKE_TOKEN_KEY);
    setAuth(null);
    setMenuOpen(false);
    toast.info("Logged out successfully!");
  };

  return (
    <>
      <header className="w-full bg-[#0b0d17]/80 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="text-cyan-400"
            >
              <path
                d="M2 12l10-8 10 8-10 8L2 12z"
                fill="currentColor"
                opacity="0.14"
              />
              <path
                d="M12 3v18"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <h1 className="text-[10px] xs:text-base sm:text-xl md:text-2xl font-semibold sm:font-bold header-glow leading-tight tracking-wide">
                StarWars
                <p className="hidden md:inline pr-2">Characters</p>
              </h1>
              <p className="hidden sm:block text-xs text-white/60">
                Explore the galaxy & discover your favorite heroes
              </p>
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden sm:flex items-center gap-3">
            {auth ? (
              <>
                <div className="p-2 rounded-full bg-white/10 border border-white/10">
                  <User className="w-5 h-5 text-cyan-300" />
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-sm text-white transition"
                >
                  <LogOut size={14} /> Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-1 px-3 py-1 rounded-md bg-green-600 hover:bg-green-700 text-sm text-white transition"
              >
                <LogIn size={14} /> Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 rounded-md bg-white/10 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="sm:hidden px-4 pb-4 border-t border-white/10 bg-[#0b0d17]/90 flex flex-col gap-2">
            {auth ? (
              <button
                onClick={handleLogout}
                className="w-full px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm flex items-center justify-center gap-1"
              >
                <LogOut size={14} /> Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowLogin(true);
                  setMenuOpen(false);
                }}
                className="w-full mt-2 px-3 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm flex items-center justify-center gap-1"
              >
                <LogIn size={14} /> Login
              </button>
            )}
          </div>
        )}

        {/* Login Modal */}
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />}
      </header>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};
