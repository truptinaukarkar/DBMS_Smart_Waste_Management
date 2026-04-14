export default function StudentHome() {

  return (
    <div className="space-y-6">
      
      {/* Stats */}
      <div className="bg-white rounded-2xl p-6 shadow">
        <h2 className="text-lg font-semibold mb-4">Department Overview</h2>

        <div className="grid grid-cols-4 gap-4">
          {[
            ["CS & IT DEPARTMENT", 4],
            ["ELECTRICAL DEPARTMENT", 4],
            ["CIVIL DEPARTMENT", 3],
            ["MECHANICAL DEPARTMENT", 3],
            ["CHEMICAL DEPARTMENT", 2],
            ["PHYSICS DEPARTMENT", 2],
            ["MATHS DEPARTMENT", 2],
            ["Canteen Area", 2],
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
