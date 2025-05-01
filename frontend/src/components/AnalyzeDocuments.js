import React, { useState } from 'react';
import axios from 'axios';
import './AnalyzeDocuments.css';

function AnalyzeDocuments() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setResult('Please select a file.');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('document', selectedFile);

    try {
      const response = await axios.post('http://localhost:5001/api/predict-doc', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(JSON.stringify(response.data.prediction, null, 2));
    } catch (error) {
      console.error(error);
      setResult('Error analyzing document.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="analyze-container">
      <h3 className="analyze-title">Document Malware Detection</h3>
      <div className="analyze-card">
        <input
          type="file"
          className="analyze-text-input"
          accept=".csv,.txt"
          onChange={handleFileChange}
        />
        <button className="analyze-button" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Predicting...' : 'Predict'}
        </button>
        {isLoading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <pre className="analyze-result">Result: {result}</pre>
        )}
      </div>
    </div>
  );
}

export default AnalyzeDocuments;
