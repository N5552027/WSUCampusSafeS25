import {initializeApp} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {getFirestore, addDoc, collection} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js"
import {getAuth} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyDx5UmD-X7Cv3BN0bRDvFKV2tH7oh6hFYM",
    authDomain: "campussafe-4fcb7.firebaseapp.com",
    projectId: "campussafe-4fcb7",
    storageBucket: "campussafe-4fcb7.firebasestorage.app",
    messagingSenderId: "957410900492",
    appId: "1:957410900492:web:6c9a5a3e972aa877c18c29",
    measurementId: "G-D9TKYYPL71"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const submitFeedback = document.getElementById('fButton')
submitFeedback.addEventListener('click', (event)=>{
    event.preventDefault();
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        const feedbackData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            feedback: document.getElementById('feedback').value,
            userid: loggedInUserId
        };
        
        const docRef = addDoc(collection(db, "Feedback Forms"), feedbackData)
        .then(()=>{
            window.location.href='HomePage.html';                
        })
        .catch((error)=>{
            console.log("Error: Cannot locate document location,", error);
        })
    }
    else{
        console.log("Error: User not found");
    }
})