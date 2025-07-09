import React, { useEffect, useState } from "react";
import PostJob from "../components/PostJob";
import axios from "axios";
import { toast } from "react-toastify";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailUser, setDetailUser] = useState();
  const token = localStorage.getItem("token");

  // Color variations for different job cards
  const cardColors = [
    "bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500",
    "bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500",
    "bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500",
    "bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-500",
    "bg-gradient-to-r from-rose-50 to-rose-100 border-l-4 border-rose-500",
    "bg-gradient-to-r from-indigo-50 to-indigo-100 border-l-4 border-indigo-500",
  ];

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    "Accepted for interview": "bg-blue-100 text-blue-800",
    Rejected: "bg-red-100 text-red-800",
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
    const fetchDashboard = async () => {
      try {
        const { data } = await axios.get(
          "https://job-board-backend-7yrq.onrender.com/api/users/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJobs(data);
        console.log(data);
      } catch (error) {
        setError(error.message || "Failed to fetch job data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
    userDetails();
  }, [token]);

  const updateStatus = async (applicantID, newStatus, applicationID) => {
    try {
      const response = await fetch(
        `https://job-board-backend-7yrq.onrender.com/api/users/application/status/${applicationID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: applicantID,
            status: newStatus,
          }),
        }
      );
      const data = await response.json();

      console.log(response);
      if (response.ok) {
        toast.info(data.message);
        // Refresh the dashboard after status update
        const { data: updatedData } = await axios.get(
          "https://job-board-backend-7yrq.onrender.com/api/users/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJobs(updatedData);
        toast.success("Notification sent to candidate via e-mail");
      } else {
        toast.error("Failed to send email");
      }
    } catch (error) {
      console.error("Failed to update status:", error.message);
      toast.error("Failed to update status");
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
    <div className="max-w-6xl mx-auto">
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
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Your Posted Jobs
        </h1>

        {jobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">
              You haven't posted any jobs yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job, index) => {
              const colorIndex = index % cardColors.length;
              const colorClass = cardColors[colorIndex];
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
                  className={`${colorClass} rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {job.title}
                      </h2>
                      <p className="text-gray-600 mt-1">{job.company}</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white shadow">
                      {job.type || "Full-time"}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4">{job.description}</p>

                  <div className="flex items-center text-gray-600 mb-4">
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

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      Applicants:
                    </h3>
                    {job.applicants.length === 0 ? (
                      <p className="text-gray-500">No applicants yet</p>
                    ) : (
                      <ul className="space-y-3">
                        {job.applicants.map((app, appIndex) => (
                          <li
                            key={appIndex}
                            className="bg-white rounded-lg p-4 shadow-sm"
                          >
                            {app.user ? (
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3">
                                    <div className="font-bold text-gray-800">
                                      {app.user.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {app.user.email}
                                    </div>
                                  </div>
                                  <div className="mt-2">
                                    <span
                                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                                        statusColors[app.status] ||
                                        "bg-gray-100 text-gray-800"
                                      }`}
                                    >
                                      {app.status}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <a
                                    href={app.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                                  >
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
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                      />
                                    </svg>
                                    Resume
                                  </a>
                                  <select
                                    value={app.status}
                                    onChange={(e) =>
                                      updateStatus(
                                        app.user._id,
                                        e.target.value,
                                        app._id
                                      )
                                    }
                                    className={`text-sm rounded-lg border border-gray-300 px-3 py-1.5 focus:ring-2 focus:ring-opacity-50 ${buttonColors[
                                      colorIndex
                                    ].replace("bg-", "focus:ring-")}`}
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="Accepted for interview">
                                      Interview
                                    </option>
                                    <option value="Rejected">Rejected</option>
                                  </select>
                                </div>
                              </div>
                            ) : (
                              <p className="text-gray-500">
                                No user data available
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
