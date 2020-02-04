const mongo = require("mongoose");

const user = mongo.Schema({
    id: String,
    password: String,
    name: String,
    surname: String,
    score: Number,
    username: { type: String, required: true }
}, {
    collection: "user"
});

module.exports = mongo.model("User", user, "user");