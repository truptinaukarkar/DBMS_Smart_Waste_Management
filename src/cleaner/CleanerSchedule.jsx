export default function CleanerSchedule() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h2 className="text-lg font-semibold">Today's Schedule</h2>
      <p className="text-gray-500 mb-6">
        Your planned cleaning route for today
      </p>

      {[
        {
          id: "SCH001",
          binId: "Bin 2",
          place: "Hostel Block A",
          department: "HOSTEL MANAGEMENT",
          location: "19.07423, 72.87654",
          fillLevel: 65,
          time: "09:30 AM",
          status: "Completed",
          estimatedDuration: "15 mins"
        },
        {
          id: "SCH002",
          binId: "Bin 6",
          place: "Library Gate",
          department: "LIBRARY",
          location: "19.07514, 72.87601",
          fillLevel: 85,
          time: "11:00 AM",
          status: "In Progress",
          estimatedDuration: "20 mins"
        },
        {
          id: "SCH003",
          binId: "Bin 3",
          place: "Admin Area",
          department: "ADMINISTRATION",
          location: "19.07485, 72.87589",
          fillLevel: 72,
          time: "01:00 PM",
          status: "Scheduled",
          estimatedDuration: "18 mins"
        },
        {
          id: "SCH004",
          binId: "Bin 8",
          place: "Canteen Main",
          department: "CANTEEN SERVICES",
          location: "19.07398, 72.87456",
          fillLevel: 90,
          time: "03:30 PM",
          status: "Scheduled",
          estimatedDuration: "25 mins"
        },
      ].map((item, idx) => (
        <div
          key={idx}
          className={`border rounded-xl p-4 mb-4 ${
            item.status === "Completed" ? "bg-emerald-50 border-emerald-200" : 
            item.status === "In Progress" ? "bg-teal-50 border-teal-200" : 
            "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold">{item.place}</p>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{item.id}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item.time}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item.estimatedDuration}
                </span>
              </div>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              item.status === "Completed" ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : 
              item.status === "In Progress" ? "bg-teal-100 text-teal-700 border border-teal-200" : 
              "bg-gray-100 text-gray-700 border border-gray-200"
            }`}>
              {item.status}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="text-gray-500 block text-xs mb-1">Bin ID</span>
              <span className="font-medium">{item.binId}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-xs mb-1">Department</span>
              <span className="font-medium">{item.department}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-xs mb-1">Location</span>
              <span className="font-mono text-xs">{item.location}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-xs mb-1">Fill Level</span>
              <span className={`font-bold ${
                item.fillLevel >= 80 ? 'text-red-600' : 
                item.fillLevel >= 60 ? 'text-yellow-600' : 
                'text-green-600'
              }`}>
                {item.fillLevel}%
              </span>
            </div>
          </div>
        </div>
      ))}

      
    </div>
  );
}
