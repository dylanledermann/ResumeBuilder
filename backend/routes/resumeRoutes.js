const express = require('express');
const {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume,
} = require('../controllers/resumeController');
const { protect } = require('../middlewares/authMiddleware');
const { uploadResumeImages } = require('../controllers/uploadImages');

const router = express.Router();

router.post("/", protect, createResume); //Create resume
router.get("/", protect, getUserResumes); //Get resumes
router.get("/:id", protect, getResumeById); //Get resume by id
router.put("/:id", protect, updateResume); //Update resume
router.put("/:id/upload-images", protect, uploadResumeImages); //Upload resume images

router.delete("/:id", protect, deleteResume); //Delete resume

module.exports = router;