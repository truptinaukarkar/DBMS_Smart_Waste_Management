import { useState } from "react";

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
      photos: {
        top: null,
        side: null
      }
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
      photos: {
        top: null,
        side: null
      }
    },
  ]);

  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleAcceptTask = (task) => {
    setAvailableTasks(availableTasks.filter(t => t.id !== task.id));
    setActiveTasks([...activeTasks, task]);
  };

  const handleRejectTask = (task) => {
    setAvailableTasks(availableTasks.filter(t => t.id !== task.id));
  };

  const handleFileUpload = (taskId, event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles({
        ...uploadedFiles,
        [taskId]: file
      });
    }
  };

  const handleCompleteTask = (task) => {
    setActiveTasks(activeTasks.filter(t => t.id !== task.id));
    setCompletedTasks([...completedTasks, { ...task, completedAt: new Date().toLocaleString() }]);
    // Clear uploaded file for this task
    const newUploadedFiles = { ...uploadedFiles };
    delete newUploadedFiles[task.id];
    setUploadedFiles(newUploadedFiles);
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

      {/* Tasks */}
      <div className="grid grid-cols-2 gap-6">
        {/* Available Tasks */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold mb-3">Available Tasks</h2>

          {availableTasks.map((task) => (
            <div
              key={task.id}
              className="border rounded-xl p-3 mb-3"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-medium">Task #{task.id}</p>
                  <p className="text-xs text-gray-500">Report #{task.reportId}</p>
                </div>
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                  {task.priority}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3 text-sm">
                <div>
                  <span className="text-gray-500">Date & Time:</span>
                  <div className="font-medium">{task.dateTime}</div>
                </div>
                <div>
                  <span className="text-gray-500">Department:</span>
                  <div className="font-medium">{task.department}</div>
                </div>
                <div>
                  <span className="text-gray-500">Location:</span>
                  <div className="font-medium text-xs">{task.location}</div>
                </div>
                <div>
                  <span className="text-gray-500">Bin:</span>
                  <div className="font-medium">{task.bin}</div>
                </div>
                <div>
                  <span className="text-gray-500">Fill Level:</span>
                  <div className={`font-bold ${task.fillLevel >= 80 ? 'text-red-600' : task.fillLevel >= 60 ? 'text-yellow-600' : 'text-green-600'}`}>
                    {task.fillLevel}%
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Deadline:</span>
                  <div className="text-red-600">{task.deadline}</div>
                </div>
              </div>

              {/* Photos Section */}
              <div className="mb-3">
                <p className="text-sm text-gray-500 mb-2">Photos:</p>
                <div className="flex gap-2">
                  <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-400 text-center">Top view</span>
                  </div>
                  <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-400 text-center">Side view</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleAcceptTask(task)}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-2 rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-200"
                >
                  Accept Task
                </button>
                <button 
                  onClick={() => handleRejectTask(task)}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200"
                >
                  Reject Task
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Active Task */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold mb-3">My Active Tasks</h2>

          {activeTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No active tasks</p>
              <p className="text-sm">Accepted tasks will appear here</p>
            </div>
          ) : (
            activeTasks.map((task) => (
              <div key={task.id} className="border rounded-xl p-4 mb-3 bg-green-50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium">Task #{task.id}</p>
                    <p className="text-xs text-gray-500">Report #{task.reportId}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                    ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3 text-sm">
                  <div>
                    <span className="text-gray-500">Department:</span>
                    <div className="font-medium">{task.department}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Bin:</span>
                    <div className="font-medium">{task.bin}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Fill Level:</span>
                    <div className={`font-bold ${task.fillLevel >= 80 ? 'text-red-600' : task.fillLevel >= 60 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {task.fillLevel}%
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Deadline:</span>
                    <div className="text-red-600">{task.deadline}</div>
                  </div>
                </div>

                <div>
                  <input
                    type="file"
                    id={`file-upload-${task.id}`}
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(task.id, e)}
                    className="hidden"
                  />
                  <label 
                    htmlFor={`file-upload-${task.id}`}
                    className="block w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-2 rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 text-center cursor-pointer font-medium"
                  >
                    {uploadedFiles[task.id] ? 'File Uploaded' : 'Upload Completion Proof'}
                  </label>
                  {uploadedFiles[task.id] && (
                    <p className="text-xs text-green-600 mt-1">
                      &#10004; {uploadedFiles[task.id].name}
                    </p>
                  )}
                  {uploadedFiles[task.id] && (
                    <button
                      onClick={() => handleCompleteTask(task)}
                      className="w-full mt-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-2 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 font-medium"
                    >
                      Complete Task
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
