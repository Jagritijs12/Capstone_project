import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import RegisterPage from "./RegisterPage";
import MainApp from "./MainApp";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    console.log("Is Logged In:", isLoggedIn);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/register" element={isLoggedIn ? <Navigate to="/home" /> : <RegisterPage setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/home" element={isLoggedIn ? <MainApp /> : <Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;