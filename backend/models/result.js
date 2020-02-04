const mongo = require("mongoose");

const result = mongo.Schema({
    id: String,
    date: String,
    score: Number,
    username: String
}, {
    collection: "result"
});

module.exports = mongo.model("Result", result, "result");