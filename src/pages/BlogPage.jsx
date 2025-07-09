import { useState } from "react";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const blogPosts = [
    {
      id: 1,
      title: "How to Write a Resume That Gets You Hired",
      excerpt:
        "Learn the key elements that make your resume stand out to employers and increase your chances of landing interviews.",
      category: "job-seekers",
      date: "May 15, 2023",
      readTime: "5 min read",
      image: "blog2.jpeg",
    },
    {
      id: 2,
      title: "Top 5 Interview Mistakes to Avoid",
      excerpt:
        "Discover common interview pitfalls and how to present your best self during the hiring process.",
      category: "job-seekers",
      date: "June 2, 2023",
      readTime: "4 min read",
      image: "blog4.jpeg",
    },
    {
      id: 3,
      title: "Effective Strategies for Hiring in a Competitive Market",
      excerpt:
        "Employers: Learn how to attract top talent when candidates have multiple options available.",
      category: "employers",
      date: "June 10, 2023",
      readTime: "6 min read",
      image: "blog1.jpeg",
    },
    {
      id: 4,
      title: "Remote Work: Building a Strong Company Culture",
      excerpt:
        "How to maintain engagement and productivity with distributed teams in the new work environment.",
      category: "employers",
      date: "June 18, 2023",
      readTime: "7 min read",
      image: "blog5.jpeg",
    },
    {
      id: 5,
      title: "Career Change: Making the Transition Smoothly",
      excerpt:
        "Practical steps to successfully pivot to a new industry or role at any stage of your career.",
      category: "job-seekers",
      date: "June 25, 2023",
      readTime: "8 min read",
      image: "blog3.jpeg",
    },
    {
      id: 6,
      title: "The Future of Work: Trends to Watch in 2023",
      excerpt:
        "From AI to four-day workweeks, explore the workplace trends shaping the coming year.",
      category: "trends",
      date: "July 5, 2023",
      readTime: "9 min read",
      image: "blog6.jpeg",
    },
  ];

  const categories = [
    { id: "all", name: "All Articles" },
    { id: "job-seekers", name: "For Job Seekers" },
    { id: "employers", name: "For Employers" },
    { id: "trends", name: "Industry Trends" },
  ];

  const filteredPosts =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Blog Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          JobBoard Blog
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Career advice, hiring strategies, and industry insights to help you
          navigate the job market
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span className="capitalize">
                  {post.category.replace("-", " ")}
                </span>
                <span className="mx-2">•</span>
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                <Link
                  to={`/blog/${post.id}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link
                to={`/blog/${post.id}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Read more
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
        ))}
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-xl p-8 mt-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Get Career Insights Directly to Your Inbox
          </h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter for the latest job search tips, hiring
            trends, and career advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
