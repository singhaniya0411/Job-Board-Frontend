import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import JobList from "./pages/jobList";
import JobDetails from "./pages/jobDetails";
import EmployerDashboard from "./pages/EmployerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ApplyJob from "./components/ApplyJob";
import PostJob from "./components/PostJob";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <div className="bg-white min-h-[100vh]">
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/jobs/:id/apply" element={<ApplyJob />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/create-job" element={<PostJob />} />
          <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
