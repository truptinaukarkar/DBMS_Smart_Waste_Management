import { useNavigate } from "react-router-dom";


export default function Header({
  title,
  subtitle,
  userName = "Rahul Kumar",
  userEmail = "rahul@university.edu",
  color = "green",
}) {
    const navigate = useNavigate();

  const colorMap = {
    emerald: "text-emerald-700",
    teal: "text-teal-700",
    blue: "text-blue-700",
    purple: "text-purple-700",
  };

   const handleLogout = () => {
    // UI-only logout
    navigate("/");
  };

  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
      {/* LEFT: App Info */}
      <div className="flex items-center">
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
