import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD2rIQmcWPOum_oDuGjAAxq7iutfLBg42M",
    authDomain: "wooapp-4993c.firebaseapp.com",
    projectId: "wooapp-4993c",
    storageBucket: "wooapp-4993c.appspot.com",
    messagingSenderId: "776033508669",
    appId: "1:776033508669:web:87d35071ce80e1a393b954",
    measurementId: "G-DCE7TCP2KJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
