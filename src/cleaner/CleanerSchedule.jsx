export default function CleanerSchedule() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h2 className="text-lg font-semibold">Today's Schedule</h2>
      <p className="text-gray-500 mb-6">
        Your planned cleaning route for today
      </p>

      {[
        { place: "Hostel Block A", time: "09:30 AM", status: "Completed" },
        { place: "Library Gate", time: "11:00 AM", status: "In Progress" },
        { place: "Admin Area", time: "01:00 PM", status: "Scheduled" },
        { place: "Canteen Main", time: "03:30 PM", status: "Scheduled" },
      ].map((item, idx) => (
        <div
          key={idx}
          className="border rounded-xl p-4 mb-4 flex justify-between items-center"
        >
          <div>
            <p className="font-medium">{item.place}</p>
            <p className="text-sm text-gray-500">{item.time}</p>
          </div>

          <span className="text-sm px-3 py-1 rounded-full border">
            {item.status}
          </span>
        </div>
      ))}

      <div className="mt-6 bg-blue-50 p-4 rounded-xl text-sm text-blue-700">
        Schedule is AI-generated based on historical waste patterns and peak
        usage times. Tasks may be updated dynamically.
      </div>
    </div>
  );
}
