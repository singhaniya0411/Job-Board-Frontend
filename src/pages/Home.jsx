import React, { useContext } from "react";
import Context from "../context/context";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useContext(Context);
  return (
    <div className="min-h-[100vh] bg-gradient-to-r from-blue-600 to-indigo-700 flex flex-col lg:flex-row items-center justify-around px-6 py-12 lg:py-0">
      {/* Text Content */}
      <div className="max-w-2xl text-center lg:text-left mb-12 lg:mb-0">
        <div className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-white">4536+</span>{" "}
          <span className="text-amber-300">Jobs Listed</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          Find Your <span className="text-green-300">Dream Job</span> Today
        </h1>
        <p className="text-lg text-blue-100 mb-8">
          Discover thousands of job opportunities with the best companies. We
          help job seekers and employers connect with each other seamlessly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
            Upload Your Resume
          </button>
          <button
            className="px-8 py-3 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 "
            onClick={() => {
              navigate("/jobs");
            }}
          >
            Browse Jobs
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="relative w-full flex justify-center items-center max-w-xl">
        <img
          className="relative w-120 h-100 rounded-lg shadow-2xl border-4 border-white"
          src="right.png"
          alt="Happy professionals"
        />
      </div>
    </div>
  );
};

export default Home;
