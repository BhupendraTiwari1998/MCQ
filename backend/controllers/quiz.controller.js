import quizModel from "../models/quiz.model"

export const getQuiz = async (req, res) => {
    try {
        const getquiz = await quizModel.find().populate("userID")
        // console.log(getPost)
        if (getquiz) {
            return res.status(200).json({
                data: getquiz,
                message: "Fetched"
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

export const addQuiz = (req, res) => {
    try {
        const { question, option1, option2, option3, option4, answer, topic, userID } = req.body;

        const quizadd = new quizModel({
            question: question,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4,
            answer: answer,
            topic: topic,
            userID: userID
        })
        quizadd.save()

        if (quizadd) {
            return res.status(200).json({
                data: quizadd,
                message: "Post Created"
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

export const getSingle = async (req, res) => {
    try {
        const singleID = req.params.single_id;

        const single = await quizModel.findOne({ _id: singleID })
        if (single) {
            return res.status(200).json({
                data: single,
                message: "fetched"
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

export const deleteQuiz = async (req, res) => {
    try {
        const deleteID = req.params.delete_id;

        const quiz_delete = await quizModel.deleteOne({ _id: deleteID })

        if (quiz_delete.acknowledged) {
            return res.status(200).json({
                data: quiz_delete,
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

export const updateQuiz = async (req, res) => {
    try {
        const updateID = req.params.update_id;

        const { question, option1, option2, option3, option4, answer, topic, userID } = req.body;

        const quiz_update = await quizModel.updateOne({ _id: updateID }, {
            $set: {
                question: question,
                option1: option1,
                option2: option2,
                option3: option3,
                option4: option4,
                answer: answer,
                topic: topic,
                userID: userID
            }
        })

        if (quiz_update.acknowledged) {
            return res.status(200).json({
                data: quiz_update,
                message: "Updated Successfully"
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