// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = (User) => {
    return {
        // @desc Register a new user
        // @route POST /api/auth/register
        // @access Public
        registerUser: async (req, res) => {
            try {
                const { name, email, password, profileImageUrl } = req.body;

                const userExists = await User.findByEmail(email);
                if (userExists) {
                    return res.status(400).json({ message: "User already exists" });
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const newUser = await User.create(email, {
                    name,
                    email,
                    password: hashedPassword,
                    profileImageUrl,
                });

                res.status(201).json({
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    profileImageUrl: newUser.profileImageUrl,
                    token: generateToken(newUser.id),
                });
            } catch (error) {
                res.status(500).json({ message: "Server error", error: error.message });
            }
        },

        // @desc Login user
        // @route POST /api/auth/login
        // @access Public
        loginUser: async (req, res) => {
            try {
                const { email, password } = req.body;
                const user = await User.findByEmail(email);
                if (!user || !(await bcrypt.compare(password, user.password))) {
                    return res.status(400).json({ message: "Invalid email or password" });
                }

                res.json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    profileImageUrl: user.profileImageUrl,
                    token: generateToken(user.id),
                });
            } catch (error) {
                res.status(500).json({ message: "Server error", error: error.message });
            }
        },

        // @desc Get user profile
        // @route GET /api/auth/profile
        // @access Private (Requires JWT)
        getUserProfile: async (req, res) => {
            try {
                const user = await User.findById(req.user.id);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                const { password, ...userData } = user;
                res.json(userData);
            } catch (error) {
                res.status(500).json({ message: "Server error", error: error.message });
            }
        }
    };
};
