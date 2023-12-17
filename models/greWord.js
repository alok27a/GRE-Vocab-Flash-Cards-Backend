import mongoose from 'mongoose';

const greWordSchema = new mongoose.Schema({
    word: String,
    category: String,
    meaning: String,
    synonyms: String
});

const GreWord = mongoose.model('GreWord', greWordSchema);

export default GreWord;
