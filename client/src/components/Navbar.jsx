import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);       
      navigate("/login");        
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };
  return (
    <header className="w-full bg-gradient-to-r from-green-600 to-teal-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        
        <h1 className="text-2xl font-bold text-white tracking-wide">CellPathAI</h1>

        
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
            to="/quiz-analytics"
            className="text-white font-medium hover:text-gray-200 transition-colors"
          >
            Analytics
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="text-white font-medium hover:text-gray-200 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
