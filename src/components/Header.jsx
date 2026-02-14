import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";


export default function Header({
  title,
  subtitle,
  userName = "Rahul Kumar",
  userEmail = "rahul@university.edu",
  color = "green",
}) {
    const navigate = useNavigate();

  const colorMap = {
    green: "text-green-700",
    blue: "text-blue-700",
    purple: "text-purple-700",
  };

   const handleLogout = () => {
    // UI-only logout
    navigate("/");
  };

  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
      {/* LEFT: Logo + App Info */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Smart Waste Monitor" className="h-10 w-10" />
        <div>
          <h1 className={`text-lg font-semibold ${colorMap[color]}`}>
            {title}
          </h1>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>

      {/* RIGHT: User Info + Logout */}
      <div className="flex items-center gap-6 text-right">
        <div>
          <p className="font-medium text-gray-800">{userName}</p>
          <p className="text-sm text-gray-500">{userEmail}</p>
        </div>

        <button
        onClick={handleLogout}
         className="text-sm font-medium text-gray-600 hover:text-red-600">
          Logout
        </button>
      </div>
    </header>
  );
}
