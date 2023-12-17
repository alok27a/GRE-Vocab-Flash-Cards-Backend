import dotenv from 'dotenv'
dotenv.config()
import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({ success: true, data: users });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { googleId, email, name, imageUrl } = req.body; // Data sent from the frontend

        // Check if user already exists
        let user = await User.findOne({ googleId });

        if (!user) {
            // If user does not exist, create a new one
            user = new User({ googleId, email, name, imageUrl });
            await user.save();
        }

        // Generate a JWT token
        const jwtToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ success: true, message: "User processed successfully", data: user, token: jwtToken });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: "Account Updated Successfully", data: updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: "Account Deleted Successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export default { getUsers, getUser, createUser, updateUser, deleteUser };
