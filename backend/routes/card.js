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

// @route   GET cards/createdby/:username
// @desc    Get All Cards
// @access  Public
router.get("/createdby/:username", (req, res, next) => {
    var username = req.params.username;
    console.log(username);
    console.log("Usao sam sa username-om");
    CardModel.find({ username: username })
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

// @route   GET cards by word
// @desc    Get All Cards which contain word
// @access  Public
router.get("/search/:word", (req, res, next) => {
    console.log("Usao sam get by title");
    const word = req.params.word;
    CardModel.find({ $text: { $search: word } })
        .then(doc => {
            console.log(doc.length);
            const len = doc.length;
            console.log("Duzina" + len);
            const data = doc;
            res.status(200).json(data);
        })
        .catch(err => console.log(err));
});

// @route   DELETE cards/:id
// @desc    Delete A Card
// @access  Public
router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    CardModel.deleteOne({ id: id })
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

// @route   PUT /cards/:id
// @desc    Update card
// @access  Public
router.put("/:id", (req, res, next) => {
    console.log("Usao sam u update za card");
    const id = req.params.id;
    const { title, field, username, date } = req.body;

    CardModel.findOneAndUpdate({ username, id }, { $set: req.body }, (err, result) => {
        if (err) return res.status(400).json({ msg: "Something went wrong, try again" });
        res.status(200).json(result);
    });
});

module.exports = router;