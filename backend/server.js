require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');

const admin = require('firebase-admin');
const fbPrivateKey = require('resumeBuilderPrivateKey.json');

//Initialize firebase app
admin.initializeApp({
    credential: admin.credential.cert(fbPrivateKey),
})

//Initialize firestore database
const db = admin.firestore();

const app = express();

//Middleware to handle CORS

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"], 
    })
);

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

//Serve uploads folder
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"), {
        setHeaders: (res, path) => {
            res.set("Access-Control-Allow-Origin", process.env.CLIENT_URL || "*");
        },
    })
);

module.exports = app;