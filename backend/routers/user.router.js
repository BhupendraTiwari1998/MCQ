import express from 'express';
import { SignIN, SignUp } from '../controllers/user.controller';

const router = express.Router();

router.post("/signup", SignUp)
router.post("/signin", SignIN)

export default router