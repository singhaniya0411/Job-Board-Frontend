import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CandidateDashboard = () => {
  const [profile, setProfile] = useState({});
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [detailUser, setDetailUser] = useState();

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    "Accepted for interview": "bg-blue-100 text-blue-800",
    Rejected: "bg-red-100 text-red-800",
    Accepted: "bg-green-100 text-green-800",
  };

  const userDetails = async () => {
    try {
      const response = await axios.get(
        `https://job-board-backend-7yrq.onrender.com/api/users/user-details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDetailUser(response.data);
      console.log("Running");
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://job-board-backend-7yrq.onrender.com/api/users/candidate-dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setApplications(response.data);
      } catch (error) {
        console.error("Error while fetching Dashboard", error.message);
        toast.error("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    userDetails();
  }, [token]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-xl shadow-sm p-6 mb-8 mx-4 mt-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                {detailUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">You:</h2>
                <h2 className="text-[18px] font-semibold text-gray-800">
                  {detailUser.name}
                </h2>
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1">
                  <span className="flex items-center text-gray-600">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {detailUser.email}
                  </span>
                  <span className="flex items-center text-gray-600">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    {detailUser.role.charAt(0).toUpperCase() +
                      detailUser.role.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-600">Track your job applications and status</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Your Applications
          </h2>
          {applications.length > 0 && (
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800">
              {applications.length}{" "}
              {applications.length === 1 ? "Application" : "Applications"}
            </span>
          )}
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              You haven't applied to any jobs yet
            </p>
            <a
              href="/jobs"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Jobs
            </a>
          </div>
        ) : (
          <ul className="space-y-4">
            {applications.map((app) => (
              <li
                key={app._id}
                className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 p-5 bg-white"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
                      {app.job?.title || "Job title not available"}
                    </h3>
                    <p className="text-gray-600 font-medium mb-2">
                      {app.job?.company || "Company not specified"}
                    </p>

                    <div className="flex items-center text-gray-500 mb-2">
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
                      {app.job?.location || "Location not specified"}
                    </div>

                    <div className="flex items-center text-gray-500">
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Applied on {new Date(app.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full ${
                        statusColors[app.status] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {app.status}
                    </span>

                    {app.resume && (
                      <a
                        href={`https://job-board-backend-7yrq.onrender.com/uploads/${app.resume
                          .split("\\")
                          .pop()}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        View Resume
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CandidateDashboard;
