const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase-admin.json"); // Ensure this file is in your project
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL, // For Realtime Database
});

const db = admin.firestore(); // Firestore instance
const app = express();
app.use(cors()); // Allow requests from the frontend
app.use(express.json()); // Parse JSON request bodies

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
