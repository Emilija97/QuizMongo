const express = require("express");
const router = express.Router();
var mongoose = require("mongoose");

// Result Model
const ResultModel = require("../models/result");

// @route   GET results
// @desc    Get All Results
// @access  Public
router.get("/", (req, res, next) => {
    console.log("Usao sam");
    ResultModel.find()
        .then(doc => {
            const data = doc;
            res.status(200).json(data);
        })
        .catch(err => console.log(err));
});

// @route   POST results
// @desc    Create An Result
// @access  Public
router.post("/", (req, res, next) => {
    console.log("Username " + req.body.username);
    const newResult = new ResultModel({
        id: req.body.id,
        date: req.body.date,
        score: req.body.score,
        username: req.body.username
    });

    newResult.save();
    res.status(200).json({
        message: "Success"
    });
});

// @route   DELETE results/:id
// @desc    Delete A Result
// @access  Public
router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    ResultModel.deleteOne({ id: id })
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

module.exports = router;