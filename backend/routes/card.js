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

    newCard.save();
    res.status(200).json({
        message: "Success"
    });
});

// @route   GET cards/:page
// @desc    Get A Specific Number Of Cards
// @access  Private
router.get("/:page", (req, res, next) => {
    var perPage = 10;
    var page = req.params.page || 1;
    console.log(page);
    CardModel.find({})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .then(cards => {
            console.log(cards);
            const data = cards;
            res.status(200).json(data);
        });
});

// @route   GET cards by title
// @desc    Get All Cards with this title
// @access  Public
router.get("/search/:title", (req, res, next) => {
    console.log("Usao sam get by title");
    const title = req.params.title;
    CardModel.find({ $text: { $search: title } })
        .then(doc => {
            console.log(doc.length);
            const len = doc.length;
            console.log("Duzina" + len);
            const data = doc;
            res.status(200).json(data);
        })
        .catch(err => console.log(err));
});

module.exports = router;