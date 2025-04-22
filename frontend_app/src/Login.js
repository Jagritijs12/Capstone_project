import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import app from "./firebase-config";
import React, { useState } from "react";

const Login = ({ setIsLoggedIn }) => {
    const auth = getAuth(app);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsLoggedIn(true);
            console.log("User logged in successfully!");
        } catch (error) {
            console.error("Login Error:", error.message);
            alert("Error logging in. Please try again.");
        }
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
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleGoogleSignIn}>Google</button>
            <button onClick={handleGithubSignIn}>Github</button>
        </div>
    );
};

export default Login;