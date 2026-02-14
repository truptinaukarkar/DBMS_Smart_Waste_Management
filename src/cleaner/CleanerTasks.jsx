export default function CleanerTasks() {
  return (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-yellow-50 p-4 rounded-xl border">
          <p className="text-yellow-700">Pending Tasks</p>
          <p className="text-3xl font-bold">2</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl border">
          <p className="text-blue-700">In Progress</p>
          <p className="text-3xl font-bold">1</p>
        </div>

        <div className="bg-green-50 p-4 rounded-xl border">
          <p className="text-green-700">Completed Today</p>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>

      {/* Tasks */}
      <div className="grid grid-cols-2 gap-6">
        {/* Available Tasks */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">Available Tasks</h2>

          {[
            {
              id: "CL204",
              place: "Library Gate",
              area: "Academic Block",
              deadline: "11:00 AM",
              priority: "HIGH",
            },
            {
              id: "CL206",
              place: "Admin Building",
              area: "Admin Area",
              deadline: "01:00 PM",
              priority: "MEDIUM",
            },
          ].map((task) => (
            <div
              key={task.id}
              className="border rounded-xl p-4 mb-4"
            >
              <div className="flex justify-between mb-2">
                <p className="font-medium">Task #{task.id}</p>
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                  {task.priority}
                </span>
              </div>

              <p>{task.place}</p>
              <p className="text-sm text-gray-500">{task.area}</p>

              <p className="mt-2 text-sm">
                Deadline: <span className="text-red-600">{task.deadline}</span>
              </p>

              <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg">
                Accept Task
              </button>
            </div>
          ))}
        </div>

        {/* Active Task */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-4">My Active Tasks</h2>

          <div className="border rounded-xl p-4 bg-green-50">
            <p className="font-medium">Task #CL205</p>
            <p>Hostel Block A</p>
            <p className="text-sm text-gray-500">Hostel Area</p>

            <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg">
              Upload Completion Proof
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
