import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../frontend/src/firebase-config";
import { Navigate } from "react-router-dom"; // Added to redirect after registration

const RegisterPage = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Loading state for button
    const [error, setError] = useState(""); // State for error message

    const handleRegister = async () => {
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }
        setIsLoading(true); // Set loading state
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setIsLoggedIn(true);
            console.log("User registered successfully!");
            return <Navigate to="/home" />; // Redirect to home after registration
        } catch (error) {
            console.error("Registration Error:", error.message);
            setError(error.message); // Set error message
        }
        setIsLoading(false); // Reset loading state
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Error message display */}
            <input 
                type="email" 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleRegister} disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
            </button>
        </div>
    );
};

export default RegisterPage;
