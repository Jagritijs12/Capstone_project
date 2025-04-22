import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCp_gxCi_RgdVPiU9-bcq-m_PAbvXcdfFY",
    authDomain: "capstone-project-1dbd2.firebaseapp.com",
    projectId: "capstone-project-1dbd2",
    storageBucket: "capstone-project-1dbd2.firebasestorage.app",
    messagingSenderId: "142702773595",
    appId: "1:142702773595:web:9382f4ba52490b0608c67e",
    measurementId: "G-F14S55FGVM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;