import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // VJTI email validation
    const vjtiRegex = /^[a-zA-Z0-9._%+-]+@it\.vjti\.ac\.in$/;

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!vjtiRegex.test(email)) {
      newErrors.email =
        "Only VJTI emails are allowed (example@it.vjti.ac.in)";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validate()) return;

    localStorage.setItem("role", "Student");
    navigate("/student", { replace: true });
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
          Student Registration
        </p>
      </div>

      {/* Card */}
      <form
        noValidate
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8"
      >
        <h2 className="text-xl font-semibold">Create Student Account</h2>
        <p className="text-gray-500 mb-6">
          Only VJTI students are allowed to register
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium mb-1">VJTI Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="student@it.vjti.ac.in"
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
        <div className="mb-4">
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 6 characters"
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

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            className={`w-full px-4 py-3 rounded-xl bg-gray-100 outline-none border
              ${errors.confirmPassword ? "border-red-500" : "border-transparent"}
              focus:ring-2 focus:ring-green-500`}
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-800 transition"
        >
          Register as Student
        </button>

        {/* Back to login */}
        <p className="text-center mt-6 text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 font-medium">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
