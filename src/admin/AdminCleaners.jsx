import { useState } from "react";
import AddCleanerModal from "./AddCleanerModal";

export default function AdminCleaners() {
  const [showAddCleaner, setShowAddCleaner] = useState(false);

  // Demo data (replace with API later)
  const cleaners = [
    {
      id: "CL001",
      name: "Mohan Singh",
      email: "mohan@clean.com",
      zone: "Academic Block",
      activeTasks: 1,
      completedToday: 0,
    },
    {
      id: "CL002",
      name: "Vijay Kumar",
      email: "vijay@clean.com",
      zone: "Hostel Area",
      activeTasks: 0,
      completedToday: 0,
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Cleaner Management</h2>
          <p className="text-gray-500">
            Manage cleaning staff and assignments
          </p>
        </div>

        <button
          onClick={() => setShowAddCleaner(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium"
        >
          + Add Cleaner
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">ID</th>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Assigned Zone</th>
              <th className="text-left px-4 py-3">Active Tasks</th>
              <th className="text-left px-4 py-3">Completed Today</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cleaners.map((cleaner) => (
              <tr key={cleaner.id} className="border-t">
                <td className="px-4 py-3">{cleaner.id}</td>
                <td className="px-4 py-3 font-medium">
                  {cleaner.name}
                </td>
                <td className="px-4 py-3">{cleaner.email}</td>
                <td className="px-4 py-3">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                    {cleaner.zone}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {cleaner.activeTasks}
                </td>
                <td className="px-4 py-3 text-center text-green-600 font-semibold">
                  {cleaner.completedToday}
                </td>
                <td className="px-4 py-3 flex gap-3">
                  <button className="text-gray-500 hover:text-gray-700">
                    ✏️
                  </button>
                  <button className="text-red-500 hover:text-red-600">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showAddCleaner && (
        <AddCleanerModal
          onClose={() => setShowAddCleaner(false)}
        />
      )}
    </div>
  );
}
