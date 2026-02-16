import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyATZriXGMzrYCD3HNYQDBuzEZUE3IVfKzQ",
  authDomain: "netflix-clone-e6536.firebaseapp.com",
  projectId: "netflix-clone-e6536",
  storageBucket: "netflix-clone-e6536.firebasestorage.app",
  messagingSenderId: "958227641823",
  appId: "1:958227641823:web:b21090755bb6470543406a",
  measurementId: "G-PVZK6Q7P8B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
   const user = res.user;
   await addDoc(collection(db, "user"), {
    uid: user.uid,
    name,
    authProvider: "local",
    email,
   })
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
}

const login =async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log(res.user);
    }catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));

    }   
}

const logout = () => {
    signOut(auth);
}

export {auth, db, signup, login, logout}   