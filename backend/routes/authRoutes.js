// routes/authRoutes.js
const express = require("express");
const upload = require("../middlewares/uploadMiddleware");
const { protect } = require("../middlewares/authMiddleware");

// Export a function that accepts dependencies (userRepo)
module.exports = (userRepo) => {
    const router = express.Router();

    // Inject userRepo into the controller
    const {
        registerUser,
        loginUser,
        getUserProfile
    } = require("../controllers/authController")(userRepo);

    router.post("/register", registerUser);
    router.post("/login", loginUser);
    router.get("/profile", protect, getUserProfile);

    router.post("/upload-image", upload.single("image"), (req, res) => {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        res.status(200).json({ imageUrl });
    });

    return router;
};
