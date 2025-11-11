import React, { useState } from "react";

interface LoginModalProps {
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    try {
      onLogin(username, password);
      onClose();
    } catch (err) {
      setError("Invalid credentials.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black/70 backdrop-blur-sm px-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#1a1f2e] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl transform transition-all duration-300 scale-100 hover:scale-[1.01]">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Login to Continue
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="bg-white/10 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-white/10 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 transition rounded-md py-2 text-white font-medium"
          >
            Login
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-sm text-white/70 hover:text-white text-center"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
