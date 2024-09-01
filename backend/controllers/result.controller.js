import quizModel from "../models/quiz.model";
import resultModel from "../models/result.model";

export const createResults = async (req, res) => {
  try {
    const { userId, responses } = req.body;
    const existResult= await resultModel.findOne({userId})
    if(existResult){
        return res.status(200).json({
            data:existResult,
            message:"You have already submitted response , Thank you!"
        })
    }
    let score = 0;
    let correctResponses = [];
    // Ensure responses is not undefined or null
    if (!responses || typeof responses !== "object") {
      return res.status(400).json({ error: "Invalid responses format" });
    }

    // Convert the responses object into an array of entries if it's an object
    const responseEntries = Object.entries(responses);
    for (let [questionId, selectedAnswer] of responseEntries) {
      const question = await quizModel.findById(questionId);
      if (!question) continue;

      const isCorrect =
        question.answer.trim().toLowerCase() ===
        selectedAnswer.trim().toLowerCase();

      if (isCorrect) score++;

      correctResponses.push({
        questionId,
        selectedAnswer,
        isCorrect,
      });
    }

    const percentage = (score / responseEntries.length) * 100;

    const userResponse = new resultModel({
      userId,
      responses: correctResponses,
      score,
      percentage,
    });

    await userResponse.save();
    console.log(userResponse);
    if (userResponse) {
      return res.status(201).json({
        data: userResponse,
        message: "result created successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getResult = async (req, res) => {
  try {
    const userId = req.params.userId;
    const results = await resultModel
      .findOne({ userId: userId })
      .populate("userId")
      .populate('responses.questionId');
    if (results) {
      return res.status(200).json({
        data: results,
        message: "fetched successfully",
      });
    }

    return res.status(400).json({
      message: "something went wrong",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const deleteResult = async (req, res) => {
    try {
        const userId = req.params.userId;

        const result_delete = await resultModel.deleteOne({ userId})

        if (result_delete.acknowledged) {
            return res.status(200).json({
                data: result_delete,
                message: "Deleted Successfully"
            })
        }

        return res.status(400).json({
            message: "Bad Request"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}