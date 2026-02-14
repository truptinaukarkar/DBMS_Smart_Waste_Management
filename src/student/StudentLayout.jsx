import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function StudentLayout() {
  return (
    <div className="min-h-screen bg-green-50">
      <Header
        title="Smart Waste Monitor"
        subtitle="Student Portal"
        color="green"
        userName="Rahul Kumar"
        userEmail="rahul@university.edu"
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
