import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth
import Login from "./auth/Login";
import Register from "./auth/Register";

// Student
import StudentLayout from "./student/StudentLayout";
import StudentHome from "./student/StudentHome";
import ReportBin from "./student/ReportBin";
import MyReports from "./student/MyReports";

// Cleaner
import CleanerLayout from "./cleaner/CleanerLayout";
import CleanerTasks from "./cleaner/CleanerTasks";
import CleanerMap from "./cleaner/CleanerMap";
import CleanerSchedule from "./cleaner/CleanerSchedule";

// Admin
import AdminLayout from "./admin/AdminLayout";
import AdminOverview from "./admin/AdminOverview";
import AdminBins from "./admin/AdminBins";
import AdminCleaners from "./admin/AdminCleaners";
import AdminAnalytics from "./admin/AdminAnalytics";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= AUTH ================= */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= STUDENT ================= */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentHome />} />
          <Route path="report" element={<ReportBin />} />
          <Route path="reports" element={<MyReports />} />
        </Route>

        {/* ================= CLEANER ================= */}
        <Route path="/cleaner" element={<CleanerLayout />}>
          <Route index element={<CleanerTasks />} />
          <Route path="map" element={<CleanerMap />} />
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

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="bins" element={<AdminBins />} />
          <Route path="cleaners" element={<AdminCleaners />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
