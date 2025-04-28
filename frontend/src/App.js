import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import SessionOverPage from './SessionOverPage';
import Header from "./components/Header"; 
import Home from "./components/Home"; 
import Tutorial from "./components/Tutorial";


function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const showHeader = location.pathname === "/components/Home" || location.pathname === "/components/Tutorial";

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/session-over" element={<SessionOverPage />} />
        <Route path="/components/Home" element={<Home />} /> 
        <Route path="/components/Tutorial" element={<Tutorial />} /> 
      </Routes>
    </>
  );
}


export default App;



