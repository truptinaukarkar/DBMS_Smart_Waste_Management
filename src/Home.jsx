import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";

export default function Home() {
  const [selectedRole, setSelectedRole] = useState("Student");
  const [showDetails, setShowDetails] = useState(false);
  const [activeFeature, setActiveFeature] = useState("Smart Reporting");

  const palette = {
    mint: "#4dcb9b",
    softMint: "#abe5da",
    teal: "#068484",
    olive: "#7aa353",
    lightCyan: "#a5ceca",
    slate: "#425252",
  };

  const roleContent = {
    Student: {
      title: "Student Portal",
      points: [
        "Report overflowing bins with top and side images",
        "Select exact location from the campus map",
        "Track report history and contribution impact",
        "Receive notifications on report status",
        "Earn points for active participation",
        "View campus cleanliness statistics",
      ],
      color: "green",
    },
    Cleaner: {
      title: "Cleaner Portal",
      points: [
        "View and accept assigned cleaning tasks",
        "Use map view to locate task spots quickly",
        "Follow schedule and submit completion proof",
        "Update task status in real-time",
        "Access cleaning guidelines and tips",
        "Communicate with supervisors directly",
      ],
      color: "blue",
    },
  };

  const features = [
    {
      title: "Smart Reporting",
      desc: "Upload top and side images, pin exact location, and submit in seconds.",
      metric: "2-photo evidence",
    },
    {
      title: "Live Task Tracking",
      desc: "Cleaner team gets location-first tasks and can close actions faster.",
      metric: "< 30 min response",
    },
    {
      title: "Operational Insights",
      desc: "Monitor campus zones and identify high-priority bin hotspots.",
      metric: "93% reports resolved",
    },
  ];

  const currentRole = roleContent[selectedRole];

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{
        background: `linear-gradient(180deg, ${palette.softMint} 0%, #ffffff 45%, ${palette.lightCyan} 100%)`,
      }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-end">
          <Link
            to="/login"
            className="px-5 py-2.5 rounded-xl text-white font-semibold transition hover:scale-105"
            style={{ backgroundColor: palette.teal }}
          >
            Login
          </Link>
        </div>

        <section
          className="rounded-3xl shadow-xl p-8 md:p-10 border"
          style={{ backgroundColor: "#ffffff", borderColor: palette.lightCyan }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <img src={logo} alt="Smart Waste Monitor" className="w-16 h-16 mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold" style={{ color: palette.slate }}>
                Smart Waste Monitor
              </h1>
              <p className="mt-3" style={{ color: palette.slate }}>
                An intelligent campus cleanliness platform where students can report
                bin status and cleaners can track and resolve tasks in real time.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="px-6 py-3 rounded-xl font-semibold transition hover:scale-105"
                  style={{ backgroundColor: palette.mint, color: "#083b3b" }}
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 rounded-xl font-semibold border transition hover:bg-white"
                  style={{ color: palette.teal, borderColor: palette.teal }}
                >
                  Explore Platform
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full md:max-w-sm">
              {[
                ["Active Zones", "15"],
                ["Bins Monitored", "120+"],
                ["Reports Resolved", "93%"],
                ["Avg Response", "< 30 min"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                  style={{ borderColor: palette.softMint, backgroundColor: "#f8fffd" }}
                >
                  <p className="text-2xl font-bold" style={{ color: palette.teal }}>
                    {value}
                  </p>
                  <p className="text-sm" style={{ color: palette.slate }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="rounded-3xl shadow p-6 md:p-8 border"
          style={{ backgroundColor: "#ffffff", borderColor: palette.lightCyan }}
        >
          <h2 className="text-2xl font-semibold mb-2">Explore by Role</h2>
          <p className="mb-5" style={{ color: palette.slate }}>
            Switch between roles to preview what each user can do.
          </p>

          <div
            className="flex rounded-full p-1 w-full max-w-xs mb-6"
            style={{ backgroundColor: palette.softMint }}
          >
            {["Student", "Cleaner"].map((role) => (
              <button
                type="button"
                key={role}
                onClick={() => setSelectedRole(role)}
                className="flex-1 py-2 rounded-full text-sm font-medium transition"
                style={{
                  backgroundColor: selectedRole === role ? "#ffffff" : "transparent",
                  color: selectedRole === role ? palette.slate : palette.teal,
                }}
              >
                {role}
              </button>
            ))}
          </div>

          <div
            className="rounded-2xl p-6 border"
            style={{
              backgroundColor: currentRole.color === "green" ? "#eefbf5" : "#ecf9f7",
              borderColor: currentRole.color === "green" ? palette.mint : palette.lightCyan,
            }}
          >
            <h3 className="text-xl font-semibold mb-3">{currentRole.title}</h3>
            <div className="space-y-2">
              {currentRole.points
                .slice(0, showDetails ? currentRole.points.length : 3)
                .map((point) => (
                  <p key={point} style={{ color: palette.slate }}>
                    - {point}
                  </p>
                ))}
            </div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mt-4 px-4 py-2 rounded-lg font-medium transition hover:opacity-90"
              style={{
                backgroundColor: currentRole.color === "green" ? palette.olive : palette.teal,
                color: "#ffffff",
              }}
            >
              {showDetails ? "Show Less" : "Show More"}
            </button>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-4">
          {features.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl shadow p-6 border transition cursor-pointer hover:-translate-y-1"
              style={{
                backgroundColor: activeFeature === card.title ? "#f3fffb" : "#ffffff",
                borderColor: activeFeature === card.title ? palette.mint : palette.softMint,
              }}
              onMouseEnter={() => setActiveFeature(card.title)}
            >
              <h3 className="font-semibold text-lg" style={{ color: palette.slate }}>{card.title}</h3>
              <p className="mt-2 text-sm" style={{ color: palette.slate }}>{card.desc}</p>
              <p className="mt-3 text-xs font-semibold" style={{ color: palette.teal }}>
                {card.metric}
              </p>
            </div>
          ))}
        </section>

        <section
          className="text-white rounded-3xl p-8 md:p-10 text-center"
          style={{
            background: `linear-gradient(135deg, ${palette.teal} 0%, ${palette.slate} 100%)`,
          }}
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            Keep the campus cleaner, together
          </h2>
          <p className="mt-2" style={{ color: palette.softMint }}>
            Start reporting and resolving waste issues faster with one connected platform.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl text-white font-semibold transition hover:scale-105"
              style={{ backgroundColor: palette.olive }}
            >
              Get Started
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl border font-semibold transition hover:bg-white hover:text-black"
              style={{ borderColor: palette.softMint, color: palette.softMint }}
            >
              Create Student Account
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
