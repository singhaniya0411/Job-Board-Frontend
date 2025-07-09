import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Search } from "lucide-react";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Array of color classes for different job cards
  const cardColors = [
    "bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500",
    "bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500",
    "bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500",
    "bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-500",
    "bg-gradient-to-r from-rose-50 to-rose-100 border-l-4 border-rose-500",
    "bg-gradient-to-r from-indigo-50 to-indigo-100 border-l-4 border-indigo-500",
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("https://job-board-backend-7yrq.onrender.com/api/jobs");
        setJobs(data);
        setFilteredJobs(data); // Initialize filtered jobs with all jobs
      } catch (err) {
        setError(err.message || "Failed to fetch jobs");
        toast.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredJobs(jobs); // Reset to all jobs if search is empty
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term) ||
        (job.skills &&
          job.skills.some((skill) => skill.toLowerCase().includes(term)))
    );

    setFilteredJobs(results);

    if (results.length === 0) {
      toast.info("No jobs found matching your search");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-red-500 bg-red-50 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Available Jobs</h2>

        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by title, company, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            className="absolute inset-y-0 right-0 px-4 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Search
          </button>
        </div>

        {filteredJobs.length > 0 && (
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800">
            {filteredJobs.length} {filteredJobs.length === 1 ? "Job" : "Jobs"}{" "}
            Found
          </span>
        )}
      </div>

      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          {searchTerm ? (
            <>
              <p className="text-gray-500 text-lg mb-4">
                No jobs found matching "{searchTerm}"
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilteredJobs(jobs);
                }}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-500 text-lg mb-4">
                No jobs available at the moment.
              </p>
              <Link
                to="/jobs/create"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Post a New Job
              </Link>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job, index) => {
            const colorIndex = index % cardColors.length;
            const colorClass = cardColors[colorIndex];
            const borderColors = [
              "border-blue-500",
              "border-green-500",
              "border-purple-500",
              "border-amber-500",
              "border-rose-500",
              "border-indigo-500",
            ];
            const buttonColors = [
              "bg-blue-600 hover:bg-blue-700",
              "bg-green-600 hover:bg-green-700",
              "bg-purple-600 hover:bg-purple-700",
              "bg-amber-600 hover:bg-amber-700",
              "bg-rose-600 hover:bg-rose-700",
              "bg-indigo-600 hover:bg-indigo-700",
            ];

            return (
              <div
                key={job._id}
                className={`${colorClass} rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 h-full flex flex-col`}
              >
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">
                      {job.title}
                    </h3>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white shadow">
                      {job.type || "Full-time"}
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium mb-2">
                    {job.company}
                  </p>

                  <div className="flex items-center text-gray-600 mb-3">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {job.location}
                  </div>

                  <div className="mb-4">
                    <span className="text-lg font-bold text-gray-800">
                      Rs. {job.salary}
                    </span>
                    <span className="text-gray-500">/month</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills?.slice(0, 4).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-opacity-20 bg-white"
                        } ${borderColors[colorIndex]} border`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-opacity-20 border-gray-400">
                  <Link
                    to={`/jobs/${job._id}`}
                    className={`inline-flex items-center px-4 py-2 ${buttonColors[colorIndex]} text-white rounded-lg transition-colors`}
                  >
                    View Details
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JobList;
