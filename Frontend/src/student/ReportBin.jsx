import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

export default function ReportBin() {
    const navigate = useNavigate();
    const [department, setDepartment] = useState("");
    const [bin, setBin] = useState("");
    const [fill, setFill] = useState(50);
    const [photos, setPhotos] = useState({
        top: null,
        side: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");


    const getSeverity = () => {
        if (fill < 40)
            return { label: "Low", color: "bg-green-100 text-green-700" };
        if (fill < 70)
            return { label: "Medium", color: "bg-yellow-100 text-yellow-700" };
        return { label: "High", color: "bg-red-100 text-red-700" };
    };

    const severity = getSeverity();

    const handleSubmit = async () => {
        if (!photos.top || !photos.side) {
            setError('Both top and side photos are required');
            return;
        }

        if (!department || !bin) {
            setError('Department and bin location are required');
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            // Create FormData for file upload
            const formData = new FormData();
            formData.append('bin_id', bin);
            formData.append('fill_level', fill);
            formData.append('photo', photos.top);

            const response = await api.createTask(formData);
            
            // Store additional metadata in localStorage for display
            const reportData = {
                ...response.task,
                department,
                binLocation: bin,
                submittedAt: new Date().toLocaleString('en-US', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit', 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                })
            };

            const existingReports = JSON.parse(localStorage.getItem('wasteReports') || '[]');
            existingReports.unshift(reportData);
            localStorage.setItem('wasteReports', JSON.stringify(existingReports));

            navigate('/user/reports');
        } catch (error) {
            console.error('Error submitting report:', error);
            setError(error.message || 'There was an error submitting your report. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow space-y-8">
            {/* Upload Section */}
            <div>
                <h2 className="text-lg font-semibold mb-4">Upload Bin Photos</h2>

                {[
                    { key: "top", label: "1. Top View Photo" },
                    { key: "side", label: "2. Side View Photo" },
                ].map(({ key, label }) => (
                    <div key={key} className="mb-6">
                        <p className="font-medium mb-2">
                            {label} <span className="text-red-500">*</span>
                        </p>

                        <label className="cursor-pointer block">
                            <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className="hidden"
                                onChange={(e) =>
                                    setPhotos((prev) => ({
                                        ...prev,
                                        [key]: e.target.files[0],
                                    }))
                                }
                            />

                            <div className="h-36 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-500 hover:border-green-500 transition">
                                {photos[key] ? (
                                    <img
                                        src={URL.createObjectURL(photos[key])}
                                        alt={label}
                                        className="h-full object-contain rounded-lg"
                                    />
                                ) : (
                                    <span>Click to upload</span>
                                )}
                            </div>
                        </label>
                    </div>
                ))}
            </div>

            

            {/* Department & Bin */}
            <div>               
                {/* Department */}
                <div className="mb-4">
                    <label className="font-medium">
                        3. Select Department <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={department}
                        onChange={(e) => {
                            setDepartment(e.target.value);
                            setBin("");
                        }}
                        className="w-full mt-2 p-3 border rounded-xl"
                    >
                        <option value="">Select a department</option>
                        <option>CS & IT DEPARTMENT </option>
                        <option>ELECTRICAL DEPARTMENT </option>
                        <option>MECHANICAL DEPARTMENT</option>
                        <option>CIVIL DEPARTMENT</option>
                        <option>CHEMICAL DEPARTMENT</option>
                        <option>PHYSICS DEPARTMENT</option>
                        <option>MATHS DEPARTMENT</option>
                        <option>Canteen Area</option>
                    </select>
                </div>

                {/* Bin */}
                <div className="mb-6">
                    <label className="font-medium">
                        4. Select Bin <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={bin}
                        onChange={(e) => setBin(e.target.value)}
                        disabled={!department}
                        className="w-full mt-2 p-3 border rounded-xl disabled:bg-gray-100"
                    >
                        <option value="">Select a bin</option>
                        <option>Bin 1</option>
                        <option>Bin 2</option>
                        <option>Bin 3</option>
                        <option>Bin 4</option>
                        <option>Bin 5</option>
                        <option>Bin 6</option>
                        <option>Bin 7</option>
                        <option>Bin 8</option>
                        <option>Bin 9</option>
                        <option>Bin 10</option>
                    </select>
                </div>




                {/* Fill Level */}
                <div>
                    <label className="font-medium">
                        5. Estimate Fill Level <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={fill}
                        onChange={(e) => setFill(Number(e.target.value))}
                        className="w-full mt-4"
                    />

                    <div className="flex items-center gap-4 mt-4">
                        <div className="text-3xl font-bold">{fill}%</div>
                        <span
                            className={`px-4 py-1 rounded-full text-sm font-medium ${severity.color}`}
                        >
                            {severity.label}
                        </span>
                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                        Drag slider to estimate how full the dustbin is
                    </p>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                onClick={handleSubmit}
                disabled={
                    !photos.top ||
                    !photos.side ||
                    !department ||
                    !bin ||
                    isLoading
                }
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-3 rounded-xl font-semibold text-lg disabled:opacity-50 hover:from-teal-700 hover:to-emerald-700 transition-all duration-200"
            >
                {isLoading ? 'Submitting...' : 'Submit Report'}
            </button>

        </div>
    );
}
