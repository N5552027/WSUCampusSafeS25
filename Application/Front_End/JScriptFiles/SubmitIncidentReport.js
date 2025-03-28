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
            Campus_Region: document.getElementById('Campus_Region').value,
            Building: document.getElementById('Building').value,
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


const regions = {
    "Hillside": [
        "Abelson Hall", "Avery Hall", "Bryan Hall", "Community/Duncan Dunn", "Eastlick Hall",
        "Goertzen Hall", "Heald Hall", "Honors Residence Hall", "Jackson Hall", "McCroskey Residence Hall",
        "Morill Hall", "Murrow Hall", "Stevens Hall", "Wilmer Davis"
    ],
    "Southside": [
        "Cleveland Hall", "Fulmer Hall", "Gannon-Goldsworthy Residece Hall", "McEachern Residence Hall",
        "Nieill Hall", "Olympia Student Housing", "Orton Hall", "Owen Science Library", "Rogers Hall",
        "Shock Physics Building", "Southside Cafe/Market", "SPARK building", "Stephenson Residence Complex",
        "Stimson Hall", "Troy Hall", "Waller Hall", "Washington Building", "Webster Hall"
    ],
    "Central_Campus": [
        "Bohler Gym", "Center for Undergraduate Education", "Chinook Student Center", "Compton Union Building",
        "Fine Arts Building and Musuem", "French Administration Building", "Holland and Terrel Libraries",
        "Hollingberry Fieldhouse", "Information Technology building", "Kimbrough Music Building", "Martin Stadium",
        "Mooberry Track", "Physical Education Building", "Smith Gym", "Todd Hall", "Van Doren Hall"
    ],
    "Northside": [
        "Beasly Colliseum", "Einsteins Bagels and Northside Market", "Global Scholars Residence Hall",
        "Northside Cafe", "Northside Residence Hall", "Regents Residence Hall", "Scott-Coman Residence Hall",
        "Streit Perham Residence Hall"
    ],
    "Engineering_Buildings": [
        "Albrook Hydraulics Laboratory", "Carpenter Hall", "College Avenue Steam Plant", "Daggy Hall", "Dana Hall",
        "Electrical Mechanical Engineering Building", "Engineering Laboratory Building", "Engineering Teaching Research Lab",
        "Sloan Hall", "Thermal Fluids Research Building",
    ],
    "Other": [
        "Other"
    ]
};

// Get the select elements
const locationSelect = document.getElementById("Building");
const campusSelection = document.getElementById("Campus_Region");

// Function to update the location options based on selected region
function updateLocationOptions(region) {
    // Clear current options
    locationSelect.innerHTML = "";

    // Add the new options based on the selected region
    const buildings = regions[region];

    buildings.forEach(building => {
        const option = document.createElement("option");
        option.value = building;
        option.textContent = building;
        locationSelect.appendChild(option);
    });
}

// Listen for the change event on the campus selection dropdown
campusSelection.addEventListener("change", function() {
    const selectedRegion = campusSelection.value;
    updateLocationOptions(selectedRegion);  // Update location options based on the selected campus
});

// Initially load the location options for the first campus selection
updateLocationOptions(campusSelection.value);
