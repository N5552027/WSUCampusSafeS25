import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, sendSignInLinkToEmail } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js"

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
const auth = getAuth();
const db = getFirestore();
const main = document.querySelector(".main");

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, "Users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('userFName').innerText = userData.fName;
                    document.getElementById('userInfoFName').innerText = userData.fName;
                    document.getElementById('userEmail').innerText = userData.email;
                    document.getElementById('userVStatus').innerText = userData.vStatus;
                    document.getElementById('userUID').innerText = loggedInUserId;
                }
                else {
                    console.log("Error: Cannot find existing user document by user ID");
                }
            })
            .catch((error) => {
                console.log("Error: Cannot fetch document,", error);
            })
    }
    else {
        console.log("Error: User ID not found");
        window.location.href = 'login.html';
    }
})

// Sidebar
document.addEventListener('DOMContentLoaded', () => {
    const incidentsButton = document.getElementById('incidentsButton');
    incidentsButton.addEventListener('click', () => {
        main.classList.remove('myIncidents');
        main.classList.remove('userInformation');
        main.classList.remove('contactUs');
    })
    const myIncidentsButton = document.getElementById('myIncidentsButton');
    myIncidentsButton.addEventListener('click', () => {
        main.classList.add('myIncidents');
        main.classList.remove('userInformation');
        main.classList.remove('contactUs');
    })
    const userInformationButton = document.getElementById('userInformationButton');
    userInformationButton.addEventListener('click', () => {
        main.classList.add('userInformation');
        main.classList.remove('myIncidents');
        main.classList.remove('contactUs');
    })
    const contactUsButton = document.getElementById('contactUsButton');
    contactUsButton.addEventListener('click', () => {
        main.classList.add('contactUs');
        main.classList.remove('myIncidents');
        main.classList.remove('userInformation');
    })
});

const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    localStorage.removeItem('csvData');
    localStorage.removeItem('myCsvData');
    signOut(auth)
        .then(() => {
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error('Error: Cannot sign out');
        })
})

// Loading Page
window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        setTimeout(function(){
            window.location.reload();
        }, 1000)        
    };
}