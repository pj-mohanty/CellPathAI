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
             <header className="w-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 shadow-md">
               <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between font-[Poppins,sans-serif]">
                 {/* Logo */}
                 <h1 className="text-3xl font-semibold text-white tracking-tight drop-shadow-sm select-none">
                   <span className="font-extrabold text-white">Cell</span>
                   <span className="text-lime-100">Path</span>
                   <span className="text-white">AI</span>
                 </h1>

                 {/* Navigation */}
                 <nav className="flex gap-8">
                   <Link
                     to="/"
                     className="text-white font-medium hover:text-lime-100 transition-all duration-200 hover:scale-105"
                   >
                     Dashboard
                   </Link>
                   <Link
                     to="/topics"
                     className="text-white font-medium hover:text-lime-100 transition-all duration-200 hover:scale-105"
                   >
                     Topics
                   </Link>
                   <Link
                     to="/quiz-analytics"
                     className="text-white font-medium hover:text-lime-100 transition-all duration-200 hover:scale-105"
                   >
                     Analytics
                   </Link>
                 </nav>

                 {/* Logout Button */}
                 <button
                   onClick={handleLogout}
                   className="text-white font-medium bg-emerald-600 px-4 py-2 rounded-full hover:bg-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md"
                 >
                   Logout
                 </button>
               </div>
             </header>
           );
};

export default Navbar;