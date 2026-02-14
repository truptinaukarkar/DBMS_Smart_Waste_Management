import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-purple-50">
      <Header
        title="Smart Waste Monitor"
        subtitle="Admin Control Center"
        color="purple"
        userName="Admin User"
        userEmail="System Administrator"
      />

      {/* Tabs */}
      <div className="px-6 py-4 flex gap-3">
        <NavLink to="/admin" end className="tab">
          Overview
        </NavLink>
        <NavLink to="/admin/bins" className="tab">
          Bins
        </NavLink>
        <NavLink to="/admin/cleaners" className="tab">
          Cleaners
        </NavLink>
        <NavLink to="/admin/analytics" className="tab">
          Analytics
        </NavLink>
      </div>

      {/* Page */}
      <div className="px-6 pb-10">
        <Outlet />
      </div>
    </div>
  );
}
