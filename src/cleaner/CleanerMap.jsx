import CampusMap from "../components/CampusMap";

export default function CleanerMap() {
  const taskLocations = [
    { lat: 19.0765, lng: 72.8779 }, // Library Gate
    { lat: 19.0759, lng: 72.8783 }, // Admin Building
    { lat: 19.0771, lng: 72.8772 }, // Hostel Block A
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h2 className="text-lg font-semibold mb-2">Map View</h2>
      <p className="text-gray-500 mb-4">
        View assigned cleaning locations on the campus map
      </p>

      <CampusMap markers={taskLocations} />
    </div>
  );
}
