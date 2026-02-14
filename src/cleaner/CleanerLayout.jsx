import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function CleanerLayout() {
  return (
    <div className="min-h-screen bg-blue-50">
      <Header
        title="Smart Waste Monitor"
        subtitle="Cleaner Portal"
        color="blue"
        userName="Mohan Singh"
        userEmail="Academic Block"
      />

      {/* Tabs */}
      <div className="px-6 py-4 flex gap-3">
        <NavLink to="/cleaner" end className="tab">
          My Tasks
        </NavLink>
        <NavLink to="/cleaner/map" className="tab">
          Map View
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
