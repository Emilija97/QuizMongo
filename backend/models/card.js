const mongo = require("mongoose");

const card = mongo.Schema({
    id: String,
    date: String,
    title: String,
    field: String,
    username: String
}, {
    collection: "card"
});
card.index({ "$**": "text" }); //We need $text option for search

module.exports = mongo.model("CardItem", card, "card");