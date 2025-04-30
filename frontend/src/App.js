//App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import SessionOverPage from './components/SessionOverPage';
import Tutorial from "./components/Tutorial";
import Home from "./components/Home";
import Header from "./components/Header";
import Contact from "./components/Contact";
import AnalyzeLogs from "./components/AnalyzeLogs";        // <-- NEW
//import AnalyzeImages from "./components/AnalyzeImages";    // <-- NEW
//import AnalyzeDocuments from "./components/AnalyzeDocuments"; // <-- NEW

// New model components
//import ImagePredictor from "./components/ImagePredictor";
//import DocPredictor from "./components/DocPredictor";
//import LogPredictor from "./components/LogPredictor";

function App() {
  return (
    <Router>
      <Header />
      <div className="app">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/session-over' element={<SessionOverPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tutorial" element={<Tutorial />} />
          {/* New routes */}
          <Route path="/analyze/logs" element={<LogPredictor />} /> {/* New Route */}
          <Route path="/analyze/images" element={<ImagePredictor />} /> {/* New Route */}
          <Route path="/analyze/documents" element={<DocPredictor />} /> {/* New Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;