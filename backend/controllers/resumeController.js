const fs = require('node:fs');
const path = require('node:path');

module.exports = (resumeRepo) => {
  // @desc Create a new resume
  // @route POST /api/resumes
  // @access Private
  const createResume = async (req, res) => {
    try {
      const { title } = req.body;

      const defaultResumeData = {
        userId: req.user.id,
        title,
        profileInfo: {
          profileImg: null,
          profilePreviewUrl: "",
          fullName: "",
          designation: "",
          summary: "",
        },
        contactInfo: {
          email: "",
          phone: "",
          location: "",
          linkedin: "",
          github: "",
          website: "",
        },
        workExperience: [
          {
            company: "",
            role: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ],
        education: [
          {
            degree: "",
            institution: "",
            startDate: "",
            endDate: "",
          },
        ],
        skills: [
          {
            name: "",
            progress: 0,
          },
        ],
        projects: [
          {
            title: "",
            description: "",
            github: "",
            liveDemo: "",
          },
        ],
        certifications: [
          {
            title: "",
            issuer: "",
            year: "",
          },
        ],
        languages: [
          {
            name: "",
            progress: 0,
          },
        ],
        interests: [""],
      };

      const newResume = await resumeRepo.create(defaultResumeData);

      res.status(201).json(newResume);
    } catch (error) {
      res.status(500).json({ message: "Failed to create resume", error: error.message });
    }
  };

  // @desc Get all resumes for logged-in user
  // @route GET /api/resumes
  // @access Private
  const getUserResumes = async (req, res) => {
    try {
      const resumes = await resumeRepo.findByUserId(req.user.id);
      res.json(resumes);
    } catch (error) {
      res.status(500).json({ message: "Failed to get resumes", error: error.message });
    }
  };

  // @desc Get single resume by ID
  // @route GET /api/resumes/:id
  // @access Private
  const getResumeById = async (req, res) => {
    try {
      const resume = await resumeRepo.findById(req.params.id, req.user.id);
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      res.json(resume);
    } catch (error) {
      res.status(500).json({ message: "Failed to get resume", error: error.message });
    }
  };

  // @desc Update a resume
  // @route PUT /api/resumes/:id
  // @access Private
  const updateResume = async (req, res) => {
    try {
      const savedResume = await resumeRepo.update(req.params.id, req.user.id, req.body);
      res.json(savedResume);
    } catch (error) {
      res.status(500).json({ message: "Failed to update resume", error: error.message });
    }
  };

  // @desc Delete a resume
  // @route DELETE /api/resumes/:id
  // @access Private
  const deleteResume = async (req, res) => {
    try {
      const resume = await resumeRepo.findById(req.params.id, req.user.id);

      if (!resume) {
        return res.status(404).json({ message: "Resume not found or unauthorized" });
      }

      const uploadsFolder = path.join(__dirname, '..', 'uploads');

      if (resume.thumbnailLink) {
        const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
        if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
      }

      if (resume.profileInfo?.profilePreviewUrl) {
        const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
        if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
      }

      await resumeRepo.delete(req.params.id, req.user.id);
      res.json({ message: "Resume deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete resume", error: error.message });
    }
  };

  return {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume,
  };
};
