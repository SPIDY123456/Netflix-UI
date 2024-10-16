import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCgkKmC3tdkQhoQ2QlkKpzjGZp3Fo-LksM",
    authDomain: "react-netflix-clone-78ed1.firebaseapp.com",
    projectId: "react-netflix-clone-78ed1",
    storageBucket: "react-netflix-clone-78ed1.appspot.com",
    messagingSenderId: "739633889563",
    appId: "1:739633889563:web:a48d984c7e2a4883ac93be",
    measurementId: "G-2MD3974J3K"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);