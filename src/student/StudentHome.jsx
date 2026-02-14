import CampusMap from "../components/CampusMap";

export default function StudentHome() {
  // Demo bin locations (replace with backend later)
  const bins = [
    { lat: 19.0765, lng: 72.8779 },
    { lat: 19.0758, lng: 72.8785 },
    { lat: 19.0762, lng: 72.8768 },
    { lat: 19.077, lng: 72.8772 },
  ];

  return (
    <div className="space-y-6">
      {/* Map Section */}
      <div className="bg-white rounded-2xl p-6 shadow">
        <h2 className="text-lg font-semibold">Campus Waste Map</h2>
        <p className="text-gray-500 mb-4">
          View all monitored waste bins across the campus
        </p>

        <CampusMap markers={bins} />
      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl p-6 shadow">
        <h2 className="text-lg font-semibold mb-4">Department Overview</h2>

        <div className="grid grid-cols-4 gap-4">
          {[
            ["Academic Block", 4],
            ["Hostel Area", 4],
            ["Canteen", 3],
            ["Admin Building", 3],
          ].map(([name, count]) => (
            <div
              key={name}
              className="p-4 rounded-xl border bg-gray-50"
            >
              <p className="font-medium">{name}</p>
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-sm text-gray-500">bins monitored</p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact */}
      <div className="bg-white rounded-2xl p-6 shadow">
        <h2 className="text-lg font-semibold mb-4">Your Impact</h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-xl text-center">
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm">Reports Submitted</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl text-center">
            <p className="text-2xl font-bold">14</p>
            <p className="text-sm">Bins Helped Clean</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl text-center">
            <p className="text-2xl font-bold">98%</p>
            <p className="text-sm">Accuracy Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
