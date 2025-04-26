import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import app from "../../frontend/src/firebase-config";
import React, { useState } from "react";

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }
        setIsLoading(true); // Set loading state
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsLoggedIn(true);
            console.log("User logged in successfully!");
        } catch (error) {
            console.error("Login Error:", error.message);
            alert("Error logging in. Please try again.");
        }
        setIsLoading(false); // Reset loading state
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log(result.user);
            alert(`Welcome ${result.user.displayName}. Start with your analysis`);
        } catch (error) {
            console.error("Google Sign-In Error:", error.message);
            alert("Error signing in with Google. Please try again.");
        }
    };

    const handleGithubSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            console.log(result.user);
            alert(`Welcome ${result.user.displayName}. Start with your analysis`);
        } catch (error) {
            console.error("Github Sign-In Error:", error.message);
            alert("Error signing in with Github. Please try again.");
        }
    };

    return (
        <div>
            <h1>Login to start your analysis</h1>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin} disabled={isLoading}>
                {isLoading ? "Logging In..." : "Login"}
            </button>
            <button onClick={handleGoogleSignIn}>Google</button>
            <button onClick={handleGithubSignIn}>Github</button>
        </div>
    );
};

export default Login;
