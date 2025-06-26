const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({id:userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
};

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl } = req.body;

        //check if user already exists
        const userExists = await User.findByEmail({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists"});
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create new user
        const user = await User.create(email, {
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
        });

        //return user data with JWT
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user.id),
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// @desc Login user
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("1");
        const user = await User.findByEmail(email);
        console.log("2");
        if (!user || !(await bcrypt.compare(password, user.password))){
            console.log("3");
            return res.status(400).json({ message: "Invalid email or password"});
        }
        console.log("4");
        //Return user data with JWT
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user.id),
        });
        console.log("5");
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// @desc Get user profile
// @ GET /api/auth/profile
// @access Private (Requires JWT)
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password, ...userData } = user;
        res.json(userData);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { registerUser, loginUser, getUserProfile };