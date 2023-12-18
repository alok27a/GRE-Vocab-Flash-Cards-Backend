import UserProgress from '../models/userProgress.js';
import GreWord from '../models/greWord.js';

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


export const getUserProgress = async (req, res) => {
    try {
        const { userId } = req.params;
        const { category } = req.body; // Selected category from the request body

        // Fetch all words in the selected category
        const allWordsInCategory = await GreWord.find({ category }).select('_id');
        const allWordIds = allWordsInCategory.map(word => word._id);

        // Fetch user's progress for these words
        const userProgress = await UserProgress.find({
            userId,
            wordId: { $in: allWordIds }
        });

        // Calculate progress
        const totalWords = allWordsInCategory.length;
        const knownWords = userProgress.filter(word => word.knewThisWord).length;
        const reviewWords = userProgress.filter(word => word.reviewLater).length;

        res.json({
            success: true,
            data: {
                totalWords,
                knownWords,
                reviewWords
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};



export const getWordsByUserSelection = async (req, res) => {
    try {
        const { userId } = req.params;
        const { category, option } = req.body;

        // Adjust the query based on the selected category
        let query = category === 'all' ? {} : { category }; // If 'all', fetch all categories
        let wordsInCategory = await GreWord.find(query);

        let userProgress;
        if (option === 'reviewLater') {
            userProgress = await UserProgress.find({ userId, reviewLater: true });
        } else if (option === 'knewThisWord') {
            userProgress = await UserProgress.find({ userId, knewThisWord: true });
        } else if (option === 'notMarked') {
            const userProgressWordIds = (await UserProgress.find({ userId })).map(progress => progress.wordId);

            // Filter for not marked words
            const notMarkedWords = wordsInCategory.filter(word =>
                !userProgressWordIds.some(userWordId => userWordId.equals(word._id))
            );
            res.json({ success: true, data: notMarkedWords });
            return;
        } else {
            userProgress = await UserProgress.find({ userId });
        }

        // Extract word IDs from the user progress
        const progressWordIds = userProgress.map(progress => progress.wordId.toString());

        // Filter the words based on the IDs obtained from user progress
        wordsInCategory = wordsInCategory.filter(word => {
            const wordIdStr = word._id.toString();
            return option === 'all' || progressWordIds.includes(wordIdStr);
        });

        res.json({ success: true, data: wordsInCategory });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};




export default { markReviewLater, markKnewThisWord, getReviewLaterWords, getKnewThisWords, getNotCategorizedWords, getWordsByUserSelection, getUserProgress }