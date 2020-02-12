const express = require("express");
const router = express.Router();
var mongoose = require("mongoose");

// Card Model
const CardModel = require("../models/card");

// @route   GET cards
// @desc    Get All Cards
// @access  Public
router.get("/", (req, res, next) => {
    console.log("Usao sam");
    CardModel.find()
        .then(doc => {
            const data = doc;
            res.status(200).json(data);
        })
        .catch(err => console.log(err));
});

// @route   POST cards
// @desc    Create A Card
// @access  Public
router.post("/", (req, res, next) => {
    console.log("Post card ");
    const newCard = new CardModel({
        id: req.body.id,
        date: req.body.date,
        title: req.body.title,
        field: req.body.field,
        username: req.body.username
    });

    newQuestion.save();
    res.status(200).json({
        message: "Success"
    });
});

module.exports = router;