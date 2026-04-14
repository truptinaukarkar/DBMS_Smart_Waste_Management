import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function CleanerLayout() {
  const userName = localStorage.getItem("userName") || "Mohan Singh";
  const userEmail = localStorage.getItem("userEmail") || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        title="Smart Waste Monitor"
        subtitle="Cleaner Portal"
        color="teal"
        userName={userName}
        userEmail={userEmail}
      />

      {/* Tabs */}
      <div className="px-6 py-4 flex gap-3">
        <NavLink to="/cleaner" end className="tab">
          My Tasks
        </NavLink>
        <NavLink to="/cleaner/schedule" className="tab">
          Schedule
        </NavLink>
      </div>

      {/* Page Content */}
      <div className="px-6 pb-10">
        <Outlet />
      </div>
    </div>
  );
}
