import User from '../models/userSchema.js';

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
        const newUser = new User(req.body);

        // Save the new user and store the result in a variable
        const savedUser = await newUser.save();

        // Return the saved user data in the response
        res.status(201).json({ success: true, message: "Account Created Successfully", data: savedUser });
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
