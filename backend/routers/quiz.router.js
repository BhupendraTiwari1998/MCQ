import express from 'express';
import { addQuiz, deleteQuiz, getQuiz, getSingle, updateQuiz } from '../controllers/quiz.controller';

const router = express.Router();

router.get('/get-quiz',getQuiz)
router.post('/add-quiz',addQuiz)
router.get('/get-single/:single_id',getSingle)
router.delete('/delete-quiz/:delete_id',deleteQuiz)
router.put('/update-quiz/:update_id',updateQuiz)

export default router