// routes/resumeRoutes.js
const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { uploadResumeImages } = require('../controllers/uploadImages');

module.exports = (resumeRepo) => {

    const router = express.Router();

    const {
        createResume,
        getUserResumes,
        getResumeById,
        updateResume,
        deleteResume,
    } = require('../controllers/resumeController')(resumeRepo); 

    router.post("/", protect, createResume);
    router.get("/", protect, getUserResumes);
    router.get("/:id", protect, getResumeById);
    router.put("/:id", protect, updateResume);
    router.put("/:id/upload-images", protect, uploadResumeImages);
    router.delete("/:id", protect, deleteResume);

    return router;
};
