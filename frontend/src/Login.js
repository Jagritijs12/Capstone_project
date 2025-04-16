import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import app from "./firebase-config";

function Login() {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log(result.user);
            alert(`Welcome ${result.user.displayName}. Start with your analysis`);
        }catch(error){
            console.error(error);
            alert("Error signing in with Google. Please try again.");
        }
    };
    const handleGithubSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            console.log(result.user);
            alert(`Welcome ${result.user.displayName}. Start with your analysis`);
        }catch(error){
            console.error(error);
            alert("Error signing in with Github. Please try again.");
        }
    };

    return (
        <div>
            <h1>Login to start your analysis</h1>
            <button onClick={handleGoogleSignIn}>Google</button>
            <button onClick={handleGithubSignIn}>Github</button>
        </div>
    );
}

export default Login;