import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const switchRole = (newRole) => {
    setRole(newRole);
    setName("");
    setEmail("");
    setPassword("");
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (role === "user") {
      // VJTI email validation for User role only
      const vjtiRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]*vjti\.ac\.in$/;
      if (!vjtiRegex.test(email)) {
        newErrors.email = "Only VJTI emails are allowed (example@vjti.ac.in)";
      }
    } else if (role === "worker") {
      // Basic email validation for Worker role
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await api.login(email, password);
      
      localStorage.setItem("role", response.user.role);
      localStorage.setItem("userName", response.user.name);
      localStorage.setItem("userEmail", response.user.email);
      localStorage.setItem("userId", response.user.id);

      const rolePath = response.user.role === "worker" ? "/cleaner" : "/user";
      navigate(rolePath, { replace: true });
    } catch (error) {
      setErrors({ general: error.message || 'Login failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 px-4">

      <div className="mb-6 flex flex-col items-center mt-7">
        <h1 className="text-3xl font-bold text-gray-900">
          Smart Waste Monitor
        </h1>
        <p className="text-gray-600 mt-1">
          Real-time campus waste management
        </p>
      </div>

      {/* Card */}
      <form
        noValidate
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8"
      >
        <h2 className="text-xl font-semibold">Welcome Back</h2>
        <p className="text-gray-500 mb-6">
          Select your role to continue
        </p>

        {/* Role Selector */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-6">
          {["user", "worker"].map((r) => (
            <button
              type="button"
              key={r}
              onClick={() => switchRole(r)}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition capitalize
                ${role === r
                  ? "bg-white shadow text-black"
                  : "text-gray-600"
                }`}
            >
              {r === "user" ? "User" : "Worker"}
            </button>
          ))}
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {errors.general}
          </div>
        )}

        {/* Name */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 rounded-xl bg-gray-100 outline-none border border-transparent focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={
              role === "user"
                ? "your.email@vjti.ac.in"
                : role === "worker"
                ? "worker@company.com"
                : "user@example.com"
            }
            className={`w-full px-4 py-3 rounded-xl bg-gray-100 outline-none border
              ${errors.email ? "border-red-500" : "border-transparent"}
              focus:ring-2 focus:ring-green-500`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={`w-full px-4 py-3 rounded-xl bg-gray-100 outline-none border
              ${errors.password ? "border-red-500" : "border-transparent"}
              focus:ring-2 focus:ring-green-500`}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-3 rounded-xl font-semibold text-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Logging in...' : `Login as ${role === "user" ? "User" : "Worker"}`}
        </button>

        {role === "user" && (
          <p className="text-center mt-6 text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-teal-600 font-medium">
              Register here
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}
