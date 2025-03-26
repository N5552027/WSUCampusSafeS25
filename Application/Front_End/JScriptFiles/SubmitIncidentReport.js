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

const submitReport = document.getElementById('sButton')
submitReport.addEventListener('click', (event)=>{
    event.preventDefault();
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        const reportData = {
            title: document.getElementById('title').value,
            type: document.getElementById('type').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            location: document.getElementById('location').value,
            description: document.getElementById('description').value,
            userid: loggedInUserId
        };
        
        const docRef = addDoc(collection(db, "Reports"), reportData)
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