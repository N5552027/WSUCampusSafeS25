// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyDx5UmD-X7Cv3BN0bRDvFKV2tH7oh6hFYM",
  authDomain: "campussafe-4fcb7.firebaseapp.com",
  projectId: "campussafe-4fcb7",
  storageBucket: "campussafe-4fcb7.firebasestorage.app",
  messagingSenderId: "957410900492",
  appId: "1:957410900492:web:6c9a5a3e972aa877c18c29",
  measurementId: "G-D9TKYYPL71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message,divID){
    var messageDiv = document.getElementById(divID);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
}

const register=document.getElementById('rButton')
register.addEventListener('click', (event)=>{
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        const user = userCredential.user;
        const userData = {
            email: email
        };
        showMessage('Successfully Created Account', 'registerMessage')
        const docRef = doc(db,"users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='login.html';
        })
        .catch((error)=>{
            console.error("Error Creating Account", error);
        })
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use')
            showMessage('Email address used by another account', 'registerMessage');
        else{
            showMessage('Error Creating User', 'registerMessage');
        }
    })
})

