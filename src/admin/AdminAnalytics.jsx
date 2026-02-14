export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow">
        <h2 className="text-lg font-semibold">
          Waste Generation by Department
        </h2>
        <p className="text-gray-500 mb-4">
          Distribution across campus
        </p>

        <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center">
          Pie Chart Placeholder
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Stat title="Average Response" value="32 min" />
        <Stat title="Fastest Response" value="18 min" />
        <Stat title="Completion Rate" value="94%" />
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <p className="text-gray-500">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
