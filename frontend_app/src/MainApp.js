import React from "react";
import HomePage from "./HomePage";
import { getAuth, signOut } from "firebase/auth";
import app from "../../frontend/src/firebase-config";

const MainApp = () => {
    const auth = getAuth(app);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User logged out successfully!");
            window.location.href = "/"; // Redirect to login page after logout
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };

    return (
        <div>
            <h1>Welcome to DetectiFAI</h1>
            <button onClick={handleLogout}>Logout</button>
            <HomePage />
        </div>
    );
};

export default MainApp;
