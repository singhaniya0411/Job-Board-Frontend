import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PostJob = () => {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    salary: "",
    requirements: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unauthorized access! Please log in");
      }

      token = token.replace(/^"|"$/g, "");

      const { data } = await axios.post(
        "https://job-board-backend-7yrq.onrender.com/api/jobs",
        jobDetails,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Job Posted Successfully!");
      // Reset form after successful submission
      setJobDetails({
        title: "",
        company: "",
        description: "",
        location: "",
        salary: "",
        requirements: "",
      });
    } catch (error) {
      console.error("Job posting failed:", error.message);
      setError(
        error.response?.data?.message || error.message || "Job posting failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px) p-4 mt-10">
      <div className="w-full max-w-2xl">
        <form
          onSubmit={handlePostJob}
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Create a New Job Posting
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Job Title*
              </label>
              <input
                type="text"
                name="title"
                value={jobDetails.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Software Engineer"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Company Name*
              </label>
              <input
                type="text"
                name="company"
                value={jobDetails.company}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Acme Inc."
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Job Description*
              </label>
              <textarea
                name="description"
                value={jobDetails.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                placeholder="Detailed description of the job responsibilities..."
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Requirements*
              </label>
              <textarea
                name="requirements"
                value={jobDetails.requirements}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                placeholder="Required skills, qualifications, and experience..."
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Location*
              </label>
              <input
                type="text"
                name="location"
                value={jobDetails.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="New York, NY"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Salary*
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  Rs.
                </span>
                <input
                  type="number"
                  name="salary"
                  value={jobDetails.salary}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="50000"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  /month
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
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
                  Posting...
                </>
              ) : (
                "Post Job"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
