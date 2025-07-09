import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://job-board-backend-7yrq.onrender.com/api/jobs/${id}`
        );
        setJob(data);
      } catch (error) {
        toast.error("Failed to fetch job details");
        navigate("/jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (validTypes.includes(file.type)) {
        if (file.size <= 5 * 1024 * 1024) {
          // 5MB limit
          setResume(file);
          setFileError("");
        } else {
          setFileError("File size should be less than 5MB");
        }
      } else {
        setFileError("Only PDF and Word documents are allowed");
      }
    }
  };

  const handleApply = async () => {
    if (!token) {
      toast.error("Please log in to apply");
      return navigate("/login");
    }

    if (!resume) {
      setError("Please upload your resume");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", resume);

    try {
      const { data } = await axios.post(
        `https://job-board-backend-7yrq.onrender.com/api/jobs/${id}/apply`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(data.message);
      toast.success("Application submitted successfully!");
      setError("");
      setTimeout(() => navigate("/jobs"), 2000);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to submit application";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !job) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-160px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!job) {
    return null; // Or a proper error component
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-xl shadow-lg overflow-hidden">
        {/* Job Header */}
        <div className="bg-blue-600 px-6 py-4 text-white">
          <h1 className="text-2xl font-bold mb-2">Apply for {job.title}</h1>
          <p className="text-blue-100">{job.company}</p>
        </div>

        {/* Job Details */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Location
              </h3>
              <p className="mt-1 text-gray-700">{job.location}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Salary
              </h3>
              <p className="mt-1 text-gray-700">Rs. {job.salary}/month</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Job Description
            </h3>
            <p className="text-gray-700 whitespace-pre-line">
              {job.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Requirements
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {job.requirements
                .split("\n")
                .map((item, i) => item.trim() && <li key={i}>{item}</li>)}
            </ul>
          </div>

          {/* Application Form */}
          {role === "jobseeker" ? (
            <div className="mt-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Resume (PDF or Word)
                </label>
                <div className="flex items-center">
                  <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg border border-blue-300 cursor-pointer hover:bg-blue-50">
                    <svg
                      className="w-8 h-8 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="mt-2 text-sm text-gray-600">
                      {resume ? resume.name : "Choose file"}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {fileError && (
                  <p className="mt-1 text-sm text-red-600">{fileError}</p>
                )}
              </div>

              <button
                onClick={handleApply}
                disabled={loading || !resume}
                className={`w-full px-6 py-3 rounded-lg font-medium text-white ${
                  loading || !resume
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition-colors duration-200 flex items-center justify-center`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          ) : (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
              <p>Only job seekers can apply for this position.</p>
              {!token && (
                <button
                  onClick={() => navigate("/login")}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Log In as Job Seeker
                </button>
              )}
            </div>
          )}

          {/* Status Messages */}
          {message && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 text-green-700">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
