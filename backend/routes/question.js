const express = require("express");
const router = express.Router();

// Question Model
const QuestionModel = require("../models/question");

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get("/", (req, res, next) => {
    console.log("Usao sam");
    QuestionModel.find()
        .then(doc => {
            const data = doc;
            res.status(200).json(data);
        })
        .catch(err => console.log(err));
});

// @route   POST questions
// @desc    Create A Question
// @access  Public
router.post("/", (req, res, next) => {
    console.log("Username ");
    const newQuestion = new QuestionModel({
        question: req.body.question,
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer3: req.body.answer3,
        answer4: req.body.answer4,
        correctAnswer: req.body.correctAnswer
    });

    newQuestion.save();
    res.status(200).json({
        message: "Success"
    });
});

// // @route   DELETE api/items/:id
// // @desc    Delete A Item
// // @access  Private
// router.delete("/:id", auth, (req, res) => {
//     Item.findById(req.params.id)
//         .then(item => item.remove().then(() => res.json({ success: true })))
//         .catch(err => res.status(404).json({ success: false }));
// });

module.exports = router;