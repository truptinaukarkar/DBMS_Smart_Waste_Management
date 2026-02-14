export default function AddCleanerModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[440px] p-6 relative shadow-xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 text-xl"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold">Add Cleaner</h2>
        <p className="text-gray-500 mb-6">
          Enter details for the new cleaner
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Cleaner Name"
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-xl"
          />

          <select className="w-full p-3 border rounded-xl">
            <option>Select Assigned Zone</option>
            <option>Academic Block</option>
            <option>Hostel Area</option>
            <option>Canteen</option>
            <option>Admin Area</option>
          </select>
        </div>

        <button
          className="w-full mt-6 bg-purple-600 text-white py-3 rounded-xl font-semibold"
        >
          Add Cleaner
        </button>
      </div>
    </div>
  );
}
