require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const admin = require('firebase-admin');
const fbPrivateKey = require('./resumeBuilderPrivateKey.json');

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
const FieldValue = admin.firestore.FieldValue;
//User route
const UserModel = require('./models/User');
const userRepo = new UserModel(db, FieldValue);

const authRoutes = require('./routes/authRoutes')(userRepo);
app.use("/api/auth", authRoutes);
//Resume route
const ResumeModel = require('./models/Resume');
const resumeRepo = new ResumeModel(db, FieldValue);

const resumeRoutes = require('./routes/resumeRoutes')(resumeRepo);
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

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

module.exports = app;