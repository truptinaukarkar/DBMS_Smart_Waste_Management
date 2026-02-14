export default function MyReports() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h2 className="text-lg font-semibold mb-2">My Recent Reports</h2>
      <p className="text-gray-500 mb-6">
        Track the status of your submissions
      </p>

      <div className="h-40 flex items-center justify-center text-gray-500">
        No reports submitted yet
      </div>
    </div>
  );
}
