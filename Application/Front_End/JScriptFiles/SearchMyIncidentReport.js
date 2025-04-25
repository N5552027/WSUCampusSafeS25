import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"
import { getFirestore, getDoc, doc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js"

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
const db = getFirestore(app);
var data = [['Title', 'Date', 'Time', 'Description']];

async function getReports() {
    try {
        const loggedInUserId = localStorage.getItem('loggedInUserId');
        const querySnapshot = await getDocs(collection(db, "Reports"));
        console.log("Loading My Reports");
        querySnapshot.forEach((doc) => {
            const currIncidentData = doc.data();
            if (currIncidentData.userid == loggedInUserId) {
                console.log(doc.id, " => ", doc.data());
                const tempArr = [currIncidentData.title, currIncidentData.date, currIncidentData.time, currIncidentData.description];
                data.push(tempArr);
                const csvContent = data.map(row => row.join(',')).join('\n');
                localStorage.setItem('myCsvData', csvContent);
            }
        });
    } catch (error) {
        console.error("Error: Reports collection not found", error);
    }
}

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, "Users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    getReports().then(() => loadCSV());
                } else {
                    console.log("Error: Cannot find existing user document by user ID");
                }
            })
            .catch((error) => {
                console.log("Error: Cannot fetch document,", error);
            });
    } else {
        console.log("Error: User ID not found");
        window.location.href = 'login.html';
    }
});

// Incident data
let incidents = [];
let currentSortMode = 'title';

// Sort Buttons
const titleButton = document.getElementById('myTitleButton');
const dateButton = document.getElementById('myDateButton');
const timeButton = document.getElementById('myTimeButton');
titleButton.addEventListener('click', (event)=>{
    setSortMode('title')
})
dateButton.addEventListener('click', (event)=>{
    setSortMode('date')
})
timeButton.addEventListener('click', (event)=>{
    setSortMode('time')
})


// Modal elements
let modal, modalTitle, modalDateTime, modalDescription, closeModalBtn;

document.addEventListener("DOMContentLoaded", () => {
    modal = document.getElementById("incidentModal");
    modalTitle = document.getElementById("modalTitle");
    modalDateTime = document.getElementById("modalDateTime");
    modalDescription = document.getElementById("modalDescription");
    closeModalBtn = document.getElementById("closeModal");

    closeModalBtn?.addEventListener("click", () => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
        }
    });

    document.getElementById("mySearch").addEventListener("input", filterAndDisplay);
});

async function loadCSV() {
    setSortMode("title");
    try {
        parseCSV(localStorage.getItem('myCsvData'));
    } catch (error) {
        console.error("Error loading CSV:", error);
    }
}

function parseCSV(csvText) {
    const rows = csvText.trim().split("\n");
    const headers = rows[0].split(",");

    incidents = rows.slice(1).map(row => {
        const values = row.split(",");
        return {
            title: values[0].trim(),
            date: values[1].trim(),
            time: values[2].trim(),
            description: values.slice(3).join(",").trim()
        };
    });

    incidents.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
    filterAndDisplay();
}

function displayResults(filteredIncidents) {
    const resultsList = document.getElementById("myResults");
    resultsList.innerHTML = "";

    if (filteredIncidents.length === 0) {
        resultsList.innerHTML = "<li class='text-gray-500 text-center'>No results found</li>";
        return;
    }

    filteredIncidents.forEach(incident => {
        const li = document.createElement("li");
        li.classList = "p-2 border-b cursor-pointer hover:bg-gray-100 transition";
        li.innerHTML = `<strong>${incident.title}</strong> - ${incident.date} ${incident.time}`;
        li.addEventListener("click", () => showIncidentDetails(incident));
        resultsList.appendChild(li);
    });
}

function showIncidentDetails(incident) {
    if (!modal) return;
    modalTitle.textContent = incident.title;
    modalDateTime.textContent = `${incident.date} at ${incident.time}`;
    modalDescription.textContent = incident.description;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function filterAndDisplay() {
    const query = document.getElementById("mySearch").value.toLowerCase();

    let filtered = incidents.filter(incident =>
        incident.title.toLowerCase().startsWith(query)  // <-- Prefix match only
    );

    sortResults(filtered, currentSortMode);
    displayResults(filtered);
}

function setSortMode(mode) {
    currentSortMode = mode;
    filterAndDisplay();
}

function sortResults(data, key) {
    if (key === "title") {
        data.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
    } else if (key === "date") {
        data.sort((a, b) => parseDate(a.date) - parseDate(b.date));
    } else if (key === "time") {
        data.sort((a, b) => parseTime(a.time) - parseTime(b.time));
    }
}

function parseDate(dateStr) {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
}

function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
}