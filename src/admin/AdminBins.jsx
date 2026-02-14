import { useState } from "react";
import AddBinModal from "./AddBinModal";

export default function AdminBins() {
  const [showAddBin, setShowAddBin] = useState(false);

  // Demo data (replace with API later)
  const bins = [
    {
      id: "B-301",
      name: "Library Gate",
      zone: "Academic Block",
      capacity: "120L",
      status: "High",
      installed: "2024-01-15",
    },
    {
      id: "B-102",
      name: "Hostel Block A",
      zone: "Hostel Area",
      capacity: "150L",
      status: "Full",
      installed: "2024-01-10",
    },
    {
      id: "B-205",
      name: "Canteen Main",
      zone: "Canteen",
      capacity: "200L",
      status: "Normal",
      installed: "2024-02-01",
    },
  ];

  const statusColor = (status) => {
    if (status === "Full") return "bg-red-100 text-red-600";
    if (status === "High") return "bg-yellow-100 text-yellow-600";
    return "bg-green-100 text-green-600";
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Bin Management</h2>
          <p className="text-gray-500">
            Manage dustbins across campus
          </p>
        </div>

        <button
          onClick={() => setShowAddBin(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium"
        >
          + Add New Bin
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Bin ID</th>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Zone</th>
              <th className="text-left px-4 py-3">Capacity</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Installed</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bins.map((bin) => (
              <tr key={bin.id} className="border-t">
                <td className="px-4 py-3">{bin.id}</td>
                <td className="px-4 py-3">{bin.name}</td>
                <td className="px-4 py-3">{bin.zone}</td>
                <td className="px-4 py-3">{bin.capacity}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                      bin.status
                    )}`}
                  >
                    {bin.status}
                  </span>
                </td>
                <td className="px-4 py-3">{bin.installed}</td>
                <td className="px-4 py-3">
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showAddBin && (
        <AddBinModal onClose={() => setShowAddBin(false)} />
      )}
    </div>
  );
}
