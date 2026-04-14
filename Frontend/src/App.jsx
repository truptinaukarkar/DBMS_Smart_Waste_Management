import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";

// Auth
import Login from "./auth/Login";
import Register from "./auth/Register";

// User
import UserLayout from "./student/UserLayout";
import UserHome from "./student/UserHome";
import ReportBin from "./student/ReportBin";
import MyReports from "./student/MyReports";

// Cleaner
import CleanerLayout from "./cleaner/CleanerLayout";
import CleanerTasks from "./cleaner/CleanerTasks";
import CleanerSchedule from "./cleaner/CleanerSchedule";

function DashboardRedirect() {
  const role = (localStorage.getItem("role") || "").toLowerCase();

  if (role === "cleaner") return <Navigate to="/cleaner" replace />;
  return <Navigate to="/user" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= AUTH ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardRedirect />} />

        {/* ================= USER ================= */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserHome />} />
          <Route path="report" element={<ReportBin />} />
          <Route path="reports" element={<MyReports />} />
        </Route>

        {/* ================= CLEANER ================= */}
        <Route path="/cleaner" element={<CleanerLayout />}>
          <Route index element={<CleanerTasks />} />
          <Route path="schedule" element={<CleanerSchedule />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route
          path="*"
          element={
            <div style={{ padding: "40px", fontSize: "24px" }}>
              404 – Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
