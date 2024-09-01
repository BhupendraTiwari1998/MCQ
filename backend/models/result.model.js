import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  responses: [
    {
      questionId: {type:mongoose.Schema.Types.ObjectId, ref:"quiz"},
      selectedAnswer: String,
      isCorrect: Boolean,
    },
  ],
  score: Number,
  percentage: Number,
});

export default mongoose.model("result", ResultSchema);
