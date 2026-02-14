export default function AdminOverview() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card title="Total Bins" value="5" color="purple" />
        <Card title="Critical Alerts" value="2" color="red" />
        <Card title="Pending Tasks" value="2" color="yellow" />
        <Card title="Completed Today" value="0" color="green" />
      </div>

      {/* Live Monitoring */}
      <div className="bg-white rounded-2xl p-6 shadow">
        <h2 className="text-lg font-semibold">Live Monitoring</h2>
        <p className="text-gray-500 mb-4">Real-time system status</p>

        <p className="text-red-600 font-medium mb-2">
          Critical Bins (Immediate Action Required)
        </p>

        <Alert name="Hostel Block A" area="Hostel Area" level="92%" />
        <Alert name="Admin Building" area="Admin Area" level="88%" />

        <p className="text-yellow-600 font-medium mt-6 mb-2">
          Warning Level Bins
        </p>

        <Alert
          name="Library Gate"
          area="Academic Block"
          level="78%"
          warning
        />
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  const colors = {
    purple: "bg-purple-50 text-purple-700",
    red: "bg-red-50 text-red-700",
    yellow: "bg-yellow-50 text-yellow-700",
    green: "bg-green-50 text-green-700",
  };

  return (
    <div className={`p-4 rounded-xl border ${colors[color]}`}>
      <p>{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function Alert({ name, area, level, warning }) {
  return (
    <div
      className={`border rounded-xl p-4 mb-3 ${
        warning ? "bg-yellow-50" : "bg-red-50"
      }`}
    >
      <div className="flex justify-between">
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-500">{area}</p>
        </div>
        <p className="font-bold">{level}</p>
      </div>
    </div>
  );
}
