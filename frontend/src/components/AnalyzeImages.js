import React, { useState } from 'react';
import axios from 'axios';
import './AnalyzeImages.css';

function ImagePredictor() {
  const [imagePath, setImagePath] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult('');
    try {
      const response = await axios.post('http://localhost:5001/api/predict-img', {
        image_path: imagePath
      });
      setResult(response.data.prediction);
    } catch (error) {
      console.error(error);
      setResult('Error predicting image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analyze-container">
      <h3 className="analyze-title">Image Stego Detection</h3>
      <div className="analyze-card">
        <input
          type="text"
          value={imagePath}
          onChange={(e) => setImagePath(e.target.value)}
          placeholder="Enter full image path"
          className="analyze-text-input"
        />
        <button
          className="analyze-button"
          onClick={handleSubmit}
          disabled={loading || !imagePath}
        >
          {loading ? 'Predicting...' : 'Predict'}
        </button>

        {loading && (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>Analyzing image...</p>
          </div>
        )}

        {!loading && result && (
          <p className="analyze-result">Result: {result}</p>
        )}
      </div>
    </div>
  );
}

export default ImagePredictor;
