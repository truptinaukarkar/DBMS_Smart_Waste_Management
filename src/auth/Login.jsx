import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("Student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const switchRole = (newRole) => {
    setRole(newRole);
    setEmail("");
    setPassword("");
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate()) return;

    localStorage.setItem("role", role);

    const rolePath = role === "Cleaner" ? "/cleaner" : "/student";
    navigate(rolePath, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-green-100 px-4">

      {/* Logo */}
      <div className="mb-6 flex flex-col items-center">
        <img src={logo} alt="Smart Waste Monitor" className="w-16 h-16 mb-4" />
        <h1 className="text-3xl font-bold text-green-800">
          Smart Waste Monitor
        </h1>
        <p className="text-green-700 mt-1">
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
          {["Student", "Cleaner"].map((r) => (
            <button
              type="button"
              key={r}
              onClick={() => switchRole(r)}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition
                ${role === r
                  ? "bg-white shadow text-black"
                  : "text-gray-600"
                }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={
              role === "Student"
                ? "student@university.edu"
                : role === "Cleaner"
                ? "cleaner@clean.com"
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
          className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-800 transition"
        >
          Login as {role}
        </button>

        {role === "Student" && (
          <p className="text-center mt-6 text-gray-500">
            Don’t have an account?{" "}
            <Link to="/register" className="text-green-700 font-medium">
              Register here
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}
