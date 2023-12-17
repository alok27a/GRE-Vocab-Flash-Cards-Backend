import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model
    },
    wordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GreWord' // Reference to the GreWord model
    },
    reviewLater: {
        type: Boolean,
        default: false
    },
    knewThisWord: {
        type: Boolean,
        default: false
    }
});

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

export default UserProgress;
