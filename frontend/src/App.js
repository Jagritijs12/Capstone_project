import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import SessionOverPage from './components/SessionOverPage';
import Tutorial from "./components/Tutorial";
import Home from "./components/Home";
//import Card from "./components/Card";
import Header from "./components/Header";
import Contact from './components/Contact';
import AnalyzeLogs from "./components/AnalyzeLogs";
import AnalyzeImages from "./components/AnalyzeImages";
import AnalyzeDocuments from "./components/AnalyzeDocuments";
// 

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/session-over' element={<SessionOverPage />} />

        <Route path='/home' element={
          <>
            <Header />
            <Home />
          </>
        } />
        <Route path='/tutorial' element={
          <>
            <Header />
            <Tutorial />
          </>
        } />
        <Route path='/analyze/logs' element={
          <>
            <Header />
            <AnalyzeLogs />
          </>
        } />
        <Route path='/analyze/images' element={
          <>
            <Header />
            <AnalyzeImages />
          </>
        } />
        <Route path='/analyze/documents' element={
          <>
            <Header />
            <AnalyzeDocuments />
          </>
        } />
        <Route path='/contact' element={
          <>
            <Header />
            <Contact />
          </>
        } />
      </Routes>
    </Router>
  );
}


export default App;



