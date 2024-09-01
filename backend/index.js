import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv"; 
dotenv.config()

import userRouter from './routers/user.router'
import quizRouter from './routers/quiz.router'
import resultRouter from "./routers/result.router"

const app = express();
app.use(express.json())
app.use(cors());

const port = 3002;

mongoose.connect('mongodb://localhost:27017/MCQ_App')
    .then(() => console.log('Connected!'));

app.listen(port, () => {
    console.log(`App listening on port${port}`)
})

app.use(userRouter)
app.use(quizRouter)
app.use(resultRouter)
