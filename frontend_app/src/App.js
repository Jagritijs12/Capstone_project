import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import RegisterPage from "./RegisterPage";
import MainApp from "./MainApp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("Is Logged In:", isLoggedIn);

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route
        path="/register"
        element={isLoggedIn ? <Navigate to="/home" /> : <RegisterPage setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route path="/home" element={isLoggedIn ? <MainApp /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
