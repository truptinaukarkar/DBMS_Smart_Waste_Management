import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [selectedRole, setSelectedRole] = useState("Student");
  const [showDetails, setShowDetails] = useState(false);

  const colors = {
    primary: "#0f766e",      // Deep teal
    secondary: "#14b8a6",    // Teal
    accent: "#22c55e",       // Emerald green
    light: "#5eead4",        // Light teal
    dark: "#134e4a",         // Dark teal
    gray: "#64748b",         // Slate gray
    lightGray: "#f8fafc",    // Light slate
    warning: "#f59e0b",      // Amber
    danger: "#ef4444",       // Red
  };

  const stats = [
    { number: "15", label: "Active Zones", icon: "Z" },
    { number: "120+", label: "Bins Monitored", icon: "B" },
    { number: "93%", label: "Reports Resolved", icon: "R" },
    { number: "<30min", label: "Avg Response", icon: "T" },
  ];

  const roleContent = {
    Student: {
      title: "Student Portal",
      subtitle: "Report & Track",
      features: [
        "Upload bin photos with location tagging",
        "Track your report history and impact",
        "Earn rewards for active participation",
        "Real-time status notifications",
        "Campus cleanliness insights",
        "Contribute to sustainable campus",
      ],
      gradient: "from-green-400 to-emerald-600",
      bgColor: "bg-green-50",
    },
    Cleaner: {
      title: "Cleaner Portal",
      subtitle: "Manage & Resolve",
      features: [
        "View assigned cleaning tasks",
        "Interactive map for navigation",
        "Upload completion proof",
        "Real-time task updates",
        "Schedule management",
        "Performance tracking",
      ],
      gradient: "from-blue-400 to-cyan-600",
      bgColor: "bg-blue-50",
    },
  };

  const features = [
    {
      icon: "R",
      title: "Smart Reporting",
      description: "Multi-photo evidence with precise GPS location tagging",
      highlight: "2-photo proof system",
    },
    {
      icon: "T",
      title: "Real-time Tracking",
      description: "Live task assignment and status monitoring system",
      highlight: "Instant task updates",
    },
    {
      icon: "I",
      title: "Intelligent Insights",
      description: "AI-powered analytics for waste pattern recognition",
      highlight: "Predictive analytics",
    },
  ];

  const currentRole = roleContent[selectedRole];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900">Smart Waste Monitor</span>
            </div>
            <Link
              to="/login"
              className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-6 py-2 rounded-lg font-medium hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-sm"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Campus Waste
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">
                    Management
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Transform your campus into a cleaner, smarter environment with our intelligent waste monitoring platform. Real-time reporting and efficient task management.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-xl font-semibold hover:bg-teal-50 transition-all duration-200"
                >
                  Explore Platform
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {stat.icon}
                    </div>
                    <span className="text-3xl font-bold text-gray-900">{stat.number}</span>
                  </div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Role</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the platform from different perspectives tailored to your needs
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1 rounded-xl flex">
              {["Student", "Cleaner"].map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                    selectedRole === role
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className={`${currentRole.bgColor} rounded-3xl p-8 lg:p-12 border border-gray-100`}>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className={`inline-flex px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r ${currentRole.gradient} mb-4`}>
                    {currentRole.subtitle}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">{currentRole.title}</h3>
                  <div className="space-y-3">
                    {currentRole.features
                      .slice(0, showDetails ? currentRole.features.length : 4)
                      .map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${currentRole.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <span className="text-white text-xs">+</span>
                          </div>
                          <p className="text-gray-700">{feature}</p>
                        </div>
                      ))}
                  </div>
                  {currentRole.features.length > 4 && (
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className={`mt-6 text-teal-600 font-medium hover:text-teal-700 transition-colors duration-200`}
                    >
                      {showDetails ? "Show less" : "Show more features"}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <div className={`w-full h-64 bg-gradient-to-br ${currentRole.gradient} rounded-2xl opacity-10`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-32 h-32 bg-gradient-to-br ${currentRole.gradient} rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-xl`}>
                      {selectedRole[0]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cutting-edge technology for efficient waste management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="inline-flex px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">
                  {feature.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Start Making a Difference Today
          </h2>
          <p className="text-xl text-teal-50 max-w-2xl mx-auto mb-8">
            Join hundreds of students and cleaners already using our platform to create a cleaner, more sustainable campus environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-teal-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-teal-700 transition-all duration-200"
            >
              Login Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
