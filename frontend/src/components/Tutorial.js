import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Tutorial.css';

function Tutorial() {
  const [selectedTutorial, setSelectedTutorial] = useState('logs');

  const renderTutorialContent = () => {
    let content;
    switch (selectedTutorial) {
      case 'logs':
        content = (
          <>
            <h2>Logs Tutorial</h2>
            <p>Learn how to analyze system logs effectively using DetectifAI.</p>
            <div className="tutorial-buttons">
              <button>Analyze Logs</button>
              <button>Watch Video</button>
            </div>
          </>
        );
        break;
      case 'images':
        content = (
          <>
            <h2>Images Tutorial</h2>
            <p>Discover how DetectifAI analyzes images for forensic insights.</p>
            <div className="tutorial-buttons">
              <button>Analyze Images</button>
              <button>Watch Video</button>
            </div>
          </>
        );
        break;
      case 'documents':
        content = (
          <>
            <h2>Documents Tutorial</h2>
            <p>Understand document analysis workflows with DetectifAI.</p>
            <div className="tutorial-buttons">
              <button>Analyze Documents</button>
              <button>Watch Video</button>
            </div>
          </>
        );
        break;
      default:
        content = null;
    }

    return (
      <motion.div
        key={selectedTutorial}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {content}
      </motion.div>
    );
  };

  return (
    <div className="tutorial-page">
      <div className="sidebar">
        <button
          className={selectedTutorial === 'logs' ? 'active' : ''}
          onClick={() => setSelectedTutorial('logs')}
        >
          Logs Tutorial
        </button>
        <button
          className={selectedTutorial === 'images' ? 'active' : ''}
          onClick={() => setSelectedTutorial('images')}
        >
          Images Tutorial
        </button>
        <button
          className={selectedTutorial === 'documents' ? 'active' : ''}
          onClick={() => setSelectedTutorial('documents')}
        >
          Documents Tutorial
        </button>
      </div>
      <div className="tutorial-content">
        {renderTutorialContent()}
      </div>
    </div>
  );
}

export default Tutorial;