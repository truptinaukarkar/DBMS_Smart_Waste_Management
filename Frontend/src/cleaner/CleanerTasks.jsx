import { useState, useEffect, Fragment } from "react";

export default function CleanerTasks() {
  const [availableTasks, setAvailableTasks] = useState([
    {
      id: "CL204",
      reportId: "RPT1775901938955",
      dateTime: "04/11/2026, 03:35 PM",
      place: "Library Gate",
      area: "Academic Block",
      department: "CHEMICAL DEPARTMENT",
      location: "19.07514, 72.87601",
      bin: "Bin 6",
      fillLevel: 85,
      deadline: "11:00 AM",
      priority: "HIGH",
      photos: { top: null, side: null }
    },
    {
      id: "CL206",
      reportId: "RPT1775901938956",
      dateTime: "04/11/2026, 02:15 PM",
      place: "Admin Building",
      area: "Admin Area",
      department: "CS & IT DEPARTMENT",
      location: "19.07485, 72.87589",
      bin: "Bin 3",
      fillLevel: 72,
      deadline: "01:00 PM",
      priority: "MEDIUM",
      photos: { top: null, side: null }
    }
  ]);

  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({});

  useEffect(() => {
    const reports = JSON.parse(localStorage.getItem("wasteReports") || "[]");
    
    // Convert submitted reports to available tasks
    const reportTasks = reports
      .filter(report => report.status === 'pending')
      .map(report => ({
        id: `CL${Date.now() + Math.random()}`,
        reportId: report.id,
        dateTime: report.submittedAt,
        place: report.department,
        area: "Campus Area",
        department: report.department,
        location: "TBD",
        bin: report.bin,
        fillLevel: report.fillLevel,
        deadline: "2:00 PM",
        priority: report.fillLevel >= 80 ? "HIGH" : report.fillLevel >= 60 ? "MEDIUM" : "LOW",
        photos: report.photos || { top: null, side: null }
      }));
    
    setAvailableTasks(prev => [...reportTasks, ...prev]);
  }, []);

  const handleAcceptTask = (task) => {
    setAvailableTasks((prev) => prev.filter((t) => t.id !== task.id));
    setActiveTasks((prev) => [...prev, task]);
    
    // Update report status to in-progress
    if (task.reportId) {
      const reports = JSON.parse(localStorage.getItem("wasteReports") || "[]");
      const updatedReports = reports.map(report => 
        report.id === task.reportId ? { ...report, status: 'in-progress' } : report
      );
      localStorage.setItem('wasteReports', JSON.stringify(updatedReports));
    }
  };

  const handleRejectTask = (task) => {
    setAvailableTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  const handleFileUpload = (taskId, event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles((prev) => ({
        ...prev,
        [taskId]: file
      }));
    }
  };

  const handleCompleteTask = (task) => {
    setActiveTasks((prev) => prev.filter((t) => t.id !== task.id));
    setCompletedTasks((prev) => [
      ...prev,
      { ...task, completedAt: new Date().toLocaleString() }
    ]);

    setUploadedFiles((prev) => {
      const updated = { ...prev };
      delete updated[task.id];
      return updated;
    });
    
    // Update report status to resolved
    if (task.reportId) {
      const reports = JSON.parse(localStorage.getItem("wasteReports") || "[]");
      const updatedReports = reports.map(report => 
        report.id === task.reportId ? { 
          ...report, 
          status: 'resolved', 
          resolvedAt: new Date().toLocaleString('en-US', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          })
        } : report
      );
      localStorage.setItem('wasteReports', JSON.stringify(updatedReports));
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
          <p className="text-amber-700">Pending Tasks</p>
          <p className="text-3xl font-bold">{availableTasks.length}</p>
        </div>

        <div className="bg-teal-50 p-4 rounded-xl border border-teal-200">
          <p className="text-teal-700">In Progress</p>
          <p className="text-3xl font-bold">{activeTasks.length}</p>
        </div>

        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
          <p className="text-emerald-700">Completed Today</p>
          <p className="text-3xl font-bold">{completedTasks.length}</p>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Available Tasks */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold mb-3">Available Tasks</h2>

          {availableTasks.map((task) => (
            <div key={task.id} className="border rounded-xl p-3 mb-3">
              <div className="flex justify-between mb-3">
                <div>
                  <p className="font-medium">Task #{task.id}</p>
                  <p className="text-xs text-gray-500">
                    Report #{task.reportId}
                  </p>
                </div>
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                  {task.priority}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <span className="text-gray-500">Department:</span>
                  <div>{task.department}</div>
                </div>
                <div>
                  <span className="text-gray-500">Bin:</span>
                  <div>{task.bin}</div>
                </div>
                <div>
                  <span className="text-gray-500">Fill:</span>
                  <div>{task.fillLevel}%</div>
                </div>
                <div>
                  <span className="text-gray-500">Deadline:</span>
                  <div className="text-red-600">{task.deadline}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAcceptTask(task)}
                  className="flex-1 bg-teal-600 text-white py-2 rounded-lg"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectTask(task)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Active Tasks */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold mb-3">My Active Tasks</h2>

          {activeTasks.length === 0 ? (
            <p className="text-gray-500">No active tasks</p>
          ) : (
            activeTasks.map((task) => (
              <div key={task.id} className="border rounded-xl p-3 mb-3">
                <div className="flex justify-between mb-3">
                  <div>
                    <p className="font-medium">Task #{task.id}</p>
                    <p className="text-xs text-gray-500">
                      Report #{task.reportId}
                    </p>
                  </div>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                    {task.priority}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className="text-gray-500">Department:</span>
                    <div>{task.department}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Bin:</span>
                    <div>{task.bin}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Fill:</span>
                    <div>{task.fillLevel}%</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Deadline:</span>
                    <div className="text-red-600">{task.deadline}</div>
                  </div>
                </div>

                <button
                  onClick={() => handleCompleteTask(task)}
                  className="w-full bg-teal-600 text-white py-2 rounded-lg"
                >
                  Complete Task
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}