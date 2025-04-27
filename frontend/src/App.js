import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import SessionOverPage from './SessionOverPage';
import Tutorial from "./components/Tutorial";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/session-over" element={<SessionOverPage />} />
        <Route path="/components/Tutorial" element={<Tutorial />} /> 
      </Routes>
    </Router>
  );
}

export default App;