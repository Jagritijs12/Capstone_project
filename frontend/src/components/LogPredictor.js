import React, { useState } from 'react';
import axios from 'axios';

function LogPredictor() {
  const [csvFile, setCsvFile] = useState(null);
  const [anomalies, setAnomalies] = useState([]);

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleCSVUpload = async () => {
    if (!csvFile) return;

    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      const response = await axios.post('http://localhost:5000/api/predict-csv', formData);
      setAnomalies(response.data);
    } catch (err) {
      console.error(err);
      setAnomalies([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      {/* Existing manual form here... */}

      {/* CSV Upload Section */}
      <div className="mt-12 w-full max-w-4xl bg-white shadow-xl rounded-3xl p-10">
        <h3 className="text-2xl font-bold text-purple-800 mb-6 text-center">📁 Upload Logs (CSV)</h3>
        <input type="file" accept=".csv" onChange={handleFileChange} className="mb-4" />
        <button
          onClick={handleCSVUpload}
          className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-full shadow hover:bg-purple-700 transition"
        >
          Upload and Detect Anomalies
        </button>

        {anomalies.length > 0 && (
          <div className="mt-8 overflow-auto max-h-96">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">🚨 Anomalies Detected:</h4>
            <table className="w-full text-left border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  {Object.keys(anomalies[0]).map((key) => (
                    <th key={key} className="px-4 py-2 border">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {anomalies.map((row, idx) => (
                  <tr key={idx} className="border-t">
                    {Object.values(row).map((val, i) => (
                      <td key={i} className="px-4 py-2 border">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default LogPredictor;
