import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full bg-gradient-to-r from-green-600 to-teal-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        {/* Left side: Brand */}
        <h1 className="text-2xl font-bold text-white tracking-wide">CellPathAI</h1>

        {/* Middle: Navigation */}
        <nav className="flex gap-8">
          <Link
            to="/"
            className="text-white font-medium hover:text-gray-200 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/topics"
            className="text-white font-medium hover:text-gray-200 transition-colors"
          >
            Topics
          </Link>
          <Link
            to="/analytics"
            className="text-white font-medium hover:text-gray-200 transition-colors"
          >
            Analytics
          </Link>
        </nav>

        {/* Right side: Logout */}
        <button className="text-white font-medium hover:text-gray-200 transition-colors">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
