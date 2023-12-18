import express from 'express';
import { 
    getReviewLaterWords, 
    getKnewThisWords, 
    getNotCategorizedWords,
    markReviewLater,
    markKnewThisWord,
    getUserProgress,
    getWordsByUserSelection
} from '../controllers/userProgressController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware); // Apply the middleware to all routes in this router

router.get('/reviewlater', getReviewLaterWords);
router.get('/knewthis', getKnewThisWords);
router.get('/notcategorized', getNotCategorizedWords);


router.put('/markreviewlater/:wordId', markReviewLater);
router.put('/markknewthisword/:wordId', markKnewThisWord);


// Progress of the user
router.get('/progress/:userId', getUserProgress);


// Retreiving the words requested by the user
router.post('/words/:userId', getWordsByUserSelection);


export default router;
