import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function StudentLayout() {
  const userName = localStorage.getItem("userName") || "Rahul Kumar";
  const userEmail = localStorage.getItem("userEmail") || "rahul@university.edu";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        title="Smart Waste Monitor"
        subtitle="Student Portal"
        color="emerald"
        userName={userName}
        userEmail={userEmail}
      />

      {/* Tabs */}
      <div className="px-6 py-4 flex gap-3">
        <NavLink to="/student" end className="tab">
          Home
        </NavLink>
        <NavLink to="/student/report" className="tab">
          Report Bin
        </NavLink>
        <NavLink to="/student/reports" className="tab">
          My Reports
        </NavLink>
      </div>

      {/* Page Content */}
      <div className="px-6 pb-10">
        <Outlet />
      </div>
    </div>
  );
}
