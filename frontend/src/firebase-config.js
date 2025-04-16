// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp_gxCi_RgdVPiU9-bcq-m_PAbvXcdfFY",
  authDomain: "capstone-project-1dbd2.firebaseapp.com",
  projectId: "capstone-project-1dbd2",
  storageBucket: "capstone-project-1dbd2.firebasestorage.app",
  messagingSenderId: "142702773595",
  appId: "1:142702773595:web:9382f4ba52490b0608c67e",
  measurementId: "G-F14S55FGVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
export { analytics };