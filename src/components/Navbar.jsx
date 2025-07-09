import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/context";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, user, role } = useContext(Context);

  const handleAuthentication = () => {
    if (isLoggedIn) {
      logout();
      navigate("/login");
      toast.success("Logged out successfully");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    // role = localStorage.getItem("role");
    console.log(role);
    console.log(isLoggedIn);
  }, []);

  const handlePostJob = () => {
    if (role === "employee") {
      navigate("/create-job");
    } else {
      toast.error("Only employers can post jobs");
    }
  };

  return (
    <nav className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer h-10 w-24"
        >
          <img
            className="rounded-full h-full w-full object-cover"
            src="/logo1.jpg"
            alt="Company Logo"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex  gap-4 md:space-x-8">
          <button
            onClick={() => navigate("/")}
            className="text-white hover:text-amber-300 font-medium transition-colors duration-200"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/jobs")}
            className="text-white hover:text-amber-300 font-medium transition-colors duration-200"
          >
            Browse Jobs
          </button>
          <button
            className="text-white hover:text-amber-300 font-medium transition-colors duration-200"
            onClick={() => {
              if (role === "employee") {
                navigate("/employer-dashboard");
              } else if (role === "jobseeker") {
                navigate("/candidate-dashboard");
              } else {
                toast.error("Kindly Login !!");
              }
            }}
          >
            Dashboard
          </button>
          <button
            className="hidden md:block text-white hover:text-amber-300 font-medium transition-colors duration-200"
            onClick={() => navigate("/blog")}
          >
            Blog
          </button>
          <button
            className="hidden md:block text-white hover:text-amber-300 font-medium transition-colors duration-200"
            onClick={() => navigate("/contact-us")}
          >
            Contact
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {isLoggedIn && role == "employee" && (
            <button
              onClick={handlePostJob}
              className="flex  md:text-[14px] text-[12px]  px-3 py-1 items-center bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md"
            >
              Post Job
            </button>
          )}

          <button
            onClick={handleAuthentication}
            className={`md:text-[14px] text-[12px] px-3 py-1 rounded-lg font-medium transition-colors duration-200 shadow-md ${
              isLoggedIn
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-white hover:bg-gray-100 text-blue-600"
            }`}
          >
            {isLoggedIn ? "Logout" : "Login / Register"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
