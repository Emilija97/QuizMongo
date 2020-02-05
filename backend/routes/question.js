const express = require("express");
const router = express.Router();

// Question Model
const QuestionModel = require("../models/question");

// @route   GET questions
// @desc    Get All Questions
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
        id: req.body.id,
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

// @route   DELETE questions/:id
// @desc    Delete A Question
// @access  Public
router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    QuestionModel.deleteOne({ id: id })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Deleted!"
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
});

// @route   GET questions/:page
// @desc    Get A Specific Number Of Question
// @access  Public
router.get("/:page", (req, res, next) => {
    var perPage = 3;
    var page = req.params.page || 1;
    console.log(page);
    QuestionModel.find({})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .then(questions => {
            console.log(questions);
            const data = questions;
            res.status(200).json(data);
        });
});

module.exports = router;