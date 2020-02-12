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

module.exports = mongo.model("Card", card, "card");