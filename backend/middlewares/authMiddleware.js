const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try{
        let token = req.headers.authorization;

        if (token && token.startsWith("Bearer")) {
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);
            if(!user) return res.status(401).json({ message: "User not found" });
            if (user && user.password) delete user.password;
            req.user = user;
            next();
        }
        else {
            res.status(401).json({ message: "Not authorized, notoken" });
        }
    } catch(error){
        res.status(401).json({ message: "Token failed", error: error.message});
    }
};

module.exports = {protect};