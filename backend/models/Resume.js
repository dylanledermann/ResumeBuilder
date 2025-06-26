/*const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true,
        },
        title: {
            type: String,
            required: true,
        },
        thumbnailLink: {
            type: String,
        },
        template: {
            theme: String,
            colorPalette: [String]
        },
        profileInfo: {
            profilePreviewUrl: String,
            fullName: String,
            designation: String,
            summary: String,
        },
        contactInfo: {
            email: String,
            phone: String,
            location: String,
            linkedin: String,
            github: String,
            website: String,
        },
        workExperience: [
            {
                company: String,
                role: String,
                startDate: String,
                endDate: String,
                description: String,
            },
        ],
        education: [
            {
                degree: String,
                institution: String,
                startDate: String,
                endDate: String,
            },
        ],
        skills: [
            {
                name: String,
                progress: Number,
            },
        ],
        projects: [
            {
                title: String,
                description: String,
                github: String,
                liveDemo: String
            },
        ],
        certifications: [
            {
                title: String,
                issuer: String,
                year: String,
            },
        ],
        languages: [
            {
                name: String,
                progress: Number,
            },
        ],
        interests: [String],
    },
    {timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"},}
);

module.exports = mongoose.model("Resume", ResumeSchema);*/

class ResumeModel {
    constructor(db, FieldValue) {
        if (!db) throw new Error('Firestore db instance is required');
        this.collection = db.collection('resumes');
        this.FieldValue = FieldValue;
    }

    async create(resumeData){
        const dataWithTimestamps = {
            ...resumeData,
            updatedAt: this.FieldValue.serverTimestamp(),
            createdAt: this.FieldValue.serverTimestamp(),
        }

        try {
            const ref = await this.collection.add(dataWithTimestamps);
            const doc = await ref.get();
            return { id: ref.id, ...doc.data() };
        } catch(error) {
            throw new Error('Error creating resume: ' + error.message);
        }
    }

    async findByUserId(userId) {
        try {
            const snapshot = await this.collection.where('userId', '==', userId).get();
            if(snapshot.empty) throw new Error('Resume not found');
            const resumes = [];
            snapshot.forEach((doc) => {
                resumes.push({ id: doc.id, ...doc.data() });
            })
            return resumes;
        } catch(error) {
            throw new Error('Error fetching resumes: ' + error.message);
        }
    }

    async findById(resumeId, userId) {
        try{
            const doc = await this.collection.doc(resumeId).get();
            if (!doc.exists) throw new Error('Resume not found');
            const data = doc.data();
            if(data.userId != userId) throw new Error('Unauthorized');
            return { id: doc.id, ...doc.data() };
        } catch(error) {
            throw new Error('Error fetching resume: ' + error.message);
        }
    }

    async update(resumeId, userId, resumeData) {
        const dataWithTimestamp = {
            ...resumeData,
            updatedAt: this.FieldValue.serverTimestamp(),
        };
        
        try {
            const docRef = this.collection.doc(resumeId)
            const doc = await docRef.get();
            if (!doc.exists) throw new Error('Resume not found');
            if(doc.data().userId != userId) throw new Error('Unauthorized');
            await docRef.update(dataWithTimestamp);
            const updatedDoc = await docRef.get();
            return { id: updatedDoc.id, ...updatedDoc.data() };
        } catch(error) {
            throw new Error('Error updating resume: ' + error.message);
        }
    }

    async delete(resumeId, userId) {
        try {
            const docRef = this.collection.doc(resumeId);
            const doc = await docRef.get();
            if(!doc.exists) throw new Error('Resume not found');
            if(doc.data().userId != userId) throw new Error('Unauthorized');
            await docRef.delete();
            return true;
        } catch(error) {
            throw new Error('Error deleting resume: ' + error.message);
        }
    }
}

module.exports = ResumeModel;