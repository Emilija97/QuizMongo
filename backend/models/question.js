const mongo = require("mongoose");

const question = mongo.Schema({
    id: String,
    question: String,
    answer1: String,
    answer2: String,
    answer3: String,
    answer4: String,
    correctAnswer: String
}, {
    collection: "question"
});

module.exports = mongo.model("Question", question, "question");