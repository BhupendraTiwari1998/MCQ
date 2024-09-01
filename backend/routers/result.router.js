import express from 'express';
import { createResults, deleteResult, getResult } from '../controllers/result.controller';
const router = express.Router();

router.post("/create-result", createResults)
router.get("/get-results/:userId", getResult)
router.delete("/delete-results/:userId", deleteResult)
export default router