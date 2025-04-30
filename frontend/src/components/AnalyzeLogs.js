import React, { useState } from 'react';
import axios from 'axios';
import './AnalyzeLogs.css';

function AnalyzeLogs() {
  const [file, setFile] = useState(null);
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [anomaliesChecked, setAnomaliesChecked] = useState(false); // ✅ Added

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setAnomaliesChecked(false); // ✅ Reset when file changes
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setAnomalies([]);
    setAnomaliesChecked(false); // ✅ Reset before upload

    const formData = new FormData();
    formData.append('logFile', file);

    try {
      const response = await axios.post('http://localhost:5001/api/predict-log-file', formData);
      setAnomalies(response.data.anomalies || []);
      setAnomaliesChecked(true); // ✅ Mark that check has completed
    } catch (err) {
      console.error(err);
      setError('Failed to analyze the log file.');
      setAnomaliesChecked(false); // ✅ Don’t show "no anomalies" if failed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analyze-container">
      <h2 className="analyze-title">Analyze Logs</h2>
      <div className="analyze-card">
        <p className="analyze-text">
          Upload and analyze your log files here. Extract critical information quickly and efficiently with DetectifAI.
        </p>

        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button className="analyze-button" onClick={handleUpload} disabled={loading || !file}>
          {loading ? "Analyzing..." : "Upload Log File"}
        </button>

        {loading && (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>Analyzing log file...</p>
          </div>
        )}

        {error && <p style={{ color: 'red' }}>❌ {error}</p>}

        {!loading && !error && anomalies.length > 0 && (
          <div>
            <h3>Detected Anomalies</h3>
            <pre>{JSON.stringify(anomalies, null, 2)}</pre>
          </div>
        )}

        {!loading && !error && file && anomalies.length === 0 && anomaliesChecked && (
          <p style={{ color: 'green' }}>✅ No anomalies found.</p>
        )}
      </div>
    </div>
  );
}

export default AnalyzeLogs;
