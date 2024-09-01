import mongoose from "mongoose";
import userModel from "./user.model";

const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    },
    option4: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    userID:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:userModel
    },
    status: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

export default mongoose.model("quiz", QuizSchema)