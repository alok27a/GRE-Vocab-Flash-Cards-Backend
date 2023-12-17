import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Assuming token is in the 'Authorization' header
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Attach the user ID to the request object
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: "Authentication failed" });
    }
};

export default authMiddleware;