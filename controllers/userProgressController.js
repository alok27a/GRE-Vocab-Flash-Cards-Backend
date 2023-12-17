import UserProgress from '../models/userProgress.js';

export const markReviewLater = async (req, res) => {
    try {
        const userId = req.userId; // Get the user ID from the request
        const { wordId } = req.params;
        const updatedProgress = await UserProgress.findOneAndUpdate(
            { userId, wordId },
            { reviewLater: true, knewThisWord: false },
            { new: true, upsert: true }
        );
        res.json({ success: true, message: "Marked as review later", data: updatedProgress });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const markKnewThisWord = async (req, res) => {
    try {
        const userId = req.userId;
        const { wordId } = req.params;
        const updatedProgress = await UserProgress.findOneAndUpdate(
            { userId, wordId },
            { reviewLater: false, knewThisWord: true },
            { new: true, upsert: true }
        );
        res.json({ success: true, message: "Marked as knew this word", data: updatedProgress });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getReviewLaterWords = async (req, res) => {
    try {
        const userId = req.userId;
        const userProgress = await UserProgress.find({ userId, reviewLater: true }).populate('wordId');
        const words = userProgress.map(up => up.wordId);
        res.json({ success: true, data: words });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getKnewThisWords = async (req, res) => {
    try {
        const userId = req.userId;
        const userProgress = await UserProgress.find({ userId, knewThisWord: true }).populate('wordId');
        const words = userProgress.map(up => up.wordId);
        res.json({ success: true, data: words });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getNotCategorizedWords = async (req, res) => {
    try {
        const userId = req.userId;
        const userProgress = await UserProgress.find({
            userId,
            reviewLater: false,
            knewThisWord: false
        }).populate('wordId');
        const words = userProgress.map(up => up.wordId);
        res.json({ success: true, data: words });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};




export default { markReviewLater, markKnewThisWord, getReviewLaterWords, getKnewThisWords, getNotCategorizedWords}