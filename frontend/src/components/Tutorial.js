import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import './Tutorial.css';

function Tutorial() {
  const [selectedTutorial, setSelectedTutorial] = useState('logs');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchTutorialContent(selectedTutorial);
  }, [selectedTutorial]);

  const fetchTutorialContent = async (tutorialType) => {
    let filename = '';
    if (tutorialType === 'logs') filename = 'how-to-analyze-logs.md';
    else if (tutorialType === 'images') filename = 'how-to-analyze-images.md';
    else if (tutorialType === 'documents') filename = 'how-to-analyze-documents.md';

    try {
      const response = await fetch(`http://localhost:5000/tutorials/${filename}`);
      const text = await response.text();
      setContent(text);
    } catch (error) {
      console.error('Error loading tutorial:', error);
      setContent('# Error loading tutorial.');
    }
  }; // <-- THIS } is important to close fetchTutorialContent

  const renderTutorialContent = () => {
    return (
      <motion.div
        key={selectedTutorial}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </motion.div>
    );
  }; // <-- THIS } is important to close renderTutorialContent

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
