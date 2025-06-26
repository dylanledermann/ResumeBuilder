/*const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {type: String, required:true},
        email: {type: String, required:true, unique:true},
        password: {type: String, required:true},
        profileImageUrl: {type: String, default:null},
    },
    {timestamps:true}
);

module.exports = mongoose.model("User", UserSchema);*/

const admin = require('firebase-admin');
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

class UserModel {
    constructor() {
        this.collection = db.collection('users')
    }

    async create(userId, userData) {
        const dataWithTimestamps = {
            ...userData,
            updatedAt: FieldValue.serverTimestamp(),
            createdAt: FieldValue.serverTimestamp(),
        };

        try {
            await this.collection.doc(userId).set(dataWithTimestamps);
            const doc = await this.collection.doc(userId).get()
            return { id: userId, ...doc.data };
        } catch(error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    async update(userId, userData) {
        const data = {
            ...userData,
            updatedAt: FieldValue.serverTimestamp(),
        };
        
        try {
            await this.collection.doc(userId).update(data);
            const doc = await this.collection.doc(userId).get();
            return { id: userId, ...doc.data };
        } catch(error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }

    async findById(userId) {
        const doc = await this.collection.doc(userId).get();
        if (!doc.exists) return null;
        return { id: doc.id, ...doc.data() };
    }

    async findByEmail(email) {
        const snapshot = await this.collection.where('email', '==', email).limit(1).get();
        if(snapshot.empty) return null;
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() };
    }
}

module.exports = new UserModel();