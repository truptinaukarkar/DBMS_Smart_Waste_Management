export default function AddBinModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[420px] p-6 relative shadow-xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 text-xl"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold">Add New Bin</h2>
        <p className="text-gray-500 mb-6">
          Enter details for the new dustbin
        </p>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Bin Name (e.g., Library Gate)"
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="text"
            placeholder="Zone (e.g., Academic Block)"
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="number"
            placeholder="Capacity (Liters)"
            className="w-full p-3 border rounded-xl"
          />
        </div>

        <button
          className="w-full mt-6 bg-purple-600 text-white py-3 rounded-xl font-semibold"
        >
          Add Bin
        </button>
      </div>
    </div>
  );
}
