import { useState, useEffect } from "react";

export default function MyReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem('wasteReports') || '[]');
    setReports(storedReports);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getFillLevelColor = (level) => {
    if (level >= 80) return 'text-red-600';
    if (level >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h2 className="text-lg font-semibold mb-2">My Recent Reports</h2>
      <p className="text-gray-500 mb-6">
        Track the status of your submissions
      </p>

      <div className="space-y-4">
        {reports.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No reports submitted yet</p>
            <p className="text-gray-400 text-sm mt-2">Your submitted reports will appear here</p>
          </div>
        ) : (
          reports.map((report) => (
          <div key={report.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">Report #{report.id}</h3>
                <p className="text-sm text-gray-500">{report.submittedAt}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Department:</span>
                <span className="ml-2 font-medium">{report.department}</span>
              </div>
              <div>
                <span className="text-gray-500">Bin:</span>
                <span className="ml-2 font-medium">{report.bin}</span>
              </div>
              <div>
                <span className="text-gray-500">Location:</span>
                <span className="ml-2 font-medium">{report.location}</span>
              </div>
              <div>
                <span className="text-gray-500">Fill Level:</span>
                <span className={`ml-2 font-bold ${getFillLevelColor(report.fillLevel)}`}>
                  {report.fillLevel}%
                </span>
              </div>
            </div>

            {report.photos && (report.photos.top || report.photos.side) && (
              <div className="mt-3 pt-3 border-t">
                <p className="text-sm text-gray-500 mb-2">Photos:</p>
                <div className="flex gap-2">
                  {report.photos.top && (
                    <img 
                      src={report.photos.top} 
                      alt="Top view" 
                      className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:scale-105 transition"
                      onClick={() => window.open(report.photos.top, '_blank')}
                    />
                  )}
                  {report.photos.side && (
                    <img 
                      src={report.photos.side} 
                      alt="Side view" 
                      className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:scale-105 transition"
                      onClick={() => window.open(report.photos.side, '_blank')}
                    />
                  )}
                </div>
              </div>
            )}

            {report.resolvedAt && (
              <div className="mt-3 pt-3 border-t text-sm">
                <span className="text-gray-500">Resolved at:</span>
                <span className="ml-2 text-green-600 font-medium">{report.resolvedAt}</span>
              </div>
            )}
          </div>
        )))}
      </div>
    </div>
  );
}
